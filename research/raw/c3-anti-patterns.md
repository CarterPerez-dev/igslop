<!-- © AngelaMos | 2026 | c3-anti-patterns.md -->

# DIVISION C: Anti-patterns, AI/Canva tells, and brand-consistency-without-sameness

Research date: 2026-07-10. Recency priority: April to July 2026. Older material labeled BACKGROUND.

The through-line: our carousels are not "bad." They are BUSY and TEMPLATE-UNIFORM. That is a
differentiation failure, not a quality failure. Every source below converges on the same point:
slop does not mean ugly, it means indistinguishable. The fix is intentional variation inside a
recognizable system, plus killing decorative chrome so ONE thing per slide carries the weight.

---

## SEARCHES RUN

1. Instagram carousel design mistakes 2026 too busy cluttered slides
2. Canva slop AI-generated carousel design tells 2026 how to spot
3. poster style carousel one focal point minimal design 2026 Instagram
4. why carousels look template-y same slide skeleton design critique 2025 2026
5. gradient text overuse glassmorphism AI design cliche 2026 designers hate
6. brand consistency without every post looking identical carousel series design system 2026
7. Adrian Krebs Show HN landing pages AI slop audit 1590 patterns study
8. stock 3D blob illustration Corporate Memphis dead 2026 design cliche
9. designer thread every slide same layout deck monotony break rhythm variation carousel
10. film grain noise texture overlay overused fake grunge design 2026 cliche
11. competing accent colors too many colors carousel one accent color rule design
12. poster design one idea big type editorial layout vs infographic newspaper social media 2026
13. "carousel" designers Instagram 2026 broke rules editorial magazine layout no template
14. recognizable brand carousel series vary layout templates system rhythm not identical 2026 creator
15. what makes design look AI generated 2026 uniform padding rounded corners centered symmetric
16. gradient text on headlines AI tell overused stop using flat color typography 2026
17. GIGAZINE design slop Show HN unoriginal patterns 46 percent clean

Pages fetched and read in full: adriankrebs.ch/blog/design-slop, developersdigest.tech AI design slop,
925studios.co AI slop web design guide, creativeboom.com 10 trends creatives are over, HN thread
47864393, 2slides.com why AI slides look fake, superdesign.dev why AI design looks generic,
prg.sh purple gradient piece.

---

## FINDINGS

### 1. THE PRIMARY STUDY: Adrian Krebs, "Scoring Show HN submissions for AI design patterns"

Source: https://www.adriankrebs.ch/blog/design-slop/ (published 2026-04-20). Cross-referenced by
GIGAZINE (https://gigazine.net/gsc_news/en/20260423-design-slop/, 2026-04-23) and Developers Digest
(https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it). HN discussion:
https://news.ycombinator.com/item?id=47864393.

Method (matters because it is exactly our stack): Krebs loaded 1,590 Show HN landing pages in
headless Chrome via Playwright, ran an in-page script that walks the DOM and reads computed styles,
and scored each page against 16 DETERMINISTIC CSS/DOM patterns. No LLM judge (deliberately, to avoid
the bias he was measuring). We render HTML to PNG the same way (shotpls headless Chrome), so these
DOM/CSS tells are literally detectable in our own slide files.

Result buckets:
- Heavy slop (4+ patterns): 22% (347 sites)
- Mild (2-3 patterns): 32% (508 sites)
- Clean (0-1 patterns): 46% (735 sites)

Most common single tells:
- Permanent dark mode with medium-grey body text + all-caps labels: 34%
- Gradient backgrounds: 27%
- Icon-card grids: 22%

The 16 patterns (the canonical checklist to design AGAINST):
Fonts:
1. Inter everywhere, especially centered hero headlines
2. LLM-favored combos: Space Grotesk, Instrument Serif, Geist
3. Serif-italic accent word inside an otherwise-Inter headline
Colors:
4. "VibeCode Purple" (a specific lavender-purple leaking from image-gen prompts)
5. Permanent dark mode + medium-grey body + all-caps section labels
6. Low-contrast body text on dark (fails WCAG AA)
7. Gradients everywhere (backgrounds, text, buttons) + colored glows/large box-shadows/bloom
Layout:
8. Centered hero with generic sans-serif H1
9. Colored badge placed directly ABOVE the hero headline
10. Colored left/top card borders, 3-4px stripe, usually purple/blue. A commenter: colored left
    borders are "almost as reliable a sign of AI-generated design as em-dashes for text."
11. Identical feature cards with the icon positioned above the text
12. Numbered step sequences (1, 2, 3)
13. Stat banner rows (horizontal band of metrics)
14. Emoji sidebars / emoji-decorated nav
15. All-caps headings and section labels
CSS:
16. shadcn/ui defaults + glassmorphism

Krebs' thesis, verbatim in spirit: slop pages "are not bad, just uninspired. They can still convert
fine." The failure mode is that when >50% of pages trigger the same patterns, "standing out becomes
harder" and they "no longer create memorable brand impressions in a sea of similar pages."

DIRECT HIT ON US: our current slide skeleton contains at LEAST these patterns simultaneously per
slide: kicker/badge above headline (pattern 9), all-caps HUD/labels (15), stat block (13), a rule +
tag row that behaves like colored-border chrome (10/11 family), numbered pager (12-adjacent). That is
4-5 of Krebs' 16 tells STACKED ON A SINGLE SLIDE, which is precisely "heavy slop" by his scoring, even
though our craft is high. Busy = we are hitting multiple tells at once.

### 2. THE ONE THAT DESCRIBES OUR EXACT PROBLEM: uniform slide skeleton across a whole deck

Source: 2Slides, "Why AI Slides Look Fake in 2026 (And the 5 Fixes That Actually Work)"
https://2slides.com/blog/why-ai-slides-look-fake-and-how-to-fix (published 2026-04-17). Cites a
Q4-2025 eye-tracking study of 200 business-deck viewers. 5 perceptual tells drove 87% of
"this is AI" identifications:

1. Uniform typographic rhythm: every slide mirrors the same headline length, bullet count, line-height.
   Human decks swing wildly ("some slides have 3 words, some have 47"); AI normalizes to "a
   comfortable median." THIS IS OUR CORE SIN. Every one of our slides has ~the same word count, same
   number of zones, same rhythm.
2. Over-saturated illustration style (pastel gradient characters, isometric cities in 3 purple tones,
   2px-stroke icon sets).
3. Stock-placeholder imagery (diverse teams in glass rooms, handshakes over laptops).
4. Generic stock phrasing / corporate jargon.
5. "Suspiciously clean layouts": perfect alignment, uniform aspect ratios, zero hierarchy variation.
   Reads "like a spreadsheet pretending to be a presentation."

The 5 fixes (15-20 min per 15-slide deck), all directly portable:
1. BREAK typographic rhythm deliberately: 2-3 word slides next to 10-14 word slides; drop one slide to
   a single 72pt pull-quote.
2. Swap ~2 of 10 visuals for REAL photography (phone photos, whiteboard sketches) to break the pattern.
3. Add small intentional imperfections / "fingerprints": a background rotated 0.5 degrees, a logo
   bleeding 2px past the margin.
4. Rewrite opener/closer in first-person voice ("I want to walk you through...", "My recommendation
   is..."). First-person is "the single strongest authenticity signal."
5. Leave ONE slide deliberately sparse: a transition slide with one centered sentence in large type,
   no bullets, no chrome. They call this "confident emptiness."

Their tool human-likeness ranking makes the causal point: template-with-variation tools score highest
(2Slides 78, Beautiful.ai 71, Pitch 68), auto-generate-everything tools lowest (Canva Magic Design 58,
Gamma 54). "Tools that rely on human-designed templates score higher than tools that auto-generate
every visual element." Translation for us: a system with intentional variation beats a rigid generator.

### 3. WHY IT HAPPENS (mechanism) and what "clean" costs

Source: superdesign.dev, Jason Zhou, "Why AI Design Looks Generic (and How to Fix It)"
https://superdesign.dev/blog/why-ai-design-looks-generic (published 2026-06-15, updated 2026-06-26).
Concrete AI-slop signature he lists:
- Fonts: Inter or Roboto, "rarely anything with personality"
- Color: purple-to-indigo gradients, specifically #6366F1 to #8B5CF6
- Layout: centered hero + single CTA
- Components: three rounded cards with icon decorations
- Background: #FFFFFF or near-white grey
- Details: subtle shadows at ~0.1 opacity, rounded corners on everything
Origin traced: Tailwind's `bg-indigo-500` default saturated tutorials/component libraries, making that
hue the highest-probability output for "modern button." He cites the Developers Digest audit finding
>50% of Show HN launches shared identical fingerprints (Inter + lavender + glassmorphism + numbered
steps), and an r/vibecoding thread with 426+ upvotes on the uniformity.

His root-cause framing (usable as our design principle): generic happens when one prompt collapses
three jobs, "a taste director, an explorer, and an engineer." Fix is PROCESS not prompt-wording:
(1) set direction with real references, (2) explore several distinct options in parallel, (3) lock a
reusable spec BEFORE building. "Better phrasing hits a ceiling quickly."

Corroborating mechanism piece: prg.sh, "Why Your AI Keeps Building the Same Purple Gradient Website"
(2025-10-26, BACKGROUND but on point). Same Tailwind `bg-indigo-500` origin story. Fixes: explicit
constraints (avoid Inter, name a palette, one orchestrated load animation, depth over solid color);
describe an aesthetic REFERENCE not a generic ask ("color palette of a 1970s ski lodge: burnt orange,
avocado green, warm browns"); and NEGATION prompts (tell the model what to avoid to lower its
probability weight).

### 4. THE DESIGN-COMMUNITY "SO OVER IT" LIST (what reads as cliche in 2026)

Source: Creative Boom, Tom May, "10 trends that creatives are so over in 2026"
https://www.creativeboom.com/insight/10-trends-creatives-are-so-over-in-2026/ (2026-04-21). Quotes
are from surveyed working designers.
1. AI slop: "polished with AI and templates but lack sense of intention."
2. AI caricatures/portraits (Pixar/Ghibli/action-figure conversions, "the AI portraits on LinkedIn").
3. Glassmorphism / liquid glass: "Glass everything." Note: Apple's 2025 Liquid Glass announcement
   "turbocharged the aesthetic at exactly the moment the backlash was already building."
4. Gradients: "Four-pointed star for AI logos and gradients for everything. Give it a rest."
5. Lazy minimalism: "Minimalism without soul." (Important: minimal is NOT automatically safe. Empty
   with no purpose reads as lazy, not premium.)
6. Lazy maximalism: "Super maximalist designs that are hard to read and aren't well done." (This is
   literally our failure mode, the busy version.)
7. Canva / template culture: "All the flesh/beige Canva stuff on Instagram." In 2026 people recognize
   Canva templates the way they used to recognize stock photos.
8. Y2K / retro nostalgia (chrome type, pixel fonts, low-fi textures).
9. Bento grids: overused everywhere post-Apple. "Bento boxes... but can't stop using them."
10. Motion for its own sake: "Motion for motion's sake... The trend I'm tired of is dishonesty."
    CRITICAL for our animated-slide ambition: adding a video slide is NOT automatically good. If motion
    does not carry meaning it reads as decorative dishonesty. Motion must communicate substance.

The meta-point from the piece: "the complaints aren't really about aesthetics; they're about
intention. The work that gets under people's skin isn't bad because it uses gradients, glass, or
bento grids. It's bad because it uses them without thought, without purpose."

### 5. THE 925STUDIOS TELL LIST (Yusuf, Lead Designer, 2026-07-10, freshest)

Source: https://www.925studios.co/blog/ai-slop-web-design-guide
- Typography: Inter default with system fallback signals "never intentionally styled"; single-font
  systems (no display pairing).
- Uniform 16px border radius across all components = flat hierarchy; identical 24px padding everywhere
  = zero intentional variation.
- Purple-to-blue gradient in hero/buttons/backgrounds as "the most safe choice."
- Stock photo tell: "diverse group of people looking at a laptop in impossibly well-lit office."
- AI illustration tell: "slightly too smooth, slightly too symmetrical, with plastic quality."
- Motion tell: buttons that "snap instead of easing," generic fade-in on every element, no hover states.
Fix line worth stealing: "Typography is the single fastest way to escape AI slop." Named alternative
faces: Playfair Display, JetBrains Mono, Bricolage Grotesque. And: "Centered hero + three cards is
the visual equivalent of beige carpet."

### 6. TOO MANY READING ZONES / COMPETING WEIGHT (the busy mechanism, named)

From presentation-design sources (visual hierarchy):
- "An audience facing a slide where every element carries the same visual weight will not process the
  key message faster; they will process the ENTIRE slide more slowly."
- "If you don't decide the order, your slide becomes a visual noise field and people either get
  confused or tune out."
- One-message-per-slide: "Every slide is engineered around a single, unmissable takeaway. Supporting
  data is present but visually secondary."
Instagram-specific corroboration: minimal layouts drive up to 154% more interactions than "messy,
overfilled" ones; the 2026 micro-learning standard is 15-20 words max per slide with one visual
anchor; recommended ~60% of each slide left empty to breathe. Sources:
https://www.socialhabitmarketing.com/article-posts/the-ultimate-guide-to-designing-a-perfect-instagram-carousel ,
https://slidycreator.com/blog/instagram-carousel-trends/ .

### 7. COMPETING ACCENTS (why "multiple accents" is a tell) and the fix

- "When there are too many colors, all the colors are competing for your attention."
- 60-30-10 rule: 60% dominant, 30% secondary, 10% accent; the accent is RESERVED for the single most
  important thing (the one CTA / the one number). Multiple loud accents = "colorful and chaotic mess."
- Keep the palette to 3-5 colors total; limit accent colors to preserve impact.
Sources: https://www.nngroup.com/articles/color-enhance-design/ , https://hype4.academy/articles/design/60-30-10-rule-in-ui .
Our tell: competing accents across HUD row + tag row + button + stat number pull the eye 4 directions.

### 8. FAKE-TEXTURE OVERUSE (grain/noise as the new cliche)

Grain/noise is now the DEFAULT anti-AI move, which means it is becoming its own tell. Guidance:
"the easiest mistake is treating texture like wallpaper instead of using it as atmosphere, something
you feel more than notice"; "choose a SINGLE main texture (grain, paper, halftone, photocopy) and
keep it subtle." Source: https://www.illustration.app/blog/best-free-grainy-texture-overlays-for-anti-ai-design-in-2026 ,
https://elements.envato.com/learn/grunge-design . Takeaway: one texture, low, as atmosphere, never
grain on every slide as a chrome layer.

### 9. STOCK 3D BLOBS / CORPORATE MEMPHIS (dead, do not touch)

BACKGROUND with 2026 confirmation: Corporate Memphis / Alegria (Facebook 2017, the blue bendy-limb
people) fell out by 2023 for "uninspired design" and oversaturation, then a 3D clay/plastic-blob
iteration emerged and is now equally cliche. By 2026 the style is "beyond its peak." Source:
https://en.wikipedia.org/wiki/Corporate_Memphis , https://www.creativebloq.com/news/corporate-memphis-style-is-dead .
Takeaway: no stock 3D blobs, no isometric plastic scenes, no bendy-limb vector people. Ever.

### 10. THE RESOLUTION: recognizable brand WITHOUT every deck looking identical

This is the hardest ask and the sources agree on the shape of the answer: repetition is the raw
material, VARIATION is what turns it from monotony into rhythm.
- "Repetition without variation creates monotony. Rhythm uses repetition as raw material, then adds
  variation in spacing, scale, or color to produce visual movement." (https://www.designyourway.net/blog/what-is-rhythm-in-design/)
- Practical rule for decks: "repeat a consistent layout while CHANGING THE ACCENT ELEMENT to avoid
  monotony." Vary accent color, icon placement, or background treatment per slide "to keep the visual
  experience fresh while maintaining structural consistency."
- Brand-consistency reframe (2026): "For years, brand consistency was defined by sameness... In 2026
  that approach feels increasingly restrictive." The modern move is a MODULAR system: reusable building
  blocks rearranged and recombined, so posts "clearly belong to the same set" without being identical.
  Source: https://www.renderforest.com/blog/design-trends-2026-brand-systems ,
  https://versacreative.com/blog/top-social-media-design-trends-2026/ .
- Series identity is built by a "house style" (same palette + type + layout SYSTEM), not by cloning
  the layout. https://www.truefuturemedia.com/articles/instagram-carousel-strategy-2026 .

### 11. POSTER, NOT NEWSPAPER (the direction to move toward)

- 2026 poster trend: "Hero Characters", one letter/word at huge scale anchors the layout so everything
  else can be understated. Searches for "brutalist design / bold typography / type poster" rose 77%
  YoY. Source: https://www.accio.com/business/poster-design-trends-2026 , https://reallygooddesigns.com/graphic-design-trends-2026/ .
- Editorial carousels are the named 2026 IG move: "shift from generic infographic carousels toward
  editorial-style posts featuring bold headlines, clean layouts, and occasional short clips embedded
  like visual breaks." "Use templates if they help you move faster, not if they make your carousel look
  like everyone else's." Source: https://scrolo.app/blog/top-trending-instagram-carousel-design-ideas-in-2026 .
- Seamless / panoramic bleed (an element crossing the slide boundary) has ~40% higher completion; the
  bleed is what creates "a psychological urge to swipe." Source:
  https://www.truefuturemedia.com/articles/instagram-carousel-strategy-2026 .

### 12. ANIMATED SLIDES INSIDE THE CAROUSEL (the competitor edge, done right)

- IG carousels support up to 20 mixed image+video items; mixed-media carousels get 2.33% engagement vs
  1.80% image-only; algorithm treats mixed media favorably if file size stays optimized. 60s/slide
  limit, 4GB total. Best practice: alternate static and motion for pacing; video on slide 1 as a
  pattern-interrupt, or mid-deck (slides 3-7) as the "solution swoops in." Sources:
  https://postnitro.ai/blog/post/video-in-carousel , https://www.trymypost.com/blog/instagram-carousel-algorithm-strategy-2026 .
- BUT per Creative Boom finding #10 and 2Slides fix #5: motion must MEAN something. A looping decorative
  gradient video slide = "motion for motion's sake" = a tell. The motion slide should either be the
  hook pattern-interrupt or the payoff demo, never filler.

---

## SO WHAT FOR US

Concrete changes to how we build. Each maps to a source above.

1. KILL THE STACKED SKELETON. Our current slide stacks ~6-9 zones (hud, kicker, multi-line headline,
   rule, paragraph, tag row, stat block, pager, button). By Krebs' 16-pattern scoring that is 4-5 AI
   tells on ONE slide (badge-above-headline, all-caps labels, stat banner, numbered pager, card-border
   chrome) = heavy-slop territory despite high craft. Target: max 2 reading zones per slide, ~60%
   empty. One focal point carries the slide.

2. BREAK TYPOGRAPHIC RHYTHM ON PURPOSE (the #1 fix from the eye-tracking study). Right now every slide
   has roughly the same word count and zone count, which is the single strongest "AI/template" tell
   (2Slides tell #1, "comfortable median"). Deliberately swing: a 2-word slide next to a 12-word slide,
   one pure 72pt+ pull-quote slide per deck, one "confident emptiness" transition slide with a single
   sentence and NO chrome.

3. ONE ACCENT, NOT MANY. Enforce 60-30-10. The accent color is spent on exactly ONE thing per slide
   (the number, or the CTA, or the keyword). No decks where the HUD, the tag row, the button, and the
   stat all glow at once. Multiple competing accents is a named clutter tell.

4. STRIP DECORATIVE CHROME TO 1-2 STRUCTURAL MOMENTS PER DECK (also matches Carter's existing
   feedback-thin-not-blocky memory). No hud row + kicker + rule + tag row on every single slide.
   Chrome-on-every-slide is the "uniform skeleton" tell. Let whitespace and one thin rule do hierarchy.

5. AUDIT OUR OWN OUTPUT WITH KREBS' DETERMINISTIC CHECK. We render via headless Chrome exactly like his
   Playwright audit. Build a small DOM/CSS linter that flags our slide HTML for: badge-above-headline,
   all-caps label rows, gradient text, colored left/top border stripes, 3-card icon grids, purple/indigo
   accents (#6366F1-#8B5CF6 range), uniform 16px radius, uniform padding. If a slide trips 3+, it is
   sliding toward slop. This is a genuinely automatable QA gate, worth building.

6. BAN THE OBVIOUS DEFAULTS. No Inter/Roboto as the display face (use a face with personality; 925studios
   names Bricolage Grotesque, JetBrains Mono, Playfair). No purple/indigo gradient. No gradient text on
   headlines (flat, restrained type; if a gradient exists it is an ambient field BEHIND clean type, not
   ON the type). No glassmorphism panels. No bento grids. No stock 3D blobs / isometric plastic scenes /
   bendy-limb vector people. No grain on every slide (one texture, subtle, as atmosphere only).

7. SERIES IDENTITY = HOUSE STYLE + VARIED LAYOUT, NOT A CLONED LAYOUT. To be recognizably @carterperez.dev
   across many decks without every deck looking identical: fix the palette, the display face, the voice,
   and the STRUCTURAL LANGUAGE (thin rules, mono metadata, bleed transitions). Then VARY the layout per
   deck and per slide, and rotate which accent element changes. Consistency lives in the system, not in
   the skeleton. This is a modular-component model, not a single-template model.

8. MOTION MUST EARN ITS SLIDE. When we add animated slides (real competitor edge, +engagement), the
   motion slide is either the slide-1 pattern-interrupt hook or the mid-deck payoff/demo. Never a
   looping decorative gradient. Decorative motion is a named 2026 cliche ("motion for motion's sake",
   "dishonesty"). Alternate static and motion for pacing.

9. LEAN ON A REAL BLEED. One element crossing the slide boundary (the panoramic/seamless move) both
   reads as intentional editorial design AND lifts swipe completion ~40%. This replaces the pager as
   the swipe cue, and pagers are a tell.

10. INTENTION IS THE WHOLE GAME. Every source (Creative Boom, superdesign, 925studios, Krebs) says the
    same thing: slop is not about the ingredient, it is about using it without a reason. For every
    element on a slide we should be able to say why it is there and what it is doing. If we cannot, it
    is chrome, and it goes. That single test, applied ruthlessly, is what will make ours read as
    designed-by-a-human posters instead of generated newspapers.

---

## SUPPLEMENTAL PASS (second C3 agent, 2026-07-10) — additive, corroborating findings

Second research pass with different phrasings. Everything above is preserved; the items below ADD sources and specifics the first pass did not capture. Searches run in this pass: "Instagram carousel design mistakes that look like Canva templates 2026"; "carousel slides look AI-generated visual tells design critique 2025"; "AI slop design 2026 glossy 3D render gradient overuse critique designers reacting against"; "carousel too much text per slide swipe away one idea per slide"; "designers roast AI generated carousel LinkedIn slop identical layout critique 2026"; "brutalist terminal aesthetic design trend 2026 monospace grid technical mono counter to AI slop"; "how to keep carousel series consistent brand without every post looking identical variation system 2025"; "animated video slide inside Instagram carousel motion slide 2026 mixed media"; "one hero moment per carousel deck not every slide decorated whitespace restraint 2026". Pages fetched: builtin.com AI-design-slop-era, vibecodekit.dev ai-slop-design, 925studios ai-slop-design-tells, aigoodies.beehiiv.com aesthetics-2026, mirra.my ai-carousel guide, postnitro video-in-carousel, setproduct retro-brutalist-2026, hautestock IG carousel mistakes, 2slides can-ai-make-slides.

### S1. The sharpest framing of WHY slop is a differentiation problem (Built In)

Tanya Donska, "The New Skeuomorphism: How AI Makes Bad Design Look Good Enough," Built In, published 2026-06-11 (reviewed by Seth Wilson 2026-06-10). https://builtin.com/articles/ai-design-slop-era
- "It is the average of all design that has ever been fed into a model, rendered with enough technical competence to clear every review."
- "AI slop has no position. It resembles everything and argues for nothing." (the single best quotable for our thesis: our problem is indistinctness, not ugliness)
- "Technically correct in the same way that a hotel room is technically furnished. Everything is there, nothing is broken." (nothing is memorable)
- Skeuomorphism at least "had conviction"; slop has none. No empirical studies cited; observational.
- Visual tells it names: gradient blobs on SaaS pages, three-step onboarding with progress dots, hero illustrations of a "friendly, diverse team of floating torsos," interchangeable empty states, clean card layouts with donut charts.

### S2. "Single most reliable" / "single loudest" tells (adds precision to Krebs' list)

vibecodekit.dev, "AI Slop Design," 2026. https://vibecodekit.dev/ai-slop-design
- "purple-to-blue gradient" is called "the single loudest AI tell in 2026."
- "colored 3-4px left-border strip" on a card is called "the single most reliable AI tell" (this matches Krebs pattern 10, and a Krebs commenter's "as reliable as em-dashes" line: two independent sources rank the colored side-border as the #1 mechanical tell).
- Permanent dark mode is called "the single most common AI tell."
- "Cardocalypse" = excessive nesting of boxed elements (directly names the stacked-box failure).
- Adds: gradients applied on LARGE NUMBERS "for impact" (a specific hit on our big hero numerics), monospace "used decoratively for the hacker vibe" as a tell, all-caps section labels, one serif-italic accent word, animated accent-glow background ("v0/Cursor signature").
- Prescribed numeric fixes: at most 3 hues, type scale x1.25 or x1.333, 8pt grid spacing, APCA contrast Lc >= 75 on body text, borderless cards separated by whitespace and subtle background shifts.

925studios, "AI Slop Fonts and Gradients," 2026. https://www.925studios.co/blog/ai-slop-design-tells
- Inter is "the safest possible answer." The indigo gradient "is not ugly, it is just the one a model has seen ten million times," traced to "Tailwind's indigo-500 default."
- "weightless headline copy ('Build faster. Ship smarter.')" as a copy tell.

### S3. Technical-mono / brutalist terminal is the RECOGNIZED anti-slop aesthetic for 2026 (validates our Synthetic style) — with hard caveats

aigoodies.beehiiv.com, "aesthetics in the ai-era: visual + web design trends for 2026." https://aigoodies.beehiiv.com/p/aesthetics-2026
- Lists 11 aesthetics replacing AI slop; #1 is "Technical Mono: monospace fonts, brutalist terminals, high-contrast grids." Also lists "Surveillance Aesthetic: CCTV glitch, dystopian UI overlays" (on-brand for a cybersecurity creator).
- On what is dead: "Most AI narratives are engineered for efficiency, not emotion. They look like machine logic," "always mechanic, always sterile, cold circuits, glowing orbs, chrome faces." This is an explicit warning against the neon/chrome/circuit CYBER cliche a security brand is tempted toward. Our edge is the opposite of glowing-orb cyber.
- Framing: aesthetics now "NEED to be about what feels necessary to remember, reclaim, or subvert."

setproduct.com, "Retro and brutalist UI design: a 2026 field guide." https://www.setproduct.com/blog/retro-brutalist-ui-design-2026
- Positioning argument: "If you're just making clean, white-space-heavy websites, an AI can do your job. To stay relevant you have to offer a point of view. Neo brutalism is a point of view. It shows there's a human making choices, sometimes weird choices, but always intentional."
- CAVEATS that matter for us: "Retro is the easiest aesthetic to fake and the hardest to pull off." Failure modes: "low-contrast text disguised as raw aesthetics," "using retro to hide weak interface design," "the moment the costume blocks a core task, peel it back." Accessibility: "pixel fonts wreck readability at small sizes." (Confirms: mono must earn each use and stay high-contrast; decorative-mono-everywhere is itself a tell per S2.)
- Trend timing (background): search cluster reported brutalism's share "peaked in March 2026 and has declined since," neubrutalism holds on commercial sites. Lean on the technical-AUTHENTICITY read, not raw-border novelty-chasing.

### S4. Reserve human/AI effort for the non-mechanical parts (doctrine for our tooling split)

mirra.my, "AI Carousel Automation: Complete Guide 2026." https://www.mirra.my/en/blog/ai-carousel-automation-complete-guide-2026
- "The more the AI does without your editing, the more the result reads as templated. Templated reads as low-effort to people who've seen 200 carousels this month."
- The prescription maps exactly onto our pipeline: "Use AI for the mechanical parts, slide structure, copy first drafts, layout consistency, font system, and reserve your hour for the hook, the punchline, the small specific detail that makes a slide feel like it came from a person who actually thought about it."
- "Pure-AI output has a recognizable signature; hybrid work, AI structure plus human voice, performs about the same as a hand-built deck."
- The one carousel-specific visual tell it names: "a beautiful background with a generic phrase laid over it." Example: "Tips for growing on Instagram" fails; "The ads mistake that cost me $50K" wins. (Our covers must always be specific + number-anchored, never a pretty background under a generic line.)

### S5. Motion / mixed-media numbers (corroborates and extends finding #12)

postnitro.ai, "A Guide to Adding Video in Carousel Posts." https://postnitro.ai/blog/post/video-in-carousel
- Image + video carousel: 2.33% avg engagement. Image-only: 1.74%. Video-only: 1.45%. Mixed beats BOTH single formats. (First pass had 2.33 vs 1.80 image-only from a different page; this source says 1.74. Directionally identical, mixed wins; numbers vary slightly by source.)
- "Adding subtle motion to the first slide via cinemagraphs or subtle zooms can increase initial stop-scroll power by up to 22% compared to static headers."
- Placement doctrine: motion slide 1-2 = scroll-stopper; mid-deck (3-7) = the demo/proof; optional final = CTA. Non-negotiables: sound-off design, burned-in captions, 3-second window. Frame-by-frame across swipes for "demonstrating processes, revealing transformations."
- Reinforces finding #12: do NOT apply motion to every slide (that becomes the "same fade-in on everything" / "motion for motion's sake" tell). One deliberate motion moment.

### S6. Extra corroboration on busyness + 60-30-10 + series variation

- hautestock.co IG carousel mistakes (background): the 5 named mistakes are boring covers, text overload ("keep it snackable, not sweeping essays"), tiny text (24pt+), poor formatting ("cluttered designs, misaligned elements, lack of hierarchy look unprofessional and distract"), lack of flow. https://hautestock.co/instagram-carousel-design-mistakes-to-avoid/
- 60-30-10 corroboration (adds a concrete number): pros "leave at least 15-20 percent of the slide area empty; amateur slides fill every square centimeter." "Overuse accent color (25-30%) and it loses its specialness; it becomes noise instead of signal. Accents are spices, not the main course." https://uinica.com/the-60-30-10-color-rule/
- Series-vs-clone split, stated plainly: invariants = "same cover style, same slide order, same CTA rhythm"; variables = interior layout/scale/emphasis. "Keep a visual rhythm by repeating a consistent layout while changing the accent element." Visual-anchor model (recurring signature color/motif/mark carries recognition while everything else varies) confirmed by https://www.influencers-time.com/visual-anchoring-boosting-brand-recall-in-3d-immersive-ads/ . The DTC data point: decks with "slight product-color variations per card see swipe rates crater" (sameness measurably tanks completion, so variation is a metrics move not a taste move).

### S7. Two extra "SO WHAT" items not already covered above

11. LINT FOR GRADIENT-ON-NUMBER AND MONO-AS-BODY specifically. Two of our likeliest self-inflicted tells (both named in S2): a gradient laid over a big hero numeric, and monospace used for everything rather than earned as technical-metadata voice. Add both to the Krebs-style DOM/CSS linter in SO WHAT item 5. Also enforce APCA Lc >= 75 on body text so the brutalist look never hides low-contrast (setproduct's #1 fake-retro failure).

12. THE COVER TEST: fail every "pretty background + generic phrase" cover. Bake mirra's rule into make-carousel: a cover is rejected if it is a decorative field under a non-specific line. Every cover must carry a specific, curiosity-gap, number-anchored claim ("The X that cost me $Y", "23 tools, one afternoon"), which is also exactly the borrowed-proof direction in Carter's no-slop-video-ideas memory. Structure/spacing/type are the machine's job; the specific hook is ours.

---

## GAPS / DEAD ENDS

- Could not fetch Canva's official 2026 "Imperfect by Design" trend report (canva.com/newsroom returned
  HTTP 403). The "imperfect by design / made-by-someone" theme is corroborated by Creative Boom, 2Slides
  fix #3, and Accio poster trends, but the primary Canva source and its search-volume numbers are unread.
- X/Twitter designer threads on this topic were not directly fetchable (X blocks WebFetch) and did not
  surface strongly via search; the HN thread 47864393 is the main raw-community-critique source captured.
- No single named ELITE @-handle carousel account (e.g. a specific creator to deconstruct slide-by-slide)
  was verifiable from search-result snippets alone. Behance/Dribbble "minimal carousel" galleries exist
  but no individual best-in-class Instagram account was confirmable by name from what I actually saw.
  Recommend a manual Instagram pull for named reference accounts; I will not fabricate handles.
- Krebs' per-pattern prevalence beyond the top three (dark mode 34, gradients 27, icon-cards 22) was not
  published; only the top tells and the 22/32/46 bucket split are firm numbers.
