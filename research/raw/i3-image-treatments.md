<!-- © AngelaMos | 2026 | i3-image-treatments.md -->

# I3: Image Treatment Styles That Make Ordinary Source Images Look Designed

Division I (Visual craft depth). Mission: image-treatment techniques achievable inside a self-contained HTML pipeline (CSS, SVG filters, or Python Pillow), where every asset is inlined and rendered by headless Chrome (shotpls) at 2160x2700. For each: what it signals, when it reads premium vs gimmicky, and the concrete technique.

Date of research: 2026-07-10. Recency-weighted to Apr-Jul 2026 where trend claims are made; technique sources (CSS/SVG/Pillow mechanics) are timeless and labeled as background where older.

---

## SEARCHES RUN (actual queries)

1. duotone gradient map image treatment CSS instagram carousel design 2026
2. halftone effect CSS SVG filter web design technique 2026
3. risograph riso print effect graphic design texture technique 2026
4. sticker cutout outline effect image SVG CSS drop-shadow design trend 2026
5. Pillow python duotone gradient map convert grayscale colorize technique
6. Floyd-Steinberg dithering image effect design trend graphic 2026 1-bit aesthetic
7. collage tape scrapbook analog aesthetic graphic design trend 2026 torn paper cutout
8. CSS scanline CRT VHS effect repeating-linear-gradient overlay technique premium 2026
9. mix-blend-mode multiply photo over paper texture grain overlay design technique premium
10. SVG feColorMatrix duotone filter feComponentTransfer gradient map exact values tutorial
11. anti-AI human design trend 2026 texture imperfection premium brands riso dither authenticity
12. gradient map two color photo treatment editorial poster design 2026 Spotify style
13. Turbo Dither ascii-magic dither effect searches up 900% 2026 trend data
14. CSS grain noise texture SVG feTurbulence overlay premium poster paper 2026

Pages fetched and read in full: Frontend Masters pure-CSS halftone; ishadeed cut-out effect; pythoninformer Pillow ImageOps colour effects; ASCII Magic dithering guide; CSS-Tricks SVG duotone; Codrops feComponentTransfer duotone; Codrops Efecto WebGL article; FontLab ditherpunk essay.

---

## TREND CONTEXT (why treatments matter right now, Apr-Jul 2026)

The macro driver behind every technique below is one 2026 movement: anti-AI, human, tactile design. Because generative AI made smooth, gradient-y, "AI-looking" imagery free and ubiquitous, the premium signal has inverted. Texture, imperfection, and analog print artifacts now read as "a real human made this," which is exactly the trust signal a cybersecurity-authority creator wants.

- Creative Bloq's 2026 trends analysis names "Anti-AI Crafting" the defining trend of the year: scanned textures, ink bleeds, asymmetrical layouts that break the grid (creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026).
- Named brands that rebranded into deliberately "messy," tactile aesthetics in this cycle: Affinity (Canva), Eventbrite, Radford Beauty, with bouncy serifs, hand-scrawled type, tactile packaging (crea8ivesolution.net/anti-ai-design-trends-2026, tsidigitalsolution.com). Gucci is cited in the luxury/imperfection framing (tsidigitalsolution.com).
- "Dither effect" searches are up roughly 900% year over year in 2026 (ascii-magic.com/blog/complete-guide-to-dithering). Stated drivers: 1-bit as a deliberate counter-move to perfect AI imagery, riso for indie publishing, Game Boy/8-bit nostalgia in album art and brand identity.
- Risograph revival explicitly tied to "anti-AI, human-centered" positioning; an Atlanta Journal-Constitution piece dated 2026-04 covers creatives moving to Riso (ajc.com/arts-entertainment/2026/04/atlanta-creatives-turn-to-trendy-risograph-to-color-their-world).
- Digital collage / "zine culture" / "digital scrapbooking" framed as the visual antidote to AI slop; torn paper edges and scotch-tape textures cited on Nike and Spotify content (artcoastdesign.com/blog/how-to-master-digital-collage-trend, itsnicethat.com features 2026 graphic trends).

So-what at a glance: our winning decks already lean on real artifacts (badges, book covers) doing 47k-65k views and 2,700-6,600 saves. Treating those source images (duotone, halftone, sticker-cut, grain) is the cheapest way to make one strong image read as designed rather than pasted, which is the exact poster-not-newspaper direction the swarm is chasing.

---

## FINDINGS BY TREATMENT

Each entry: SIGNAL (what it communicates), PREMIUM VS GIMMICKY (the calibration line), TECHNIQUE (concrete, pipeline-ready), SOURCE.

---

### 1. DUOTONE (two-tone color grading of a photo)

SIGNAL: editorial, brand-locked, "art-directed." Maps any messy source photo onto exactly two brand colors so a stock screenshot or headshot suddenly belongs to the deck. Music/festival/editorial connotation (Spotify-poster energy).

PREMIUM VS GIMMICKY: premium when the two colors are a tight, low-chroma brand pair (one near-black shadow, one bright highlight) and the source has real tonal range. Gimmicky when it is high-saturation complementary (hot magenta + cyan) on everything, which reads as a 2016 Instagram filter. Rule: shadows to a dark brand ink, highlights to paper/near-white or one accent, never two loud hues.

TECHNIQUE A, SVG filter (best for real photos, runs natively in headless Chrome):
Two-stage filter. Desaturate, then remap each RGB channel through a 2-value table (shadow color -> highlight color). Exact working code from CSS-Tricks:

```
<svg xmlns="http://www.w3.org/2000/svg">
  <filter id="duotone">
    <feColorMatrix type="matrix" result="grayscale"
      values="1 0 0 0 0
              1 0 0 0 0
              1 0 0 0 0
              0 0 0 1 0"/>
    <feComponentTransfer color-interpolation-filters="sRGB">
      <feFuncR type="table" tableValues="0.7411764706 0.9882352941"/>
      <feFuncG type="table" tableValues="0.0431372549 0.7333333333"/>
      <feFuncB type="table" tableValues="0.568627451  0.05098039216"/>
      <feFuncA type="table" tableValues="0 1"/>
    </feComponentTransfer>
  </filter>
</svg>
```
Apply with `filter: url(#duotone)` on the img/element. Pick colors by dividing each RGB channel by 255: the FIRST value in each feFunc is the shadow color, the SECOND is the highlight. So shadow #bd0b91 gives R 189/255=0.741, G 11/255=0.043, B 145/255=0.569. Source: css-tricks.com/using-svg-to-create-a-duotone-image-effect, tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer. (Technique is pre-2026 background; still the canonical method.)

Note: that desaturation matrix (three rows of `1 0 0 0 0`) copies the RED channel to all three outputs, i.e. a red-channel luminance proxy. For truer grayscale use ITU-601 weights per row: `0.2126 0.7152 0.0722 0 0` repeated on R, G, B rows.

TECHNIQUE B, Python Pillow (best when we want a baked PNG, no filter reliance):
`ImageOps.colorize(image, black, white, mid=None, blackpoint=0, whitepoint=255, midpoint=127)`. Convert to grayscale first, then colorize.
```
from PIL import Image, ImageOps
im = ImageOps.grayscale(Image.open('badge.jpg'))
im = ImageOps.colorize(im, black='#0b0b12', white='#eafff2')  # duotone
im.save('badge-duotone.png')
```
`black` maps dark pixels, `white` maps light pixels. Source: pythoninformer.com/python-libraries/pillow/imageops-colour-effects.

TECHNIQUE C, CSS-only cheap version (pseudo-element overlay + blend): stack the color over the grayscaled image with `mix-blend-mode` (multiply for the dark, screen/lighten for the light) and `filter: grayscale(1)` on the base. Lower fidelity than the SVG filter but zero SVG. Source: freefrontend.com/css-duotone (page 403'd on fetch but the two-approach split, mix-blend overlay vs feColorMatrix, was confirmed via search summary).

---

### 2. GRADIENT MAP / TRITONE (smooth multi-stop remap, richer than duotone)

SIGNAL: same brand-lock as duotone but with a mid-tone, so the image keeps depth instead of flattening. This is the "acid poster" / album-art look when the mid is a punchy accent.

PREMIUM VS GIMMICKY: premium with 3 well-chosen stops (dark -> muted mid -> bright), gimmicky when you jam 4+ rainbow stops (turns into a heat-map). Gradient maps are the technique behind editorial/music/festival poster treatments (kittl.com/blogs/gradient-design-trend-stl, behance gradient-map projects).

TECHNIQUE, SVG (extend the duotone table to N values): with `type="table"`, the browser creates n-1 ranges for n values, so 3 values = dark/mid/light tritone with smooth interpolation between. Add proper luminance desaturation first:
```
<feColorMatrix type="matrix" values=".33 .33 .33 0 0
                                      .33 .33 .33 0 0
                                      .33 .33 .33 0 0
                                      0 0 0 1 0"/>
<feComponentTransfer color-interpolation-filters="sRGB">
  <feFuncR type="table" tableValues="0.1  0.5  0.9"/>
  <feFuncG type="table" tableValues="0.1  0.7  0.3"/>
  <feFuncB type="table" tableValues="0.8  0.5  0.2"/>
</feComponentTransfer>
```
Each triple is shadow / mid / highlight for that channel. Keep `color-interpolation-filters="sRGB"` or colors muddy. Source: tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer.

TECHNIQUE, Pillow tritone: same colorize call with the `mid` param.
```
ImageOps.colorize(gray, black='#12121a', white='#eafff2', mid='#3ad1ff',
                  blackpoint=0, midpoint=127, whitepoint=255)
```
`mid` applies at grey 127; 0-127 blends black->mid, 127-255 blends mid->white. Constraint: blackpoint <= midpoint <= whitepoint. Source: pythoninformer.com/python-libraries/pillow/imageops-colour-effects.

---

### 3. HALFTONE (dot-screen print simulation)

SIGNAL: print/newsprint/comic-book, tactile ink-on-paper. Reads as "made, not rendered." Strong fit for a security/hacker brand doing a retro-tech or zine aesthetic.

PREMIUM VS GIMMICKY: premium when dot size is small-to-medium and the halftone sits UNDER type or only on one hero image. Gimmicky when huge dots cover the whole slide and eat legibility. One halftoned focal image per slide, never halftone the whole poster.

TECHNIQUE A, pure CSS in 3 declarations (Frontend Masters, current): dots whose size tracks image luminance, using a radial-gradient pattern + a luminance "map" layer + a hard contrast crush.
```
background:
  radial-gradient(closest-side, #777, #fff) 0 / 1em 1em space,
  linear-gradient(90deg, #888, #fff);   /* replace this with your image as the map */
background-blend-mode: multiply;
filter: contrast(16);
```
The radial-gradient tiles the dots; the second layer (swap in your image) modulates dot size; multiply combines them; `contrast(16)` snaps greys to black/white dots. Caveats from the article: do NOT map pure #000->#fff (bad results), use mid-greys like #777/#888; bigger dot cells need higher contrast; for clean edges on large dots chain `filter: contrast(80) blur(2px) contrast(5)`. Source: frontendmasters.com/blog/pure-css-halftone-effect-in-3-declarations.

TECHNIQUE B, SVG halftone: the classic route is feImage/pattern + threshold, or the well-known SVG halftone generators. Simpler and more controllable for our pipeline is to bake it in Pillow (below) so we get an exact PNG at 2x resolution. Source references: css-irl.info/css-halftone-patterns, thenewcode.com/613/Create-a-Halftone-Effect-with-SVG, codepen.io/shshaw/pen/BNgoqg (SVG halftone generator).

TECHNIQUE C, Pillow bake (recommended for print-stable large PNGs): downscale to grayscale, then for each cell draw a filled circle whose radius scales with local darkness (classic CMYK-style single-screen). This is a short custom loop with `ImageDraw.ellipse`; because we render at 2160x2700, keep the cell grid coarse (image-pixel cell of 8-16 at final res) so dots survive scaling and do not turn to mud.

RESOLUTION WARNING (applies to halftone AND dither): fine dot patterns turn to mud when the browser downsamples or the platform recompresses. Design the dot/pixel grid at FINAL 2160x2700 scale, not at 1080x1350 then upscaled, and keep cells chunky enough to read after Instagram's JPEG pass.

---

### 4. DITHERING / 1-BIT (error-diffusion or ordered pixel screens)

SIGNAL: ditherpunk, Game Boy Camera, early-Mac, lo-fi hacker. In 2026 this is the loudest "human-made, anti-AI" flex because AI imagery is smooth and dither is aggressively not. Directly on-brand for a cybersecurity/terminal aesthetic.

PREMIUM VS GIMMICKY: the algorithm choice IS the premium line.
- Floyd-Steinberg (error diffusion, 1976): organic, faithful tonal detail. The default look people picture for "classic 1-bit." Good middle ground.
- Atkinson: cleaner, more contrasty, brighter highlights, deeper shadows. The classic Macintosh look. Reads intentional and crisp.
- Bayer / ordered (2x2, 4x4, 8x8): regular repeating matrix, tiles cleanly, rock-solid in animation. Larger matrices (8x8, 16x16) start looking gimmicky because the pattern is so visibly regular.
- Blue noise: random-looking but evenly distributed, no structured pattern and no error-diffusion noise, described as the most natural-looking / most sophisticated option.
Premium call: Atkinson or blue noise for a refined look; Floyd-Steinberg for honest retro; keep Bayer SMALL (2x2/4x4) or it reads as a cheap filter. Source: ascii-magic.com/blog/complete-guide-to-dithering, turbodither.com/learn/floyd-steinberg-vs-atkinson.

Trend proof: "dither effect" searches up ~900% YoY in 2026 (ascii-magic.com). Ditherpunk lineage: term coined by Surma 2021; catalyzed by Lucas Pope's Return of the Obra Dinn (2018); heritage from Bill Atkinson's 1983-84 MacPaint/HyperCard dithering (blog.fontlab.com/2026/03/24/dithering-ditherpunk-and-bill-atkinson).

TECHNIQUE, Pillow (Floyd-Steinberg is built in and free):
```
from PIL import Image
im = Image.open('badge.jpg').convert('L')     # grayscale
im = im.convert('1')                          # 1-bit, Floyd-Steinberg by default
im.save('badge-dither.png')
```
`convert('1')` applies Floyd-Steinberg error diffusion out of the box. For Atkinson/Bayer/blue-noise you need a custom numpy kernel (Pillow only ships Floyd-Steinberg and threshold). For a 2-color (not black/white) dither, dither on grayscale then recolor the two levels via `ImageOps.colorize` or a palette swap. To dither into a small color palette use `.convert('P', palette=..., dither=Image.FLOYDSTEINBERG)`.

BROWSER/HEADLESS OPTION: real-time WebGL dithering exists (Codrops "Efecto" article, 2026-01-04, by Pablo Stanley, covers Floyd-Steinberg, Atkinson, Jarvis-Judice-Ninke and 5 others, 31 preset palettes, plus CRT scanlines/curvature/chromatic aberration). Efecto itself is a closed web app (efecto.app), not an open library, so we cannot import it. For OUR pipeline: bake dither in Pillow (deterministic, exact) rather than shader, unless we write our own fragment shader. Note: headless Chrome CAN run WebGL via ANGLE/SwiftShader for a static render, so a hand-written shader is technically viable, but Pillow is the lower-risk path. Source: tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders.

---

### 5. STICKER / CUTOUT OUTLINE (die-cut white border around a subject)

SIGNAL: sticker-pack, playful-but-designed, pops a subject off the background. Big 2026 sticker trend is die-cut following the illustration outline plus deliberately imperfect outlines (printshop.paperlust.co/blog/top-10-sticker-trends-in-2026, stompstickers.com sticker trends).

PREMIUM VS GIMMICKY: premium when it is ONE cut-out hero (a badge, a headshot, a tool logo) floated over a flat/textured field with a clean consistent border. Gimmicky when everything is a sticker with drop-shadows stacked into a scrapbook mess. One or two cutouts per slide.

TECHNIQUE A, CSS drop-shadow that contours a transparent PNG: `filter: drop-shadow()` follows the alpha edge of the image (only the opaque pixels cast shadow), unlike `box-shadow` which uses the bounding box. Stack multiple drop-shadows in different directions to fake a solid outline sticker border:
```
filter:
  drop-shadow( 2px  0 0 #fff) drop-shadow(-2px  0 0 #fff)
  drop-shadow( 0  2px 0 #fff) drop-shadow( 0 -2px 0 #fff)
  drop-shadow( 2px 2px 0 #fff) drop-shadow(-2px -2px 0 #fff)
  drop-shadow( 2px -2px 0 #fff) drop-shadow(-2px 2px 0 #fff);
```
Each offset paints a white sliver around the alpha edge; 8 directions approximates a solid ring. For a thicker ring, layer a second group at larger offsets. This is the accepted CSS-only sticker-outline trick. Source: ishadeed.com/article/thinking-about-the-cut-out-effect, joshwcomeau.com/css/designing-shadows, w3schools.com/graphics/svg_fedropshadow.asp.

TECHNIQUE B, SVG feMorphology for a TRUE thick even outline (cleaner than stacked shadows): dilate the alpha with `feMorphology operator="dilate"`, flood it a color, composite the original on top.
```
<filter id="sticker">
  <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="thick"/>
  <feFlood flood-color="#ffffff" result="white"/>
  <feComposite in="white" in2="thick" operator="in" result="ring"/>
  <feMerge><feMergeNode in="ring"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
```
`radius` = outline thickness in px, even all the way around, no 8-shadow approximation. This is the correct premium version. (feMorphology dilate + flood + composite is the standard SVG outline pattern; the ishadeed article confirms drop-shadow contours the shape but does not cover feMorphology, so this is the upgrade.)

TECHNIQUE C, Pillow bake: after making a cutout (or using an already-transparent PNG), `ImageOps.expand` on the alpha / or paste a dilated white silhouette behind, to bake the border into the PNG for perfect edges at 2x.

Prerequisite: you need a transparent-background subject. If the source is a rectangular screenshot, background-removal is a separate step (rembg / remove.bg / manual). The outline techniques only shine on already-cut alpha.

---

### 6. COLLAGE / TAPE / SCRAPBOOK (torn edges, tape strips, layered scraps)

SIGNAL: zine, human, hand-assembled, "made at a desk not in a template." The strongest expression of the 2026 anti-AI tactile trend. Reads authentic and un-fakeable-by-AI.

PREMIUM VS GIMMICKY: premium when it is restrained: one torn edge, one strip of tape, one rotation break from the grid, over otherwise clean type. Gimmicky when every element is torn+taped+rotated (turns into literal clutter, the newspaper problem the swarm is fighting). The trend cites Nike and Spotify using torn paper + scotch-tape textures for authenticity (artcoastdesign.com, itsnicethat.com). Intentional imperfection, not actual chaos.

TECHNIQUE, torn paper edge (SVG feTurbulence displacement mask): give a rectangle a rough, paper-torn edge by masking with a turbulence-displaced clip, or simpler, use a pre-made torn-edge PNG mask inlined as a data URI and `-webkit-mask-image`. The generative route:
```
<filter id="torn">
  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="18"/>
</filter>
```
Apply to the element or to a solid mask shape to get an irregular ripped border. baseFrequency low + scale ~15-25 gives paper-tear; high frequency gives fine deckle. Source: tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence.

TAPE STRIP: a small rotated `<div>` with semi-transparent off-white/amber fill, `mix-blend-mode: multiply`, slight `filter: blur(0.3px)`, and soft edges, over the corner of a "taped down" scrap. Multiply makes the tape read as translucent over whatever is under it. Rotate the pinned scrap 1-3deg off-grid.
COLLAGE STACK: layer 2-3 duotoned/halftoned scraps at small rotations with the sticker white-outline (technique 5) on the top one, plus a global grain overlay (technique 8). This is how you get "designed collage" instead of "pasted clip art."

---

### 7. RISOGRAPH (mis-registered, grainy, limited-ink layered print)

SIGNAL: indie print studio, screen-print, hand-run. Vibrant flat inks + slight imperfection. Explicitly the anti-AI, human aesthetic in 2026 press (ajc.com 2026-04, illustration.app/blog/best-risograph-effect-plugins-and-tools-for-digital-design-in-2026).

PREMIUM VS GIMMICKY: premium when limited to 2-3 spot inks with a subtle misregistration and grain. Gimmicky when overdone: heavy offset + neon everywhere looks like a broken printer, not a chosen aesthetic. The whole point is "crisp but slightly imperfect," a controlled 1-2px offset, not a glitch.

TECHNIQUE (recreate the print physics, not a one-click filter): riso = separate ink layers, halftone dots per layer, paper tone, roughness, slight misregistration. Build it as a stack:
1. Split the image into 2-3 tonal separations (e.g. shadows -> ink A, midtones -> ink B). In Pillow, threshold/mask the grayscale into bands, colorize each band its ink color.
2. Halftone each ink layer (technique 3) so each ink is a dot screen.
3. Offset each layer 1-3px in a different direction (the misregistration) and composite with `mix-blend-mode: multiply`.
4. Lay everything on a warm paper base (#f4efe3 sort of tone), and add grain (technique 8).
The reference tools that encode exactly this logic: Super Riso 2 (grain, dithering, misprints, multi-color ink overlap), RizzCraft (True Grit), RetroSupply Risograph Print Pack. We are not using those (Photoshop actions), we are reproducing their layer recipe in CSS/Pillow. Source: illustration.app/blog/best-risograph-effect-plugins-and-tools-for-digital-design-in-2026, retrosupply.co/blogs/tutorials/risograph-textures-tutorial, truegrittexturesupply.com/products/rizzcraft.

---

### 8. GRAIN / NOISE OVERLAY (the universal "premium print" finisher)

SIGNAL: analog, printed, tactile. The single cheapest move that stops a flat digital slide from feeling sterile/AI. Also kills gradient banding.

PREMIUM VS GIMMICKY: premium at LOW opacity (film-grain subtlety) as a top layer on the whole slide. Gimmicky when heavy enough to be its own texture. Grain is the seasoning, not the dish. "Adds a premium, printed feel... eliminates banding artifacts" (ibelick.com, css-tricks.com/grainy-gradients).

TECHNIQUE A, SVG feTurbulence noise overlay (resolution-independent, inline):
```
<filter id="grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/>
</filter>
```
High baseFrequency (~0.7-0.9) = fine film grain; the feColorMatrix alpha value (0.06) sets grain strength. Put it on a `position:absolute; inset:0; pointer-events:none` overlay div, blend with `mix-blend-mode: overlay` (grain) or multiply (dirt). Perf note: feTurbulence over a large area is paint-heavy; for our STATIC single render that is fine, but the resolution-independent alternative is a small tiling noise PNG inlined as data URI, which renders faster and is recommended for big areas. Source: css-tricks.com/grainy-gradients, freecodecamp.org/news/grainy-css-backgrounds-using-svg-filters, tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence.

TECHNIQUE B, generators for baked noise: fffuel.co/nnnoise (SVG noise generator), ultimatedesigntools.com/tools/noise-generator, to produce a tileable noise asset we inline.

---

### 9. BLEND-MODE COMPOSITING OVER PAPER TEXTURE (photo lives on paper, not on a rectangle)

SIGNAL: the image was PRINTED onto the deck's paper stock, not pasted over it. Ties a hero image into the background so the slide reads as one designed surface.

PREMIUM VS GIMMICKY: premium when multiply/overlay makes the image inherit the paper's tone and texture; gimmicky when the blend washes the image out (readability loss). Keep the paper subtle enough that faces/badges stay legible.

TECHNIQUE (the modes and what each does): multiply is the workhorse for a printed look, white parts of the texture go transparent, dark parts darken the photo, "looks like printing on paper." Overlay is best for adding grain/depth (film-grain overlays). Soft Light and Hard Light for contrast texturing. The recipe: put the paper/grain texture as a layer, set `mix-blend-mode: multiply` (for paper tone) or `overlay` (for grain), tune opacity. Source: imagitool.com/blog/texture-blend-modes-overlay-multiply-soft-light, photoshopessentials.com, slrlounge.com/photoshop-blending-modes.
In CSS: image element at the base, paper-texture element above it inside an `isolation: isolate` wrapper with `mix-blend-mode: multiply`. Use `isolation: isolate` so the blend does not bleed into other layers, and duotone/tint text can stay readable via that isolation boundary.

---

### 10. SCANLINE / CRT / VHS (screen-artifact overlay)

SIGNAL: terminal, retro-tech, surveillance/hacker. Directly thematic for cybersecurity content, which is our niche.

PREMIUM VS GIMMICKY: premium as a WHISPER (faint scanlines + micro chromatic edge), gimmicky when heavy (RGB-split text everywhere, thick black bars) which screams "CSS demo." One faint scanline layer + optional 1px chroma split on the hero, nothing more.

TECHNIQUE, scanlines (repeating-linear-gradient overlay):
```
.scanlines::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0 2px,
    rgba(0,0,0,0.18) 2px 3px);
}
```
A ~3px cycle reads as horizontal scan-bands. Optional VHS chroma bleed on type: `text-shadow: 1px 0 cyan, -1px 0 magenta`. For a static render skip flicker/drift animations (they do nothing in a single-frame PNG). Source: codepen.io/meduzen/pen/zxbwRV, aleclownes.com/2017/02/01/crt-display.html, gist.github.com/lmas/6a1bd445bc7a7145245085f4a740d3f5, deloughry.co.uk/posts/building-glitch-effects-with-css. (Technique background; still current CSS.)

---

## SO WHAT FOR US

1. Baked Pillow > live CSS filter for the money treatments (duotone, dither, halftone). The pipeline already renders standalone HTML, but for treatments that must be pixel-exact and print-stable at 2160x2700, pre-processing the source image with a tiny Python (uv) step is more deterministic than trusting a browser filter to downsample cleanly. Recommendation: add an `imgtreat.py` uv script exposing four functions: `duotone(img, dark, light)`, `tritone(img, dark, mid, light)`, `dither(img, algo)`, `halftone(img, cell)`. All are ~10-30 lines on Pillow/numpy. Output PNG gets base64-inlined into the slide like every other asset. This keeps the "one self-contained HTML per slide" rule intact.

2. Duotone/tritone is the highest-leverage single move for us. Our best decks already win on real artifacts (badges, book covers). Duotoning those into ONE brand pair (dark ink + one accent) is what turns "pasted screenshot" into "art-directed poster" with zero new content. Use `ImageOps.colorize` (dark = near-black brand, light = paper/near-white, optional mid = single accent). This is the fastest path to poster-not-newspaper on the image side.

3. Dither and halftone are the on-brand texture flexes. We are a cybersecurity/terminal brand and 2026 is peak ditherpunk (+900% searches). A dithered or halftoned hero image is both trend-aligned AND thematically native (screens, print, lo-fi). Use Atkinson or blue-noise for refinement, Floyd-Steinberg for honest retro; keep Bayer small. But: only ONE treated hero per slide, treatment sits under type, never over it. This is exactly the "one focal point" poster discipline the brief demands.

4. Grain is the free finisher on every slide. A single low-opacity feTurbulence or tiling-noise overlay (mix-blend overlay, alpha ~0.05) makes flat slides read printed and kills banding on any gradient. Cheapest premium-up we can apply globally as a shared partial. Do this on the whole deck.

5. Sticker-cutout needs a background-removal step first, then feMorphology (not stacked drop-shadows) for a true even white ring. Worth it for ONE floated hero (a badge, a headshot) per key slide. Do not sticker everything.

6. Collage/tape/riso are the "go bold" options, use sparingly. They are the strongest anti-AI signals but also the easiest way to recreate the busy-newspaper problem. Rule: one imperfection gesture per slide (one torn edge OR one tape strip OR one 2deg rotation), over otherwise disciplined type. Riso is a full layer-stack (separations + halftone + 1-2px misregistration + paper + grain), so reserve it for a hero slide or cover, not every slide.

7. Calibration line that repeats across every treatment: premium = restraint + one focal move + brand-locked color. Gimmicky = high saturation, heavy opacity, every-element-treated. This maps 1:1 onto the swarm's poster-not-newspaper thesis: treat the image, do not decorate the whole slide.

8. Pipeline reality check: SVG filters (feColorMatrix, feComponentTransfer, feMorphology, feTurbulence, feDisplacementMap) and CSS blend/gradient tricks ALL render natively in headless Chrome with no external deps, so they are fully compatible with shotpls and the inline-assets rule. WebGL shader dithering (Efecto-style) is technically renderable in headless Chrome via ANGLE/SwiftShader but is higher-risk and closed-source; prefer Pillow-baked dither. There is no external-URL dependency anywhere in these techniques, everything can be inlined.

---

## GAPS / HONEST DEAD-ENDS

- freefrontend.com/css-duotone returned HTTP 403 on fetch; the two-approach split (mix-blend overlay vs feColorMatrix) is confirmed via the search-result summary but I did not read its exact CSS snippet firsthand.
- No firsthand cybersecurity/tech-creator carousel was found actually USING these treatments in-feed; the trend evidence is design-industry sources (Creative Bloq, Codrops, ASCII Magic, FontLab) plus named-brand rebrands (Affinity, Eventbrite, Nike, Spotify per secondary sources), not a competitor deck I could screenshot. X/Twitter examples were not fetchable.
- The "+900% dither searches YoY 2026" figure comes from one source (ASCII Magic's own blog); no independent second source corroborates the exact number, treat as directional.
- Atkinson / Bayer / blue-noise dithering are NOT built into Pillow (only Floyd-Steinberg via `convert('1')` and threshold). Implementing the premium variants requires a custom numpy error-diffusion kernel or a matrix threshold; I confirmed the appearance differences but did not locate a single canonical drop-in Python snippet for Atkinson/blue-noise, so that is a small build task, not a copy-paste.
- The Codrops Efecto WebFetch model asserted WebGL cannot run in headless Chrome; that is incorrect for the shotpls use case (headless Chrome renders WebGL via ANGLE/SwiftShader). I flagged the correction but did not independently benchmark a shader render in our exact pipeline.
- Print-scaling guidance for halftone/dither (avoiding mud at large size) is synthesized from general resolution principles plus the ASCII Magic note about exporting up to 4x; I did not find a treatment-specific "design the grid at final resolution" rule stated verbatim in one source.
