<!-- © AngelaMos | 2026 | e3-python-generative.md -->

# DIVISION E / E3: Python-generated visual assets for carousel slides

Scope: Pillow compositing and text layout, matplotlib styled to not look like matplotlib, drawsvg/svgwrite programmatic vector art, manim kinetic typography and diagram animation, moviepy 2.x assembly, generative-art backgrounds (noise/flow fields, dithering). All runnable via uv on headless Linux, output feeding shotpls-style 1080x1350 slides and mixed photo+video Instagram carousels.

Date of research: 2026-07-10. Recency-weighted to 2025 and 2026 releases.

---

## SEARCHES RUN

1. matplotlib brutalist chart style custom font thick strokes not look like matplotlib 2026
2. manim kinetic typography text animation instagram 2026 tutorial
3. moviepy 2.x release changes API 2025 2026 video assembly python
4. manim render transparent background webm alpha channel 1080x1350 vertical portrait resolution config
5. python flow field generative art perlin noise background pillow numpy 2025 vsketch
6. Pillow ImageFont text layout kerning letter spacing multiline anchor align python 2025
7. drawsvg svgwrite programmatic vector art python generate svg 2025 comparison
8. python dithering library ordered bayer floyd-steinberg image hitherdither didder 2025
9. manim community v0.19 v0.20 2025 release SVGMobject latex text pango new features
10. pyfonts load_font matplotlib google fonts local ttf variable font 2025 usage
11. ffmpeg overlay png sequence transparent alpha over background compositing filter_complex 2025
12. instagram carousel video slide specs 2026 mixed photo video mp4 aspect ratio 4:5 duration seconds
13. generativepy py5 vsketch python generative art library 2025 headless render png
14. manim MoveToTarget Write DrawBorderThenFill Transform data chart bar graph animation code example
15. python opensimplex noise library vs perlin-noise numpy vectorized 2025 install uv

Direct fetches: pypi.org/project/moviepy, pypi.org/project/drawsvg, manimclass.com transparent-export, autonomousecon.substack.com matplotlib tools, docs.manim.community FAQ general, zulko.github.io moviepy updating_to_v2.

---

## FINDINGS

### 1. Library versions and headless-Linux install facts (ground truth, verified from PyPI)

- moviepy: latest 2.2.1, released 2025-05-21 (pypi.org/project/moviepy). Supports Python 3.9-3.11. Requires system FFmpeg. v2 is a hard break from v1 (see section 5).
- drawsvg: latest 2.4.1, released 2026-01-04 (pypi.org/project/drawsvg). Pure-SVG works pip-only, but PNG/MP4/GIF raster output needs system Cairo, which cannot be installed via pip. Install extras: `drawsvg[all]~=2.0`. On Debian/Ubuntu that means `apt install libcairo2` then `uv pip install "drawsvg[all]"`.
- manim community: v0.19.0 released 2025-01-20, v0.20.0 released Feb 2026, docs stable is v0.20.1. Two Linux-critical facts from the v0.19 changelog (docs.manim.community/en/stable/changelog/0.19.0-changelog.html):
  - manim 0.19 REPLACED the external FFmpeg dependency with the pyav library. You no longer need system FFmpeg to render with manim. This matters for a clean headless container.
  - The manim install docs now officially recommend `uv` as the installer. This is exactly Carter's stack.
  - manim still needs Pango (via system libpango) and Cairo for the default renderer.
- pyfonts: latest 1.2.0, released 2025-11-19, Python >=3.9 (pypi.org/project/pyfonts).
- svgwrite: officially INACTIVE (maintainer statement on pypi.org/project/svgwrite: "This package is INACTIVE. No new features. Only bugfixes."). drawsvg is built on top of it. Use drawsvg, not svgwrite directly.
- Pillow: stable docs at 12.3.0 (pillow.readthedocs.io). ImageText module and text anchors are current API.
- noise libraries: opensimplex (pure Python, optional Numba for big speedup), vnoise (plottertools/vnoise, pure-Python numpy-vectorized Perlin port, 0.3-4x the speed of the C `noise` lib), vec_noise (numpy-vectorized fork of Casey Duncan's noise). vnoise and vec_noise are the two to reach for on headless Linux because they are pure-Python-plus-numpy, no C build toolchain friction under uv.

### 2. matplotlib that does NOT look like matplotlib (brutalist charts)

Source: autonomousecon.substack.com/p/yes-python-charts-can-look-great ("5 Python Tools to Improve Your Matplotlib Charts"). Five drop-in libraries, all pip/uv installable:

- morethemes: 14 plug-and-play themes (minimal, VS Code dark, FT/WSJ-inspired). Usage: `import morethemes as mt; mt.set_theme("minimal")`.
- pyfonts: load any Google Font, Bunny Font, or arbitrary-URL font file directly into matplotlib without editing the font cache. `from pyfonts import load_font` and `load_google_font()`. Supports local TTF paths and variable fonts (e.g. `FiraCode[wght].ttf`). Version 1.2.0. This is the mechanism to force a brutalist display face (a mono or a heavy grotesk) onto axis labels and titles so the chart carries the same font as the HTML slides.
- HighlightText: selectively style substrings inside one text string (bold, color, different font per word). Kills the need for legends: color the words in the title instead. This is the single biggest "does not look like matplotlib" move.
- drawarrow: real annotation arrows (double-headed, curved, thick, with inflection points), not matplotlib's default thin annotate arrows.
- pypalettes: curated flat color palettes, preview across chart types, export hex or load directly.

The actual "not matplotlib" recipe (from matplotlib.org/stable/users/explain/customizing.html plus the above): drive everything through an `.mplstyle` file or rcParams so it is reproducible per-brand:
- Kill the chartjunk: `axes.spines.top=False`, `axes.spines.right=False`, and for full brutalism kill left/bottom too and draw your own thick baseline.
- Thick strokes: `lines.linewidth: 4`, `patch.linewidth: 3`, `axes.linewidth: 3`. Font weight goes to numeric 700-900 (matplotlib supports 100-900 and named bold/bolder).
- Flat fills, no gradients, no anti-aliased soft shadows. Set explicit hex face colors from pypalettes.
- Set the font via pyfonts-loaded FontProperties passed into every `set_title`/`set_xlabel` call, or register it and set `font.family`.
- Set `figure.dpi` high and `savefig.transparent: True` so the chart drops onto the slide background with no white box. Size the figure in inches so width*dpi lands on the pixel block you want inside the 1080-wide slide (e.g. 9in x 6in at 120dpi = 1080x720 px).
- For a bar chart that reads like a poster: one series, huge value labels drawn as text (not the default tick font), bars in one flat brand color with one bar highlighted in the accent color. That is the whole chart. Everything else deleted.

Brutalist display fonts for the chart face (typewolf.com/top-10-brutalist-fonts, resourceboy.com/fonts/brutalist, both 2026 lists): the genre is heavy geometric grotesques and squared-off monos. Load whichever brand face the HTML slides already use so the PNG chart is indistinguishable from a hand-set slide.

### 3. Pillow compositing and text layout (the base-layer engine)

Source: pillow.readthedocs.io stable 12.3.0 (ImageText, ImageFont, ImageDraw, text-anchors handbook).

- Multiline: `ImageDraw.multiline_text(xy, text, font, align=..., spacing=..., anchor=...)`. `align` accepts left/center/right/justify. `spacing` is inter-line pixels. This is the exact control the HTML slides get from line-height; Pillow gives you the same, so a Pillow-composited slide can match an HTML slide.
- Anchors: the `anchor` parameter (two-letter code, e.g. `mm` center-center, `la` left-ascender which is the default for horizontal text) is how you place a headline dead-center or hang it off a corner without measuring. Full table in the text-anchors handbook.
- Precise measurement: use `font.getbbox(text)` / `ImageDraw.textbbox()` / `textlength()` to get real pixel extents before drawing, so you can fit-to-width (shrink font until it fits the column) and vertically center a block. Note the docs warn concatenated string lengths do not sum due to kerning, so always measure the final string.
- Letter-spacing / kerning: Pillow does not expose a positive tracking value directly, but the `features` parameter (requires libraqm) can DISABLE features: pass `features=["-kern"]` to kill kerning, `-liga` to kill ligatures, or turn on stylistic sets like `ss01`, `dlig`. For real positive letter-spacing (brutalist wide tracking) you draw glyph-by-glyph advancing x by `textlength(char)+track`. That loop is the standard workaround and it is trivial.
- Direction and script: `direction` parameter (ltr/rtl/ttb) and OpenType `features`/`language` require the libraqm system lib. On headless Linux install libraqm to unlock these; without it Pillow still does basic layout.
- Compositing: build each visual band as its own RGBA layer, then `Image.alpha_composite(base, layer)` to stack. Use `ImageDraw` for rules/rects/lines with explicit widths for the thick brutalist strokes. Everything stays lossless until final save.

Base tool version confirmed: Pillow stable 12.3.0, ImageText.Text class accepts text, font, mode, spacing, direction, features, language.

### 4. drawsvg for programmatic vector art (the crisp-geometry engine)

Source: pypi.org/project/drawsvg (2.4.1, 2026-01-04), svgwrite.readthedocs.io.

- drawsvg is the maintained choice; svgwrite is dead. drawsvg is built on top of svgwrite and adds raster export and animation.
- Core value for us: generate resolution-independent vector backgrounds and diagrams (grids, iso-lines, halftone dot fields, connector diagrams, ticket-stub borders, barcode/QR-style motifs) as SVG, then either (a) inline the SVG straight into the HTML slide, no rasterization needed, or (b) `d.save_png()` via Cairo for a flattened PNG.
- Animation: drawsvg supports native SVG `<animate>` tags, keyframe animation, and frame-by-frame render to GIF/MP4/spritesheet. For a carousel VIDEO slide of a simple vector loop (e.g. a scanning line, a drawing-on diagram), drawsvg frame-render is lighter weight than manim.
- PNG/MP4 render requires system Cairo. If you only ever inline SVG into HTML (which shotpls then rasterizes with Chrome), you skip Cairo entirely and stay pip-pure. That is the cleanest path: drawsvg generates SVG string, you drop it inside the slide HTML, Chrome renders it at 2x with the rest of the slide. No second rasterizer, perfectly consistent anti-aliasing with the rest of the slide.

### 5. moviepy 2.x for slide-to-video assembly (verified breaking changes)

Sources: pypi.org/project/moviepy (2.2.1), zulko.github.io/moviepy/getting_started/updating_to_v2.html.

The v2 breaks that matter for a build script:
- No more `moviepy.editor`. Import is `from moviepy import *` or `from moviepy import VideoFileClip, ImageClip, CompositeVideoClip, concatenate_videoclips`.
- Every mutating method renamed `set_` to `with_` and is now outplace (returns a copy): `set_duration` to `with_duration`, `set_fps` to `with_fps`, `set_position` to `with_position`, `set_opacity` to `with_opacity`, etc.
- Some renamed to past tense: `resize` to `resized`, `crop` to `cropped`, `rotate` to `rotated`.
- Effects are now classes implementing an `Effect` abstract class, applied via `clip.with_effects([...])`; `clip.fx()` is gone.
- Dependency simplification: v2 dropped ImageMagick, PyGame, OpenCV, scipy, scikit and now leans on Pillow for image work. Fewer system deps for a headless container. (Still needs FFmpeg, unlike manim 0.19+.)

Assembly pattern for a carousel that mixes still slides and motion slides: make each still slide an `ImageClip(png).with_duration(t)`, make each motion slide a `VideoFileClip(mov)`, layer motion over a still background with `CompositeVideoClip([...])`, sequence with `concatenate_videoclips([...])`, then `write_videofile(out, codec="libx264", fps=30)`. For per-slide video files that must keep alpha you would not use libx264 (no alpha); keep the alpha in the source .mov/.webm and only flatten at the CompositeVideoClip stage against the slide background.

### 6. manim for kinetic typography and diagram animation (the motion engine)

Sources: docs.manim.community stable v0.20.1 (FAQ general, using_text, changelog 0.19/0.20), manimclass.com tutorials, medium.com Berejnoi bar-chart-animation.

Transparent render, the exact facts (docs.manim.community/en/stable/faq/general.html):
- Flag `-t` or `--transparent`. Default video container does NOT support alpha, so with `-t` manim outputs a `.mov` instead of `.mp4`.
- Other alpha-capable formats: `--format=webm` and `--format=gif`.
- Known gotcha (from GitHub issue #3919): the OpenGL renderer does NOT emit a real alpha channel with `-t`; use the default Cairo renderer for reliable transparency.
- Resolution and fps: `-r 1080,1350` sets W,H; or in-script `config.frame_size = (1080,1350)`, `config.pixel_width`, `config.pixel_height`, `config.frame_rate`, `config.transparent = True`, `config.format = "webm"`. A vertical 1080x1350 config makes manim output land exactly on the carousel slide box.
- Practical container recipe: `manim -t --format=mov -r 1080,1350 --fps 30 scene.py SceneName`. The .mov (qtrle/prores-style alpha) is the highest-quality alpha carrier; webm is smaller but VP9-alpha. For final Instagram delivery the alpha is flattened against the slide background anyway (moviepy CompositeVideoClip or ffmpeg overlay), so any alpha format works upstream.

Text and typography engine:
- `Text` is built on SVGMobject and renders non-LaTeX text via Pango (docs.manim.community using_text). So you get real font files, Chinese/Japanese/Korean/Arabic, weights, and per-character control without a LaTeX install. `MarkupText` accepts Pango markup for inline color/weight spans, which is the manim equivalent of HighlightText: color one word in the headline.
- Kinetic typography moves: `Write` (draws text on), `AddTextLetterByLetter` / the v0.19 typing animations (three animations added in 0.19 that simulate typing), `Transform` and `ReplacementTransform` (morph one word into another), `MoveToTarget` (via `generate_target()`), plus `.animate.shift(UP)`, `.scale`, `.rotate`. `DrawBorderThenFill` draws an outline then fills, ideal for a big display word or an icon.
- v0.20 added an `.always` convenience wrapper for updaters, e.g. `d.always.next_to(s, UP)`, cleaner than manual `add_updater`. It also added `--seed` / `config.seed` for reproducible randomness, which matters if a scene uses any random jitter and you need identical re-renders.

Diagram and chart animation:
- `BarChart` mobject (docs.manim.community BarChart) builds labeled bars with values; animate bars growing via `DrawBorderThenFill` or `.animate` on bar heights (Berejnoi Medium walkthrough: data-visualization bar-chart animations with manim). This is how you make a salary-map or job-count chart that draws itself as a video slide, matching the brutalist chart look from section 2 but animated.
- For connector/flow diagrams: `Arrow`, `Line`, `Polygram`, plus v0.19 additions `ConvexHull`, `LabeledPolygram`, `Label`. Animate edges with `Create`/`GrowArrow`.

manim install on Carter's stack: `uv` is officially recommended, needs libcairo and libpango system libs, no FFmpeg needed since 0.19 (pyav).

### 7. Generative backgrounds: noise fields, flow fields, dithering

Flow fields / Perlin (sighack.com "Getting Creative with Perlin Noise Fields", tylerxhobbs.com/words/flow-fields, LouieHext/PerlinFlowField on GitHub):
- Standard technique: build a 2D grid, store an angle at each cell from Perlin/simplex noise (`angle = noise(x*scale, y*scale) * TAU`), release particles that step along the local angle, and draw their trails. Output is the signature organic thread background.
- Python building blocks: numpy for the grid, a vectorized noise lib (vnoise or vec_noise for speed on a big grid), Pillow ImageDraw for the trail strokes, or drawsvg if you want the flow field as vector lines you can inline into HTML.
- opensimplex is the higher-quality noise (fewer directional artifacts than classic Perlin) and gets a big speedup with the optional Numba dep. For a headless container without a compiler, vnoise (pure Python + numpy) avoids the Numba/C build entirely.

Generative-art frameworks (both headless-render capable):
- generativepy (martinmcbride/generativepy, PyPI): general-purpose image/sequence/GIF generation on pycairo, with PIL+numpy bitmap processing. Good for procedural backgrounds and math-y animations that render straight to PNG on a server.
- vsketch (abey79/vsketch): Processing-inspired API, CLI `vsk`, batch export to SVG with seed + config management and multiprocessing. Built for plotter art but the SVG output inlines cleanly into slides. Best when you want many seeded variants of one generative background and pick the best.
- py5 (py5coding.org): Processing for Python 3, has a built-in `noise()`; heavier (JVM under the hood) so less ideal for a lean uv container, but strong if you already think in Processing.

Dithering (for a gritty, printed, halftone/1-bit brutalist texture on images or backgrounds):
- hitherdither (hbldh/hitherdither on GitHub): dithering for PIL with arbitrary palettes. Supports ordered/Bayer (`bayer_dithering` with order param) AND error-diffusion: Floyd-Steinberg, Jarvis-Judice-Ninke, Stucki, Burkes, Sierra variants, Stevenson-Arce, Atkinson. Atkinson is the classic Mac-crunch look; Bayer is the ordered crosshatch look. This is the go-to library.
- Pillow itself does ordered dithering natively via `Image.convert("1")` / `quantize`, but arbitrary-palette control is why hitherdither exists.
- For speed on large images: a Numba-JIT Floyd-Steinberg gist exists (bzamecnik gist), and scipython.com has a clean reference implementation. hitherdither is fast enough for single-slide use.
- "didder" is a Go CLI (searches did not confirm a Python package by that name); do not assume a Python `didder`. Use hitherdither for Python.

### 8. Instagram video-in-carousel delivery specs (2026, so motion slides actually publish)

Sources: igli.app/blog/instagram-carousel-sizes (2026 guide), heyorca.com/blog/instagram-media-specs-best-practices (2026), storrito.com 20-slide explainer.

- Carousel slide size 1080x1350, 4:5 portrait. Exactly Carter's slide box.
- A single carousel can MIX photos and video clips in any order, up to 20 items total.
- All slides share ONE aspect ratio, set by the first slide. Design every slide (still or video) at 1080x1350 or Instagram crops it.
- Video slide: MP4 (or MOV) up to 60 seconds, max 250 MB per video.
- So a motion slide is: render manim/drawsvg/moviepy to a 1080x1350 MP4 (H.264, no alpha needed since it is flattened against the slide bg), keep it short (2-6s loop reads best in-feed), place it among still PNG slides.

### 9. FFmpeg compositing (flatten alpha motion onto a still background)

Source: creatomate.com/blog/how-to-add-a-transparent-overlay-on-a-video-using-ffmpeg, hoop.dev/blog/handling-transparency-in-ffmpeg.

- Overlay an alpha .mov over a still/background: `ffmpeg -i background.mp4 -i overlay.mov -filter_complex "[0][1]overlay" out.mp4`.
- Timed sequence of PNG overlays: `overlay=enable='between(t,0,4)'` chained per interval.
- To preserve alpha through a pipeline use the `format` and `alphamerge` filters and encode image sequences with `-c:v png`; most filters silently drop alpha unless told.
- Practical division of labor: let manim emit the alpha .mov, let ffmpeg (or moviepy CompositeVideoClip) flatten it onto the brutalist slide background at 1080x1350, output H.264 MP4 for Instagram. This keeps the animated element and the static slide chrome as separate, independently editable layers, same philosophy as the one-HTML-file-per-slide pipeline.

---

## SO WHAT FOR US

1. Two clean render paths, pick per asset. STATIC vector or chart art: generate with drawsvg and INLINE the SVG into the slide HTML so shotpls/Chrome rasterizes it with everything else (no Cairo, no second rasterizer, identical anti-aliasing). STANDALONE raster art (dithered photo, noise-field background, matplotlib chart): render to PNG and reference it from the HTML. This means we add almost no new rasterization surface, we mostly feed the existing Chrome pipeline better inputs.

2. The "matplotlib that does not look like matplotlib" problem is a solved, four-library install: pyfonts (force the brand display/mono font onto the chart), HighlightText (color words in the title, delete the legend), pypalettes (flat brand palette), drawarrow (real annotation arrows), all driven by an `.mplstyle` with thick spines/lines and font-weight 800. One shared `brutalist.mplstyle` file plus a helper module gives every chart the poster look. Build that stylesheet once; every salary-map / job-count / stat slide reuses it.

3. Animated carousel slides are legit and shippable NOW. Instagram 2026 allows mixing up to 20 photo+video items at 1080x1350, MP4/MOV, up to 60s. So the poster-carousel can have 1-2 motion slides (a headline that types itself, a bar chart that draws itself, a scanning-line vector loop) among still slides. Keep motion slides 2-6s. This is the single highest-leverage differentiator competitors mostly are not doing well.

4. manim is the right motion engine for our stack, and 2025-2026 removed the two friction points: 0.19 dropped the system FFmpeg requirement (uses pyav), and uv is now the officially recommended installer. It renders transparent .mov/.webm at exactly 1080x1350 via `-r 1080,1350 -t`. Use the Cairo renderer (not OpenGL) for reliable alpha. Text is Pango-based so we use the same real font files as the HTML slides, and MarkupText gives per-word color spans matching our highlight style. No LaTeX needed for text.

5. Assembly is moviepy 2.2.1 (or plain ffmpeg). Motion slide flow: manim emits alpha .mov -> composite over the brutalist slide background (moviepy CompositeVideoClip or ffmpeg overlay) -> flatten to 1080x1350 H.264 MP4 for Instagram. Keep the animated element and the static slide chrome as SEPARATE layers, mirroring the one-file-per-slide philosophy so any layer stays independently editable. Note the v2 API break: `from moviepy import ...`, `with_duration`/`with_fps` (not `set_`), effects are classes via `with_effects`.

6. Generative backgrounds are cheap wins for texture without busyness. A single vnoise flow field (pure Python + numpy, no compiler) rendered as faint vector threads via drawsvg, inlined behind the slide, adds depth with zero reading zones. hitherdither gives the gritty 1-bit/halftone printed texture (Atkinson or Bayer) on any photo or fill for the brutalist edge. Both are one-function calls; make a tiny `bg/` module with `flow_field()`, `dither()`, `noise_wash()` presets.

7. Build order recommendation: (a) `brutalist.mplstyle` + chart helper (immediate, every stat slide benefits), (b) drawsvg background/diagram preset module inlined into HTML (no new deps if Cairo skipped), (c) a `motion/` module wrapping manim scene templates (type-on headline, draw-on bar chart, scanning line) that render to 1080x1350 alpha, (d) a moviepy/ffmpeg `assemble.py` that flattens motion slides onto backgrounds and validates the 1080x1350 / MP4 / <60s / <250MB Instagram constraints before export. All installable in one `uv` env; only manim + drawsvg-raster need the system libs libcairo, libpango (and libraqm for advanced Pillow text shaping).

---

## KNOWN GAPS

- Did not find a named cyber-content creator publicly shipping manim-generated animated Instagram carousel slides specifically; the "animated slides" trend evidence here is the platform spec (mixing allowed) plus general kinetic-typography-for-Instagram sources, not a competitor teardown. Division others may have the competitor examples.
- Exact moviepy 2.x signatures for `write_videofile` alpha/pixel-format args and `concatenate_videoclips` method=compose were not fully confirmed from the v2 migration page (it lists the rename rules but not every parameter). Verify against the live API reference at zulko.github.io/moviepy/reference before coding the assembler.
- Did not benchmark manim render time for a 1080x1350 6s scene on headless Linux; assume it is the slowest step and cache renders.
- No Python package named "didder" confirmed (it is a Go CLI); Python dithering = hitherdither.
