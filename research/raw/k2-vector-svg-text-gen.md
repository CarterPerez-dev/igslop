<!-- © AngelaMos | 2026 | k2-vector-svg-text-gen.md -->

# Division K2: Vector Assets and Text-Bearing Graphics With AI That Do Not Read As Slop

Research date: 2026-07-10. Scope: generating VECTOR assets and text-bearing graphics with AI in mid-2026. Recraft SVG (V3/V4/V4.1) quality and API, Ideogram (V3/4.0) for typography-heavy images, tools that output editable SVG rather than raster, and the core strategic question for Carter's pipeline: when is having Claude write SVG by hand in the terminal better than diffusion output for flat design assets. Every claim below is tied to a named source. Nothing here needs an external URL at shotpls render time. All these tools are FETCH-AHEAD asset generators, run before the HTML is assembled and base64-inlined.

Bottom line up front: for Carter's specific pipeline (Claude Code terminal, one 1080x1350 HTML per slide, fonts base64-embedded, poster-not-newspaper goal), the winning play is a split. Claude hand-writes SVG for the STRUCTURAL and DATA-DRIVEN flat layer (geometric shapes, dividers, badges, charts, parametric icon families, backgrounds) because that is code generation and Claude is strong at it. Recraft V4/V4.1 Vector or Ideogram generate the ONE hero ILLUSTRATION or textured mark per deck, exported as SVG or high-res PNG, then inlined. The 2026 evidence says no single AI tool does both halves well, and the anti-slop trend rewards exactly the flat, intentional, human-arranged look that hand-coded SVG plus one anchor asset produces.

---

## SEARCHES RUN

1. Recraft V3 SVG generation quality 2026 vector API
2. Recraft V4 SVG editable vector February 2026 release quality
3. Ideogram typography text-in-image quality 2026 poster design
4. LLM Claude generate SVG directly hand-written vs diffusion flat design 2026
5. Claude write SVG code quality benchmark GPT vector graphics 2026
6. Recraft API pricing 2026 credits SVG endpoint text to vector
7. Ideogram V3 API 2026 access typography text render batch generation
8. "Graphic-Design-Bench" AI graphic design benchmark 2026 results models
9. Ideogram text layers editable typography feature 2026 how it works
10. SVGO optimize AI generated SVG cleanup workflow vectorize raster potrace 2026
11. when to hand code SVG Claude vs AI image generator flat icons logos geometric 2026
12. Recraft V4 vs Ideogram vs hand coded SVG designers real workflow 2026 review
13. Claude code generate SVG programmatic parametric infographic data viz flat design terminal 2026
14. AI generated image slop avoid look Instagram graphics flat design 2026 authentic
15. Recraft V4 API text to vector output SVG format lottie generation parameters style
16. Recraft V4 text in SVG legible typography weakness limitation letters vector 2026

Pages fetched and read in full: communeify.com 9-LLM SVG benchmark, z.tools Recraft V4 vector article, svgmaker.io Claude-vs-ChatGPT production SVG teardown, chat2svg.github.io (CVPR 2025 paper page), arxiv.org/html/2604.04192v1 (Graphic-Design-Bench, April 2026), imagine.art Ideogram 4.0 overview, mindstudio.ai Recraft V4.1 vector guide. Ideogram official news page (ideogram.ai/news/ideogram-4.0) returned HTTP 403 and was read via the imagine.art mirror instead.

---

## FINDINGS

### PART 1: THE HARD BENCHMARK REALITY (this decides the whole strategy)

The single most important source is **Graphic-Design-Bench (GDB)**, arxiv 2604.04192v1, published April 2026, announced by Purvanshi Mehta (x.com/purvanshi_mehta/status/2041895920326078908). It is the first benchmark built specifically for professional graphic design tasks (not natural-image quality). 49 tasks across five axes: layout, typography, infographics, template/design semantics, and animation. It evaluated 7 frontier models from Google, OpenAI, and Anthropic, named in the paper as **GPT-5.4 / GPT-Image-1.5, Gemini-3.1-Pro / Gemini-3.1-Flash-Image, and Claude-Opus-4.6.**

The verdict is brutal and it is the reason we do NOT try to one-shot whole slides from a model:
- Only **2 of 49 tasks are mostly solved; 22 remain completely broken.**
- **Font family accuracy: 23.7% top-1** across 167 typefaces. Models cannot reliably pick or reproduce a specific typeface.
- **Styled text OCR accuracy: 91% on isolated elements, but collapses to 33.5%** the moment the model must preserve the surrounding layout pixels. Text-in-context is where it falls apart.
- **Layout intent-to-layout: ~75% OCR accuracy, meaning roughly 1 in 4 strings renders wrong.** Text fidelity is the named bottleneck.
- **Component detection: best model 6.4% mAP@0.5**, described as "orders of magnitude below natural-image benchmarks." Models cannot even reliably SEE where the pieces of a design are.
- The paper's own words: "faithful vector code generation" remains "largely unsolved," and models fall short on "spatial reasoning over complex layouts, faithful vector code generation, fine-grained typographic perception."

Takeaway for us: a diffusion model will NOT produce a finished, on-brand, correctly-typeset 1080x1350 slide. And an LLM asked to emit the full slide SVG will misplace components and garble any real typography. So neither "generate the whole slide" path works. The proven path is compositional: hand-coded layout + one generated art asset.

A second corroborating benchmark: **communeify.com** (published 2025-12-02) ran "30 extremely creative SVG generation prompts" across **9 LLMs: Claude Sonnet 4.5, Claude Opus 4.5, Grok Code Fast 1, Gemini 2.5 Pro, Gemini 3.0 Pro Preview, DeepSeek V3.2-Exp, GLM-4.6, Qwen3-VL-235B-A22B-Thinking, GPT-5.1.** No numeric leaderboard was published, but the one concrete verdict is directly useful: **"Gemini 3.0 Pro Preview can usually produce the cleanest and most readable XML code, which is very suitable for scenarios requiring subsequent manual editing."** If we want hand-editable SVG XML, Gemini is a named contender alongside Claude.

### PART 2: CLAUDE (AND LLMs) WRITING SVG BY HAND. WHEN IT WINS

The svgmaker.io teardown (published 2026-04-13, testing Claude Sonnet 3.7 vs GPT-4o) is the most concrete head-to-head for flat assets. Category by category:

- **Simple geometric icons: both adequate.** Claude produced "slightly more structured markup with logical groupings." Winner: Claude, marginal.
- **Infographic elements: Claude clearly wins.** Claude gave "clean rect elements, explicit font declarations, and logical grouping with `<g>` tags." GPT used "hardcoded pixel values that broke at non-standard viewBox sizes." Measured: Claude 2.9 KB vs GPT 3.8 KB file size, consistent viewBox handling, high code readability.
- **Illustrated characters: both fail.** Claude output "an abstract blob"; GPT had "overlapping path coordinates that caused rendering glitches in Firefox."
- **Brand-style logos: both fail.** Core quote: **"SVG generation from LLMs is essentially code generation, not design generation."**

Named failure modes of LLM-written SVG that we must clean up: approximate Bezier curves needing manual optimization, inconsistent viewBox/scaling, no accessibility attributes by default (`role="img"`, `<title>`), and code bloat (redundant style attributes, unnecessary transforms, verbose path data). It cannot vectorize an existing PNG or sketch, it is text-description-only.

So the honest rule, corroborated across svgmaker.io, svgai.org, and allsvgicons.com: **hand-code SVG (have Claude write it in the terminal) when the asset is simple, geometric, parametric, or data-driven.** Explicit "hand-code is best" cases from svgai.org / allsvgicons.com:
- Data-driven icons that change with runtime values (status dots, progress rings, gauge marks). For us: salary bars, save-count deltas, cert-difficulty meters.
- **Parametric icon families and batch operations** (recolor an entire set for a theme). For us: one function that emits the same badge in 8 cert colors.
- Pixel-perfect / mathematical precision (grid systems, exact geometry). For us: the whole slide grid, dividers, thin rules, the poster skeleton.
- Simple geometric icons and abstract geometric backgrounds.

This maps EXACTLY onto Carter's thin-not-blocky, editorial-density brief in memory. The stuff we want more of (thin rules, whitespace hierarchy, inline mono rows, numbered text lists, one or two structural-decoration moments) is precisely the stuff Claude writes cleanly as SVG/HTML. The stuff diffusion is for is the ONE hero image the deck earns its saves on (his own data: badge/book-cover image decks did 47k-65k views and 2,700-6,600 saves vs 100-570 saves for text-only template decks).

Why the LLM-first approach is architecturally sound is confirmed by **Chat2SVG (CVPR 2025, Ronghuan Wu / Wanchao Su / Jing Liao, chat2svg.github.io):** it deliberately starts with an LLM building "an SVG template composed of basic geometric primitives" because that gives semantic, regular geometry, THEN uses diffusion (SDEdit + ControlNet) only to add detail. Diffusion-only SVG suffers "excessive stroke redundancy" and "shapes that appear irregular when viewed in isolation." Reason-SVG (arxiv 2505.24499) and Chat2SVG both encode the same lesson: structure comes from the LLM, richness from diffusion. That is our composite model in miniature.

### PART 3: RECRAFT, the only model that outputs true editable SVG

Recraft is the one AI generator that produces NATIVE vector output, real SVG paths and structured layers, not auto-traced raster.

Version timeline (verified across recraft.ai docs, replicate.com/blog/recraft-v4, z.tools, mindstudio.ai):
- **Recraft V3 SVG:** the prior generation, available via API and via Replicate (recraft-ai/recraft-v3-svg) and Segmind.
- **Recraft V4:** launched **February 17-18, 2026** (one mindstudio piece says April 9, treat Feb 17 as primary per replicate + z.tools). Four variants: V4 (raster 1024x1024, ~10s), V4 Vector (~15s), V4 Pro (raster 2048x2048, ~30s), V4 Pro Vector (~45s).
- **Recraft V4.1 Vector:** a further vector-focused release, "specifically trained on SVG-native outputs rather than fine-tuned from a pixel-based architecture" (mindstudio.ai, 2026-06-18). Available on OpenRouter as recraft/recraft-v4.1-vector.

Quality of the SVG (toolchase.com "AI Vector Design with Recraft" guide): Recraft vectors are **~80-90% as clean as expert hand-drawn vectors**, using **~20-30% more anchor points than an expert** but far fewer than auto-trace. "Indistinguishable from hand-drawn" for most web/UI/marketing contexts.

Where it wins, per z.tools (2026-05-04) and mindstudio: **"clear silhouettes, strong contrast, few colors, clean edges."** Best for "asset exploration: shape language, icon metaphors, mascot directions, sticker concepts, badges, pattern pieces, and simple brand worlds." Guidance: "Ask for fewer details than you think you need. Specify the object, the visual style, the color limits, and the intended size."

Where it loses, and the constraints that matter for OUR pipeline:
- "Photoreal images, complex gradients, soft shadows, and heavy texture can turn into awkward vector files."
- **CRITICAL for us:** in Recraft vector output, **text in the composition is converted to path OUTLINES, not live text** (mindstudio.ai V4.1 guide). If we need editable/crisp text we must generate the illustration WITHOUT text and set type ourselves in the HTML. This aligns perfectly with our base64-embedded-font approach: let Recraft make the wordless mark, we set the type.
- Layer structure is inconsistent: "Some outputs group everything into a single `<g>` element rather than organizing shapes logically," making manual editing harder.
- Text length: renders "short labels of around 1 to 5 words well, not paragraphs," and "very long paragraphs or tiny type can still distort."

API and output formats (recraft.ai/api, recraft.ai/docs, fal.ai, wavespeed.ai, Cloudflare AI docs):
- Native output as **SVG and Lottie** (plus PNG/JPG/PDF/TIFF for raster). Lottie is interesting for our animated-slide ambition.
- Parameters: exact RGB color control, background color, aspect ratios (square, 16:9, 4:3, portrait), `image_size`, and **100+ selectable styles** for a consistent visual system, controllable via API. Style lock is the differentiator vs Midjourney.
- API capabilities: generation, prompt-based editing, background removal, inpainting/outpainting, batch jobs, async processing.
- Pricing: **Recraft V4 Text-to-Vector starts at $0.080 per run** (recraft.ai/docs/api-reference/pricing, corroborated by wavespeed.ai), scaling with size/count/references. Subscription plans exist (checkthat.ai lists a Basic around $12/mo); credits reset monthly and do not roll over, top-up credits never expire. For a one-person content bank this is trivially cheap.

### PART 4: IDEOGRAM, the typography-in-image specialist

Ideogram is the tool when the graphic MUST contain rendered text (a big word, a signage-style headline, a stamped label baked into an image). It is raster-first, not vector.

Versions and dates:
- **Ideogram V3:** released **March 26, 2025.** Text rendering **~90-95% accuracy vs ~30-40% for Midjourney and Stable Diffusion** (mindstudio.ai, buildfastwithai). "It understands typography: font styles, kerning, alignment."
- **Ideogram 4.0:** launched **June 3, 2026** (imagine.art). A **9.3B-parameter Diffusion Transformer trained from scratch**, single-stream DiT, 34 layers. Open-weight but commercial use of the open weights needs a separate paid license; standard use via the app/API is covered. Benchmark claims: **first among all open-weight models on DesignArena; ninth overall in the text-to-image arena and first in quality mode.** "Denser text accuracy, stronger multilingual support, more reliable complex typography." Note: the cited comparison beating Flux/Qwen-Image comes from a Medium writeup, not an independent benchmark, treat as vendor-adjacent.

**Editable Text Layers ("Layerize Text"):**
- V3/current: press "Layerize Text" and each line of text becomes its own editable component, retype/refont/resize without regenerating the whole design. Available on all plans including free tier, and **available via the API.** Beta caveat: "works best with clear, straight text in standard typography. Curved, highly stylized, decorative, or graphic-embedded text may not be detected."
- 4.0 ROADMAP (not yet live per imagine.art, so do not plan on it): headlines/body/graphics returned "as separate editable layers from inference," plus "alpha channels at inference" in a single pass. When this ships it materially changes the game, watch for it.

API and pricing (developer.ideogram.ai, kie.ai, fal.ai):
- Three modes: Turbo (fastest, ~$0.03/image), Default, Quality (~$0.09/image).
- **Batch generation + API access gated to the Pro tier ($42+/mo)** for running dozens of variations in parallel. Basic app plan is ~$8/mo; a freelancer config cited is Ideogram Plus ($20) + Recraft Basic ($12).

The honest pro workflow, stated repeatedly (rangy.ai "Ideogram vs Recraft for Logos," mytheai, maginary.ai): **"neither tool wins outright, each dominates a different half." Ideogram for the wordmark/text, Recraft for the final vector.** Recraft still "struggles with custom lettering," and both lose on "logos requiring exact geometric construction (golden ratio, grid systems)," which "a human designer with Figma AI assistance" (or, for us, hand-coded SVG) still owns.

### PART 5: CLEANUP PIPELINE (turning any AI SVG into a shippable inline asset)

Any AI-generated SVG, from Recraft or from an LLM, needs a cleanup pass before it goes into our HTML. This is a solved, scriptable step (svgmaker.io "cleaning up AI-generated SVGs" 2026, svgo.dev, jakearchibald.github.io/svgomg, vectosolve.com):
- **SVGO** (CLI + JS API): reduces file size **40-60%** with plugins convertPathData, mergePaths, removeUselessStrokeAndFill, cleanupNumericValues. Measured: an early SVGO pass cut file size 55% and improved render time 39%; path simplification added another 26% render win. AI SVGs specifically carry "excessive anchor points and decimal over-precision."
- Rule of thumb: "80% of gains from 20% of effort, run SVGO with good config plus aggressive path simplification."
- If we ever need raster-to-vector (a PNG logo, a book cover into a flat mark): **VTracer** (open-source CLI, color-capable, scriptable for batch) or **Inkscape Trace Bitmap / Potrace.** But note the anti-slop finding below argues against tracing photoreal imagery.

For us this is a `uv`/`pnpm` post-step: generate asset -> run SVGO with an AI-SVG preset -> base64-inline into the slide HTML. Fully offline at render time, consistent with shotpls.

### PART 6: THE ANTI-SLOP MANDATE (why flat-plus-one-asset is the RIGHT aesthetic in 2026)

This is not just taste, it is measurable audience behavior in mid-2026 and it validates our whole direction (krumzi.com "12 Graphic Design Trends 2026," envato elements 2026 illustration trends, creativebloq, aihub.org 2026-06-24, techxplore 2026-05):
- **56% of consumers "encounter AI slop frequently and want brands to stop posting unlabeled, soulless graphics"** (socibly Instagram trends 2026). There is severe fatigue for "perfect, AI-generated brand posts."
- The dominant counter-trend is **"Imperfect by Design":** hand-made textures, slightly irregular layouts, human-feeling aesthetics. "In a feed full of AI-generated perfection, imperfection stands out. It signals authenticity."
- The tells that mark an image as AI slop: "glossy, almost plastic sheen," "textures that are flat when they shouldn't be," "patterns that are too perfect or are inexplicably off."
- Counter-move: **tactile textures**, visible grain, brush marks, collage, material-like surfaces "to make flat illustrations feel physical."

The strategic read: a FLAT VECTOR asset (a clean geometric badge, a designed diagram, a single bold mark) does NOT trip the slop detectors, because "flat and intentional" is a legitimate design language, whereas a diffusion PHOTO with the plastic AI sheen does. Our safest generated-imagery bet is Recraft flat vector marks and Ideogram text-stamps composited by us, NOT AI photoreal scenes. Where we want warmth, we add grain/texture ourselves (cross-reference division D2's feTurbulence/grain recipes) rather than asking a model to fake it.

---

## SO WHAT FOR US

1. **Adopt a composite generation model, never one-shot a slide from any model.** GDB (arxiv 2604.04192) proves frontier models (GPT-5.4, Gemini 3.1 Pro, Claude Opus 4.6) fail at faithful vector code, spatial layout, and typography-in-context (font family 23.7%, styled-text-in-layout 33.5%, component detection 6.4% mAP). The slide LAYOUT and every text zone are hand-authored HTML/SVG. Models only make the ONE hero art asset per deck.

2. **Have Claude write the STRUCTURAL and DATA-DRIVEN SVG layer in the terminal.** This is where Claude is genuinely strong (svgmaker infographic test: clean `<g>` groups, explicit font declarations, consistent viewBox, 2.9 KB). Build a `make-svg-asset` helper that emits parametric, recolorable, data-bound flat SVG: badges in N cert colors, salary/save bar charts from real numbers, difficulty meters, dividers, poster skeletons. This is the poster-not-newspaper backbone and it costs zero dollars and zero API calls.

3. **Use Recraft V4/V4.1 Vector for the wordless hero mark**, exported as SVG. Prompt for "clear silhouettes, strong contrast, few colors, clean edges," ask for FEWER details, and generate it WITHOUT text (Recraft outlines text to paths, so we set type ourselves in the HTML with our base64 fonts). ~$0.08/run, style-locked via the 100+ styles for a consistent deck-to-deck visual system. Pipe every output through SVGO (AI-SVG preset) before inlining.

4. **Use Ideogram only when rendered text must live INSIDE an image** (a stamped signage headline, a big baked-in word), Turbo/Default at $0.03-0.09/image, batch via the Pro tier ($42/mo) if we ever mass-produce. Otherwise our own base64 fonts beat it, because we get real, crisp, kerned, editable type and Ideogram is raster with ~90-95% (not 100%) text accuracy. Watch Ideogram 4.0's "layers out of inference" roadmap, if/when it ships it changes the math.

5. **Bias hard toward flat vector + self-added grain, away from AI photoreal.** The 2026 anti-slop data (56% slop-fatigue, "Imperfect by Design" trend) says flat, intentional, human-arranged graphics READ as authentic while glossy diffusion photos read as slop. This is the objective, measurable reason our thin-not-blocky, editorial, one-focal-point poster direction is correct, and it lines up with Carter's own save data. Add texture ourselves (D2's feTurbulence/grain), do not ask a model to fake material warmth.

6. **Concrete next build:** a `generate-vector-asset` skill/script with two lanes. Lane A: Claude hand-writes parametric flat SVG from a spec (colors, data, geometry) -> SVGO -> inline. Lane B: Recraft API call for the hero mark (no text) -> SVGO -> inline. Both fetch-ahead, both offline at shotpls render time. This is the "AI imagery that does not read as slop" division's actual deliverable for the carousel engine.

---

## GAPS AND CAVEATS

- No independent numeric leaderboard exists ranking Claude vs Gemini vs GPT specifically on FLAT-DESIGN SVG quality. GDB proves the ceiling is low but does not rank per-model on the flat-icon subtask; communeify tested 9 LLMs but published only the qualitative "Gemini 3.0 Pro cleanest XML" note. We should run our own tiny bake-off (same 5 flat-asset prompts across Claude Opus, Gemini 3.x, GPT-5.x) and eyeball the SVG.
- Recraft V4.1 exact release date and its measured delta over V4 were not found in a primary source (mindstudio described it without a date). Treat V4/V4.1 Vector as "current best editable-SVG model" and verify the live model IDs at build time via recraft.ai/docs.
- The Ideogram 4.0 "beats Flux/Qwen-Image" claim traces to a Medium post, not an independent benchmark; DesignArena rankings are the more defensible number. The 4.0 "editable layers / alpha out of inference" feature is ROADMAP per imagine.art, not confirmed live, do not build against it yet.
- The Recraft "80-90% as clean, 20-30% more anchor points" figures come from a vendor-adjacent guide (toolchase.com), not a peer benchmark. Directionally consistent with the neutral sources but treat the exact percentages as soft.
- The svgmaker.io head-to-head tested Claude Sonnet 3.7 / GPT-4o, older than the models Carter actually runs (Opus 4.8 1M). Newer Claude is very likely better at SVG than that test shows, which strengthens the "let Claude hand-write it" recommendation, but we did not find a same-methodology retest on current Opus.
