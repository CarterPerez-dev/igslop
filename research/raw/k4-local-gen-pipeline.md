<!-- © AngelaMos | 2026 | k4-local-gen-pipeline.md -->

# DIVISION K / K4: Running image generation LOCALLY on Linux, mid-2026

Mission: Can Carter generate flat-design carousel assets (badges, book-cover-style imagery, emblems, poster art) on his own Linux box, headless, driven by an agent inside a build pipeline, at quality competitive with paid APIs? What are the concrete setup paths and the hardware floors? Research date 2026-07-10.

Bottom line up front: yes, and the tooling is mature. A warm headless ComfyUI server hit over its HTTP/WebSocket API from a Python agent is the production path. The model landscape shifted hard in early 2026: FLUX.2 [klein] (Jan 15 2026) does sub-second generation on consumer GPUs with production-grade text rendering, which was the exact thing local models used to fail at. The single biggest gotcha is LICENSING, not hardware: the good-quality open models are split between Apache-2.0 (commercial-safe) and Non-Commercial, and Carter runs a commercial content business, so this gates model choice.

---

## SEARCHES RUN

1. ComfyUI headless API programmatic Python invocation 2026
2. Flux model VRAM requirements consumer GPU 2026 generation speed
3. FLUX.2 dev Klein release 2026 local quality flat design vector text
4. ComfyUI run workflow from Python script without server standalone 2026
5. ComfyUI websocket API python example prompt queue history save image 2026
6. Flux local RTX 3060 12GB generation time seconds image ComfyUI GGUF quantized
7. huggingface diffusers FluxPipeline python generate image FLUX.2 2026 code
8. AI generated image slop avoid clean flat design local model 2026 negative prompt style
9. local Flux vs Midjourney DALL-E flat vector design quality comparison 2026
10. SDXL vs Flux 2026 speed VRAM flat illustration badge emblem poster asset generation
11. ComfyUI keep model loaded warm server batch generation pipeline avoid reload VRAM 2026
12. Qwen-Image local text rendering typography poster 2026 VRAM ComfyUI quality
13. FLUX.2 Klein 4-step distilled generation speed RTX 4090 5090 seconds benchmark 2026
14. FLUX.2 Klein license Apache commercial use black forest labs open weights 2026
15. FLUX.1 dev schnell license non-commercial commercial SDXL license consumer content creator 2026
16. Qwen-Image Apache 2.0 license commercial use 2026
17. Flux ComfyUI model load time cold start seconds first generation warm cache RAM
18. generate transparent background PNG flat icon asset ComfyUI Flux workflow local 2026
19. ComfyUI-to-Python-Extension OR ComfyScript standalone python generate flux automation batch
20. Recraft V3 alternative local open source flat vector icon SVG generation model 2026

Pages fetched in full: ComfyUI official API examples doc, ComfyUI-to-Python-Extension GitHub, HuggingFace FLUX.2 diffusers blog, localaimaster FLUX.2 local setup guide. Two pages 403'd on WebFetch (synapsewire Klein review, VentureBeat Klein launch), recovered the substance from their search snippets and corroborating sources.

---

## FINDINGS

### 1. The model landscape as of mid-2026 (this is the part that changed)

The old objection to local generation was "the models can't render text or clean flat graphics, they only do photoreal, everything looks like AI slop." That objection is largely dead as of early 2026.

**FLUX.2 [klein]** (Black Forest Labs, released Jan 15 2026, announced at bfl.ai/blog/flux2-klein-towards-interactive-visual-intelligence and covered by MarkTechPost 2026-01-16 and VentureBeat 2026-01-17):
- Four variants: 4B base, 4B 4-step distilled, 9B base, 9B 4-step distilled.
- Marketed as "the fastest model family, generating and editing images in under a second" on consumer hardware.
- Speed benchmarks (from docs.clore.ai/guides/image-generation/flux2-klein, synapsewire, lucasgraphic, glm-image blog): the 4-step distilled variant runs approximately 0.4 sec/image on an RTX 4090 and approximately 0.25 sec/image on an RTX 5090. Claim: "20-60x faster than FLUX.1." At 0.4 sec/image you can do 10,000+ images/hour on a single 4090. (Treat the 0.25s number as best-case single-image; a separate source cites approximately 2 sec end-to-end on a 5090 for the 9B including load overhead.)
- The headline design win: "much better text rendering, with legible signage, UI mockups, memes and infographics being far more reliable than FLUX.1, which routinely garbled longer strings." Multiple sources describe "production-grade typography." This is exactly the failure mode that made local models useless for carousel/poster work before.

**FLUX.2 [dev]** (the big brother, 32B params):
- Best quality and prompt adherence, but it is a DATACENTER model, not a consumer one. Per the HuggingFace diffusers blog (huggingface.co/blog/flux-2): base inference "takes more than 80GB VRAM." With CPU offloading approximately 62GB on an H100. To fit a 24GB consumer card you need 4-bit NF4 quantization (the `diffusers/FLUX.2-dev-bnb-4bit` checkpoint) which brings it to "approximately 20GB of free VRAM," and even then generation on a 4090 with a GGUF Q4_K_S build is "tens-of-seconds range" per 1MP image. Do not build a fast pipeline on FLUX.2 dev.
- Architecture note that matters for VRAM: FLUX.2 replaced FLUX.1's two text encoders with a SINGLE encoder, Mistral Small 3.1, max_sequence_length 512. That single encoder is itself a multi-GB memory cost that has to be resident or offloaded.

**FLUX.1 [dev] / [schnell]** (2024 generation, still widely run in 2026):
- FLUX.1 dev: approximately 24GB FP16, approximately 12GB FP8, 6-8GB at GGUF Q4. 20-28 steps, 15-40 sec/image on strong hardware.
- FLUX.1 schnell: distilled few-step, approximately 2-4 sec/image on a 4090.
- Weaker text rendering than the FLUX.2 line ("routinely garbled longer strings").

**SDXL** (still the speed/reach champion in 2026, per localaimaster/blog/sdxl-vs-flux-local and willitrunai):
- Runs natively on 8GB VRAM. Smaller model, three years of optimization, noticeably faster than any Flux. Flux takes 4-10x longer per image than SDXL on the same GPU.
- Wins on speed, stylized art, and the LoRA/ControlNet ecosystem. Loses to Flux on raw quality, prompt adherence, and text rendering. For controlled brand-consistent flat art via LoRA + ControlNet, SDXL is still very much alive.

**Qwen-Image / Qwen-Image-2.0** (Alibaba; native ComfyUI support since Aug 5 2025; 2.0 launched Feb 10 2026, per blog.comfy.org and github.com/QwenLM/Qwen-Image):
- Best-in-class TEXT rendering among open models. Built specifically for "professional infographics, PPTs, posters, comics," high-fidelity paragraphs, fine print, layouts, English and Chinese. This is the model to beat for text-heavy poster slides.
- Heavy: full BF16 approximately 48GB+ VRAM, "current operation requires 24GB GPU memory and 64GB+ RAM for full version." FP8 is the recommended consumer path; GGUF format runs on 8GB+ VRAM. A 4-step Lightning LoRA cuts sampling from 20 steps to 4 and runs "on as little as 8GB VRAM with 16GB system RAM" (per sandner.art).

### 2. LICENSING (the real decision driver for a commercial account)

Carter posts commercially (@carterperez.dev drives a paid SaaS). Model license gates what he can legally use to make revenue content. Confirmed from bfl.ai/licensing, the HuggingFace LICENSE.md files, and apatero/ai-market-watch coverage:

COMMERCIAL-SAFE (Apache 2.0, use freely for business content):
- FLUX.1 [schnell] (Apache 2.0)
- FLUX.2 [klein] 4B, both base and 4-step distilled (Apache 2.0). This is the strategically important one: the fast, good-text, consumer model in a commercial-safe license.
- SDXL base (CreativeML Open RAIL++-M, permits commercial use)
- Qwen-Image / Qwen-Image-Edit (Apache 2.0; "no restrictions on commercial use of outputs generated locally")

NON-COMMERCIAL (research/hobby only without a paid BFL license):
- FLUX.1 [dev] (BFL Non-Commercial License v2.0)
- FLUX.2 [dev] (Non-Commercial)
- FLUX.2 [klein] 9B, both base and distilled (FLUX.2-dev Non-Commercial License). Note: the 9B klein is the higher-quality klein tier and it is NOT commercial-safe. Only the 4B klein is.

Practical read: for a commercial pipeline, the shortlist is FLUX.2 klein 4B (fast + decent text + Apache), Qwen-Image (best text + Apache but heavy), FLUX.1 schnell (fast + Apache but weaker text), SDXL (fastest + huge ecosystem + commercial). BFL also now runs a self-serve commercial licensing portal (bfl.ai/licensing) if he ever wants the dev-tier quality legally.

### 3. Hardware floors (concrete, per named GPU)

From localaimaster, willitrunai, apatero GGUF guide, gigagpu, botmonster:

- 8GB VRAM (e.g. RTX 3050/4060 8GB): SDXL native; FLUX.1 via GGUF Q4_K_S at a quality cost; FLUX.2 klein 4B at FP8 (approximately 8-9GB, tight); Qwen-Image via GGUF + 4-step Lightning LoRA. This is the true floor.
- 12GB VRAM (RTX 3060 12GB, the "budget entry point for Flux"): FLUX.1 dev via GGUF Q5_K_S + FP8 T5 encoder gets approximately 60-80 sec/image for a 1024px image, "very close to full quality." FLUX.2 klein 4B BF16 (approximately 13GB is a hair over, so FP8) fits comfortably.
- 16GB VRAM (RTX 4060 Ti 16GB, RTX 4080, RTX 5060 Ti 16GB): the sweet spot. FLUX.2 klein 9B at FP8 (approximately 15GB) fits. FLUX.1 dev FP8 (approximately 12GB) fits with room. localaimaster calls the RTX 5060 Ti 16GB "the current value pick for FLUX" because 16GB is exactly enough for the FP8 single-file workflow with no low-VRAM gymnastics.
- 24GB VRAM (RTX 3090, RTX 4090, RTX 5090-adjacent): everything consumer-viable. FLUX.1 dev full FP16, FLUX.2 dev only via 4-bit NF4 quant (approximately 20GB) and even then it's slow. Qwen-Image full FP8. RTX 4090 is repeatedly called the best value.
- FP8 is the genuine sweet spot precision: single safetensors file, no extra GGUF loader node, visually indistinguishable from FP16 in most prompts, halves memory. Q4 is the practical GGUF floor before anatomy/text quality degrades (Q3/Q2 breaks text rendering, which is fatal for our use case).

### 4. Is local quality competitive with APIs for FLAT DESIGN assets specifically?

Nuanced answer from lovart.ai/blog/ai-image-models-compared-2026, aimagicx, and the Recraft-alternatives research:

- For clean FLAT VECTOR and ICON work, the current best-in-class is Recraft (v3/v4), which is an API, not local. Recraft "renders legible text reliably, outputs vectors, keeps a consistent brand style across a set, ideal for logos, icons, posters, marketing assets." It genuinely beats Midjourney and Flux for production flat graphic design and native SVG output. Honest gap: no local open model matches Recraft's native-SVG-plus-brand-consistency combo yet.
- For TEXT-IN-IMAGE (poster headlines, badge lettering): Ideogram 2.0 (API) leads text accuracy (correct spelling/font/sizing 82% of the time per aimagicx testing). Among LOCAL models, Qwen-Image is the closest text-rendering competitor, then FLUX.2 klein/dev.
- For raster flat illustrations / badges / book-cover-style imagery (raster, not vector): local FLUX.2 klein and Qwen-Image are competitive with mid-tier APIs. This is the sweet spot for our actual use case, because Carter's winning decks used BADGE and BOOK-COVER imagery, which are raster artifacts, not SVGs.

Strategic caveat that matters more than model choice: "AI slop" is a PROMPTING and SYSTEM problem, not a model problem. Per mindstudio and forgehouse: models return the mean of their training data, so "a clean modern badge" yields the consensus slop badge (centered hero, gradient blob, three-icon row). The fix is a design system in the prompt: exact style references, named palette/hex, explicit negative constraints, and post-generation compositing rather than asking the model to render the whole finished slide. Local models are actually BETTER for de-slopping because you control seeds, LoRAs, ControlNet, and can iterate for free.

### 5. Native transparent-PNG output (directly relevant to badge/emblem compositing)

You do not have to generate a full slide. You can generate a clean subject on a transparent background and composite it into the HTML slide via CSS, which is exactly how you avoid slop and keep the poster layout under your control.

- LayerDiffuse in ComfyUI (runcomfy.com/comfyui-workflows/generating-transparent-images-with-layerdiffuse-in-comfyui): directly generates transparent RGBA images, with sub-workflows for transparent subject, background-from-foreground, and foreground-from-background.
- Background-removal nodes (RMBG-1.4, RMBG-2.0, InSPyReNet, BEN2) cut a generated subject to transparent PNG as a post step. NVIDIA's own ComfyUI creator-workflow blog (developer.nvidia.com) demonstrates decomposing a render into separate transparent PNG layers.
- OpenArt hosts a "universal multi-style PNG material" FLUX.1 dev workflow that outputs transparent PNG material from a text prompt with a style selector.

### 6. Programmatic invocation: three real paths so an AGENT can generate assets in a build pipeline

This is the core of the mission. All three are confirmed real and current.

PATH A: Warm headless server + HTTP/WebSocket API (RECOMMENDED for a build pipeline).
- Launch: `python main.py --disable-auto-launch` (optionally `--listen`), which starts an HTTP server at 127.0.0.1:8188. No browser needed. Official docs: docs.comfy.org/development/comfyui-server/comms_overview and /api-examples.
- Endpoints: `POST /prompt` submits an API-format workflow JSON with a client_id; `GET /object_info` returns the full node catalogue (inputs/outputs/defaults); `ws://127.0.0.1:8188/ws` streams real-time execution status; `GET /history/{prompt_id}` returns output metadata (filename, subfolder, type); `GET /view` downloads the image bytes.
- The workflow is a JSON dict keyed by node id, each with `class_type` and `inputs`; inputs reference upstream nodes as `["node_id", output_index]`. You mutate it in Python before submitting:
  ```
  prompt = json.loads(workflow_api_json)
  prompt["6"]["inputs"]["text"] = "your prompt"   # positive CLIP text node
  prompt["3"]["inputs"]["seed"] = 5               # KSampler seed
  ```
- Completion detection: listen on the WebSocket for an "executing" message where "node" is None (means the graph finished). Then GET /history/{prompt_id}.
- Only extra dependency: `pip install websocket-client` (rest is stdlib json/urllib). Canonical example: ComfyUI/script_examples/websockets_api_example.py in the Comfy-Org GitHub repo. There is also a `SaveImageWebsocket` node that streams the PNG bytes back over the socket so you never touch disk.
- This is the path that fits Carter's shotpls pipeline cleanly: an agent step calls /prompt with a templated workflow, waits, pulls the transparent-PNG asset, base64-inlines it into the slide HTML, then shotpls renders the 2160x2700.

PATH B: ComfyUI-to-Python-Extension (github.com/pydn/ComfyUI-to-Python-Extension).
- Converts a visual workflow (or an API-format JSON) into an executable `.py` script via `File -> Save As Script` in the UI, or via CLI. Latest release referenced as v2.1.0 (March 2026) with a `COMFYUI_TOPYTHON_UNLOAD_MODELS=1` env for repeated-call/embedded scenarios. Install with `uv pip install -e .` into custom_nodes, or `uv sync` + `export COMFYUI_PATH=/path/to/ComfyUI` for CLI.
- IMPORTANT distinction (verified against two sources that disagree, so flag it): the generated script does NOT talk to a running server, but it DOES import ComfyUI internals (nodes.py, the node classes) and needs a working ComfyUI runtime/checkout on disk to import from. It is "standalone" in the sense of no HTTP server, NOT in the sense of zero ComfyUI dependency. Handles custom nodes, supports a customizable queue/iteration count, outputs Black-formatted PEP8 code.

PATH C: ComfyScript (github.com/Chaoses-Ib/ComfyScript and github.com/comfyorg/comfyscript; PyPI `comfy-script`).
- A Python frontend/library where ComfyUI nodes become callable Python functions. Lets you write loops, call library functions, mix arbitrary Python with node execution, and optimize caching for faster repeat runs. Can auto-translate existing workflows into ComfyScript. Runs locally or against a remote ComfyUI server. This is the most "code-native" option if the agent should compose workflows rather than fill in a fixed template.

PATH D (lightest, no ComfyUI at all): HuggingFace diffusers directly.
- Minimal FLUX.2 example (huggingface.co/blog/flux-2):
  ```
  from diffusers import Flux2Pipeline
  import torch
  pipe = Flux2Pipeline.from_pretrained("black-forest-labs/FLUX.2-dev", torch_dtype=torch.bfloat16)
  pipe.enable_model_cpu_offload()
  image = pipe(prompt="...", num_inference_steps=50, guidance_scale=4, height=1024, width=1024).images[0]
  ```
- Klein variant: `Flux2KleinPipeline` / `Flux2Pipeline` from `black-forest-labs/FLUX.2-klein-base-9B`, num_inference_steps=50, guidance_scale=4.0 (distilled variants use ~4 steps).
- Memory levers: `enable_model_cpu_offload()`, group offloading (down to 8GB free VRAM but needs 32GB system RAM and is slow), 4-bit bitsandbytes via the `diffusers/FLUX.2-dev-bnb-4bit` checkpoint (approximately 20GB on a 24GB card), remote text encoder to offload Mistral. `low_cpu_mem_usage=True` cuts the RAM requirement to approximately 10GB.
- Tradeoff: diffusers is simpler to embed in a pure-Python agent (no server, no node graph), but you lose ComfyUI's LayerDiffuse/ControlNet/LoRA ecosystem and warm-model persistence. Good for SDXL or FLUX.1 schnell simple generations; ComfyUI is better for the compositing-heavy flat-asset workflows.

### 7. The warm-server / cold-start problem (operationally load-bearing)

A per-invocation "spin up, load model, generate, tear down" loop is the wrong shape because model load dominates.

- Flux model LOAD alone is approximately 20 seconds before inference even starts (Comfy-Org/ComfyUI issue #4812); actual inference then adds its own time. So a cold start can be 20s+ of pure overhead per call.
- ViewComfy's Memory Snapshot technique drops ComfyUI cold-start to under 3 seconds (3-5x speedup) if you must cold-start (e.g. serverless).
- For a local build pipeline the right move is a persistent warm server: keep ComfyUI running, model resident in VRAM, hit /prompt per asset. BUT a 2026 regression matters: recent ComfyUI "DynamicVRAM / async weight offloading" changes cause models to be UNLOADED after every generation, forcing a full reload of checkpoint/CLIP/text-encoder/VAE on the next prompt (Comfy-Org/ComfyUI issues #13139, #14162, #12786; desktop issue #1741). The fix/flag: launch with `--disable-dynamic-vram` to keep weights resident in RAM/VRAM for fast repeated runs. If you see mysteriously slow second-and-later generations in a batch, this is the cause.

---

## SO WHAT FOR US

1. Local generation is viable NOW for our exact use case, and the economics are absurd once warm. FLUX.2 klein 4B at approximately 0.4 sec/image on a 4090 (Apache-2.0, commercial-safe, decent text) means an agent can generate dozens of candidate badge/emblem/subject assets per slide for free and let a visual-QA pass pick the best. That directly serves the "image-artifact decks did 47k-65k views vs text-only decks did 10k-18k" data: the winning decks are image-heavy, and local gen makes image density nearly free.

2. Model shortlist for a commercial pipeline, in priority order:
   - FLUX.2 klein 4B (FP8) as the default fast workhorse: Apache-2.0, sub-second, good-enough text, fits 8-12GB.
   - Qwen-Image (FP8 or GGUF+Lightning) when a slide needs actual rendered TYPOGRAPHY inside the image: Apache-2.0, best open text rendering, heavier (target a 16GB+ card or the 4-step Lightning path on 8GB).
   - SDXL when we want tight brand consistency via a trained LoRA + ControlNet: commercial-safe, fastest, biggest ecosystem.
   - AVOID FLUX.2 dev, FLUX.1 dev, and FLUX.2 klein 9B for commercial output unless we buy a BFL commercial license: all Non-Commercial. Do not let a "just use the best model" impulse drag us into klein 9B; it is a license trap.

3. Do NOT generate finished slides. Generate transparent-PNG SUBJECTS (badges, emblems, book-cover objects) via LayerDiffuse or generate-then-RMBG, then composite into our existing HTML slide layout and base64-inline for shotpls. This keeps the poster composition under our deterministic control (fixing the "busy newspaper" problem is a LAYOUT job, not a model job) and is the single biggest lever against AI slop. The model makes one clean focal object; our HTML makes the poster.

4. Architecture: run ComfyUI as a persistent warm headless server (`python main.py --disable-auto-launch --disable-dynamic-vram`), remapped to a random high host port per Carter's port rule, and have the carousel skill's asset step call it over the HTTP/WS API (Path A). Wrap it as a small Python helper: load templated API-workflow JSON, inject prompt/seed/style, POST /prompt, await the WS "executing: node None", GET the PNG, return bytes. This is a clean addition to the make-carousel pipeline with no GUI and no per-call cold start. Only dep is websocket-client.

5. Hardware ask: the practical floor is a 12GB card (RTX 3060) for klein 4B and Flux GGUF; the comfort target is a 16GB card (RTX 4060 Ti 16GB / 5060 Ti 16GB) which unlocks Qwen-Image FP8 and klein 9B-class quality; a 24GB 4090 makes everything fast and is the recommended value tier. If Carter is buying, 16GB minimum, 24GB ideal. Flag: I do not have visibility into what GPU is in Carter's box, so this is a spec recommendation, not a "your machine can do X" claim.

6. Honest limitation to set expectations: for NATIVE SVG / true vector flat-icon output with brand consistency, the best tool is still an API (Recraft v3/v4), not a local model. If a specific deck needs crisp scalable vector iconography rather than raster art, the local pipeline should hand that off to Recraft or generate raster + auto-trace. Everything raster (which is most of our winning artifact style) stays local.

---

## SOURCES

- docs.comfy.org/development/comfyui-server/comms_overview
- docs.comfy.org/development/comfyui-server/api-examples
- github.com/Comfy-Org/ComfyUI/blob/master/script_examples/websockets_api_example_ws_images.py
- github.com/comfyanonymous/ComfyUI/blob/master/script_examples/websockets_api_example.py
- github.com/pydn/ComfyUI-to-Python-Extension (+ deepwiki.com/pydn/ComfyUI-to-Python-Extension)
- github.com/Chaoses-Ib/ComfyScript ; github.com/comfyorg/comfyscript ; pypi.org/project/comfy-script
- www.timlrx.com/blog/executing-comfyui-workflows-as-standalone-scripts
- huggingface.co/blog/flux-2 ; huggingface.co/docs/diffusers/en/api/pipelines/flux2
- huggingface.co/black-forest-labs/FLUX.2-klein-4B ; FLUX.2-klein-9B/blob/main/LICENSE.md ; FLUX.2-dev
- bfl.ai/blog/flux2-klein-towards-interactive-visual-intelligence ; bfl.ai/licensing ; bfl.ai/legal/non-commercial-license-terms
- marktechpost.com/2026/01/16/black-forest-labs-releases-flux-2-klein-compact-flow-models
- venturebeat.com/technology/black-forest-labs-launches-open-source-flux-2-klein (search snippet only, 403 on fetch)
- localaimaster.com/blog/flux-2-local-setup-guide ; /flux-vram-requirements-by-gpu ; /sdxl-vs-flux-local ; /best-gpu-for-image-generation
- willitrunai.com/blog/image-generation-vram-guide-2026 ; /flux-2-klein-9b-vram-requirements ; /stable-diffusion-vs-flux-2026
- botmonster.com/ai/how-to-set-up-flux-2-dev-locally-in-2026 ; /best-local-image-generation-models-2026
- apatero.com/blog/flux-gguf-quantization-8gb-vram-guide-2026 ; /flux-2-klein-apache-license-commercial-use
- docs.clore.ai/guides/image-generation/flux2-klein ; lucasgraphic.com/posts/flux2-klein-9b-kv-explained ; glm-image.cc/blog/flux-2-klein-english
- github.com/QwenLM/Qwen-Image (+ LICENSE, deepwiki 8.1-license-and-usage-rights) ; blog.comfy.org/p/qwen-image-in-comfyui-new-era-of ; sandner.art/qwen-image-and-edit-local-gguf-generations-with-lightning
- lovart.ai/blog/ai-image-models-compared-2026 ; aimagicx.com/blog/tested-10-ai-image-generators-best-use-cases
- flowith.io/blog/7-best-recraft-alternatives-ai-vector-graphics-icon-generation-2026 ; upsampler.com/blog/generate-svg-vector-art-ai-free-recraft-v4-2026
- runcomfy.com/comfyui-workflows/generating-transparent-images-with-layerdiffuse-in-comfyui ; developer.nvidia.com/blog/how-to-build-run-and-scale-high-quality-creator-workflows-in-comfyui ; openart.ai (universal multi-style PNG material workflow)
- mindstudio.ai/blog/claude-design-avoid-ai-slop-design-system ; forgehouse.ai/guides/avoid-ai-slop-design ; aiphotogenerator.net/blog/2026/02/negative-prompts-stable-diffusion-guide
- github.com/comfyanonymous/ComfyUI/issues/4812 ; Comfy-Org/ComfyUI issues #13139, #14162, #12786 ; Comfy-Org/desktop issue #1741 ; blog.comfy.org/p/dynamic-vram-in-comfyui-saving-local ; viewcomfy.com/blog/faster-comfy-cold-starts-with-memory-snapshot
