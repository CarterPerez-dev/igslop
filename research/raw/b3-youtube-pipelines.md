<!-- © AngelaMos | 2026 | b3-youtube-pipelines.md -->

# DIVISION B3: Claude Code Carousel and Design Workflows in the Wild

Research date: 2026-07-10. Recency window prioritized: April to July 2026. Older material labeled BACKGROUND.

Scope: YouTube tutorials and public walkthroughs on making Instagram carousels / social graphics with Claude (especially Claude Code in the terminal), the exact render/iterate/animate pipelines they demonstrate, and the mid-2026 AI-carousel-generator tooling landscape we are competing against.

Note on YouTube fetching: YouTube video pages return only footer nav to WebFetch (no transcript, no description body). Every YouTube fact below (title, ID, date, view count) comes from search-result snippets, not from a fetched transcript. Where a snippet did not state a channel name or a number, that gap is flagged explicitly. Written blogs and GitHub repos WERE fetched in full and are the primary source of the step-by-step pipeline detail.

---

## SEARCHES RUN (actual queries)

1. Claude Code terminal Instagram carousel tutorial 2026
2. make Instagram carousel with Claude AI HTML render tutorial youtube
3. Claude Code design social media graphics workflow youtube 2026
4. AI carousel generator Instagram 2026 tool
5. "How to Create VIRAL Instagram Carousels with Claude" HTML to PNG Claude Code prompt
6. Claude Code carousel HTML puppeteer screenshot 1080x1350 render slides
7. animated Instagram carousel video slide 2026 trend
8. Claude Code skill carousel HTML render png template youtube walkthrough June 2026
9. "jFAH0txMwiI" OR "INSANE Instagram Carousels" Claude Code channel creator
10. Claude Code screenshot visual QA loop iterate design agent feedback render image
11. Peter Yang Claude Code slides skill styles.md screenshot QA loop
12. PostNitro aiCarousels features 2026 templates brand kit review comparison
13. "Claude Code" carousel tutorial youtube channel Riley Brown OR Elvis OR "AI Advantage" OR McKay Wrigley 2026
14. Claude Design 30 social media posts 10 minutes youtube channel creator walkthrough
15. seamless carousel Instagram bleed slides how to design overflow 1080 continuous image 2026
16. "I Built an Instagram Carousel Generator" Claude Code 59TQNbMi3J4 walkthrough steps
17. Claude Code HTML CSS animation to mp4 video carousel slide ffmpeg puppeteer capture frames 2026
18. "Your Claude Code Carousels Suck" fix poster design one focal point transcript
19. aiCarousels carousel to video convert animated LinkedIn Instagram feature 2026
20. "huashu-design" OR "html-ppt-skill" Claude Code slides MP4 GIF export social 2026
21. "Your Claude Code Carousels Suck" youtube channel name creator 7taGazHQkMg
22. "gak1lXF77D8" OR "Claude AI Creates Instagram Carousels For You" channel creator no design needed

Pages fetched in full: ryanfrizelle.com carousel guide (twice, deeper on second), github Hainrixz/open-carrusel CLAUDE.md, github theonlyhausofai-design/open-carousel, creatoreconomy.so Peter Yang slides guide, github ktundwal/presentation-skills, github neonwatty/css-animation-skill, onewave-ai HyperFrames blog, dsplce.co HTML-to-MP4 blog, claudemarketplaces.com marcolang instagram-carousel skill, creatorflow.so carousel guide, github ToseaAI/awesome-html-slide-skills, techpresso academy poster prompts.

---

## FINDINGS

### A. YouTube videos identified (2026, carousel + Claude / Claude Code)

Dates and view counts below are from search snippets only. Channel names were NOT surfaced in most snippets; those are flagged UNKNOWN. Treat the exact pipeline claims tied to these videos as second-hand (from the search snippet) unless separately corroborated by a fetched blog/repo, which several are.

- "How I Use Claude Code to Make INSANE Instagram Carousels (for beginners)" — youtube.com/watch?v=jFAH0txMwiI — approx May 28, 2026 — channel UNKNOWN (snippet referenced a "Claude Code Club" community with a $9 paid tier; not confirmable). Terminal-based Claude Code carousel build for beginners.
- "How to Create VIRAL Instagram Carousels with Claude" — youtube.com/watch?v=hNoyOFdk7ig — approx May 12, 2026 — channel UNKNOWN. Snippet says it bundles a "Claude Prompt," an "HTML to PNG Claude Code" step, and a "Carousel Long Form Repurposing Prompt." This is the closest match to Carter's HTML-to-PNG pipeline.
- "Claude AI Creates Instagram Carousels For You (No Design Needed)" — youtube.com/watch?v=gak1lXF77D8 — April 26, 2026 — channel UNKNOWN. "In 5 minutes" framing.
- "How to Create UNLIMITED Viral AI Carousels in Claude" — youtube.com/watch?v=QeV04PFPNck — approx March 28, 2026 (BACKGROUND, pre-window) — channel UNKNOWN. Makes carousels inside Claude without an image generator.
- "I Built a Viral Instagram Carousel Generator (Claude Code Tutorial)" — youtube.com/watch?v=Vp3s6YP2Dro — approx April 6, 2026 — channel UNKNOWN. Ships a free template.
- "I Built an Instagram Carousel Generator (With Claude Code)" — youtube.com/watch?v=59TQNbMi3J4 — date UNKNOWN — channel UNKNOWN. Matches the Ryan Frizelle written guide almost exactly (CAROUSEL-BRAND.md + slash command + Gemini image gen), likely the same author or a re-teach.
- "Your Claude Code Carousels Suck (Here's The Fix)" — youtube.com/watch?v=7taGazHQkMg — June 2, 2026 — channel UNKNOWN (snippet mentions a linked Skool community). This is the single most on-point title for Carter's exact problem (busy carousels), but no transcript was fetchable and no channel name surfaced. GAP: content unverified beyond the title.
- "Claude Code Just Changed Social Media Carousels Forever" — youtube.com/watch?v=REEzMNF54GY — date UNKNOWN — channel UNKNOWN.
- "Create Viral Carousels with Claude (for Free)" — youtube.com/watch?v=4O-fMaxdGAg — date UNKNOWN — channel UNKNOWN.
- "How I'm Creating Unlimited Viral AI Carousel Images with Claude (100% Works)" — youtube.com/watch?v=OFoNYWIS7IA — date UNKNOWN — channel UNKNOWN.

Design-tool (non-terminal) carousel videos, for landscape awareness:
- "I Created 30 Social Media Posts in 10 Minutes Using Claude Design" — youtube.com/watch?v=diw7gspqWAk — Claude Design (web product, not terminal).
- "I created 60 Social Media Designs in 8 Minutes using Claude + Canva" — youtube.com/watch?v=3ysZujOI-NE — Claude + Canva connector.
- "I Created 32 Social Media Posts in 10 Minutes Using Claude + Canva" — youtube.com/watch?v=ngXvG87RZOA.
- "I Created 33 Social Media Posts in 10 Minutes with Claude AI (No Canva Required)" — youtube.com/watch?v=jy1eE2yn_nw.
- "huashu-design: The Claude Code Skill That Replaces Figma" — youtube.com/shorts/PxFNqww75ao (Short).

Named creators in the general Claude Code space (context, not carousel-specific): Riley Brown (youtube.com/@... , self-described "number one vibe coding channel," builds Chorus), McKay Wrigley (youtube.com/@realmckaywrigley). Neither surfaced with a dedicated carousel video in these searches.

### B. The dominant Claude Code carousel pipeline (two schools)

Two distinct architectures are being taught. Carter's shotpls pipeline is squarely School 1 and is the more advanced of the two.

SCHOOL 1: standalone HTML per slide -> headless Chrome screenshot -> PNG. This is Carter's exact model and the more design-controlled path.

SCHOOL 2: Claude writes copy only -> hand off to Gemini image generation or Canva connector for pixels. Faster, less control, dominant among non-developers.

### C. School 1 pipeline detail (HTML -> PNG), fully sourced

1) marcolang "instagram-carousel" Claude Code skill (claudemarketplaces.com/skills/marcolang/marketing-skills/instagram-carousel). This is basically Carter's architecture written up as a public skill, and it confirms the load-bearing render trick:
- Layout viewport: 420px wide by 525px tall. Output PNG: 1080x1350 per slide.
- Scaling method: Playwright async API with device_scale_factor = 2.5714 (1080 divided by 420), clip = {x:0, y:0, width:420, height:525}. Verbatim rule: "Keep the 420px layout width, use Playwright's device_scale_factor to scale up to 1080px output WITHOUT changing the layout viewport." (Note: Carter renders at true 1080x1350 CSS px at 2x scale to 2160x2700, which is a different, higher-fidelity choice. The 420px trick is a shortcut others use to reason about layout at a smaller number.)
- Images embedded as data:image/jpeg;base64 URIs, never relative paths. Explicit warning that relative paths break in every browser context except the exact folder.
- HTML written via Python Path.write_text(), never shell echo/heredoc, to stop $ and backtick from corrupting base64. (Carter already avoids this by writing files with the Write tool.)
- 6-token color system derived from ONE brand hex: BRAND_PRIMARY, BRAND_LIGHT, BRAND_DARK, LIGHT_BG, LIGHT_BORDER, DARK_BG.
- Standard 7-slide sequence with alternating light/dark backgrounds for rhythm: Hero (light) hook+logo, Problem (dark), Solution (gradient), Features (light), Details (dark), How-to (light), CTA (gradient, no arrow, full progress bar).
- Required chrome per slide: 3px progress bar bottom, fill = ((slideIndex+1)/totalSlides)*100%, "1/7" counter, 24x24 SVG chevron swipe arrow on all but last, content padding 0 36px (0 36px 52px when bottom-aligned).
- Typography: heading/body Google Font pair (example Playfair Display + DM Sans), fixed scale headings 28-34px, body 14px, tags 10px uppercase.
- This is IMPORTANT context: the "competent but busy" newspaper look Carter is trying to escape is literally the DEFAULT this popular skill ships (progress bar + counter + arrow + kicker + alternating cards on every slide). We are competing against a template everyone else installs.

2) Hainrixz/open-carrusel and theonlyhausofai-design/open-carousel (same codebase, forks). Author of the canonical fork: Enrique Rocha ("tododeia", Tijuana). MIT license. Full web app, but the render contract is instructive:
- Slides stored as body-level HTML only (no html/head/doctype). A single function wrapSlideHtml() in src/lib/slide-html.ts wraps that body into a full document with font loading + dimension constraints, and serves the SAME wrapped HTML to both the preview iframe and the export renderer. Their principle, verbatim: "What you see is exactly what you export. No surprises."
- Export: Puppeteer (headless Chromium) screenshots each slide at exact Instagram dimensions, then Sharp compresses, then Archiver zips.
- Dimensions offered: 1080x1080 (1:1), 1080x1350 (4:5, recommended), 1080x1920 (9:16). Max 10 slides.
- Preview iframes use sandbox="" (no JS, no script tags) for safety.
- Claude CLI runs as a SUBPROCESS spawned from /api/chat with flags --allowedTools Bash WebFetch. Claude writes slide HTML, curls it to /api/carousels/[id]/slides, and it appears in the filmstrip in seconds.
- Animation posture: CSS-first, cites Emil Kowalski's philosophy, custom easings as CSS vars in globals.css, uses @starting-style over JS, respects prefers-reduced-motion. Video/Reels slides = roadmap only, not implemented.
- Stack: Next.js 16 (Turbopack), React 19, TS 5, Tailwind v4, Radix, dnd-kit for drag reorder, per-slide version history/undo, JSON files + async-mutex atomic writes (no DB).

3) jeevanbavandla/instagram-carousel-skill: "Generate pixel-perfect Instagram carousels in your brand. Claude Code skill + Claude.ai version." (Not fetched in depth; same School 1 family.)

### D. The single highest-leverage technique: the visual QA loop (Claude's own eyes)

This is the biggest actionable insight for us and it is repeated across every serious source.

- Peter Yang (@petergyang), creatoreconomy.so, "Build Beautiful Slides with Claude Code in 12 Minutes," May 27, 2026. His /slides skill turns a rough outline into a single dependency-free HTML deck. 6-step build: (1) read skill.md + styles.md, (2) clarify topic, (3) research online, (4) generate deck as ONE HTML file, (5) run a "visual QA loop with screenshots," (6) deliver. 12 formats (cover, agenda, two-column, stat grid, feature bento, comparison, timeline, chart, plus more), 3 templates (default warm/red, dark/yellow, light Apple-minimal). Supports subtle motion + Chart.js. X post: x.com/petergyang/status/2059642246614647259.
- ktundwal/presentation-skills (GitHub), tagline "visual QA feedback loops powered by Claude's vision." Verbatim: "Claude generates presentation markdown, renders it to images, then uses its vision capability to inspect each slide, catching layout issues, text overflow, and contrast problems that would be invisible from markdown alone." (Repo README is conceptual; exact renderer/iteration count not published on the landing page.)
- General agentic-coding sources converge on the same loop and quantify it: render -> screenshot -> paste image back to Claude -> specific feedback -> repeat. Reported cadence: 2 to 3 rounds, roughly 8 minutes, reaching 80 to 90% of production-quality layout; each round catches problems the previous fix introduced. (Sources: tweag.github.io agentic-coding-handbook VISUAL_FEEDBACK; Tal Rotbart, "Giving Claude Code Eyes: Round-Trip Screenshot Testing," Medium; superdesign.dev; youcanbuildthings.com.) Named QA-dimension skills exist (dylanfeltus visual-qa; "Visual Verdict QA") that check 7 categories (layout, spacing, alignment, contrast, typography, responsive, etc.) and return prioritized issues WITH exact measurements.

Bottom line: the frontier workflow is not "render once and eyeball the PNGs." It is Claude rendering its own PNG, reading it back through vision, and self-correcting overflow/contrast/alignment before a human ever looks. Carter's shotpls already produces the PNG; he is missing the automated read-back-and-fix leg.

### E. Animation: three real HTML-to-video paths (the "animated slide" competitive frontier)

The animated-carousel-slide trend is real and there are three shipping ways to produce a video slide from HTML in a terminal pipeline. All use headless Chrome frame-stepping + FFmpeg, i.e. the same family as shotpls.

1) HyperFrames (heygen-com/hyperframes) — HeyGen, open source, free, installs as a Claude Code skill. Loads HTML in headless Chrome, steps frame by frame (frame = time x fps), encodes with FFmpeg, DETERMINISTIC. Timing via data-* attributes: data-start (ms), data-duration (ms), data-track-index (layer). Motion from a paused CSS animation timeline the renderer seeks. Defaults 1920x1080 at 30fps, MP4 (WebM for transparency). Install: npx skills add heygen-com/hyperframes ; npx hyperframes init my-video. Commands: lint / inspect / preview / render. Claude Code authors the markup, one render command emits the MP4. Sources: onewave-ai.com HyperFrames blog; github heygen-com/hyperframes CLAUDE.md; mindstudio.ai HyperFrames+ElevenLabs guide.
2) htmlrec (Rust CLI, "hrec") — from dsplce.co "HTML/CSS Animation to Video (MP4): the Headless Deterministic Way." Headless Chrome drives the browser clock directly, grabs each frame at a precise timestamp (not screen recording, so no dropped-frame jitter), FFmpeg stitches. Command: hrec render animation.html -o out.mp4 --width 1920 --height 1080 --duration 3 --fps 60. Defaults 1280x720 / 30fps / 5s. CI-friendly, no display needed. Claude writes the HTML+CSS keyframes, you run one command.
3) huashu-design (alchaincyf/huashu-design) — 19,500+ stars, MIT since 2026-05-14, "HTML-native design skill for Claude Code," agent-agnostic. Does prototypes / slides / animation + a 20-item design-philosophy set + a 5-dimension self-review + MP4/GIF export. Export detail: MP4 25fps or 60fps interpolation + palette-optimized GIF + background music, plus editable PPTX via html2pptx.js. Install: npx skills add alchaincyf/huashu-design. This is the most complete "design brain + export" skill in the wild and it directly bundles the 5-dimension review (the QA loop) with MP4 export.
4) neonwatty/css-animation-skill — generates self-contained interactive HTML/CSS animations (~30KB), two styles: Feature Demo (before/action/after) and Carousel (multi-view cross-fade). Output is interactive HTML, NOT video; you would still need to frame-capture it to get a carousel-ready MP4. Useful as the animation-authoring layer feeding path 1 or 2.

The trend data justifying the effort (from carousel-trend blogs, cite with caution as vendor content): "Hold and Scroll" / flipbook carousels that animate on swipe; "Mixed" carousels interleaving 5-10s video clips between static slides reportedly hit ~2.33% engagement and beat image-only or video-only; seamless (image bleeds across slide boundary) reportedly ~40% higher completion and ~2x swipe-through vs discrete slides. Instagram carousels overall cited at ~1.92% engagement vs ~0.50% Reels, ~0.45% static (slidycreator, marketingagent.blog, newengen, 2slides, scrolo, krumzi — all marketing blogs, treat numbers as directional not gospel).

### F. Seamless / panoramic carousel mechanics (pure design, portable to our HTML)

- Build one wide canvas 1080*N wide by 1350 tall, slice every 1080px; place a focal element ON the 1080px seam so it bleeds across the swipe boundary and creates the urge to continue.
- Swipe cue (arrow or partial image bleed) on the right edge of slides 1 through 9. Sources: postplanify, trymypost, sproutsocial, planable, mysocialboutique (Canva how-to). This is trivially doable in Carter's per-slide HTML by giving each slide a background-position offset of -(index * 1080)px against a shared wide background, no new tooling.

### G. School 2 pipeline (copy-only handoff), for completeness

- Ryan Frizelle, "Automate Instagram Carousels with Claude Code" (ryanfrizelle.com/guides/claude-code-carousel-generator; also appears to back the "I Built an Instagram Carousel Generator (With Claude Code)" video, ID 59TQNbMi3J4). Pipeline: analyze best-performing posts -> write a CAROUSEL-BRAND.md at repo root (5 sections: Active Style, Color Palette in hex, Typography Direction, Slide Type Templates with {{variable}} placeholders for cover/problem/list/steps/before-after/CTA, Hard Rules incl. "no em dashes / no emojis / no clip art") -> a /post-carousel slash command reads that file FRESH and UNCACHED every run, analyzes recent work, drafts a 7-slide structure, writes per-slide copy, fills image prompts with brand vars -> generates each slide image with Gemini 3 Pro Image Preview ("nano banana") at 1080x1080 -> saves locally -> auto-schedules to Instagram at 2 PM. Claim: 30 min per carousel down to 3 min of approval. No HTML, no video slides. Repeated warning: "Your brand file has to be read fresh every single run, never cached."
- creatorflow.so "How to Make Instagram Carousels With Claude AI" (Ralu, reviewed Cristian, updated Jul 4, 2026): Claude does COPY ONLY (text; no native image gen), 5 steps, structure-before-copy (approve a 7-10 slide skeleton FIRST, then write copy), headlines under ~10 words, one idea per slide, 1080x1350, up to 20 slides, ends on "comment [KEYWORD]" DM-funnel CTA. Batch trick: one transcript -> 5 carousel outlines at once ranked by fit.

### H2. Competitor scoring + the two-school split (independent corroboration, added 2026-07-10)

Corroborating pass with fresh searches. Confirms the sections above and adds sourced specifics not previously captured.

- postunreel.com "Best AI Carousel Generators for Instagram" (dated March 18, 2026) frames the 2026 field as splitting into "slide stitchers" (generate independent images, drift slide to slide) vs "intelligence-first" (hold brief + brand book + context across every slide). It scores 10 tools weighting originality 25%, speed 20%, design quality 15%: Leonardo.ai #1 (90/100, diffusion "paints your carousel from scratch," bespoke one-of-a-kind art), Predis.ai #2 (85, but visuals live in a SHARED template pool so frequent users trigger repeat-design recognition), Postunreel #3 (86, free, article-to-carousel, smaller template library), then ContentDrips, Simplified, Canva #6 (77, template king, manual), aiCarousels #7 (73, tight visual options), Unifire.ai, Piktochart (chart/infographic slides), Venngage. Verbatim critique of Predis: repeated designs are recognizable. NONE of the 10 offered animated/video slides in that analysis.
- wavegen.ai "Best AI Carousel Generators 2026 (Tested & Compared)" (updated May 2026): WaveGen is the ONLY tool flagged as generating a native ANIMATED slideshow VIDEO (for TikTok); every other tool produces static slides. WaveGen: paste blog/newsletter/transcript, get LinkedIn carousel PDF + Instagram 1080x1350 + TikTok slideshow + caption, schedules across 5 platforms with first-comment automation, under 2 min. Free tier; $29 to $99/mo. Same page pricing: Canva free/~$15, ContentDrips free/$15-26, PostNitro free/~$20-25, Gamma free/$8-20 seat, aiCarousels free/$14.95, Taplio $39-199 (LinkedIn only). Confirms "no terminal/code-based tools" among the mainstream SaaS.
- predis.ai (product page): one-line prompt to slide layouts + copy + caption + hashtags in seconds, auto-publish to IG in-dashboard. Reinforces the shared-template-pool tell noted above.

### H3. Fourth animation path + video-slide specs (added 2026-07-10)

- dtinth/html5-animation-video-renderer (github, background/pre-window but the cleanest deterministic recipe): frame-BY-frame capture, Puppeteer opens Chrome and calls seekToFrame(n) per frame, screenshots piped DIRECTLY to ffmpeg (no disk intermediates). Page must implement getInfo() (fps + numberOfFrames) and seekToFrame(n) (Promise-capable). Tested 1080p60. Parallelizes across CPU cores via --parallelism. Outputs mp4 / PNG sequence / alpha-channel .mov. Command: node render --url=<URL> --video=output.mp4. Explicit limitation: does NOT use wall-clock CSS animation, the timeline must be SEEKABLE to arbitrary frames (GSAP/JS-driven), which is why it never drops frames on CPU-heavy motion. This is the same seek-a-paused-timeline model as HyperFrames (path 1) and hrec (path 2), stated most precisely. Adds a fourth reference implementation to section E.
- postnitro.ai "A Guide to Adding Video in Carousel Posts" (dated March 27, 2026): image+video carousel 2.33% engagement vs image-only 1.74% vs video-only 1.45% (mixed wins; note this source pins image-only at 1.74%, section E cites 2.33% from other blogs, consistent on the 2.33% mixed figure). Per-video-slide specs: max 60s, 1:1 or 4:5, MP4, 4GB cap, 1080p, 3-6 Mbps VBR, up to 10 items, ALL slides must share ONE aspect ratio. Placement play: motion on slides 1-2 as pattern interrupt, video mid-deck (3-7) as credibility, video final slide as CTA. Design sound-off with burned-in captions. This is the concrete spec sheet for the mixed-carousel play in SO WHAT item 3.

### I2. threads-carousel adaptive-type + bounded-axis design system (added 2026-07-10)

itchernetski/threads-carousel-claude-skill (github, Claude Code skill, text post to carousel images). Renders client-side via html-to-image (PNG/JPEG) + jsPDF for single-file PDF (~5-8 MB / 10 slides), NOT Puppeteer (lighter, less deterministic than our headless render). Value is its DESIGN SYSTEM, the most fleshed-out seen: hooks scale ADAPTIVELY 88px to 170px by length, titles default 44px/800/uppercase, text-wrap: balance on hooks and titles to kill orphan words. Bounded style system = "880 combinations" from 5 fonts (Unbounded display, Inter, Playfair Display, JetBrains Mono, Oswald condensed) x 8 surfaces (Dark/White/Light/Paper/Gradient/Pastel/Neon/Ember) x 11 accents x 2 purposes. Decoration set: none, organic blobs, dot grid, diagonal lines, ruled paper, SVG noise, big-number watermark, radial glow. 12 slide types + a points pro/con variant with SVG icons. Format presets: Threads 1080x1350, IG square, LinkedIn PDF, TikTok/Stories 9:16, Wide 1920x1080. Default padding 80px left-aligned. Takeaway for us: adopt adaptive hook scaling + text-wrap:balance + a BOUNDED axis system so poster slides stay clean by construction instead of ad-hoc per slide.

### H. Competitive tooling landscape (AI carousel generators, mid-2026)

These are the SaaS products the audience's feed is full of. They are template-driven and converge on the same busy look Carter is escaping, which is our opening.

- PostNitro (postnitro.ai): full platform. Topic/URL/X-thread/text -> carousel; 100+ templates; Brand Kit (logo, palette, typography auto-applied); scheduling + publishing to IG/LinkedIn/TikTok/X/Threads; public API. Free tier + paid from $12/mo.
- aiCarousels (aicarousels.com): faster/lighter, no signup, free. Inputs text/URL/PDF/video. Two competitive features to note: YouTube-to-carousel import, and a Carousel-to-Video Converter (turns slides or an uploaded PDF, one page per slide, into a video for the LinkedIn video feed / IG / TikTok). This is the mainstream "animate your carousel" button.
- Contentdrips: auto research + copy + visuals + branding.
- Piktochart, GravityWrite, CarouselMaker.co, WaveGen (no-signup), MaxAI (slide-by-slide content generator), 2slides, SwipeThread, Supergrow, ContentIn (LinkedIn-focused): all "topic -> multi-slide deck," all template libraries + brand kits.
- houtini-ai/carousels-mcp (GitHub): MCP server, blog post -> LinkedIn/IG/TikTok carousel, Puppeteer render, needs Puppeteer for PDF/PNG.

Common denominator: every one is a fill-in-the-template engine. None ships poster-grade one-focal-point restraint by default, and only the video-converter path (aiCarousels, LinkedIn-motivated) touches animation, and it is a dumb pan/zoom over static slides, not designed motion.

### I. The poster / restraint counter-signal (this is our thesis, and Claude does it well)

Techpresso academy "30 Claude Prompts That Design Posters (No Code, 2026)" documents the exact opposite of the busy carousel and confirms Claude executes it cleanly: single dominant element ("must read from across a room"), type-driven composition, meaningful line breaks, high contrast, negative space as active design, one accent color / two typefaces max, CSS-only graphics (no external images) so each file is standalone and printable to PDF at 300 DPI, real copy not lorem. Output is self-contained HTML with inline CSS at print/social sizes incl. 1:1. This is proof that the model itself, given restraint constraints, produces the poster look we want. The busy output is a TEMPLATE choice by the popular skills, not a model limitation.

---

## SO WHAT FOR US

1. We are already in the more advanced school (School 1: HTML per slide -> headless Chrome -> PNG). The public "best" skills (marcolang, open-carrusel) render the SAME way shotpls does, at the SAME 1080x1350, and they still look busy because their TEMPLATE mandates a progress bar + counter + swipe chevron + kicker + alternating cards on every slide. The busy look is a template default, not a rendering constraint. Our edge is deleting that chrome, not changing the renderer. Ship a "poster mode" template family: one focal element, massive type (Carter's clamp scale already trends this way), near-zero body, at most one structural-decoration moment per slide. Techpresso's poster prompts prove the model nails this when constrained.

2. Add the visual QA loop. This is the single highest-ROI upgrade and everyone serious (Peter Yang, ktundwal, huashu-design's 5-dimension review, the agentic-coding handbook) already does it. shotpls renders the PNG, but nothing reads it back. Wire a step where Claude opens the rendered 2160x2700 PNG through vision and self-checks a fixed rubric (text overflow, contrast, alignment to grid, focal dominance, "does one thing dominate or does it read like a newspaper"), then edits the HTML and re-renders. Reported cadence is 2-3 rounds / ~8 min to reach 80-90% production quality. This is the mechanism that would let us actually claim "best carousels on Instagram" instead of asserting it.

3. Animation is now table stakes for standing out, and it is buildable on top of shotpls without leaving the terminal. Three proven HTML-to-video paths all use headless-Chrome frame-stepping + FFmpeg, the exact family shotpls belongs to: HyperFrames (HeyGen, free, Claude skill, data-start/data-duration timing, deterministic), htmlrec/hrec (Rust CLI, one command, CI-clean), and huashu-design (MP4 25/60fps + GIF + review bundled). Recommendation: extend shotpls (or add a sibling CLI) that seeks a paused CSS timeline frame by frame and pipes to FFmpeg, so any slide HTML can emit either a PNG (static) or a short MP4 (animated) from the same source file. Then we can ship mixed carousels (a couple of animated slides among statics), which the trend blogs and aiCarousels' own converter say is where engagement is going.

4. Two cheap, immediate wins with zero new tooling: (a) seamless bleed. Give slides a shared wide background and offset background-position by -(index*1080)px so a focal element bleeds across the swipe seam; blogs claim ~2x swipe-through and ~40% higher completion. (b) A right-edge swipe cue that is a partial image bleed rather than a literal arrow, keeping our poster restraint while still pulling the swipe.

5. Competitive read: the SaaS field (PostNitro, aiCarousels, Contentdrips, Piktochart, etc.) is a sea of template fill-in engines with brand kits, all converging on the same crowded aesthetic, and their only "animation" is a pan/zoom PDF-to-video converter. Nobody ships poster-grade restraint plus designed motion. That is the exact gap. Our differentiators, in order: (i) hand-designed poster restraint the templates can't produce, (ii) the vision QA self-correction loop, (iii) real per-element CSS animation compiled to MP4 for mixed carousels. Deliver those three on our existing HTML->render spine and the "best carousels on Instagram" claim is defensible on craft, not hype.

6. Follow-ups worth doing (gaps below): pull the actual transcript of "Your Claude Code Carousels Suck (Here's The Fix)" (ID 7taGazHQkMg, Jun 2 2026) since its title is our exact thesis, and the marcolang/open-carrusel skill source files, to lift any concrete anti-busy heuristics before we design our poster template.

---

## SOURCE URLS (only what was actually seen)

- https://ryanfrizelle.com/guides/claude-code-carousel-generator
- https://github.com/Hainrixz/open-carrusel and /blob/main/CLAUDE.md
- https://github.com/theonlyhausofai-design/open-carousel
- https://creatoreconomy.so/p/build-beautiful-slides-with-claude-code-in-12-min
- https://x.com/petergyang/status/2059642246614647259
- https://github.com/ktundwal/presentation-skills
- https://github.com/neonwatty/css-animation-skill
- https://www.onewave-ai.com/blog/hyperframes-video-as-code
- https://github.com/heygen-com/hyperframes/blob/main/CLAUDE.md
- https://dsplce.co/blog/claude-animation-to-video
- https://claudemarketplaces.com/skills/marcolang/marketing-skills/instagram-carousel
- https://creatorflow.so/blog/claude-ai-instagram-carousels/
- https://github.com/ToseaAI/awesome-html-slide-skills
- https://github.com/alchaincyf/huashu-design and /blob/master/SKILL.md
- https://github.com/jeevanbavandla/instagram-carousel-skill
- https://academy.techpresso.co/prompts/claude-prompts-posters
- https://postnitro.ai/ and /compare/aicarousels
- https://www.aicarousels.com/ and /free-tools/linkedin-carousel-to-video-converter
- https://tweag.github.io/agentic-coding-handbook/WORKFLOW_VISUAL_FEEDBACK/
- https://medium.com/@rotbart/giving-claude-code-eyes-round-trip-screenshot-testing-ce52f7dcc563
- https://github.com/itchernetski/threads-carousel-claude-skill (fetched 2026-07-10)
- https://github.com/dtinth/html5-animation-video-renderer (fetched 2026-07-10)
- https://wavegen.ai/best-ai-carousel-generators (fetched 2026-07-10)
- https://postnitro.ai/blog/post/video-in-carousel (fetched 2026-07-10)
- https://postunreel.com/blog/best-ai-carousel-generators-for-instagram (fetched 2026-07-10)
- https://metricool.com/create-social-media-carousels-claude-code/ (fetched 2026-07-10)
- https://predis.ai/instagram-carousel-maker/ (fetched 2026-07-10)
- YouTube (title/ID/date from search snippets only, channel UNKNOWN): jFAH0txMwiI, hNoyOFdk7ig, gak1lXF77D8, QeV04PFPNck, Vp3s6YP2Dro, 59TQNbMi3J4, 7taGazHQkMg, REEzMNF54GY, 4O-fMaxdGAg, OFoNYWIS7IA, diw7gspqWAk, 3ysZujOI-NE, ngXvG87RZOA, jy1eE2yn_nw, PxFNqww75ao

## GAPS

- No YouTube transcripts fetchable (footer-only). All video pipeline claims are from search snippets, not verified viewing. Channel names for nearly every carousel video did not surface.
- "Your Claude Code Carousels Suck (Here's The Fix)" (7taGazHQkMg) is the most on-thesis title but its actual fix technique is unconfirmed. Needs a transcript pull.
- Exact iteration counts / renderer inside ktundwal/presentation-skills and Peter Yang's /slides are described conceptually; the concrete screenshot command and loop cap were not on the fetched pages.
- Carousel engagement/completion percentages (2.33%, 40%, 2x, 1.92%) all come from vendor/marketing blogs, not primary platform data. Directional only.
