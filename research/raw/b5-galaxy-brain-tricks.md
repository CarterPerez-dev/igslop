<!-- © AngelaMos | 2026 | b5-galaxy-brain-tricks.md -->

# DIVISION B5: Claude Code galaxy-brain design tricks in the wild (April-July 2026)

Mission: catalog the 200-IQ tricks people use with Claude Code specifically for VISUAL output
quality, then rank them by expected impact on OUR pipeline (standalone HTML slides at
1080x1350, rendered to 2160x2700 PNG by the shotpls headless-Chrome CLI, fonts base64-embedded,
Python via uv, Node via pnpm, full freedom to build tooling).

Everything below is dated April-July 2026 unless flagged as background.

---

## SEARCHES RUN

1. Claude Code screenshot feedback loop iterate design headless browser 2026
2. Claude Code vision feedback loop feed screenshot of its own render UI design
3. Claude Code design review skill rubric structured critique multi-agent panel UI 2026
4. Claude Code generate SVG from scratch design assets icons illustrations 2026
5. Claude Code HTML to video capture animated slides puppeteer ffmpeg render 2026
6. Claude Code design tokens file CLAUDE.md design system constrain hex values fonts spacing 2026
7. Claude Code style transfer reference image match aesthetic screenshot recreate design 2026
8. Anthropic frontend-design skill blocklist fonts Inter aesthetic direction how it works 2026
9. Claude Code build Instagram carousel poster HTML slides 1080x1350 render PNG workflow
10. Claude Code chrome-devtools MCP take_screenshot iterate design agent self-critique loop 2026
11. "Claude Code" agent design iterate "screenshot" render compare pixel diff visual regression skill June 2026
12. Anthropic Claude Code best practices give visual mock screenshot iterate 2-3 times results improve

Pages fetched and read in full:
- Tal Rotbart, Medium, round-trip screenshot testing (2026-02-22)
- Composio, Top 10 Design Skills for Claude Code and Codex
- github.com/wan-huiyan/agent-review-panel (multi-agent adversarial review, v3.6.0, 2026-06-28)
- github.com/heygen-com/hyperframes/blob/main/CLAUDE.md (HTML-to-video)
- github.com/VoltAgent/awesome-claude-design (68 DESIGN.md systems, 3.1k stars)
- superdesign.dev/blog/claude-code-design-prompts (Jason Zhou, 2026-06-21, the 9 prompts)
- Ahmed Soliman, Medium, why frontend-design skill works (2026-04-29)
- ryanfrizelle.com/guides/claude-code-carousel-generator (counter-example: Gemini image route)
- code.claude.com/docs/en/best-practices (official Anthropic, the canonical screenshot-loop guidance)

---

## FINDINGS

### TRICK 1. The vision feedback loop (screenshot -> critique -> fix), and it is the #1 lever

This is the single most-cited technique across every source, and Anthropic states it in their
own official best-practices doc.

OFFICIAL ANTHROPIC LANGUAGE (code.claude.com/docs/en/best-practices, "Give Claude a way to
verify its work"). The doc's exact "Verify UI changes visually" row:
- Before: "make the dashboard look better"
- After: "[paste screenshot] implement this design. take a screenshot of the result and compare
  it to the original. list differences and fix them"

Anthropic frames it as: "The check is anything that returns a signal Claude can read in the
conversation: a test suite, a build exit code, a linter, a script that diffs output against a
fixture, or a browser screenshot compared against a design." And in the failure-patterns
section: "The trust-then-verify gap... Fix: Always provide verification (tests, scripts,
screenshots). If you can't verify it, don't ship it."

THE QUANTIFIED PAYOFF. From the widely-republished Anthropic visual-mock guidance (surfaced via
search 12): "Usually 2-3 iterations produce a good match," and the verification loop "produces a
2-3x improvement in quality when Claude can check its own output against a visual target." Number
to remember: 2-3 iterations, roughly 2-3x quality lift. This is the core justification for wiring
shotpls output back into the loop. (Caveat: I read the current official best-practices page,
which states the screenshot-compare loop explicitly; the literal "2-3x" phrasing came via
republished guidance in search results, so treat the multiplier as strong-consensus, not a
verbatim current-doc quote.)

WHY IT WORKS (the mechanism, stated repeatedly). Claude Code operates in a text-only world. It
writes correct CSS but "cannot evaluate its own visual output. That gap is the single biggest
reason a technically-correct UI still looks off" (multiple Superdesign / aidesigner pieces).
The screenshot closes that gap: it converts a rendered PNG into a signal the model can read.

Tal Rotbart's canonical implementation (Medium, 2026-02-22, "Giving Claude Code Eyes:
Round-Trip Screenshot Testing"). His three-file rig, directly transposable to our pipeline:
1. a screenshot harness (his hooks Capybara; ours is shotpls) triggered by an env flag
   (his SCREENSHOTS=1)
2. a custom slash command (his /screenshot-test) that "runs the specified system tests with
   screenshot capture, then reads every captured PNG and describes what it sees"
3. a CLAUDE.md entry telling Claude to use it: "Use the /screenshot-test skill to run system
   tests and visually examine every captured screenshot."
He names files numerically and by action: 001_visit_participations.png,
002_before_click_button_Done.png, so Claude can "verify that each screenshot makes sense for
the action that triggered it." For us, the analog is one PNG per slide with a stable name
(slide-01.png ... slide-08.png) so a critique subagent can reason slide-by-slide.

AUTOVERIFY. Multiple sources (Superdesign, youcanbuildthings) describe an autoVerify default in
Claude Code's embedded browser: "When autoVerify is enabled (it is on by default), Claude Code
starts your dev server after editing project files, then uses the embedded browser to take
screenshots and inspect the running app. If it finds visual issues, it makes additional code
changes and verifies again." Note: that assumes a dev-server + live URL, which our
one-HTML-file-per-slide model does not have by default. Our equivalent is: shotpls renders the
HTML file directly to PNG, then we Read the PNG back into context.

### TRICK 2. The "specific diff, not a vibe check" critique prompt

The vision loop only pays off if the critique is structured. The best-in-class prompt is
Jason Zhou's #7 (superdesign.dev, 2026-06-21, "Claude Code Design Prompts: 9 Copy-Paste
Prompts"):

"Here is a screenshot of what you just built: [attach image]. Compare it against the reference:
[attach reference]. Give me a specific diff, not a vibe check: list every place the spacing,
hierarchy, type size, or alignment differs."

The load-bearing phrase is "a specific diff, not a vibe check." Without it the model returns
"looks great!" With it, the model enumerates spacing / hierarchy / type-size / alignment deltas.
For a poster carousel our critique axes should be: focal dominance (is there ONE focal point?),
type scale contrast (is the hero numeric genuinely huge vs body?), reading-zone count (are we
under the 2-3-zone poster ceiling?), negative-space ratio, edge alignment, optical centering.

### TRICK 3. Reference-image style transfer (hand it a poster, not an adjective)

Consistent theme across April-July: stop describing, start referencing. From the style-transfer
searches: "Make it look modern is an instruction to return the average again, because modern has
no shape. A reference does."

Opus 4.7 (the model under Claude Design as of the June 2026 update) "can read screenshots far
more accurately than anything Anthropic has shipped before, and accepts images about three times
larger, allowing... a dense UI screenshot [to be] actually recreate[d]." Larger image intake
matters for us because a 2160x2700 poster is a big image.

Two distinct reference prompts from Zhou's 9 (the difference matters):
- Prompt #3/#4 (copy the layout): "Match this reference, do not invent your own layout: [paste
  reference]." Use when we WANT to clone a competitor's poster composition.
- Prompt #9 (extract the language, do NOT clone): "Here is a screenshot of a UI whose style I
  want: [attach]. Do NOT copy it pixel for pixel. Extract its design language into reusable
  rules: type scale and pairings, spacing rhythm, color logic." Use when we want to LEARN from a
  reference poster and turn it into our DESIGN.md, not plagiarize it.

This is the exact mechanism to operationalize Division C's poster teardown: feed the elite
poster carousels we collect into prompt #9, get back reusable rules, bank them.

### TRICK 4. DESIGN.md design-token files (kill the one-off hex problem)

The dominant pattern for making Claude Code stop inventing random colors/fonts is a committed
token file, and there is a de-facto standard format.

VoltAgent/awesome-claude-design (github, 3.1k stars): "68 ready-to-use design system
inspirations in DESIGN.md format." DESIGN.md is defined as "a single plain-text markdown file
that describes a brand's visual language in a format AI agents can actually act on," core
principle: "keep token, rule, and rationale in the same file." Their 9-section structure:
1. Visual Theme & Atmosphere
2. Color Palette & Roles (CSS variables with semantic names)
3. Typography Rules (type scale, font fallbacks)
4. Component Stylings (buttons, inputs, cards, nav, with states)
5. Layout Principles (spacing scale, grid, whitespace rhythm)
6. Depth & Elevation (shadow tokens, surface hierarchy)
7. Do's and Don'ts
8. Responsive Behavior (breakpoints, touch targets)
9. Agent Prompt Guide

Enforcement is a prompt/CLAUDE.md rule, stated many places: "Use the color tokens from
DESIGN.md. Do not invent new hex values" and "do not introduce new colors or fonts without
updating this file." Zhou's prompt #1 makes Claude WRITE the file first by auditing the repo:
"Audit my repo before designing anything... Then write a DESIGN.md at the project root as rules
you will follow every time."

Theme-Factory (Composio skill, from Top 10 list) does the token generation itself: "Generates
reusable CSS variable systems and palette variations from a single source... Stops the agent
from inventing one-off hex values for every new component."

Anthropic's own June 17, 2026 Claude Design overhaul shipped "bring-your-own design system" +
a "/design-sync terminal command that bridges Claude Design to Claude Code" + a token-burn fix.
So token-file-driven design is now first-party, not just community.

### TRICK 5. The frontend-design skill (Anthropic's anti-slop constraint engine)

Anthropic's official frontend-design skill is the highest-install design skill: "277,000+
installs as of March 2026." Install: `claude plugin add anthropic/frontend-design`.

Ahmed Soliman's prompt-engineering teardown (Medium, 2026-04-29, "Why Anthropic's frontend-design
Skill Just Works") reverse-engineered the ~42-line SKILL.md. The forced decision sequence:
1. Anti-pattern naming: opens by naming the failure mode ("avoid generic AI slop aesthetics")
   instead of vaguely asking for "modern."
2. Extreme direction selection: pick ONE pole (brutally minimal, maximalist chaos,
   retro-futuristic, organic/natural, luxury/refined) to prevent regression to the median.
3. Intentionality over intensity: "Bold maximalism and refined minimalism both work, the key is
   intentionality, not intensity."
4. Differentiation anchor: "What makes this UNFORGETTABLE? What's the one thing someone will
   remember?" This forces a single focal point, which is EXACTLY the poster goal.

Its explicit blocklist: "NEVER use Inter, Roboto, Arial" (and second-order defaults like Space
Grotesk), no purple-on-white gradients, no emojis as icons, no cookie-cutter SaaS layouts.
Color rule: "Dominant colors with sharp accents outperform timid, evenly-distributed palettes."
Motion rule: "one well-orchestrated page load with staggered reveals creates more delight than
scattered micro-interactions" (relevant to animated slides, Trick 6). Composition rule: demands
asymmetry and "Generous negative space OR controlled density" (not both). It closes with a
psychological unlock: "Claude is capable of extraordinary creative work. Don't hold back."

Soliman's meta-lesson (why we should copy its STRUCTURE not its content): "specificity over
length, named bans over vague encouragement, and vocabulary loading (brutalist, editorial) over
examples." This matches Carter's own skill-design memory (feedback-skill-tunnel-vision:
principles not implementations, no copy-paste hex codes).

### TRICK 6. HTML-to-video (HyperFrames): animated slides inside the carousel

This is the direct answer to the "some now include ANIMATED slides" part of the brief. HeyGen
open-sourced HyperFrames: "an open-source framework from HeyGen that turns plain HTML, CSS, and
animation into finished MP4 video, designed specifically for use with Claude Code."

How it works (from github.com/heygen-com/hyperframes/blob/main/CLAUDE.md, read directly):
- Deterministic frame model: frame = time * fps. "Nothing depends on the wall clock, it is
  deterministic, the same input always produces the exact same frames." Video becomes
  reproducible and CI-regenerable, same philosophy as our shotpls PNG pipeline.
- It "loads your HTML in headless Chrome, steps through it frame by frame... and encodes the
  result with FFmpeg." Capture at 24 or 30 fps.
- Composition contract: clips need class="clip", timing via data-* attributes, GSAP timelines
  must be "paused and registered on window.__timelines" (a seek-by-frame adapter pattern; it
  seeks each timeline to the exact frame rather than playing in real time). Also supports Lottie,
  Three.js, Anime.js, CSS, WAAPI through the same adapter.
- Hard determinism rules: "No Date.now(), no unseeded Math.random(), no render-time network
  fetches."
- CLI: `bun install`, then `npx hyperframes lint` (static HTML structure check) -> `npx
  hyperframes check` (headless-Chrome gate) -> `npx hyperframes render` (full pipeline). Must
  pass lint + check before render.
- Install into Claude Code: `npx skills add heygen-com/hyperframes` gives three slash commands:
  /hyperframes (authoring), /hyperframes-cli (CLI ops), /gsap (animation help). Needs Node 22+
  and FFmpeg on PATH.

For us this is huge: an animated carousel slide is just an MP4 (Instagram allows video slides in
a carousel). Because HyperFrames renders HTML the same way shotpls does, our existing
single-HTML-file-per-slide model extends to it with almost no conceptual change. Static slides
stay PNG via shotpls; the one or two "hero" slides become MP4 via HyperFrames.

Adjacent finding: NotebookLM / Claude Design also have a video-export path (notebooklm-guide.com,
"Claude Design + NotebookLM Video Export Workflow, 30 prompts, 3 export methods"), but that is
web-product-bound, not terminal-native, so it is off-pipeline for Carter.

### TRICK 7. Generate SVG assets from scratch (icons, backgrounds, diagrams)

Claude draws in SVG code (shapes and coordinates, not pixels), which is exactly what a
base64-inline-everything poster pipeline wants: crisp at 2x, zero external assets.

What works well (multiple sources, incl. analyticsvidhya 2026-06): "simple geometric icons,
animations, and explaining/editing existing SVG," plus "process diagrams and flowcharts, simple
infographics, icon sets, data visualizations with your actual numbers, abstract geometric
backgrounds, and org charts." These map cleanly to carousel furniture: a single bold hero glyph,
an abstract geo background, a data viz using real cyber salary/job numbers.

The known failure (call it out so we build around it): "Claude will drift in style, stroke
weight, and complexity across a long conversation. Each icon might look fine individually but
won't form a cohesive set." Mitigation stated everywhere: "Ask for a set... together so the
style stays consistent," and "Edit small: change one thing per message." So: generate a whole
icon set in ONE call with a locked stroke-width/grid spec, never one icon at a time.

Skills exist: Asset Creator and SVG Icon Generator (both on mcpmarket.com), and a logo-designer
skill (neonwatty.com, "Generate SVG Logos from Your Repo"). Pattern is uniform: "ask a few
focused questions up front, then emit a fully self-contained SVG file." Building our own tiny
generate-carousel-svg skill with a fixed stroke-grid contract is the move, rather than adopting a
generic one.

### TRICK 8. Multi-agent design-review panel (structured critique by committee)

The most sophisticated critique pattern is an adversarial panel, not a single reviewer.

github.com/wan-huiyan/agent-review-panel (author Huiyan Wan, v3.6.0 released 2026-06-28, MIT,
25 stars at time of read). Mechanics:
- "4-6 reviewers with distinct personas evaluate in parallel, then debate across 1-3 rounds."
- Anti-groupthink safeguards, the genuinely clever part: "Blind final scoring, private
  reflection, calibrated skepticism levels (20-60%)"; sycophancy detection that "intervenes when
  >50% of position changes lack new evidence"; anti-rhetoric flagging of "position changes
  driven by eloquence rather than evidence"; and a correlated-bias warning when reviewers
  converge unanimously.
- A supreme judge: "Opus [arbitrates] everything," plus a post-judge verification gate that
  re-checks P0/P1 findings against source to catch hallucinations.
- Output is an interactive HTML dashboard with "expandable 10-section issue cards" (narrative,
  evidence, debate transcripts, judge rulings, fix recommendations).
- v3.6 added an "Assessment mode, quality discrimination for subjective deliverables" using
  "subtract-points + veto, swap test, out-of-band currency check, and the control-validation
  gate." That Assessment mode is the design-relevant part: it is built to grade subjective
  quality, which is what a carousel is.
- Install: `claude plugin marketplace add wan-huiyan/agent-review-panel` then `claude plugin
  install roundtable@agent-review-panel`.

Design-specific panels also exist (from search 3): a "UX Review Panel" skill that "spawns 10
parallel sub-agents embodying design experts"; a "Design Critique" skill giving "structured
feedback... first impressions, usability, accessibility"; and a design-review skill that scores
"against Nielsen's 10 heuristics... six weighted dimensions: visual hierarchy, consistency,
accessibility, usability, responsiveness, and performance, producing a scored table with overall
quality numbers and a prioritized findings list."

The reusable idea for us: a panel of 3-4 personas tuned for POSTER carousels (a Poster
Art-Director who only cares about focal dominance and type scale; a Density Cop who counts
reading zones and vetoes anything over 3; a Brand-Consistency checker against DESIGN.md; a
Thumb-Stop judge who scores slide 1 as a scroll-stopper at phone size). Blind scoring +
subtract-points prevents the "looks great" sycophancy that a single reviewer defaults to.

### TRICK 9. Chrome DevTools MCP / Playwright as the agent's eyes

For teams whose slides live at a URL, the browser-driving MCPs give Claude live vision.

chrome-devtools-mcp (github.com/ChromeDevTools/chrome-devtools-mcp, "Chrome DevTools for coding
agents," also packaged as an official Anthropic plugin at claude.com/plugins/chrome-devtools-mcp).
Tools Claude gets: list_pages, select_page, navigate_page, take_snapshot, take_screenshot, click,
fill, evaluate_script, plus network + console + performance. Setup guide dated 2026-03-26
(samwize.com). Usage pattern quoted: "your AI writes a CSS fix and then reloads the page,
inspects computed styles, and takes a screenshot to verify if it works."

Playwright/webapp-testing skill (Composio Top 10, skill #4): "Opens live browser, screenshots
pages, compares against references across viewports, iterates autonomously," and the article
calls it "the single highest-leverage thing you can give an agent doing design work." Multi-
viewport matters less for us (fixed 1080x1350) but the autonomous screenshot-compare loop is the
same lever as Trick 1.

Caveat for our pipeline: these MCPs assume a served URL. Our slides are files. We do not strictly
need a browser MCP because shotpls already IS our headless-Chrome render; we just need to Read the
resulting PNG back. A DevTools MCP would only add value if we ever want DOM inspection / computed-
style debugging of a slide (e.g., "why did this text overflow the safe area").

### TRICK 10. Pixel-diff verification (pixelmatch) for regression + tighter critique

Beyond a vibes critique, some rigs do literal pixel diffing. From search 11: skills do "pixel-
level diffing with tools like pixelmatch for precise pixel-level diffing and edge detection," and
image-compare skills exist on mcpmarket ("Image Analyze Claude Code Skill, Visual UI Comparison").
For us this is mainly a REGRESSION guard: after we lock a slide, a pixelmatch diff catches an
accidental font/spacing change on re-render. It is weaker as a taste tool (a poster can be pixel-
different and better), so use it as a gate, not a judge.

### COUNTER-EXAMPLE (what NOT to copy): the Gemini-image carousel route

Ryan Frizelle's carousel generator (ryanfrizelle.com/guides/claude-code-carousel-generator) does
NOT use HTML-to-PNG at all. He routes to "Gemini 3 Pro Image Preview (nano banana)... the only
model that can put real readable text on a slide," 1080x1080, 7 slides, brand from a
CAROUSEL-BRAND.md read fresh each run. This is worth knowing but it is the wrong architecture for
Carter: image-model output is non-deterministic, not per-element editable, not base64-inline HTML,
and cannot do the tight typographic control a poster needs. His one durable idea we can steal:
"read the brand file fresh each run, never cached" and "analyze the user's top-performing posts"
before drafting. Our CLAUDE.md/DESIGN.md-driven, shotpls-rendered HTML approach is strictly better
for typographic posters; do not switch to an image model.

---

## SO WHAT FOR US (how this changes what we build)

Ranked by expected impact on OUR specific pipeline (HTML slides -> shotpls PNG).

RANK 1 (build this first): the shotpls vision feedback loop. Highest-leverage, lowest-cost change,
Anthropic-endorsed with a real number (2-3 iterations, ~2-3x quality). Concretely: after shotpls
renders slide-NN.png, the make-carousel skill should Read each PNG back into context and run a
structured self-critique, then edit the HTML and re-render, looping until the critique passes or 3
iterations. The critique MUST use Zhou's "specific diff, not a vibe check" framing, with our
poster axes (one focal point? hero numeric genuinely huge vs body? under 3 reading zones?
negative-space ratio? edge alignment?). Today the skill renders and stops; that is exactly the
"trust-then-verify gap" Anthropic names. Closing it is the whole ballgame.

RANK 2: a DESIGN.md token+rule file for the carousel style, enforced from the skill. We already
have a "Synthetic technical-brutalist" style verbally; codify it in the 9-section DESIGN.md format
(theme, color roles as CSS vars, type scale with the tighter clamps from Carter's density memory,
component/slide templates, do's/don'ts, an agent-prompt guide) and add the hard rule "do not
invent hex values or fonts not in this file." This kills drift across slides and across sessions,
the specific weakness every source flags. It also becomes the target the RANK 1 critique loop
diffs against.

RANK 3: adopt the frontend-design skill's DECISION STRUCTURE (not its content) into make-carousel.
Force the "one thing someone will remember" question and a single named aesthetic pole PER DECK
before any HTML. This is the poster discipline (one focal point) encoded as a required upfront
step. Reuse its font blocklist idea with OUR banned list. Matches Carter's principles-not-
implementations skill philosophy.

RANK 4: HyperFrames for 1-2 animated hero slides per deck. This is how we get "animated slides in
the carousel" competitors are shipping, WITHOUT leaving the terminal or the HTML-render model.
Same headless-Chrome + deterministic frame=time*fps philosophy as shotpls. Plan: static slides
stay shotpls PNG; the cover slide (and maybe the CTA slide) become GSAP-animated HTML rendered to
MP4 by HyperFrames (npx skills add heygen-com/hyperframes, needs Node 22+ and FFmpeg). Test on the
cover first; a staggered-reveal cover is the single most scroll-stopping upgrade available.

RANK 5: an SVG asset step with a locked stroke-grid contract. For decks that need iconography or an
abstract geometric background, generate the WHOLE set in one call against a fixed spec (stroke
width, grid, corner radius) to beat the documented cross-set drift. Everything stays inline SVG =
crisp at 2160x2700, zero external URLs, fits shotpls perfectly. Build a tiny generate-carousel-svg
helper rather than adopting a generic icon skill.

RANK 6: a poster-tuned review panel for high-stakes decks only (not every deck, it is token-heavy,
and Carter's memory says stop over-processing small work). Reuse the agent-review-panel Assessment
mode idea: 3-4 blind-scoring personas (Poster Art-Director, Density Cop with veto over >3 zones,
Brand-Consistency vs DESIGN.md, Thumb-Stop judge on slide 1 at phone size) with subtract-points +
veto so we get real discrimination, not sycophantic praise. Gate it behind a flag; run it on
flagship decks, skip it on routine ones.

RANK 7 (optional / regression only): a pixelmatch gate after a slide is locked, to catch accidental
drift on re-render. Not a taste tool. Low priority.

NOT recommended: switching to a Gemini/nano-banana image-generation route (loses determinism,
per-element editability, and typographic control) and standing up a Chrome DevTools/Playwright MCP
(redundant, shotpls already IS our headless-Chrome render; only worth it if we later need DOM/
computed-style debugging of an overflowing slide).

One-line thesis: we already have the hard part (deterministic HTML-to-PNG rendering). The galaxy-
brain move everyone else is doing that we are NOT is feeding the render back to the model and making
it critique-and-fix against a codified style. Wire the loop, write the DESIGN.md, add animated hero
slides via HyperFrames. That is the path to "best carousels on Instagram."

---

## SOURCES

- code.claude.com/docs/en/best-practices (Anthropic official, "Give Claude a way to verify its
  work"; the paste-screenshot-and-compare row)
- medium.com/@rotbart/giving-claude-code-eyes-round-trip-screenshot-testing-ce52f7dcc563 (Tal
  Rotbart, 2026-02-22)
- superdesign.dev/blog/claude-code-design-prompts (Jason Zhou, 2026-06-21, the 9 prompts incl.
  #7 "specific diff, not a vibe check")
- composio.dev/content/top-design-skills (Top 10 Design Skills for Claude Code and Codex)
- github.com/heygen-com/hyperframes/blob/main/CLAUDE.md (HyperFrames HTML-to-video composition
  contract + CLI)
- github.com/VoltAgent/awesome-claude-design (68 DESIGN.md systems, 3.1k stars, 9-section format)
- medium.com/@ahmed.soliman/why-anthropics-frontend-design-skill-just-works... (Ahmed Soliman,
  2026-04-29)
- github.com/wan-huiyan/agent-review-panel (Huiyan Wan, v3.6.0 2026-06-28, 4-6 reviewer
  adversarial panel + Assessment mode)
- mcpmarket.com/tools/skills/asset-creator ; mcpmarket.com/tools/skills/svg-icon-generator
  (SVG generation skills)
- neonwatty.com/posts/logo-designer-skill-claude-code (SVG logo-from-repo skill)
- github.com/ChromeDevTools/chrome-devtools-mcp and claude.com/plugins/chrome-devtools-mcp
  (browser-driving MCP, take_screenshot etc.)
- samwize.com/2026/03/26/how-to-set-up-chrome-devtools-mcp-for-claude-code (setup, 2026-03-26)
- www.analyticsvidhya.com/blog/2026/06/claude-image-generation (Claude SVG strengths/drift, 2026-06)
- ryanfrizelle.com/guides/claude-code-carousel-generator (counter-example: Gemini image route)
- www.mindstudio.ai/blog/iterative-refinement-loop-claude-design-multimodal (multimodal refinement)
- chatforest.com/builders-log/claude-design-june-2026... (Anthropic Claude Design 2026-06-17
  overhaul: BYO design system, /design-sync, token-burn fix)

## GAPS / DEAD ENDS

- No named cybersecurity or big-follower content creator was found publicly documenting a shotpls-
  style HTML-slide + vision-critique carousel loop specifically. The technique is proven in general
  Claude Code UI work and generic carousel skills, not in a same-niche competitor case study. So
  RANK 1 rests on transferring app-UI practice to posters, not on a found competitor doing exactly
  this.
- Could not fetch primary X/Twitter threads (they refuse WebFetch); relied on blogs, newsletters,
  and GitHub that quote or package the techniques. No individual viral tweet is cited by number
  because none was directly verifiable.
- Exact per-slide MP4 spec Instagram accepts inside a mixed photo+video carousel (max length,
  codec) was not researched here; HyperFrames can render arbitrary MP4 but the IG constraint needs
  a separate check before shipping animated slides.
- The "2-3x quality" multiplier came via republished Anthropic best-practices guidance in search
  results; I confirmed the current official page states the screenshot-compare loop explicitly but
  did not see the literal "2-3x" on that exact current page. Treat as strong-consensus, not a
  verbatim current-doc quote.
