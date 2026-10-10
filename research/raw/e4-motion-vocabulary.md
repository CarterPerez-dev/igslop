<!-- © AngelaMos | 2026 | e4-motion-vocabulary.md -->

# DIVISION E4: Motion vocabulary for 1-4 second social loops

Mission: motion design vocabulary for short social loops (what reads premium vs cheap), Lottie/Rive headless viability in 2026, CSS keyframe limits for headless rendering, and elite motion patterns. Distilled into a do/do-not table encodable as a skill.

Date of research: 2026-07-10. Recency priority applied: 2026-dated sources led; older sources labeled background.

Bottom line up front: Carter's existing pipeline (standalone 1080x1350 HTML per slide, rendered by headless-Chrome shotpls to PNG) is ALREADY 90 percent of a video pipeline. Going animated does NOT require Lottie or Rive. It requires swapping the single-screenshot step for a deterministic frame-by-frame capture loop (advance a virtual clock, screenshot, repeat, pipe to ffmpeg). Everything below is authored in plain CSS keyframes / WAAPI, which is exactly what a headless Chrome renderer captures best.

---

## SEARCHES RUN

1. premium motion design easing curves 2026 what reads expensive versus cheap animation
2. Lottie render headless server node 2026 puppeteer video export
3. Rive runtime headless render offscreen canvas 2026 export video
4. kinetic typography motion design rules Instagram 2026 stagger duration
5. count-up number animation odometer easing duration best practice motion design 2026
6. mask reveal text animation clip-path premium motion design technique 2026
7. easeOutExpo easeOutQuint cubic-bezier values premium ui animation entrance
8. render CSS animation to video frame by frame headless chrome puppeteer setCurrentTime deterministic
9. Instagram carousel video slide 2026 animated slides best motion designers examples
10. Rive vs Lottie 2026 which to use file size interactivity state machine comparison
11. WebVideoCreator github render web animations mp4 puppeteer 2026 virtual time
12. spring animation stiffness damping mass values natural UI motion framer motion 2026
13. best motion graphics designers instagram 2026 kinetic type accounts to follow
14. amateur motion design mistakes tells linear easing too fast too slow bounce overuse 2026
15. parallax depth layers social media graphic subtle movement premium 2026 pixels offset
16. lottie-web player script tag html embed autoplay dotlottie 2026 usage
17. Instagram algorithm 2026 carousel with video slide counts as reel reach mixed media engagement
18. motion blur social loops premium detail micro animation blur-in text 2026

Pages fetched and read in full: ikagency kinetic typography guide, motion.dev easing docs, vertex.art kinetic typography guide, replit.com "browsers don't want to be cameras", ics.media choosing-ease (bezier table), Vinlic/WebVideoCreator README, maximeheckel spring physics, nngroup animation duration, animations.dev easing blueprint, genesismotiondesign 2026 trends.

---

## FINDINGS

### 1. The one factor that separates premium from cheap: EASING, not the effect

Every source converges on this. The same visual transition reads premium, playful, or mechanical depending entirely on the easing curve and duration. Source: motion.dev / cueballcreatives via search, and animations.dev states it flatly: "Easing is the most important part of any animation. It can make a bad animation look great, and a great animation look bad." (https://animations.dev/learn/animation-theory/the-easing-blueprint)

Cheap tells, named across sources:
- Linear easing (constant velocity). "Nothing in the physical world moves at constant velocity." Completely linear motion looks unnatural. (motion.dev, pixelfreestudio, nngroup)
- Default/built-in easing presets applied uniformly. animations.dev: stronger CUSTOM curves (vs built-in defaults) deliver more energetic, premium results.
- ease-in used for entrances. animations.dev: "avoid ease-in entirely. That slow start can make interfaces feel sluggish and less responsive."
- Bounce/overshoot overused. Bouncing icons and sliding banners distract and confuse. (clutch.co, nngroup) Use overshoot as a rare accent, not the default.
- Inconsistent easing across similar elements confuses viewers. Pick a house curve and reuse it. (linkedin advice, carbon design system)
- Too fast (unreadable, goes unnoticed) or too slow (frustrating, drags). (pixelfreestudio, nngroup)

Premium tells:
- Custom cubic-bezier ease-out for entrances (fast in, gentle settle).
- Asymmetric timing: entrance longer than exit.
- Motion serves the message; 1-2 motion moments per slide, not everything moving.

### 2. Easing cubic-bezier table (exact values, use these verbatim in CSS)

From ics.media (https://ics.media/en/entry/18730/) and fwd/easings.net corroboration. These are the Penner-equation bezier approximations, the industry-standard values:

- easeOutSine: cubic-bezier(0.39, 0.575, 0.565, 1)
- easeOutCubic: cubic-bezier(0.215, 0.61, 0.355, 1)
- easeOutQuart: cubic-bezier(0.165, 0.84, 0.44, 1)
- easeOutQuint: cubic-bezier(0.23, 1, 0.32, 1)   [also cited as 0.22, 1, 0.36, 1]
- easeOutExpo: cubic-bezier(0.19, 1, 0.22, 1)    [also cited as 0.16, 1, 0.3, 1]
- easeOutCirc: cubic-bezier(0.075, 0.82, 0.165, 1)
- easeOutBack (overshoot): cubic-bezier(0.175, 0.885, 0.32, 1.275)  (the y2=1.275 > 1 is the overshoot past target)
- easeInOutCubic: cubic-bezier(0.645, 0.045, 0.355, 1)
- easeInOutQuart: cubic-bezier(0.77, 0, 0.175, 1)
- easeInExpo: cubic-bezier(0.95, 0.05, 0.795, 0.035)

The two slight variants for Quint/Expo exist because different libraries fit the Penner curve slightly differently; both read premium. For Carter's decks the workhorse trio is: easeOutExpo (biggest, most "designed" settle) for hero text/number reveals, easeOutQuint (slightly softer) for supporting elements, easeInOutCubic for elements that move/reposition on-screen.

Guidance on which curve when (animations.dev + ics.media + nngroup):
- Entrances / user-initiated reveals: ease-out (fast start = feels responsive, gentle end = guides the eye). Use easeOutExpo or easeOutQuint for the "expensive" version.
- Elements already on screen that MOVE or morph to a new position: ease-in-out (easeInOutCubic).
- Hover/color/opacity micro: plain ease is fine.
- Constant loops (marquee, spinner, progress bar): linear is the ONLY correct use of linear.
- Never ease-in for an entrance.

### 3. Duration ranges (exact ms, the actual constraint window)

UX-motion baseline (nngroup, https://www.nngroup.com/articles/animation-duration/):
- Overall UI range: 100 to 500 ms; 100 to 400 ms for most cases.
- Simple feedback (toggle, checkmark): ~100 ms.
- Substantial screen change (modal in): 200 to 300 ms.
- 500 ms is the ceiling: "at 500ms animations start to feel like a real drag."
- Entrance/exit asymmetry: appear 300 ms, disappear 200 to 250 ms. Exits are shorter.

Editorial/brand reveal ranges (vertex.art, https://vertex.art/blogs/typography-animation-kinetic-typography):
- Refined Reveal (luxury brands): 1.2 to 1.8 s. Character-level fade-in with slight upward translation, ease-out.
- Energetic Cascade (consumer brands): 0.6 to 0.9 s. Center-outward stagger, scale-from-zero, bounce.

For a social loop that must be legible on a swipe:
- ikagency: text must stay readable at least 0.5 s AFTER it settles. (https://www.ikagency.com/graphic-design-typography/kinetic-typography/)
- Average attention span for social content: 1.7 s before scroll. (ikagency)
- So a slide's whole reveal-plus-hold should fit roughly: reveal 0.4 to 0.9 s, then hold legible 1.5 to 2.5 s. A 1 to 4 s loop is the right envelope. Reserve the slow 1.2 to 1.8 s "luxury reveal" only for a single hero moment (title slide, big number), not every element.

### 4. Kinetic type / stagger rules (exact numbers)

From vertex.art and ikagency:
- Per-character stagger for body-size text: 40 to 60 ms per character. Faster than that and it outruns the reader.
- Rule: "a stagger reveal should pace itself so each unit is legible by the time the next one arrives."
- Stagger direction modes: Start (left-to-right, most readable for English), End (right-to-left), Center-outward (explodes from center, "a powerful, confident gesture"), Edges-inward, Random (seeded for determinism), Index (radiate from a focal point).
- For left-to-right languages, Start direction is the default readable choice.

Named kinetic techniques (catalog to draw from):
- Per-character stagger reveal (glyphs animate independently, sequential offset)
- Typewriter (cursor marks visible/hidden boundary, L-to-R)
- Mask reveal (a shape/gradient wipes across text to uncover it)
- Scale pop (scale-from-zero, often with easeOutBack overshoot)
- Refined Reveal (fade + slight upward translate, ease-out)
- Energetic Cascade (center-out stagger + scale + bounce)
- Glitch Emergence (displacement materialization; frequency 0.08 to 0.12 per vertex.art)
- 3D card-flip entrance (Y-axis rotation with perspective)
- Perspective-fold entrance (forward X-axis rotation during upward translate)
- Morphing text, text-on-path, 3D text rotation (ikagency)

### 5. Count-up / odometer numbers (the highest-leverage single technique for a stats deck)

From easymotion.io and countUp.js (search results):
- Count-up: increments cleanly 0 to final value with smooth easing. Use when you want to show scale WITHOUT drawing attention to the animation.
- Odometer: individual digit slots roll upward and lock into place, mechanical feel. Use when the LANDING is the moment (revenue milestone, subscriber count crossing a round number, a salary figure).
- Four easing options observed: Linear, Smooth (cubic ease-out), Spring (overshoot + settle), Bounce (dramatic overshoot). Smooth/cubic ease-out is the premium default; Spring for a "landed" moment.
- CRITICAL detail that separates pro from amateur: use the OpenType `font-feature-settings: "tnum"` (tabular nums / equal-width digits). Without it the number width jitters as digits change and it reads cheap. This is a one-line CSS fix and a mandatory rule.
- Reference libs: countUp.js (inorganik), odometer. Both trivially embeddable, but for a deterministic HTML-per-slide render Carter can drive the number with a CSS custom property + @property counter or a tiny rAF loop keyed to the virtual clock.

### 6. Mask reveals (premium, cheap to render, compositor-safe)

From effect-labs and motion.page:
- The premium, performant reveal uses clip-path and opacity, which the compositor thread handles WITHOUT triggering main-thread layout reflow. clip-path is animatable between shapes that have the same number of points.
- mask-image with a gradient that hard-transitions at a moving boundary = a sharp wipe across text.
- clip-path unmasks without reflow. This matters for frame-by-frame determinism: compositor-only properties (transform, opacity, clip-path, filter) render identically every frame.
- Rule for the skill: animate ONLY transform, opacity, clip-path, filter. Never animate width/height/top/left/margin (layout-triggering, non-deterministic, janky).

### 7. Spring physics (when to reach for a spring vs a bezier)

From framer/maximeheckel (https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/):
- Framer Motion defaults: stiffness 100, damping 10, mass 1.
- Stiffness up = snappier/more sudden. Damping up = settles faster, less bounce. Mass up = more lethargic/momentum.
- To get a premium NON-bouncy settle, you want high damping relative to stiffness (near critically damped). A visible bounce (underdamped) is the "playful/consumer" register, use sparingly.
- Practical premium sets (derived from the stiffness/damping relationship, to tune): snappy-no-bounce ~ stiffness 200, damping 26, mass 1; gentle ~ stiffness 120, damping 20; subtle-bounce accent ~ stiffness 300, damping 15.
- Caveat for Carter's pipeline: a spring's natural rest time is not a fixed duration, which complicates deterministic frame counting. For a fixed-length loop, a cubic-bezier ease-out is easier to render deterministically than a physics spring. Use springs only if the renderer samples the spring at fixed virtual-time steps. Gap: no source gave a closed-form "render N frames of a spring" recipe; treat springs as optional.

### 8. Parallax depth (cheap illusion of premium 3D)

From builder.io and garagefarm:
- The rule: background layers move 20 to 30 percent slower than foreground layers.
- 2026 trend is SUBTLE parallax, not dramatic full-frame. "The best parallax is subtle. Users feel the smoothness but can't explain why."
- For a static-image-becoming-motion slide, split the image into 2 to 3 depth layers (bg, mid, subject) and drift them a few px at different rates. This is the "3D photo" effect used on Reels/TikTok.
- For Carter: on a slide with one strong image, a slow 2 to 3 layer parallax drift (subject drifts ~30px, bg drifts ~8 to 10px over the loop) reads premium at near-zero authoring cost. Keep total travel small; big parallax reads gimmicky.

### 9. 2026 aesthetic direction (what elite motion looks like now)

genesismotiondesign 2026 trends (https://genesismotiondesign.com/motion-design-trends-2026/):
1. AI-assisted production (needs strong direction to avoid generic output)
2. Real-time 3D
3. Tactile/handmade: "textures that look like paper, fabric, or clay. Imperfect lines. Grain and noise used deliberately." (pairs with Division D texture work)
4. Micro-interactions (context-aware)
5. Seamless 2D-3D integration (depth without full 3D)
6. Short-form motion: "anything under 60 seconds is now the default format."
Advice: build "reusable character rigs, modular templates, and consistent visual languages" to sustain quality at volume. Directly supports building a MOTION SKILL with reusable animation primitives rather than one-off animations.

Named elite motion designers to study on IG (printmag, madebyloop, school of motion, background/older lists but names verified in 2026-dated roundups): Emonee LaRussa (Emmy-winning, energetic), Studio Feixen / Felix Pfaffli (bold experimental typography + motion, Nike/Google/NYT clients), Amadeus Malmen (2.5D-feeling flat type), Lucas Young, Vimal Krishnattri (bold kinetic type). Community/aggregator accounts: @motiongraphics_collective, @motiondesigners. (These are named handles from the roundups; not independently traffic-verified.)

### 10. Instagram carousel VIDEO slides are real and outperform (2026, verified)

From creatorflow, mentionlytics, storrito, socialinsider-via-search:
- Carousels support up to 20 items, and can MIX photos and short video clips in any order. Each video up to 60 s. Every slide must share the same aspect ratio (use 4:5, 1080x1350). New 3:4 (1080x1440) added in 2026, but 4:5 remains the recommended/engagement default.
- Mixed-media carousels (image + video) average 2.33 percent engagement vs 1.80 percent image-only, a 29 percent lift.
- Practical placement: 1 to 2 video slides around slides 3 to 5 showing a transformation/process; rest static. Keep videos under 15 s. Add captions since 85 percent watch without sound.
- Seamless carousels (one image bled across slides) get ~40 percent higher completion. Motion designers favor this.
- Algorithm signals that matter most in 2026 (Mosseri via buffer/hootsuite): watch time, likes-per-reach, sends-per-reach. Each swipe counts as engagement; the algo re-shows unfinished carousels in feed. A video slide raises watch time directly.
- Carousels = highest-reach feed format (Socialinsider 150k-post analysis: 55 percent more reach, 70 percent more saves than single images). Reels reach new non-followers; carousels deepen existing-follower engagement.

### 11. Headless rendering of animation: the pipeline decision (this is the core technical finding)

The question "do Lottie and Rive render headless" is answered, but the more important answer is Carter does not need either.

Lottie headless: YES. lottie-web fully supports svg/canvas/html renderers, all lottiefiles.com animations included. Server render options: puppeteer-lottie (transitive-bullshit) renders a .json to image/GIF/MP4 via headless Chrome + ffmpeg (recommended over the brittle lottie-node/node-canvas hack). Embed in an HTML page via the dotLottie web component: one script tag (https://unpkg.com/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js) plus a <dotlottie-wc src=... autoplay loop> element, zero JS config. The 2026 player is Rust+WASM with Software/WebGL2/WebGPU backends. dotLottie (.lottie, ZIP-compressed) is up to 80 percent smaller and supports v2 state machines/theming/audio. BUT for a from-scratch offline HTML render at render time, Carter would need to inline the WASM/JSON, and Lottie authoring means After Effects + Bodymovin, which he does not use.

Rive headless: YES but heavier. Rive PLS renderer supports offscreen rendering (Vulkan headless on Linux via VulkanHeadlessFrameSynchronizer; Metal on macOS). breakawaydata/rive-render is a headless C++ CLI + TS API that outputs PNG/GIF (ffmpeg)/MP4/WebM (ffmpeg libx264/vp9). Web runtime supports OffscreenCanvas and useOffscreenRenderer. Remotion has a <RemotionRiveCanvas>. Rive files are 10-15x smaller than Lottie (240KB Lottie ~= 16KB Rive) but the web runtime is ~200KB gzipped WASM vs lottie-web ~60KB. Rive's edge is INTERACTIVE state machines (idle/hover/pressed/loading defined in the .riv, no code), which is irrelevant to a non-interactive rendered video.

Verdict for Carter (2026 guidance, pkgpulse/rive/lottiefiles): "CSS animations are best for UI transitions and micro-interactions. Lottie for designer-created illustrations/icons. Rive for interactive stateful animations." Carter authors typography-and-shape motion in HTML/CSS and renders non-interactively. That is squarely the CSS-animation lane. Skip Lottie and Rive unless he wants a pre-made illustrated character loop, in which case dotLottie-wc dropped into a slide HTML is the least-friction path.

### 12. CSS keyframe capability and its limits for headless rendering

What CSS/WAAPI can do that reads premium (all captured perfectly by headless Chrome):
- transform (translate/scale/rotate/skew, incl. 3D rotateX/Y with perspective), opacity, clip-path (mask reveals, wipes), filter (blur-in, brightness, drop-shadow), mask-image gradient wipes, background-position (parallax/marquee), and @property-typed custom properties for animating gradients and counters smoothly.
- Per-character stagger via animation-delay on split spans (or CSS nth-child calc), which is deterministic.
- These are all compositor/paint properties that produce identical output every frame = safe for frame-by-frame capture.

Limits / gotchas:
- Physics springs are not native CSS; you approximate with a multi-stop bezier or linear() easing function (CSS linear() lets you encode a sampled spring curve as points, a 2024+ feature, worth using for spring-feel without JS).
- Text along a path and complex morphs need SVG (SMIL or WAAPI on SVG), still headless-safe.
- Real-time particle systems / canvas rAF loops render headless ONLY if the rAF clock is virtualized (see 13); otherwise frames are nondeterministic.
- filter: blur() is GPU-heavy per frame; fine at 30fps 2160x2700 but watch render time.

### 13. The exact deterministic frame-capture method (how to extend shotpls to video)

This is the actionable engineering path. Two proven approaches, both headless Chrome:

Approach A, virtual-time injection (Replit, https://replit.com/blog/browsers-dont-want-to-be-cameras; WebVideoCreator, https://github.com/Vinlic/WebVideoCreator):
- Inject a shim that REPLACES setTimeout, setInterval, requestAnimationFrame, Date, Date.now(), and performance.now() so the page's clock is driven by you, not wall-clock. Replit's shim is ~1200 lines.
- Frame loop: advance the virtual clock by exactly 1000/fps ms (16.67 ms at 60fps, 33.33 ms at 30fps), fire the due callbacks, screenshot, repeat. "Advance clock. Fire callbacks. Capture. Repeat. Every frame is deterministic, every time."
- A 2 s CSS animation does NOT take 2 wall-clock seconds; it takes as many frames as you request. Pre-warm ~30fps of invisible frames to avoid compositor staleness.
- Binary: chrome-headless-shell (post Chrome 120), not full Chrome.

Approach B, native deterministic mode + BeginFrame control (dtinth/html5-animation-video-renderer, WebVideoCreator, chromium headless-dev):
- Use HeadlessExperimental.beginFrame (CDP) to control exactly when a frame is drawn, instead of relying on browser throttling.
- Chrome flags for true determinism: --deterministic-mode --enable-begin-frame-control --run-all-compositor-stages-before-draw --disable-threaded-animation --disable-threaded-scrolling --disable-checker-imaging --disable-image-animation-resync --enable-surface-synchronization. With --deterministic-mode the time source is fixed and performance.now() is driven by the frameTimeTicks you pass to beginFrame.
- Renderer calls seekToFrame(n); the page displays frame n; screenshot; pipe straight to ffmpeg (no temp files). Tested to 1080p60.

Output: pipe PNG frames to ffmpeg. MP4 (libx264) for IG video slides; transparent WebM (libvpx-vp9) if compositing. WebVideoCreator minimal API: new WebVideoCreator(); createSingleVideo({ url, width, height, fps, duration, outputPath }); video.start().

For Carter: shotpls is already headless Chrome taking one screenshot of a 1080x1350 HTML. A "shotpls-motion" or a sibling recipe wraps the SAME HTML in Approach A's virtual-time loop (30fps, duration from a data-attr or config), screenshots each frame at 2160x2700, and pipes to ffmpeg to make a 4:5 MP4 slide. WebVideoCreator (Node + Puppeteer + Chrome + ffmpeg) is a near-drop-in reference implementation; Replit's approach is the more robust virtual-time model and they signaled open-sourcing the TS rewrite.

---

## SO WHAT FOR US

1. Build a motion SKILL, not one-off animations. The 2026 elite play is reusable modular motion primitives. Encode a fixed vocabulary: reveal-up, mask-wipe, scale-pop, count-up, odometer, parallax-drift, blur-in, char-stagger. Each is a CSS/WAAPI snippet with a locked easing + duration. Skill DESCRIBES the primitive by principle, not a copy-paste block (per Carter's anti-tunnel-vision memory), but ships the exact bezier and ms values as the "house tuning."

2. House easing set (lock these): easeOutExpo cubic-bezier(0.19, 1, 0.22, 1) for hero reveals and big numbers; easeOutQuint cubic-bezier(0.23, 1, 0.32, 1) for supporting text; easeInOutCubic cubic-bezier(0.645, 0.045, 0.355, 1) for on-screen repositioning; linear ONLY for loops. Ban ease-in on entrances. Ban linear on entrances.

3. House duration set (lock these): micro feedback 100-150 ms; standard reveal 400-600 ms; one hero "luxury reveal" per deck 1200-1800 ms; hold each legible line >= 500 ms after settle; total per-slide loop 2-4 s. Exits shorter than entrances (200-250 ms).

4. Char stagger 40-60 ms/char, Start direction default, center-out reserved for one confident hero moment. Never stagger faster than the reader.

5. Number slides are the single biggest upgrade for a cyber/salary/stats deck. Count-up for scale, odometer for a landed milestone (salary figure, subscriber count). MANDATORY: tabular-nums (font-feature-settings: "tnum") or it jitters and reads cheap.

6. Only animate transform, opacity, clip-path, filter, background-position. Never width/height/top/left/margin. This keeps every frame deterministic for headless capture and jank-free on-device.

7. Skip Lottie and Rive for now. Carter's HTML/CSS authorship + headless render is the CSS-animation lane, which every 2026 source says is correct for typographic UI motion. dotLottie-wc (one script tag) is the fallback ONLY if he wants a pre-illustrated character/icon loop. Rive's whole advantage is interactivity, which a rendered video does not have.

8. The pipeline extension is small and known. Wrap the existing per-slide HTML in a virtual-time frame loop (Approach A, WebVideoCreator/Replit model) or native deterministic-mode + BeginFrame (Approach B, dtinth), screenshot at 2160x2700 per frame, pipe to ffmpeg -> 4:5 MP4. Reuses shotpls's headless Chrome entirely. This is a weekend build, not a rewrite.

9. Ship 1-2 video slides per carousel, placed at slides 3-5, showing a transformation (config-to-exploit, before/after, count-up stat). Keep under 15 s, captioned (85 percent watch muted), same 1080x1350 aspect as static slides. Expect ~29 percent engagement lift and higher watch-time (a top-3 algorithm signal in 2026). Do NOT make every slide a video; alternate static and motion for pacing.

10. Restraint is the premium signal. 1-2 motion moments per slide, one hero reveal per deck. Overshoot/bounce is a rare accent, not the house default. Subtle parallax (bg 20-30 percent slower, small travel). The 2026 direction is "purposeful motion," which maps exactly onto Carter's poster-not-newspaper thesis: one focal point that moves, everything else still.

---

## GAPS / DEAD ENDS

- No source gave a closed-form recipe for rendering a physics SPRING to a fixed frame count deterministically. Springs have a variable rest time. Recommendation stands: prefer cubic-bezier (or CSS linear() sampled-spring) for deterministic loops; treat true springs as optional.
- Could not independently verify follower counts or confirm current 2026 activity of the named IG motion designers (Emonee LaRussa, Studio Feixen, etc.); handles come from roundup articles, several older/background, names re-cited in 2026 lists. X/Twitter examples were not fetchable and did not surface useful specifics.
- The two cited bezier variants for easeOutQuint/easeOutExpo differ slightly between sources (library fitting differences). Both are valid; I flagged the primary Penner values from ics.media.
- The stagger/duration numbers for the "luxury reveal" (1.2-1.8 s) and "energetic cascade" (0.6-0.9 s) come from one strong source (vertex.art); corroborated in spirit by ikagency's 0.5 s legibility rule and nngroup's 100-500 ms UX ceiling, but not triangulated to a third independent number for the brand-reveal bands specifically.
- Engagement percentages (2.33 vs 1.80, 55 percent reach, 40 percent completion) come from marketing-blog aggregations citing Socialinsider; the underlying Socialinsider study was not fetched directly. Treat as directional, not lab-grade.
