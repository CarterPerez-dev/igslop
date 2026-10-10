<!-- © AngelaMos | 2026 | wave2-completeness-critique.md -->

# WAVE 2 COMPLETENESS CRITIQUE

Compiled 2026-07-10. Role: completeness critic for Operation Carousel Maxx Wave 2.
Scope reviewed: Divisions G (adjacent platforms), H (psychology), I (visual craft), J (competitor teardowns), K (AI imagery), L (distribution).

## STATE OF THE EVIDENCE

Only DIVISION G produced a written report (division-g-adjacent-platforms.md) plus one raw scout (g3-pinterest-x-threads.md). Divisions H, I, J, K, and L have NO written output on disk. So the bulk of Wave 2's declared scope is unfilled. This critique targets the specific, highest-leverage gaps within those scopes that materially change what gets built, each grounded in a real source found during this pass.

## THE SIX GAPS (ranked by build impact)

### 1. competitor-teardown-pixel-level (Division J) — the biggest hole
Division G's own OPEN QUESTIONS admit there is no pixel-level teardown of any real competitor deck. We are rebuilding to "beat the best carousels on Instagram" without having visually analyzed a single one. We have NAMED targets now but zero design breakdowns:
- Educational/text-brutalist creators closest to Carter's niche: Chris Do (@thechrisdo, "educational design breakdowns, clear slide progression"), Alex Hormozi (@hormozi, "sharp high-contrast slides, strong opening claim then step-by-step"), Sahil Bloom (@sahilbloom, "swipeable story arcs, problem-to-solution"), Justin Welsh (@thejustinwelsh, "minimalist bold, hook-to-conclusion, bookmarkable reference"). Source: amraandelma.com/influencers-making-carousels-go-viral (fetched).
- Cyber-native accounts: @thecybersecurityhub (421K), @SANSInstitute single-reference posters (verified in g3). Source: instagram.com/thecybersecurityhub, x.com/SANSInstitute.
WebFetch is login-walled on Instagram and 403s on X, which is exactly why this never got done. Needs the chrome-devtools MCP (navigate + screenshot) to capture and teardown real decks slide by slide: focal point, type scale ratios, palette count, words-per-slide, cover-slide anatomy.

### 2. carousel-psychology-mechanism-map (Division H)
The psychology in circulation is all agency-blog assertion (Zeigarnik, open loops, curiosity gap, Loewenstein information-gap). Two things missing: (a) a FIRST-PARTY grounding, and (b) a concrete mechanism-to-slide-structure mapping the make-carousel skill can enforce. A real peer-reviewed anchor now exists and nobody read it: "The carousel effect: leveraging sideways swiping for enhanced ad effectiveness in social media," Rohrbach/Bruns/Langner, International Journal of Advertising, published online 2026-02-19, CC BY 4.0. Mobile eye-tracking, four experiential themes (curiosity, convenience, perceived control, immersion), finding that activated carousels raise attention and brand recall and LONGER carousels raise attention further. Source: tandfonline.com/doi/full/10.1080/02650487.2026.2624918 (403 to WebFetch, verified via search + researchgate + imotions mirror). Fetch the open-access PDF and convert the four themes plus the eye-tracking findings into per-slide rules.

### 3. seamless-panorama-technique (Divisions H + I)
A concrete, pipeline-native craft technique that no report covered and that directly attacks completion rate: the seamless panorama / continuous canvas. Design ONE wide canvas (slides x 1080px), slice into 1080x1350 frames so an image bleeds across the slide edge; the partial-image-past-the-edge triggers a visual-closure drive. Reported swipe-through 2x higher than discrete-slide carousels. Source: 7labs.io/article/seamless-instagram-panorama-carousel-free-tool, futuristicmarketingservices.com carousel guide, socialhabitmarketing.com. This maps perfectly onto the HTML/shotpls terminal pipeline (render a 3240px-or-wider artboard, slice at render). It is both a psychology finding (visual closure) and a composition-craft finding, and it is buildable now.

### 4. ai-hero-artifact-generation (Division K) — produced nothing
Division K (AI imagery that does not read as slop) has zero output, yet Carter's OWN data says image-artifact decks (badge, book-cover) did 47-65k views / 2,700-6,600 saves versus 10-18k / 100-570 for text-template decks. The winning move is a legible hero artifact, and 2026 tooling can now GENERATE that from the terminal. Ideogram 4.0 (open-weight, June 2026) accepts structured JSON prompts pinning elements to bounding-box coordinates, locking a palette to exact hex, styling each text line, at native 2K with optional transparent background: legible text-in-image is its whole point. Recraft V4 holds a brand palette across dozens of variations. Sources: ideogram.ai, recraft.ai/ai-models/ideogram, medium.com/@cliprise AI image 2026 guide. Nobody researched a slop-avoidance workflow (style reference / brand library / hex lock) or whether Ideogram's API can slot into the render pipeline to mint hero artifacts on demand.

### 5. distribution-signal-and-seo-mechanics (Division L) — produced nothing
Division L (getting the deck seen) has no output, and this changes the caption, CTA, and alt-text of EVERY deck, not just the pixels. Grounded 2026 mechanics found: DM sends/shares are the single most powerful reach signal (Mosseri), weighted 3-5x over likes, so decks must be built to be SENT not just saved. Keyword-in-caption and manually written ALT TEXT now drive Explore/Search more than hashtags (3-5 niche tags max, role demoted to categorization). Last-slide CTA lifts engagement 20-30%. Part-1/Part-2 series convert followers by fear-of-missing-the-next. Hitting ~80% completion on a 10-slide deck boosts Explore distribution. Sources: truefuturemedia.com instagram-reach-2026, later.com/blog/instagram-seo, creatorflow.so instagram-carousel-posts-guide, cometly.com instagram-carousel-post. Needs a distribution checklist baked into the pipeline (alt-text generation, keyword caption, send-bait CTA, series linkage).

### 6. animated-slide-production-path (spans I + K + L)
Division G asserts the mixed-media lift (2.33% vs 1.80%, ~29% relative, plus the competitor "animated video slide inside the deck" observation) but explicitly flags it as UNVERIFIED on our stack. The production reality is now researchable: HTML/CSS/GSAP animations render to mp4 via timecut/timesnap or CDP+ffmpeg frame-by-frame (Chrome 132+ headless), the same headless-Chrome family shotpls already uses. Sources: github.com/tungs/timecut, github.com/dtinth/html5-animation-video-renderer, copyprogramming.com headless-chrome-capture-2026-guide. Missing: whether a shotpls-adjacent mp4 path is cheap to add, what a count-up/reveal hero costs to produce, and whether an animated hero actually out-saves a static one for a cyber audience (needs a small A/B, not more reading).

## NOTE ON SCOPE
Excluded per brief: Instagram algorithm internals, Claude/terminal workflow, reference-deck libraries, asset APIs as a category, motion-pipeline architecture, and overall system architecture (all Wave 1). The animated-slide gap here is scoped narrowly to the CRAFT/production/distribution question, not the Wave 1 pipeline architecture.
