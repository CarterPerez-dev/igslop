<!-- © AngelaMos | 2026 | d1-icon-svg-apis.md -->

# Division D: Asset Acquisition Arsenal (Icon/SVG APIs, Banks, Illustration Sets)

Research date: 2026-07-10. Every URL pattern below was hit live with curl from this
terminal and the HTTP status/byte size is recorded. Where I could not verify live,
it is labeled UNVERIFIED. Recency note: Iconify, SVGL, simple-icons, Tabler, Phosphor,
Lucide, DiceBear are all actively maintained as of mid-2026 (version numbers captured below).

--------------------------------------------------------------------------------
## SEARCHES RUN
--------------------------------------------------------------------------------

WebSearch queries:
1. Iconify API fetch single SVG URL pattern api.iconify.design
2. simple-icons SVG CDN URL pattern brand logos license 2026
3. SVGL API fetch svg logos endpoint json 2026
4. Lucide icons download SVG API programmatically license
5. Iconify API collections list endpoint /collections.json number of icon sets 2026
6. Phosphor icons SVG CDN jsdelivr URL pattern license MIT count
7. Tabler icons SVG download CDN URL pattern license count 2026
8. unDraw illustrations API download SVG license commercial use no attribution
9. humaaans open-peeps illustration SVG download license MIT CC0
10. svgl.app api endpoint "api.svgl.app" get all svgs search category example
11. Tabler icons raw github individual svg file path outline filled directory
12. CompTIA logo usage trademark permission brand guidelines third party
13. AWS logo trademark guidelines third party use permission architecture icons
14. Cisco brand trademark logo third party use permission guidelines
15. ISC2 CISSP logo digital badge Credly trademark usage rules EC-Council logo permission
16. undraw.co illustration svg direct download url structure "cdn.undraw.co" svg fetch
17. DiceBear avatars HTTP API url shapes open-peeps svg generate license
18. animated SVG SMIL icons library free download lordicon lottie svg animate
19. Streamline icons Iconify free sets Solar Hugeicons commercial license 2026
20. "undraw" download svg script github api endpoint 2025 2026 illustrations json working

Live curl verifications run (see FINDINGS for status codes):
Iconify SVG endpoint, Iconify color+size+rotate+flip params, Iconify /search,
Iconify /collections, Iconify /collection info+license per set, Iconify .css and .json
batch endpoints, simple-icons jsDelivr + unpkg + cdn.simpleicons.org (with/without UA),
SVGL /api base + /categories + ?search + library asset, Lucide jsDelivr + unpkg,
Tabler jsDelivr, Phosphor core jsDelivr, DiceBear open-peeps + shapes, unDraw /api/illustrations,
npm registry meta for simple-icons.

WebFetch attempts (2 blocked): iconify.design/docs/api/svg.html (403),
svgl.app/docs/api (403), undraw.co/api/illustrations (404). Worked around via curl + search.

--------------------------------------------------------------------------------
## FINDINGS
--------------------------------------------------------------------------------

### 1. ICONIFY API (api.iconify.design) — THE PRIMARY WORKHORSE

The single most important source for us. Public, free, no key, no signup, plain curl works
with NO User-Agent needed. Hosts far MORE than the docs claim.

LIVE-MEASURED CATALOG (curl https://api.iconify.design/collections | count):
- 230 icon sets
- 314,397 total icons
(The official docs still say "275k icons / 200 sets" and search results said "305k/214 sets".
The number keeps growing; I measured the real live total today: 314,397 across 230 sets.)

FETCH A SINGLE SVG (verified 200, 158 bytes for mdi/home):
  https://api.iconify.design/{prefix}/{name}.svg
  Example: https://api.iconify.design/mdi/home.svg

Query params (all verified live):
- color: recolor from currentColor to a fixed color. Hex # MUST be URL-encoded as %23.
    ?color=%23ff0000   -> verified: output <path fill="#ff0000" ...>
- width / height: ?width=64&height=64  (verified: <svg width="64" height="64" ...>)
    Default when unset is width="1em" height="1em" (scales with font-size).
- rotate: ?rotate=90deg (or 1/2/3 for 90/180/270). Verified: injects transform="rotate(90 12 12)".
- flip: ?flip=horizontal (or vertical, or "horizontal,vertical"). Verified live.
- box=1: adds a transparent bounding rectangle matching the viewBox. Needed when importing
    into design tools that ignore viewBox. (Docs-stated; low relevance for our HTML pipeline.)
- download=1: sets Content-Disposition to force a file download (browser-only nicety).

Combined example, verified 200:
  https://api.iconify.design/mdi/shield-lock.svg?color=%23ff0000&width=64&height=64

SEARCH ENDPOINT (verified 200):
  https://api.iconify.design/search?query=shield&limit=3
  Returns JSON: {"icons":["material-symbols:shield","mdi:shield","solar:shield-bold", ...]}
  Each entry is "prefix:name" which maps directly to the SVG URL prefix/name.
  This means we can programmatically discover icons by keyword from the terminal.

BATCH / DATA ENDPOINTS (both verified 200):
- Icon data JSON (raw path bodies, good for programmatic recoloring/manipulation):
    https://api.iconify.design/{prefix}.json?icons=shield,lock
    Returns {"prefix":"tabler","width":24,"height":24,"icons":{"shield":{"body":"<path .../>"}}}
    The "body" is the inner SVG markup with stroke="currentColor" preserved.
- CSS endpoint (multiple icons as background-image data-URIs in one file), verified 200:
    https://api.iconify.design/tabler.css?icons=shield,lock,home

COLLECTIONS / LICENSE METADATA (this is the legal spine, all verified live):
  https://api.iconify.design/collections                 -> all 230 sets metadata (94,875 bytes)
  https://api.iconify.design/collection?prefix=tabler    -> that set's icon list
  https://api.iconify.design/collection?prefix=solar&info=true  -> includes license object

  Per-set license object example (solar), verified:
    {"title":"CC BY 4.0","spdx":"CC-BY-4.0","url":"https://creativecommons.org/licenses/by/4.0/"}
  The metadata also carries version + author, e.g. tabler:
    {"name":"Tabler Icons","total":6146,"version":"3.44.0","author":{"name":"Paweł Kuna",...},
     "license":{"title":"MIT","spdx":"MIT","url":"https://git..."}}

LIVE PER-SET LICENSE + COUNT TABLE (pulled today via /collection?info=true):
  Prefix            Total     License           SPDX
  tabler            6146      MIT               MIT           (best: no attribution)
  lucide            1745      ISC               ISC           (best: no attribution, MIT-like)
  ph (Phosphor)     9072      MIT               MIT           (best: no attribution)
  hugeicons         5065      MIT               MIT           (best: no attribution)
  mdi               7447      Apache 2.0        Apache-2.0    (permissive, no attribution needed for icons)
  material-symbols  15457     Apache 2.0        Apache-2.0    (Google's full set, 15k icons)
  simple-icons      3447      CC0 1.0           CC0-1.0       (public domain brand logos)
  solar             7401      CC BY 4.0         CC-BY-4.0     (ATTRIBUTION REQUIRED)
  streamline        3000      CC BY 4.0         CC-BY-4.0     (ATTRIBUTION REQUIRED)

  IMPORTANT for commercial social media: MIT/ISC/Apache-2.0/CC0 sets need NO visible credit
  on the carousel. CC-BY-4.0 sets (solar, streamline free tier, plus many others) legally
  require attribution. For a poster-style carousel where we do NOT want a credit line on the
  image, PREFER MIT/ISC/CC0 sets (tabler, lucide, phosphor, hugeicons, simple-icons) or
  Apache-2.0 (mdi, material-symbols). Filter set choice by SPDX programmatically from the
  info endpoint before rendering.

WHY ICONIFY IS THE FOUNDATION: one URL scheme, one host, no auth, live recolor + resize,
searchable, and it fronts ALL the individual libraries below (lucide, tabler, phosphor, mdi,
simple-icons, solar, hugeicons, streamline, material-symbols) so we do not need per-library
plumbing. It is the aggregator.

### 2. SIMPLE-ICONS (brand/tech logos, 3,447 monochrome logos, CC0)

License: CC0 1.0 (public domain) confirmed via Iconify info endpoint AND search results.
CC0 = no attribution, commercial use fully allowed. Latest major is v16 (npm/jsDelivr).
Icons are single-color path logos designed for currentColor recoloring.

HEADLESS FETCH PATHS (tested live):
- jsDelivr (WORKS with plain curl, 200, 822 bytes for github.svg):
    https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/{slug}.svg
    Pin a version for reproducibility: simple-icons@16 instead of @latest.
- unpkg (302 redirect to versioned URL, follow with -L):
    https://unpkg.com/simple-icons@latest/icons/{slug}.svg
- Official colored CDN cdn.simpleicons.org:
    https://cdn.simpleicons.org/{slug}            (monochrome, currentColor black)
    https://cdn.simpleicons.org/{slug}/{hexcolor} (recolored, e.g. /python/3776AB)

    CRITICAL GOTCHA (verified live): cdn.simpleicons.org sits behind Cloudflare and returns
    HTTP 403 ("Just a moment...") to a plain curl with NO User-Agent. Sending a browser
    User-Agent header fixes it (verified 200, 837 bytes):
      curl -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" https://cdn.simpleicons.org/github
    So: either always send a browser UA, OR just use the jsDelivr mirror (no UA needed).
    RECOMMENDATION: use jsDelivr for simple-icons; it is UA-agnostic and version-pinnable.

"slug" is a normalized brand name (lowercase, spaces removed, some special mappings). The
authoritative slug list ships in the npm package (simple-icons/slugs.md) and via the
npm registry meta (https://registry.npmjs.org/simple-icons/latest returned 200 live).

Brand caveat for logos: simple-icons carries the vendor logos themselves (GitHub, AWS,
Cisco, Docker, Kali, etc.). CC0 covers simple-icons' OWN reproduction, but the underlying
TRADEMARKS are still owned by the vendors. See the BRAND LEGALITY section at the bottom.
For cert vendor logos specifically (CompTIA/Cisco/AWS/ISC2/EC-Council), simple-icons is the
easy fetch but the trademark rules below govern whether we can put them on a carousel.

### 3. SVGL (svgl.app) — richer brand logos, light/dark/wordmark variants

A curated logo library (Sveltekit app by pheralb). Free REST API, no auth. Better than
simple-icons when you want the FULL-COLOR brand logo and light/dark variants, not just
monochrome. Repo: github.com/pheralb/svgl.

CATALOG (from live /categories call): categories include Software (283), Library (77),
AI (67), Framework (52), Platform (24), Analytics (7), plus more. Total is a few thousand
logos across the categories.

API BASE: https://api.svgl.app  (no auth; rate-limited, so CACHE responses locally.)

CLOUDFLARE GOTCHA (verified live, same pattern as simple-icons): a plain curl with NO UA to
https://api.svgl.app returns HTTP 403 "Just a moment...". WITH a browser User-Agent it returns
200 (verified: 128,637 bytes for the full list). ALWAYS send a browser UA to SVGL.

ENDPOINTS (verified live with UA):
- Get all logos:        https://api.svgl.app
- Search by title:      https://api.svgl.app?search=github
    Verified response shape:
      [{"id":575,"title":"GitHub","category":"Software",
        "route":{"light":"https://svgl.app/library/github_light.svg",
                 "dark":"https://svgl.app/library/github_dark.svg"},
        "wordmark":{...}, "url":"https://github.com/..."}]
- List categories+counts: https://api.svgl.app/categories
    Verified: [{"category":"Software","total":283},{"category":"Library","total":77}, ...]
- By category (per docs): https://api.svgl.app/category/{name}   (UNVERIFIED exact casing)

FETCH THE ACTUAL SVG FILE: the "route.light" / "route.dark" fields are absolute URLs on the
svgl.app host, pattern:
    https://svgl.app/library/{name}_light.svg  and  {name}_dark.svg
Verified live (with UA): https://svgl.app/library/github_light.svg -> 200, 997 bytes.
Note: I tried the jsDelivr GitHub raw mirror (cdn.jsdelivr.net/gh/pheralb/svgl@main/static/library/...)
and got 404 (repo path differs), so use the svgl.app host URLs from the API "route" field, with a UA.

LICENSE: SVGL is a curated index; the logos remain the property/trademark of their owners.
SVGL's own terms say do not use the API to clone SVGL itself, and to cache responses. There
is no blanket commercial license granted over the logos, they are third-party marks. Same
trademark caveat as simple-icons: fine for nominative/descriptive use, governed by each
vendor's trademark policy for prominent branding.

### 4. LUCIDE (1,745 icons, ISC license)

Feather fork, clean 24x24 2px-stroke outline icons. License ISC (verified via Iconify),
functionally MIT-equivalent, NO attribution required, commercial OK. Latest version 1.24.0
(seen in unpkg redirect).

HEADLESS FETCH (lucide-static package, verified live):
- jsDelivr (200, 463 bytes for shield.svg):
    https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg
- unpkg (302 redirect to pinned version, verified body of lock.svg):
    https://unpkg.com/lucide-static@latest/icons/{name}.svg
Also fully available through Iconify as prefix "lucide" (1745 icons).

### 5. PHOSPHOR (9,072 icons via Iconify, MIT)

6 weights: thin, light, regular, bold, fill, duotone. License MIT (via Iconify), no attribution.

HEADLESS FETCH (per-weight raw SVG from @phosphor-icons/core, verified live 2026-07-10):
    Regular weight ONLY:   assets/regular/{name}.svg              (200, 430 bytes for shield.svg)
    All OTHER weights:     assets/{weight}/{name}-{weight}.svg     (200, 441 bytes for shield-bold.svg)
    https://cdn.jsdelivr.net/npm/@phosphor-icons/core@latest/assets/bold/shield-bold.svg
    FILENAME GOTCHA (re-verified 2026-07-10): the non-regular weights repeat the weight in the
    FILENAME. assets/bold/shield.svg returns HTTP 404; assets/bold/shield-bold.svg returns 200.
    Weights: thin, light, regular, bold, fill, duotone. Regular is the bare-name exception.
Also via Iconify as prefix "ph" (9072 icons). Iconify's "ph" is the regular weight; other
weights appear under related prefixes (ph-thin etc.) in the Iconify catalog.

### 6. TABLER (6,146 icons, v3.44.0, MIT) — best all-round outline set

MIT, no attribution, commercial OK. 24x24 grid, 2px stroke, outline + filled variants.

HEADLESS FETCH (verified live 200, 428 bytes for outline/shield.svg):
    https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/{name}.svg
    https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/filled/{name}.svg
unpkg equivalent: https://unpkg.com/@tabler/icons@latest/icons/outline/{name}.svg
Also via Iconify as prefix "tabler" (6146 icons).

### 7. MATERIAL SYMBOLS + MDI (Google + Material Design Icons, Apache-2.0)

- material-symbols: 15,457 icons via Iconify (the largest single coherent set we have).
- mdi (Material Design Icons community): 7,447 icons, Apache-2.0.
Both Apache-2.0: commercial OK, no visible attribution required on output (Apache's notice
requirement is about redistributing source, not embedding a rendered glyph). Fetch via Iconify:
    https://api.iconify.design/material-symbols/{name}.svg
    https://api.iconify.design/mdi/{name}.svg

### 8. HUGEICONS / SOLAR / STREAMLINE (larger stylistic sets, watch the license)

- hugeicons: 5,065 icons, MIT (no attribution). Fetch via Iconify prefix "hugeicons".
- solar:     7,401 icons, CC BY 4.0 (ATTRIBUTION REQUIRED). Beautiful bold/duotone. Prefix "solar".
- streamline: 3,000 free icons, CC BY 4.0 (ATTRIBUTION REQUIRED). Streamline's paid tier is
    180,000+ icons (their site), but only the free CC-BY subset is on Iconify.
For a no-credit-line carousel, hugeicons is safe; solar/streamline need a credit unless we
license them. All fetch through the same Iconify URL scheme.

### 9. ILLUSTRATION SETS (people/scenes, not icons)

unDraw (undraw.co) — flat monochrome-accent illustrations, ONE customizable accent color:
- License: free for commercial + personal, NO attribution required. BUT the license explicitly
  PROHIBITS: replicating unDraw, using it for machine learning, redistributing the
  illustrations in packs, and building integrations for it.
- Programmatic fetch is a DEAD END right now: their old public endpoint
  https://undraw.co/api/illustrations returned HTTP 404 live today (the site is a Next.js app
  that changed its internal API). WebFetch of that URL also 404'd. The only "working" routes
  are third-party mirrors/scrapers on GitHub (AnandChowdhary/undrawcdn, cuuupid/undraw-illustrations,
  balazser/undraw-svg-collection) and an old oswaldlabs color-CDN
  (https://undraw.oswaldlabs.com/{hexcolor}/{name}.svg, UNVERIFIED and likely stale).
- PRACTICAL TAKE: because their license bans "redistribute in packs" and "build integrations,"
  an automated bulk-scrape is legally gray and technically fragile. If we want unDraw art,
  hand-download the specific illustrations we need from undraw.co (set the accent color there),
  save the SVGs into our own asset folder, and reference them locally at render time. Do NOT
  build an automated unDraw fetcher. This keeps us inside their terms and off broken endpoints.

humaaans (humaaans.com) by Pablo Stanley — mix-and-match human bodies, CC0 (public domain,
commercial OK, no attribution). Distributed as Sketch/Figma/Adobe files, NOT a fetch API.
Acquire once (the source files / SVG exports), keep locally, no runtime API.

Open Peeps (openpeeps.com) by Pablo Stanley — hand-drawn modular characters, CC0. Download
individual SVG parts or assembled characters from the site. No official fetch API either, BUT:

DiceBear HTTP API (api.dicebear.com) — THE headless way to get Open Peeps + geometric shapes:
- open-peeps style is a DiceBear remix of Open Peeps, CC0 1.0. Shapes style also CC0 1.0.
  DiceBear code is MIT.
- VERIFIED LIVE, plain curl, NO UA needed:
    https://api.dicebear.com/9.x/open-peeps/svg?seed=carter   -> 200, 10,648 bytes
    https://api.dicebear.com/9.x/shapes/svg?seed=x&backgroundColor=0a0a0a  -> 200, 1,403 bytes
  URL shape: https://api.dicebear.com/{version}/{style}/svg?seed=...&{options}
- This is genuinely useful: deterministic (seed-based), recolorable via query params
  (backgroundColor, etc.), returns clean inline SVG, zero auth. Great for abstract geometric
  cover art (shapes style) and human characters (open-peeps) directly in the terminal pipeline.
- 30+ styles exist (avataaars, bottts, identicon, initials, glass, etc.), all one URL scheme.

### 10. ANIMATED SLIDES (video slides inside the carousel)

Competitors now ship animated slides. Sources for motion assets (mostly NOT plain-curl SVG,
so these feed the "render video slide" path, not the static SVG path):
- Lordicon (lordicon.com): ~20,000+ free animated icons, formats Lottie JSON / GIF / static
  SVG / EPS / PNG. Free tier requires attribution; check per-icon. Not a clean anonymous API.
- LottieFiles (lottiefiles.com): free animations as Lottie JSON / dotLottie / MP4 / GIF.
- useAnimations (useanimations.com): small set of tasteful Lottie micro-animations, free.
- loading.io: customizable animated icons, SVG/GIF/APNG/Lottie/MP4/WebM, 100+ animation presets.
NOTE: Iconify itself does NOT serve animated SVGs. For animation we either (a) hand-author
SMIL/CSS keyframe animation on a static Iconify/Tabler SVG (fully in our control, no license
issue on MIT/CC0 icons), or (b) pull a Lottie JSON from LottieFiles/Lordicon and render it to
a video slide. Option (a) is cleaner and license-clean; recommend building our own SMIL/CSS
animation layer on top of MIT/ISC icons rather than depending on Lordicon's attribution terms.

--------------------------------------------------------------------------------
## BRAND-LOGO LEGALITY FOR CERT VENDORS (the load-bearing legal section)
--------------------------------------------------------------------------------

General principle across ALL five vendors: their names and logos are REGISTERED TRADEMARKS.
Two different things are being conflated and must be kept separate:
(1) Can we FETCH the SVG? Yes, trivially, from simple-icons/SVGL/vendor brand kits.
(2) Are we LEGALLY ALLOWED to put that logo on a commercial marketing carousel? Governed by
    each vendor's trademark policy, NOT by the CC0/MIT license of the icon repo.

The safe zone shared by all of them is NOMINATIVE / DESCRIPTIVE FAIR USE: referring to the
product by name in plain factual context ("Security+ is a CompTIA certification") without
implying sponsorship, endorsement, or partnership, and without altering/animating the mark.

CompTIA (Security+, A+, Network+, CySA+, PenTest+):
- Source: comptia.org/en-us/legal/trademarks. Logos are registered trademarks. Only
  AUTHORIZED users (certified individuals, Delivery/Academic Partners) may display the
  official CompTIA logos, and only for the permitted purposes (resume, business card, etc.).
- "You may not use CompTIA's trademarks to promote any products or services not created by
  CompTIA." Logos must not be distorted, rotated, or incorporated into another mark.
- IMPLICATION FOR US: we should NOT slap the official CompTIA cert logo on a CertGames
  marketing carousel as if endorsed. Refer to the certification by NAME in text. If we want a
  visual, use a generic shield/badge icon (tabler/lucide/phosphor), not CompTIA's registered logo.

Cisco (CCNA, CyberOps, etc.):
- Source: cisco.com/c/en/us/about/brand-center. "Generally, Cisco does not grant permission for
  use of its corporate logo to third parties." Only parties with written agreements may use
  Cisco trademarks. "Do not alter, adapt, modify, animate, or morph any Cisco trademarks."
- One useful carve-out: Cisco authorizes third-party use of its ELEMENT/PRODUCT ICONS in
  UNMODIFIED form without extra permission (network topology icons), but that is the product
  icon library, NOT the Cisco wordmark/logo.
- IMPLICATION: do not use the Cisco logo in marketing. Name the cert in text. Animating a Cisco
  mark (relevant to our animated-slide goal) is explicitly forbidden.

AWS (Cloud Practitioner, Security Specialty, etc.):
- Source: aws.amazon.com/trademark-guidelines. "AWS does not object to fair use... so long as
  the use would not be confusing... and any such use should be in PLAIN TEXT ONLY (no logos)
  and used to make true factual statements." Fair use does NOT permit implying affiliation/
  endorsement. May not imitate AWS trade dress / product icons / color+font look and feel.
- IMPLICATION: for AWS, the guideline is unusually explicit: refer to AWS in PLAIN TEXT, no
  logo, on our carousels. Contact trademarks@amazon.com for any logo use. Easy rule: text only.

ISC2 (CISSP, CC, CCSP):
- Source: isc2.org member policies + logo guidelines + Credly digital badges. Certified members
  may use the mark only on business cards/letterhead/marketing/resume to indicate they hold the
  cert. May NOT combine the mark with other logos/icons/graphics, may NOT alter it beyond
  resizing, may only use the badge as a LINK to isc2.org. Digital badges run through Credly.
- IMPLICATION: ISC2 is strict about combination and alteration. Do not composite the CISSP
  badge into a designed carousel slide. Name the cert in text.

EC-Council (CEH, etc.):
- Source: eccouncil.org brand manual (ECC-Brand-Manual-2.pdf, updated 2025-12) + logo usage v3.0.
  Certified members may use the logo only in original form, must state the version number
  (v12, etc.) next to it, may NOT alter it, may NOT combine multiple credential logos, may NOT
  imply endorsement, may NOT incorporate it into another name/logo/design.
- IMPLICATION: same as the rest. Reference CEH by name in text; do not composite the EC-Council
  logo into designed slides.

BOTTOM LINE ON CERT VENDOR LOGOS: For a commercial marketing carousel, the defensible, low-risk
posture is TEXT-ONLY references to the certifications by name, with our OWN generic iconography
(shields, locks, badges from tabler/lucide/phosphor, which are MIT/ISC). Do NOT place, alter, or
animate the official CompTIA/Cisco/AWS/ISC2/EC-Council logos. AWS is the most explicit ("plain
text only, no logos"); Cisco and CompTIA forbid altering/animating; ISC2 and EC-Council forbid
combining marks. The animated-slide ambition specifically collides with the "do not animate"
clauses, so animate OUR icons, never their marks. NON-CERT tech logos (GitHub, Docker, Kali,
Wireshark, Python, etc.) are lower risk and available CC0 via simple-icons / full-color via SVGL,
though still trademarks: use them nominatively, unaltered, no implied endorsement.

--------------------------------------------------------------------------------
## SO WHAT FOR US (how this changes what we build)
--------------------------------------------------------------------------------

1. BUILD AN ICONIFY-FIRST FETCH HELPER, not per-library plumbing. One tiny Python/uv module:
   `fetch_icon(prefix, name, color=None, w=None, h=None) -> svg_string` hitting
   https://api.iconify.design/{prefix}/{name}.svg with URL-encoded params. It transparently
   covers tabler, lucide, phosphor, mdi, material-symbols, simple-icons, solar, hugeicons,
   streamline, and 220+ other sets. No auth, no key, plain curl/requests. This is the single
   biggest lever: 314,397 icons behind one function.

2. ADD A LICENSE GUARD. Before using any set, call
   https://api.iconify.design/collection?prefix={p}&info=true and read license.spdx. Maintain
   a whitelist of no-attribution SPDX values {MIT, ISC, Apache-2.0, CC0-1.0} for the
   no-credit-line poster carousels. If a set is CC-BY-4.0 (solar, streamline) and we still want
   it, either add a tiny credit line or pick an equivalent MIT set. Encode this as a hard check
   in the tooling so we never accidentally ship an attribution-required icon without credit.

3. TWO CLOUDFLARE UA GOTCHAS TO BAKE IN. cdn.simpleicons.org and api.svgl.app both return 403
   to a bare curl and 200 with a browser User-Agent. Our fetch helper must always send
   `User-Agent: Mozilla/5.0 ...`. Alternatively route simple-icons through jsDelivr
   (cdn.jsdelivr.net/npm/simple-icons@16/icons/{slug}.svg), which needs no UA and lets us pin a
   version for reproducible renders (important since assets are base64-embedded at build time).

4. VERSION-PIN EVERYTHING FOR REPRODUCIBLE RENDERS. Since every slide inlines/base64s its assets,
   pin @tabler/icons@3.44.0, simple-icons@16, lucide-static@1.24.0, @phosphor-icons/core@2.x,
   rather than @latest, so a re-render months later produces identical PNGs. Iconify has no
   user-facing version pin, but its icons are stable; snapshot the SVG bodies we use into our
   repo the first time we fetch them (the .json batch endpoint returns raw "body" markup ideal
   for caching locally).

5. RECOLOR AT FETCH TIME to match our carousel palette. Iconify's ?color=%23RRGGBB and DiceBear's
   backgroundColor param mean we can request assets already in-brand instead of post-processing.
   For the poster look (one massive focal element), a single large recolored Iconify glyph, or a
   DiceBear "shapes" abstract cover, is a one-line fetch.

6. DICEBEAR IS OUR HEADLESS ILLUSTRATION/COVER ENGINE. api.dicebear.com/9.x/{style}/svg?seed=...
   works with plain curl, is CC0/MIT, deterministic by seed, and gives us both human characters
   (open-peeps) and abstract geometric covers (shapes) without any manual design tool. This is
   the automatable replacement for unDraw/humaaans/open-peeps, all of which are download-only.

7. DO NOT AUTOMATE UNDRAW. Its license bans redistributing-in-packs and building integrations,
   and its public API is 404 today. If we want unDraw/humaaans art, hand-pick and save SVGs into
   a local asset folder once, then reference them locally. Keep automation to Iconify + DiceBear.

8. ANIMATED SLIDES: animate OUR OWN MIT/ISC icons with hand-authored SMIL/CSS keyframes rather
   than depending on Lordicon's attribution-tiered Lottie files. This is both license-clean and
   fully controllable in the standalone HTML slide (shotpls can capture, or we render the HTML to
   a short video for the animated-slide path). Never animate a cert vendor's trademarked logo,
   the trademark policies explicitly forbid animating/altering their marks.

9. CERT LOGOS = TEXT, NOT IMAGE. Legally the cleanest move is to reference CompTIA/Cisco/AWS/
   ISC2/EC-Council certifications by NAME in text and represent them with our own generic
   shield/lock/badge icons. AWS is explicit ("plain text only, no logos"); the others forbid
   altering/combining/animating. This actually reinforces the poster aesthetic: big cert NAME in
   type, one clean generic icon, no busy vendor-logo clutter. The legal-safe path and the
   design-goal path are the same path.
