<!-- © AngelaMos | 2026 | i2-composition-grids.md -->

# DIVISION I / MISSION i2: Composition Systems for a 1080x1350 Canvas

Research date: 2026-07-10. Focus: modular grids, asymmetric layouts, diagonal energy,
full-bleed vs margin-framed, rule of thirds vs centered-poster logic, and how the eye is
choreographed on a single static slide. Sources pulled from poster design, album covers,
editorial spreads, and 2026 carousel-specific writing. Every principle below is stated as
an applicable rule, not a vibe.

---

## SEARCHES RUN

1. Instagram carousel design poster composition one focal point 2026
2. swiss grid poster composition rules asymmetric layout editorial 2026
3. album cover composition rule of thirds negative space focal point graphic design breakdown
4. graphic design diagonal composition leading lines eye movement Z-pattern poster 2026
5. best Instagram carousels poster style minimal one word per slide big type designer accounts 2026
6. "carousel" design breakdown full bleed image vs bordered frame margin instagram slide layout
7. iconic album cover composition analysis Unknown Pleasures Blue Note asymmetric grid design
8. editorial magazine spread layout anchor image dominant focal point white space grid breakdown
9. poster design trends 2026 oversized type single image maximalist grid asymmetry brutalist
10. data visualization as design big number chart carousel infographic slide minimal one stat 2026
11. golden ratio spiral composition poster layout focal point placement design applied
12. visual weight balance asymmetrical composition one dominant element counterbalance graphic design rules
13. seamless carousel continuity panorama swipe reveal design technique element crossing slide boundary

Pages fetched and read in full: scrolo.app carousel trends, oboe.com Spotify artwork course,
madegooddesigns.com movement, ixdf.org visual hierarchy, gridmakerpro.com poster-editorial grid,
joseyrecords.com Reid Miles Blue Note breakdown, kittl.com 2026 trends, smashingmagazine.com balance.

---

## FINDINGS

### A. THE MODULAR GRID, WITH THE ACTUAL FORMULA (gridmakerpro.com, poster-editorial)

This is the single most directly usable finding. A modular grid is columns crossed by horizontal
flowlines, producing a field of cells (modules). Elements are only allowed to span WHOLE modules.
That constraint is what makes a busy slide read as ordered instead of scattered.

- Column width formula: `colWidth = (W - (C - 1) * g) / C` where W = live width (canvas minus
  margins), C = column count, g = gutter width. An image or text block that spans n columns is
  `n columns + (n-1) gutters` wide. This is exact CSS-grid math: define the grid, snap everything to it.
- Column counts by medium: posters use 3 to 5 columns (they recombine into large legible blocks);
  magazines 6 to 12; broadsheets 6+. For a 1080-wide slide, a poster-like 3 to 5 column grid is the
  match, NOT a 12-column web grid.
- Flowlines: 2 to 3 horizontal stations per layout. The top one is the "hangline" where display type
  and images hang from. Body detail goes below a lower flowline.
- Named hierarchy placement inside the grid: (1) display type hung from a high flowline sets primary
  rank, (2) image spans multiple column blocks as secondary rank, (3) body detail lives in a single
  column below the lower flowline as tertiary rank. Three ranks, three grid positions. That is the
  whole poster.
- A-series proportion 1:sqrt2 (1:1.414) is the print scaling ratio; not our aspect ratio (we are 4:5)
  but relevant if we ever want a sub-panel that halves cleanly.
- Muller-Brockmann-lineage principle quoted: "the grid system implies the will to systematize, to
  clarify; the will to penetrate to essentials." Structure precedes hierarchy precedes expression.

Swiss-style corroboration (elements.envato, masterclass, gridmakerpro): asymmetric layout, text flush
left or ragged-right (never centered), dominance via oversized-type scale contrast, larger elements
allowed to spill off the page edge. Hierarchy carried by size and weight ONLY, not by boxes and rules.

### B. RULE OF THIRDS vs CENTERED-POSTER LOGIC (ixdf, hopkinsprinting, etiennebonn, oboe)

Two legitimate but opposite systems. Pick one per slide, never blend half-heartedly.

- Rule of thirds: divide the frame with 2 horizontal + 2 vertical lines into 9 cells. Put the focal
  point on a line, ideally at one of the 4 intersections (power points), not dead center. The payoff
  named repeatedly: it forces an even distribution of negative space, which raises readability. On our
  1080x1350 canvas the four power points sit at roughly x=360 / x=720 and y=450 / y=900.
- Centered-poster logic: the opposite discipline. One dominant element locked to the optical center
  (slightly above true center reads better), maximum symmetry, everything else subordinate. This is
  the album-cover / movie-poster move. Use it for cover slides and single-stat slides.
- Golden ratio / spiral (99designs, figma, imagine.art): place the single most important element at
  the eye of the spiral (innermost curl); secondary elements trail outward along the arc, giving a
  natural most-to-least-important reading path. Practical split: divide the canvas so one zone is
  1.618x the other (for 1350 tall that is a split near 835 / 515). Typography ladder: multiply the
  smallest size by 1.618 to step up (e.g. 22 -> 36 -> 58 -> 94).

### C. EYE-MOVEMENT PATTERNS, AND WHICH TO USE WHEN (ixdf, madegooddesigns)

The eye is choreographed by matching the layout to a known scan pattern. On a poster-like slide with
little text, that is almost always Z, not F.

- Z-pattern: eye goes top-left, across to top-right, diagonally down to bottom-left, across to
  bottom-right. Use for low-text visual slides (ads, posters). Put logo/mark top-left, headline across
  the top, key content on the diagonal, CTA bottom-right. This is our default for image and stat slides.
- F-pattern: left-to-right across the top, down the left edge, scanning right when something catches.
  Use only for the rare text-heavy slide. Heatmaps of text-dense pages literally form an F.
- Gutenberg diagram: 4 quadrants; primary content top-left (primary optical area), the terminal /
  action zone is bottom-right. Left-to-right cultures barely see bottom-left (the "weak fallow" corner).
  Rule: never put anything load-bearing in the bottom-left of a slide.
- Poster three-step sequence (madegooddesigns): hook (dominant element) -> context (short explanation)
  -> action (the essential fact: date, URL, keyword). One slide, three beats, largest to smallest.

### D. CREATING MOVEMENT ON A STATIC SLIDE: SIX MECHANICS (madegooddesigns)

Concrete, each is a CSS-doable move:

1. Leading lines: literal or implied lines steer the eye. A column of left-aligned text is itself a
   strong vertical leading line. Image edges and color-field boundaries count as lines.
2. Directional cues: arrows, a pointing shape, gaze direction in a photo, triangles. A face looking
   toward the right edge drags the viewer's eye that way (so on a cover, face the subject INTO the
   copy, never off the slide).
3. Diagonal elements: tilt an image, angle a text block, or use a diagonal divider. Lower-left to
   upper-right reads as ascending / optimistic; upper-left to lower-right reads as descending. Diagonals
   are the only way to inject motion into a static rectangle. Poster-design writing (zekagraphic 2026,
   canva flow) calls diagonal composition "immediate dynamism within a static format."
4. Size progression: order elements largest to smallest to create a directional flow (masthead ->
   subheads -> fine print). This IS the flow on a well-set slide.
5. Repetition with variation: repeat a shape while ramping size/intensity/orientation. A row of circles
   growing left-to-right creates directional movement. Breaking a repetition (one red word in black text)
   yanks attention instantly.
6. Value/color gradient: dark-to-light or warm-to-cool pulls the eye toward the light/warm end. A slide
   dark at top and lighter at bottom pulls the eye downward through the copy.

### E. VISUAL WEIGHT AND ASYMMETRIC BALANCE (kittl, piktochart, 99designs, humanities libretexts)

Asymmetry is what makes a slide feel "designed and modern" instead of "template." The rule is a seesaw:
one big/dark element on one side is balanced by several small/light elements on the other, OR by empty
space on the other. Factors that ADD visual weight:

- Size/scale: bigger = heavier. Balance a large bold heading against a small light subhead.
- Color and contrast: warm colors (red, orange) outweigh cool (blue); a small bright-red mark balances
  a wide pale field. High contrast outweighs low contrast.
- Texture/complexity: a textured or detailed area "tires the eye and holds it there," so it reads heavy.
  A dense area needs a lot of empty space opposite it to balance.
- Position: an element farther from center carries more leverage (seesaw arm), so a small element pushed
  to a corner can balance a big element near the middle.
- Isolation: an isolated element surrounded by empty space gains weight from the isolation itself.

Asymmetric balance is explicitly described as "more dynamic, modern, movement, energy, vitality" vs the
static feel of symmetry. So: symmetry for calm authority (cover), asymmetry for energy (content slides).

### F. ALBUM COVERS AS SLIDE TEMPLATES (joseyrecords Reid Miles breakdown, rollingstone, farout)

Blue Note / Reid Miles is a direct library of one-focal-point poster moves. Named covers and the exact
compositional move, each maps to a slide:

- Takin' Off (Herbie Hancock): clean sans-serif layout, ANGLED composition, one striking B&W portrait
  offset by soft orange. Move: one photo + tilt + a single accent hue. -> our tool/person cover slide.
- The Sidewinder (Lee Morgan): one blocky typeface running horizontally across the sleeve, letters AS
  the primary visual, not supporting text. Move: type-as-image, headline eats the slide. -> word-per-slide cover.
- Idle Moments (Grant Green): monochrome photo, lowercase type, "perfectly weighted negative space."
  Move: restraint plus deliberate empty zones. -> quote / single-idea slide.
- A Night in Tunisia: vibrant red and yellow accents "slice across" a B&W portrait like visual
  percussion. Move: 1 to 2 saturated accent strokes over an otherwise monochrome image.
- No Room for Squares (Hank Mobley): portrait literally turned into a GRID OF OFFSET SQUARES to
  visualize the title, still balanced. Move: fragment one image across a module grid. -> data/mosaic slide.
- Hub-Tones (Freddie Hubbard): oversized type in alternating white and blue, letter size creating
  "syncopated visual phrasing." Move: scale + 2-color alternation within one word.
- Overarching Miles method: "photography like melody, type like rhythm, improvising within structure."
  And he sometimes BROKE his own grid to create tension. Rule for us: set a strict grid, then break it
  once per deck on purpose for a standout slide.

Joy Division, Unknown Pleasures (Peter Saville, rollingstone/faroutmagazine): white pulsar waveform on
pure black, NO band name, NO title on the front. A "stacked plot" of pulsar radio emissions from the
Cambridge Encyclopaedia of Astronomy. The lesson: a single strong data-image with total type restraint
can be the entire composition. Data can BE the art (see section H).

### G. EDITORIAL SPREAD ANATOMY (visualjournalcraft, publitas, azuramagazine)

Five load-bearing parts of a feature spread: hero image (visual anchor), headline/kicker (verbal hook),
drop cap / lede (entry point into text), the grid (invisible structure), white space (emphasis + breath).

- One dominant image rule: every spread with photography must have ONE image "noticeably larger than
  the rest." No two co-equal images. This is the anti-newspaper rule directly.
- Image-led vs text-led: image-led stories lean on one large visual anchor; text-led stories use
  structured columns and lighter imagery. Decide per slide which one it is.
- Minimalist opener: ample white space + simple type + a single strong focal point makes a powerful
  statement. Balance white space against content so nothing feels cluttered.
- Continuity across the spread: design across the fold, not as isolated pages, because people scan both
  pages before choosing where to focus. Direct analogy: design the carousel as one continuous system,
  not 8 independent posters (see section I).

### H. DATA AS DESIGN (visme, designrush by-the-numbers, infogram, venngage)

Turns our numbers (salaries, save counts, cert stats) into the focal point instead of decoration.

- Front-load one oversized stat: open with a single oversized stat in bold color, then support it with
  small charts. Pattern named repeatedly: "one headline number and three supporting visuals with nothing
  else." Annual-report decks open with oversized stat cards (revenue, users, growth) BEFORE any chart.
- Data minimalism is the 2026 direction (infogram, beautiful.ai): fewer data points, stronger hierarchy,
  neutral background, flat icons as the backbone, one takeaway per view. "Show the right thing, not
  everything." Cluttered dashboards are out.
- Applied move: a slide that is nothing but a number at clamp(120-220px) with a 4-5 word label under it
  is a legitimate, high-craft slide. The number is the image.

### I. CAROUSEL-SPECIFIC CONTINUITY / SEAMLESS SWIPE (postplanify, usevisuals, 7labs, scrolo)

Choreography ACROSS slides, which is the carousel version of eye-movement:

- Seamless / panoramic: one continuous image or background sliced across slides so swiping reveals an
  unbroken picture. Build one wide canvas (1080x10800 for 10 slides, 1080x13500 at 4:5) and slice it.
- Visual bridge (Zeigarnik / closure): an element (arrow, product, a word) starts on slide N near the
  right edge, runs OFF the right edge, and continues from the LEFT edge of slide N+1. The half-seen
  element triggers "desire for closure," which drives the swipe. Cited claim: seamless designs got 2x
  higher swipe-through in an analysis of 500+ e-commerce posts; photo-frame/consistent-border carousels
  cited at up to 3.1x engagement vs single image (postnitro, postplanify). Treat multipliers as directional,
  not gospel, but the mechanism (open loop across the edge) is sound.
- Consistency requirement (multiple sources): same fonts, colors, spacing, background treatment across
  every slide so the deck reads as one document, not a stack. First slide sets the aspect ratio for the
  whole post; every following slide must match or Instagram crops/pads it.

### J. SAFE ZONES AND THE PROFILE-GRID CROP (postnitro, buffer, evergreenfeed, creatorflow)

Hard numeric constraints the composition must respect:

- Canvas 1080x1350, 4:5. Confirmed as the max-real-estate portrait size (20% more screen than square).
- Keep critical text and focal elements 150 to 200 px away from ALL edges. Instagram clips edges in feed
  and especially in the profile-grid preview.
- The profile grid crops portrait slides to a tighter center. Anything in the top or bottom ~270px can
  vanish in the grid view. So the FOCAL POINT of the cover slide must live in the vertical middle band,
  roughly y=270 to y=1080, or it disappears on your own profile.
- Minimum type sizes cited for phone legibility: body ~40px on a 1080 canvas, headlines 60px or larger.
  Our density rule (Carter views at ~0.8x) means we go bigger than that for heroes anyway.
- Word budget cited for 2026: 15 to 20 words MAX per slide, one visual anchor each. Poster, not paragraph.

### K. 2026 STYLE DIRECTION (kittl, artcoastdesign, accio, fedexposterprinting)

- Oversized typography is the dominant poster move for 2026: "oversized bold type cuts through busy
  compositions." Bold minimalism plus one statement visual.
- Type collage / type-as-hero: multiple sizes and weights layered as the primary design element.
- Brutalism: stark type, rugged layout, deliberately "unpolished," rejects the sterile early-2020s look.
- Distorted cut: sharp angular cuts and raw layering of photo + text + shape for visual tension (diagonal
  energy, section D3).
- Overall pendulum swing: away from sterile minimalism toward warmth, texture, grain, nostalgia. Grainy
  blur and film grain named specifically. Still one focal point, but with more atmosphere.

---

## SO WHAT FOR US

Concrete changes to how we build @carterperez.dev carousels. These are buildable in the HTML-per-slide
+ shotpls pipeline today.

1. ADOPT A REAL MODULAR GRID IN CSS, 3 to 5 COLUMNS, NOT 12. Define every slide as
   `display:grid` with a 4-column x (2-3 flowline) module system, ~64px margins (inside the 150-200px
   safe zone), consistent gutter. Snap every block to whole modules. This is the mechanical fix for
   "designed newspaper": the grid forbids 6-9 free-floating reading zones. Use the exact width formula
   `(1080 - 2*margin - (C-1)*g)/C` to compute column width once and reuse it.

2. ONE FOCAL POINT PER SLIDE, ENFORCED BY THE THREE-RANK RULE. Every slide gets exactly one dominant
   element (image, number, or one giant word) hung from the high flowline, one secondary, one tertiary.
   If a slide has two co-equal things, split it into two slides. This is the editorial "one image
   noticeably larger" rule and the poster three-step (hook / context / action).

3. PICK A LAYOUT LOGIC PER SLIDE TYPE:
   - Cover / single-stat slides: centered-poster or golden-eye logic, symmetric, focal point slightly
     above optical center, in the y=270-1080 safe band so it survives the profile-grid crop.
   - Content slides: rule-of-thirds or asymmetric-seesaw, focal point on a power point (x=360/720,
     y=450/900), counterbalanced by white space or small elements. Flush-left, ragged-right text. Never
     centered body copy.

4. INJECT DIAGONAL ENERGY DELIBERATELY, 1 to 2 SLIDES PER DECK. Tilt one image or run one diagonal
   divider/accent stroke (the Reid Miles "slice across" move, the 2026 distorted-cut trend). Lower-left
   to upper-right for optimistic/ascending topics (salary up, level up); the reverse for warnings. Do NOT
   tilt everything, it becomes noise. This is our antidote to flat static template feel.

5. BUILD ALBUM-COVER SLIDE TEMPLATES DIRECTLY FROM BLUE NOTE:
   - "Sidewinder" template: one word as a horizontal type slab that eats the slide (word-per-slide cover).
   - "Takin' Off" template: one tilted B&W-ish image, one accent hue, clean sans headline.
   - "No Room for Squares" template: one image fragmented into an offset module grid for data/mosaic slides.
   - "Unknown Pleasures" template: one strong data-image (a waveform, a chart line) on a dark field with
     near-zero type. Reserve for the deck's standout / cover.
   Set the grid strictly across the deck, then BREAK it once on purpose (Miles' tension move) for the one
   slide you want people to stop on.

6. MAKE NUMBERS THE ART. For salary-map / proof / stat decks: one oversized number at clamp(120-220px)
   in a bold accent, a 4-5 word label, nothing else. One headline number + three tiny supporting marks
   max. This is the data-minimalism 2026 direction and it matches our own data (image-artifact decks
   crushed text-template decks 47-65k views / 2.7-6.6k saves vs 10-18k / 100-570). The number is an image.

7. CHOREOGRAPH ACROSS SLIDES WITH OPEN LOOPS. Add a visual bridge on at least 2 transitions: an element
   (arrow, keyword, image) that runs off the right edge of slide N and resumes on the left edge of N+1,
   or a continuous background/rule that carries across. Exploits closure to force the swipe. And design
   the deck as ONE continuous system (shared grid, palette, type, background), not 8 unrelated posters.

8. RESPECT THE HARD ZONES. 150-200px edge safe margin, focal point of the cover in the vertical middle
   band so it survives the profile-grid crop, first slide sets the ratio for all. Heroes far bigger than
   the 60px minimum given our 0.8x-zoom density preference.

9. VISUAL-WEIGHT DISCIPLINE FOR ASYMMETRY. When we go asymmetric, counterbalance the one heavy element
   with empty space or a small far-corner mark, using the seesaw: warm/saturated/isolated/textured =
   heavy; balance a big dark block on the left with one small bright accent pushed to the far right. Never
   center-everything as a reflex, that reads static and template.

10. KILL BODY-COPY DENSITY AT THE STRUCTURAL LEVEL. 15-20 words max per slide, hierarchy by size and
    weight ONLY (Swiss rule), not by bordering every zone in a card. This directly reverses the "6-9
    stacked reading zones" problem. Thin rules + white space for hierarchy, matching Carter's existing
    thin-not-blocky memory. One structural-decoration moment per slide, the rest is type + space.

---

## GAPS / DEAD ENDS

- Could not fetch live X/Twitter or Instagram profiles of specific poster-carousel creators; WebFetch is
  blocked on those and search did not surface named cybersecurity/tech creator handles known for
  poster-style decks. Named references here are album/poster designers (Reid Miles, Peter Saville), not
  IG creators. A manual scroll of competitor handles is still needed to name-check the animated-video-slide
  competitors mentioned in the brief.
- Smashing Magazine balance article did NOT contain quantitative visual-weight formulas; the weight
  factors in section E are assembled from kittl/piktochart/99designs/libretexts, all qualitative. No
  source gave a numeric weight equation (none appears to exist; it is judgment-based).
- yesimadesigner and one visualjournalcraft URL returned empty/insufficient content on fetch; the
  editorial-spread specifics in section G come from the search snippets plus publitas/azura, not a fully
  read primary tutorial with exact pixel proportions.
- Engagement multipliers cited (2x swipe-through on 500+ posts, 3.1x photo-frame, 1.92% carousel
  engagement) come from marketing-blog sources (postplanify, postnitro, trymypost), not primary platform
  data. Treat as directional evidence for the mechanism, not hard numbers.
- No source gave a ready-made CSS-grid template for 1080x1350 specifically; the modular-grid formula from
  gridmakerpro is print-general and I mapped it to our canvas myself.

---

## SOURCES

- scrolo.app/blog/top-trending-instagram-carousel-design-ideas-in-2026
- oboe.com/learn/spotify-artwork-design-1iunndr/composition-techniques-in-album-cover-design-3
- madegooddesigns.com/movement-in-graphic-design/
- ixdf.org/literature/article/visual-hierarchy-organizing-content-to-follow-natural-eye-movement-patterns
- gridmakerpro.com/grids/design-templates/poster-editorial/
- joseyrecords.com/blogs/news/cool-by-design-10-of-the-best-reid-miles-blue-note-album-covers
- kittl.com/blogs/graphic-design-trends-2026/
- kittl.com/blogs/symmetrical-asymmetrical-balance-in-art-adv/
- smashingmagazine.com/2015/06/design-principles-compositional-balance-symmetry-asymmetry/
- 99designs.com/blog/tips/the-golden-ratio/
- en.wikipedia.org/wiki/Album_covers_of_Blue_Note_Records
- rollingstone.com/music/music-news/joy-divisions-unknown-pleasures-cover-the-science-behind-an-image-191126/
- faroutmagazine.co.uk/joy-division-unknown-pleasures-album-cover-story/
- visualjournalcraft.com/article/magazine-spread-design-tutorial
- publitas.com/blog/how-to-design-a-magazine-layout/
- azuramagazine.com/articles/magazine-page-layout-how-to-use-image-and-graphic
- visme.co/blog/best-data-visualizations/
- designrush.com/best-designs/infographics/trends/by-the-numbers-infographics
- infogram.com/blog/10-trends-in-data-visualization-to-watch-in-2026/
- postplanify.com/blog/instagram-carousel-guide
- usevisuals.com/blog/how-to-create-a-seamless-panoramic-carousel-in-figma
- 7labs.io/article/seamless-instagram-panorama-carousel-free-tool.html
- postnitro.ai/blog/post/photo-frame-carousel
- postnitro.ai/blog/post/instagram-carousel-dimensions-your-ultimate-guide
- creatorflow.so/blog/instagram-carousel-posts-guide/
- trymypost.com/blog/instagram-carousel-algorithm-2026-guide
- artcoastdesign.com/blog/graphic-design-poster-trends-2026
- elements.envato.com/learn/swiss-style-graphic-design
- masterclass.com/articles/swiss-design
- zekagraphic.com/portfolio/poster-design-series-2026-74-79-by-zeka-design/
- piktochart.com/blog/asymmetrical-balance/
- figma.com/resource-library/golden-ratio/
