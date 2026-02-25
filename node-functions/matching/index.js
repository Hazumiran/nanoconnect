/**
 * Simple matching function for NanoConnect
 * Expects POST JSON: { campaign: { budget, niche, location }, influencers: [ { id, niche, rate, location } ] }
 * Returns sorted influencers with a compatibility score (0-1).
 * This is a lightweight placeholder; replace with Supabase/OpenAI logic later.
 */

export async function onRequest(context) {
  try {
    const req = context.request
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Use POST' }), { status: 405 })
    }

    const body = await req.json()
    const { campaign, influencers } = body
    if (!campaign || !Array.isArray(influencers)) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 })
    }

    const results = influencers.map((inf) => {
      const nicheMatch = (inf.niche || '').toLowerCase() === (campaign.niche || '').toLowerCase() ? 1 : 0

      // budget-based score (higher when influencer rate <= budget)
      const budget = Number(campaign.budget) || 0
      const rate = Number(inf.rate) || 0
      let budgetScore = 0
      if (budget <= 0 && rate <= 0) budgetScore = 0.5
      else {
        const diff = Math.abs(rate - budget)
        const denom = Math.max(budget, rate, 1)
        budgetScore = Math.max(0, 1 - diff / denom)
      }

      const locationMatch = (inf.location || '').toLowerCase() === (campaign.location || '').toLowerCase() ? 1 : 0

      // weights: budget 0.5, niche 0.3, location 0.2
      const score = Math.max(0, Math.min(1, budgetScore * 0.5 + nicheMatch * 0.3 + locationMatch * 0.2))

      return { ...inf, score }
    })

    results.sort((a, b) => b.score - a.score)

    return new Response(JSON.stringify({ results }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}

// Notes:
// - Replace scoring with AI-based similarity using OpenAI or Supabase functions.
// - Use environment variables for Supabase and OpenAI keys when integrating.
