<!-- © AngelaMos | 2026 | k1-image-models-2026.md -->

# DIVISION K / K1: State of AI Image Generation for DESIGN assets, mid-2026

Scope: image-generation MODELS and services for DESIGN assets (flat vector illustration, isometric tech art, texture generation, typographic posters, infographic imagery). NOT portrait/photoreal humans. Ranked for our carousel pipeline: standalone HTML slides at 1080x1350 rendered to 2160x2700 PNG via shotpls, Python (uv), Node (pnpm), custom tooling fair game.

Date of research: 2026-07-10. Recency prioritized: April to July 2026. Older material labeled as background.

---

## SEARCHES RUN (actual queries)

1. best AI image generation model 2026 Flux Midjourney v7 Ideogram Recraft comparison
2. Recraft V3 vector illustration API pricing commercial license 2026
3. FLUX.2 Black Forest Labs release 2026 features pricing API
4. Nano Banana Pro Google Gemini image model 2026 text rendering design
5. Recraft V3 flat vector illustration isometric tech art best AI 2026 design assets
6. AI generated seamless texture tileable material generation 2026 tools
7. GPT Image 2 OpenAI 2026 API pricing commercial license image generation
8. Ideogram 3.0 text rendering API pricing typography posters 2026
9. Midjourney v7 commercial license terms 2026 social media content ownership
10. SynthID C2PA watermark AI image 2026 Nano Banana visible removal social
11. how to make AI images not look like AI slop 2026 flat design workflow style reference
12. Recraft V3 vs Flux vs Ideogram vector SVG icon generation quality test 2026 designer
13. Recraft V4 release 2026 vector SVG features API pricing new
14. AI image generation isometric illustration flat 2D vector tech infographic best model 2026
15. Ideogram v4 release 2026 features
16. fal.ai Replicate API image generation Recraft Flux Ideogram access python 2026 batch

Fetched pages: bfl.ai/pricing, bfl.ai/blog/flux-2, recraft.ai/docs/api-reference/pricing, openrouter.ai/black-forest-labs/flux.2-pro, vectosolve.com SVG-generators test, redefy.design "UI that doesn't look like AI slop".

---

## FINDINGS

### The mid-2026 landscape has SPECIALIZED. There is no single winner.

Consensus across every 2026 comparison (aimagicx, xainflow, nomadlab, apiscout, fal.ai's own "10 best" page): the field split into specialists, not one champion. The repeated 2026 mapping is:

- FLUX (now FLUX.2) = photorealism and multi-reference consistency
- Ideogram = in-image typography / readable text
- Recraft = native vector (SVG) and brand-consistent design assets
- Midjourney v7 = distinctive painterly / editorial aesthetic
- Nano Banana Pro (Google) = reasoning-driven, best legible in-image text, infographics
- GPT Image 2 (OpenAI) = general-purpose, cheapest commercial license

Source: apiscout.dev/guides/flux-vs-ideogram-vs-recraft-image-gen-api-2026 states outright: "The 2026 image generation API landscape has stabilized around specialists: Flux for photorealism, Ideogram for typography, Recraft for vector work."

### MODEL-BY-MODEL (releases, capabilities, pricing, licensing)

#### RECRAFT V4 / V4.1 — the vector and design-asset leader (MOST RELEVANT TO US)

- V3 background: codenamed red_panda, released Oct 2024, 20B-param text-to-image model built specifically for design. Held #1 on the Artificial Analysis / HuggingFace text-to-image leaderboard for 5+ consecutive months (ELO 1172, 72% win rate). Source: posteverywhere.ai, toolchase.com.
- V4 released FEBRUARY 2026 (recency). Positioning: "visual and design taste... intentional rather than stock-like." Four tiers: V4 (1024x1024 raster, ~10s), V4 Vector (~15s), V4 Pro (2048x2048 raster, ~30s), V4 Pro Vector (~45s). Source: recraft.ai/docs/recraft-models/recraft-V4, replicate.com/blog/recraft-v4.
- V4.1 Pro Vector exists as of mid-2026 (listed on OpenRouter: openrouter.ai/recraft/recraft-v4.1-pro-vector).
- THE differentiator: the ONLY mainstream model producing true editable SVG. Multiple independent sources confirm it emits real vector paths (mathematical curves and nodes with structured layers), NOT a raster traced into an SVG wrapper. Exports SVG, PNG, JPG, PDF, TIFF, and Lottie (Lottie = animated vector, relevant to our animated-slide ambition). Sources: maginary.ai, vectosolve.com, fal.ai/recraft-v4.
- Style consistency: select a style and it applies consistently across generations. "20 icon prompts with the same style produce a cohesive visual set rather than 20 slightly different interpretations." This is the single most important property for a repeatable carousel system. Source: toolchase.com.
- Isometric / flat: responds to explicit style keywords ("flat design icon", "line art illustration", "geometric logo", "isometric illustration"). 18+ output modes. Source: toolchase.com, aifreeforever.com.
- API pricing (recraft.ai/docs/api-reference/pricing, primary source fetched):
  - Raster image: $0.04. Vector/SVG image: $0.08.
  - Image-to-image: $0.04 raster / $0.08 vector. Inpainting, outpainting, background replace: same $0.04 / $0.08.
  - Background removal: $0.01. Crisp upscale: $0.004. Creative upscale: $0.25.
  - V4 Pro tier is pricier: ~$0.25 raster / $0.30 vector per fal/openart listings.
- Subscription: paid plans from $10/mo (private images + commercial rights), Advanced $27/mo, Pro $48/mo. CRITICAL: SVG export is gated to Pro and Team plans only. The $0.08 API vector call is the cheaper path to SVG. Sources: recraft.ai/pricing, flowith.io.
- Commercial license: Pro plan license covers client deliverables, commercial products, marketing materials, merchandise. Does NOT permit sublicensing/reselling the raw generated files. Finished commercial products are fully licensed. Source: flowith.io/blog/recraft-v3-faq.

#### IDEOGRAM 4.0 — typography and layout leader, now OPEN-WEIGHT (major recency find)

- 3.0 released March 26, 2025 (background). Text rendering 90-95% accurate vs 30-40% for Midjourney/SD. Nails 1-4 word headlines ~9/10 times; 5-12 words ~7/10; degrades past 15 words. Source: tooljunction.io, checkthat.ai.
- 4.0 released JUNE 3, 2026 (recency). First Ideogram OPEN-WEIGHT model. 9.3B-param Diffusion Transformer trained from scratch (not a fine-tune). Immediately topped the DesignArena open-weight leaderboard. Source: ideogram.ai/news/ideogram-4.0, alphasignal.ai, imagine.art.
- 4.0 capabilities directly useful to us: native BOUNDING-BOX layout control (place text/elements in specific regions without a ControlNet pipeline), multi-line text, varied font weights, logos, signage, captions. Native resolution 256 to 2048 in multiples of 16, aspect ratios up to 6:1 (single model does square thumbnails AND ultrawide banners; our 1080x1350 = 4:5 is trivially in range). Source: github.com/ideogram-oss/ideogram4, evolink.ai.
- 4.0 released under a COMMERCIAL open-weight license; downloadable (HuggingFace: ideogram-4-fp8, ideogram-4-nf4) and available via API. Enterprises can fine-tune on brand data and self-host. This means we could in principle run it locally alongside our self-hosted Ollama stack.
- API pricing (3.0, still the paid tier reference): $0.03 Turbo, $0.09 Quality per image. On fal: $0.03-$0.09 by tier. Source: ideogram.ai/api-pricing, kie.ai, fal.ai.

#### FLUX.2 (Black Forest Labs) — photoreal + reliable in-image text, weak on our vector need

- Released NOVEMBER 25, 2025. Family: [pro] (production API), [flex] (dev parameter control), [dev] (32B open-weight on HuggingFace), [klein] (4B, Apache 2.0, sub-second on consumer GPU). Source: bfl.ai/blog/flux-2.
- Design-relevant: FLUX.2 explicitly handles "complex typography, infographics, memes and UI mockups with legible fine text now work reliably in production." Multi-reference editing composites up to 10 source images for character/product/STYLE consistency. Adheres to brand guidelines, lighting, layouts, logos. Editing up to 4 MP. Source: bfl.ai/blog/flux-2 (fetched). NO vector/SVG output mode mentioned anywhere: it is raster only.
- API pricing (openrouter.ai/black-forest-labs/flux.2-pro, fetched): FLUX.2 Pro output first megapixel $0.03, each subsequent MP $0.015; input (edit reference) $0.015/MP. A 1024x1024 (1MP) gen is ~$0.03. Tier ladder (flowith/openrouter): klein ~$0.014/image, pro ~$0.03/MP, flex ~$0.06/MP, max ~$0.07/MP first MP then $0.03.
- Licensing: Apache 2.0 for klein 4B (fully free commercial). FLUX Non-Commercial License for 9B and larger open weights. Self-Hosted Commercial License for [dev] is $999/mo (100k images/mo, $0.01/image after). Pro API via bfl.ai is pay-as-you-go, no subscription/seat fees. Sources: bfl.ai/pricing, flowith.io.

#### NANO BANANA PRO / Gemini 3 Pro Image (Google) — best legible in-image text, BUT watermark problem

- Shipped to GA JUNE 2026 (recency). Built on Gemini 3 Pro, reasoning-driven. Source: blog.google/innovation-and-ai/products/nano-banana-pro, deepmind.google/models/gemini-image/pro.
- Best model for correctly rendered, legible text in-image (short taglines through full paragraphs), multilingual, and for turning notes/data into infographics and diagrams. This is the strongest "put readable text INTO the image" model. Source: blog.google, animateai.pro.
- Pricing: $0.134/image, 2-5s generation. That is ~4x Recraft raster and ~1.5x Recraft vector. Source: dev.to Nano Banana Pro guide, wavespeed.ai.
- WATERMARK LANDMINE (verified, load-bearing for us): every Gemini/Nano Banana output ships with (a) an INVISIBLE SynthID pixel watermark, (b) a C2PA "Content Credentials" signed metadata manifest, AND (c) on the consumer Gemini path, a VISIBLE sparkle overlay glyph. SynthID survives many edits; C2PA can trigger "Made with AI" labels on social platforms. Sources: nenobanana.com/blogs/nano-banana-synthid-and-c2pa, blog.google. A cottage industry of removal tools exists (github.com/wiltodelta/remove-ai-watermarks, removesynthid.io) but stripping provenance is legally/ethically fraught and platform-flaggable. Treat visible-watermark outputs as unusable for finished slides.

#### GPT IMAGE 2 (OpenAI) — cheapest commercial license, general purpose

- 2026 model. Resolution-based pricing replaced the old low/med/high quality knob: $0.03 at 1K, $0.05 at 2K, $0.06 at 4K per image. Token model underneath: $30/M image output tokens, $8/M image input tokens, $5/M text input. Batch API halves cost (~$0.0265/image medium 1024). Sources: wavespeed.ai/blog/gpt-image-2-pricing-2026, costgoat.com/pricing/openai-images.
- COMMERCIAL LICENSE IS FREE to API customers, a genuine differentiator. But: ChatGPT/OpenAI images also now carry BOTH C2PA metadata and SynthID watermarks (OpenAI Help Center, updated 2026-05-21). Same "Made with AI" label risk as Google.

#### MIDJOURNEY v7 — best aesthetic, worst fit for a programmatic pipeline

- King of painterly/editorial aesthetic; worst at accurate text and at reproducing a consistent element across generations. Source: gradually.ai, aimagicx.
- Licensing (terms.law, updated per Midjourney ToS 2026-02-12): paid plans (Basic $10, Standard $30, Pro $60, Mega $120) grant full commercial-use license; FREE tier gets ZERO commercial rights (CC BY-NC 4.0 only). If your business does >$1M gross annual revenue you must be on Pro or Mega for "company ownership." Public-server generations are visible to others and used for training; Stealth Mode (private) is Pro/Mega only.
- Practical blocker for us: Midjourney has no first-class programmatic API for headless batch generation, and it produces raster only. Poor fit for a shotpls/HTML pipeline.

### API ACCESS LAYER: fal.ai is the right integration point (matters for our pipeline)

- fal.ai gives unified access to Black Forest Labs (FLUX.2), Google (Nano Banana), OpenAI (GPT Image 2), Ideogram (V3, and V4 flowing in), and Recraft (V3 AND V4) under one API key, one bill, one integration pattern. It has EXCLUSIVE access to Recraft and Nano Banana among the aggregators. Source: fal.ai/learn, teamday.ai/blog/fal-ai-vs-replicate-comparison.
- fal is consistently 30-50% cheaper than Replicate (up to 80% on video). Source: teamday.ai.
- Three execution modes: Sync (immediate), Async (non-blocking), Queue (BATCH). Python integration via litellm; models addressable as flux-pro, recraft, imagen4, etc. Source: docs.litellm.ai/docs/providers/fal_ai, fal.ai/docs.
- This means ONE Python client (uv-managed) hitting fal can generate Recraft SVGs, Ideogram typographic assets, and FLUX raster in the same script, then we inline them into HTML for shotpls. No per-vendor SDK sprawl.

### TEXTURE GENERATION — mostly 3D/PBR tooling, limited 2D-poster value

- The 2026 texture leaders (Tripo AI, 3D AI Studio, Layer, Polycam, Texturly, AITEXTURED) are built for SEAMLESS TILEABLE PBR materials (base color + normal + roughness + metallic + displacement) for 3D surfaces. Sources: lovart.ai/blog/5-best-ai-texture-material-generators-2026, 3daistudio.com.
- Layer and Texturly do produce clean tileable 2D textures from a text prompt with auto seam removal, which is the only slice relevant to us (a subtle repeating grain/noise/paper/grid backdrop). For that use, a tileable-texture generator or a Python-generated noise/grid (see sibling e3-python-generative) is cheaper and more controllable than a generative image model.
- Bottom line: texture generation as a category is aimed at game/3D and adds little to flat poster slides. Use it only for an occasional background material, and prefer procedural/Python for full control.

### "NOT SLOP" WORKFLOW (the core of this division's mission)

Most 2026 "make AI not look like slop" content is PHOTO-oriented (add grain, camera/lens facts, imperfect crop, kill "8K/ultra-realistic/cinematic" words). That advice does NOT transfer to flat design. Source: delv.tools, upsampler.com, hedra.com.

For DESIGN/flat assets the relevant, verifiable guidance:

- Restraint over effects. The redefy.design "UI that doesn't look like AI slop" piece (Medium, May 2026, fetched) argues the tell is over-application: apply a polish move (stroke, mesh gradient, drop shadow, glassmorph, inverted color) to only ONE or TWO focal components per composition, never everything. This lines up exactly with the poster-not-newspaper thesis of this whole research op.
- Style-lock, not one-off prompts. Recraft's style consistency (a saved/selected style reused across generations) is what turns "20 slightly different AI pictures" into a coherent SET. The slop tell for a carousel is 10 slides that each look like a different generator. Lock ONE house style and reuse it.
- Generate assets, not whole slides. The winning move is NOT "make the AI compose the slide." It is: generate a single clean flat vector object (a badge, an icon, an isometric object, one illustration) on transparent background, then compose typography and layout ourselves in HTML/CSS where we have pixel control. This sidesteps AI's bad-typography and busy-composition failure modes entirely and matches Carter's own data (image-artifact decks outperformed text-only template decks by ~4x views and ~10x saves).

---

## SO WHAT FOR US

1. Default stack: Recraft V4 (via fal.ai) is our primary design-asset engine. It is the ONLY model that outputs true editable SVG, it has style-lock for set consistency, and it does flat/isometric on keyword. $0.08/vector call. SVG inlines cleanly into our standalone HTML slides and scales to 2160x2700 with zero raster artifacts, which raster generators cannot promise. This directly serves the "poster with one strong image" goal and the proven image-artifact win in Carter's 90-day data (47-65k views, 2.7-6.6k saves on image decks vs 10-18k / 100-570 on text-only).

2. Split roles, do not chase one model.
   - Recraft V4 = flat vector illustration, isometric objects, icon/badge sets, brand-consistent SET generation (SVG). Primary.
   - Ideogram 4.0 or Nano Banana Pro = only when we deliberately want type BAKED INTO an image (a stylized headline glyph, a fake-signage prop). Otherwise our own HTML/CSS typography wins on control.
   - FLUX.2 = only for the rare photoreal or richly-textured raster element. Not our main path.

3. Build ONE fal.ai Python client (uv). Queue/batch mode lets a skill fire N asset generations for a deck in parallel, download SVG/PNG, base64-inline into the per-slide HTML, then shotpls renders. One key, one bill, Recraft + Ideogram + FLUX all reachable. No vendor SDK sprawl.

4. Watermarks are a hard filter. AVOID Nano Banana Pro and GPT Image 2 for FINISHED slide art unless we accept SynthID + C2PA provenance and (for Gemini consumer path) a visible sparkle overlay that can trip "Made with AI" labels on Instagram. Recraft and FLUX self-hosted/dev do not force a visible watermark. Do not build a watermark-stripping step; it is platform-flaggable and not worth the legal exposure. Prefer models that never stamp the output.

5. Licensing is clean for our use with the right picks. Recraft Pro/API and FLUX Pro API both grant commercial-use rights for finished social content (Recraft: no reselling raw files; fine, we embed them in slides). GPT Image 2 gives a FREE commercial license but carries the watermark tradeoff. Midjourney requires a paid plan for ANY commercial right and has no real batch API: skip it for the pipeline, keep it only for occasional hand-made hero art.

6. Generate objects, compose ourselves. The anti-slop discipline that matches this whole op: use the model to make ONE clean flat object on transparent ground, then do all type and layout in HTML/CSS. One or two polish moments per slide (stroke, mesh gradient, single drop shadow) on the focal object only, per the May-2026 redefy.design rule. Never let the model lay out the slide: that is where AI busyness and typography failures leak in.

7. Open-weight option for later: Ideogram 4.0 (June 2026, open-weight, commercial license) and FLUX.2 klein (Apache 2.0) can be self-hosted next to our existing Ollama/Redis/MinIO stack if we want zero per-image API cost at volume. Not needed day one; fal.ai pay-per-image is cheaper until we are generating thousands of assets a month.

### Ranked for us
1. Recraft V4 / V4.1 Pro Vector (via fal.ai) — primary, SVG + style-lock + flat/isometric.
2. Ideogram 4.0 — secondary, only when text must be inside the image; also the self-host candidate.
3. FLUX.2 [pro] or [dev] — occasional photoreal/textured raster element.
4. GPT Image 2 — fallback general raster (free commercial license), watermark caveat.
5. Nano Banana Pro — best in-image text but watermark/sparkle disqualifies it for finished slides; use only for throwaway/reference.
6. Midjourney v7 — hand-made hero art only; no batch API, raster only, not pipeline-friendly.
