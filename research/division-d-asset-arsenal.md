<!-- © AngelaMos | 2026 | division-d-asset-arsenal.md -->

# DIVISION D: Asset Acquisition Arsenal

Compiled 2026-07-10 from four scout sweeps (d1 icons/SVG APIs, d2 photo/texture generators, d3 design MCPs, d4 font pipeline) plus three division-head verifications run against the live shotpls source, the current Instagram carousel video spec, and the HTML-to-MP4 render path. Every URL, count, and license below traces to a page a scout fetched with curl/WebFetch or a search result I read today. Nothing is invented.

---

## EXECUTIVE SUMMARY

The entire asset arsenal for a poster-grade carousel is buildable with zero design GUI and near-zero recurring cost. One Iconify fetch helper unlocks 314,397 icons across 230 sets under one no-auth URL; a SPDX license guard keeps every icon credit-line-free. Every texture the poster pivot needs (grain, paper, halftone, mesh, riso, contour, dot grid) is generatable inline with SVG filters and layered CSS gradients, so we stop buying texture packs and generate print-grade texture per slide with zero asset weight. A uv font pipeline (real variable woff2 pull, instancer axis-slice, pyftsubset, base64) delivers sub-2KB inline display fonts driven by opsz/wdth axes for one massive focal word. Photos are a fetch-ahead bank where Pexels beats Unsplash for our use. On generation, split by JOB: Recraft for vector SVG (crisp inline, no raster bloat), Nano Banana / Ideogram for text-legible raster, Higgsfield for native 4:5 video. Cert-vendor logos are legally off-limits, but that is also the design win: cert NAME in big type plus a generic MIT shield beats vendor-logo clutter. Verified today: shotpls already blocks on fonts.ready, so the whole font race is a non-issue, but shotpls is PNG-only, so animated slides need a separate deterministic HTML-to-MP4 renderer (timecut / puppeteer-capture). IG now accepts up to 20 mixed photo/video slides, MP4 H.264, same 1080x1350 frame, up to 60s per slide.

---

## THE FINDINGS THAT MATTER (ranked)

### 1. Iconify is the single highest-leverage asset source: 314,397 icons, one no-auth URL, license-filterable
Source: d1 (live curl 2026-07-10). `https://api.iconify.design/{prefix}/{name}.svg` returns raw SVG, no key, no auth, no User-Agent. Live-measured catalog is 230 sets / 314,397 icons (docs still say 275k/200). It fronts tabler, lucide, ph, mdi, material-symbols, simple-icons, solar, hugeicons, streamline, so build ONE helper, not ten. Verified params: `color=%23HEX` (URL-encode the #, monotone only), `width`, `height`, `rotate=90deg|1|2|3`, `flip=horizontal|vertical`. Discovery: `/search?query=shield` returns prefix:name pairs; `/collection?prefix=X&info=true` returns per-set SPDX license. The `.json?icons=a,b` batch endpoint returns raw `body` markup ideal for caching locally with currentColor preserved.

### 2. License-by-SPDX is the real gate for a no-credit-line carousel
Source: d1 (live `/collection?info=true`). No-attribution safe: tabler MIT (6,146), lucide ISC (1,745), phosphor ph MIT (~9,072), hugeicons MIT (5,065), mdi Apache-2.0 (7,447), material-symbols Apache-2.0 (15,457), simple-icons CC0 (~3,447). ATTRIBUTION REQUIRED: solar CC-BY-4.0 (7,401), streamline CC-BY-4.0 (3,000). Whitelist {MIT, ISC, Apache-2.0, CC0-1.0} in tooling and read `license.spdx` before any use, so we never ship an attribution-required glyph without a credit.

### 3. Cert-vendor logos are legally off-limits, and the legal-safe path IS the design-goal path
Source: d1 (trademark policy pages for CompTIA, Cisco, AWS, ISC2, EC-Council). All five license their logos only to certified individuals/partners, only unaltered, never combined with other marks, never animated. AWS is the most explicit: plain text only, no logos. A third-party marketing carousel is exactly the restricted use. The defensible posture: reference the certification by NAME in text (nominative use of "Security+" is defensible; the logo is not) plus a generic shield/lock/badge from Lucide/Tabler/Phosphor. This reinforces the poster aesthetic: big cert name in type, one clean generic glyph, no vendor-logo clutter. The animated-slide ambition specifically collides with the "do not animate" clauses, so animate OUR icons, never their marks.

### 4. Every poster texture is generatable inline, shotpls-native, zero assets
Source: d2 (css-tricks, Codrops, frontendmasters, css-irl, all fetched). feTurbulence is the grain workhorse (`type=fractalNoise` for film/paper, `turbulence` for ink; `baseFrequency` sets grain size; force to crisp grain with `filter: contrast(170%) brightness(1000%)`). Pure-CSS halftone in 3 declarations (radial-gradient tiled + linear map + `background-blend-mode: multiply` + `filter: contrast(16)`); swap the map for a base64 grayscale photo as `mask-image` to turn a real photo into printed dots, zero JS. Mesh gradients = 4-6 layered `radial-gradient(at x% y%, hsla, transparent)` over a base color, one line, replaces flat brand backgrounds instantly. Riso/duotone via feComponentTransfer + grain + 2-6px ink-layer offset. Contours from illustrations.run/contour or procedural marching-squares. fffuel.co is a ~30-tool suite outputting copy-paste SVG/CSS for every primitive above, all static so all shotpls-safe. RENDER RULE: generate feTurbulence at a small viewBox (200-250px) and tile via CSS, never native 2160x2700, or shotpls crawls.

### 5. A uv font pipeline gives sub-2KB inline display fonts with dramatic variable axes
Source: d4 (gwfh repo, Google Developer API docs, fontTools subset docs, all fetched). THE TRAP: gwfh (gwfh.mranftl.com) silently serves STATIC weights for variable fonts because it spoofs Firefox 39, so NEVER use it for the variable path. For variable, use the css2 endpoint with a modern Chrome UA (`fonts.googleapis.com/css2?family=X:wght@100..900`, curl the returned woff2) or the Developer API with `capability=VF&capability=WOFF2`. Pipeline: `varLib.instancer` to drop undriven axes, `pyftsubset --flavor=woff2 --no-hinting --desubroutinize --text="..."` (or glyphhanger scanning the finished slide HTML) to shrink, then base64 into `@font-face`. Embed woff2, never ttf: shotpls loads from disk with no transport compression, so on-disk size = raw font bytes * 1.33, and woff2 is already Brotli-compressed. Expressive OFL display targets with real axes: Fraunces (wght+opsz+SOFT+WONK), Big Shoulders (opsz condensed monoliths), Bricolage (wght+wdth+opsz), Hubot Sans (wght+wdth+slnt technical), Playfair Display (true weight axis added Jan 2026, high-contrast Didone). Utility layer: Geist, Space Grotesk, Inter (wght-driven, safe). CSS GOTCHA: `font-variation-settings` does NOT cascade, any omitted axis reverts to default, so re-declare every axis in every rule via CSS custom properties.

### 6. Split generation by JOB, not by vendor: Recraft (vector) + Nano Banana/Ideogram (text) + Higgsfield (video)
Source: d3 (github pages fetched for each). RECRAFT MCP (`npx -y @recraft-ai/mcp-recraft-server@latest`) is the sleeper win: the ONLY generator whose native output is VECTOR SVG, which inlines crisp at 2160x2700 with no raster bloat. Tools: generate_image (raster OR vector), vectorize_image, remove_background, replace_background. $0.04 raster / $0.08 vector / $0.01 vectorize. VERSION RESOLVED (my check, npm + Recraft docs): MCP is v1.6.5 but supports BOTH V3 and V4 models; V4 drops the style param and controls style via prompt, so the older MCP release DOES reach the Feb-2026 V4 model. For TEXT baked into art, Nano Banana Pro / Ideogram v3 (~0.97 OCR) beat FLUX/SD which smear type; shinpr/mcp-image (`npx mcp-image`, 136 stars, v0.11.2) wraps Nano Banana 2/Pro + GPT Image 2. Video: Higgsfield MCP (`https://mcp.higgsfield.ai/mcp`, no API keys, native 4:5 and 9:16, up to 15s/4K, Veo/Kling/Seedance) is the keyless animated path. fal MCP is the breadth fallback (1,000+ models; confirmed triple output URL + dataUrl + local path via the RamboRogers wrapper with `DOWNLOAD_PATH` and `ENABLE_DATA_URLS=true`).

### 7. Google Design MCP is the free color/type/icon backbone
Source: d3 (developers.google.com/design-mcp/overview fetched). `https://design.googleapis.com/mcp`, NO API key, NO OAuth, hosted by Google, NO documented quota (overview last updated 2026-04-08). Bundles generate_color_scheme (key colors to Material semantic-role hex), Material icon search, and Google Font search/describe in one install. Zero cost, zero maintenance. Pairs with x51xxx/coolors-mcp (`npx -y @trishchuk/coolors-mcp`) whose extract_image_colors + HCT + APCA/WCAG contrast + colorblind sim lets us steal a palette off a competitor slide and make it legible on 1080x1350.

### 8. Iconify lacks real vendor LOGOS: add theSVG MCP alongside it
Source: d3. Iconify is UI glyphs (arrows, shields, locks); it is weak on actual tool/vendor marks (Wireshark, Burp, Nmap, CrowdStrike-style), which cyber/tools decks need constantly. theSVG MCP (`@thesvg/mcp-server`, 6,400+ brand SVGs, light/dark/mono/wordmark variants) is the only brand-logo library with an MCP. Install BOTH: an Iconify wrapper for glyphs and theSVG for logos. NOTE the trademark caveat from finding 3 still applies to vendor logos: nominative, unaltered, no implied endorsement. SVGL (svgl.app, Cloudflare-gated, needs a browser UA) is the non-MCP alternative for full-color logo variants.

### 9. DiceBear is the only headless people/cover generator; unDraw must stay manual
Source: d1 (live curl). `https://api.dicebear.com/{version}/{style}/svg?seed=X` works on plain curl, deterministic by seed, open-peeps style for characters and shapes style for abstract covers. The underlying art is CC0 (Pablo Stanley) but the HOSTED endpoint is positioned NON-COMMERCIAL with rate limits, so self-host DiceBear (open source, pnpm) to lean on the CC0 art without the hosted terms. unDraw is free-commercial but its license BANS redistributing-in-packs and building integrations, and its public API 404s today, so hand-pick and cache SVGs locally; do NOT automate an unDraw fetcher. Humaaans and Open Peeps are CC0 but download-only, no REST API.

### 10. Photos are a fetch-ahead bank; default to Pexels
Source: d2 (Pexels + Unsplash API docs fetched). shotpls needs base64-inlined images with no external URLs, so the script hits the API, downloads, base64s, then renders; the API never touches render. Pexels wins: raw-key `Authorization: KEY` header, 200 req/hr + 20,000/mo (higher free on request), `orientation=portrait` gives a pre-cropped tall `src.portrait` for 1080x1350, free VIDEO for the animated path, no per-display attribution demand, no download callback. Unsplash (50/hr demo, 1000+/hr prod) has stronger editorial photography but requires firing a GET to `photo.links.download_location` per chosen photo and stricter per-display credit, so reserve it for hero photos. Credit the photographer in the IG caption to stay clean on both.

### 11. VERIFIED: shotpls already handles the font race, but is PNG-only
Source: my read of `/home/yoshi/dev/operations/tools/shotpls/internal/render/render.go` + README. `waitReady` already `await document.fonts.ready`, waits on image decode, and does a double-`requestAnimationFrame` before capture with `captureBeyondViewport`. So the d4 "switch shotpls to fonts.ready" recommendation is ALREADY DONE, not needed. Consequence that matters more: shotpls outputs PNG/JPEG only, no video/screencast path in the source. Animated slides therefore CANNOT come from shotpls and need a separate renderer (see finding 12).

### 12. VERIFIED: the animated-slide render path is a deterministic HTML-to-MP4 step, and IG accepts it
Source: my searches (timecut github, puppeteer-capture, HyperFrames; HeyOrca + SocialPilot for the IG spec). A standalone HTML+CSS animation renders to a frame-perfect MP4 via Chrome's `HeadlessExperimental.beginFrame` + deterministic clock (`--deterministic-mode`, `--enable-begin-frame-control`), captured frame-by-frame and piped through ffmpeg. Tools: tungs/timecut (Node, overrides page time functions), puppeteer-capture (start/stop plugin), HyperFrames (agent-oriented, identical MP4 every run). IG spec confirmed 2026: up to 20 mixed photo/video slides, same aspect ratio set by the first slide, video slides at the same 1080x1350 px, MP4 (H.264/AAC) preferred, min 30 FPS, up to 60s per slide. So: author the animated slide as HTML/CSS (same as static slides), render to MP4 with a timecut-style tool, export at 1080x1350, drop into the carousel as slide N.

---

## CONTRADICTIONS AND RECONCILED CLAIMS

- Recraft MCP version: d3 flagged uncertainty (read v1.6.5 dated pre-V4, unclear if it reaches V4). RESOLVED (my check): v1.6.5 is current and supports both V3 and V4; V4 controls style via prompt (no style param). The old MCP release reaches the new model. Source: npmjs @recraft-ai/mcp-recraft-server + recraft.ai/docs/mcp-reference/local-server.
- shotpls fonts.ready: d4 recommended "switch shotpls to await document.fonts.ready if it only waits a fixed delay." RESOLVED (my source read): it already does. No action.
- Unsplash production rate limit: sources split 1000/hr vs 5000/hr (d2). Unresolved; plan on 1000/hr. Low stakes since we likely never leave demo tier for a one-person bank.
- Icon set counts drift (d1 measured 314,397 live vs docs' 275k; d3 cited "200k/200 sets"). The live d1 measurement is authoritative; treat d3's figure as a rounded restatement of the same source, not a conflict.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Build ONE `fetch_icon(prefix, name, color, w, h)` helper (uv/Python) hitting `api.iconify.design/{prefix}/{name}.svg` with URL-encoded params. 314,397 icons behind one function. Do NOT write per-library plumbing.

2. Add a hard LICENSE GUARD: before using any set, read `license.spdx` from `/collection?prefix=X&info=true` and reject anything outside {MIT, ISC, Apache-2.0, CC0-1.0} for no-credit-line slides. Encode the whitelist so an attribution-required glyph can never ship uncredited.

3. Cert logos are TEXT, never image. Reference CompTIA/Cisco/AWS/ISC2/EC-Council certs by full name in type (finding 3, and per Carter's "never abbreviate certification" rule) with a generic MIT shield/lock/badge. Never place, alter, or animate a vendor mark.

4. Build a parameterized `textures.css` library of 10-15 named recipes (grain-fine, grain-coarse, paper-rough, halftone-photo, halftone-flat, mesh-brand, riso-duotone, contour-faint, dot-grid, blueprint-grid), each driven by CSS custom properties. Generate feTurbulence at a 200-250px viewBox and tile; inline as data-URI SVG with `#`->`%23`, `%`->`%25`. This kills the stock-photo-look dependency for most slides.

5. Build a uv `fontpack.py` tool: pull the real variable woff2 (css2-with-Chrome-UA or Developer API `capability=VF`, NEVER gwfh), run `varLib.instancer` to drop undriven axes, `pyftsubset --flavor=woff2 --no-hinting --desubroutinize` with `--text` or glyphhanger against the finished slide HTML, then base64 into `@font-face`. Two modes: GLOBAL (one ASCII+punctuation subset reused) and PER-SLIDE (sub-2KB for a giant focal word). Embed woff2, never ttf.

6. In the slide template, re-declare every variable-font axis in every rule via CSS custom properties (`font-variation-settings` does not cascade). Prioritize opsz/wdth faces (Fraunces, Big Shoulders, Bricolage, Hubot, Playfair) for the one-massive-word poster look; keep Geist/Space Grotesk/Inter as the wght-only utility layer.

7. Install the free MCP backbone: Google Design MCP (color schemes + Material icons + font search, no key), an Iconify wrapper for glyphs, theSVG MCP for real vendor logos, coolors-mcp for palette-extraction-and-contrast-audit. Marginal cost: $0.

8. Route generation by JOB via a small backend router in make-carousel: vector shapes -> Recraft (`generate_image` vector mode, inline SVG); text-in-image -> Nano Banana Pro / Ideogram v3; animated slide -> Higgsfield (native 4:5). Do NOT use one image MCP for everything.

9. Build the animated-slide path as a SEPARATE renderer from shotpls (shotpls is PNG-only, verified). Author the slide as HTML/CSS, render to a deterministic 1080x1350 MP4 via a timecut / puppeteer-capture / HeadlessExperimental.beginFrame step piped through ffmpeg, then post it as one slide in a mixed carousel (IG: up to 20 slides, MP4 H.264, min 30 FPS, up to 60s). Prototype ONE looping motion/texture slide before scaling.

10. Photos stay a fetch-ahead bank: default Pexels (raw-key auth, `orientation=portrait`, `src.portrait`, free video), reserve Unsplash for hero shots (fire `download_location` per pick), credit the photographer in the IG caption. Self-host DiceBear for CC0 people/cover art; keep unDraw/Humaaans manual-download-and-cache only.

11. Version-pin and cache every asset for reproducible renders (assets are base64-embedded at build time): simple-icons@16, lucide-static@1.24.0, @tabler/icons@3.x, @phosphor-icons/core@2.x. Snapshot Iconify SVG bodies into the repo on first fetch via the `.json` batch endpoint.

12. Bake in the two Cloudflare UA gotchas: `cdn.simpleicons.org` and `api.svgl.app`/`svgl.app/library` 403 a bare curl and 200 with a full Mozilla/5.0 UA. Either always send a full browser UA or route simple-icons through jsDelivr (no UA needed). Phosphor non-regular weights repeat the weight in the filename (`assets/bold/shield-bold.svg`, not `assets/bold/shield.svg`).

---

## OPEN QUESTIONS

- Recraft V4 SVG quality at poster scale is unbenchmarked by us; d3's OCR/text-rendering figures for Nano Banana vs Ideogram are blog-sourced, not first-party measured. Prototype one real slide from each before standardizing.
- Which HTML-to-MP4 renderer to adopt (timecut vs puppeteer-capture vs HyperFrames) is unresolved; none were run in this pipeline yet. Recommend a one-slide bake-off, checking deterministic output and ffmpeg H.264 export at exactly 1080x1350.
- Higgsfield MCP exact `claude mcp add` line and per-clip credit cost by model/resolution were not captured (d3 gap). Confirm on install.
- DiceBear self-host vs hosted-endpoint commercial risk is a risk-avoidance call, not a confirmed legal blocker (d1). If self-hosting is friction, get a definitive read on the hosted endpoint's commercial terms.
- Unsplash production rate limit (1000 vs 5000/hr) needs a live authenticated production approval to settle. Low priority.
- The cert-vendor nominative-fair-use posture is from trademark policy pages, not counsel. Defensible, not guaranteed; high-stakes use should get a lawyer's sign-off.
- No fully working pure-SVG feImage+feTile halftone-from-arbitrary-photo chain was verified (d2); the CSS mask-image path is proven, a pure-SVG-filter halftone needs prototyping in shotpls before trusting.
