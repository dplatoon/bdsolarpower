-- Shared rate-limit primitive for public-facing edge functions
-- (analyze-solar-potential, summarize-policy, notify-project-quote), which are
-- callable by anyone (anon key or verify_jwt=false) and were previously
-- unthrottled: a script could run up the OpenAI bill or spam the quote-request
-- notification email with no limit.
--
-- Storage lives in `private` (not exposed via PostgREST, same as
-- private.has_role) so it can't be read or tampered with by anon/authenticated
-- clients. The only way in is the public.check_rate_limit() wrapper below,
-- callable only by service_role — i.e. only from edge functions.

CREATE TABLE private.rate_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 0
);

REVOKE ALL ON TABLE private.rate_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE private.rate_limits TO service_role;

-- Atomically records one hit for `p_key` and reports whether it's still
-- within `p_max_requests` per rolling `p_window_seconds` window. A single
-- INSERT ... ON CONFLICT keeps the increment-or-reset race-free under
-- concurrent requests.
CREATE OR REPLACE FUNCTION private.rate_limit_hit(p_key text, p_max_requests int, p_window_seconds int)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private
AS $$
DECLARE
  v_count integer;
BEGIN
  INSERT INTO private.rate_limits (key, window_start, count)
  VALUES (p_key, now(), 1)
  ON CONFLICT (key) DO UPDATE SET
    count = CASE
      WHEN private.rate_limits.window_start <= now() - make_interval(secs => p_window_seconds)
        THEN 1
      ELSE private.rate_limits.count + 1
    END,
    window_start = CASE
      WHEN private.rate_limits.window_start <= now() - make_interval(secs => p_window_seconds)
        THEN now()
      ELSE private.rate_limits.window_start
    END
  RETURNING count INTO v_count;

  RETURN v_count <= p_max_requests;
END;
$$;

REVOKE ALL ON FUNCTION private.rate_limit_hit(text, int, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.rate_limit_hit(text, int, int) TO service_role;

-- Thin public entrypoint: private.* isn't exposed via PostgREST at all, so
-- edge functions (calling as service_role over supabase-js .rpc()) need a
-- public-schema function to reach it. Locked to service_role only.
CREATE OR REPLACE FUNCTION public.check_rate_limit(p_key text, p_max_requests int, p_window_seconds int)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = private
AS $$
  SELECT private.rate_limit_hit(p_key, p_max_requests, p_window_seconds);
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, int, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, int, int) TO service_role;
