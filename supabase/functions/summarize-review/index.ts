// Supabase Edge Function: Summarize Review
// Takes review notes and generates a concise premium summary
// Deployed via: supabase functions deploy summarize-review

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req: Request) => {
  const { notes, items } = await req.json();

  if (!notes && (!items || items.length === 0)) {
    return new Response(
      JSON.stringify({ error: "No content to summarize" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // TODO: Integrate with Claude API for premium summarization
  // For MVP, return a structured placeholder
  const summary = `A dining experience featuring ${items?.length ?? 0} items. ${notes ? notes.slice(0, 100) + "..." : ""}`;

  return new Response(
    JSON.stringify({ summary }),
    { headers: { "Content-Type": "application/json" } }
  );
});
