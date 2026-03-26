// Supabase Edge Function: Generate Taste Profile
// Analyzes review history to generate a personalized taste profile via Claude
// Deployed via: supabase functions deploy taste-profile

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req: Request) => {
  const { userId } = await req.json();

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "userId is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Fetch user's recent reviews with items
  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      overall_score,
      notes,
      visit_date,
      place:places(name, cuisine_type, price_level),
      review_items(name, category, score)
    `)
    .eq("user_id", userId)
    .order("visit_date", { ascending: false })
    .limit(30);

  if (!reviews || reviews.length === 0) {
    return new Response(
      JSON.stringify({
        profile: {
          topCuisines: [],
          flavorPreferences: [],
          pricePreference: null,
          diningStyle: null,
          generatedAt: new Date().toISOString(),
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  if (!ANTHROPIC_API_KEY) {
    // Basic analysis without AI
    const cuisineCounts = new Map<string, number>();
    let totalPrice = 0;
    let priceCount = 0;

    for (const r of reviews as any[]) {
      const cuisine = r.place?.cuisine_type;
      if (cuisine) cuisineCounts.set(cuisine, (cuisineCounts.get(cuisine) ?? 0) + 1);
      if (r.place?.price_level) { totalPrice += r.place.price_level; priceCount++; }
    }

    const topCuisines = [...cuisineCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);

    return new Response(
      JSON.stringify({
        profile: {
          topCuisines,
          flavorPreferences: [],
          pricePreference: priceCount > 0 ? Math.round(totalPrice / priceCount) : null,
          diningStyle: null,
          generatedAt: new Date().toISOString(),
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // Build review summary for Claude
  const reviewSummary = (reviews as any[]).map((r) => {
    const items = r.review_items?.map((i: any) => `${i.name} (${i.category}, ${i.score ?? "unrated"})`).join(", ");
    return `${r.place?.name ?? "Unknown"} (${r.place?.cuisine_type ?? "unknown cuisine"}, ${"$".repeat(r.place?.price_level ?? 0)}) — Score: ${r.overall_score}/10${r.notes ? ` — "${r.notes}"` : ""}${items ? ` — Items: ${items}` : ""}`;
  }).join("\n");

  const prompt = `Analyze this person's dining history and create a taste profile. Return ONLY valid JSON with this structure:
{
  "topCuisines": ["cuisine1", "cuisine2", ...],
  "flavorPreferences": ["preference1", "preference2", ...],
  "pricePreference": 1-4 (1=budget, 4=luxury),
  "diningStyle": "brief description of their dining personality in 1 sentence"
}

Dining history (${reviews.length} reviews):
${reviewSummary}

Respond with only the JSON object.`;

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
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.content?.[0]?.text?.trim() ?? "{}";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const profile = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return new Response(
      JSON.stringify({
        profile: {
          topCuisines: profile.topCuisines ?? [],
          flavorPreferences: profile.flavorPreferences ?? [],
          pricePreference: profile.pricePreference ?? null,
          diningStyle: profile.diningStyle ?? null,
          generatedAt: new Date().toISOString(),
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({
        profile: {
          topCuisines: [],
          flavorPreferences: [],
          pricePreference: null,
          diningStyle: null,
          generatedAt: new Date().toISOString(),
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
});
