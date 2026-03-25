// Supabase Edge Function: Extract Tags
// Extracts structured tags (cuisine, vibe, price, dietary) from review text
// Deployed via: supabase functions deploy extract-tags

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req: Request) => {
  const { notes, items } = await req.json();

  if (!notes && (!items || items.length === 0)) {
    return new Response(
      JSON.stringify({ tags: [] }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // TODO: Integrate with Claude API for intelligent tag extraction
  // For MVP, return empty tags array
  const tags: { name: string; category: string }[] = [];

  return new Response(
    JSON.stringify({ tags }),
    { headers: { "Content-Type": "application/json" } }
  );
});
