// Supabase Edge Function: Summarize Review
// Takes review notes and generates a concise premium summary via Claude
// Deployed via: supabase functions deploy summarize-review

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

Deno.serve(async (req: Request) => {
  const { notes, items } = await req.json();

  if (!notes && (!items || items.length === 0)) {
    return new Response(
      JSON.stringify({ error: "No content to summarize" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!ANTHROPIC_API_KEY) {
    // Fallback when API key not configured
    const summary = notes
      ? notes.length > 120 ? notes.slice(0, 120) + "..." : notes
      : `Tried ${items.length} item${items.length === 1 ? "" : "s"}.`;
    return new Response(
      JSON.stringify({ summary }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const itemsList = items?.length
    ? `\nDishes/drinks ordered: ${items.map((i: any) => `${i.name} (${i.category}${i.score ? `, ${i.score}/10` : ""})`).join(", ")}`
    : "";

  const prompt = `Summarize this restaurant review in 1-2 elegant sentences for a premium dining journal app. Be concise and vivid. Do not use quotes or attribution.

Review notes: ${notes ?? "No notes provided."}${itemsList}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 150,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const result = await response.json();
    const summary = result.content?.[0]?.text?.trim() ?? notes;

    return new Response(
      JSON.stringify({ summary }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    // Fallback on error
    const summary = notes
      ? notes.length > 120 ? notes.slice(0, 120) + "..." : notes
      : "A dining experience.";
    return new Response(
      JSON.stringify({ summary }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
});
