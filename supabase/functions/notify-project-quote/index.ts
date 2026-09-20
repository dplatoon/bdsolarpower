import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { checkRateLimit, rateLimitedResponse } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_TO = Deno.env.get("QUOTE_NOTIFICATION_EMAIL") ?? "hello@bdsolarpower.com";
const FROM = Deno.env.get("QUOTE_NOTIFICATION_FROM") ?? "BD Solar Power <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { requestId } = await req.json();
    if (!requestId || typeof requestId !== "string") {
      return new Response(JSON.stringify({ error: "requestId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // requestId is unauthenticated (verify_jwt=false) and unguessable but
    // known to its submitter, who could otherwise replay it to spam the
    // notification email / burn the Resend quota.
    const allowed = await checkRateLimit(`notify-project-quote:${requestId}`, 3, 900);
    if (!allowed) return rateLimitedResponse(corsHeaders);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error } = await supabase
      .from("project_quote_requests")
      .select("*")
      .eq("id", requestId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!row) {
      return new Response(JSON.stringify({ error: "Request not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured - quote saved but no email sent");
      return new Response(JSON.stringify({ saved: true, emailed: false, reason: "email_not_configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <h2>New solar project enquiry</h2>
      <p><strong>Project:</strong> ${escapeHtml(row.project_name ?? "Not specified")}</p>
      <p><strong>Name:</strong> ${escapeHtml(row.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(row.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(row.email ?? "-")}</p>
      <p><strong>Company:</strong> ${escapeHtml(row.company ?? "-")}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(row.message ?? "-")}</p>
      <p style="color:#666">Sent from bdsolarpower.com</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_TO],
        reply_to: row.email || undefined,
        subject: `Project enquiry: ${row.project_name ?? "General"} — ${row.name}`,
        html,
      }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`Resend request failed [${res.status}]: ${details}`);
      return new Response(JSON.stringify({ saved: true, emailed: false, status: res.status, details }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ saved: true, emailed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-project-quote failed:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
