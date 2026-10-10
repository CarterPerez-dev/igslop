<!-- © AngelaMos | 2026 | g4-cross-platform-systems.md -->

# DIVISION G / G4: Cross-platform carousel systems (one deck, many platforms)

Research date: 2026-07-10. Recency priority: April-July 2026. Mission: how multi-platform creators design ONE deck that ships to Instagram, LinkedIn, and TikTok without per-platform redesign. Safe-area differences, aspect-ratio strategy, text-size floors, published workflows/tools for multi-platform slide export. Concrete specs only.

Note on truth: every number below is attributed to a named source I actually fetched or saw in search results. Where a "spec" comes from a marketing-tool blog (not Meta/TikTok/LinkedIn official docs), it is labeled as such. Treat these as strongly-cross-corroborated community consensus, not gospel from platform docs. The pattern that matters (the design system) is more reliable than any single pixel figure.

---

## SEARCHES RUN

1. `design one carousel deck for Instagram LinkedIn TikTok without redesign 2026`
2. `Instagram safe zone carousel template 1080x1350 4:5 caption crop 2026`
3. `minimum font size social media carousel LinkedIn TikTok Instagram readable mobile pixels`
4. `TikTok photo carousel safe area 9:16 text placement UI overlay right side icons 2026`
5. `LinkedIn carousel PDF document post dimensions 4:5 1080x1350 safe margin 2026 best practice`
6. `design one master artboard export 4:5 1:1 9:16 social carousel repurpose workflow Figma Canva 2026`
7. `Puppeteer Playwright render HTML slide multiple aspect ratios PNG batch social carousel script`
8. `creator repurpose one carousel Instagram LinkedIn TikTok reframe crop hook change 2026 case study`
9. `"9:16" master frame "4:5" safe zone nested export Reels Instagram feed one design 2026`
10. `agency system one slide template ship Instagram carousel LinkedIn document TikTok slideshow safe zone floor font 2026`
11. `carousel text minimum size 28px 32px readable thumbnail phone accessibility social 2026`

Pages fetched in full: supaslides.app carousel-dimensions-guide, campaignswift.com instagram-safe-zone-sizes, 2slides.com infographic-carousel-voice-video-creators, github.com itchernetski/threads-carousel-claude-skill, kreatli.com tiktok-safe-zone, zeely.ai tiktok-safe-zones, carouselmaker.com, trymypost.com instagram-carousel-algorithm-2026-guide, zeely.ai master-instagram-safe-zones, contentdrips.com instagram-carousel-size-format. (designlumo.com agency piece returned HTTP 403, could not read.)

---

## FINDINGS

### 1. THE CORE INSIGHT: there is no single size, but there IS a single master

Every source converges on the same design system, not a magic universal size. You do NOT redesign per platform. You build ONE master at the tallest ratio and crop down.

- Supaslides (supaslides.app/blog/carousel-dimensions-guide): "make one deck, resize it for IG, TikTok and LinkedIn, and adapt the hook instead of rebuilding." Native export targets: 1080x1350 for Instagram and LinkedIn, 1080x1920 for TikTok, LinkedIn as a PDF document.
- Marketing Agent blog (marketingagent.blog, 2026-03-28), the cleanest statement of the master-frame technique: "Create your master asset at 1080 x 1920 (9:16) with all key elements inside a central 1080 x 1350 (4:5) safe zone. From that single file you can export a 4:5 feed post, a 1:1 square, and a 9:16 Story without re-designing."
- Reason 9:16 is the master, not 4:5: "Cropping 9:16 down to 1:1 or 16:9 is trivial; the other direction creates ugly letterboxing." You can always cut a tall frame down. You cannot invent pixels to grow a short one.
- 2Slides (2slides.com/blog/infographic-carousel-voice-video-creators) frames the same rule as the "single biggest leverage move for creators in 2026: shipping one idea in three formats: a 4:5 Instagram carousel, a 9:16 TikTok/Reels narrated video, and 16:9 YouTube long-form" and "generate one infographic-style slide deck, narrate it once, then export every aspect ratio."

The tension for a STILL carousel (Carter's case, not narrated video): Instagram and LinkedIn carousels both live at 4:5 (1080x1350). TikTok carousels are 9:16 (1080x1920). So the practical master for a still deck is: design the 4:5 content, then for TikTok pad it into a 9:16 canvas (centered, with breathing room top and bottom) rather than re-lay-out. More on this in SO WHAT.

### 2. SAFE-AREA DIFFERENCES PER PLATFORM (the load-bearing table)

All values are on the standard 1080-wide canvas. Sources noted inline. "px" = the design-canvas pixels, not device pixels.

INSTAGRAM CAROUSEL, 4:5 (1080x1350):
- Safe zone: central 1000x1270, i.e. 40px margin on all sides (campaignswift.com, corroborated by supaslides and trymypost).
- Bottom UI: the like heart and save ribbon overlay the bottom ~150px; handle and caption truncate the top ~120px on smaller devices (trymypost.com/blog/instagram-carousel-algorithm-2026-guide).
- Swipe indicator dots sit at the bottom center; leave extra bottom padding (campaignswift, socialhabit).
- THE BIG ONE, profile-grid crop: on the profile grid a 4:5 carousel is center-cropped to 1:1 (1080x1080). This cuts the top 270px and bottom 270px. "If your critical text or focal point sits in the top or bottom 270 pixels, it will be invisible on the profile grid" (trymypost.com, corroborated campaignswift). This means the cover slide's headline should live inside the central 1080x1080 if you care about grid browsing.

INSTAGRAM CAROUSEL, 1:1 (1080x1080):
- Safe zone: central 1000x1000, 40px margin all sides (campaignswift.com).
- No profile-grid crop problem (already square).

INSTAGRAM REELS / 9:16 (1080x1920), relevant only if a slide becomes video:
- Zeely (zeely.ai/blog/master-instagram-safe-zones): keep critical text/visuals within central 70-80% of frame; leave top and bottom 10-15% clear. Calculated: top/bottom clearance ~192px each (10% of 1920).
- Another read (from the "9:16 master 4:5 safe zone" search corpus): keep ~14% clear at top, ~35% at bottom, ~6% each side for Reel placements; effective safe zone central 1010x1440.
- campaignswift Reels numbers: top obstruction 200px (account info), bottom obstruction 400px (UI overlay), safe zone ~1080x1320 centered.
- Note the bottom-heavy asymmetry: Reels eat ~400px at the bottom vs only ~200 at top. Text must ride high.

TIKTOK PHOTO CAROUSEL / 9:16 (1080x1920):
- Safe content zone: center ~960x1386 (from houseofmarketers/zeely corpus). Another consensus figure: ~1080x1420 text-safe (kreatli.com/guides/tiktok-safe-zone).
- Margin breakdown (houseofmarketers corpus, most specific): top ~140px (profile bar + notch/Dynamic Island); bottom ~324px (caption bar, sound attribution, engagement buttons); right ~164px (like/comment/share/bookmark icon column).
- Zeely ranges (zeely.ai/blog/tiktok-safe-zones): top band ~150-200px, right-edge icon column ~120px wide, bottom (caption + CTA) ~250-300px deep.
- Rule of thumb repeated everywhere: "keep all text and logos about 15% above the bottom edge" and "if text or faces touch the right third of the frame, they are at risk."
- TikTok carousel image spec: each image 1080x1920, 9:16. TikTok allows up to 35 photos per carousel (supaslides), practical target 5-10.

LINKEDIN CAROUSEL (PDF document), 4:5 (1080x1350) or 1:1 (1080x1080):
- Uploaded as a PDF/document, not images. File limits: up to 100MB and 300 pages (supaslides). Keep under 10MB in practice for fast load (multiple LinkedIn-size guides).
- Safe margin: minimum 80px padding all sides so LinkedIn app UI does not overlap; some guides say keep headlines/key visuals within a central 880x880 box on a 1080 canvas, plus 40-60px extra for rounded phone corners (wavegen / trymypost LinkedIn corpus).
- A 10-slide 1080x1080 deck at 72-150 DPI comes in under 5MB.

THE ASYMMETRY THAT KILLS A NAIVE CROSS-POST:
- Instagram/LinkedIn 4:5: content is safe in a symmetric 40-80px frame.
- TikTok 9:16: bottom is brutal (~300-324px dead) and the RIGHT SIDE is dead (~120-164px icon rail). A left-aligned 4:5 deck dropped into 9:16 with right-edge text or bottom text gets eaten.
- Instagram profile grid: center-crops 4:5 to 1:1, killing the top/bottom 270px.

Net: the intersection of all safe zones is a CENTER-BIASED, slightly-high box. If a headline lives in the central 1000x1000-ish region and avoids the bottom third, it survives every surface.

### 3. TEXT-SIZE FLOORS PER PLATFORM

Hard numbers are thinner here (most tool blogs dodge exact px), but there is a consistent floor.

- LinkedIn carousel: "Keep text large (minimum 28px). Carousel slides are viewed on mobile" (wavegen/trymypost LinkedIn corpus). This is the only platform-specific hard floor I found stated as a number.
- Accessibility/web baseline (font-converters.com WCAG guide, W3C WAI): body text never below 16px; mobile H1 28-32px, H2 22-26px, H3 18-20px; line length 70-80 chars max. These are web-accessibility floors, NOT social-canvas floors, but they anchor a lower bound.
- TikTok-specific typography warning (from the agency/slide-system search, socialchamp/2slides corpus): "Thin fonts blur when TikTok compresses video; switch to medium or bold weight and keep line spacing around 1.3x." TikTok's video compression punishes hairline weights, so a deck that also ships to TikTok must avoid thin/light weights on any text meant to survive.
- On-screen word budget (not px, but a real floor on density): Instagram slide 1 "under 40 characters" / "no more than 10 words on screen" (trymypost, contentdrips). Each interior slide "delivers one discrete point, not a paragraph" (contentdrips.com/blog/2026/05/instagram-carousel-size-format).
- Character-count practical anchor for slide 1 legibility "without zooming": under 40 characters (trymypost.com).

Reference point for Carter's own pipeline: the threads-carousel Claude skill (below) ships hook text at 88-170px and body at 48-88px on a 1080-wide canvas. That is the real-world size range elite auto-generated decks use, far above the 28px LinkedIn floor. On a 1080px canvas a "big poster headline" is roughly 90-170px; a "readable body line" is roughly 48-64px; anything under ~40px on a 1080 canvas reads as fine print and should be reserved for source citations / footnotes only.

### 4. PUBLISHED TOOLS AND WORKFLOWS FOR MULTI-PLATFORM SLIDE EXPORT

Ranked by relevance to Carter's HTML-file-per-slide + shotpls pipeline.

A) threads-carousel-claude-skill (github.com/itchernetski/threads-carousel-claude-skill) -- DIRECT ANALOG, most relevant find.
This is a Claude Code skill that converts text posts into carousel images for Threads, Instagram, LinkedIn, TikTok. It is architecturally the closest published thing to Carter's setup, and it made different choices worth stealing/rejecting:
- Format presets: Threads/Instagram 4:5 = 1080x1350 (default); Instagram 1:1; TikTok 9:16; Stories 9:16; Wide 16:9 = 1920x1080; LinkedIn = multi-slide PDF export.
- ONE master template generates all exports (a single Next.js 15 + React 19 + TypeScript template). User edits only `src/slides.ts` (a SLIDES array plus DEFAULT_FONT / DEFAULT_SURFACE / DEFAULT_ACCENT). Claude handles cloning, deps, dev server on port 3333.
- Rendering: browser-based React via `html-to-image` (client-side) for PNGs, batch PNG download, and jsPDF for the LinkedIn PDF (JPEG-compressed, ~5-8MB per 10 slides). NOTE: this uses `html-to-image` in-browser, NOT headless Chrome/Puppeteer. Carter's shotpls (headless Chrome) is higher-fidelity than this skill's approach.
- Typography defaults (on 1080-wide): global padding 80px left-aligned; hook 88-170px weight 800; titles 44px weight 800 uppercase (carousel mode); body 48-88px weight 600; badges 26px uppercase; stat values 140-170px weight 900. Presentation mode overrides titles to 72px weight 700 sentence-case no-divider.
- Style system: 4 independent axes = 5 fonts (Minimal, Editorial, Clean, Mono, Condensed) x 8 surfaces (Dark, White, Light, Paper, Gradient, Pastel, Neon, Ember) x 11 accents x 2 purposes (Carousel = bold uppercase, Presentation = sentence case lighter). 880 valid combos, swapped live via toolbar without code edits.
- WEAKNESS relative to our goal: "No per-platform typographic or layout variations are documented beyond format dimensions. Safe areas, corner radius, or notch compensation aren't explicitly configured. All content uses uniform left-aligned 80px padding across formats." So it changes the CANVAS size per platform but does NOT re-flow content into each platform's safe zone. That is the exact gap our pipeline should close: it is the difference between "resized" and "actually safe on every surface." Left-aligned text at 80px is fine for IG/LinkedIn but bleeds into TikTok's right-rail icon column when padded to 9:16.

B) 2Slides Workspace (2slides.com) -- narrated-carousel-to-video workflow.
- Default unit: 8-slide carousel (maps to 30-60s at 5-7s/slide). Slide 1 = hook, slides 2-7 = one tip + one-sentence explanation + one visual, slide 8 = CTA.
- Export matrix from ONE deck: PNG/JPG 4:5 (IG feed), PNG/JPG 1:1 (LinkedIn), MP4 narrated 9:16 (TikTok/Reels/Shorts), MP4 narrated 16:9 (YouTube/X), PDF (lead magnet).
- Narration: single voice, ~120-140 wpm for vertical video, 30+ AI voices. "Carousel and video share identical script, do not rewrite."
- Design law they state: "Slide 1 carries 60% of swipe-through rate"; "One idea, one visual per slide, two ideas per slide is the most common failure mode."

C) Supaslides (supaslides.app) -- auto-native-export.
- Builds a deck from a URL + one line of text, exports each platform at native size automatically: 1080x1350 IG/LinkedIn (LinkedIn as PDF), 1080x1920 TikTok. Max 20 images IG, 35 TikTok.

D) CarouselMaker.com, PostNitro, aiCarousels, Contentdrips, WaveGen -- template farms.
- Common pattern: export as PDF for LinkedIn, individual images for IG and TikTok, "no resizing or guesswork." None publish exact safe-area or font internals; they bake platform sizing into templates. Contentdrips explicitly serves "Instagram, LinkedIn, TikTok, and beyond" but does not expose the numbers.

E) DIY render pipeline (Puppeteer/Playwright + Sharp), the closest match to a custom shotpls extension:
- Puppeteer `page.setContent(html)` renders arbitrary HTML; only viewport width/height are settable, so multi-ratio = loop viewport sizes.
- For aspect changes without re-layout, post-process with the Sharp library: `resize` with `fit: "cover"` preserves aspect and covers both target dims; `fit: "contain"` letterboxes. This is the exact primitive to turn a 4:5 render into a padded 9:16.
- Playwright is cited as the more ergonomic API (auto-wait, parallel), relevant if batch-rendering many slides x many ratios.

### 5. WHAT NOBODY DOES WELL (the open lane)

Across every tool: they change the CANVAS SIZE per platform, but almost none RE-FLOW CONTENT into each platform's distinct safe zone. The threads Claude skill is explicit about this: uniform 80px padding everywhere, no notch/right-rail compensation. So a "TikTok export" from these tools is just the 4:5 art on a taller canvas, or the same layout at 9:16 with text that can bleed into the icon rail / caption bar. Nobody publishes a system that says "on the TikTok variant, shift the headline up out of the bottom 324px and in from the right 164px." That re-flow is the thing that separates "technically exported" from "designed for the surface." It is a wide-open lane for a codegen pipeline.

---

## SO WHAT FOR US

Carter's pipeline (one standalone HTML per slide at 1080x1350, shotpls to 2160x2700 PNG, fonts base64-inline) is ALREADY at the correct master size for the two platforms that matter most to a still carousel: Instagram 4:5 and LinkedIn 4:5 are the SAME 1080x1350. That is a gift. The cross-platform problem for us is almost entirely: (a) TikTok's 9:16, and (b) Instagram's profile-grid 1:1 crop. Concrete moves:

1. ADOPT THE NESTED-SAFE-ZONE MASTER, but invert it for a still deck. The video world builds a 9:16 master with a 4:5 safe zone inside. For a still deck we do the reverse: author at 1080x1350 (our current size) but define TWO invariant guides in the HTML/CSS and honor them on the cover slide especially:
   - GRID-SAFE box: central 1080x1080 (crop 270px top + 270px bottom). Cover headline and any focal artifact MUST live inside this square, or it vanishes on the profile grid. This is nearly free to enforce: a CSS variable `--grid-safe-inset: 270px` on top/bottom and a dev-only outline toggle.
   - UI-SAFE box: 40px margins all sides minimum (Instagram), bump to 80px if the same PDF ships to LinkedIn. Keep the bottom ~150px clear of anything critical (like/save overlay + swipe dots).

2. ADD A ONE-COMMAND 9:16 TIKTOK EXPORT that pads, not re-lays-out, for the common case, and re-flows for the cover. Two-tier:
   - Cheap tier (interior slides): render the existing 1080x1350 slide, then pad-center onto a 1080x1920 canvas via Sharp `extend` (background = the slide's own surface color so it looks intentional, not letterboxed). This puts our content in the vertical center, which is exactly TikTok's safe band (top ~140 clear, bottom ~324 clear). The 4:5 content height 1350 centered in 1920 leaves 285px top and 285px bottom, comfortably inside TikTok's dead zones. This is a ~20-line Node/Sharp or Python/Pillow step, no re-design.
   - Careful tier (cover slide only): the cover is the one slide worth a real 9:16 layout because it is the FYP thumbnail. Give it a `data-ratio="9x16"` mode in the HTML that (i) keeps the headline in the central column, in from the right by >=164px so it clears the icon rail, and (ii) rides above the bottom 324px. Everything else can pad.

3. RESPECT TIKTOK'S FONT-WEIGHT PENALTY. TikTok compresses and thin fonts blur (socialchamp/2slides). If a deck is destined for TikTok, the codegen must forbid light/hairline weights on any text that carries meaning, floor at medium/500+, and line-height ~1.3. Bake this as a lint rule in the make-carousel skill: if `--export-tiktok` is set, reject font-weight < 500 on `.headline`/`.body`.

4. TEXT-SIZE FLOORS to encode as guardrails on the 1080 canvas (from the corpus + the threads-skill real-world sizes):
   - Cover headline: 90-170px (poster scale). This aligns with our own memory rule that display titles run clamp(34-60) at ~0.8x zoom, but note that guidance is for INNER game/tool pages, not posters. Carousel COVERS are posters and should push toward the high end.
   - Body line: 48-64px. Absolute floor for anything meant to be read at thumb size ~40px.
   - Fine print / source citation only: 26-32px, and only near a margin, never as primary content. 28px is LinkedIn's stated floor, so treat 28px as the hard bottom for any real text.
   - Word budget: cover under ~40 characters / <=10 words; interior slides one point each. This matches the poster-not-newspaper thesis of the whole operation.

5. LINKEDIN IS ALMOST FREE. Same 1080x1350 art, exported as a multi-image PDF instead of PNGs. shotpls already gives us the PNGs; a trivial `img2pdf`/Pillow or jsPDF step stitches them into a <10MB PDF. One catch: LinkedIn wants 80px margins (vs Instagram's 40px), so if a deck is dual-destined IG+LinkedIn, author to the stricter 80px and you satisfy both. The threads Claude skill's jsPDF approach (~5-8MB per 10 slides) confirms sizes stay well under LinkedIn's 100MB / practical-10MB limit.

6. THE INTERSECTION SAFE BOX (single rule to remember): put every load-bearing element inside the central ~1000x1000 square of the 1080x1350 slide, keep critical text above the bottom third, and you simultaneously survive: Instagram feed 4:5, Instagram profile-grid 1:1 crop, LinkedIn 4:5, and a center-padded TikTok 9:16. One box, four surfaces. That is the entire cross-platform discipline in one sentence.

7. BUILD THE THING NOBODY BUILT (section 5 lane). Every tool "resizes" but does not re-flow to each safe zone. Our codegen pipeline CAN re-flow because each slide is real HTML/CSS with logic, not a flattened template. A `--for=ig|li|tiktok` flag that swaps CSS custom properties (margins, headline vertical anchor, right-inset, min font-weight) and re-renders via shotpls would produce genuinely per-surface-correct exports from one source of truth. That is a defensible differentiator, and it is a few dozen lines of CSS-variable plumbing plus one Sharp pad step, not a rewrite.

BOTTOM LINE: we are 80% there by accident (1080x1350 = IG and LinkedIn native). The remaining 20% is (a) a grid-safe 1080x1080 guide on the cover, (b) a Sharp pad-to-9:16 step for TikTok interiors plus a real 9:16 cover mode, (c) a font-weight >=500 lint for TikTok destinations, and (d) a PNG-to-PDF stitch for LinkedIn. All four are small, mechanical additions to the existing shotpls flow. No per-platform redesign, one master, four surfaces.

---

## SOURCE LIST (only what was actually seen/fetched)

- supaslides.app/blog/carousel-dimensions-guide (fetched)
- 2slides.com/blog/infographic-carousel-voice-video-creators (fetched)
- github.com/itchernetski/threads-carousel-claude-skill (fetched)
- campaignswift.com/blog/instagram-safe-zone-sizes (fetched)
- kreatli.com/guides/tiktok-safe-zone (fetched)
- zeely.ai/blog/tiktok-safe-zones (fetched)
- zeely.ai/blog/master-instagram-safe-zones (fetched)
- carouselmaker.com (fetched)
- trymypost.com/blog/instagram-carousel-algorithm-2026-guide (fetched)
- contentdrips.com/blog/2026/05/instagram-carousel-size-format (fetched)
- marketingagent.blog/2026/03/28/social-media-image-sizes-for-every-platform-complete-2026-guide (search result excerpt, master-frame technique)
- houseofmarketers.com/guide-to-safe-zones-tiktok-facebook-instagram-stories-reels (search result excerpt, TikTok margin breakdown)
- font-converters.com/accessibility/font-size-requirements (search result excerpt, WCAG floors)
- w3.org/WAI/tutorials/carousels (search result excerpt, tap-target/line-length)
- socialchamp.com/blog/carousel-slides + 2slides (search result excerpt, TikTok thin-font compression)
- wavegen.ai/linkedin-carousel-size + trymypost LinkedIn corpus (search result excerpts, LinkedIn 28px floor, 80px padding, PDF <10MB)
- designlumo.com/blog/linkedin-carousel-design-for-tiktok-agencies (HTTP 403, could NOT read, listed for honesty)

GAPS / DEAD ENDS:
- No OFFICIAL Meta / TikTok / LinkedIn doc pixel-for-pixel safe-zone spec was fetched; all safe-area numbers are marketing-tool-blog consensus (strongly cross-corroborated but not primary). Kreatli and Zeely both explicitly declined exact TikTok margins and pointed to a live overlay checker instead.
- No hard per-platform minimum FONT-SIZE table exists in the wild beyond LinkedIn's 28px; the rest is inferred from accessibility floors + the threads-skill's real sizes.
- The one true agency cross-platform system piece (designlumo) 403'd.
- No published example of a codegen pipeline that RE-FLOWS (not just resizes) to each platform safe zone, which is why section 5/point 7 is framed as an open lane rather than a copy job.
