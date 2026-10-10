<!-- © AngelaMos | 2026 | f2-feedback-loop.md -->

# DIVISION F2: Closed-Loop Content Improvement Systems (Instagram, 2026)

Mission: design a system where every posted deck teaches the next one. What metrics a Professional
account can actually export for CAROUSELS, API vs manual workflow, how serious creators run weekly
retros correlating design to metrics, and published examples of AI-in-the-loop systems that update
their own guidelines from performance data.

Research date: 2026-07-10. Recency priority: April-July 2026 material is primary; older is background.

---

## SEARCHES RUN

1. Instagram Graph API media insights fields carousel reach saves shares 2026
2. Instagram carousel per-slide retention analytics API 2026
3. Instagram carousel insights "total_interactions" reach saved shares works 2026 API v22 v23
4. Instagram Graph API media insights "reach" "saved" "shares" "profile_activity" "follows" carousel v23 2026 example json
5. Instagram insights carousel album parent object reach saved shares works children no insights "within an album"
6. creator weekly content retro ritual correlate design metrics saves swipe rate spreadsheet
7. notion social media content dashboard track hook format saves per post template creator 2026
8. AI content system updates own guidelines from performance data feedback loop 2026
9. agentic content pipeline pull Instagram insights update prompt Claude system prompt self improve
10. "reflexion" OR "self-refine" LLM learn from feedback update instructions 2024 2025
11. creator scientist A/B test carousel hooks measure saves iterate playbook 2026
12. self-hosted Instagram Graph API python fetch media insights save to database creator own dashboard 2026
13. "self-improving" AI agent rewrites its own prompt from performance metrics case study marketing 2026
14. Self-Harness arxiv 2026 weakness mining harness proposal validation agent framework abstract results
15. Buffer creator growth playbook 2026 weekly review experiment log what to track cadence

Pages fetched and read: Meta official Media Insights reference (x2), zernio Graph API guide, elfsight
2026 guide, emplifi deprecation notice, Metricool metrics help, Stormy AI Claude Code playbook,
Windsor.ai Instagram-to-Claude connector, crescitaly creative-testing workflow, o-mega self-improving
agents guide. (explainx Self-Harness page 403'd; got its mechanics from search + arxiv abstract.)

---

## FINDINGS

### PART 1: What a Professional account can EXPORT per carousel (the hard API reality)

This is the load-bearing constraint for the whole loop. It determines what data can ever feed the next
deck. There are two distinct surfaces, and they do NOT expose the same thing.

**Surface A: The native Instagram app "View Insights" UI (manual screenshots).**
Per multiple 2026 guides (SociaVault, AdSpyder cited Feb 2026), the app now shows a per-post Insights
panel and, for carousels, a per-slide engagement breakdown. Reported capabilities:
- swipe-through rate (percent who move past slide 1)
- completion rate (percent who reach the final slide)
- per-slide likes/saves/shares in some tests
- AdSpyder (Feb 2026) reported Instagram is TESTING enhanced carousel analytics showing which specific
  slide got each like and exact timestamps. This is a test, not a stable GA feature, and it is UI-only.
Source: sociavault.com/blog/instagram-carousel-analytics-2025, and the search-surfaced AdSpyder note.

The catch: this per-slide retention data lives ONLY in the app UI. It is a screenshot workflow. It is
not in the public Graph API (see Surface B). So per-slide retention = manual capture, if we want it.

**Surface B: The Instagram Graph API (programmatic, exportable, the thing we can automate).**
Current API version is v25.0 as of July 2026 (confirmed on the official Meta Media Insights reference
page). Some third-party blogs still say v21/v22, that is stale, treat v25.0 as current.

CRITICAL DISTINCTION that most blogs get wrong. Meta's doc line "Insights data is not available for
any media WITHIN an Instagram Media album" refers to the CHILD slides, not the parent post. Confirmed:
- The carousel PARENT media object DOES return insights. Available metrics on the album parent include
  reach, saved, shares, total_interactions, plus the legacy carousel_album_* variants
  (carousel_album_reach, carousel_album_saved, carousel_album_engagement, carousel_album_impressions).
  Using the plain metric names (reach, saved) returns the SAME numbers as the carousel_album_* variants.
- The CHILD slide media objects return an error: "Field is not available for Carousel children media."
  Individual slides have NO independent insights via the API. permalink is also unavailable on children.
Sources: krbnite.github.io/Metrics-on-the-Instagraph; developers.facebook.com media insights reference;
help.metricool.com instagram-metrics.

**So the exact per-carousel fields we CAN pull via the API (v25.0), all at the post/album level:**
- reach (unique accounts that saw it; estimated)
- saved (save count) <- the money metric for carousels
- shares (share/send count, includes DM sends) <- second money metric in 2026 algo
- total_interactions (likes + saves + comments + shares, minus unlikes/unsaves/deleted comments; noted
  "in development" on the Meta ref but reported live by Metricool as "Interactions")
- likes, comments
- follows (follows attributed to the post) <- available for FEED post objects per Postman/Meta ref
- profile_activity (requires breakdown=action_type; includes profile visits and other profile actions)
- profile_visits
- views (Meta's post-2025 unified metric; on the Meta ref for FEED posts, marked in development)
Sources: postman.com/meta/instagram Media Insights request (lists Comments, Follows, Likes,
ProfileActivity, ProfileVisits, Shares, TotalInteractions for POST objects); Metricool help;
developers.facebook.com reference.

**What we CANNOT pull via the API for carousels:**
- Per-slide / per-frame anything. No swipe-through rate, no completion rate, no slide-level retention.
  That data is app-UI-only. If we want it, it is a screenshot, read by a vision model, or logged by hand.
- video_views on a carousel, even if a slide is a video. Deprecated for carousels created after
  2025-01-08. Returns N/A. Source: emplifi deprecation notice (2025-04-21); Metricool.
- impressions as a first-class metric. Deprecated 2025-04-21 across post and profile level, remapped
  into "views." Source: docs.emplifi.io instagram-insights-metrics-deprecation-april-2025.

**Deprecation timeline that shapes what history we can trust (emplifi, dated):**
- 2025-01-08: video_views on non-Reels content and on carousels deprecated.
- 2025-03-25 / 2025-04-21: impressions (post + profile), plays, reel aggregated plays, profile
  impressions rolling window all deprecated. "views" became the unified replacement.
- 2025-06-06: profile-level video views data available; no historical backfill.
Implication: any metric baseline we build should start from a clean post-2025-06 window, and treat
"views" (not impressions) as the reach-adjacent denominator.

**Access requirements (for building our own puller):**
- Instagram Business or Creator account linked to a Facebook Page.
- Facebook Developer app, short-lived token exchanged for a long-lived token (~60 days, refreshable).
- Endpoint shape: GET https://graph.facebook.com/v25.0/{IG_MEDIA_ID}/insights?metric=reach,saved,shares,
  total_interactions,follows,profile_activity&breakdown=action_type&access_token=...
- Rate limit: ~200 requests/hour per IG account; failed requests count against the limit too (elfsight).
- Account-level insights (audience, follower_count, reach over time) at GET /{IG_USER_ID}/insights.
Sources: elfsight 2026 guide; zernio; dev.to Graph API 2026 guides.

**Two build paths for the puller (both real, dated):**
1. Direct Graph API in Python. dltHub ships an "instagram-graph" verified source
   (dlthub.com/context/source/instagram-graph) that pipelines Graph API media + insights into a
   database, with AI Workbench support for Claude Code/Cursor/Codex. This is the clean, official,
   TOS-safe path and the one that fits Carter's "build any tooling" stack (uv + Python).
2. No-code bridge: Windsor.ai MCP (windsor.ai/how-to-connect-instagram-insights-to-claude). It maintains
   a live Instagram Graph API <-> Claude bridge exposing ~100 fields (likes, comments, saves, shares,
   watch time, replays, follower-vs-nonfollower reach split, profile visits, website clicks). You then
   ask Claude in natural language: "Which of my Reels had the highest Share rate in the last 14 days?"
   Setup is 3 steps: authorize IG via Facebook, add Windsor connector in Claude set to Always Allow,
   query. No API keys, no code. Good for a fast start; the direct dlt path is better for a self-owned loop.

### PART 2: How serious creators run the weekly retro (correlating design to metrics)

**Cadence, consistent across sources.** Weekly review is the standard unit, roughly 15-30 minutes.
- Buffer creator growth playbook (buffer.com/resources/creator-growth-playbook): ~15 min/week,
  compounds over 2-3 months into a clear picture of what the audience responds to. Prioritize
  ENGAGEMENT RATE over raw reach when judging content quality (their example: a 500-impression post
  with 10% ER beats a 5,000-impression post with 2% ER). Correlate follower-growth spikes to specific
  posts to see which formats pull NEW audience vs engage existing.
- Buffer also recommends running a posting-slot experiment over 4-6 weeks before concluding, i.e. do
  not judge on one post's noise. Weekly checks smooth daily noise; plan CHANGES monthly.
- InfluenceFlow 2026 guide and creatorflow.so both push "top 5-7 metrics, ignore the rest."

**Saves and shares are the carousel design KPIs.** Repeated across 2026 sources:
- Krumzi (krumzi.com, 2026): carousels drive ~22 percent more saves than single photos; in the 2026
  algorithm saves and DM shares carry significantly more weight than likes.
- creatorflow.so and SociaVault: a post with 200 likes and 50 saves routinely out-distributes one with
  2,000 likes and 5 saves. Save RATE (saves / reach) is the design-quality proxy.
So the retro's primary correlate for a carousel is: save rate and share rate, sliced by design choice.

**The creative-testing loop, with actual decision thresholds (crescitaly, 2026, most concrete source
found).** blog.crescitaly.com social-media-creative-testing-workflow-2026. Four stages: Plan -> Test ->
Learn -> Scale.
- Plan: one primary metric + one secondary. Exactly THREE variants per test: control, minor variant
  (copy/CTA only), structural variant (angle/format/first-slide). Never more than three concurrent
  creative families unless generation is automated (it is, for us).
- Test: minimum runtime 72 hours for high-velocity placements, 7 days for feed-driven. Budget/exposure
  parity across variants. Isolate ONE variable: minor variant changes only copy; structural variant
  changes only format while holding copy constant. That is how you attribute a lift to a design choice.
- Learn (the decision rules, hard thresholds):
  - SCALE: variant beats control by >=10 percent on primary metric at >=80 percent confidence and
    minimum sample -> commit to that template.
  - HOLD: difference exists but confidence <80 percent -> extend the test.
  - KILL: underperforms by >=15 percent after minimum runtime and sample -> stop, revert to control.
  - Enforce a minimum SAMPLE (conversion/action count), not just a time window. Noise lies at low n.
- Scale: turn the winner into a template. Store its hooks, cut points, and visual rules in an asset
  library. Link creative metadata (creative ID, hypothesis tag, brief) to the performance row so the
  next cycle is reproducible. Document every hypothesis, prompt, template, and outcome so the next
  cycle runs faster with higher-quality variants.
- Named failure modes to avoid: no predefined thresholds, manual reconciliation instead of automated
  daily API pulls, ignoring minimum sample size, not linking creative metadata to outcomes.

**YouTube's 2026 model is worth stealing conceptually.** YouTube now runs native 3-variant title/thumb
A/B tests judged by WATCH TIME, not CTR (outlierkit.com, editvideo.io, 2026). The lesson for us: judge
a carousel design test by the retention-equivalent (save rate + completion, not the vanity top-line).

### PART 3: Published AI-in-the-loop content systems (the self-improving part)

**3a. Applied social-media loops (directly usable patterns).**
- Stormy AI "Autonomous Instagram Content Engine: A Claude Code Playbook"
  (stormy.ai/blog/autonomous-instagram-content-engine-claude-code-playbook). Architecture: Claude Code
  as the engine; MCP for local files + web; a distribution API (they use Late) for scheduling; brand
  voice stored in an INSTAGRAM_VOICE.md that Claude references before drafting (tone, banned keywords,
  emoji prefs); research via a Brave Search MCP; generation via Claude-written Python. Human-in-the-loop
  approval before publish. IMPORTANT GAP they admit: the playbook covers generation + distribution but
  DOES NOT close the metrics-to-prompt loop. That missing layer is exactly our differentiator to build.
- The pattern to copy: a plain-text guidelines file (INSTAGRAM_VOICE.md) that the generator reads every
  time. Our version = a carousel design-rules file the make-carousel skill reads, which the retro edits.
- Windsor.ai MCP (above) closes the READ side: live insights into Claude so a weekly summary is one
  prompt. Pairing Windsor-read + a rules-file-write gives a full loop with almost no custom code.

**3b. The research backbone for "update your own instructions from feedback" (background, load-bearing).**
- Reflexion (Shinn et al., 2023): agent reflects on task feedback in natural language, stores the
  reflection in episodic memory, and uses it on the next attempt WITHOUT any weight update. 91 percent
  pass@1 on HumanEval. The mechanic we want: verbal lessons written back to memory, applied next round.
- Self-Refine (Madaan et al., 2023): same model generates, critiques, and refines its own output in a
  loop using three distinct prompts (generate / feedback / refine). No external supervision.
- GEPA (referenced in the o-mega 2026 guide): genetic prompt optimization where an LLM reads full
  execution traces (errors, profiling, reasoning logs) and proposes targeted prompt edits. Reported to
  beat RL approaches with up to 35x fewer rollouts, needing only ~100-500 evaluations. This is the
  cheap, solo-operator-friendly optimizer.

**3c. Self-Harness (arxiv 2606.09498, published 2026-06-08). The most on-point 2026 frontier result.**
Sources: arxiv.org/abs/2606.09498; venturebeat.com coverage; huggingface.co/papers/2606.09498; search
of the explainx writeup (page itself 403'd). Mechanics, three-stage loop that maps 1:1 onto our need:
1. Weakness Mining: read execution traces, identify model-specific FAILURE PATTERNS. (For us: read the
   metrics, identify design patterns that underperform on save/share rate.)
2. Harness Proposal: generate diverse but MINIMAL modifications tied to those failures. Not a rewrite,
   small atomic edits. (For us: minimal edits to the carousel design-rules file.)
3. Proposal Validation: accept a candidate edit ONLY after regression testing on a held-out set.
Results: on Terminal-Bench-2.0 with three base models, held-out pass rates rose 40.5 -> 61.9, 23.8 ->
38.1, 42.9 -> 57.1 percent. VentureBeat headline: "boosting performance up to 60 percent." Key
qualitative finding: it does not add generic filler instructions, it converts specific weaknesses into
concrete, executable changes. That is the exact behavior we want from a retro agent editing our rules.

**3d. Solo-operator self-improvement mechanics (o-mega 2026 guide, the practical distillation).**
o-mega.ai/articles/self-improving-ai-agents-the-2026-guide. Step-by-step meta-agent loop:
1. Observation: read timestamped JSON logs with clear pass/fail per item.
2. Diagnosis: LLM (Claude) analyzes logs for failure patterns.
3. Proposal: generate DIFFS, not full rewrites. Small, atomic, before/after.
4. Evaluation gate (critical): apply the diff to a STAGING copy, run against a held-out set (10-20
   percent of recent tasks), keep only if primary metric improves AND secondary metrics do not degrade.
5. Versioning + rollback: git-like history, each change carries timestamp, diff, before/after metrics,
   and the meta-agent's plain-language rationale. Auto-revert if production drops.
Named guardrails against drift:
- Fixed evaluation criteria: the agent CANNOT change what "better" means; success metrics live in code,
  not prose. Reject any proposal that edits the evaluation function.
- Frozen foundation model: all changes stay in the prompt/config layer for auditability + trivial rollback.
- Population diversity: keep an archive of good variants (population-based search), not just the single
  best, to avoid local optima.
- Resource cap per cycle (e.g. max 50 test runs).
- Human review sampling: log all changes, sample 5-10 percent for human review weekly; every diff must
  be explainable in plain language.
- Variance Inequality Principle (Dec 2025): when improvement stalls, strengthen the VERIFIER not the
  generator. A weak proposer + strong verification gate is more stable than the reverse.
Hard limit they stress: self-improvement only works where outcomes are OBJECTIVELY VERIFIABLE. For us,
save rate and share rate are numeric and verifiable, so this loop is viable. But n is small (one deck a
few times a week), so we must lean on the verifier and long windows, not fast aggressive edits.

---

## SO WHAT FOR US

**1. Kill the per-slide-retention API dream. Plan around post-level metrics.**
The Graph API gives us carousel-level reach, saved, shares, total_interactions, follows, profile_visits,
views. It gives us ZERO per-slide data. Per-slide swipe/completion exists only in the app UI. So the
loop's primary signal is SAVE RATE (saved/reach) and SHARE RATE (shares/reach) per whole deck, sliced by
the design attributes WE tag ourselves. Per-slide retention, if we ever want it, is an optional
screenshot-fed side channel (vision model reads the Insights panel), not the backbone. Do not architect
the backbone around data the API cannot give.

**2. Build a Python insights puller now, self-owned, via dltHub's instagram-graph source.**
It is uv-native, TOS-safe, and pipelines Graph API media + insights into a local DB with Claude Code
support. Pull v25.0 fields at the album level. Store one row per posted deck. This is the "instrument
everything" prerequisite. The o-mega rule is blunt: unlogged behavior cannot be improved. Windsor.ai MCP
is a fine same-day shortcut for the read side, but own the pipeline for the long-term loop.

**3. The self-improving artifact is a plain-text design-rules file the make-carousel skill reads.**
Mirror Stormy's INSTAGRAM_VOICE.md pattern, but for carousel DESIGN, and make it editable by the retro.
Call it carousel-design-rules.md (or similar). make-carousel reads it before designing every deck. The
weekly retro proposes MINIMAL, atomic diffs to it (Self-Harness / GEPA style), each tied to a specific
metric observation. This is how every deck teaches the next one: the lesson is written back into the
rules the next deck is built from.

**4. Tag every deck with its design DNA at publish time, so the retro can correlate.**
Per crescitaly, the fatal error is not linking creative metadata to outcomes. When make-carousel outputs
a deck, also write a metadata record: hook type, first-slide archetype (poster vs newspaper), body-copy
density, whether it had an animated slide, type scale, color, format (tool deep-dive / salary / etc.).
The retro joins these tags to save/share rate. Without the tags there is nothing to correlate, and the
loop is blind.

**5. Enforce the decision thresholds and a real evaluation gate, do not let the agent free-edit rules.**
Adopt crescitaly's thresholds: a design choice is a WINNER only at >=10 percent lift on save/share rate
vs the running baseline with adequate sample; KILL at >=15 percent worse. Adopt o-mega's guardrails:
success metric lives in code not prose; the retro agent proposes a diff with a plain-language rationale;
the diff is only accepted after checking it against the tagged history (the held-out set is our past
decks); every rule change is versioned with before/after numbers and is instantly revertible. Per the
Variance Inequality Principle, invest in the VERIFIER (the metric-join + threshold check), not in a
clever proposer. With our tiny n, use long windows (4-6 weeks per Buffer) and trailing baselines, and
never let a single viral or dud deck rewrite a rule.

**6. Concrete loop we should build (the deliverable this division points at):**
- Nightly/weekly: dlt puller writes album-level insights per deck into a local DB (Python, uv).
- Weekly retro command (a new skill, e.g. /carousel-retro): (a) pull last N decks' metrics + design
  tags, (b) compute save rate and share rate per deck and per design attribute vs trailing baseline,
  (c) surface the biggest verified deltas, (d) propose atomic diffs to carousel-design-rules.md with a
  one-line rationale each and the numbers behind them, (e) gate: only apply diffs that beat the >=10
  percent threshold against the tagged history, version the change with before/after, keep it revertible.
- make-carousel reads carousel-design-rules.md every run. Loop closed.
This is the Stormy generation engine plus the metrics-to-prompt layer Stormy explicitly admitted it was
missing, hardened with Self-Harness's validation stage and o-mega's drift guardrails.

**7. Cadence discipline (from Buffer + crescitaly):** weekly review, monthly changes. Judge on 4-6 week
windows and engagement RATE, not raw reach or one post's noise. Top 5-7 metrics only. For a carousel
those are: save rate, share rate, reach, follows-from-post, profile visits. Ignore likes as a design
signal; they are the vanity number the 2026 algorithm already discounts.
