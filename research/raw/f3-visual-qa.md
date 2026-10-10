<!-- © AngelaMos | 2026 | f3-visual-qa.md -->

# Division F3: Automated Visual QA for Generated Carousel Graphics

Mission: headless checks for text overflow and clipped content, WCAG contrast on rendered pixels, safe-margin lint for Instagram UI overlays, pixel-diff regression (pixelmatch, odiff, and newer), and LLM-vision self-review loops where the model critiques its own rendered PNG against a rubric before Carter ever sees it. Concrete Linux tooling plus published 2026 examples of vision-model art direction.

Context for actionability: Carter renders one standalone 1080x1350 CSS-px HTML per slide to a 2160x2700 PNG via shotpls (headless Chrome CLI). Python via uv, Node via pnpm. He self-hosts Ollama. Everything inline, no external URLs at render time. All QA below is meant to run as a pre-flight gate BETWEEN "HTML written" and "PNG shipped."

Date of research: 2026-07-10. Recency prioritized (Apr-Jul 2026).

---

## SEARCHES RUN

1. pixelmatch odiff visual regression testing screenshot diff 2026
2. LLM vision model self-critique rendered image rubric self-improvement loop 2026
3. detect text overflow clipped content headless chrome puppeteer scrollWidth clientWidth check
4. WCAG contrast ratio computed from rendered pixels sampling image contrast checker tool
5. Instagram carousel safe zone dimensions 2026 UI overlay caption profile buttons cover pixels
6. GPT-4o vision Claude critique own generated design PNG screenshot feedback loop art direction 2026
7. Playwright toHaveScreenshot maxDiffPixelRatio threshold config visual comparison 2026
8. critic-in-the-loop vision language model frontend code generation visual critic layout spacing rubric arxiv 2026
9. detect clipped text truncation ellipsis rendered image OCR compare source text automated QA
10. MLLM as judge image aesthetics scoring rubric design quality benchmark 2026 VLM art direction
11. Pillow Python compute WCAG contrast ratio image region luminance numpy sample pixels code
12. APCA contrast algorithm WCAG 3 2026 vs 4.5:1 ratio large text perceptual lightness
13. Ollama vision model llama3.2-vision qwen2.5-vl local image critique self-hosted 2026
14. nano banana Gemini image generation critique loop art direction agentic 2026 self-review render
15. Claude Code agent screenshot feedback loop render HTML iterate design self-correct workflow 2026 blog
16. SSIM perceptual image diff structural similarity ignore antialiasing font rendering visual test

Pages fetched in full: github.com/dmtrKovalenko/odiff; namangoyal.com/projects/codex-vision; blazediff.dev; arxiv.org/html/2604.05839 (Vision-Guided Iterative Refinement); arxiv.org/pdf/2604.25235 (VLM judges rank but cannot score); vizzly.dev honeydiff benchmark; medium round-trip screenshot testing.

---

## FINDINGS

### 1. Text overflow / clipped-content detection is a DOM check, not an image check (do it at render time)

The reliable, zero-ML way to catch clipped text is inside the headless-Chrome page context before you capture the PNG, not by inspecting pixels afterward. Source: MDN Element.scrollWidth, plus the truncation-detection method in USPTO patent 10,185,705 ("Detecting text truncation in a graphical user interface"), which compares text dimensions to the containing element's dimensions.

Core primitives (run via `page.evaluate` in Puppeteer/Playwright, or a `--evaluate` step in whatever drives shotpls):

- Horizontal overflow of an element: `el.scrollWidth > el.clientWidth`
- Vertical overflow (text taller than its box, the common carousel failure): `el.scrollHeight > el.clientHeight`
- Ellipsis actually engaged (`text-overflow: ellipsis` clipped): `el.offsetWidth < el.scrollWidth`

Known caveat, verified across two sources (MDN, csswg-drafts issue #4123): sub-pixel rounding can make scrollWidth and clientWidth report equal despite a 1-2px real clip. w3c/csswg-drafts issue #4123 is an open request that "it should be detectable whether an element ellipsized the text," meaning there is still no first-class CSS API for it. Mitigation: add a 1px tolerance and also range-check against a max line count. For our fixed 1080x1350 canvas this is easy because every text zone has a known box.

Practical carousel lint (the checks that map to Carter's actual failures):
- Any element where scrollHeight exceeds clientHeight by >1px => headline/paragraph wrapped past its box => FAIL.
- Any element whose bounding rect bottom exceeds the safe content area (see section 3) => FAIL.
- Any element with `getComputedStyle().overflow !== visible` AND scroll overflow => hidden/clipped content => FAIL.
- Font not actually loaded (base64 embed failed): `document.fonts.check('1em <family>')` false or `document.fonts.status !== 'loaded'` => the slide rendered in a fallback font => FAIL. This is a silent killer specific to Carter's inline-base64 pipeline.

This entire pass runs in a headless page in well under a second and needs no vision model. It should be the FIRST gate.

### 2. WCAG / APCA contrast from rendered pixels

Two ways, both worth building:

A) Declared-color check (cheap, in-page): sample `getComputedStyle` foreground vs the effective background at each text node and compute the ratio. This misses gradients, blend modes, and background images. Sources note this is exactly why pixel sampling exists: real rendering diverges from stylesheets (accessible.org, WebAIM).

B) Rendered-pixel check (the one that matters for Carter, because his decks use gradient/photo backgrounds and blend modes). Load the final 2160x2700 PNG, crop each text region, and compute contrast on actual pixels. The WCAG 2.x math, confirmed against the W3C WAI relative-luminance definition:

- Normalize each 8-bit channel: c = channel/255.
- Linearize (gamma): if c <= 0.03928 then c/12.92 else ((c+0.055)/1.055)^2.4.
- Relative luminance L = 0.2126*R + 0.7152*G + 0.0722*B.
- Contrast ratio = (L1 + 0.05) / (L2 + 0.05), L1 = lighter.
- Thresholds: 4.5:1 normal text, 3:1 for large/bold. (WCAG 2.1, still the legal standard in 2026 per multiple sources.)

Implementation on Linux: Pillow + numpy. Crop the text box, but do NOT average the whole box (a bright glyph on a dark bg averages to mid-gray and lies). Instead: separate text pixels from background pixels (e.g. threshold on luminance histogram, or since Carter controls the HTML, render a second "text-only" pass on a flat mid-key background and use it as a mask). Then compute worst-case contrast = darkest text pixel vs its local background patch. No search surfaced a ready-made Pillow+numpy+WCAG-region snippet, so this is a small script we write ourselves from the formula above (roughly 40 lines).

C) APCA (WCAG 3.0 direction, better for our poster aesthetic). Verified 2026 status: WCAG 3.0 replaces the static 4.5:1 ratio with APCA (Accessible Perceptual Contrast Algorithm). APCA is polarity-aware (white-on-black computed differently from black-on-white) and size/weight-aware, reported as Lc (Lightness Contrast) on a sliding scale:
- Lc ~60 for large/bold text (headings) — this is Carter's giant poster type.
- Lc ~75 for standard body.
- Lc ~90 for small/thin text.
Sources: git.apcacontrast.com (APCA in a Nutshell, easy intro), inkbotdesign WCAG 3.0 typography 2026 guide, humbldesign 2026 engineering guide. Recommendation from every source: keep WCAG 2.1 for formal compliance, but design with APCA because it reflects real screen readability. For a poster deck with huge type, APCA Lc is the more honest metric than 4.5:1. There is a reference JS implementation (`apca-w3` / the git.apcacontrast.com code) we can port or shell out to.

Reality check on why this matters: Carter's whole redesign direction is one focal point, massive type, near-zero body. Massive type on a busy photo/gradient bg is exactly where contrast quietly dies at the corners even when the center looks fine. Per-region pixel contrast catches this; a single declared color pair does not.

### 3. Instagram safe-margin lint (the UI-overlay problem)

This is a hard-coordinate lint, fully automatable. Verified 2026 numbers from multiple size guides (creatorflow.so, campaignswift.com, zeely.ai, trymypost.com, carouselpost.io):

- Canvas: 4:5 portrait, 1080x1350 px is still the dominant 2026 carousel format. New in 2026: a 3:4 option at 1080x1440, sitting between 4:5 and 9:16. (instagram.com/p/DTshte0CK2z official 2026 sizes post referenced.)
- Bottom UI overlay: the bottom ~10-12% overlaps username, caption preview, like/comment icons, and the page-indicator dots. On 1350px height, 12% is ~162px. One source gives a concrete "like heart and save ribbon overlay the bottom 150px."
- Top overlay: the handle and caption truncate the top ~120px on smaller devices.
- Profile-grid crop: Instagram shows carousel covers on the grid at 3:4. A 4:5 cover gets cropped ~6% off the top and bottom on the grid. So cover-slide critical content must live inside the central ~1080x1188 band, and text/faces should stay inside the central 1080x1080 square to survive the grid.

Concrete lint rules for Carter's deck (all in render-scale px on the 1080x1350 base, multiply by 2 for the 2160x2700 export):
- SAFE ZONE = inset 120px top, 162px bottom, and a sane side margin (48-64px). Nothing load-bearing (headline, key stat, CTA, logo) may have a bounding rect outside this box. The overflow/DOM pass already gives us every element's rect, so this is a coordinate comparison, one more assertion in the same headless pass.
- COVER SLIDE (slide 1) gets the STRICTER grid rule: critical content inside central 1080x1080, and never in the top/bottom 6% (81px) bands.
- PAGER-DOT COLLISION: the page dots sit bottom-center; a bottom-anchored button or caption in that zone gets hidden. Flag any element in the bottom-center dot region.

We can render a visual "safe-zone overlay" debug PNG (draw the forbidden bands as semi-transparent red) so Carter eyeballs it in one glance during authoring. This is trivial with Pillow.

### 4. Pixel-diff regression (locking a slide so future edits do not silently break it)

Tool landscape as of mid-2026, verified:

- pixelmatch (mapbox): the smallest/simplest JS pixel diff, powers Playwright visual comparison and jest-image-snapshot. Reliable but slow: ~7.7s on a full webpage screenshot in the odiff benchmark; struggles past a few million pixels. Our exports are 2160x2700 = 5.8M px, so pixelmatch is usable but not fast.
- odiff (dmtrKovalenko): originally OCaml, rewritten in Zig with SIMD. Latest release v4.3.8 dated 2026-04-17 (33 releases). CLI: `odiff <img1> <img2> [diff.png]`. Supports png/jpeg/webp/tiff. Key flags: `--threshold` (0-1 color-diff threshold), antialiasing option (antialiased pixels not counted), fail-on-layout (different dims fail by default), ignore-regions (array of rects to exclude). Node API returns `diffCount`, `diffPercentage`, and optional `diffLines`. ~6.67x faster than pixelmatch/ImageMagick (1.168s vs 7.7s on a page screenshot; 1.95s on 8K). Argos platform became 8x faster switching to odiff. This is the pragmatic open-source default for us on Linux.
- BlazeDiff (blazediff.dev, MIT): three cores — pure-JS (block-optimized), WASM (SIMD v128), and a native Rust binary. CLI: `npx @blazediff/cli a.png b.png --interpret`. Benchmarks on M1 Max, 4K image: pixelmatch 302ms, blazediff JS 212ms, blazediff WASM 51.75ms, blazediff native 294ms, odiff native 1.19s. Used by Vitest, Shopify, Ant Design, Vega, ApexCharts. THE STANDOUT for us: "agent-in-the-loop." When pixel heuristics cannot resolve an ambiguous diff, BlazeDiff delegates to a coding agent (Claude Code, Cursor, or Codex, NO API key required) that examines small region tiles and resumes from checkpoints, then decides accept/reject. That is exactly the "is this a real regression or just an intended redesign?" decision Carter faces. (Note: BlazeDiff's own README benchmark shows odiff native at 1.19s vs BlazeDiff native 294ms; the Vizzly benchmark below uses odiff 4.1.1 and different images, so treat cross-benchmark absolute numbers loosely, the ordering is the takeaway.)
- Honeydiff (Vizzly, by Robert DeLuca ex-Percy): proprietary, but installable on Linux via `npm install @vizzly-testing/honeydiff` with prebuilt Linux/macOS/Windows binaries. Benchmarked 2025-11-29 (honeydiff 0.3.0 Rust+Rayon vs pixelmatch 6.0.0 vs odiff 4.1.1): 2.1M px = 15ms vs 80ms vs 240ms; 18M px = 80ms vs 450ms vs 710ms; up to 227M px/sec, 9-16x faster than odiff. Beyond pixel counting it adds spatial clustering, SSIM perceptual scoring, and intensity stats. Closed source is a downside for Carter's "build from scratch" ethos, but the SSIM + clustering ideas are worth stealing.

Playwright's built-in `toHaveScreenshot` (uses pixelmatch under the hood) is the config vocabulary to copy even if we do not use Playwright itself:
- `maxDiffPixelRatio` (0-1): acceptable fraction of differing pixels.
- `maxDiffPixels`: absolute count.
- `threshold` (default 0.2): acceptable perceived color difference in YIQ space, 0 strict to 1 lax.
- Recommended in 2026 guides: `maxDiffPixelRatio: 0.01` (1%) catches real regressions without tripping on anti-aliasing. Set globally in config or per-assertion.

CRITICAL nuance for Carter's use case, verified via the SSIM search: raw pixel diff is the WRONG default metric for a design deck that INTENTIONALLY changes every slide. Pixel diff answers "did these bytes change" (yes, always). SSIM (structural similarity: luminance + contrast + structure, correlates with human perception) is closer to "does this look meaningfully different," but SSIM is sensitive to small spatial shifts, so font-rendering and anti-alias jitter tank the score. Conclusion: pixel-diff regression is for LOCKING an approved slide (does re-rendering the same HTML on a new machine still produce the identical PNG, i.e. did a font embed or Chrome version drift), NOT for judging design quality. For quality you need the vision loop (section 5).

### 5. LLM-vision self-review loops (the model critiques its own PNG before Carter sees it)

This is the highest-leverage finding and there is real 2026 literature plus shipped tooling.

THE ANCHOR PAPER: "Vision-Guided Iterative Refinement for Frontend Code Generation," arXiv:2604.05839 (2026-04-07). A fully automated critic-in-the-loop where a VLM is the visual critic on the RENDERED page (not the code). Directly transposable to Carter's HTML-slide pipeline. Concrete structure we can copy verbatim:

Scoring dimensions, each 1-10:
1. Visual Task Accomplishment (does the render match the brief).
2. Aesthetic Quality (layout, typography, color, modern design).
3. Code Task Accomplishment.
4. Code Quality.

The visual critic gets: the original request + a screenshot of the render. Its instruction: "Analyze the screenshot and provide feedback on layout, styling, visual hierarchy, spacing, and overall aesthetic coherence, while abstracting away from code-level details." Evaluation areas: visual layout and element positioning; color scheme, contrast, and visual appeal; typography, text readability, content presentation; spacing, margins, visual balance; missing visual elements that should be present.

Loop (Algorithm 1): Generator -> Renderer -> Visual Critic (rendering issues) -> Code Critic (translate visual defects into code-level fixes) -> Improver (revise) -> Evaluator (score) -> retain highest-scoring solution. Fixed budget T = 3 cycles in their experiments, keep-best across iterations (no adaptive early stop). Result: up to 17.8% quality improvement over three cycles on WebDev Arena requests. A two-stage split matters: visual critique first (what looks wrong), THEN code critique (what CSS to change). LoRA-internalizing the critic captured 25% of the gain with no token increase, meaning the critique behavior is learnable/distillable later.

CRITICAL CALIBRATION FINDING (this changes how we build the loop): "VLM Judges Can Rank but Cannot Score," arXiv:2604.25235. VLMs are reliable at PAIRWISE ranking (which of two is better) but unreliable at ABSOLUTE 1-10 scoring: higher calibration error, inconsistent internal calibration across quality levels. Practical implication for us: do NOT gate on "the model gave slide 4 a 7/10." Instead run the loop as GENERATE-TWO-VARIANTS-AND-PICK, or "is variant B better than the current best, yes/no." Pairwise beats absolute. (This tension is real: the 2604.05839 refinement paper DOES use 1-10 absolute scores; 2604.25235 says that is the weak spot. Reconcile by using absolute scores only as a rough triage and pairwise comparison for the actual accept/reject decision.)

Supporting benchmark evidence that VLMs are still MEDIOCRE aesthetic judges (so use them for gross defects, not fine taste):
- "Visual Aesthetic Benchmark: Can Frontier Models Judge Beauty?" arXiv:2605.12684: 400 tasks, 1,195 images, 10 expert judges per task. Best of 20 frontier MLLMs identified both best and worst image in only 26.5% of tasks vs 68.9% for humans. Takeaway: a VLM will reliably catch "text is clipped / two things overlap / contrast is dead / the headline is off-center," but do NOT trust it to arbitrate "is this beautiful."
- Qwen-Image-Bench (arXiv:2605.28091): rubric-driven judge scoring across 56 third-level facets. VisJudge-Bench (arXiv:2510.22373): 3,090 expert-annotated samples for visualization aesthetics/quality across 32 chart types. These give us facet vocabularies to borrow for our rubric.
- "VLM Judges Can Rank but Cannot Score" reinforced by the same theme across the aesthetics benchmarks.

SHIPPED TOOLING (real, runs on Linux today):

- codex-vision (namangoyal.com, v0.3.2, updated 2026-06-05): a Claude Code skill that is a single bash wrapper over OpenAI Codex vision. Three modes: `review` (`codex exec -i <png>` returns structured feedback on a screenshot), `generate` (image_gen from text), `edit`. Routes images through Codex `functions.view_image`; the `-i` flag attaches the PNG. This is a working template for "one shell command, feed my rendered PNG to a vision model, get a critique back." Its 50-case trigger eval (15 trigger / 20 skip / 15 clarify, 50/50 hard pass x3 trials) is also a template for how to test that OUR skill fires only when it should.

- Round-trip screenshot testing (Tal Rotbart, Medium, 2026-02-22): the cleanest real example of the exact loop. A `/screenshot-test` Claude Code custom command runs the app with screenshot capture on, reads EVERY captured PNG, and describes layout/content/visual state, flagging broken or misaligned elements, missing content, and awkward rendering "despite correct navigation." Pattern generalizes to Playwright `page.screenshot()`. Key operational note in his CLAUDE.md: run it "after front-end changes, not on every commit." For us: run the vision review after HTML edits, not on every keystroke.

- BlazeDiff agent-in-the-loop (section 4): the accept/reject-a-diff-via-agent pattern, no API key.

- Claude Design (Anthropic, launched 2026-04-17, runs on Claude Opus 4.7): browser canvas + chat where reviewers talk to the system directly and feedback now includes voice notes, drawn annotations, DOM selections, and screenshots (mindstudio, uxtigers/Jakob Nielsen roundup 2026-04-27). Not our terminal pipeline, but confirms the industry direction: multimodal critique is the feedback primitive now. Carter should NOT use Claude Design (web product, not terminal), but should replicate its loop shape in the terminal.

- Loop Engineering (kunalganglani.com, ~2026-06): frames Claude Code as gather-context -> take-action -> verify-results, with persistent skills/hooks that iterate until a gate passes. This is the scaffolding pattern for making our QA a self-correcting loop rather than a one-shot lint.

Self-hosted option (matches Carter's Ollama stack): local VLMs can run the critique with zero API cost. Verified 2026 (promptquorum, insiderllm, ollama.com): llama3.2-vision 11B is the top local general VLM for 8-16GB VRAM; Qwen2.5-VL 7B is notably better at structured content, charts, icons, layouts (exactly our domain: text-on-graphic layout judgment); moondream for <4GB. `ollama pull llama3.2-vision` then `ollama run llama3.2-vision "..." --image slide.png`. Caveat: Qwen 3.6 GGUFs still did not load in Ollama as of May 2026, so pin to qwen2.5-vl for now. Local VLM is good enough for the GROSS-DEFECT pass (clipping, overlap, dead contrast, off-center focal point); reserve a frontier model (Claude/GPT vision) only for the final taste call, and even then only pairwise.

### 6. OCR cross-check as a backstop for text integrity

The overflow DOM check (section 1) is primary. As a belt-and-suspenders pass on the final PNG, OCR the rendered image and diff the recognized string against the known source text. Sources: USPTO 10,185,705 (dimension-based truncation detection), Qt Quick truncation testing (compare required text width vs displayed width), and general OCR-vs-ground-truth word/char accuracy metrics (with "Full" and "Truncated" variants). For us this catches the case where text is present in the DOM, passes the box check, but is visually swallowed by a background element or a z-index bug, something the DOM cannot see but OCR can. Tesseract on Linux is the free path; a local VLM (Qwen2.5-VL, strong at OCR/layout) is the higher-accuracy path we already have via Ollama.

---

## SO WHAT FOR US

Build a layered pre-flight QA gate that runs between "slide HTML written" and "PNG approved." Cheapest, most deterministic checks first; expensive vision last. This is a new tool (call it `slide-qa`, Python via uv + a headless-Chrome step) that plugs into the existing make-carousel / shotpls flow.

Gate 0 (in-page DOM, milliseconds, no ML, catches most real bugs):
- Font actually loaded (`document.fonts.status === 'loaded'`), else the base64 embed silently fell back. This alone will save Carter from shipping a wrong-font slide.
- Overflow: `scrollHeight > clientHeight + 1` and `offsetWidth < scrollWidth` on every text zone => clipped => FAIL.
- Safe-margin: every load-bearing element's bounding rect must sit inside the inset box (top 120px, bottom 162px, sides ~56px on the 1080-wide base; cover slide gets the stricter central-1080x1080 + no top/bottom 6% rule). Emit a red-band debug PNG for eyeballing.

Gate 1 (pixel, Pillow+numpy, sub-second):
- Per-text-region contrast on the FINAL 2160x2700 pixels: worst-case darkest-text-vs-local-bg. Report both WCAG 2.1 ratio (4.5:1 / 3:1) AND APCA Lc (target Lc 60 for the giant poster headlines, 75 for any body). Do NOT average the whole box; mask text vs background. Write this ~40-line script ourselves from the W3C formula (no ready-made snippet exists).

Gate 2 (regression lock, odiff on Linux):
- For an APPROVED slide, store the golden PNG. On any re-render (new machine, new Chrome, font tweak elsewhere), `odiff golden.png new.png diff.png --threshold 0.1` with `maxDiffPixelRatio ~0.01`. This is purely to catch environment drift (font embed broke, Chrome AA changed), NOT to judge new designs. Steal Playwright's `maxDiffPixelRatio: 0.01` default. Keep BlazeDiff's agent-in-the-loop in our back pocket for the "is this diff a real regression or an intended edit" call.

Gate 3 (vision self-review, the differentiator):
- Feed the rendered PNG to a VLM with a fixed rubric transposed from arXiv:2604.05839: score layout/positioning, contrast/appeal, typography/readability, spacing/balance, missing-elements, each 1-10, PLUS a hard yes/no defect checklist (text clipped? elements overlap? focal point off-center? contrast dead? face/logo in an unsafe zone?).
- Respect the "rank not score" finding (arXiv:2604.25235): use the 1-10 as triage only. For accept/reject, generate 2 variants (or compare against the current best) and ask the VLM PAIRWISE which is better. Do not gate on an absolute number.
- Respect the aesthetics-benchmark ceiling (26.5% vs 68.9%, arXiv:2605.12684): trust the VLM for GROSS DEFECTS (clipping, overlap, contrast, safe-zone, off-center), do NOT trust it for fine taste. Taste stays Carter's call.
- Loop budget: 3 refinement cycles, keep-best (matches the paper, ~17.8% gain). Two-stage: visual critique first, then translate to concrete CSS edits.
- Cost model: run Gate 3 on a SELF-HOSTED VLM first (qwen2.5-vl or llama3.2-vision via Carter's Ollama) for the gross-defect + OCR pass at zero marginal cost; escalate to a frontier vision model only for the final pairwise taste comparison. Pin qwen2.5-vl (Qwen 3.6 GGUFs did not load in Ollama as of May 2026).

Implementation shape that matches Carter's tools:
- Package it as a Claude Code skill/command modeled on codex-vision (one bash entrypoint over the vision model) and the `/screenshot-test` round-trip pattern (run after HTML edits, not every keystroke).
- Wrap the whole thing in the Loop Engineering pattern (gather -> act -> verify, iterate until gates pass) so QA is self-correcting, not a one-shot report.
- Everything here runs on Linux, offline-capable except the optional frontier-model taste call. Fits uv (Pillow, numpy, tesseract, the WCAG/APCA math) + pnpm (odiff, blazediff) + the existing headless-Chrome/shotpls step.

The self-improving angle: log every VLM critique + Carter's accept/reject decision. Over time this is a labeled dataset. arXiv:2604.05839 showed a LoRA can internalize 25% of the critic's gain with no extra tokens, so eventually the rubric can be distilled into a cheaper, faster local judge tuned to Carter's exact taste. That is the "best carousels on Instagram" flywheel: the QA loop gets more Carter-shaped every deck.

One honest caveat to state up front: pixel-diff and SSIM cannot judge whether a NEW design is good, only whether a re-render DRIFTED. Aesthetic quality gating lives entirely in Gate 3, and current VLMs are demonstrably weak aesthetic judges (26.5%). So the realistic promise is: automate the catch of every OBJECTIVE defect (clipping, overflow, dead contrast, unsafe zones, font-embed failure, env drift) so Carter never ships a broken slide, and use the VLM as a fast second pair of eyes for gross composition, while final taste stays human. That is still a massive upgrade over shipping unchecked.
