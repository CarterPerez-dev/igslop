<!-- © AngelaMos | 2026 | division-c-reference-decks.md -->

# DIVISION C REPORT: Elite Reference Decks, Poster Theory, Anti-Slop, Type

Compiled 2026-07-10 from four scout files (c1 elite examples, c2 poster theory, c3 anti-patterns, c4 type trends) plus two division-head verification passes (IG mixed-media platform spec; named video-slide practitioner hunt). Recency priority: 2026 material foregrounded; canonical design theory labeled BACKGROUND because it does not expire.

Mission frame: Carter's carousels are competent but BUSY. Each slide stacks 6 to 9 equal reading zones (hud row, kicker, multi-line headline, rule, paragraph, tag row, stat block, pager, button). They read like designed newspapers. The target is posters: one focal point, two type sizes, near-zero body copy, one deliberate motion moment. This division supplies the reference bank, the theory that indicts the current deck, the tells to design against, the type system, and the platform spec that makes animated slides real.

---

## EXECUTIVE SUMMARY

1. The direct model to copy is Visualize Value (@visualizevalue, 482K): strict two-color, one-concept-per-frame, a FIXED vocabulary of ~12 reusable diagram devices. Recognizability comes from the locked system, not per-post novelty.
2. Three independent bodies of evidence converge on the SAME indictment of the current deck: Vignelli ("stick to one or two type sizes"), Smashing ("three hierarchy levels is all most people can discern"), and Krebs' 1,590-page slop study (our slide stacks 4-5 of his 16 mechanical AI tells at once). The 6-to-9-zone slide is the named failure state in all three.
3. Slop is a differentiation failure, not an ugliness failure. Built In: AI slop "has no position, resembles everything and argues for nothing." Our problem is indistinctness. The fix is one focal point per slide plus deliberate rhythm-breaking inside a fixed house style.
4. The animated-slide plan is platform-real and verified: Instagram supports mixing images + video in one carousel, up to 20 items, all slides sharing 4:5 (1080x1350), video up to 60s, MP4, sound-off autoplay. Mixed-media beats image-only on engagement across every source (~2.33% vs ~1.74 to 1.80%).
5. NO named creator runs a documented video-slide-inside-a-carousel workflow. Confirmed dead end, not a search miss: even 2Slides treats carousel and video as either/or outputs. That is the open lane, we would be first with a real one.
6. Type is the fastest escape from slop: kill geometric sans (Poppins/Montserrat read "budget template" in 2026), adopt a free 3-face system (condensed grotesque OR high-opsz Fraunces headline + grotesque body + mono accent), all Google-Fonts-embeddable.
7. The whole niche is open: the largest cybersecurity accounts (@cybersecuritygirl 2M) run busy conventional carousels. Nobody is poster-minimal. Visualize-Value-grade discipline is a genuine differentiator here.

---

## THE FINDINGS THAT MATTER (ranked)

### 1. Visualize Value is the direct model, and the model is a LOCKED SYSTEM not a look
Jack Butcher / @visualizevalue, 482K, ~1,099 posts (search snapshot, 2026). Strict black-on-white (or inverted), one concept per frame reduced to a diagram, near-zero words, a fixed toolkit of ~12 visual devices reused forever: scale, comparison, metaphor, flow, stacking, continuum, Venn, hierarchy, Cartesian plot, loops, spectra. Every post is instantly his because the vocabulary is small and locked. Source: designdisciplin.com/p/how-to-design-like-vv, visualizevalue.com/about, instagram.com/visualizevalue.
SO WHAT: define 8 to 12 locked slide archetypes and reuse them across every cyber topic. Recognizability is the system, not novelty. This is the exact opposite of stacking 6-9 zones.

### 2. Three sources independently name our exact failure: a hierarchy CONTINUUM instead of levels
- Vignelli Canon (primary PDF, read in full): "stick to one or two type sizes at the most." And the near-verbatim description of our deck: "Bad layouts have no space left for breathing, every little space covered by a cacophony of type-sizes, images, and screaming titles." Counter: "In a world where everybody screams, silence is noticeable. White space provides the silence." Source: rit.edu Vignelli Center PDF.
- Smashing Magazine (Dominance/Focal Points/Hierarchy): "Three levels is ideal; they're all that most people can discern... stick with three." Design for "distinct levels, not a continuum." Source: smashingmagazine.com/2015/02/design-principles-dominance-focal-points-hierarchy/.
- Krebs slop study (see finding 3): our stacked zones ARE the continuum both name.
SO WHAT: hard ceiling of two type sizes and three hierarchy levels per slide. More distinction comes from weight/color/space, never a fourth size.

### 3. The Krebs study is our self-audit blueprint, and we are currently "heavy slop" by it
Adrian Krebs, "Scoring Show HN submissions for AI design patterns," adriankrebs.ch/blog/design-slop (2026-04-20). 1,590 landing pages loaded in headless Chrome (Playwright), scored against 16 deterministic CSS/DOM tells, NO LLM judge. Buckets: 22% heavy-slop (4+ tells), 32% mild, 46% clean. Top single tells: permanent dark mode + grey body + all-caps labels 34%, gradient backgrounds 27%, icon-card grids 22%. The colored 3-4px left/side card border is independently ranked the #1 mechanical tell by two sources (a Krebs commenter: "as reliable as em-dashes for text"; vibecodekit.dev: "the single most reliable AI tell").
CRITICAL: we render HTML to PNG the same way Krebs rendered pages. His DOM/CSS tells are literally detectable in our own slide files. Our current slide stacks at least 4-5 of his 16 tells simultaneously (badge-above-headline, all-caps HUD labels, stat banner row, numbered pager, card-border chrome) = heavy-slop by his scoring despite high craft.
SO WHAT: build a deterministic DOM/CSS linter into the pipeline (see Directive 7). This is genuinely automatable QA.

### 4. The core sin is UNIFORM RHYTHM across the deck (the strongest "this is AI" signal)
2Slides, "Why AI Slides Look Fake in 2026," 2slides.com/blog/why-ai-slides-look-fake-and-how-to-fix (2026-04-17), citing a Q4-2025 eye-tracking study of 200 viewers. The #1 perceptual tell: uniform typographic rhythm, every slide the same headline length / word count / line-height. Human decks "swing wildly (3 words to 47 words); AI normalizes to a comfortable median." Fix: deliberately break rhythm (2-word slide next to 12-word slide), one 72pt pull-quote slide, one "confident emptiness" transition slide with no chrome. Their tool ranking makes the causal point: template-WITH-variation beats auto-generate-everything.
SO WHAT: variation is not taste, it is a metrics move. Every deck must swing word count on purpose and include one near-empty slide.

### 5. Slop = indistinct, not ugly (the thesis that reframes the whole project)
Built In, Tanya Donska, "The New Skeuomorphism," builtin.com/articles/ai-design-slop-era (2026-06-11): AI slop "is the average of all design ever fed into a model, rendered with enough technical competence to clear every review," it "has no position, resembles everything and argues for nothing," "technically correct the way a hotel room is technically furnished." Creative Boom (2026-04-21) corroborates: the complaints "aren't about aesthetics, they're about intention." mirra.my names the one carousel-specific tell: "a beautiful background with a generic phrase laid over it" ("Tips for growing on Instagram" fails; "The ads mistake that cost me $50K" wins).
SO WHAT: every element must justify its presence, and every cover must be specific + number-anchored. Intention is the whole game.

### 6. The animated-slide plan is platform-real (division-head verified 2026-07-10)
Confirmed across multiple 2026 sources (metricool.com, creatorflow.so, postnitro.ai, contentstudio.io, carouselli.com): Instagram supports mixing images AND video clips in one carousel; up to 20 items total; ALL slides must share one aspect ratio, so 4:5 video slides at 1080x1350 work alongside static PNGs; each video slide up to 60 seconds; export MP4 (MOV also accepted); autoplay is SOUND-OFF by default so burned-in captions are non-negotiable. File-size ceiling per video slide is reported inconsistently (postnitro says up to 4GB total per post; another 2026 source says 250 MB per video slide), so keep video slides short and light. Engagement: mixed-media ~2.33% vs image-only ~1.74 to 1.80% vs video-only ~1.45% (postnitro.ai, reelbase.io, marketingagent.blog). Subtle motion on slide 1 (cinemagraph / subtle zoom) reported +22% stop-scroll vs static header.
SO WHAT: the render path is buildable. Extend shotpls to capture N frames of one slide and stitch to a looping MP4 at 1080x1350, post as a mixed-media item. One motion moment per deck, not every slide.

### 7. NO named practitioner runs a real video-slide carousel workflow (confirmed dead end = open lane)
All four scouts hit this, and the division-head verification confirms it: the mixed-media TREND is well-quantified, but there is no named account with a documented video-slide-inside-a-carousel process to reverse-engineer. Even 2Slides' "one input, every format" workflow (2slides.com/blog/infographic-carousel-voice-video-creators) treats carousel and video as EITHER/OR outputs, never video-slides-within-a-carousel. Studio Feixen (@studiofeixen, 214K) and Emonee LaRussa (@em0n33y, 800K) are motion-CRAFT ceilings (seamless loops, one element / one motion / perfect loop), but neither is documented running video-slide carousels.
SO WHAT: this is the differentiation. A real, systematized video-slide carousel workflow would be first-of-kind. Study Feixen for the loop quality (single element, single motion, seamless loop point).

### 8. The motion ceiling and the parametric first asset
Studio Feixen: seamless looping moving posters, one dominant type object per frame, flat bold color, single element / single motion / perfect loop (itsnicethat.com/articles/studio-feixen-posters-graphic-design-230118). The ideal FIRST motion asset is parametric geometry: Muller-Brockmann's Beethoven poster (1955, via Kimberly Elam's Geometry of Design) is ZERO body copy, one modular system: arc rotation on an 11.25-degree module, arc widths doubling 1-2-4-8-16. Because it is parametric it is trivially animatable (rings drawing on, bars doubling).
SO WHAT: build the motion path against a parametric geometric slide first (rings/bars sweeping), monochrome + one accent, before attempting kinetic type.

### 9. Type is the single fastest escape from slop
c4 + 925studios converge: "Typography is the single fastest way to escape AI slop." Geometric sans is over: Typewolf 2026 usage data flags Montserrat/Poppins as "budget template" tells and Proxima Nova as dated. Free replacement system, all Google-Fonts, all base64-embeddable:
- HEADLINE (pick per deck): brutalist/urgent = Anton or Archivo Black (free Druk stand-ins) or Bebas Neue; editorial/authority = Fraunces at high opsz (72 to 144) with WONK glyphs ON, or Bricolage Grotesque display.
- BODY/SUB: Space Grotesk or Hanken Grotesk (grotesque, NOT geometric).
- ACCENT: a mono (Space Mono / IBM Plex Mono / JetBrains Mono) ONLY for kickers, stats, tags, code-strings. Mono-as-accent buys "technical credibility" for free and is a named 2026 trend, on-brand for cyber. Never mono body copy ("exhausting").
Signature move almost no competitor runs: high-opsz Fraunces with WONK on, over a single mono kicker.
Sources: madegooddesigns.com/font-trends-2026 (2026-05-21), typewolf.com, github.com/undercasetype/Fraunces, github.com/ateliertriay/bricolage.
SO WHAT: three faces max. opsz lets ONE massive headline carry the slide, doing the hierarchy work that stacked rows currently do.

### 10. One accent, spent on one thing (the 60-30-10 discipline)
c2 + c3: 60% dominant / 30% secondary / 10% accent; the accent is RESERVED for the single most important thing per slide (the number OR the CTA OR the keyword). "Overuse accent (25-30%) and it becomes noise instead of signal; accents are spices, not the main course" (uinica.com, hype4.academy). Our current HUD + tag row + button + stat all glowing at once pulls the eye four directions, a named clutter tell.
SO WHAT: one accent element per slide, full stop.

### 11. Poster composition rules for a 1080x1350 slide under 15 words
- ONE focal point, isolated, maximum figure-ground contrast, surrounded by air (Smashing figure-ground; Hofmann's Giselle = one huge vertical word + one cropped high-contrast photo + one micro accent, the dot on the i).
- Whitespace is the main material: pros leave 15-20% (up to ~60%) of the slide empty; "white space provides the silence" (Vignelli).
- Pick ONE contrast axis per slide and push it (big/small OR light/dark OR dense/empty), never all at once (Hofmann/Ruder).
- Break the grid exactly ONCE per slide (brutalist), not everywhere.
- Concrete size jump: 4:1 to 6:1 hero-to-support ("150pt against 24pt" poster; "64px next to 16px" editorial), nothing in between. Use a dramatic modular ratio (1.333 to 1.618), never a UI ratio (1.125). Keep the RATIO wide but absolute sizes at the editorial (not billboard) end to match Carter's tighter-density preference.
- The cover is a poster and carries the scroll-stop: 5-8 specific words, curiosity gap, high-contrast pattern interrupt resolving in under 50ms, min 4.5:1 contrast, a directional cue toward the right edge to invite the swipe.
SO WHAT: this is the composition spec for the new archetypes.

### 12. Series identity = house style + varied layout, NOT a cloned template
c3 + c1: fix a SMALL invariant set (palette, display face, voice, one signature motif/mark, structural language of thin rules + mono metadata) and deliberately VARY interior layout/scale/emphasis and which accent element changes. Modular components, not one template. DTC data: decks with only slight per-card variation see "swipe rates crater," so variation is measurable. The cover is the brand: every account cited for strength was cited for a recognizable cover.
SO WHAT: lock ONE cover archetype and the invariant set; vary everything else.

### 13. Bans and cautions (2026 named cliches)
Ban: geometric-sans display (Poppins/Montserrat/Inter as display), purple/indigo gradients (#6366F1 to #8B5CF6, "the single loudest AI tell"), gradient text, gradient-on-big-numbers, colored side-border stripes, 3-card icon grids, glassmorphism/liquid glass, bento grids, stock 3D blobs / isometric plastic / Corporate Memphis bendy-limb people (confirmed dead), grain on every slide, badge-above-headline, all-caps label rows as chrome, numbered pagers. For a CYBER brand specifically avoid neon/chrome/glowing-orb "machine logic" imagery (aigoodies.beehiiv.com): that is itself the cyber cliche. Caution: mono must EARN each use (decorative-mono-everywhere is a named tell, setproduct.com); keep body contrast high (APCA Lc >= 75) so brutalist never hides low contrast; motion must MEAN something ("motion for motion's sake" is a named 2026 cliche, Creative Boom).

### 14. Format experiments worth an A/B
- 3:4 (1080x1440) is new in 2026: more feed real estate, fills the new 3:4 profile grid uncropped. Cheap test against the current 1080x1350 (contentdrips.com, wavegen.ai). NOTE: this CONFLICTS with the mixed-media rule that all slides share one ratio and with the entrenched 4:5 default. Test as a whole-deck format, do not mix ratios in one post.
- Seamless 3-slide panorama (~80% swipe-completion, ~1.4x reach) is a separate weapon for wide diagrams (kill-chain, timeline). Constraint: must be ALL static, a video slide breaks it, so panorama and animated-slide are mutually exclusive in one post (postplanify.com, 7labs.io).

---

## CONTRADICTIONS BETWEEN SCOUTS (flagged, not smoothed)

1. Mixed-media engagement baseline. c1/c2 cite image-only at 1.80%; c3 and the division-head postnitro fetch cite 1.74%. Direction is identical (mixed ~2.33% wins); the image-only baseline is unsettled. Treat all absolute carousel percentages as directional vendor-blog tier, not peer-reviewed. Multiple scouts flag the same caveat.
2. Words-per-slide ceiling. Sources span "under 15" (micro-learning), "15-20 max," and "under 30." Resolution: treat 15 as the hard ceiling, aim lower on the cover. All scouts agree the cover carries the fewest words in the deck.
3. Video-slide file-size cap. postnitro says up to 4GB total per post; another 2026 source says 250 MB per video slide. Unsettled; keep video slides short and light to stay under either.
4. 3:4 vs 4:5. c1 promotes testing 1080x1440; c2/c3 and the mixed-media spec keep 4:5 as the entrenched default and require one ratio per post. Not a true contradiction, but they pull opposite directions: 4:5 stays the production default; 3:4 is a whole-deck experiment only.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Define a LOCKED library of 8 to 12 slide archetypes (hero-number, one-line-verdict, single-diagram, giant-word, tool-card, confident-emptiness transition, panorama-segment, cover). Reuse them forever. Recognizability = the system, per Visualize Value.

2. Enforce a hard per-slide ceiling: max 2 type sizes, max 3 hierarchy levels, max 2 reading zones, one accent element, one grid-break, ~40 to 60% empty. This is the anti-newspaper rule, backed by Vignelli + Smashing + Krebs simultaneously.

3. Build the modular type scale on one aggressive ratio (1.333 to 1.5) with a hero-to-support jump of 4:1 to 6:1 and nothing between. Keep absolute sizes at the editorial end (Carter's tighter-density preference) while keeping the RATIO wide.

4. Switch the type system to three free Google-Fonts faces: a headline (Anton/Archivo Black for brutalist, or high-opsz Fraunces-with-WONK for editorial), a grotesque body (Space Grotesk / Hanken Grotesk), and a mono accent (Space Mono / IBM Plex Mono / JetBrains Mono) used ONLY for metadata. Kill Poppins/Montserrat/Inter as display. Use opsz to let one headline carry the slide.

5. Break typographic rhythm on purpose in every deck: swing word count (a 2-word slide next to a 12-word slide), include exactly one 72pt pull-quote slide and one near-empty "confident emptiness" transition. Vary which accent element changes per slide. This defeats the #1 "this is AI" tell.

6. Make every cover a specific, number-anchored, curiosity-gap poster: 5-8 words, one focal point, high-contrast pattern interrupt resolving in under 50ms, min 4.5:1 contrast, a directional cue toward the right edge. Reject any "pretty background + generic phrase" cover. Lock ONE recognizable cover archetype as the brand anchor.

7. Build a deterministic DOM/CSS slop linter into make-carousel (we render via headless Chrome exactly like Krebs). Flag: badge-above-headline, all-caps label rows, gradient text, gradient-on-number, colored side-border stripes, 3-card icon grids, purple/indigo accents (#6366F1 to #8B5CF6), uniform 16px radius, uniform padding, mono-as-body, and reject any deck where all interior slides share one layout hash. Add a WCAG/APCA contrast check (>=4.5:1 / Lc >=75) and a per-slide word-count check (fail over ~15 words) and a type-size check (fail over 3 sizes or under 4:1 hero-to-support).

8. Add a squint/blur validator: after shotpls renders each 2160x2700 PNG, generate a heavily Gaussian-blurred copy (Pillow via uv, or ImageMagick in the Justfile); if no single element still dominates the blur, the slide fails the poster test.

9. Build the animated-slide render path: extend shotpls to capture N incremental frames of one slide and stitch to a looping 1080x1350 MP4 (ffmpeg), post as a mixed-media carousel item. Platform is confirmed: one ratio across all slides, video up to 60s, MP4, sound-off (burn in captions), keep the clip short and light. First asset = parametric geometry (Beethoven-style rings/bars sweeping), monochrome + one accent. One motion moment per deck (slide 1 hook OR mid-deck payoff), never decorative looping.

10. Adopt seamless bleed as the swipe cue and RETIRE the numbered pager (pagers are a named tell). One element (line, arrow, diagram) bleeds across the slide boundary; reserve 3-slide all-static panoramas for wide topics (kill-chain, timeline), and remember panorama and animated-slide are mutually exclusive in one post.

11. Enforce 60-30-10 color: one accent, spent on exactly one thing per slide. Palette 3 to 5 colors total. No decks where HUD + tag row + button + stat all glow at once.

12. Make the final slide a save-earning reference/checklist with the comment-keyword DM CTA (algorithm weights saves and DM-shares 3-5x over likes). Reserve human effort for the hook, the punchline, and one specific detail; let the pipeline own structure, spacing, and the type system.

---

## OPEN QUESTIONS

1. No live Instagram profile/post DOM is fetchable (WebFetch returns the SPA shell), so all follower counts are third-party search snapshots and no standout carousel POST could be measured slide-by-slide for exact type sizes / words-per-slide. A manual Instagram pull (screenshots into a vision pass) is the only way to get measured reference anatomy.
2. No named creator with a real video-slide-inside-a-carousel workflow exists in the public record (confirmed, not a search miss). We will be defining this workflow ourselves; there is no template to reverse-engineer. Feixen/LaRussa are motion-craft refs only.
3. Video-slide file-size cap conflicts across 2026 sources (4GB total vs 250 MB per slide) and per-frame cadence for "hold and scroll" flipbook motion has no published number. Tune empirically when the render path is built; keep clips short and light to stay under either cap.
4. Whitespace has no validated PERCENTAGE (the "80% negative space / one dense cluster" figure is an editorial heuristic, not a measured study). Tune the squint validator by eye rather than to a fixed number.
5. All 2026 carousel engagement percentages are vendor-blog tier, directional only. The ranking (carousels > reels/static; mixed-media > image-only) is firm; the absolute numbers are not gospel.
6. 3:4 (1080x1440) vs 4:5 (1080x1350): keep 4:5 as the production default and required ratio for any mixed-media (video) deck; run 3:4 as a whole-deck A/B only, never mixed within a post.
