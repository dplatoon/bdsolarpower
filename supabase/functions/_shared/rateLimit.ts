import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Server-side only: uses the service role key, so this must never be imported
// by client code, only by edge functions.
function serviceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

export function clientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Records one hit for `key` and returns whether it's still within
 * `maxRequests` per rolling `windowSeconds` window. Fails open (allows the
 * request) if the rate-limit check itself errors, so an RPC/network hiccup
 * never blocks legitimate traffic.
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number,
): Promise<boolean> {
  try {
    const { data, error } = await serviceClient().rpc("check_rate_limit", {
      p_key: key,
      p_max_requests: maxRequests,
      p_window_seconds: windowSeconds,
    });
    if (error) {
      console.error("Rate limit check failed, failing open:", error.message);
      return true;
    }
    return data === true;
  } catch (error) {
    console.error("Rate limit check threw, failing open:", error);
    return true;
  }
}

export function rateLimitedResponse(corsHeaders: Record<string, string>) {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again shortly." }),
    { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}
