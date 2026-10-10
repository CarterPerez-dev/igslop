<!-- © AngelaMos | 2026 | division-i-visual-craft.md -->

# DIVISION I: VISUAL CRAFT DEPTH

Color, composition, image treatment, data as design. Synthesis of scouts i1-i4 plus division-head gap-filling searches (2026-07-10). Every finding is sourced. Contradictions are flagged with both sides.

---

## EXECUTIVE SUMMARY

The whole division converges on one thesis: STOP DECORATING THE SLIDE, START TREATING THE IMAGE. Carter's own data already proves it (image-artifact decks 47-65k views / 2.7-6.6k saves vs text-template decks 10-18k / 100-570). The rebuild is a poster system with four locked layers. ONE: a capped 4-5 token palette owning a deep-teal signature plus one hot accent at 10% max, on a warm near-black base (never pure #000, never pure #FFF, both read dated and fail perceptual contrast). TWO: a real 3-5 column modular CSS grid that mechanically forbids the 6-9 free-floating reading zones, one enforced focal point per slide. THREE: image treatments (duotone, dither, halftone, grain) baked in a tiny Pillow step and inlined, riding the 2026 anti-AI tactile trend that reads as "a human made this." FOUR: data slides where the title IS the finding, 90% of the chart is grey, one element is loud, and the source is always printed. Validate contrast with APCA Lc, not WCAG 2, because our decks are dark. The competitor-beating lever is animated/hybrid slides (a video or CSS count-up slide inside the carousel), which is both a trend and a documented under-adopted opportunity. Palette hex, grid math, filter code, and a salary chart-type table are all captured and pipeline-ready.

---

## THE FINDINGS THAT MATTER (ranked)

### 1. Treat the image, do not decorate the slide. This is the whole division. [i3, i4, Carter's own data]
Premium = restraint plus one focal move plus brand-locked color. Gimmicky = high saturation, heavy opacity, every-element-treated. Carter's winning decks win because of a strong IMAGE, so the leverage is making one image look designed, not adding more zones. Source: i3 synthesis across Creative Bloq, Codrops, ASCII Magic; i4 cross-inference from his 90-day numbers.

### 2. Own a two-color signature: deep teal field + one hot accent at 10% max. [i1, over-determined]
This is simultaneously the 2026 WGSN anchor (Transformative Teal), the trust-plus-differentiation psychology pick for a cyber-education account, the 60/30/10 accent discipline, and the "Acid Graphics" pairing. Warm accent stops the scroll (a red feed element is fixated ~0.3s faster than blue, madegooddesigns); cool/teal field holds the like and reads trust (blue still 41% of logos but +12% YoY shift to teal as the differentiation move). Consistency drives up to +33% revenue (ManyPixels). Ready palette: `#0E7C7B` teal / `#F76C5E` coral / `#F9F7F3` near-white / `#2B2B2B` near-black (ManyPixels Bold Complementary). Cap at 4-5 tokens; fewer than 3 reads flat, more than 6 is unmaintainable across a grid.

### 3. Kill pure black and pure white. Both are dated AND fail perceptual contrast. [i1]
Base = warm near-black `#121212`-`#1E1E1E` (or a "Decadent Chocolate" warm brown-black, or deep teal-black) so the artboard SEPARATES from Instagram's own ~#121212 dark chrome instead of blending in. Body text = `#F5F5F5` / `#E4E4E7`, NOT `#FFFFFF` (pure white on near-black causes halation/glow at small sizes). Reserve `#FFFFFF` for the ONE headline/label per slide, so it doubles as hierarchy. Stark pure white as a base is the single most-repeated "dead in 2026" signal (Artcoast: "cool grays and stark whites are out"). Light slides = warm off-white `#F7F7F2`/`#F9F7F3`, never stark white.

### 4. Validate contrast with APCA Lc, not WCAG 2, because our decks are dark. [i1, 66Colorful 2026-06-04]
WCAG 2's 4.5:1 is documented as unreliable near-black ("cannot be used to design dark mode"). This likely explains why text-only decks under-read: thin type at borderline contrast on near-black. Use APCA Lc: body text Lc>=75, supporting text Lc>=60, headline/display Lc>=45. Myndex ships a JS implementation, so this is auto-gradeable in the render pipeline, not a manual eyeball.

### 5. A real 3-5 column modular grid mechanically forbids the newspaper problem. [i2, gridmakerpro]
Column width formula: `colWidth = (W - (C-1)*g) / C` where W = canvas minus margins. Posters use 3-5 columns (they recombine into big legible blocks), NOT a 12-column web grid. Snap every block to whole modules and 6-9 free-floating zones become impossible. Three-rank discipline: one display element on a high flowline (primary), one image spanning columns (secondary), one body block below a lower flowline (tertiary). If a slide has two co-equal things, split it into two slides (editorial "one image noticeably larger than the rest" rule).

### 6. One focal point per slide, chosen layout logic per slide type. [i2]
Cover / single-stat slides: centered-poster or golden-eye logic, symmetric, focal point slightly above optical center, kept in the y=270-1080 band so it survives the profile-grid crop. Content slides: rule-of-thirds or asymmetric seesaw, focal point on a power point (x=360/720, y=450/900), flush-left ragged-right text, never centered body copy. Word budget 15-20 max per slide, hierarchy by size and weight ONLY, not by bordering every zone (matches Carter's thin-not-blocky and tighter-density memories).

### 7. Duotone/tritone is the highest-leverage single image move. [i3, css-tricks, pythoninformer]
Brand-locks any messy source photo (badge, book cover, screenshot) to two colors so it instantly belongs to the deck, with zero new content. Pillow: `ImageOps.colorize(grayscale, black='#0b0b12', white='#eafff2')`; add a `mid=` accent for tritone depth. SVG route: `feColorMatrix` desaturate + `feComponentTransfer` 2-value tableValues (each channel = RGB/255, shadow first, highlight second). Premium = one dark ink + one paper/accent; gimmicky = hot magenta+cyan on everything (2016-filter energy).

### 8. Dither and halftone are the on-brand anti-AI texture flexes. [i3, ascii-magic, frontendmasters]
2026 is peak ditherpunk ("dither effect" searches up ~900% YoY, one source, directional) and it is thematically native to a terminal/hacker brand. Algorithm choice IS the premium line: Atkinson or blue-noise = refined, Floyd-Steinberg = honest retro, keep Bayer small. Pillow ships Floyd-Steinberg free via `.convert('1')`; Atkinson/blue-noise need a custom numpy kernel (small build task). Halftone in 3 CSS declarations (radial-gradient dots + luminance map + `background-blend-mode:multiply` + `filter:contrast(16)`), but bake in Pillow for print-stability at 2160x2700. ONE treated hero per slide, treatment sits UNDER type, never over it.

### 9. On data slides, the TITLE is the finding and 90% of the chart is grey. [i4, Burn-Murdoch / Datawrapper]
FT doctrine: "Minimize distraction. Maximize contrast." The title states the conclusion as a sentence, the chart just proves it. Grey-out-and-highlight is the single most important dataviz move: one brand hue, vary only the last two hex digits per bar (`#cc0000` at FF for the hero bar, ~4D for context). Do NOT use a new hue for de-emphasis (reads as "different category"), use a desaturated same-hue or grey. Declutter checklist in order: kill borders, gridlines, redundant labels, thicken bars (bar width > gap), direct-label instead of legend, takeaway title. Declutter ALONE barely helps comprehension; declutter PLUS focus is what changes what viewers remember (NSF study, frank.computer 2025).

### 10. Extreme scale contrast makes a number the art. [i2, i4, Displayr]
A slide that is one number at clamp(120-220px) over a 4-5 word label with huge negative space is legitimately high-craft. Display type should be 10x+ body size, not 2x. This matches Carter's tighter-density memory (hero numerics clamp 72-140). Salary chart-type decision table: single number = giant number + scale contrast; RANKING = sorted grey horizontal bars, one highlighted, direct-labeled at bar ends; entry-to-senior RANGE = dumbbell; year-over-year = slope chart; SHARE = waffle (10x10) or pictograph; before/after = two numbers + arrow + percent change. ALWAYS print the source (Voronoi/FT/Reuters house rule; doubles as authority and screenshot-proof).

### 11. Animated / hybrid slides are the competitor-beating lever, and under-adopted. [i4 + division-head gap search]
2026 trend: mix static slides with short looping video or animated slides to spike dwell time. Pure-CSS count-up odometer (`@property --n`, Chrome 120+, ~20 lines, no JS) renders in shotpls' headless Chrome, so a salary number counting 0 -> $196,000 as the slide appears is a scroll-stopper for a 20-line cost (Frontend Masters). Documented interactive mechanics: "Follow the Line" (a colored line threads through every slide guiding to a reveal, "one of the smartest swipe-forcing formats right now," NewEngen July 2026) and "Pixel Stretch." CONTRADICTION ON THE NUMBERS, flagged: marketing blogs cite mixed-media carousels at 2.33% vs 1.80% image-only and only ~7% adoption (creatorflow/krumzi), while Socialinsider's primary panel (447,613 pages, Jan-Dec 2025 data, published 2026-02-20) puts ALL carousels at 0.55%, Reels 0.52%, static 0.37%, and does not split mixed-media out. Treat the mechanism (video-in-carousel lifts dwell, carousels edge Reels on saves/shares) as sound and the exact multipliers as directional/inflated.

### 12. Blue Note / Reid Miles is a direct library of one-focal-point templates. [i2]
"Sidewinder" = one word as a horizontal type slab. "Takin' Off" = one tilted B&W-ish image + one accent hue. "No Room for Squares" = one portrait fragmented into an offset module grid (data/mosaic slide). Joy Division "Unknown Pleasures" = one strong data-image on black with zero type. Miles' method: set a strict grid, then BREAK it once per deck for the standout slide.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Lock a 5-token CSS custom-property palette reused across every slide: warm near-black base `#141414`-ish (NOT #000), warm off-white `#F7F7F2` (NOT #FFF), deep-teal brand `#0E7C7B`, one hot accent `#F76C5E` (or safety-orange/electric-green), one muted structural grey. Accent is 10% of the slide, max. Never drift the accent, consistency is the +33% mechanism.

2. Set body text to `#F5F5F5`/`#E4E4E7` and reserve `#FFFFFF` for the single headline/label per slide. Kills halation, doubles as hierarchy.

3. Build an APCA Lc checker into the render pipeline (Myndex JS). Auto-grade every slide: body Lc>=75, supporting Lc>=60, display Lc>=45. Fail the render if a text layer is under threshold.

4. Define every slide as `display:grid` with a 4-column, 2-3 flowline module system, ~64px margins inside a 150-200px safe zone. Snap all blocks to whole modules. This is the mechanical cure for "designed newspaper." Compute column width once via `(1080 - 2*margin - (C-1)*g)/C` and reuse.

5. Enforce one focal point per slide via the three-rank rule (primary display, secondary image, tertiary body). Two co-equal things = two slides. Cover/stat slides centered-poster in the y=270-1080 crop-safe band; content slides rule-of-thirds/asymmetric, flush-left ragged-right, 15-20 words max.

6. Add a uv `imgtreat.py` (Pillow/numpy) exposing `duotone`, `tritone`, `dither`, `halftone`; output PNG gets base64-inlined so "one self-contained HTML per slide" holds. Duotone the artifact decks (badges, book covers) into the brand pair first, it is the fastest poster-not-newspaper win.

7. Apply grain globally as a shared partial: one low-opacity `feTurbulence` or tiling-noise overlay (`mix-blend-mode:overlay`, alpha ~0.05). Kills banding, reads printed, cheapest premium-up. One imperfection gesture per slide max (one torn edge OR one tape strip OR one tilt), never all three.

8. Add a distinct "hero chart" slide type: sentence title = the finding; ONE chart 90% grey with one loud element; direct labels, no legend/gridlines/borders; small grey source line always present. Build a grey-out helper: one brand hue, vary the opacity byte per bar (hero FF, context ~4D). Warm highlight, cool/grey context.

9. Hard-code the salary chart-type decision table (single/ranking/range/change/share/before-after -> giant number / sorted bars / dumbbell / slope / waffle / two-numbers-arrow) into the carousel skill so "which chart" is never re-decided.

10. Ship animated slides as the differentiator: start with the pure-CSS `@property` count-up odometer for salary numbers and a vertical bar-grow wipe. Test one render in shotpls to confirm the Chromium version supports `@property`/`mod()`/`counter-set` before committing.

11. Design the FEED GRID, not just the slide: checkerboard-alternate dark and light cover slides down the 3-wide profile grid so the teal signature recurs in a visible rhythm. Free follow-conversion lever, costs only planning cover backgrounds ahead.

12. Choreograph ACROSS slides with open loops: on at least 2 transitions run an element off the right edge of slide N and resume it on the left edge of N+1 (closure instinct drives the swipe). Design the deck as one continuous system (shared grid/palette/type/background), not 8 unrelated posters.

---

## OPEN QUESTIONS

1. No NAMED cyber/tech Instagram creator ships poster-style or animated carousels as an exemplar to reverse-engineer. The big cyber accounts found (Caitlin Sarian @cybersecuritygirl ~2-3M, Maria Aperador ~270K) are reel-first, not poster-carousel designers. The poster/dataviz exemplars are design-native accounts (Visual Capitalist/Voronoi, Chartr @chartrdaily 516K, The Pudding, FT). WebFetch is blocked on Instagram/X so no grid could be pixel-inspected. A manual competitor-scroll with screenshots is still needed to name-check the "animated-video-slide competitors" from the brief. This gap is unclosed because no Task/subagent tool was available to dispatch.

2. Engagement-number contradiction unresolved: marketing blogs say carousels ~1.92% and mixed-media ~2.33%; Socialinsider's primary panel (447k pages) says carousels 0.55%. The mechanism is sound; the exact lift from adding a video slide is not reliably quantified. A first-party A/B on Carter's own account would settle it.

3. No 2026 hex/RGB published by WGSN or Pantone for the colors-of-the-year; the Coloro `092-37-14` teal code is secondhand (Colorkuler), unconfirmed on Coloro's own site. We pick our own teal hex regardless.

4. Chartr's and Visual Capitalist's exact grid fonts/hex could not be pulled (Instagram refuses WebFetch, Visual Capitalist WAF 403s). We have their qualitative DNA (one clear chart, minimal palette, plain takeaway, source-on-graphic) but no color/type spec. A screenshot pass would close it.

5. Atkinson/blue-noise dithering are not in Pillow (only Floyd-Steinberg). Premium variants need a custom numpy kernel, a small build task, no canonical drop-in snippet found.

6. The pure-CSS odometer needs Chrome 120+ features; not yet verified that shotpls' exact Chromium renders `@property`/`mod()`/`counter-set`. One-slide render test required before relying on it.
