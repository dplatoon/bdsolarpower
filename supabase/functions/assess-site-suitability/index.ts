import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { checkRateLimit, clientIp, rateLimitedResponse } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const assessmentSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    suitability_score: { type: "integer", description: "0-100 overall solar suitability" },
    verdict: { type: "string", description: "One short sentence verdict" },
    recommended_system_kw: { type: "number" },
    estimated_annual_kwh: { type: "number" },
    estimated_cost_bdt_min: { type: "number" },
    estimated_cost_bdt_max: { type: "number" },
    payback_years: { type: "number" },
    usable_area_note: { type: "string" },
    observations: { type: "array", items: { type: "string" } },
    risks: { type: "array", items: { type: "string" } },
    next_steps: { type: "array", items: { type: "string" } },
    summary: { type: "string", description: "3-5 sentence plain-language summary" },
  },
  required: [
    "suitability_score",
    "verdict",
    "recommended_system_kw",
    "estimated_annual_kwh",
    "estimated_cost_bdt_min",
    "estimated_cost_bdt_max",
    "payback_years",
    "usable_area_note",
    "observations",
    "risks",
    "next_steps",
    "summary",
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const allowed = await checkRateLimit(`assess-site-suitability:${clientIp(req)}`, 5, 300);
    if (!allowed) return rateLimitedResponse(corsHeaders);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return json({ error: "AI service is not configured." }, 500);
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid request body" }, 400);

    const {
      photos,
      contactName,
      contactPhone,
      district,
      siteType,
      areaSqft,
      monthlyBillBdt,
      gridConnected,
      notes,
    } = body as Record<string, unknown>;

    if (!Array.isArray(photos) || photos.length === 0) {
      return json({ error: "Please upload at least one site photo." }, 400);
    }
    if (photos.length > 4) {
      return json({ error: "Please upload no more than 4 photos." }, 400);
    }
    for (const p of photos) {
      if (typeof p !== "string" || !p.startsWith("data:image/")) {
        return json({ error: "Photos must be valid image files." }, 400);
      }
      if (p.length > 4_000_000) {
        return json({ error: "Each photo must be smaller than 3MB." }, 400);
      }
    }

    const area = Number(areaSqft);
    if (!area || Number.isNaN(area) || area <= 0 || area > 10_000_000) {
      return json({ error: "Please enter a valid site area in square feet." }, 400);
    }
    if (typeof district !== "string" || district.trim().length === 0 || district.length > 120) {
      return json({ error: "Please enter the district or upazila." }, 400);
    }
    const type = typeof siteType === "string" && siteType.length <= 40 ? siteType : "unknown";
    const bill = Number(monthlyBillBdt);
    const safeNotes = typeof notes === "string" ? notes.slice(0, 1500) : "";

    const prompt = `Assess this site in Bangladesh for a solar PV installation.

Site type: ${type}
District / upazila: ${district.trim()}
Usable area: ${area} sq ft
Average monthly electricity bill: ${bill > 0 ? `BDT ${bill}` : "not provided"}
Grid connected: ${gridConnected === true ? "yes" : gridConnected === false ? "no" : "unknown"}
Owner notes: ${safeNotes || "none"}

Use the attached site photos to judge shading, orientation, roof or ground condition, obstructions and mounting feasibility. Use realistic Bangladesh market figures (typical installed cost BDT 55,000-85,000 per kW for rooftop, ~1,400-1,600 kWh per installed kW per year, net metering where grid connected). Be honest about uncertainty and never invent details you cannot see in the photos.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        instructions:
          "You are a senior solar PV engineer assessing sites in Bangladesh for rooftop and ground-mount installations. Ground your estimates in the photos and the stated site data.",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt },
              ...photos.map((url) => ({ type: "input_image", image_url: url })),
            ],
          },
        ],
        reasoning: { effort: "low", summary: "auto" },
        text: {
          format: {
            type: "json_schema",
            name: "solar_site_assessment",
            strict: true,
            schema: assessmentSchema,
          },
        },
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text().catch(() => "");
      console.error("AI gateway error:", response.status, errorText);
      if (response.status === 429) {
        return json({ error: "Too many requests right now. Please try again in a moment." }, 429);
      }
      if (response.status === 402) {
        return json({ error: "AI credits are exhausted. Please top up to continue." }, 402);
      }
      return json({ error: "The AI assessment service is unavailable right now." }, 502);
    }

    // Reasoning runs stream; accumulate the output text until the body ends.
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let output = "";
    let streamError: string | null = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload);
          if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
            output += event.delta;
          } else if (event.type === "response.completed" && !output) {
            output = event.response?.output_text ?? "";
          } else if (event.type === "error" || event.type === "response.failed") {
            streamError = event.error?.message ?? event.response?.error?.message ?? "AI run failed";
          }
        } catch {
          // Ignore non-JSON keepalive frames.
        }
      }
    }

    if (streamError || !output.trim()) {
      console.error("AI stream produced no assessment:", streamError);
      return json({ error: "The assessment could not be generated. Please try again." }, 502);
    }

    let assessment: Record<string, unknown>;
    try {
      assessment = JSON.parse(output);
    } catch (e) {
      console.error("Failed to parse assessment JSON:", e);
      return json({ error: "The assessment came back in an unexpected format." }, 502);
    }

    // Persist the assessment. Anonymous visitors get a result too; only
    // signed-in owners get a row tied to their account.
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    const service = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    if (token) {
      const { data } = await service.auth.getUser(token);
      userId = data.user?.id ?? null;
    }

    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
    const { data: saved, error: insertError } = await service
      .from("site_assessments")
      .insert({
        user_id: userId,
        contact_name: typeof contactName === "string" ? contactName.slice(0, 120) : null,
        contact_phone: typeof contactPhone === "string" ? contactPhone.slice(0, 20) : null,
        district: district.trim().slice(0, 120),
        site_type: type,
        area_sqft: area,
        monthly_bill_bdt: bill > 0 ? bill : null,
        grid_connected: typeof gridConnected === "boolean" ? gridConnected : null,
        notes: safeNotes || null,
        photo_count: photos.length,
        suitability_score: num(assessment.suitability_score),
        recommended_system_kw: num(assessment.recommended_system_kw),
        estimated_annual_kwh: num(assessment.estimated_annual_kwh),
        estimated_cost_bdt_min: num(assessment.estimated_cost_bdt_min),
        estimated_cost_bdt_max: num(assessment.estimated_cost_bdt_max),
        payback_years: num(assessment.payback_years),
        summary: typeof assessment.summary === "string" ? assessment.summary : null,
        assessment,
      })
      .select("id")
      .single();

    if (insertError) {
      // The assessment itself is still valuable; log and return it.
      console.error("Failed to save site assessment:", insertError.message);
    }

    return json({ assessment, assessmentId: saved?.id ?? null, saved: !!saved });
  } catch (error) {
    console.error("Error in assess-site-suitability:", error);
    return json({ error: "Something went wrong while assessing this site." }, 500);
  }
});
