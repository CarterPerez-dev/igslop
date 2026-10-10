<!-- © AngelaMos | 2026 | division-e-motion-lab.md -->

# DIVISION E: MOTION LAB
## Animated carousel slides and programmatic asset generation

Compiled 2026-07-10 from four scout sweeps (e1 video-slide specs, e2 HTML-to-video, e3 Python generative, e4 motion vocabulary) plus division-head follow-up searches. Recency-weighted to 2026. Older material labeled BACKGROUND.

---

## EXECUTIVE SUMMARY

Video slides are an empty lane: only about 7 percent of carousels mix video, and mixed-media leads engagement (2.33 percent vs 1.80 percent image-only). Carter's existing shotpls pipeline (one standalone 1080x1350 HTML per slide, headless Chrome to PNG) is already 90 percent of a video renderer. Going animated is a small, weekend-scale extension: swap the single screenshot for a deterministic seek-and-capture frame loop, then ffmpeg to MP4. The correct method is seek-and-capture (seek each animation frame, screenshot, assemble), NEVER screen recording, which is choppy and non-deterministic. Reject Remotion (React substrate, wrong fit) and Lottie/Rive (illustration/interactivity lanes he does not need). Author all motion as CSS @keyframes / WAAPI so pure WAAPI seeking covers everything with zero CDP surface. One hard strategic tension: for an educational, save-driven niche, PURE STATIC still wins SAVE rate; video wins WATCH TIME. So the play is a mostly-static poster deck with 1 to 2 motion moments, which also happens to be the ONLY motion approach that respects the poster-not-newspaper thesis. Cheapest first win is the "hold and scroll" flipbook: zero video encoding, shippable on current shotpls today. Music-on-carousel is the single highest-leverage distribution move (borrows Reels reach). Named high-craft creators to model against did NOT surface: that is the one real gap, and it needs a manual Instagram browse.

---

## THE FINDINGS THAT MATTER (ranked)

### 1. Animated slides are a SMALL extension of shotpls, not a new system (all four scouts agree)
shotpls already renders one HTML file to one PNG deterministically. An animated slide is the same thing looped over N frames, with the animation seeked between shots, then ffmpeg-assembled. No React, no new paradigm. The correct architecture is seek-and-capture; reject real-time screen recording (Page.screencast / puppeteer-screen-recorder) outright: it drops frames and is non-deterministic ("same HTML always produces the identical video regardless of system load" is the seek-and-capture promise). Sources: e2 (HyperFrames docs, Helios README, Replit engineering blog), e4 (WebVideoCreator README, replit.com/blog/browsers-dont-want-to-be-cameras), e1 (dtinth/html5-animation-video-renderer).

### 2. The single best mechanism: WAAPI seek, CSS-only motion, zero CDP surface (e2, e4)
Three ways to seek time deterministically, ranked by portability:
- MECHANISM 1 (best default): Web Animations API seek. `document.getAnimations().forEach(a => { a.currentTime = t; a.pause(); })`, then screenshot. Covers every CSS @keyframes and WAAPI animation. NO special Chrome flags, NO CDP. Most portable.
- MECHANISM 2: JS time-override (fake Date/rAF/setTimeout clock, the timecut/Replit approach, ~1200 lines). Catches JS-driven motion too, but timecut's own README warns pure-CSS @keyframes "will likely not render as intended" under this alone.
- MECHANISM 3: CDP compositor control (HeadlessExperimental.beginFrame / Emulation.setVirtualTimePolicy). Byte-for-byte gold standard but fragile.
The design rule that falls out: FORBID raw requestAnimationFrame / setInterval motion in slides; require CSS @keyframes / WAAPI only. Then Mechanism 1 alone covers everything, no CDP, maximum portability. Source: e2, e4.

### 3. CONFIRMED LANDMINE: Chromium 147 removed HeadlessExperimental.beginFrame (e2, confirmed by division head)
Verified across NousResearch hermes-agent troubleshooting.md, heygen-com/hyperframes issue #294, and my follow-up search: "Chromium 147+ removed the HeadlessExperimental.beginFrame CDP command." It still works in the pinned chrome-headless-shell binary (why HyperFrames ships its own) but is GONE from system Chromium 147+. HeadlessExperimental.enable/disable are also marked Deprecated in CDP docs. Consequence: build against a PINNED chrome-headless-shell you control, OR avoid beginFrame entirely and use Mechanism 1 (WAAPI seek + screenshot), which sidesteps this whole class of breakage. HyperFrames >= 0.4.2 (commit 4c72ba4, March 2026) auto-falls-back to screenshot mode when beginFrame is absent. Sources: e2, github.com/heygen-com/hyperframes issue #294, NousResearch hermes-agent.

### 4. STRATEGIC TENSION, now nailed down: static wins SAVES, video wins WATCH TIME (e1, e4, division head)
This is the most important business finding and it is a genuine trade-off, not a free win. For educational/reference content, PURE STATIC carousels win SAVE rate (educational carousels get 2 to 5x the save rate of single images), and Instagram's 2026 algorithm made SAVES the single most heavily weighted engagement signal, above likes, comments, even shares. Video-heavy carousels win WATCH TIME instead. Carter's niche is educational cyber, and saves are the KPI. Therefore the correct move is NOT an all-video deck; it is a mostly-static poster deck with 1 to 2 motion moments to lift watch-time and stop-scroll WITHOUT sacrificing the save-driving static value slides. Sources: e1 (trymypost), e4, division-head searches (trymypost algorithm 2026, truefuturemedia 2026).

### 5. Video slides play ONCE and STOP, muted; design INTO a legible resting frame (e1, e2)
Carousel video cards autoplay MUTED and play once then STOP (they do NOT loop like Reels or feed video). Two hard design consequences: (a) every clip must be 100 percent legible with sound off, on-screen text carries all meaning; (b) the LAST frame is what the viewer stares at, so every clip must resolve INTO a composed, legible still, which means Carter's existing static slide design IS the target end-state of each animated slide. To make one forward play read as a seamless loop, author t=0 and t=duration to be visually identical (return-home float, full rotation, opacity round-trip); ffmpeg boomerang (`[0:v]reverse[r];[0:v][r]concat=n=2:v=1`) is the fallback only when an animation cannot return home. Sources: e1 (trymypost), e2 (HeyOrca/SocialPilot specs).

### 6. Video-slide prevalence is ~7 percent: an empty differentiation lane (e1)
Only about 7 percent of carousels currently mix video with static, repeatedly called a "major opportunity gap." CAVEAT: this figure recurs across 2026 blogs without a single named primary dataset; treat as directionally true (mixing IS still rare), not a hard measured number. High-craft, deterministic, code-generated motion slides in a cyber-authority niche is close to an empty lane. Source: e1 (postnitro, carouselli).

### 7. Cheapest win first: "Hold and Scroll" flipbook, zero video encoding, ship TODAY (e1, division head)
The "Hold and Scroll" trend (Manu Muraro / Your Social Team, @yoursocialteam, yoursocial.team blog, confirmed primary source) is NOT video. It is N STATIC image slides with a slight incremental change per slide; the user's fast swipe animates them like a flipbook. It works because it breaks the scroll pattern, is interactive (asks the viewer to participate), and increases dwell time. Achievable on CURRENT shotpls with zero new tooling: generate a slide sequence where one element advances per frame (a counter climbing, a bar filling, a line threading across slides). Prototype this BEFORE building the MP4 pipeline; it de-risks the motion thesis for free. Source: e1, division-head search (yoursocial.team blog, @yoursocialteam Instagram/Threads confirmed).

### 8. Music-on-carousel borrows Reels reach: highest-leverage distribution move (e1, division head)
A carousel that contains a video slide can carry a music track; adding audio makes it eligible for Reels-level discovery. It shows as a carousel in-feed but surfaces in Reels/explore, borrowing Reels reach while keeping carousel engagement depth. Mosseri confirmed carousels get 1.4x more reach than static posts (Feb 2026). CONTRADICTION FLAGGED: sources disagree on when music unlocked for carousels, e1 cites a 2024 update (via Lindsey Gamble / Threads), my follow-up search found sources saying "since mid-2023." Either way it is live in 2026. Sources: e1 (metricool, socialz.ai, Lindsey Gamble), division-head searches (socialz.ai, ned-potter 2026, creatorflow).

### 9. Counts and durations: 7-10 slides, 5-10s per clip, >60 percent completion (e1, e4)
Slide-count sweet spot 7 to 10 (drops after 12 unless serialized). Per-video-slide TARGET 5 to 10 seconds, NOT the 60s ceiling. Aim for >60 percent completion. Place 1 to 2 video slides at slides 3 to 5 showing a transformation/process. 5 to 7 slide carousels get 3.4x more saves and 2.1x more shares than static images (trymypost Q1 2026). Sources: e1, e4.

### 10. Motion premium comes from EASING and RESTRAINT, not effects (e4)
Every source converges: the same transition reads premium or cheap based entirely on easing curve and duration. Lock a HOUSE SET.
- Easing: easeOutExpo `cubic-bezier(0.19,1,0.22,1)` for hero reveals / big numbers; easeOutQuint `cubic-bezier(0.23,1,0.32,1)` for supporting text; easeInOutCubic `cubic-bezier(0.645,0.045,0.355,1)` for on-screen repositioning; linear ONLY for loops. BAN ease-in on entrances. BAN linear on entrances.
- Durations: micro feedback 100-150ms; standard reveal 400-600ms; ONE hero luxury reveal per deck 1200-1800ms; hold each legible line >=500ms after settle; total per-slide loop 2-4s; exits shorter than entrances (200-250ms).
- Char stagger 40-60ms/char, Start (left-to-right) direction default; center-out reserved for one confident hero moment.
- Animate ONLY transform, opacity, clip-path, filter, background-position. NEVER width/height/top/left/margin (layout-triggering, non-deterministic, janky). These compositor/paint properties render identically every frame, which is exactly what makes them safe for frame-by-frame capture.
- Restraint IS the premium signal and maps onto poster-not-newspaper: 1-2 motion moments per slide, one hero reveal per deck, overshoot/bounce as a rare accent. Source: e4 (animations.dev, motion.dev, ics.media, nngroup, vertex.art).

### 11. Count-up / odometer numbers are the biggest single upgrade for salary/stats decks (e4)
Count-up for scale (smooth cubic ease-out, when you want to show scale without drawing attention to the animation); odometer for a LANDED milestone (a salary figure, a subscriber count crossing a round number, digit slots rolling into place). MANDATORY: `font-feature-settings: "tnum"` (tabular nums / equal-width digits) or the number width jitters as digits change and it reads cheap. One-line CSS fix, non-negotiable. Drive the number by a CSS custom property / @property counter keyed to the virtual clock, NOT a wall-clock rAF loop (nondeterministic). Source: e4 (easymotion.io, countUp.js).

### 12. Turnkey engine option if not DIY: HyperFrames (e2)
If Carter wants batteries-included instead of a ~60-line in-house loop: HyperFrames (HeyGen, github.com/heygen-com/hyperframes). Apache 2.0, ~34k stars, v0.7.51 dated 2026-07-11 (extremely fresh), Node 22+, plain index.html substrate, ships h264/yuv420p/crf-23 presets, applyFaststart, GPU detection (nvenc/vaapi/qsv), parallel capture, and auto screenshot-fallback for beginFrame-less Chrome. Helios (BintzGavin, ~88 stars, Elastic License 2.0) is the philosophical twin but far less mature; fine for internal use, weaker bet. Reject Remotion (React, wrong substrate, buys no speed since both bottleneck on Chromium screenshot capture) and timecut (stale since 2022, weak on pure-CSS animation). Source: e2.

### 13. Python generative assets are fully buildable on the uv/headless-Linux stack (e3)
Two clean paths: STATIC vector/chart art via drawsvg (2.4.1) INLINED into the slide HTML so Chrome rasterizes it with everything else (no Cairo, identical anti-aliasing); STANDALONE raster art (dithered photo, noise-field background, chart) rendered to PNG and referenced. Key wins:
- "Matplotlib that does not look like matplotlib" is a four-library drop-in: pyfonts (force the brand font onto the chart), HighlightText (color words in the title, delete the legend), pypalettes (flat palette), drawarrow (real arrows), all driven by one shared `brutalist.mplstyle` (thick spines/lines, font-weight 800, savefig.transparent). Build the stylesheet once; every stat slide reuses it.
- manim (community 0.20.1) is the motion engine: 0.19 dropped the system-FFmpeg requirement (uses pyav) and officially recommends uv, clearing the two biggest container-friction points. Transparent render: `manim -t --format=mov -r 1080,1350 --fps 30`, Cairo renderer NOT OpenGL (OpenGL+`-t` emits no real alpha, issue #3919). Text is Pango-based so it uses the same real font files as the HTML slides; MarkupText gives per-word color spans matching the highlight style.
- Generative backgrounds are one-function wins: vnoise / vec_noise (pure-Python numpy Perlin, no C compiler under uv) for flow-field threads; hitherdither for gritty 1-bit/halftone brutalist texture (Atkinson/Bayer). Note: "didder" is a Go CLI, not a Python package.
- Assembly: moviepy 2.2.1 (hard v2 break: `from moviepy import`, `with_duration`/`with_fps` not `set_`, effects are classes via `with_effects`) OR plain ffmpeg. manim emits alpha .mov -> flatten over the slide background (CompositeVideoClip or ffmpeg overlay) -> 1080x1350 H.264 MP4. Keep the animated element and static chrome as SEPARATE layers, mirroring one-file-per-slide. Source: e3 (PyPI-verified versions, autonomousecon.substack, docs.manim.community).

### 14. Export contract for Instagram (e1, e2, e3, reconciled)
- Container MP4 (or MOV). Video codec H.264, High profile. NEVER H.265/HEVC (glitches on IG upload). Audio AAC (even if silent, keeps compatibility).
- 1080x1350, 4:5, zero crop, matches the slide exactly. First slide LOCKS the aspect ratio for every subsequent slide including video, so lead 4:5 and keep every asset 4:5. Skip the new 3:4 (1080x1440) option: grid cosmetics only, no engagement upside.
- 30fps constant (CFR). 60fps gets compressed softer by IG.
- `-pix_fmt yuv420p` MANDATORY (without it IG/Safari can refuse or color-shift). `-movflags +faststart`. crf 18-20 for flat graphics (HyperFrames "standard" preset uses 23, fine for social).
- Reference command: `ffmpeg -framerate 30 -i frame_%06d.png -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart out.mp4`.
- Upload HIGH source bitrate (8-12 Mb/s VBR) and let IG down-convert; IG re-encodes everything on ingest and higher source reduces visible blocking. sRGB stills, Rec.709 video. 4GB / 250MB and 60s hard ceilings per clip. CONTRADICTION FLAGGED: audio sample rate cited as both 44.1kHz (heyorca) and 48kHz (carouselpost); 48kHz AAC is the safer modern choice. Sources: e1, e2, e3.

### 15. Structural limits 2026 (e1, e3, e4)
20 slides max (up from 10), min 2. Photos and video mix freely in any order. March 2026 update: can reorder/delete slides after posting, but NOT add new ones. Sources: e1 (carouselli, socialrails, storrito), e3 (igli.app, heyorca), e4.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Build "shotpls-motion" as a sibling to shotpls, not a rewrite. Reuse the SAME per-slide HTML substrate: launch pinned chrome-headless-shell, load the 1080x1350 HTML, `await document.fonts.ready`, then for i in 0..N-1 seek all animations to `i*(1000/fps)` via Mechanism 1 (WAAPI), screenshot to frame_%06d.png at 2160x2700, ffmpeg to MP4. Weekend build.

2. Enforce a CSS/WAAPI-only motion contract in the make-carousel skill's animated-slide spec. Forbid raw requestAnimationFrame / setInterval. This makes Mechanism 1 (WAAPI seek) sufficient, eliminates all CDP surface, and immunizes against the Chromium 147 beginFrame removal. This is the single most load-bearing engineering rule.

3. Pin chrome-headless-shell (do NOT render animation against system Chrome). Chromium 147 removed beginFrame from system Chrome. Pinning also guarantees byte-identical renders. Add a double-render hash-compare as a cheap CI regression guard.

4. Default deck shape: mostly-static poster with 1 to 2 motion moments at slides 3 to 5, never all-video. This protects SAVE rate (the KPI for an educational cyber niche, where static wins saves) while buying watch-time and stop-scroll lift. It is also the only motion approach that respects poster-not-newspaper.

5. Ship the "Hold and Scroll" flipbook FIRST on current shotpls, before any MP4 work. N static PNG slides with one element advancing per slide (counter climbing, bar filling, line threading across the deck). Zero video encoding, zero new tooling, de-risks the whole motion thesis for free.

6. Design every video slide to resolve INTO a legible resting frame and to be 100 percent legible muted. Cards play once and stop; the last frame is what the viewer reads and 85 percent watch with sound off. Author t=0 == t=duration for a seamless single-play loop; ffmpeg boomerang only as fallback.

7. Lock a house motion vocabulary as reusable primitives (reveal-up, mask-wipe, scale-pop, count-up, odometer, char-stagger, parallax-drift, blur-in). House easing: easeOutExpo hero, easeOutQuint support, easeInOutCubic on-screen moves, linear loops only. House durations: reveal 400-600ms, one luxury reveal 1200-1800ms/deck, hold >=500ms, loop 2-4s. Animate only transform/opacity/clip-path/filter. Ban ease-in and linear on entrances.

8. Make count-up / odometer number slides a first-class primitive for salary/stats decks with MANDATORY `font-feature-settings: "tnum"`. Drive the number by a clock keyed to the virtual frame index, never wall-clock rAF.

9. Add music to any deck that contains a video slide to borrow Reels-feed reach. Wire a "recommend a trending track" step into the carousel workflow. Highest-leverage distribution move available.

10. Build the Python asset layer in this order: (a) shared `brutalist.mplstyle` + chart helper (every stat slide benefits immediately, uses pyfonts/HighlightText/pypalettes/drawarrow); (b) a drawsvg background/diagram module inlined into HTML (no new deps if Cairo skipped); (c) a `motion/` module of manim scene templates (type-on headline, draw-on bar chart, scanning-line loop) rendering to 1080x1350 alpha; (d) an `assemble.py` that flattens motion onto backgrounds and validates the 1080x1350 / MP4 / H.264 / yuv420p / <60s / <250MB constraints before export.

11. Lock the export contract in tooling: MP4, H.264 High, yuv420p, 1080x1350, 30fps CFR, +faststart, AAC 48kHz even if silent, upload 8-12 Mb/s, never HEVC. Lead slide 1 at 4:5 so the ratio-lock never crops a video slide. Skip 3:4.

12. Reject Remotion, Lottie, Rive, timecut, and screen-recording for this use case. If a turnkey engine is wanted over the in-house loop, HyperFrames (Apache 2.0, plain HTML, screenshot-fallback) is the only strong candidate; Helios is a weaker ELv2 fallback for internal use only.

---

## OPEN QUESTIONS

1. NAMED HIGH-CRAFT CREATORS DID NOT SURFACE (shared gap across all four scouts, plus six additional division-head searches). Blog roundups abstract away @handles. The only concrete named references are Manu Muraro / @yoursocialteam (Hold-and-Scroll, confirmed primary), Disney (Ice Age panoramic seamless carousel), @panoramaker.app (PANO tool), and @lindseygamble_ (analyst who documented the music unlock). This is NOT closeable via web search; it needs a MANUAL Instagram browse of motion-design and B2B carousel accounts, then a reverse-engineer of specific decks. Assign this to a human-in-the-loop or a browser-driving pass, not another blog-search agent.

2. ENGAGEMENT NUMBERS ARE INCONSISTENT ACROSS SOURCES. Mixed-media 2.33 percent vs image-only 1.80 percent (e1/e4) coexists with "carousels average 1.92 percent overall" and "6.90 percent Buffer median" and "Reels 0.50 percent." Different datasets, different denominators, none independently fetched (most cite a Socialinsider study not read directly). Treat ALL as directional, not lab-grade. The 7 percent video-mix prevalence and 22 percent cinemagraph stop-scroll lift are blog-repeated with no named primary dataset; treat as A/B hypotheses to test in-house, not facts.

3. MUSIC-UNLOCK DATE CONTRADICTION. e1 cites a 2024 update; division-head search found "since mid-2023." Immaterial to action (it is live in 2026) but flagged for honesty.

4. NO NICHE-SPECIFIC SAVE-RATE DATA for video-slide vs static-only carousels in an educational/technical niche. Sources say static wins saves and video wins watch-time in general terms only; no cyber-niche numbers exist. Carter's own A/B test (static deck vs same deck with 1-2 motion slides, measuring saves and watch-time) would be the only real answer.

5. AUDIO SAMPLE RATE (44.1 vs 48kHz) and BITRATE BANDS (3.5-5 Mb/s IG-recommended vs 8-12 Mb/s quality-max) are reconciled logically (upload high, IG re-encodes) but NOT from an official Meta doc. Low-risk; verify against a Meta spec page if precision ever matters.

6. NO HANDS-ON RENDER BENCHMARK for 1080x1350 4:5 on Carter's headless Linux box. HyperFrames figures (10s/1080p in 35-50s) are 16:9 on macOS. Real per-slide render time needs a local test; a 3-6s 4:5 clip at 30fps is ~90-180 frames, expected seconds to low tens of seconds, but unverified on his hardware.

7. WAAPI-ONLY COVERAGE OF GSAP/paused timelines was inferred from HyperFrames' adapter model, not directly tested. If any slide ever uses a GSAP paused timeline instead of native CSS/WAAPI, confirm Mechanism 1 seeks it or add an adapter. The CSS/WAAPI-only contract (directive 2) makes this moot if enforced.
