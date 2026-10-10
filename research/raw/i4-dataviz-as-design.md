<!-- © AngelaMos | 2026 | i4-dataviz-as-design.md -->

# I4: Data Visualization as a Design Centerpiece on Social Slides

Division I (Visual craft depth). Mission: how elite information designers make ONE chart the hero of a slide, chart-minimalism rules (what to delete), big-number treatments, and salary/comparison presentation patterns that perform on Instagram. This is directly monetizable: Carter posts salary and job-market data often, and his own 90-day data shows image-artifact decks (visual proof) did 47k-65k views / 2,700-6,600 saves versus 10k-18k / 100-570 for text-only template decks. A hero chart is a manufactured visual artifact. This is how to make it look like Reuters and not like a Canva template.

Date of research: 2026-07-10. Recency priority honored: sources skew 2025-2026 where the topic allows (accounts, typography trends, chart-in-video technique, chart-type popularity). Chart-craft fundamentals (Tufte data-ink, declutter, FT color) are older but load-bearing and labeled as background where relevant.

---

## SEARCHES RUN

1. visualcapitalist instagram carousel chart design one chart per slide 2026
2. chartr instagram chart design minimalism big number data visualization
3. chart minimalism what to delete gridlines axis labels declutter data-ink ratio Cole Nussbaumer
4. visualcapitalist voronoi how they make charts style guide color palette annotation 2025 2026
5. salary data visualization instagram carousel design bar chart comparison viral 2026
6. big number stat design typography hero KPI infographic salary "one number" poster treatment
7. FT financial times chart doctor design rules colour palette annotation layer cake 2025
8. pudding.cool how they design scrollytelling one visual per screen color annotation technique
9. reuters graphics design principles chart annotation color accessibility 2025 style
10. chartr voronoi visualcapitalist most popular instagram chart 2024 2025 bar chart ranking design
11. "highlight one bar" OR "grey out" chart technique color single data point emphasis storytelling
12. tech salary map visualization levels.fyi carousel design comparison chart social viral
13. datawrapper how to make bar chart social media instagram square format best practices 2025
14. datawrapper popular chart types 2025 (fetched)
15. "don't use multi-coloured bars" rule 18 add two (fetched)
16. visualcapitalist highest paying jobs cybersecurity salary chart design 2025 2026 ranking bar
17. scale contrast typography huge number tiny label design poster editorial data instagram 2026
18. chartr daily chart design style two-color minimalist annotation "one chart" newsletter aesthetic
19. waffle chart pictograph icon array design when to use vs bar chart social media data
20. "our world in data" OR "chartr" chart design typography font color background aesthetic breakdown 2025
21. treemap bubble chart proportion "$105 trillion" visual capitalist design one graphic hero
22. animated number count up css odometer stat reveal social video slide technique 2025
23. John Burn-Murdoch FT data journalism annotation "title should be the finding" color one story chart tips
24. "before and after" comparison chart slide design social salary two numbers arrow percentage change
25. dumbbell chart slope chart salary range entry senior comparison design when to use two points
26. Datawrapper how to make charts stand out social media contrast highlight color 2025 blog

Fetched pages: flourish.studio social-media-charts guide, storytellingwithdata declutter, displayr 12-ways-single-number, displayr pictographs, datawrapper emphasize-with-color, datawrapper popular-chart-types-2025, onlinejournalismblog charts-on-video (2026-06-23), ONS chart typography build spec, Voronoi creator quickstart, addtwo rule-18, nucamp cyber salary 2026, frontendmasters CSS odometer, schemecolor FT palette. Repeated 403s from visualcapitalist.com article pages (their WAF blocks WebFetch): recovered their design intent via search snippets, Voronoi creator docs, and third-party breakdowns instead.

---

## FINDINGS

### 1. The single governing principle: the title IS the finding, the chart just proves it

John Burn-Murdoch (Financial Times chief data reporter, the person behind FT's most-shared charts) is the clearest voice here. From the GIJN interview (gijn.org/stories/data-visualization-storytelling-tips-john-burn-murdoch) and the Datawrapper interview (datawrapper.de/blog/interview-jburnmurdoch):

- "I put a lot of effort and time into getting that title right." The title is not a label of the topic, it is the CONCLUSION written as a sentence. His COVID example title: "Italy and Spain's daily death tolls are falling. In the U.K. and U.S., daily deaths may be plateauing." That is a headline, not "Daily deaths by country."
- His two-word doctrine: "Minimize distraction. Maximize contrast."
- "Don't just make charts for chart people. Make stories for all people."
- Color as narrative: in the COVID chart he grouped East Asian countries in muted blue (context, deliberately quiet), showed Italy in black, and highlighted UK and US in strong distinct shades (the story). Muted for the crowd, saturated for the protagonist.

Storytelling With Data (Cole Nussbaumer Knaflic) says the same: rule 8 of the declutter checklist is "Add takeaway titles: state conclusions in words; don't assume viewers reach the same interpretation independently."

SO the hero-chart formula for a slide is: (1) a sentence title that states the answer, (2) one chart where 90 percent is grey and one element is loud, (3) direct labels on the loud element, (4) source line small at the bottom. Everything else is deletion.

### 2. Chart minimalism: the exact deletion checklist (what to remove, in order)

From Storytelling With Data's declutter article (storytellingwithdata.com/blog/2019/5/13/declutter-and-question-defaults). Background craft but the definitive list:

1. Remove chart borders. Use white space for separation instead.
2. Delete gridlines. Only keep them if the audience must drag a finger across the y-axis for an exact value. If precision matters, label the data point directly instead.
3. Minimize data labels. Only label where the exact value is important.
4. Thicken the bars. Bars should be WIDER than the white space between them (this is a concrete ratio rule: gap < bar width).
5. Title axes descriptively or delete them. "% of total births" beats "%". Remove unnecessary decimal places. Never rotate x-labels diagonally, keep them horizontal or abbreviate.
6. Reposition legends directly next to the data (or kill the legend and direct-label).
7. Use color sparingly, only to focus attention.
8. Add a takeaway title stating the conclusion.

Tufte's data-ink ratio is the theory underneath (background, 1983): data-ink is the pixels you cannot remove without changing the meaning; everything else is candidate for deletion. A high data-ink ratio has few or no decorative elements.

Important nuance so we do not over-sterilize (Frank Elavsky, frank.computer/blog/2025/04/data-to-ink, April 2025, and the NSF study "Declutter and Focus"): decluttering ALONE barely helps comprehension, it mostly makes charts "look a bit more professional." Decluttering PLUS focus (the highlight/emphasis move) is what actually changes which pattern viewers remember. So minimalism is necessary but not sufficient: you must also point at the answer.

### 3. The grey-out-and-highlight technique (the single most important move for us)

This is the technique that turns a boring bar chart into a poster. Cross-confirmed by Datawrapper, Add Two, get-digital-help, and the online journalism blog.

Datawrapper's "Emphasize what you want readers to see with color" (datawrapper.de/blog/emphasize-with-color-in-data-visualizations) is the master reference:

- "Gray is a storytelling tool: against gray elements, colored ones will stick out."
- Attention order is physics: "People look first at the highest-contrast, most saturated color in your chart. Then at the slightly less saturated colors. Then at the grays." You can literally choreograph first / second / third / last read with saturation.
- The Wall Street Journal 4-level hierarchy example: Level 1 dark saturated (top attention), Level 2 bright but less saturated, Level 3 desaturated grey (0 saturation), Level 4 light grey (least attention).
- Do NOT introduce a new hue for de-emphasized data. Use a DESATURATED version of the same hue, or grey. A new hue reads as "different category," not "less important."
- Concrete implementation for our HTML pipeline: control emphasis with opacity via 8-digit hex. `#cc0000` at 80 percent = `#cc0000cc`, at 30 percent = `#cc00004d`. So we can build a whole chart in one brand hue and just vary the last two hex digits per bar. This is trivial in a standalone HTML slide.

Add Two "Rule 18: Don't use multi-coloured bars" (medium.com/@addtwo/rule-18-dont-use-multi-coloured-bars-60b265f8a620): rainbow bars are chaos. Color on a bar is only justified when (a) spotlighting a specific entity ("their" bar), (b) emphasizing the winner, or (c) above/below a benchmark. Default: one color for the dataset, ONE contrasting highlight for the hero bar. Pick cool recessive colors for background bars, warm for the highlight.

Contrast floor (Datawrapper colors article): background-to-foreground contrast ratio at least 2.5 for big text, at least 4 for small text. For social specifically: "choose higher-contrast, higher-saturation colors" because it has to win against a scrolling thumb, not sit in a quiet PDF.

### 4. Big-number treatments: 12 ways to chart ONE number (ranked for our use)

From Displayr (displayr.com/12-visualizations-to-show-a-single-number). For a poster-style slide showing one salary or one stat, ranked by their assessed social-poster strength:

- STRONGEST for us: Overlay on image (#6), Collage / visual metaphor (#12), Physical objects (#10, e.g. stacked coins, a wall of bricks = memorable, shareable, "unforgettable").
- VERY STRONG: Countable icons / pictograph (#7): each icon = one unit, concrete and memorable. Fill part of an image (#5, "3 of 5 analysts").
- STRONG: Big KPI number in bold display type (#1), color/typography formatting (#2, traffic-light: red for a scary number), donut with the number in the hole (#4), creative typography (#11).
- WEAKER for a static poster: gauge/thermometer (#9, needs a legend), pie (#3).

The reason one giant number works: infographics "commonly use one important number to attract the attention of distracted or busy viewers, add humanity or color to create an emotional connection." A single number carries impact when it stands alone with big simple type.

Scale-contrast rule that makes big numbers look editorial and not like a slide template (from the 2026 poster-typography sources): display type should be 10x-plus body size, not 2x. Extreme scale contrast (a $196,000 at clamp(72-140) sitting above a 14px source line) is the whole poster look. This matches Carter's own tighter-density memory: hero numerics clamp(72-140), display titles clamp(34-60). One monster number, one small label, huge negative space.

### 5. Salary and comparison patterns: which chart for which story

Concrete decision rules Carter can hard-code into a salary-carousel skill:

- ONE salary, hero it: giant number, one-line "what," source small. (Displayr #1 + scale contrast.)
- RANKING of salaries (top 10 jobs): horizontal bar chart, sorted, direct-labeled at the bar ends (dollar value at the end of each bar), grey bars with ONE highlighted (the cyber role Carter is arguing for). Never rainbow. This is the Visual Capitalist "Ranked: the 30 highest-paying jobs" pattern and their most reliable format.
- RANGE from entry to senior (same role, two points): dumbbell / barbell chart. Two dots per row connected by a line, dot 1 = entry pay, dot 2 = senior pay. Emphasizes the GAP (domo.com/learn/charts/dumbbell-plot-chart, chartgo barbell guide). Strictly two points per row, breaks with 3+. Perfect for "SOC analyst: $75k to $145k."
- CHANGE over exactly two time points (2024 vs 2026 pay): slope chart. Lines tilt up or down, emphasizes direction and steepness rather than gap size.
- PROPORTION / part-of-whole ("what share of cyber jobs need a degree"): waffle chart (10x10 grid, each cell = 1 percentage point) or pictograph. Waffle is "visually attractive, tiles well, works beautifully in social graphics where space is tight" (CDC COVE, prettychart, tableau). Use pictographs for small counts (rule of 7 plus or minus 2, keep icons in single or low-double digits) where you want people to FEEL the number, not read it.
- BEFORE / AFTER two numbers: side-by-side with a big arrow and the percent change between them. Contrasting colors for before vs after, arrow shows direction (infodiagram, slideteam before/after templates).

Pictograph vs bar (displayr.com/pictographs-for-proportional-data): pictographs win for small counts and emotional memorability, work "without a legend or axis labels," and surface small-value differences that big bars hide. Bars win for precise comparison across many categories. So: pictograph when the point is "feel this," bar when the point is "rank these."

Real cyber salary numbers with named sources (for actual charts, from nucamp.co top-10-best-paid-cybersecurity-jobs-in-2026, sourced to Motion Recruitment 2026 guide, ISC2, EC-Council, Levels.fyi, Training Camp):
- CISO base $220k-$420k+, total comp $420k-$500k+ (Motion Recruitment 2026; EC-Council)
- Principal Cybersecurity Engineer base $160k-$208k, total $200k-$300k+ (EC-Council; Training Camp; Levels.fyi; Glassdoor)
- Senior DevSecOps Engineer base $160.9k-$198.7k (Motion Recruitment 2026)
- Lead Security Architect base $136k-$204k, total $172k-$190k (Training Camp; Motion Recruitment)
- Cloud Security Architect base $130k-$185k (Nexford; Motion Recruitment)
- Detection Engineer base $156.7k-$198.8k (Motion Recruitment 2026)
- Cybersecurity Manager base $135k-$190k, avg ~$149k (Training Camp; ISC2)
- Penetration Testing Lead base $115k-$168.5k, total often $180k+ (Destination Certification; Training Camp)
- Senior Cybersecurity Consultant base $109k-$162k, total often $190k+ (Programs.com; EC-Council)
Also from Salary.com via search snippets (as of April 2026): Cybersecurity Engineer avg $159,176 (range $127,565-$200,869, 90th pct $246,230); Penetration Tester avg $154,102 (range $116,748-$205,920); CISO avg $385,165. Always print the source on the slide, this is non-negotiable per every dataviz house style below.

### 6. Named elite accounts and their design DNA

- Visual Capitalist / Voronoi (voronoiapp.com, @visualcapitalist). Their format is the gold standard for shareable data posters. Their creator quickstart (about.voronoiapp.com/quickstart-guide-for-creators) hard rules: min width 1200px for square/portrait, 1940px for landscape; design within a 1200x1500 canvas, vertical, mobile-scrollable; "No screenshots of spreadsheets or unpolished Excel charts"; the data source MUST be shown on the graphic; title must "accurately reflect what's being shown"; test colors on your actual phone for contrast. "The $105 Trillion World Economy in One Chart" and "The World's Population at 8 Billion" are their signature one-graphic-explains-everything Voronoi treemap posts (proportional area = magnitude). In 2024 across 3,000+ Voronoi visuals by 100 creators, the most-LIKED was "most spoken languages globally" (their note: "simple and clear takeaways that resonated widely"). Their salary format is the sorted horizontal-bar ranking ("Ranked: the 30 highest-paying jobs in America," "top-paying US jobs that don't require a degree," air traffic controller $144,580 at the top).
- Chartr / @chartrdaily (chartrdaily on Instagram, X, Threads; 516K+ IG followers per search snippet). "The #1 newsletter for visual thinkers." Design DNA: extreme clarity, one chart per story, minimal palette, a plain-language takeaway. Their whole brand is "charts that are very clear and make topics far more accessible." (Note: I could not fetch their IG grid directly to pull exact hex/fonts, flagged as a gap.)
- Financial Times / John Burn-Murdoch. Palette from the FT paper look: warm cream/paper background (#FFF1E0 winter cream, #FFF9F5, ivory #F2DFCE) with FT teal accent #0D7680 (schemecolor.com/financial-times-web-site). The FT Chart Doctor / Visual Vocabulary (github.com/Financial-Times/chart-doctor) is their newsroom chart-type training. Their research finding: readers PREFER charts with many well-placed annotations plus a strong narrative title, it feels more engaging and aids understanding (but the accessibility consensus caps it at 3-4 annotations before overwhelm).
- The Pudding (pudding.cool). Design pattern: pinned visual, big type, one idea per screen, chart animates and annotates itself as narrative walks through the numbers, color used to filter/highlight thousands of points down to the story. Their process advice (pudding.cool/process/how-to-make-dope-shit-part-2): design in a static tool (Keynote/Figma) BEFORE coding, never "design on the fly in JavaScript," expect heavy iteration. Relevant to us: design the slide layout static first, then build the HTML.
- Reuters Graphics / accessibility consensus (Royal Statistical Society datavisguide, WCAG). Never use color as the ONLY encoding (colorblind safety). Contrast 4.5:1 normal text, 3:1 large text. Max 3-4 annotations. Highlight technique baked into the RSS guide: "color focal element, grey out remaining categories." Direct-label bar ends and line endpoints to kill axis-lookup eye movement.

### 7. Exact typography spec for chart text (steal this table)

From the UK Office for National Statistics chart typography build spec (service-manual.ons.gov.uk/data-visualisation/build-specifications/typography), the most concrete public spec found. Font stack: "Open Sans", Helvetica, Arial, sans-serif with `font-feature-settings: "ss01" 1;`. Note they use #222222 not pure black.

- Title (descriptive/finding): Bold 700, 20px / 26px line-height, #222222
- Subtitle (statistical detail): Semibold 600, 16px / 20.8px, #222222
- Source line: Regular 400, 16px / 19.2px, grey #707071
- Axis titles + numeric axis labels: Regular 400, 14px / 16.8px, grey #707071
- Categorical axis labels: Regular 400, 14px, grey #414042
- Annotations: Regular 400, 14px, grey #414042
- Direct labels on bars/numbers: Semibold 600, 14px, #414042 or white on dark bars
- Direct labels on lines/categories: Semibold 600, 14px, in the DATA color
- Floor: minimum 14px (12px only for small multiples)

These are for a normal-size chart; scale up proportionally for a 1080x1350 slide viewed on a phone, but keep the HIERARCHY ratios (title heaviest and darkest, source lightest and greyest). Flourish's Instagram-specific sizing echoes it in rems: 1.5rem headers, 1.3rem subheaders, 1.1rem axis labels/footers. Cross-source font rules: max 2 font families per chart, sans-serif for on-screen, ensure capital-I / lowercase-l / digit-1 are distinguishable, use bold sparingly, avoid italics and all-caps.

### 8. Animated chart slides (the competitor edge: video slides inside a carousel)

Two 2026 sources make this immediately buildable in Carter's headless-Chrome pipeline.

Online Journalism Blog, "Showing charts on video: two essential techniques" (onlinejournalismblog.com, 2026-06-23):
- Technique 1, simplify ruthlessly: cut top-10 to top-3 or top-5; one strong highlight color, everything else grey/pale-blue; title tells the story ("Scunthorpe is the most polluted city in the UK," not "Pollution in each city"); delete redundant legends/axis labels.
- Technique 2, add motion to direct attention: reveal in stages (whole first, then parts sequentially with narration); WIPES on line charts left-to-right to show change over time; VERTICAL wipes on bar charts so bars grow upward; fade non-essential parts; zoom to a data point; arrows/circles connecting annotation text to a point; COUNTER ANIMATIONS for single-number stories; bar-chart races for transitions across time.

Pure-CSS counter/odometer for the count-up number reveal (Frontend Masters, "The Odometer Effect in CSS"), which renders in headless Chrome without JS:
```css
@property --n {
  syntax: "<integer>";
  inherits: false;
  initial-value: 0;
}
@keyframes count { from { --n: 0; } to { --n: 196; } }
/* animate --n, use counter-set n / counter(n) to print it, translateY for the roll */
```
Requires Chrome 120+ (@property, mod(), counter-set), which shotpls' headless Chrome satisfies. For a video slide we render frame-by-frame (the e2 html-to-video research covers the capture side) and let the count-up, wipe, or bar-grow animation play over the frames.

Chart-type popularity signal (datawrapper.de/blog/popular-chart-types-2025): in 2025 the single most-created type was TABLES, then line charts (line+area combined take first when grouped), plus a new "small multiple column charts" category. Tables being #1 is a reminder that a clean, well-typeset table of numbers is itself a legitimate hero, do not assume every data slide needs a bar chart.

---

## SO WHAT FOR US

1. Add a "hero chart" slide type to the carousel skill, distinct from a text slide. Its non-negotiable anatomy: (a) sentence title that states the finding, not the topic; (b) ONE chart, 90 percent grey, one element loud; (c) direct labels on the loud element (dollar values at bar ends, endpoint labels on lines), no legend, no gridlines, no borders; (d) small grey source line at the bottom, ALWAYS present. This is the Voronoi/FT/Reuters house style compressed.

2. Build a grey-out-highlight helper into the HTML generation. One brand hue, vary only the last two hex digits (`#RRGGBB` + opacity byte) per bar: hero bar at FF, context bars at ~40-4D. This is the one move that most separates a poster chart from a Canva template, and it is one line of logic. Warm highlight, cool/grey context.

3. Lock a salary chart-type decision table into the skill: single number = giant number + scale contrast; ranking = sorted grey horizontal bars, one highlighted, direct-labeled; entry-to-senior range = dumbbell; year-over-year = slope; share/proportion = waffle or pictograph; before/after = two numbers + arrow + percent change. Carter posts salary data constantly; this removes the "which chart" decision every time.

4. Big-number slides should use extreme scale contrast (10x-plus, hero clamp(72-140) over a 14px source) and, where possible, upgrade from bare-number to a physical-object or pictograph metaphor (stacked coins, filled human icons), which Displayr rates highest for shareability. This is likely WHY his image-artifact decks (badges, book covers) crushed his text-only decks: they were visual artifacts, not typeset text. A hero chart is a manufactured artifact of the same class.

5. Adopt the ONS typography table as the chart-text default (title bold #222222, source small grey #707071, direct labels in data color), scaled up for phone viewing but keeping the hierarchy ratios. Max 2 fonts, max 3-4 annotations, sans for on-screen. This gives our data slides an instant newsroom credibility layer.

6. Ship animated data slides as the competitor-beating differentiator. Start with the count-up number reveal (pure-CSS @property odometer, renders in headless Chrome) and the vertical bar-grow wipe. These are cheap, they are exactly what the "poster with a moving part" competitors do, and they map directly onto the salary content Carter already makes. A salary number that counts up from 0 to $196,000 as the slide appears is a scroll-stopper with a 20-line CSS cost.

7. Always print the data source on the slide. Every serious house (Voronoi rule, FT, Reuters, ONS) treats an unsourced number as unpublishable. It also doubles as authority signal and screenshot-proof, which helps saves and shares (his high-save decks were reference material people bookmark to cite).

---

## SOURCES

- https://gijn.org/stories/data-visualization-storytelling-tips-john-burn-murdoch/ (FT John Burn-Murdoch: title-as-finding, "minimize distraction maximize contrast", muted-context/saturated-story color)
- https://www.datawrapper.de/blog/interview-jburnmurdoch (JBM: "the key to a good data story is the story itself")
- https://www.storytellingwithdata.com/blog/2019/5/13/declutter-and-question-defaults (8-step declutter checklist; background)
- https://www.datawrapper.de/blog/emphasize-with-color-in-data-visualizations (grey-out-highlight, saturation attention order, 8-digit-hex opacity, WSJ 4-level hierarchy)
- https://www.datawrapper.de/blog/colors (social = higher contrast/saturation; contrast ratio floors 2.5 big / 4 small text)
- https://medium.com/@addtwo/rule-18-dont-use-multi-coloured-bars-60b265f8a620 (no rainbow bars; when one highlight is justified)
- https://www.displayr.com/12-visualizations-to-show-a-single-number/ (12 big-number treatments ranked)
- https://www.displayr.com/pictographs-for-proportional-data/ (pictograph vs bar; icon=units; rule of 7 plus/minus 2; no legend)
- https://www.domo.com/learn/charts/dumbbell-plot-chart (dumbbell for gap between two points; salary range use case)
- https://www.chartgo.com/files/guide/en/barbell-chart.html (barbell/dumbbell two-point comparison)
- https://www.cdc.gov/cove/data-visualization-types/waffle-and-gauge.html (waffle 10x10 grid, each cell = 1pt)
- https://www.tableau.com/blog/viz-variety-show-precise-waffle-charts-68462 (when to use waffle)
- https://about.voronoiapp.com/quickstart-guide-for-creators/ (Voronoi canvas 1200px min, source-on-graphic rule, no spreadsheet screenshots, phone contrast test)
- https://www.voronoiapp.com/ (Visual Capitalist Voronoi platform)
- https://www.visualcapitalist.com/most-popular-visualizations-voronoi-2024/ (2024: 3,000+ visuals/100 creators, most-liked = spoken languages, "simple clear takeaways")
- https://www.visualcapitalist.com/ranked-the-30-highest-paying-jobs-in-america/ (salary ranking bar format; page 403'd to WebFetch, cited via search)
- https://www.schemecolor.com/financial-times-web-site.php (FT palette: cream #FFF1E0/#FFF9F5/#F2DFCE, teal #0D7680)
- https://github.com/Financial-Times/chart-doctor (FT Visual Vocabulary chart-type training)
- https://pudding.cool/process/how-to-make-dope-shit-part-2/ (design static before coding; one idea per screen; iterate)
- https://pudding.cool/process/responsive-scrollytelling/ (pinned visual, big type, one idea per screen, color to filter to the story)
- https://royal-statistical-society.github.io/datavisguide/docs/styling.html (color focal + grey rest; direct labeling; min font, max 2 families, colorblind-safe)
- https://service-manual.ons.gov.uk/data-visualisation/build-specifications/typography (exact chart typography table: sizes/weights/colors)
- https://flourish.studio/blog/social-media-charts-and-graphs/ (Instagram font rems 1.5/1.3/1.1; strip clutter; recreate legends)
- https://www.everviz.com/blog/tips-for-charts-for-social-media/ (title states what to observe; carousels one point each; add motion)
- https://onlinejournalismblog.com/2026/06/23/showing-charts-on-video-here-are-two-essential-techniques-to-make-them-effective/ (2026: simplify + motion; wipes, bar-grow, counter animation, chart race)
- https://frontendmasters.com/blog/the-odometer-effect-in-css/ (pure-CSS @property count-up odometer, Chrome 120+)
- https://www.datawrapper.de/blog/popular-chart-types-2025 (2025: tables #1, then lines; small-multiple columns new)
- https://www.nucamp.co/blog/top-10-best-paid-cybersecurity-jobs-in-2026-highest-salary-roles-ranked (2026 cyber salaries w/ named sources: Motion Recruitment, ISC2, EC-Council, Levels.fyi)
- https://frank.computer/blog/2025/04/data-to-ink.html (April 2025: declutter alone barely helps, needs focus)
- https://par.nsf.gov/servlets/purl/10350268 (NSF "Declutter and Focus" study: focus drives what pattern is remembered)
- https://www.instagram.com/chartrdaily/ (Chartr data-storytelling account, 516K+ followers; grid not directly fetchable)
