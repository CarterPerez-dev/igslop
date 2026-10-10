<!-- © AngelaMos | 2026 | e2-html-to-video.md -->

# DIVISION E2: Deterministic HTML/CSS Animation to Video on Headless Linux (2026)

Mission: pick the single best way to render a 1080x1350 animated HTML slide into a 3-6 second Instagram-ready loop mp4, using the existing shotpls-style pipeline (one standalone HTML file, all assets inline, headless Chrome on Linux). Recency priority: 2026 material. Older material labeled BACKGROUND.

Bottom line up front: the winning pattern is SEEK-AND-CAPTURE (deterministic time control by seeking animations frame by frame, screenshot each frame, then ffmpeg-assemble). Do NOT use real-time screen recording (Page.screencast / puppeteer-screen-recorder) for a designed loop: it drops frames and is non-deterministic. Two mature open-source engines already implement seek-and-capture for PLAIN HTML: HyperFrames (HeyGen, Apache 2.0) and Helios (BintzGavin, Elastic License 2.0). For Carter's use case the recommendation is to build a tiny in-house seek-and-capture script (the same 60-line loop these engines wrap) OR adopt HyperFrames' engine, and NOT Remotion (React framework, wrong substrate).

---

## SEARCHES RUN

1. timecut timesnap puppeteer deterministic HTML canvas to video 2026
2. puppeteer screencast API record video CDP Page.startScreencast frame rate 2026
3. CDP virtual time budget deterministic frame capture headless chrome animation render
4. Remotion render video react headless linux ffmpeg 2026 self-hosted
5. Emulation.setVirtualTimePolicy pause deterministic screenshot CSS animation chrome 2025 2026
6. ffmpeg png frames to mp4 instagram h264 yuv420p fps loop settings 1080x1350
7. helios BintzGavin programmatic video CSS animations chrome devtools protocol
8. Remotion vs plain HTML animation render simple loop overkill react dependency 2026
9. Instagram carousel video specs 2026 mp4 h264 aspect ratio 4:5 1080x1350 max length loop
10. HeadlessExperimental beginFrame deprecated new headless chrome 2024 2025 virtual time screenshot support
11. Chromium 147 removed HeadlessExperimental beginFrame CDP replacement screenshot deterministic
12. hyperframes chrome-headless-shell beginFrame fallback screenshot capture mechanism 2026
13. deterministic css animation to video puppeteer document.getAnimations currentTime pause seek screenshot loop node script
14. Remotion offthread render frames dockerfile linux GPU chrome-for-testing swiftshader angle 2026
15. short seamless loop video ffmpeg palindrome boomerang reverse concat perfect loop css animation

Pages fetched and read: github.com/tungs/timecut, replit.com/blog/browsers-dont-want-to-be-cameras, github.com/BintzGavin/helios, andrew.ooo HyperFrames review, hyperframes.mintlify.app/packages/engine, github.com/heygen-com/hyperframes, chromium headless-dev thread QBQEm5Yd3_E, NousResearch hermes-agent hyperframes troubleshooting.md.

---

## FINDINGS

### 1. The two rendering philosophies (this is the whole decision)

There are exactly two ways to turn a browser animation into a video, and they are not close in quality:

A. REAL-TIME SCREEN RECORDING. Let the animation play at wall-clock speed and grab frames as Chrome produces them. This is what CDP Page.startScreencast, Puppeteer's page.screencast(), and puppeteer-screen-recorder do. Source: pptr.dev/api/puppeteer.page.screencast; screenshotone.com blog "how to record videos with puppeteer". Default output is WebM VP9 at 30 fps. The screencast casts base64 PNG/JPEG frames one at a time as Chrome emits them. Problem, stated in the search result verbatim: "with such low frame rates, you'll end up with choppy visuals because the entire process is resource-intensive and slow." It is non-deterministic: run it twice, get two different videos, because frame timing depends on CPU load. WRONG for a designed loop.

B. SEEK-AND-CAPTURE (also called virtual-time / deterministic rendering). Detach the animation from wall-clock time. For each output frame i, seek every animation to exactly t = i * (1000/fps) ms, wait for layout/paint, screenshot, repeat. Then hand the numbered PNGs to ffmpeg. Source: HyperFrames docs (hyperframes.mintlify.app), Helios README (github.com/BintzGavin/helios), Replit engineering blog. This is deterministic: "the same HTML always produces the identical video, regardless of system load or timing." A 60-second video does NOT take 60 seconds to render; it takes as long as the CPU needs. This is the correct approach and every serious 2026 tool uses it.

Carter's shotpls already does the static version of B (render one HTML file to one PNG). Animated slides are just B looped over N frames with the animation seeked between shots. This is a natural extension of the existing pipeline, not a new paradigm.

### 2. HOW to seek time deterministically: three mechanisms, ranked

There are three levels of time control, from simplest/most-portable to most-precise/most-fragile.

MECHANISM 1: Web Animations API seek (pure JS, no special Chrome flags). In the page, run:
    document.getAnimations().forEach(a => { a.currentTime = targetMs; a.pause(); });
Every CSS @keyframes animation and every WAAPI animation exposes a writable currentTime. Set it, the browser recomputes all interpolated values, then you screenshot. Source: cassidoo.co/post/pause-css-animation, dev.to/cassidoo, Helios preview-mode docs. This is what Helios uses for PREVIEW and what you can use for the whole render if all motion is CSS/WAAPI. It requires NO special binary and NO flags. It does NOT control setTimeout/setInterval/requestAnimationFrame, so JS-driven motion (a rAF counter, a typewriter on setInterval) will not be seeked by it. For pure-CSS slides it is enough and it is the most portable option.

MECHANISM 2: JS time-override injection (the timecut / Replit approach). Before the page loads, inject ~1000-1200 lines of JS that replace Date, Date.now, performance.now, requestAnimationFrame, setTimeout, setInterval (and cancels) with a fake clock. Then "advance clock, fire callbacks, capture, repeat." Source: Replit blog "We Built a Video Rendering Engine by Lying to the Browser About What Time It Is" (replit.com/blog/browsers-dont-want-to-be-cameras); timecut README (github.com/tungs/timecut via timesnap + timeweb using page.evaluateOnNewDocument). This catches BOTH CSS animations (via performance.now driving them) AND JS-driven motion. It needs no special Chrome build. Downside: timecut's own README warns that changes "through transitions/animations from CSS rules will likely not render as intended" in older versions, i.e. the JS-time-override does not perfectly virtualize the compositor's CSS clock in every case. Modern engines combine mechanism 1 (seek WAAPI) plus mechanism 2 (fake JS clock) to cover both.

MECHANISM 3: CDP compositor control, HeadlessExperimental.beginFrame and/or Emulation.setVirtualTimePolicy (deepest, most fragile). beginFrame runs ONE layout to paint to composite to screenshot cycle atomically and pauses the compositor until you ask for the next frame. It returns hasDamage (did anything change) and the screenshot bytes, with no race conditions because there is no concurrent render pipeline still settling. Source: chromedevtools.github.io HeadlessExperimental domain; NousResearch hyperframes troubleshooting.md. This is the byte-for-byte-reproducible gold standard. Emulation.setVirtualTimePolicy detaches Chrome's internal clock from wall-clock and lets you advance by an exact number of ms so all CSS/WAAPI animations update to the new time before capture. Source: chromedevtools.github.io Emulation domain; Helios production-mode docs.

CRITICAL 2026 LANDMINE: Chromium 147+ REMOVED the HeadlessExperimental.beginFrame CDP command. Sources: NousResearch hermes-agent hyperframes troubleshooting.md ("Chromium 147+ removed the HeadlessExperimental.beginFrame CDP command"); heygen-com/hyperframes issue #294 "issues installing on openclaw due to HeadlessExperimental.beginFrame". Also HeadlessExperimental.enable/disable are marked Deprecated in the CDP docs. beginFrame still WORKS in the pinned chrome-headless-shell binary (that is why HyperFrames ships its own), but it is GONE from system Chromium 147+. So mechanism 3 is now a moving target: build against a pinned chrome-headless-shell you control, never against system Chrome. If you do not want to babysit a pinned binary, mechanisms 1 and 2 (pure JS, no CDP frame control) are the safer long-term bet.

BACKGROUND: The chromium headless-dev thread on frame-precise CSS capture (groups.google.com QBQEm5Yd3_E) is from October 2017. Andrey Utkin got beginFrame returning mainFrameContentUpdated but frameTime showed "no observable animation advancement" and virtual-time-plus-beginFrame was "under development." Do not treat that thread as current; it is nine years old. It establishes the lineage, not the 2026 state.

### 3. The plain-HTML engines that already do this (2026, verified)

HYPERFRAMES (the strongest match for Carter's pipeline)
- Made by HeyGen. License Apache 2.0. Fully open source, no per-render fees, commercial use allowed. Repo github.com/heygen-com/hyperframes.
- Star count and version: repo shows 34.2k stars, latest release v0.7.51 dated July 11 2026 (extremely fresh; this is a top-tier actively maintained project as of the mission date). Note: two secondary reviews reported different star counts (one said ~21.9k, one said 88 which was actually the Helios number), so trust the repo figure of ~34k.
- Substrate: PLAIN index.html. You author a normal HTML file. Timing is declared with data attributes (data-start, data-duration, data-width, data-height) and animations are registered as PAUSED timelines on window (GSAP example: window.__timelines.launch = tl with gsap.timeline({paused:true})). Adapters cover GSAP, CSS, Lottie, Three.js, Anime.js, WAAPI, or your own runtime. This is exactly a "standalone HTML per slide" world.
- Capture: two modes. BeginFrame mode (Linux + chrome-headless-shell) drives the compositor atomically via HeadlessExperimental.beginFrame for byte-for-byte reproducible frames. Screenshot mode (macOS/Windows, and automatic fallback) runs Chrome in real time and takes ordinary screenshots ("slightly slower but visually identical"). Since v0.4.2 (commit 4c72ba4, March 2026) it auto-detects: if it does not find chrome-headless-shell in the binary path (e.g. Chromium 147+ removed beginFrame), it falls back to screenshot mode automatically. Escape hatch: export PRODUCER_FORCE_SCREENSHOT=true. Setup runs: npx puppeteer browsers install chrome-headless-shell.
- Node engine API (@hyperframes/engine): createCaptureSession(serverUrl, outputDir, {fps:{num:30,den:1}, width, height}) then initializeSession, getCompositionDuration, captureFrame(session, i) in a loop (or captureFrameToBuffer for in-memory), closeCaptureSession. Also spawnStreamingEncoder to pipe frames straight to ffmpeg without writing every PNG to disk. GPU detection: detectGpuEncoder returns "nvenc" | "videotoolbox" | "vaapi" | "qsv" | "amf" | null. Parallel capture: calculateOptimalWorkers, distributeFrames, executeParallelCapture.
- FFmpeg presets baked in: getEncoderPreset('standard','mp4') returns { codec:"h264", pixelFormat:"yuv420p", preset:"medium", quality:23 }. WebM preset returns vp9 + yuva420p. Helpers: encodeFramesFromDir(dir, 'frame_%06d.png', out, {fps}), muxVideoWithAudio (AAC for mp4, Opus for webm), applyFaststart (mp4 streaming). Quality presets draft/standard/high; fps presets 24/30/60.
- Requirements: Node 22+, external FFmpeg + ffprobe, 4GB RAM min (8GB for 60fps), ~2GB scratch in /tmp. CLI: npx hyperframes init / preview (port 4200 live reload) / render. Ships 20 agent "skills" installable via npx skills add heygen-com/hyperframes.
- Performance: 10-second 1080p render in 35-50s on an M2 Pro; 30-second 1080p ~3 min locally. For a 3-6s 1080x1350 slide at 30fps that is ~90-180 frames, so a single slide renders in seconds to low tens of seconds on a normal Linux box.
- Determinism thesis (README): "same input, same frames, same output," positioned for CI/regression testing. Blank/black frames usually mean wrong timeline keys or a wrapped root composition.

HELIOS (the closest philosophical twin, but license-restricted)
- By BintzGavin. Repo github.com/BintzGavin/helios, site heliosrender.com. ~88 stars, beta. License ELASTIC LICENSE 2.0 (ELv2): commercial products allowed, but offering it AS a SaaS/managed service is prohibited without a separate license. For Carter (internal content tool, not reselling the renderer) ELv2 is fine, but it is a more restrictive license than HyperFrames' Apache 2.0.
- Thesis: "drives the browser's native animation engine instead of replacing it" (contrast with Remotion which reimplements animation in JS). Production uses Emulation.setVirtualTimePolicy via Playwright to virtualize time and advance frame by frame; preview uses WAAPI Animation.currentTime seeking. Supports plain HTML+CSS (@keyframes work natively), React/Vue/Svelte via adapters, and canvas/WebGL via WebCodecs. FFmpeg via direct child_process.spawn, no wrapper. CLI: npx helios render ./composition.html -o output.mp4. TypeScript.
- Note this one uses Emulation.setVirtualTimePolicy (mechanism 3b, not beginFrame), so it is less exposed to the Chromium 147 beginFrame removal, but setVirtualTimePolicy is still a CDP surface that can shift.

TIMECUT / TIMESNAP (the original, now stale, BACKGROUND-leaning)
- By tungs. github.com/tungs/timecut. Latest release v0.3.3 dated April 3 2022 (over four years stale as of the mission date; minimal active maintenance). Node 8.9+.
- Mechanism: timesnap uses puppeteer page.evaluateOnNewDocument to overwrite Date/Date.now/performance.now/requestAnimationFrame/setTimeout/setInterval, then timecut pipes frames to ffmpeg. This is the canonical mechanism-2 (JS time override).
- CLI: timecut index.html --viewport="800,600" --fps=60 --duration=5 --output=video.mp4. Default fps 60, default duration 5s, default --pix-fmt yuv420p. Has an experimental --canvas-capture-mode (faster, copies canvas data directly, but no crop/rounding) and experimental --pipe-mode (stream to ffmpeg, "observed stability issues").
- Documented limitation that matters here: "Pages where changes occur via other means (e.g. through transitions/animations from CSS rules) will likely not render as intended." So timecut's JS-clock override does NOT reliably virtualize pure-CSS @keyframes. For a CSS-driven slide it may skip or mis-time frames. This is the reason the newer engines add WAAPI seeking on top. Verdict: study it for the mechanism, do not adopt it; it is stale and CSS-weak.

### 4. Remotion (React) and why it is the wrong tool here

- Remotion (remotion.dev) is a React framework: you define scenes as React components and animate them with useCurrentFrame(). Since v4.0 it bundles its own lightweight FFmpeg (no external install needed). renderMedia() / renderFrames() do a Webpack bundle then frame render then mux to mp4. It runs on Linux and Docker.
- Linux GPU internals (BACKGROUND, but shows the maturity): default renderer backend is "swangle" (SwiftShader on ANGLE) since v3.0.8 / Chrome 101; use chrome-for-testing (not headless-shell) to get real GPU drivers on Linux. OffthreadVideo frame extraction defaults to 2 threads.
- WHY NOT for Carter: (a) it forces a React authoring model. Carter's slides are hand-authored standalone HTML files with base64 fonts and inline assets, tuned to render pixel-identical in shotpls. Rewriting each slide as a React composition throws away the entire existing HTML-per-slide workflow and the design-per-slide control he wants. (b) It "reimplements animation in JS" rather than driving the browser's native CSS engine, so the CSS he already writes would not carry over directly. (c) The independent 2026 comparisons (HyperFrames vs Remotion writeups, Pexo "Remotion alternatives," fluxnote "Remotion alternative zero React") converge on: Remotion is for teams building video FEATURES into React apps; for "text overlays, animated diagrams, simple motion graphics" produced by an agent from plain HTML, a plain-HTML renderer is the better fit. One comparison notes both bottleneck on the same place anyway (headless Chromium screenshot capture), so Remotion buys no speed here, only React overhead. Verdict: reject Remotion. It solves a problem Carter does not have and discards the substrate he does have.

### 5. FFmpeg assembly for an Instagram-ready loop mp4

Instagram carousel video spec, 2026 (sources: heyorca.com IG media specs 2026, socialpilot.co IG video sizes, growthscribe.com IG video format 2026):
- Container mp4, video codec H.264, audio AAC (even if silent, AAC keeps compatibility).
- Dimensions 1080x1350, aspect ratio 4:5 portrait (matches the slide exactly, zero crop). All carousel cards must share the same aspect ratio; first card sets the crop for the rest, so keep every slide 1080x1350.
- Per-card video length under 60s. KEY behavior: Instagram carousel video cards do NOT auto-loop. "A video plays when its card appears, then stops at the end. Users have to swipe back for a replay." Implication: the loop has to be baked into the file (a self-contained 3-6s clip whose last frame flows back into its first) so a single playthrough already reads as a complete loop; do not rely on IG to repeat it.

Frames to mp4 (the assembly step after seek-and-capture), sources: hamelot.io ffmpeg images to video, brendandawes.com, ffmpeg-micro.com:
    ffmpeg -framerate 30 -i frame_%06d.png \
      -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
      -movflags +faststart -r 30 out.mp4
Notes: -pix_fmt yuv420p is mandatory ("compatible with every browser and player"; without it IG/Safari can refuse or color-shift). -movflags +faststart moves the moov atom to the front for streaming (HyperFrames exposes this as applyFaststart). crf 18-20 is visually lossless for flat graphic content; HyperFrames' own "standard" preset uses crf 23 which is fine for social. Match -framerate to the fps you seeked at (30 is the safe default; 60 only if motion demands it). For a hard 3-6s duration use exactly duration*fps frames (e.g. 4s at 30fps = 120 frames, named frame_000000.png..frame_000119.png).

Making the loop seamless (sources: ffmpeglab.com ffmpeg loop, bannerbear boomerang, cheatref boomerang):
- BEST: design the CSS animation so t=0 and t=duration are visually identical (a full 360 rotation, a sine-based float that returns home, opacity that returns to start). Then a plain forward playthrough already loops seamlessly and you need no ffmpeg trickery. This is the cleanest and what an in-house tool should enforce.
- BOOMERANG fallback if an animation cannot naturally return: reverse and append. Single command: -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[outv]". Optionally setpts=1/2*PTS to keep original length. Produces back-and-forth motion with no seam. Use only when a true loop is not authorable.
- Repeat N times without re-encoding: concat demuxer on a text file listing the clip N times, ffmpeg -f concat -i loop.txt -c copy out_loop.mp4. Cheap, but since IG does not auto-loop carousel cards this mainly helps if you want a longer single card.

### 6. Reproducibility hazards to design around

- Fonts: must be fully loaded before the first capture or frame 0 renders in a fallback font. await document.fonts.ready in the page before seeking. Carter already base64-embeds fonts, which eliminates network flakiness (a real win: the Replit engine had to build a five-layer workaround for network <video>; inline-everything sidesteps that entire class of problem).
- rAF-driven motion is invisible to pure WAAPI seeking (mechanism 1). If any slide animates via requestAnimationFrame or setInterval, either convert it to a CSS/WAAPI animation (preferred, seekable) or add JS-time-override (mechanism 2). Prefer authoring all motion as CSS @keyframes / WAAPI so mechanism 1 alone suffices and the whole thing stays flag-free and portable.
- Do NOT build against system Chromium for beginFrame: 147+ removed it. Pin chrome-headless-shell (as HyperFrames does) or avoid beginFrame entirely and use WAAPI seek + screenshot.
- Determinism check: render the same slide twice, hash the PNGs, assert identical. HyperFrames markets exactly this ("same input, same frames, same output") for CI. Cheap regression guard.

---

## SO WHAT FOR US

1. Animated slides are a SMALL extension of shotpls, not a new system. shotpls already does render-one-HTML-to-one-PNG deterministically. An animated slide is: render one HTML to N PNGs, seeking the animation between shots, then ffmpeg the PNGs to mp4. The correct architecture is seek-and-capture, never screen recording. Reject Page.screencast / puppeteer-screen-recorder outright; they are choppy and non-deterministic.

2. Recommended single best approach: a tiny in-house seek-and-capture loop (the same ~60 lines HyperFrames and Helios wrap), OR adopt HyperFrames' engine (@hyperframes/engine) if we want the batteries included. Concretely the in-house loop is: launch pinned chrome-headless-shell, load the 1080x1350 HTML, await document.fonts.ready, then for i in 0..N-1: page.evaluate seek all animations to i*(1000/fps) via document.getAnimations().forEach(a => { a.currentTime = t; a.pause(); }), screenshot to frame_%06d.png, repeat; then ffmpeg -framerate 30 -i frame_%06d.png -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart out.mp4. This reuses our HTML-per-slide substrate verbatim, needs no React, and is fully deterministic.

3. Enforce CSS/WAAPI-only motion in the animated-slide authoring contract. If every animation is a CSS @keyframes or WAAPI animation, mechanism-1 WAAPI seeking alone covers it, which means NO special Chrome flags, NO CDP frame-control surface, NO exposure to the Chromium 147 beginFrame removal, and maximum portability. This is the single most important design rule: forbid raw requestAnimationFrame / setInterval motion in slides. Bake this into the make-carousel skill's animated-slide spec.

4. If we want turnkey instead of DIY, use HyperFrames (Apache 2.0, Node 22+, ~34k stars, v0.7.51 as of July 11 2026, ships h264/yuv420p/crf presets, faststart, GPU detection, parallel capture, and a screenshot fallback for beginFrame-less Chrome). It is the best-maintained plain-HTML engine and its license is permissive. Helios is philosophically identical but ELv2-licensed and only ~88 stars; fine for internal use, weaker bet. Reject Remotion (React substrate, wrong for hand-authored HTML slides) and timecut (stale since 2022, weak on pure-CSS animations).

5. Loop seamlessly by AUTHORING for it: make t=0 and t=duration identical (return-home float, full rotation, opacity round-trip) so one forward playthrough loops with no seam. Fall back to the ffmpeg boomerang ([0:v]reverse[r];[0:v][r]concat=n=2:v=1) only when an animation cannot return home. Remember IG carousel video cards do NOT auto-loop, so the file itself must read as complete in a single 3-6s play.

6. Export contract for IG: mp4, H.264, yuv420p, 1080x1350 (4:5, zero crop, matches the slide), AAC audio track even if silent, +faststart, 30fps default, keep every card identical dimensions. 3-6s clip = 90-180 frames at 30fps, renders in seconds per slide on a normal Linux box.

7. Determinism is a free QA win. Base64-inline everything (fonts, images) as we already do, await document.fonts.ready before frame 0, and hash-compare a double render to guarantee reproducibility. This makes animated slides as regression-safe as our static PNGs.
