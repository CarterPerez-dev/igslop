<!-- © AngelaMos | 2026 | division-j-competitor-teardowns.md -->

# DIVISION J: Competitor and Market Teardowns (Consolidated)

Division head synthesis of four scout sweeps (j1 cyber creators, j2 studio systems, j3 AI carousel tools, j4 template market) plus division-head follow-up searches run 2026-07-10 to close the two load-bearing holes: no scout could see a real competitor slide (403 walls everywhere), and none had a concrete HTML-to-video build path for the animated-slide brief. I closed the second one. The first stays open and is the top open question.

Raw scout files: `raw/j1-cyber-creator-teardowns.md`, `raw/j2-studio-systems.md`, `raw/j3-carousel-tool-teardowns.md`, `raw/j4-template-market-signal.md`.

---

## EXECUTIVE SUMMARY

1. The best-designed-carousel lane in cyber and tech-career IG is genuinely open. The 2M and 556K accounts (Sarian, Khader) win on face and video and cede designed decks; the 421K account (the Hub) is an unbranded repost firehose. No premium-deck incumbent exists to out-design (j1).
2. Carter's own data (image-artifact decks 47-65k views / 2,700-6,600 saves vs text-template decks 10-18k / 100-570 saves) is independently confirmed twice: the paid template market sells poster-not-newspaper hardest, and 2026 algo data makes saves and DM shares the distribution signal while views carry almost no ranking weight (j1, j4, Second Brain).
3. The busy 6-9-reading-zone deck is the named 2026 anti-pattern. Deloitte recall data quantifies the fix: 3-or-fewer unique elements = 71% recall vs 34% at 6+ (j2). Capping every slide at 3 zones roughly doubles recall. This is the single most measurable change.
4. Studios do not out-design slide by slide. They win on governance: one master concept, 4-5 named layout roles, a hard element cap, a fixed 5-question review gate. Carter's Claude-Code + shotpls pipeline is already the 2026 agency standard; the missing layer is governance, not tooling (j2).
5. Every commodity AI tool ships the same thing: generic copy poured into a shared template pool, static-only, slide-capped, watermarked, with export-fidelity complaints. Zero do designed motion slides (j3).
6. The wedge is a designed animated video slide inside the carousel. Mixed-media hits 2.33% engagement vs 1.80% image-only, and the whole commodity category structurally cannot pull that lever. NEW: the deterministic build path is now sourced (htmlrec, HyperFrames, Remotion) and maps one-to-one onto shotpls.
7. Reject the cyber neon-and-dark cliche. The 2026 aesthetic is fleeing it; editorial-brutalist differentiates from the whole dribbble cyber tag at once and rides the trend (j1, j2).

---

## THE FINDINGS THAT MATTER (ranked)

### 1. The lane is open. Nobody with reach holds the designed-carousel position in this niche.
The two largest adjacent accounts are reels/face-first: @cybersecuritygirl (Caitlin Sarian, ~2M) and @sajjaad.khader (556K). @thecybersecurityhub (421K, ~19K posts) is an unbranded repost aggregator with zero house style. @coding_unicorn (97K) is posed-laptop photos plus a persona scandal (404 Media reported it is run by a male conference founder, not the "Julia" dev it portrays). True sub-100K cyber peers (@cyberwithsandra 97K, @sisinerd ~32K, @heroiccybersecurity ~12K) have no locked carousel identity. Source: j1, sourced to instagram profile snippets, amraandelma.com, 404media.co. Follower counts are snippet-sourced, possibly weeks stale.

### 2. Carter's image-over-text save data is market-validated, and saves are the distribution engine.
2026 algo weighting hierarchy (Second Brain, thesecondbrain.io/blog/why-carousels-are-the-best-format-in-2026): DM shares 3-4x heavier than a like, saves ~2x a like, comments ~2x a like, "views alone almost no ranking weight." A 10-slide carousel gives the algorithm 10 separate data points. Infographics/real artifacts are the save champions (j1: contentin.io, medium.com/@bhagyap26). This is why his artifact decks 5-12x'd views and up to 60x'd saves: the artifact drives saves, saves drive distribution, views are downstream not causal.

### 3. Poster not newspaper, quantified: Deloitte 71% vs 34% recall.
Geometric patterns with 3-or-fewer unique elements hit 71% recall in blind tests vs 34% at 6+ elements (Deloitte 2025, via packagetheworld.com, in j2). Carter's decks run 6-9 reading zones. The mechanism is peripheral-vision recognition collapse past ~3 elements. Caveat flagged by the scout: this is packaging research cited secondhand, not a carousel-native study; the mechanism transfers, the exact number does not.

### 4. Studios win on a governance system, and Carter's pipeline is already the standard.
"Master then scale" (Superside): ground on one message + one proof point, explore a handful of directions not a hundred variants, perfect ONE master concept that sets the bar, then scale as derivatives. 4-5 named layout roles (PostNitro): cover/hook, problem, teaching/proof, objection, CTA, each a distinct layout sharing one token layer. "Templates constrain decisions, not visual identity"; layouts "should feel related, not identical"; "dense slides CAN work when hierarchy is strong" (the problem is competing focal points, not density). Source: j2, superside.com, postnitro.ai. Renda (tryrenda.com) confirms the Claude-Code-artifact -> standalone HTML -> per-slide 1080x1350 PNG flow IS the 2026 agency workflow, and naive HTML-to-image tools fail on hydration wait, the fit-scaler white margin, and carousel chrome, all of which shotpls already solves.

### 5. The 5-question review gate (the single most stealable checklist).
PostNitro (postnitro.ai/blog/post/art-direction-definition), via j2: (1) does the cover make ONE clear visual promise, (2) do middles follow consistent composition logic, (3) do type/spacing/color behave predictably, (4) does the final connect to earlier slides, (5) would the post feel branded WITHOUT the logo. Q5 (logo-off recognizability) is the north star for a recognizable series that converts to follows.

### 6. The animated video slide is the wedge, and the build path is now concrete.
Mixed-media (image+video) carousels: 2.33% engagement vs 1.80%/1.74% image-only vs 1.45% video-only (SocialInsider Feb 2026, via j2/j3/j4; PostNitro). IG now allows 20 slides mixed photo/video, 60s each. Zero mainstream AI carousel tools do designed motion slides; only CarouselMaker.co and WaveGen touch MP4 and it is canned Ken-Burns pan/fade, not designed motion (j3). NEW, division-head-sourced build path: deterministic HTML-to-MP4 via headless Chrome frame-stepping (drive the page clock, capture each frame at an exact timestamp via beginFrame, pipe to ffmpeg) is the SAME deterministic headless-Chrome model shotpls already runs, just video out instead of PNG. Real-time screencast is explicitly NON-deterministic (frame timing depends on CPU load) and must be avoided. Three named, sourced routes:
- htmlrec / hrec (dsplce.co/blog/claude-animation-to-video): CLI, `brew install dsplce-co/tap/htmlrec ffmpeg`, `hrec render animation.html -o out.mp4`, explicitly built to render Claude-generated self-contained HTML with no modification.
- HyperFrames (github.com/heygen-com/hyperframes, Apache-2.0, v0.4.41, silenceper.com): HeyGen's open-source framework, AI-agent-oriented, frame-adapter pattern for GSAP/Lottie/CSS/Three.js, headless Chrome + ffmpeg, deterministic.
- Remotion (remotion.dev, 37.5k GitHub stars): React-component video, server-side headless Chromium render, the established social/programmatic option.
Governance rule to bake in (Metricool Feb 2026, via j2): keep the ENTIRE deck one aspect ratio (4:5); mixing ratios reduces engagement. Burn captions, assume sound-off. Placements: motion cover for scroll-stop, OR motion in slides 3-7 as the solution reveal, OR motion CTA close.

### 7. Commodity tools are beatable on every axis at once.
Universal shape (j3): input -> generic AI copy -> shared template pool -> static capped export -> watermarked free tier. The #1 complaint across Canva, Taplio, Predis, aiCarousels is "looks like everyone else," which their architecture guarantees. aiCarousels (3.8/5 Trustpilot, 43 reviews) has repeated complaints that the DOWNLOAD does not match the PREVIEW (pixelated, misaligned, shifted text) and the vendor blames the user's browser extensions. shotpls pixel-exact 2160x2700 render from a pinned viewport solves this by construction. Pricing band is $10-65/mo (PostNitro Creator $20, Predis $29-59, Taplio Standard $65), so the moat is quality not cost. Even the strongest adjacent carousel-craft evidence (tech_wizzdom's 238K-view carousel) was made with Second Brain, an AI-per-slide-bespoke generator, not a human template. The whole market is moving to bespoke-per-slide; our edge is bespoke-per-slide PLUS motion PLUS Carter's voice PLUS pixel-exact render.

### 8. The template market's best sellers converge exactly where Carter's winners already sit.
Faceless + image-artifact is the money keyword (Etsy top favorites: AndrewPixel 441, StudioAnnieLouise 194, j4). Premium lane = magazine/editorial (serif, real photography, structured grid); cheap lane = text on a soft gradient card. 814K+ carousel items on Creative Market plus MRR/PLR resale flooding make the template LOOK worthless as differentiation. Price ceiling ~$29 premium pack / $19-25 Canva bundle. We are not selling templates, so we can out-invest per slide. Source: j4.

### 9. Seamless bleed and cover-slide primacy: two cheap, sourced, high-signal wins.
Seamless bleed (a motif crossing the slide seam) lifts completion ~40% over standard multi-image posts (slidycreator, 2026-04-26, in j1/j4), trivial in an HTML-per-slide system. Slide 1 carries 60-80% of the swipe-through decision across every source; treat cover anatomy as its own discipline. Meta data (via creatorflow, j1 follow-up): carousels with 70%+ swipe-through get distributed to 3-5x more non-followers.

### CONTRADICTIONS FLAGGED
- Slide count: Second Brain says "5-7 sweet spot" and "10 slides is the max before completion drops below 60%" (thesecondbrain.io). j1/j4 and the broader cluster say "8-10 sweet spot" and "using all 10 slides pushes engagement above 2%." RESOLUTION: the reconciling pattern is "engagement drops after slide 3, picks up at slide 8+ when users commit to finishing" (creatorflow, trymypost, carouselli). 8-10 is the near-universal consensus; Second Brain's 5-7 is the outlier and it is a tool vendor selling short AI decks, so weight the 8-10 consensus. 12-20 only for deep guides/case studies.
- Text vs image carousels: one source (Buffer-leaning, via j1) says text-oriented carousels can out-engage image ones because short text tells stories, while infographics win on saves/authority. RESOLUTION (j1): "Carousels tell stories. Infographics prove points." Carter's winning decks carry BOTH a real artifact AND minimal words. His losers were all text, no artifact. Not a real contradiction once you split engagement (likes) from saves (authority/distribution).
- Engagement-rate stats vary source to source (1.92% highest-format vs 0.72% figures). Directional, each cited to its source, not reconciled to one number.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Cap every slide at 3 reading zones, hard blocker. Add it to the render/review checklist: >3 distinct zones = the slide fails and gets rebuilt. This is the single most measurable fix (Deloitte 71% vs 34% recall). One idea per slide, cover under 8-10 words, 15-20 words max on body slides.

2. Build a 4-5 named-layout-role system, not one template. Roles: cover/hook, problem, teaching/proof, objection/turn, CTA. Each is a distinct HTML layout with its OWN single-focal-point rule sharing the token layer. Encode into make-carousel so the LLM must assign every slide a role before writing its HTML. "Related, not identical."

3. Adopt master-then-scale as the deck workflow. Build and approve ONE hero slide (usually the cover) to completion first, lock its type scale, accent, and single focal point, then generate the rest as derivatives. One-line gate in the make-carousel skill.

4. Install the 5-question review gate as an automated post-render Claude vision pass over the 2160x2700 PNGs. Q5 (reads as branded with the logo removed) is the north star. Buildable now.

5. Build the animated video slide. Deterministic HTML-to-MP4 via headless Chrome frame-stepping + ffmpeg (NOT real-time screencast). Spike htmlrec first (it renders Claude-generated self-contained HTML unmodified, same input shape as shotpls), evaluate HyperFrames (Apache-2.0, AI-agent-oriented, GSAP/Lottie adapters) and Remotion. One motion slide per deck: motion cover, or mid-deck reveal (slides 3-7), or CTA close.

6. Keep the entire deck one aspect ratio (4:5 / 1080x1350) even with a video slide. Mixing ratios reduces engagement (Metricool Feb 2026). Burn captions, assume sound-off. Motion for pacing, not decoration; it must be visibly better than stock pan-and-fade or the wedge dulls.

7. Make the artifact the focal object of every slide, never text-on-a-color-block. Real cert badges, book covers, tool screenshots, salary numbers as hero art, roadmap diagrams. Artifact drives saves, saves drive distribution.

8. Reject cyber neon-and-dark. Go editorial-brutalist: oversized headline, type-as-hero, near-zero body copy, structured grid, one accent + neutrals, one emotional register per deck, no more than two type styles per slide. Differentiates from the whole dribbble cyber tag and rides the 2026 trend.

9. Ship seamless bleed (a recurring motif crossing the slide seam) for ~40% completion lift. Cheap in HTML-per-slide; the render just needs to account for the continuation across files.

10. Treat the cover as its own discipline. One massive claim/number/artifact, near-zero supporting text. It is 60-80% of the swipe-through decision and 70%+ swipe-through gets 3-5x non-follower reach.

11. Target 8-10 slides as default (12-20 only for deep guides). Do not follow the vendor "5-7" outlier.

12. Log performance back into the role library. Tag each shipped deck with its layout roles, focal choices, and saves in a JSON log so the role library self-improves each cycle. Build the governance layer, keep the pipeline.

---

## OPEN QUESTIONS

1. LOAD-BEARING, UNRESOLVED: no scout and no division-head search could view a single real competitor slide. Every IG profile and every mirror (picuki, imginn, picnob/pixwox) returned HTTP 403. All slide-level visual anatomy (cover/value/close layout, exact hex palettes, type stacks) is reconstructed from text and trend literature, not from seeing PNGs. An authenticated IG session must spot-check real posts before any visual description is treated as fact. This is the top priority to close.

2. No public slide-by-slide teardown of a specific viral cyber carousel exists. The strongest carousel-craft case in the adjacent niche (tech_wizzdom 238K views) was AI-generated via Second Brain, so it is not a human-designed exemplar to reverse-engineer.

3. No named in-the-wild creator (cyber or tech-career) shipping a video slide inside a carousel was found. The mixed-media engagement stat is real and repeated, but a proven @-handle case study is missing. Motion save-optimization specifically (vs overall engagement) is inferred, not sourced.

4. Follower counts, engagement percentages, and Predis pricing are snippet-sourced and vary across sources; treat as directional. The Deloitte 3-element recall number is packaging research cited secondhand, not carousel-native.

5. Depth of the two motion tools that ship MP4 (CarouselMaker.co, WaveGen) could not be verified visually; described as "transitions, camera motion, music" but not confirmed as designed vs canned without rendering a sample.
