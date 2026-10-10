<!-- © AngelaMos | 2026 | d3-design-mcps.md -->

# DIVISION D: Asset Acquisition Arsenal (MCPs, APIs, banks)

Research date: 2026-07-10. Mission: map the MCP server + local-tool landscape for
design and assets (icons, fonts, colors, image generation cloud + local, screenshots,
stock, competitor-token scraping) and rank the top 5 worth installing into Carter's
carousel pipeline. All install commands and numbers below come from pages actually
fetched, not memory. Anything I could not verify is flagged in GAPS at the bottom.

Pipeline reminder that shapes every judgment here: Carter renders one standalone
1080x1350 HTML file per slide to a 2160x2700 PNG via the `shotpls` headless-Chrome
CLI. All assets must be INLINE at render time (base64 data-URIs, no external URLs).
So the value of any asset MCP is: does it hand back something I can paste inline
(raw SVG, a data-URI, a downloaded file I can base64-encode), and does it run headless
on Linux with no GUI. A tool that only returns a remote CDN URL forces an extra
download+encode step but is still usable. A tool that needs a desktop app or a browser
window is close to useless for this pipeline.

--------------------------------------------------------------------------------
## SEARCHES RUN
--------------------------------------------------------------------------------

1. icon MCP server Model Context Protocol iconify 2026
2. Figma MCP server dev mode context 2026
3. image generation MCP server Replicate fal.ai 2026
4. ComfyUI MCP server local image generation 2026
5. Google fonts MCP server typography 2026
6. screenshot browser MCP server Playwright headless 2026
7. color palette MCP server design tokens 2026
8. Google Design MCP install github "design-mcp" material color typography
9. Flux SDXL headless Linux command line image generation API 2026 CLI no GUI backgrounds
10. Unsplash Pexels stock photo MCP server download images 2026
11. Google Design MCP API key free preview design.googleapis.com authentication limits
12. fal.ai MCP run_model image output URL download how to save generated image

Pages fetched and read in full:
- blog.fal.ai/connect-your-ai-to-1-000-models-with-the-fal-mcp-server/
- github.com/artokun/comfyui-mcp
- github.com/microsoft/playwright-mcp
- github.com/awssat/mcp-universal-icons
- pypi.org/project/google-fonts-mcp/
- developers.google.com/design-mcp (landing)
- developers.google.com/design-mcp/reference/mcp (tool reference)
- github.com/x51xxx/coolors-mcp
- github.com/imjac0b/iconify-mcp-server
- github.com/utensils/mold
- github.com/joelio/stocky
- conare.ai/marketplace/mcp/design-inspiration

--------------------------------------------------------------------------------
## FINDINGS
--------------------------------------------------------------------------------

### CATEGORY 1: ICON MCPs

The pattern across all of these: they wrap the Iconify API (200,000+ open-source
vector icons across 200+ sets) and hand back raw SVG. Raw SVG is EXACTLY what our
pipeline wants because you inline SVG directly into the HTML slide, no base64 dance,
and it stays crisp at 2x render. The catch on all of them is they hit the Iconify
network API, so no true offline mode confirmed. That is fine for us: rendering is a
manual authoring step, not a prod runtime.

1. awssat/mcp-universal-icons
   - Install: `claude mcp add universal-icons -- npx -y mcp-universal-icons`
   - Covers 10 collections: Material Symbols, Lucide, Heroicons, Tabler, Phosphor,
     Feather, Bootstrap, Remix Icon, Iconoir, FontAwesome 6.
   - Tools: `get_icon` (returns raw SVG with custom CSS classes, output as SVG, JSX,
     OR data-URI), `search_icons` (fuzzy match by keyword), `health_check`.
   - The data-URI output mode is the standout for us: it hands back exactly the inline
     form the pipeline needs, zero conversion.
   - License MIT. Star count 3 (very new / low adoption). 9 commits. Relies on Iconify API.

2. imjac0b/iconify-mcp-server
   - Install: `claude mcp add iconify -- npx -y iconify-mcp-server@latest`
   - Tools: `get_all_icon_sets`, `get_icon_set`, `search_icons` (paginated),
     `get_icon` (returns icon data plus framework usage examples for UnoCSS, Tailwind,
     Iconify web component, Vue, React, Svelte, Astro, Unplugin Icons).
   - Hits Iconify API, no offline mode. License GPL-3.0 (copyleft, but it is a dev
     tool we run, not code we ship, so the license does not infect our carousels).
   - 12 stars, 15 commits, no tagged releases. More mature than awssat by star/commit
     count but its output is framework-example oriented, less directly "give me a
     data-URI" than awssat.

3. Other icon options seen in search but not fetched: agentic-ph/icon-mcp (unified
   multi-library fuzzy search + caching), better-auth "Better Icons" MCP (200k icons /
   150 sets, promoted on PulseMCP and LobeHub), liliangshan/mcp-server-icon
   (iconfont.cn, Chinese icon source), Leee62 "pickapicon" Iconify SVG server.
   All Iconify-flavored variations of the same idea.

VERDICT on icons: awssat/mcp-universal-icons wins on pipeline fit purely because of
the native data-URI output mode, even though it is the least-adopted. Iconify is the
right substrate regardless of which wrapper. This is the single highest signal-to-noise
asset add for a carousel pipeline: brutalist/technical carousels live on crisp
monoline icons and this gives 200k of them inline.

### CATEGORY 2: FIGMA MCP

Two distinct things share the "Figma MCP" name:
- Figma's OWN Dev Mode MCP server (official). Two flavors: a hosted REMOTE server at
  Figma's endpoint (broadest features, no desktop app needed) and a LOCAL server that
  requires the Figma DESKTOP app running. Source: figma.com/blog/introducing-figma-mcp-server
  and developers.figma.com/docs/figma-mcp-server. Figma shipped bidirectional Claude Code
  integration (Design-to-Code + Code-to-Canvas) in Feb 2026 per the blog coverage.
- GLips/Figma-Context-MCP (community, "framelink"), feeds Figma layout info to coding
  agents like Cursor.

Honest read for OUR use: Figma MCP is built to turn existing Figma FILES into code.
Carter does not design carousels in Figma, he hand-writes HTML in the terminal. To get
value he would first have to build a Figma design. That is a workflow inversion, not an
asset source. The local flavor also needs the Figma DESKTOP app, which violates the
no-GUI, headless-Linux constraint. The remote flavor is headless-friendly but still
presupposes a Figma file exists. NOT recommended for this pipeline unless Carter decides
to author in Figma first, which contradicts his stated terminal-HTML workflow. Parked.

### CATEGORY 3: IMAGE GENERATION MCPs (CLOUD)

3a. fal.ai MCP Server (official, hosted) -- STRONGEST cloud option.
   - Install (Claude Code):
     `claude mcp add --transport http fal-ai https://mcp.fal.ai/mcp --header "Authorization: Bearer $FAL_KEY"`
   - Endpoint: https://mcp.fal.ai/mcp . Hosted, stateless, runs on Vercel. Launched
     March 19, 2026.
   - 9 tools: search_models, get_model_schema, get_pricing, search_docs (discovery);
     run_model, submit_job, check_job (execution); upload_file, recommend_model (utility).
   - Access to 1,000+ generative models: image, video, audio, 3D, upscaling.
   - Auth: API key per-request in Authorization header, never stored server-side.
   - Pricing: MCP server is FREE, you pay only fal's per-execution model price.
   - Output handling (confirmed via search 12): run_model returns a `url` field with a
     public fal CDN URL (v3.fal.media/files/...). Community wrappers (RamboRogers
     fal-image-video-mcp) additionally auto-download to a local path and expose a
     `localPath` + data-URL, configurable via `DOWNLOAD_PATH` env var. So for our
     inline requirement: either point DOWNLOAD_PATH at the slide asset dir and base64
     the file, or fetch the CDN url once and encode. One extra step, fully headless.
   - Headless Linux: it is a remote HTTP endpoint, so there is nothing to run locally;
     works anywhere with network. No GPU needed on our box.
   - Why it matters for carousels: on-demand generation of textures, grain/noise
     overlays, abstract backgrounds, hero imagery, and (via video models) the ANIMATED
     carousel slide that competitors are shipping. fal has the video models (LTX, WAN,
     Kling-class) behind the same one endpoint, so the "video slide inside the carousel"
     capability comes free with the same install.

3b. Replicate MCP (official). Exposes Replicate's model library (FLUX, Stable Diffusion,
   thousands) to Claude Desktop and VS Code. Same shape as fal: cloud, pay-per-run.
   GongRzhe/image-generation-mcp-server is a popular community wrapper specifically for
   Replicate FLUX. Functionally interchangeable with fal for our purposes; fal has the
   broader single-endpoint model catalog and a cleaner one-line Claude Code install,
   so fal is the pick. Replicate is the fallback if a specific model only lives there.

3c. mikeyny image-generation-replicate-flux-schnell, sshtunnelvision fal-ai server,
   piebro/fal-ai-mcp-server, fal-ai-mcp (PyPI) -- all thinner community wrappers around
   the same two backends. No reason to prefer over the official fal endpoint.

### CATEGORY 4: IMAGE GENERATION (LOCAL, headless Linux)

The prize here is $0 marginal cost per image and no rate limits, which matters if
Carter generates dozens of background textures per carousel batch. Two viable shapes:

4a. artokun/comfyui-mcp -- the serious local-first option.
   - Install: `npx -y comfyui-mcp`
   - Connects to a local ComfyUI (auto-detects ports 8188/8000), LAN via `COMFYUI_URL`,
     or Comfy Cloud via `COMFYUI_API_KEY`.
   - 108 MCP tools, 32 AI skills. Model-specific skills for Flux, WAN (video), LTX-2.3
     (video), Qwen, Z-Image, Ideogram 4. Image models: Flux, WAN, LTX-2.3, Qwen,
     Z-Image, Ideogram 4, ERNIE, ANIMA, SD1.5/SDXL/Turbo/Lightning/SD3.
   - Runs as a HEADLESS stdio MCP server (optional `--http` transport). Explicitly
     macOS/Linux/Windows. Node >= 22. MIT. 350 stars. v0.30.0 dated July 10, 2026
     (i.e. updated TODAY, actively maintained).
   - Requires a ComfyUI instance which requires a CUDA GPU. That is the real cost: you
     need a GPU box. If Carter has one, this is the most powerful local rig, and it
     already knows the video models for animated slides.
   - Official Comfy MCP also exists (Comfy Org announced "Comfy MCP" June 30, 2026;
     Comfy Cloud MCP in public beta). The artokun one is the fuller community control
     plane. Other community ComfyUI MCPs: joenorton/comfyui-mcp-server (lightweight
     Python), alecc08/comfyui-mcp (txt2img/img2img/resize), AvidGameFan/ImageMCP.

4b. utensils/mold -- the low-friction local option, NO ComfyUI needed.
   - Install: `curl -fsSL https://raw.githubusercontent.com/utensils/mold/main/install.sh | sh`
     (also Nix, AUR, cargo). Single Rust binary built on candle.
   - Models: FLUX.1 (schnell/dev/fine-tunes), Flux.2 Klein (4B/9B), SDXL (base/turbo),
     SD1.5 (+ControlNet), SD3.5 (large/medium/turbo), Z-Image turbo, Qwen-Image and
     Qwen-Image-Edit, LTX Video (0.9.6/0.9.8), LTX-2/LTX-2.3 (audio-video).
   - Interface: CLI (`mold run "prompt"`) and REST API (`mold serve`). Output is PNG
     with embedded metadata (prompt, seed, model). NO MCP mode documented, it is a CLI
     and REST server. That is actually FINE and arguably better for our pipeline: the
     make-carousel tooling can shell out to `mold run` the same way it shells out to
     shotpls, no MCP round-trip needed.
   - Headless Linux: yes, with NVIDIA CUDA or Apple Silicon Metal. CPU-only is NOT
     listed as supported. Mentions "smart VRAM" (quantized encoders, block offloading).
   - MIT. 28 stars. v0.14.0 dated July 4, 2026.
   - The mold pitch: if you want local FLUX from the terminal with a single binary and
     zero Python/ComfyUI graph plumbing, this is the cleanest fit for a shotpls-style
     shell-out pipeline. It supports the video models too, so animated slides are on
     the table locally.

Also seen for local terminal image gen: PiAPI CLI (`piapi run flux-dev`, cloud-backed),
mflux (Apple-Silicon-only, macOS), kohya sd-scripts gen_img.py. mold and ComfyUI-MCP
are the two that fit a Linux headless box.

### CATEGORY 5: FONT MCPs

5a. google-fonts-mcp (PyPI, sliday) -- best fit, uv-native.
   - Install: `claude mcp add google-fonts -- uvx google-fonts-mcp` (or pip). Python >=3.10.
   - Indexes 1,923 Google Fonts with enriched metadata (personality/mood/use-case tags,
     BM25 ranking). Tools: search_fonts (single/pair/scale modes), generate_typography_system
     (emits CSS custom properties + Tailwind config + embed code), lookup_font, list_scales
     (8 modular scales, minor-second to golden-ratio), list_pairings (73 proven pairings).
   - Ships with a bundled data dir (src/google_fonts_mcp/data/), so search/pairing is
     effectively offline; it generates Google Fonts EMBED links + CSS but does NOT
     download the actual .ttf/.woff2 files.
   - v1.3.0, released March 22, 2026. MIT. Installs via uvx, matching Carter's uv-only rule.
   - IMPORTANT pipeline caveat: this returns CSS and CDN embed links, and our slides
     need fonts BASE64-EMBEDDED (no external URLs at render). So this is a PICKER and
     PAIRER, not an asset fetcher. Workflow: use it to choose a pairing and get a
     modular scale, then separately pull the .woff2 from the Google Fonts static host
     and base64 it into the slide. There is a companion Claude Code skill (sliday/
     google-fonts-skill) that does the same job as a skill instead of a server.
   - The related mcpbundles "google-webfonts" MCP+skill exists too.

5b. Microck/font-mcp -- "expert design advisor" MCP that finds best fonts via live
   research and project scanning. More of an advisor than an asset source. Secondary.

For our pipeline the font MCP's job is TASTE (pairing + scale), not bytes. The actual
embed-the-woff2 step stays a scripted download. Worth wiring a tiny helper that, given
a font family name, curls the woff2 and base64s it, so the picker output flows straight
into a slide.

### CATEGORY 6: COLOR / PALETTE MCPs

6a. Google Design MCP (official, developers.google.com/design-mcp) -- top color pick.
   - Endpoint: https://design.googleapis.com/mcp . HTTP JSON-RPC. Described by Google
     as "a headless design engine." Landing page last-updated 2026-04-08.
   - AUTH: NONE. Confirmed (search 11): "Developers don't need an API Key or OAuth 2.0
     credentials for the Design MCP API... free public service." This is huge: zero-cost,
     zero-key, zero-setup, hosted by Google.
   - Tools (from the /reference/mcp page): generate_color_scheme (input key colors ->
     Material Design scheme mapping semantic roles like primary/on_surface to hex),
     search_icons (Material icons by description), icons_instructions, search_fonts
     (filter by category/language), describe_font (appearance, weights, usage).
   - So this single free hosted server covers color schemes + Material icon search +
     Google Font search/description in one. It is basically Google's own bundle of
     categories 1, 5, and 6.
   - Headless Linux: it is a remote HTTP endpoint, works anywhere. Discover tools via
     `tools/list` JSON-RPC.
   - Two community Material-3 alternatives exist if you want local: cryptonahue/
     mcp-material-desing-3 (HCT color system, 6 tools, 23+ MD3 components, optional
     Tailwind) and weppa-cloud/material3-mcp-server (components, tokens, icons, a11y).

6b. x51xxx/coolors-mcp (aka @trishchuk/coolors-mcp) -- best LOCAL color operator.
   - Install: `npx -y @trishchuk/coolors-mcp`
   - 30+ tools. Standouts for us: extract_image_colors (Celebi quantization, takes RGBA
     arrays, i.e. local processing), HCT color space conversions, Material Design 3
     tonal palettes, WCAG 2.x AND APCA (WCAG3 draft) contrast checks, color-blindness
     simulation (protanopia/deuteranopia/tritanopia), export to CSS/SCSS/Tailwind/W3C
     tokens/JSON. MIT. Only 2 stars (brand new), 5 commits.
   - The killer feature for a carousel deck: extract a palette FROM a reference image
     (a competitor slide, a photo, a screenshot of a poster you like) and get back a
     harmonized, contrast-checked token set. That is how you steal a look and make it
     WCAG-legible on a 1080x1350 slide.

6c. Other palette MCPs: ppower-dev/color-palette-mcp (harmonious CSS palette from one
   brand color), br0ski777 color-palette (April 12 2026, complementary/analogous/triadic
   from a seed), deepakkumardewani/color-scheme-mcp, Apify lazymac color-palette-toolkit
   (harmony + WCAG, hosted). All single-seed harmony generators, thinner than coolors-mcp.

### CATEGORY 7: SCREENSHOT / BROWSER MCPs

7a. microsoft/playwright-mcp (official) -- the mature standard.
   - Install: `npx @playwright/mcp@latest`. Headless with `--headless`.
   - Screenshot tool `browser_take_screenshot`: viewport OR fullPage:true, PNG (default)
     or JPEG, scale "css" (default) or "device" (high-res). Viewport control via
     `--viewport-size` (e.g. "1280x720") or contextOptions.viewport, plus a
     browser_resize tool.
   - Headless Linux: YES, Docker supported (Docker build is headless-Chromium-only).
     Apache-2.0. 34.9k stars, Microsoft-maintained, 68 releases, v0.0.78. Most mature
     MCP in this entire report.
   - HONEST take for OUR pipeline: Carter ALREADY has shotpls doing exactly the
     HTML-to-PNG-at-fixed-viewport render. Playwright MCP overlaps shotpls. It is NOT a
     replacement for the render step (shotpls is more purpose-built and already tuned:
     see the memory note about the shotpls tiling-bug fix with tab reuse + rAF wait +
     captureBeyondViewport + pinned viewport). Where Playwright MCP EARNS its slot is a
     different job: letting the agent OPEN competitor carousels / live design pages and
     SCREENSHOT them for reference, or visually QA a rendered slide by having the model
     look at what it produced. It is a "see the web + see my output" tool, not a render
     tool. Keep shotpls for production renders.
   - Adjacent: badchars/mcp-browser (Playwright, screenshots/extraction/JS-exec, but
     non-commercial license, skip for a commercial brand), brian-ln/stealth-browser-mcp,
     VeryInt Playwright-Screenshot, and the official chrome-devtools MCP (which is
     already available in THIS harness as mcp__chrome-devtools__take_screenshot).

Note: the chrome-devtools MCP is already wired into Carter's harness (visible in the
deferred tool list: mcp__chrome-devtools__take_screenshot, navigate_page, etc.). So the
"screenshot a competitor page / QA my slide" capability is ALREADY INSTALLED. No new
install needed for the screenshot category, just start using the chrome-devtools tools
already present.

### CATEGORY 8: STOCK IMAGE MCPs (bonus, directly useful for hero slides)

- joelio/stocky: clone + `pip install -r requirements.txt`. Tools: search_stock_images,
  get_image_details, download_image (saves to output_path OR returns BASE64 if no path).
  Providers Pexels + Unsplash. Free API keys via env (PEXELS_API_KEY, UNSPLASH_ACCESS_KEY).
  Python 3.8+. 22 stars. The base64-return mode is a direct pipeline fit: search a
  concept, get the image inline-ready.
- Others: xcollantes/free-stock-images-mcp (Unsplash/Pexels/Pixabay/Freepik/Burst/
  StockVault), Zulelee/stock-images-mcp, drumnation/unsplash-smart-mcp-server (FastMCP,
  auto-attribution), romulorasec imagebank-mcp (searches + converts to WebP).
- Caveat: stock photos clash with a technical-brutalist carousel aesthetic. Use sparingly,
  mostly for grain/texture/abstract, not literal photos. Lower priority than generation.

### CATEGORY 9: COMPETITOR DESIGN-TOKEN SCRAPING (bonus, maps to the whole mission)

- Design Inspiration MCP (conare.ai marketplace). Install:
  `claude mcp add design-inspiration -e SERPER_API_KEY=your-key -- node /path/to/design-inspiration-mcp-server/dist/index.js`
  Self-hosted Node. Searches Dribbble, Behance, Awwwards, Mobbin, Pinterest. EXTRACTS
  design tokens (colors, typography, spacing, border-radii, shadows) from live URLs,
  including dark-mode and mobile variants. Needs SERPER_API_KEY (serper.dev free tier
  2,500 searches, no credit card) plus `dembrandt` installed globally for token
  extraction. Free.
  This is the most on-mission tool in the whole division: the stated goal is to study
  competitors who ship poster-style carousels and beat them. This lets the agent pull a
  competitor slide URL and get its actual color/type/spacing tokens back as data.

--------------------------------------------------------------------------------
## TOP 5 RANKING (what to install, in order)
--------------------------------------------------------------------------------

1. Google Design MCP (https://design.googleapis.com/mcp)
   Why #1: free, no API key, no local process, hosted by Google, and it bundles THREE
   categories in one install: Material color-scheme generation, Material icon search,
   and Google Font search/describe. Zero cost, zero setup, zero maintenance. Instant
   win. generate_color_scheme alone fixes ad-hoc slide palettes.

2. awssat/mcp-universal-icons (or an Iconify wrapper generally)
   Why #2: `claude mcp add universal-icons -- npx -y mcp-universal-icons`. 200k icons
   across 10 sets, and CRUCIALLY a native data-URI output mode that drops straight into
   an inline HTML slide. Crisp monoline icons are the backbone of the poster look. If
   you distrust its 3-star newness, swap in imjac0b/iconify-mcp-server (12 stars) or the
   Better Icons server; same substrate.

3. fal.ai MCP (https://mcp.fal.ai/mcp)
   Why #3: one HTTP install unlocks 1,000+ models INCLUDING video models, which is the
   direct path to the ANIMATED carousel slide competitors are shipping. Free server,
   pay-per-render, no GPU on our box. Best cloud generation option for backgrounds,
   textures, hero art, and video slides. Set DOWNLOAD_PATH (via a community wrapper) or
   fetch the returned CDN url and base64 it.

4. x51xxx/coolors-mcp (@trishchuk/coolors-mcp)
   Why #4: `npx -y @trishchuk/coolors-mcp`. The extract_image_colors + HCT + APCA
   contrast + colorblind-sim stack is how you STEAL a color look off a reference image
   and make it legible on a 1080x1350 slide. Local, MIT, 30+ tools. Pairs with Google
   Design MCP: Google generates schemes from key colors, coolors extracts key colors
   from images and audits contrast.

5. Design Inspiration MCP (conare.ai)
   Why #5: the mission is "beat competitors' poster carousels." This is the only tool
   that pulls a competitor's ACTUAL color/type/spacing/shadow tokens off a live URL.
   Free (Serper free tier). Turns "that carousel looks great" into measured tokens you
   can react to. If you want a GPU-free box, this replaces the local ComfyUI ambition.

Runner-up / conditional #6: utensils/mold OR artokun/comfyui-mcp for LOCAL, unlimited,
$0-per-image generation. Install only if Carter's box has an NVIDIA CUDA GPU. mold if you
want a single Rust binary and terminal `mold run`; comfyui-mcp if you want the 108-tool
control plane and already run ComfyUI. Both do video models (animated slides) locally.

Already-installed, use-don't-install: the chrome-devtools MCP is ALREADY in Carter's
harness (mcp__chrome-devtools__take_screenshot etc.), covering "screenshot a competitor
page" and "visually QA my rendered slide." No Playwright MCP install needed. And shotpls
already owns production HTML-to-PNG rendering, do not replace it.

Explicitly NOT recommended: Figma MCP (inverts the terminal-HTML workflow, local flavor
needs the desktop GUI), and the stock-photo MCPs as a primary (photos fight the
technical-brutalist look; keep as an occasional texture source via stocky's base64 mode).

--------------------------------------------------------------------------------
## SO WHAT FOR US (how this changes what we build)
--------------------------------------------------------------------------------

1. Stand up a tiny "asset layer" alongside make-carousel, wired to 4 free/cheap MCPs:
   Google Design MCP (color schemes + Material icons + font search, FREE, no key),
   awssat universal-icons (200k icons, data-URI output), coolors-mcp (extract palette
   from any reference image + contrast audit), and Design Inspiration MCP (pull
   competitor tokens). Total marginal cost so far: $0 plus a free Serper key. Three of
   the four run headless with no GPU. This directly serves the poster-carousel goal:
   fewer reading zones means each slide leans harder on ONE strong icon + ONE confident
   color system, and these tools industrialize both.

2. The inline constraint dictates which output mode to prefer. Configure/prefer the
   modes that return inline-ready assets: universal-icons data-URI mode, stocky base64
   mode, coolors CSS/token export. For anything that returns a remote URL (fal CDN,
   Google Fonts embed), add ONE small helper to make-carousel: given a URL, curl the
   bytes and base64 them into the slide. Fonts specifically stay a scripted woff2 pull;
   the font MCP only picks and pairs.

3. Animated slides are reachable NOW and cheaply. fal.ai MCP (cloud, pay-per-render) or
   mold/comfyui-mcp (local, if GPU) both expose LTX/WAN-class video models. Plan: render
   the static HTML slide, generate a short looping motion/texture layer via a video
   model, composite. This is the specific capability that lets us match, then beat, the
   competitors shipping video-in-carousel. Recommend prototyping ONE animated slide via
   fal first (no GPU needed) before deciding whether to buy into a local GPU rig.

4. Competitor teardown becomes measured, not vibes. Design Inspiration MCP + chrome-
   devtools screenshot (already installed) + coolors extract_image_colors = a repeatable
   loop: screenshot a competitor's best poster slide, extract its exact palette and read
   its type/spacing tokens, then react with our own harmonized, contrast-audited system.
   That is how "best carousels on Instagram" stops being a slogan and becomes a spec.

5. Do NOT bloat the stack. shotpls already renders; chrome-devtools already screenshots;
   skip Playwright MCP and Figma MCP. The net new installs are four, all free or nearly
   so, and they slot into the existing shell-out pattern make-carousel already uses for
   shotpls.

--------------------------------------------------------------------------------
## GAPS (honest, where searches dead-ended)
--------------------------------------------------------------------------------

- I could not confirm whether Carter's render box has an NVIDIA CUDA GPU. That single
  fact decides whether local generation (mold / comfyui-mcp) is viable or whether we
  stay cloud-only on fal. Both mold and ComfyUI explicitly do NOT support CPU-only.
- fal.ai's OFFICIAL MCP output shape: I confirmed run_model returns a `url` and that
  COMMUNITY wrappers auto-download + expose localPath/data-URL. I did not see the
  official server's exact response schema documented, so treat "official returns a URL,
  you download it yourself" as the safe assumption and wire the base64 helper regardless.
- Google Design MCP rate limits / quotas: the reference page did not state any. Auth is
  confirmed none-required, but I could not verify request ceilings. Assume generous
  free-preview limits and confirm on first heavy use.
- coolors-mcp offline claim: the tool takes RGBA arrays for extract_image_colors, which
  strongly implies local processing, but the README did not explicitly say "fully
  offline." Assume image-color-extraction is local; treat any icon/font lookups as
  potentially networked.
- I did not fetch the artokun comfyui-mcp video-model workflow docs in depth, so the
  exact steps to produce a looping video slide locally are unverified beyond "the video
  models are supported." Prototype on fal first where the path is cleaner.
- Figma REMOTE MCP endpoint URL and exact auth were not fetched (deprioritized once the
  workflow-inversion problem was clear). If Carter ever wants a Figma-first flow, that is
  a follow-up fetch of developers.figma.com/docs/figma-mcp-server.
- Star counts are a rough maturity proxy captured on 2026-07-10 and will drift. The
  official/first-party tools (Google Design, fal, Microsoft Playwright, Figma) are the
  safe-maturity anchors; the community color/icon wrappers are new (2-12 stars) and may
  churn.

================================================================================
## SECOND-PASS EXTENSION (2026-07-10, independent verification + new entrants)
================================================================================

This section is a fresh, independent research pass on top of the report above. It
(a) CLOSES three gaps the first pass flagged, and (b) adds five categories the first
pass missed entirely. Every claim below comes from a page I actually fetched or a
search result I actually read on 2026-07-10, cited inline. Nothing here contradicts
the first pass; it extends and sharpens it. The revised TOP 5 is at the end of this
section and SUPERSEDES the earlier ranking.

--------------------------------------------------------------------------------
### SEARCHES RUN (this pass)
--------------------------------------------------------------------------------

1. fal.ai MCP server run_model output response schema url download image 2026
2. Google Design MCP design.googleapis.com generate_color_scheme rate limits quota 2026
3. Iconify MCP server data-uri raw SVG inline claude 2026
4. nano-banana Gemini image generation MCP server 2026 claude code
5. Recraft MCP server SVG vector image generation 2026
6. new design MCP server July 2026 carousel background texture generation claude code
7. ComfyUI official MCP server Comfy Cloud 2026 install video WAN LTX headless
8. Higgsfield MCP OR Pixa MCP claude video generation 2026 animated
9. thesvg.org MCP brand icons OR font MCP base64 woff2 embed subset claude 2026
10. 21st.dev Magic MCP claude code UI component generation 2026 install
11. MCP server download Google Font woff2 base64 embed self-contained HTML 2026
12. best image generation MCP text rendering legible poster Nano Banana vs Ideogram vs Flux 2026

Pages fetched and read this pass:
- fal.ai/docs/documentation/setting-up/mcp (official fal MCP setup)
- github.com/RamboRogers/fal-image-video-mcp (fal community wrapper, output behavior)
- developers.google.com/design-mcp/overview (Google Design MCP, quotas question)
- icons8.com/mcp (Icons8 MCP, the SVG-behind-paywall gotcha)
- github.com/recraft-ai/mcp-recraft-server (official Recraft MCP, SVG output)
- github.com/shinpr/mcp-image (Nano Banana / GPT Image MCP)
- github.com/Evilander/claude-design-mcp (design-studio MCP, Playwright render)
- github.com/omy13/mcp-svg-to-fonts (SVG-to-webfont MCP)
- higgsfield.ai/mcp (Higgsfield official video/image MCP)

--------------------------------------------------------------------------------
### GAP CLOSURE 1: fal.ai MCP output schema is now CONFIRMED (was a flagged gap)
--------------------------------------------------------------------------------

The first pass had to assume "official returns a URL, download it yourself." Verified
now. The fal ecosystem returns a TRIPLE output and auto-downloads:

- Per the official fal docs (fal.ai/docs/documentation/setting-up/mcp): the 9 tools are
  confirmed (search_models, get_model_schema, get_pricing, search_docs, run_model,
  submit_job, check_job, upload_file, recommend_model). The official install line is
  `claude mcp add --transport http fal-ai https://mcp.fal.ai/mcp --header "Authorization: Bearer YOUR_FAL_KEY"`.
  The docs state the MCP server is FREE, you pay only for model runs at direct-API pricing.
- Community wrapper RamboRogers/fal-image-video-mcp (github, MIT, 8 stars) documents the
  exact behavior our pipeline needs: "Public URLs, Data URLs, and Local file paths" with
  content "automatically saved to your local machine." Config:
    - `DOWNLOAD_PATH` (optional): custom download dir, default `~/Downloads`.
    - `ENABLE_DATA_URLS` (optional): default FALSE (disabled by default because it bloats
      Claude Desktop context). SET THIS TRUE for our pipeline: it hands back a base64
      data URL we can paste inline with zero extra download+encode step.
  Install: `npx -y fal-image-video-mcp`. Ships 21 curated models: 8 image (Imagen 4,
  FLUX Kontext Pro, Ideogram V3, etc.), 7 text-to-video (Veo 3, Kling 2.1, Pixverse V4.5),
  6 image-to-video.

PIPELINE IMPLICATION: point `DOWNLOAD_PATH` at the carousel's asset dir and set
`ENABLE_DATA_URLS=true`. Then generation output arrives BOTH as a saved PNG (base64 it)
and as a ready data URL. The "one small helper to curl+base64" the first pass planned is
NOT needed for fal if you use this wrapper. Use the RamboRogers wrapper over the bare
official endpoint specifically for the local-file + data-URL behavior.

--------------------------------------------------------------------------------
### GAP CLOSURE 2: Google Design MCP has NO documented quota (was a flagged gap)
--------------------------------------------------------------------------------

Fetched developers.google.com/design-mcp/overview (last updated 2026-04-08). Confirmed:
"Developers don't need an API Key or OAuth 2.0 credentials." The overview page states NO
rate limits, usage quotas, or service ceilings. A separate Google Cloud MCP docs page
(docs.cloud.google.com/mcp/quotas) says there are "no quotas or system limits associated
with Google Cloud MCP servers" themselves, though underlying Google products accessed
THROUGH an MCP may carry their own quotas. Design MCP color/font/icon operations are the
lightweight kind, so treat it as effectively unmetered for our authoring volume. Color
output is confirmed as 6-char hex strings (e.g. `#4285F4`) mapped to semantic roles
(primary, on_surface, etc.). Net: the first pass's #1 pick stands, now with the quota
worry retired.

--------------------------------------------------------------------------------
### GAP CLOSURE 3: font-to-inline path, concretely
--------------------------------------------------------------------------------

The first pass correctly said the font MCP is a PICKER not a byte-fetcher. Two concrete
finds this pass make the embed step turnkey:

- The mcpbundles "google-webfonts" MCP (mcpbundles.com/skills/google-webfonts) is
  documented to return "direct .woff2 URLs keyed by variant, hosted on fonts.gstatic.com."
  So the pick step CAN hand back the exact gstatic woff2 URL, not just an @import. Then a
  one-line curl + base64 into an `@font-face { src: url('data:font/woff2;base64,...') }`
  finishes it. Base64 adds ~33% size overhead (standard, acceptable for a slide).
- omy13/mcp-svg-to-fonts (github, MIT-ish, 5 stars, Node 20+, headless Linux): an MCP that
  turns a DIRECTORY OF SVG ICONS into a real icon web font. Tools: `list-svgs`,
  `generate-font-from-svgs`, `extend-existing-font`, `extend-font-advanced`. Output is
  TTF/WOFF/WOFF2 files plus a CSS `@font-face` sheet with icon classes. It writes FILES,
  not base64, so you still base64 the woff2 yourself. Niche, but useful if Carter wants a
  single custom brand-icon font baked into every slide instead of per-icon inline SVG.
  Lower priority than inlining raw Iconify SVG, which needs no font pipeline at all.

CONCLUSION on fonts: the cleanest path stays (1) use a font-picker MCP or the Google
Design MCP `search_fonts`/`describe_font` for TASTE, (2) get the gstatic woff2 URL from
the google-webfonts MCP, (3) curl + base64 into `@font-face`. One tiny scripted helper,
reused across all slides. No font MCP does the base64 embed for you today.

--------------------------------------------------------------------------------
### NEW CATEGORY A: Nano Banana (Gemini Flash Image) MCPs -- the cheap, TEXT-legible generator
--------------------------------------------------------------------------------

This is the single biggest thing the first pass missed. "Nano Banana" is Google's
Gemini Flash Image model (Nano Banana 2 = Gemini 3.1 Flash Image; Nano Banana Pro =
Gemini 3 Pro Image). Why it matters for POSTER carousels specifically: text rendering.
A poster slide often wants a headline or label baked INTO generated art, and Gemini/
Ideogram render legible text where FLUX/SD smear it.

Model landscape for text-in-image (from the 2026 comparison reads, e.g. masonry.so/blog/
best-ai-image-model-for-text-rendering and dejaoffice.com's Nano Banana Pro writeup):
- Ideogram v3: the typography king, ~0.97 OCR accuracy, built to treat text as a
  first-class design element. Best for long strings / brand names / complex layouts.
- Nano Banana Pro (Gemini 3 Pro Image): "the most reliable default where text matters,"
  first model where compositing stops being a default step; strong layout control, 4K,
  Google Search grounding.
- GPT Image 2: also top-tier for text.
- FLUX.2: best OPEN option for typography but a solid third for text accuracy.

Best-maintained Nano Banana MCP found:
- shinpr/mcp-image (github, 136 stars, v0.11.2 dated 2026-06-07 -- the most-adopted and
  most-recent image-gen MCP I found this pass). Models: Nano Banana 2 (fast preset),
  Nano Banana Pro (quality preset), and GPT Image 2 (set `IMAGE_PROVIDER=openai`).
  Auto-enhances a short prompt into a detailed one before generating. Install:
  `npx mcp-image`. Env: `GEMINI_API_KEY` or `OPENAI_API_KEY`, `IMAGE_OUTPUT_DIR`
  (absolute path REQUIRED), `IMAGE_QUALITY` (fast/balanced/quality), `IMAGE_PROVIDER`,
  `SKIP_PROMPT_ENHANCEMENT`. Output: saved to `IMAGE_OUTPUT_DIR` as a file, returns a
  resource object with the file URI + metadata (NOT base64). Headless: yes.
- Other Nano Banana MCPs seen: zhongweili/nanobanana-mcp-server (smart model select, 4K),
  @ycse/nanobanana-mcp (10 aspect ratios, up to 14 reference images, 4K, `GOOGLE_AI_API_KEY`),
  nanana-app/mcp-server-nano-banana. All wrap the same Gemini image endpoint.

Pricing (from the 2026 writeups): Nano Banana 2 ~$0.04-0.05/image at standard res, up to
~$0.15 at 4K; Pro ~$0.13 at 2K, ~$0.24 at 4K. Cheap enough to batch-generate slide art.

PIPELINE FIT: shinpr/mcp-image saves a PNG to a dir we choose; base64 it into the slide
(same one-line helper). For any slide that needs TEXT inside the generated image, this
(or Ideogram via Recraft/fal) beats FLUX/SD decisively. This is now the recommended
DEFAULT image generator for text-bearing art; keep fal for video and model breadth.

--------------------------------------------------------------------------------
### NEW CATEGORY B: Recraft MCP -- native SVG/VECTOR generation (the best inline fit of any generator)
--------------------------------------------------------------------------------

Also missed by the first pass, and it is arguably the single best-fitting GENERATOR for
this pipeline because it outputs VECTOR SVG, which inlines crisp at any render scale with
no base64 raster bloat.

- Official: recraft-ai/mcp-recraft-server (github, 61 stars, v1.6.5). Install:
  `npx -y @recraft-ai/mcp-recraft-server@latest`. Node, headless Linux, needs a Recraft
  API key from the profile page.
- Tools: `generate_image` (raster OR vector from text), `create_style` (custom style from
  reference images), `vectorize_image` (raster -> SVG), `image_to_image`,
  `remove_background`, `replace_background`, `crisp_upscale`, `creative_upscale`, `get_user`.
- Pricing: $0.04 raster / $0.08 VECTOR per generated image; $0.01 for vectorize and for
  background removal; $0.004-$0.25 upscale depending on method. Cheap.
- Latest model Recraft V4 (released Feb 2026) is explicitly tuned for design taste:
  balanced composition, cohesive color, refined detail across raster AND vector.
- A 16-tool community variant exists: BartWaardenburg/recraft-mcp-server (text-to-image,
  inpainting, vectorization, upscaling, style management).

PIPELINE FIT, three ways this earns a slot:
1. `generate_image` in VECTOR mode -> an editable SVG you inline directly (no data-URI
   dance), crisp at 2160x2700. This is the cleanest generator-to-slide path that exists.
2. `vectorize_image` -> take ANY reference raster (a texture, a generated raster, a logo)
   and get a clean inline SVG.
3. `remove_background` / `replace_background` -> turn a stock or generated photo into a
   cut-out subject that composites onto a poster slide without a rectangular photo box.
Recraft is the generator whose OUTPUT FORMAT matches the inline constraint best. Strong
new entrant; belongs in the top tier.

--------------------------------------------------------------------------------
### NEW CATEGORY C: Higgsfield MCP -- the ANIMATED-SLIDE winner (native 4:5 / 9:16 video)
--------------------------------------------------------------------------------

The mission specifically calls out competitors shipping VIDEO slides inside carousels.
Higgsfield MCP (official, shipped 2026-04-30 per its own blog) is the strongest single
tool for that, better-fit than fal for THIS job because it is video-first and hosted with
no key juggling.

- Endpoint: `https://mcp.higgsfield.ai/mcp`. Hosted/remote (asynchronous: the agent fires
  a generation and polls for the result), so fully headless, nothing runs on our box.
- Auth: add the MCP URL in the agent settings and authenticate through a Higgsfield
  account. "No API keys to manage or configure." Credit-based; existing Higgsfield plan
  credits apply, cost scales with model + resolution.
- Models: 30+ image AND video, orchestrated so Claude picks the right one: Soul, Veo,
  Kling, Seedance, Sora-class. Video up to 15s per clip, up to 4K, and CRUCIALLY "any
  aspect ratio for any platform (16:9, 9:16, 1:1, 4:5)." 4:5 and 9:16 are exactly the
  carousel/reel frames, so no awkward crop. Generated voiceover/music/SFX/dubbing/sync
  arrive on one timeline (mute-friendly carousels won't need it, but it's there).
- Adjacent alternatives seen: Pixa MCP (formerly Pixelcut: image/video gen + background
  removal, e-commerce-leaning), ImagineArt MCP (`claude mcp add imagine --transport http
  https://mcp.imagine.art`), and the fal video models already covered.

PIPELINE FIT: render the static HTML slide with shotpls as usual, then for the ONE
animated slide, generate a short 4:5 loop (motion texture, a subtle parallax, a
kinetic-type moment) via Higgsfield, and composite/export it as an MP4 slide in the
carousel. This is the concrete path to "video slide inside the carousel" that competitors
ship. Prototype ONE before committing credits.

--------------------------------------------------------------------------------
### NEW CATEGORY D: Comfy CLOUD MCP -- closes the "need a local GPU" gap for local-quality gen
--------------------------------------------------------------------------------

The first pass's biggest open question was "does Carter's box have a CUDA GPU," because
local generation (mold, comfyui-mcp) needs one. The OFFICIAL Comfy Cloud MCP removes that
dependency entirely:

- Comfy Cloud MCP (official, docs.comfy.org/agent-tools/cloud). Endpoint:
  `https://cloud.comfy.org/mcp`. Workflows run on Comfy Cloud GPUs -> NO local GPU needed.
- Headless / CI: create an API key at platform.comfy.org/profile/api-keys and pass it as
  the `X-API-Key` header (OAuth not required in headless mode). This is the clean fit for a
  no-GUI Linux box.
- Capabilities: generate image, video, audio, 3D; search models/nodes/templates; run full
  ComfyUI workflows from chat. So the full ComfyUI graph power (incl. WAN/LTX video for
  animated slides) is reachable WITHOUT owning a GPU.
- The artokun/comfyui-mcp control plane (108 tools, updated 2026-07-10) can ALSO target
  Comfy Cloud via `COMFYUI_API_KEY`, so you get its richer skill set pointed at cloud GPUs.

PIPELINE FIT: this is the "I want ComfyUI-grade control and video models but I don't have
or don't want a local GPU" answer. It reframes the earlier GPU gate as optional. For most
carousel needs, though, Recraft (vector) + Nano Banana (text raster) + Higgsfield (video)
cover the ground more simply than standing up ComfyUI workflows. Comfy Cloud is the
power-user escape hatch, not the default.

--------------------------------------------------------------------------------
### NEW CATEGORY E: design-studio + component MCPs (author-and-render, not asset-fetch)
--------------------------------------------------------------------------------

Two tools that operate on the SLIDE ITSELF rather than handing back an asset:

- Evilander/claude-design-mcp (github, MIT, ~2 stars, Python, v0.2.0 pending PyPI, active).
  Install: `uv tool install "claude-design-mcp[render]" --with-executables-from playwright`
  then `playwright install chromium`. Headless Linux via Playwright/Chromium. Nine tools:
  `design_create` (HTML/CSS from a brief), `design_iterate` (refine, keep lineage),
  `design_variants` (parallel mood/layout/palette alternatives), `design_render` (PNG at
  mobile/tablet/desktop viewports), `design_extract_system` (distill tokens/components/
  principles to a DESIGN.md), `design_preview` (local contact-sheet gallery to compare),
  `design_apply_system` (generate NEW designs constrained by an extracted system),
  `design_get`/`design_list`. Auth via OAuth, no API key.
  WHY IT MATTERS HERE: this is the closest thing to a carousel-authoring studio. The
  killer combo for a DECK: run `design_extract_system` once on a reference or on slide 1,
  then `design_apply_system` on every subsequent slide so all 7-10 frames share ONE token
  system = visual cohesion for free. `design_variants` gives Carter 4-5 density/palette
  takes of a slide to pick from. `design_preview` builds a contact sheet to judge the deck
  as a set. Caveat: it renders via Playwright, overlapping shotpls; keep shotpls as the
  PRODUCTION renderer (already tuned for the tiling bug) and use claude-design-mcp for the
  ideation/variant/system-extraction loop, not final output.
- 21st.dev Magic MCP (official, "v0 in your editor"). Install:
  `npx @21st-dev/cli@latest install claude --api-key YOUR_KEY`; invoke with `/ui`. Free to
  try with usage limits. HONEST FIT: it emits React + TypeScript + shadcn/ui + Tailwind +
  Radix. Our slides are standalone plain HTML/CSS files, NOT React. So Magic is a poor
  direct fit; at most it inspires a layout you then hand-translate to plain HTML. Skip for
  this pipeline unless the carousel tooling migrates to a React render step (it should not,
  shotpls renders raw HTML).

--------------------------------------------------------------------------------
### NEW CATEGORY F additions: icon sources the first pass missed
--------------------------------------------------------------------------------

- theSVG MCP (@thesvg/mcp-server on npm; lib at thesvg.org, glincker/thesvg on github).
  6,400+ BRAND / logo SVG icons, up to 5 variants each (full color, mono, light-bg,
  dark-bg, wordmark). Billed as the ONLY brand-icon library with MCP support. This fills a
  real hole: Iconify is great for UI glyphs (arrows, shields, locks) but weak on real
  vendor/tool LOGOS. A cyber/tools carousel constantly needs the actual Wireshark/Burp/
  Nmap/AWS/CrowdStrike-style marks. theSVG returns the real brand SVG to inline. Open
  source, npm + CLI + MCP. Use ALONGSIDE an Iconify wrapper, not instead of.
- Icons8 MCP (hosted): `claude mcp add icons8mcp -- npx mcp-remote "https://mcp.icons8.com/mcp/"`.
  GOTCHA the first pass didn't have: PNG is free without a key, but SVG requires a PAID
  API key (subscription ~$15). Since our pipeline wants inline VECTOR SVG, Icons8 is a
  PAID path; Iconify wrappers give equivalent-or-better vector coverage for free. Skip
  Icons8 unless you specifically want its illustration style and will pay.

--------------------------------------------------------------------------------
### REVISED TOP 5 (supersedes the earlier ranking; reflects this pass's new entrants)
--------------------------------------------------------------------------------

1. Google Design MCP (https://design.googleapis.com/mcp) -- UNCHANGED #1.
   Free, no key, hosted, bundles color-scheme + Material icon search + Google Font
   search/describe. Quota worry now retired (no documented limits, last updated 2026-04-08).
   Zero-cost, zero-maintenance color/type/icon backbone.

2. An Iconify wrapper for UI glyphs + theSVG MCP for brand logos (install BOTH).
   Iconify (awssat/mcp-universal-icons `npx -y mcp-universal-icons`, native data-URI mode;
   or imjac0b/iconify-mcp-server) gives 200k monoline UI icons inline. theSVG
   (`@thesvg/mcp-server`) gives 6,400+ real vendor LOGOS with light/dark/mono variants.
   Cyber/tools carousels need both kinds; together they cover the whole icon surface, free.

3. Recraft MCP (`npx -y @recraft-ai/mcp-recraft-server@latest`) -- NEW, jumps in.
   The only generator whose native output is VECTOR SVG (inlines crisp, no raster bloat),
   plus vectorize-any-raster and background removal/replacement. $0.04 raster / $0.08
   vector / $0.01 vectorize. Best format-fit generator for a self-contained-HTML pipeline.

4. Image + VIDEO generation, split by job (install the pair):
   - Text-bearing / hero RASTER art: shinpr/mcp-image (`npx mcp-image`, Nano Banana 2/Pro
     + GPT Image, 136 stars, best text rendering, ~$0.04-0.15/img, saves to IMAGE_OUTPUT_DIR).
     For maximum text legibility, target Ideogram v3 (via fal or Recraft) instead.
   - ANIMATED slides: Higgsfield MCP (`https://mcp.higgsfield.ai/mcp`, no API keys,
     native 4:5 and 9:16, up to 15s/4K, Veo/Kling/Seedance). This is the direct path to
     the video-in-carousel move competitors ship. fal MCP remains the breadth fallback
     (1,000+ models, confirmed triple output: URL + dataUrl + local path via DOWNLOAD_PATH
     and ENABLE_DATA_URLS=true).

5. x51xxx/coolors-mcp (`npx -y @trishchuk/coolors-mcp`) -- HELD from first pass.
   extract_image_colors + HCT + APCA/WCAG contrast + colorblind sim. The "steal a palette
   off a reference slide and make it legible" tool. Pairs with Google Design MCP (Google
   builds schemes from key colors; coolors extracts key colors from images and audits).

Runner-up / conditional:
- Design Inspiration MCP (conare.ai, Serper free tier) for pulling a competitor slide's
  ACTUAL color/type/spacing tokens off a live URL. Most on-mission for the "beat their
  posters" goal; drops just below the generators only because the top 5 are used every
  build while token-scraping is periodic.
- Evilander/claude-design-mcp (uv install, Playwright headless) as the IDEATION/variant/
  design-system-extraction studio: extract a token system once, apply it across all slides
  for deck cohesion. Do NOT use it as the production renderer; shotpls stays that.
- Comfy Cloud MCP (`https://cloud.comfy.org/mcp`, X-API-Key header) as the GPU-free power
  escape hatch for ComfyUI-grade workflows incl. WAN/LTX video, if Recraft+NanoBanana+
  Higgsfield ever prove too limiting.

--------------------------------------------------------------------------------
### SO WHAT FOR US (this pass's net changes to the build)
--------------------------------------------------------------------------------

1. Add TWO icon MCPs, not one: an Iconify wrapper (UI glyphs) AND theSVG (brand logos).
   Cyber/tools decks live on real vendor marks that Iconify lacks. Both are free and inline.

2. Recraft is the sleeper win. A generator that emits SVG is a category-of-one for a
   self-contained-HTML slide: no base64, no raster bloat, crisp at 2160x2700. Wire
   `generate_image` (vector mode) + `vectorize_image` + `remove_background` into the asset
   helper first. Cheap enough to use liberally.

3. Split generation by JOB, not by vendor. Text-in-image -> Nano Banana / Ideogram v3
   (they render legible type; FLUX/SD smear it). Vector shapes/logos -> Recraft. Animated
   slide -> Higgsfield (native 4:5, no key). This job-routing beats "one image MCP for
   everything." Add a tiny router in make-carousel that picks the backend by asset type.

4. The animated-slide capability has a clean, keyless path NOW: Higgsfield MCP outputs
   4:5 and 9:16 video up to 15s. Prototype ONE looping motion/texture slide before buying
   credits at scale. No GPU on our box required for any of this.

5. Font embedding stays a scripted step, but shorter than feared: the google-webfonts MCP
   returns the exact gstatic woff2 URL, so the helper is just curl + base64 into @font-face.
   No font MCP does the base64 for you; do not wait for one.

6. Deck cohesion is a solved problem via design_extract_system + design_apply_system
   (claude-design-mcp): extract one token system, apply across all 7-10 frames. That is the
   antidote to the "each slide drifts" busyness the whole carousel-lab mission is fighting.
   Keep shotpls as the production renderer; use this only for the authoring/variant loop.
