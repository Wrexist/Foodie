// Supabase Edge Function: Extract Tags
// Extracts structured tags (cuisine, vibe, dietary, flavor) from review text via Claude
// Deployed via: supabase functions deploy extract-tags

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

Deno.serve(async (req: Request) => {
  const { notes, items } = await req.json();

  if (!notes && (!items || items.length === 0)) {
    return new Response(
      JSON.stringify({ tags: [] }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  if (!ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ tags: [] }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const itemsList = items?.length
    ? `\nItems ordered: ${items.map((i: any) => `${i.name} (${i.category})`).join(", ")}`
    : "";

  const prompt = `Extract relevant tags from this restaurant review. Return ONLY a JSON array of objects with "name" (lowercase tag) and "category" (one of: cuisine, vibe, dietary, flavor, meal_type).

Extract 3-8 tags. Be specific and accurate.

Review: ${notes ?? ""}${itemsList}

Respond with only the JSON array, no other text.`;

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
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.content?.[0]?.text?.trim() ?? "[]";

    // Parse the JSON array from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const tags = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    return new Response(
      JSON.stringify({ tags }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ tags: [] }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
});
