<!-- © AngelaMos | 2026 | d2-photo-texture-generators.md -->

# Division D2: Photo and Texture Pipelines

Research date: 2026-07-10. Scope: Unsplash and Pexels API access in 2026 (limits, license, attribution), plus fully offline generated textures that render inside a single self-contained 1080x1350 HTML file under headless Chrome (shotpls). Every technique below is verified against a named source. Nothing here needs an external URL at render time except the two photo APIs, which are used to FETCH assets ahead of render, not at render time.

---

## SEARCHES RUN

1. Unsplash API rate limits license attribution 2026 developer requirements
2. Pexels API rate limit license attribution 2026 free photos videos
3. SVG feTurbulence grain noise texture filter recipe CSS background
4. CSS halftone effect radial gradient dots pure CSS technique
5. CSS mesh gradient generator technique multiple radial gradients layered 2026
6. risograph texture effect CSS SVG blend mode duotone print grain
7. SVG topographic contour lines generator noise displacement pure SVG code
8. CSS dot grid background pattern radial-gradient repeating tileable code
9. SVG halftone filter feImage feTile threshold image to dots feColorMatrix
10. paper texture SVG feTurbulence feDiffuseLighting recipe canvas noise offline
11. Pexels API endpoints curated search photos JSON response src sizes 2026

Pages fetched and read in full: css-tricks.com/grainy-gradients, frontendmasters.com halftone-in-3-declarations, tympanus.net/codrops feTurbulence texture article, blog.laozhang.ai free-image-API comparison, fffuel.co/nnnoise, freecodecamp.org grainy-css-backgrounds, help.unsplash.com API guidelines, pexels.com/api/documentation, css-irl.info CSS halftone patterns.

---

## FINDINGS

### PART 1: PHOTO APIS (fetch-ahead, not render-time)

Both APIs are for building an asset bank BEFORE rendering. shotpls renders a self-contained HTML with base64-embedded images and no external URLs, so the workflow is: hit the API from a uv/Python or pnpm/Node script, download the chosen photo file, base64 it into the slide HTML, then render. The API never touches the render step.

#### Unsplash API (unsplash.com/documentation, help.unsplash.com/en/articles/2511245)

Rate limits:
- Demo mode: 50 requests per hour.
- Production (after approval): the official docs and one comparison source say 1000/hour; the laozhang comparison and one Unsplash source cite 5000/hour after production approval. Treat 1000/hour as the safe planning number and 5000 as best case. Either way it is generous for a one-person content bank.
- Only JSON requests to api.unsplash.com count against the limit. Image file downloads from images.unsplash.com do NOT count. Rate-limit status is returned in response headers on every request.

Auth: `Authorization: Client-ID YOUR_ACCESS_KEY` header.

License vs API terms (this distinction matters):
- The Unsplash LICENSE itself does not require attribution. You can put an Unsplash photo on a billboard with no credit.
- The API TERMS OF SERVICE do require attribution every time an API-sourced image is displayed: credit Unsplash AND the photographer, with a clickable link to the photographer's Unsplash profile. This is mandatory for API integrators, not optional.
- Because our end product is a static PNG on Instagram, not an app that "displays" images live, the practical attribution obligation is the photographer credit in the caption or on-slide. The clean path is to CREDIT in the IG caption ("Photo: [name] / Unsplash") to stay inside the spirit of the terms even though the rendered PNG is not a live API display.

Three hard API rules from the official guidelines:
1. Hotlinking: all image use must use the hotlinked URLs returned under `photo.urls` (raw, full, regular, small, thumb). For our fetch-ahead bank we download from these URLs then embed locally, which is standard.
2. Download tracking (easy to miss and a compliance requirement): when a user actually selects a photo for use, you must fire a GET to the endpoint returned under `photo.links.download_location`. This is how photographers get download stats. Our fetch script must call download_location once per chosen photo.
3. UTM parameters: links back to Unsplash should carry `?utm_source=your_app_name&utm_medium=referral`.

Production approval: submissions that do not clearly meet all guidelines (attribution, hotlinking, download tracking) get rejected for the rate-limit increase. For a content bank we likely never need production tier; 50/hour demo is enough to curate.

#### Pexels API (pexels.com/api/documentation)

Rate limits:
- Default: 200 requests per hour AND 20,000 requests per month.
- Higher limits are free on request if you show acceptable attribution to Pexels and contributors. There is no paid tier for limits.

Auth: `Authorization: YOUR_API_KEY` header (raw key, no "Client-ID" prefix, unlike Unsplash).

Base URL: `https://api.pexels.com/v1`

Search endpoint: `GET /search` with query params:
- `query` (required)
- `orientation` (portrait / landscape / square). Set `portrait` for our 1080x1350 slides.
- `size` (large / medium / small, minimum resolution)
- `color`
- `per_page` (default 15, max 80)
- `page`

Curated endpoint: `GET https://api.pexels.com/v1/curated` returns real-time editor picks. Also a videos library at api.pexels.com/videos for the animated-slide direction.

Photo `src` object keys (verbatim, these are the pre-sized URLs you download):
`original`, `large2x`, `large`, `medium`, `small`, `portrait`, `landscape`, `tiny`. The `portrait` size is pre-cropped tall, ideal for a full-bleed 1080x1350 background.

JSON pagination fields: `page`, `per_page`, `total_results`, `next_page`, `prev_page`.

License and attribution:
- Pexels license: free for personal and commercial use, NO attribution required by the license.
- API terms request a prominent link back to Pexels ("Photos provided by Pexels") and crediting the photographer when possible ("Photo by [name] on Pexels"). Same pattern as Unsplash: license is lax, API terms ask for credit.

#### API scorecard for our use

- Pexels wins for a fetch-ahead bank: raw-key auth, portrait pre-crop, no mandatory download-tracking callback, no per-display attribution demand, and it also has free VIDEO for the animated-slide idea. The monthly cap (20k) is irrelevant at our volume.
- Unsplash has arguably stronger editorial photography, but the download_location callback plus stricter per-display attribution make it more procedure-heavy. Use Unsplash when a specific photo is worth the ceremony; default to Pexels for bulk.
- Pixabay (blog.laozhang.ai comparison) is a third option: 100 requests per 60 seconds, key passed as query param `key`, free with no attribution, but requires 24-hour caching and bans permanent hotlinking, and restricts recognizable brands/logos/people. Useful as a backup source, weaker curation.
- Wikimedia Commons: no key for basic queries, but license is file-by-file (each image has its own terms), so it is not a clean bulk source.

---

### PART 2: GENERATED TEXTURES (100 percent offline, inline in the HTML)

Every recipe below runs from math inside the HTML file. No fetch, no external asset, works under headless Chrome. This is the real payload for our pipeline: we can stop shipping stock-photo look and generate print-grade texture procedurally, per slide, at 2160x2700 with zero asset weight.

#### 2.1 SVG feTurbulence grain / noise (the workhorse)

Source: css-tricks.com/grainy-gradients (Adam Argyle / CSS-Tricks), tympanus.net/codrops feTurbulence article (Sara Soueidan), freecodecamp.org grainy backgrounds.

Base noise element:
```
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
</svg>
```

Parameter map (verified):
- `type`: `fractalNoise` = smooth, cloud/gas-like grain (use this for film grain and paper). `turbulence` = harder ripple/marble lines (use for liquid, marble, ink).
- `baseFrequency`: controls grain SIZE. Low (0.04 to 0.1) = large blotchy clouds. High (0.6 to 0.9) = tight film-grain speckle. It can take TWO values, e.g. `baseFrequency="0 0.2"`, to stretch noise in one axis only (great for scanline/anisotropic looks).
- `numOctaves`: detail/complexity. 1 to 3 for clean grain, up to 5 for rough organic paper. Higher = more render cost.
- `stitchTiles="stitch"`: makes the noise tile seamlessly if repeated. Keep this on for any tiled background.

Making it visible as grain (the trick): raw feTurbulence is a faint multicolor haze. You force it into crisp black/white grain with CSS filters on the element:
```
filter: contrast(170%) brightness(1000%);
```
This pushes the mid-values to pure black or white, producing sharp grain. Vary contrast/brightness to change grain density.

Inline data-URI form (self-contained, no external .svg file, exactly what shotpls needs). URL-encode the SVG into a background-image:
```
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
```
Encoding rules that bite: `#` becomes `%23`, `%` becomes `%25`, spaces can stay or become `%20`. That is the whole gotcha. (freecodecamp used baseFrequency='4' for very fine grain; base-freq values above ~1 wrap into fine speckle.)

Grain-over-gradient combo (the CSS-Tricks signature look): a colored gradient with grain on top.
```
.noise {
  background:
    linear-gradient(to right, blue, transparent),
    url("data:image/svg+xml,...feTurbulence...");
  filter: contrast(170%) brightness(1000%);
}
```
Use `mix-blend-mode: multiply` (or `overlay`, `soft-light`) on a grain overlay div to blend grain into artwork without washing out color. This is how you get the "premium matte" texture on a solid brand-color slide.

Performance note for headless Chrome at 2x: feTurbulence is per-pixel and gets expensive at 2160x2700. Mitigation: generate the noise SVG at a SMALL viewBox (e.g. 200x200 or 250x250) and let CSS tile/scale it via background-repeat. Do NOT render feTurbulence at full 2160x2700 native or renders crawl.

#### 2.2 Paper / rough-material texture (feTurbulence + lighting)

Source: tympanus.net/codrops feTurbulence article.
```
<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
<feDiffuseLighting in="noise" lighting-color="white" surfaceScale="2">
  <feDistantLight azimuth="45" elevation="60"/>
</feDiffuseLighting>
```
How it works: feTurbulence's alpha channel becomes a bump map. feDiffuseLighting shines a virtual light so opaque noise peaks catch highlights and troughs fall into shadow, producing tactile paper/plaster.
- `baseFrequency` 0.04 with `numOctaves` 5 = the canonical rough-paper roughness (article: "around 5 is a great place to get the level of roughness we need").
- `surfaceScale` = height multiplier; raise it for steeper, chunkier grain.
- `elevation`: 60 is default paper; drop to ~40 for higher-contrast, harsher texture.
- Swap `feDiffuseLighting` for `feSpecularLighting` for a wetter, glossier sheen (this is what fffuel's noise generator uses alongside feTurbulence).

#### 2.3 Halftone / Ben-Day dots (pure CSS, no image)

Source: frontendmasters.com pure-CSS-halftone-in-3-declarations, css-irl.info CSS halftone patterns, leanrada.com pure-css-halftone.

The 3-declaration halftone (single div, no pseudo-elements):
```
background:
  radial-gradient(closest-side, #777, #fff) 0 / 1em 1em space,
  linear-gradient(90deg, #888, #fff);
background-blend-mode: multiply;
filter: contrast(16);
```
How it works:
1. Two background layers. Layer 1 is a radial gradient tiled at `1em 1em` using `space` = the DOTS. Layer 2 is a linear gradient dark-to-light = the MAP that decides where dots grow or shrink.
2. `background-blend-mode: multiply` combines dots and map per channel, so dots darken where the map is dark.
3. `filter: contrast(16)` thresholds everything to pure black or white, giving sharp halftone dot edges (CSS has no threshold filter, so extreme contrast fakes it). Larger dots in dark map regions, tiny dots in light regions = real halftone tonal gradient.

Change the map to a `radial-gradient` for a spotlight halftone, or to text/logo via mask for a halftoned graphic.

Basic tileable dot GRID (Ben-Day, uniform), the offset two-gradient trick from css-irl:
```
--dotSize: 0.25rem;
--bgSize: 1.35rem;
--bgPosition: calc(var(--bgSize) / 2);
background-image:
  radial-gradient(circle at center, black var(--dotSize), transparent 0),
  radial-gradient(circle at center, black var(--dotSize), transparent 0);
background-size: var(--bgSize) var(--bgSize);
background-position: 0 0, var(--bgPosition) var(--bgPosition);
```
Two offset gradient layers give a denser diagonal dot lattice than one layer. Single layer + `background-size` alone gives a plain polka grid.

Halftone masked by a real image (image to dots, offline): the modern pure-CSS path from css-irl.
```
.halftone { background: white; filter: contrast(50); }
.halftone::after {
  content: "";
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at center, black 0.06rem, transparent 0.65rem);
  background-size: 1.3rem 1.3rem;
  mask-image: linear-gradient(rgb(0 0 0), rgb(0 0 0 / 0.5)); /* swap for the base64 photo */
}
```
Put a grayscale photo (base64) as the `mask-image` instead of the linear-gradient. Add `mix-blend-mode: multiply` or `screen` and `filter: contrast(50) invert(var(--invert,0))` for light/dark variants. This converts a real base64 photo into a halftone dot rendering with zero JS and zero external assets: perfect for a gritty photo slide.

#### 2.4 Mesh gradients (no native CSS function, layered radial gradients)

Source: colorffy mesh generator, csshero Mesher, better-gradient.com guide, instantgradient.com 2026 comparison.

CSS has no `mesh-gradient()`. You fake it by stacking semi-transparent radial gradients on one element over a base color:
```
background-color: #1a1a2e;
background-image:
  radial-gradient(at 20% 30%, hsla(280,80%,60%,0.6) 0px, transparent 50%),
  radial-gradient(at 80% 20%, hsla(200,90%,55%,0.5) 0px, transparent 50%),
  radial-gradient(at 60% 80%, hsla(330,85%,60%,0.5) 0px, transparent 50%),
  radial-gradient(at 10% 90%, hsla(160,80%,50%,0.4) 0px, transparent 50%);
```
Rules (verified): 4 to 6 radial gradients is the sweet spot; beyond 8 you get rendering overhead on weak devices (irrelevant for us: headless Chrome one-shot, so we can push higher). Each color point is `radial-gradient(at x% y%, color, transparent)`. Output is a plain background-image, resolution-independent, renders everywhere with no canvas. This is the cleanest way to get a rich, non-flat brand backdrop with zero assets. Free generators (colorffy, csshero Mesher, better-gradient) exist to hand-tune palette then copy the CSS; we can also generate the stops programmatically in our build script.

#### 2.5 Risograph / duotone print look

Source: design.tutsplus.com risograph tutorial, tympanus.net Codrops duotone (feComponentTransfer), designshack risograph backgrounds, utilitybend SVG filters.

Riso = duotone + physical imperfection. Build it from three offline layers:
1. Duotone the photo with SVG `feComponentTransfer` (maps luminance to two brand inks) or `feColorMatrix`. feComponentTransfer with `tableValues` on R/G/B channels remaps shadows to ink color A and highlights to ink color B.
2. Add grain with the feTurbulence recipe from 2.1 so ink looks absorbed into paper.
3. Fake misregistration: duplicate the color layers as pseudo-elements, offset each 2 to 6px with `transform: translate()`, and set `mix-blend-mode: multiply` so overlapping inks mix like real overprint. Slight offset between the two ink layers is the entire riso tell.

Duotone SVG core (feComponentTransfer):
```
<filter id="duotone">
  <feColorMatrix type="matrix" values="0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0"/>
  <feComponentTransfer color-interpolation-filters="sRGB">
    <feFuncR type="table" tableValues="0.1 0.9"/>
    <feFuncG type="table" tableValues="0.05 0.4"/>
    <feFuncB type="table" tableValues="0.2 0.8"/>
  </feComponentTransfer>
</filter>
```
First matrix desaturates to luminance; the table funcs map dark-to-light onto two chosen ink colors. Change the two endpoints of each tableValues to pick your two riso inks.

#### 2.6 Topographic / contour lines

Source: illustrations.run/contour, topography.blixthalka.com, flowity.app/svg/topographic, GitHub gist monfera generative elevation map with SVG filters.

Two offline routes:
1. Copy-paste generator SVG: illustrations.run/contour and topography.blixthalka.com both output raw SVG paths you paste directly into the HTML. These are static path sets (no runtime cost) and are the fastest way to get a clean contour backdrop. Customize color/interval before export.
2. Procedural (the gist approach): generate a Perlin/simplex noise elevation field in the build script (JS `simplex-noise` via pnpm, or Python `noise`), then trace contour lines at fixed elevation intervals into SVG `<path>` elements (marching squares). This gives infinite unique contour backgrounds keyed to a seed, all static SVG at render time. The monfera gist shows doing the noise-plus-contour entirely with SVG filters.

For our pipeline: pre-generate a library of contour SVGs in the build step and inline the chosen one. Contour lines as a faint low-opacity backdrop under big type reads as "technical dossier" without adding a reading zone.

#### 2.7 Dot grids and repeating patterns (structure, not decoration)

Source: ibelick.com grid-and-dot-backgrounds, dev.to CSS dotted background, MDN repeating-radial-gradient.

Minimal dot grid:
```
background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
background-size: 16px 16px;
```
Crisp round dots:
```
background: radial-gradient(circle at center, black 0.25rem, transparent 0);
background-size: 1rem 1rem;
background-repeat: round;
```
Line grid (blueprint):
```
background-image:
  linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px);
background-size: 40px 40px;
```
`repeating-radial-gradient()` (MDN) continues a radial pattern past the last stop for concentric-ring backgrounds. All of these are one CSS declaration, zero assets, and read as engineered structure rather than busy content, which is exactly the poster-not-newspaper direction.

#### 2.8 The generator suite worth reverse-engineering: fffuel.co

Source: fffuel.co/nnnoise and the fffuel tool index.

fffuel is a single site of ~30 free generators that all output copy-paste SVG/CSS, and it is effectively a menu of everything in this doc. Directly relevant tools:
- `gggrain` = grainy gradients
- `nnnoise` = SVG noise texture (uses feTurbulence + feSpecularLighting)
- `uuunion` = mesh gradients
- `tttexture` = grunge textures
- `hhholographic` = holographic backgrounds
- `wwwatercolor` = watercolor
- `ooorganize` = grid patterns, `rrrepeat` = repeating shapes, `mmmotif` = 3D patterns, `ttten` = 10-Print maze patterns, `sssquiggly` = wavy lines
- `bbblurry` = blurred blob shapes, `ffflux` = fluid gradients

Workflow: tune the look on fffuel, copy the SVG/CSS, paste inline into the slide. Because all outputs are static SVG or CSS, they are automatically shotpls-safe. This is the single fastest external tool for our texture bank, and its output is exactly the primitives above so we can also script them ourselves.

---

## SO WHAT FOR US

1. We can kill the stock-photo-look dependency for most slides. Every texture our "poster, not newspaper" pivot needs (grain, paper, halftone, mesh gradient, riso, contour, dot grid) is generatable inline with SVG filters and layered CSS gradients. Zero asset weight, zero external URL, shotpls-native, infinitely tweakable by seed. That is a competitive moat: competitors buy texture packs, we generate per-slide.

2. Build a `textures.css` / texture-partial library now. Ten to fifteen named, parameterized recipes (grain-fine, grain-coarse, paper-rough, halftone-photo, halftone-flat, mesh-brand, riso-duotone, contour-faint, dot-grid, blueprint-grid). Each takes CSS custom properties (baseFrequency, dot size, ink colors) so a slide just imports one class. This is a small, high-leverage tooling build.

3. Two hard render rules to bake into the build:
   - Generate feTurbulence noise at a small viewBox (200 to 250px) and tile/scale via CSS. Full-native 2160x2700 feTurbulence is slow and can choke shotpls. Grain SVGs must be small and repeated.
   - Inline everything as data-URI SVG with correct URL-encoding (`#` to `%23`, `%` to `%25`). One helper in the build script should encode SVG strings so we never hand-encode.

4. Halftone-from-photo is the highest-impact single technique for the gritty, poster look: take one base64 grayscale photo, run it through the css-irl mask-image + contrast(50) halftone, and a whole slide becomes a printed dot rendering with one focal image and no body copy. This is exactly the poster aesthetic competitors are using.

5. Photo APIs are a FETCH-AHEAD asset-bank tool, not a render tool. Default to Pexels (raw-key auth, portrait pre-crop, free video, no download-callback, no per-display attribution demand). Reserve Unsplash for hero photos worth the download_location callback and stricter credit. Always credit the photographer in the IG caption to stay clean on both APIs' terms even though the rendered PNG is not a live API display. Build a tiny uv/Python or pnpm/Node fetch script: query -> pick -> download portrait size -> (Unsplash: hit download_location) -> base64 into slide.

6. Mesh gradients replace flat brand backgrounds immediately. Four to six layered radial gradients over a base color gives a rich, non-flat backdrop with one line of CSS and no assets. This alone lifts a slide from flat to premium and directly serves the one-focal-point goal because it is quiet texture, not a reading zone.

7. Riso/duotone is our "one strong image" treatment when we do use a photo: duotone it to brand inks with feComponentTransfer, grain it, offset the ink layers 2-6px for misregistration. Turns a generic stock photo into a printed art object that looks nothing like everyone else's clean Unsplash slide.

---

## GAPS / DEAD ENDS

- fffuel.co/nnnoise does not expose its exact generated SVG string on the page (it is produced client-side). The feTurbulence + feSpecularLighting stack is confirmed, but the precise baseFrequency/octave values it ships are not readable without opening the tool live. Our own recipes above cover the same ground.
- Unsplash production rate limit is reported as both 1000/hour and 5000/hour across sources; the exact current number would need a live authenticated production-approval to confirm.
- No source gave a fully working, drop-in SVG `feImage`+`feTile` halftone-from-arbitrary-photo filter chain (threshold via feColorMatrix). The CSS mask-image path (2.3) is the proven offline route; a pure-SVG-filter halftone would need to be prototyped and verified in shotpls before trusting.

---

## SOURCES

- Unsplash API docs: https://unsplash.com/documentation
- Unsplash API guidelines: https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
- Pexels API documentation: https://www.pexels.com/api/documentation/
- Pexels license: https://www.pexels.com/license/
- Free image API comparison 2026 (Unsplash/Pexels/Pixabay/Wikimedia): https://blog.laozhang.ai/en/posts/free-image-api
- Grainy Gradients (CSS-Tricks, Adam Argyle): https://css-tricks.com/grainy-gradients/
- feTurbulence texture (Codrops, Sara Soueidan): https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
- Grainy CSS backgrounds with SVG (freeCodeCamp): https://www.freecodecamp.org/news/grainy-css-backgrounds-using-svg-filters/
- Pure CSS halftone in 3 declarations (Frontend Masters): https://frontendmasters.com/blog/pure-css-halftone-effect-in-3-declarations/
- CSS halftone patterns (CSS-IRL): https://css-irl.info/css-halftone-patterns/
- Pure CSS halftone (leanrada): https://leanrada.com/notes/pure-css-halftone/
- Mesh gradient generators: https://colorffy.com/mesh-gradient-generator , https://csshero.org/mesher/ , https://better-gradient.com/blog/mesh-gradient-css-guide
- Risograph texture tutorial (Tuts+): https://design.tutsplus.com/tutorials/how-to-make-a-risograph-texture-effect--cms-38557
- Duotone with feComponentTransfer (Codrops): https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/
- Topographic SVG generators: https://illustrations.run/contour/ , https://topography.blixthalka.com/ , https://gist.github.com/monfera/21be9bb116a8e5b2423b706155fdb718
- CSS grid and dot backgrounds (ibelick): https://ibelick.com/blog/create-grid-and-dot-backgrounds-with-css-tailwind-css
- repeating-radial-gradient (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/repeating-radial-gradient
- fffuel generator suite: https://www.fffuel.co/nnnoise/
