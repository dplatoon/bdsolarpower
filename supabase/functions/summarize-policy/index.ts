import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { policyText, policyType } = await req.json();

    // Validate inputs
    if (!policyText || typeof policyText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Policy text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (policyText.length > 50000) {
      return new Response(
        JSON.stringify({ error: 'Policy text too long (max 50,000 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!policyType || typeof policyType !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Policy type is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Summarizing policy:', { policyType, textLength: policyText.length });

    const systemPrompt = `You are an expert analyst of Bangladesh's solar energy policies and regulations. 
Provide clear, concise summaries that highlight:
- Key requirements and compliance standards
- Important deadlines and timelines
- Financial implications and incentives
- Technical specifications
- Stakeholder responsibilities

Format the summary with clear sections and bullet points for easy reading.`;

    const userPrompt = `Summarize the following ${policyType} policy document related to Bangladesh's solar energy sector:\n\n${policyText}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'Failed to generate summary');
    }

    const summary = data.choices[0].message.content;

    console.log('Policy summary generated successfully');

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in summarize-policy function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
