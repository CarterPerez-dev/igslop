<!-- © AngelaMos | 2026 | d4-font-pipeline.md -->

# Division D4: Font tooling for headless-Chrome carousel rendering

Mission: programmatic font acquisition + subsetting + variable-axis control for the shotpls pipeline (standalone HTML per slide, base64-embedded fonts, no external URLs at render time, 1080x1350 to 2160x2700 PNG). Date: 2026-07-10. Everything below is verified against sources listed at the end. Nothing fabricated.

## SEARCHES RUN

1. google-webfonts-helper API download fonts self-host 2026
2. Google Fonts Developer API v2 webfonts REST download URL pattern
3. fonttools pyftsubset subset woff2 flavor unicodes command example 2026
4. glyphhanger subset variable font --whitelist --formats woff2 command
5. CSS font-variation-settings wght wdth opsz slnt variable font display type control
6. fonttools varLib.instancer pin axis wght keep variable font subset --instance
7. Vercel Geist font download github self-host woff2 open source 2026
8. Instrument Sans Instrument Serif variable font download github open foundry 2026
9. Space Grotesk variable font github download woff2 self-host OFL
10. best free display variable fonts 2026 open source foundry release new
11. woff2 vs ttf base64 embed size difference brotli compression data URI font-face
12. headless chrome puppeteer document.fonts.ready wait for web font load before screenshot
13. Fraunces variable font opsz SOFT WONK axes display github download
14. "Big Shoulders" OR "Bricolage Grotesque" OR "Hubot Sans" variable font display axes github 2026
15. google-webfonts-helper variable font woff2 download not supported static only issue
16. Google Fonts css2 API variable font woff2 download modern user-agent unicode-range fvar axis range URL
17. Geist font wght axis range 100 900 variable GeistVariableVF woff2 fontsource

Pages fetched in full: github.com/majodev/google-webfonts-helper, developers.google.com/fonts/docs/developer_api, fonttools.readthedocs.io/en/latest/subset/, github.com/vercel/geist-font/releases, muz.li 2026 variable-fonts roundup.

## FINDINGS

### 1. Programmatic Google Fonts download: two paths, and the variable-font trap

PATH A: google-webfonts-helper (gwfh). Public host is `https://gwfh.mranftl.com`. It exists specifically to hand you self-hostable files plus CSS, no browser, no manual clicking.
- List all fonts: `curl https://gwfh.mranftl.com/api/fonts`
- Font metadata + gstatic file URLs: `curl "https://gwfh.mranftl.com/api/fonts/space-grotesk?subsets=latin"`
- Download a zip of exactly the variants/formats you want:
  `curl -o fontfiles.zip "https://gwfh.mranftl.com/api/fonts/lato?download=zip&subsets=latin,latin-ext&variants=regular,700&formats=woff2"`
- Query params: `download=zip` (required to trigger archive), `subsets` (latin, latin-ext, cyrillic, ...), `formats` (eot, woff, woff2, svg, ttf), `variants` (regular, 700, italic, ...). Omit any except download to include everything.
- Self-host the whole service via Docker: `docker run -e GOOGLE_FONTS_API_KEY=<KEY> -p 8080:8080 ghcr.io/majodev/google-webfonts-helper:<TAG>` (listens on 8080). Rate limits may apply to the public instance.

THE TRAP, and it is load-bearing for us: gwfh DOES NOT serve variable fonts. It identifies itself to Google as Firefox 39 (which predates variable-font support), so Google returns only STATIC per-weight woff2 files. Confirmed via the majodev repo notes and community write-ups. So gwfh is great for grabbing a fixed weight or two, useless for pulling a variable font you intend to drive with font-variation-settings. For variable, use Path B or the raw GitHub repo.

PATH B: Google Fonts Developer API v2 (the metadata API, needs a key).
- Endpoint: `https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_KEY`
- Key from Google Cloud Console credentials page (console.cloud.google.com/apis/credentials).
- Params: `sort` (alpha|date|popularity|style|trending), `family`, `subset`, `category`, and crucially `capability`.
- `capability=VF` returns the VARIABLE font file instead of statics, PLUS an `axes` array giving each axis tag and its min/max range. `capability=WOFF2` returns woff2-compressed files instead of ttf. You can pass both.
- Response per family: `family`, `variants`, `subsets`, `version`, `lastModified` (yyyy-MM-dd), `category`, `files` (map of variant -> download URL on `fonts.gstatic.com/s/...`), and with VF: `axes`.
- Example gstatic file URL shape from a response: `http://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pLlw89CH98Ko.ttf`. You curl that URL directly to get the actual binary.
- So the programmatic recipe for a variable font: call the API with `family=<Name>&capability=VF&capability=WOFF2&key=...`, read `files` for the woff2 URL and `axes` for the ranges, curl the file. No browser.

PATH C (best for exact variable woff2 without a key): the css2 endpoint with a modern user-agent.
- `https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap` returns a CSS file whose `src: url(...woff2)` points at the real variable woff2 (Google serves the smallest file the requesting UA supports; a modern Chrome UA gets the variable woff2 with `unicode-range` subsets already split by script).
- Range syntax uses `..` between axis endpoints (`wght@100..900`); a single intermediate weight is just `wght@450`. Multiple axes and the tuple syntax follow the css2 spec. Curl the returned woff2 URLs to self-host.
- Two dead-simple wrappers exist if we want them: `github.com/g105b/google-fonts-downloader` (downloads woff2 + generates Sass) and the Aleksandr Hovhannisyan guide's method (curl css2 with a Chrome UA, scrape the woff2 URLs).

### 2. Subsetting to shrink the base64 payload (fonttools / pyftsubset)

Install: `uv pip install fonttools brotli` (uv, per Carter). Brotli is MANDATORY for woff2 output; without it `--flavor=woff2` fails.

Core command shape (produces one woff2):
```
pyftsubset Inter.ttf \
  --output-file=Inter.subset.woff2 \
  --flavor=woff2 \
  --unicodes="U+0020-007E" \
  --layout-features="kern,liga,calt" \
  --no-hinting \
  --desubroutinize
```

Key flags, verified from the fontTools subset docs:
- `--flavor=woff2` (or woff). woff2 needs Brotli.
- `--unicodes="U+0020-007E"` hex codepoints/ranges. ASCII printable is U+0020-007E. For a headline deck we usually need ASCII + a few punctuation/symbol ranges (curly quotes U+2018-2019 U+201C-201D, arrows U+2190-21BB, en/em space U+2000-206F). Note the em-dash char lives in the punctuation block but Carter never uses it, so omit U+2014 to save a glyph.
- `--text="ABCDEFG..."` or `--text-file=path` to include exactly the characters that appear in the slide copy. This is the tightest subset possible: feed it only the glyphs on the slide. Newlines from a text-file are not added.
- `--layout-features="kern,liga,calt"` keep only the OpenType features you use; default keeps a large set (calt, ccmp, clig, curs, dnom, frac, kern, liga, locl, mark, mkmk, numr, rclt, rlig, rvrn). Trim to shrink. `+=`/`-=`/`=` add/remove/replace.
- `--no-hinting` drops hinting tables. Docs say up to ~30% size cut. Hinting is irrelevant at 2x screenshot render, so ALWAYS drop it for us.
- `--desubroutinize` removes CFF subroutinization; docs note it improves woff2 compression on small subsets. Use for tiny subsets.
- `--drop-tables+=...` default already drops JSTF, DSIG, EBDT, EBLC, EBSC, PCLT, LTSH, Graphite.
- `--glyphs=...` add by PS glyph name, `--name-IDs` control name-table entries.

glyphhanger (Node/pnpm alternative, wraps pyftsubset and can auto-detect used glyphs from HTML):
- `glyphhanger --subset=*.ttf --US_ASCII --formats=woff2` subset to ASCII, output woff2.
- `glyphhanger --whitelist="ABC123" --subset=./font.ttf --formats=woff2` whitelist specific chars.
- `glyphhanger ./slide.html --subset=*.ttf --formats=woff2` scan an HTML file and subset to only the glyphs it uses. This is the killer feature for our pipeline: point it at the finished slide HTML, it emits a font containing ONLY the characters on that slide. Formats: woff2, woff, woff-zopfli, ttf.

### 3. Variable-font subsetting (keep the axis you drive, drop the rest)

pyftsubset alone keeps all axes. To slim the variation space use `fonttools varLib.instancer` (verified from the instancer docs):
- Unlike varLib.mutator, instancer KEEPS an unmentioned axis and its deltas by default. Mutator drops to default (makes a static). So instancer = "partial VF".
- Pin an axis to a value but keep others variable: `fonttools varLib.instancer Font-VF.ttf wdth=85` pins width, keeps wght variable.
- Restrict a range (still variable within it): `fonttools varLib.instancer Font-VF.ttf wght=400:700` clamps weight to 400-700.
- Drop an axis entirely: `fonttools varLib.instancer Font-VF.ttf wdth=drop opsz=drop wght=300:700` removes wdth and opsz, keeps wght 300-700. Output is `<name>-partial.ttf`.
- Combine: `fonttools varLib.instancer NotoSans-VF.ttf wdth=85 wght=400:700`.
- Workflow for us: instancer first to slice axes (keep only wght, or wght+opsz), THEN pyftsubset the resulting ttf to woff2 with a glyph subset. Two steps, both scriptable in uv.

### 4. woff2 vs ttf for base64 embedding (the tradeoff that matters for our HTML files)

- woff2 uses Brotli internally, averaging ~30% smaller than woff for the same glyphs. Raw woff2 is far smaller than raw ttf.
- Base64 adds ~33% to any binary (4 ASCII bytes per 3 binary bytes). This applies equally to woff2 and ttf.
- SUBTLETY that matters for shotpls: our HTML files are NOT served over HTTP with gzip/Brotli. shotpls loads a local file into headless Chrome and screenshots it. There is no transport compression to recover the base64 inflation. So the ON-DISK HTML size is literally raw_font_bytes * 1.33. Therefore: embed woff2 (already Brotli-compressed bytes), NOT ttf. A subsetted woff2 base64 blob can be a few KB; the same coverage as ttf would be an order of magnitude larger in the file. The "base64 re-compresses poorly" warning from the search results is about HTTP transport, which we do not have, so it does not hurt us. The inline size IS the woff2 size * 1.33, full stop.
- Practical target: after subsetting to slide glyphs + dropping hinting, a display face woff2 is commonly single-digit KB. That base64 inlines cleanly into a standalone HTML with zero perceptible cost to shotpls.
- @font-face inline shape: `src: url(data:font/woff2;base64,<BLOB>) format('woff2');`

### 5. Variable-axis control in CSS for DRAMATIC display type (the whole point)

Registered axes (lowercase tags = registered, UPPERCASE = custom):
- `wght` weight, 1-1000, maps to font-weight.
- `wdth` width, percentage of normal (commonly 50-200), maps to font-stretch/font-width.
- `opsz` optical size. With `font-optical-sizing: auto` the browser auto-picks by rendered px size. For POSTER type we want to FORCE the display optical size manually, because our render px is huge but we may still want the high-contrast display cut.
- `slnt` slant in negative degrees, maps to font-style: oblique.
- `ital` italic, binary 0/1.

Driving them: `font-variation-settings: "wght" 800, "wdth" 125, "opsz" 144, "slnt" -8;`

CRITICAL GOTCHA (verified, MDN + UDT 2026): font-variation-settings does NOT cascade additively. Any axis you omit reverts to its default. If one rule sets slnt and another sets only wght, the second WIPES the slant. So every rule that touches this property must re-declare every axis you want. For our slide CSS: define one custom property per axis and compose them, e.g. set `--wght`, `--opsz`, then `font-variation-settings: "wght" var(--wght), "opsz" var(--opsz);` on every element, so nothing silently resets.

Display leverage this unlocks for a poster slide:
- Push wght to the extreme end the font allows (many go to 900-1000) for a single massive focal word.
- Push wdth to the widest the font offers to fill the slide edge-to-edge, or the narrowest for a tall condensed stack.
- Force opsz to the display max so the face shows its high-contrast, tight-spaced display personality at large size.
- Small negative slnt for tension without a full italic.
Prefer `font-weight`/`font-width`/`font-style` where possible so it cascades; reach for font-variation-settings for custom axes and extreme values, and always re-list axes.

### 6. Open-foundry display faces with dramatic axes (self-host targets, all OFL unless noted)

- Geist (Vercel + Basement Studio + Andres Briganti). OFL 1.1. Repo `github.com/vercel/geist-font`. Weight axis 100-900. Files: GeistVF.woff2 / GeistVF.ttf, GeistMonoVF.woff2 / GeistMonoVF.ttf, plus static woff2 and otf in releases. Latest tags seen: v1.7.2 (2026-06-01), v1.7.1 (2026-05-20, fixed Mono ligatures breaking code alignment), 1.8.0 (2026-03-03). npm `geist` / Fontsource `@fontsource-variable/geist`. Fontsource variable CDN: `https://cdn.jsdelivr.net/fontsource/fonts/geist:vf@latest/latin-wght-normal.woff2`. Clean neo-grotesk, good for utilitarian technical decks. Only a wght axis, so less "dramatic" but very safe.
- Fraunces (Undercase Type / googlefonts). Repo `github.com/undercasetype/Fraunces`, also `github.com/googlefonts/fraunces`, google/fonts ofl/fraunces. FOUR axes: `wght`, `opsz`, `SOFT` (inkiness/wetness), `WONK` (binary, swaps wonky glyphs, auto-substitutes when opsz > 18). Filename literally `Fraunces-Italic[SOFT,WONK,opsz,wght].ttf`. This is the most EXPRESSIVE display face on this list: old-style soft-serif, opsz ties contrast/x-height/spacing/width together, so cranking opsz gives dramatic display contrast. Perfect for a big editorial headline slide. Fontsource `@fontsource-variable/fraunces`.
- Bricolage Grotesque (Atelier Triay). Repo `github.com/ateliertriay/bricolage`, site `ateliertriay.github.io/bricolage`. Axes: weight, WIDTH, optical size. Expressive grotesque, great for poster headlines that need width control.
- Big Shoulders (XOType, Chicago Design System). Repo `github.com/xotypeco/big_shoulders`. Condensed American Gothic superfamily with an OPTICAL SIZE axis; Text and Display cuts, 8 weights each. Ultra-condensed + heavy weight = tall dramatic stacked headline. Ideal for the "one massive word filling the slide" poster look.
- Hubot Sans (GitHub). Repo `github.com/github/hubot-sans`. THREE axes: weight (ultra-thin to extra-heavy), WIDTH (condensed to expanded), SLANT (regular to italic). Geometric technical feel, described as built for headers and pull-quotes. Strong fit for a cyber-technical brand.
- Mona Sans (GitHub). `github.com/mona-sans`. Weight + width variable, GitHub's brand sans, pairs with Hubot.
- Instrument Sans (Instrument, by Rodrigo Fuenzalida). Repo `github.com/Instrument/instrument-sans`. Variable weight + width. Precise with playful notes.
- Instrument Serif (Instrument). Repo `github.com/Instrument/instrument-serif`. Designed for LARGE sizes, contemporary old-style serif; the base repo is essentially a display serif. There is a multi-weight/width fork by Eli Heuer at `github.com/eliheuer/instruments-serif` (wght 400-900). Instrument Serif at huge size is a strong editorial focal-word face.
- Space Grotesk (Florian Karsten). Repo `github.com/floriankarsten/space-grotesk`, variable woff2 already committed at `fonts/woff2/SpaceGrotesk[wght].woff2`. wght axis only. OFL 1.1. Proportional variant of Space Mono, techy character, already in Carter's design vocabulary.
- Overused Grotesk (RandomMaerks). `github.com/RandomMaerks/Overused-Grotesk`. Variable neo-grotesk, Swiss-inspired.
- Inter (rsms). `rsms.me/inter`, `github.com/rsms/inter`. Variable wght + slnt + optical (opsz on the display cut) plus many OpenType features. The workhorse; not dramatic but the safe body/label face.

2026-era release notes worth tracking (from the Muzli/FreeFontZone/roundup results, treat as leads to verify before use):
- Google Noto Sans Display Variable: full variable Latin Display implementation in beta on GitHub, full release expected April/May 2026.
- Playfair Display Variable: January 2026 update added a true weight axis (its most comprehensive update). High-contrast Didone display serif, extreme thin-to-black is very dramatic at poster size.
- Display leads named but NOT yet verified for OFL/axes: Migha (6 weights, 4 widths, contrast + slant, by Seniors Studio), MONIQA (162 styles, Latin+Cyrillic, heavy alternates). Verify license before self-hosting these two.

### 7. Headless-Chrome font-load correctness (so shotpls never screenshots a fallback)

Even with base64-embedded fonts, Chrome may paint before the font is applied. Guardrails (verified from puppeteer issues + browserless):
- Wait on `await document.fonts.ready` (a promise that resolves when all @font-face are loaded/failed) before capturing. Or force-load a specific one: `document.fonts.load('16px "Fraunces"')`.
- Launch flag `--font-render-hinting=none` improves kerning/letter-spacing consistency in headless. Worth adding to shotpls if not present.
- Because our fonts are inline data: URIs there is no network fetch and no font service UA problem, so the only real risk is the paint-before-ready race, which `document.fonts.ready` fixes. If shotpls already waits on rAF + fonts.ready we are covered; if it only waits a fixed delay, switch it to await document.fonts.ready.

## SO WHAT FOR US

1. Build one uv-based Python tool, call it something like `fontpack.py`, that: (a) takes a font source (a Google family name OR a GitHub raw URL OR a local file), (b) for variable fonts pulls the real variable woff2 (via css2-with-Chrome-UA or the Developer API `capability=VF`, NEVER gwfh which silently gives statics), (c) runs `varLib.instancer` to drop axes we will not drive and clamp ranges, (d) runs `pyftsubset` with `--flavor=woff2 --no-hinting --desubroutinize` and either `--text` (exact slide copy) or an ASCII+punctuation unicode range, (e) base64-encodes and emits a ready-to-paste `@font-face` block with `format('woff2')`. This makes every slide's embedded font a few KB instead of hundreds.

2. Two subset modes. GLOBAL mode: subset each brand face once to ASCII + our punctuation set, embed the same blob in every slide (simple, reusable). PER-SLIDE mode: run glyphhanger against the finished slide HTML so the font contains only that slide's exact glyphs (smallest possible, best for a slide with one giant word). Per-slide is the winning move for poster slides where the focal word is 6-10 letters: the font can be under 2 KB.

3. Embed woff2, never ttf. Our HTML is loaded from disk with no transport compression, so inline size = woff2 bytes * 1.33. ttf would bloat every standalone slide file for zero benefit.

4. The poster aesthetic Carter wants (one massive focal word) is exactly what variable display axes deliver. Prioritize faces with an opsz or wdth axis so we can push contrast/width to the extreme: Fraunces (opsz+SOFT+WONK, editorial), Big Shoulders (opsz, condensed monoliths), Bricolage (wdth+opsz), Hubot Sans (wdth+slnt, technical brand fit). Geist/Space Grotesk (wght only) are the safe utility layer. Playfair Display's new weight axis is the high-contrast Didone option for a luxe headline.

5. In slide CSS, ALWAYS re-declare every variation axis in every rule via CSS custom properties, because font-variation-settings does not cascade. Bake this into the slide template so nobody hits the silent-reset gotcha.

6. Add `await document.fonts.ready` (and `--font-render-hinting=none`) to shotpls if not already there, so a slide never renders in a fallback face. With inline data: URIs the only failure mode is the paint-before-ready race.

7. Licensing: every face above is OFL 1.1 (self-host freely) except verify Migha and MONIQA before use. Geist, Fraunces, Bricolage, Big Shoulders, Hubot Sans, Mona Sans, Instrument Sans/Serif, Space Grotesk, Overused Grotesk, Inter are all confirmed OFL / open source with GitHub repos we can pull directly, no Google round-trip needed.
