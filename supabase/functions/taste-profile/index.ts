// Supabase Edge Function: Generate Taste Profile
// Analyzes review history to generate a lightweight taste profile
// Deployed via: supabase functions deploy taste-profile

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req: Request) => {
  const { userId } = await req.json();

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "userId is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // TODO: Integrate with Claude API + review history analysis
  // For MVP, return a placeholder profile structure
  const profile = {
    topCuisines: [],
    flavorPreferences: [],
    pricePreference: null,
    diningStyle: null,
    generatedAt: new Date().toISOString(),
  };

  return new Response(
    JSON.stringify({ profile }),
    { headers: { "Content-Type": "application/json" } }
  );
});
