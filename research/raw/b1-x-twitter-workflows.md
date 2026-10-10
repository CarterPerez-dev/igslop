<!-- © AngelaMos | 2026 | b1-x-twitter-workflows.md -->

# DIVISION B / B1: Claude Code carousel and design workflows in the wild

Scope: Claude CODE terminal workflows (skills, agents, HTML-to-image pipelines, design-system files, screenshot-feedback loops) for making Instagram carousels, social slides, and poster graphics. Recency window: April to July 2026. Older material labeled BACKGROUND. Research date: 2026-07-10.

Note on sourcing: direct WebFetch of x.com posts returned HTTP 402 (paywalled) every time. X handles, thread URLs, and dates below come from search-result snippets and from a curated "X signal" table inside the rohitg00/awesome-claude-design repo. Where a number or claim came only from a secondary summary, it is marked as such. Nothing here is invented.

---

## SEARCHES RUN

1. Claude Code Instagram carousel HTML to image workflow
2. Claude Code skill make carousel slides design system 2026
3. Claude agent generate social media graphics HTML screenshot pipeline
4. site:x.com Claude Code carousel design workflow
5. Claude Code carousel skill twitter thread 2026 poster design one focal point
6. "Claude Code" carousel HTML slides "screenshot" feedback loop iterate design x.com 2026
7. Claude Code make slides deck HTML puppeteer PNG design system CLAUDE.md skill viral thread
8. "awesome-design" markdown Claude Code brand files slides repo github stars
9. Claude Code carousel animated video slide reel viral x twitter creator 2026
10. Claude Code design skill brutalist editorial poster one big number slide typography maximalist
11. Claude Code subagents parallel render carousel slides verify screenshots best carousels twitter
12. Claude Code instagram carousel skill June 2026 CLAUDE.md brand tokens 1080x1350 playwright export
13. "claude code" OR "claude skill" carousel design "screenshot the element" clip base64 font export png
14. Claude Code animated slide video mp4 inside carousel instagram creator workflow 2026
15. tylergermain thread carousel installer claude code gist
16. Peter Yang Claude Code slides skill styles.md screenshot QA loop creator economy 2026
17. Claude Code carousel poster "one focal point" less text big type designers switching from canva 2026 x thread
18. "claude code" carousel skill creator built shared github june july 2026 handle instagram slides

Pages fetched and actually read: github.com/Hainrixz/open-carrusel, ryanfrizelle.com carousel guide, github.com/itchernetski/threads-carousel-claude-skill, aiguide101.com twitter-thread-to-carousel, creatoreconomy.so (Peter Yang; 402 on refetch, captured via search), github.com/yzfly/awesome-design-html, github.com/rohitg00/awesome-claude-design, medium.com/@camronhaider slideshows, github.com/jiji262/claude-design-skill, github.com/anthropics/claude-code frontend-design SKILL.md, github.com/jeevanbavandla/instagram-carousel-skill, wonderingaboutai.substack.com CarouselBot vs Claude Skills.

---

## FINDINGS

### 1. The Anthropic frontend-design SKILL.md is the single most valuable artifact for our exact problem (busy slides)

Source: github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md (official Anthropic plugin, read directly).

This is Anthropic's own design skill and it reads like it was written to fix Carter's newspaper-slide problem. Load-bearing rules quoted from the skill:

- "Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief." This is the poster principle stated as a rule: one focal point, everything else quiet.
- "The Hero is a Thesis. Open with the most characteristic thing in the subject's world." It explicitly bans the template answer: "A big number with a small label, supporting stats, and a gradient accent is the template answer, only use if that's truly the best option."
- It names three generic defaults to AVOID by name: (1) Warm Cream (background near #F4F1EA, high-contrast serif display, terracotta accent), (2) Dark Acid (near-black background, single bright acid-green or vermilion accent), (3) Broadsheet (hairline rules, zero border-radius, dense newspaper-like columns). Our current decks are essentially the Broadsheet default. The skill calls this out as a default, not a choice.
- Explicit failure modes it rejects: "carousels without clear narrative purpose," "generic SaaS grids without narrative justification," and numbered markers (01/02/03) "only if content is an actual sequence where order carries information." It says to "question if choices like numbered markers actually make sense before incorporating them."
- "Structure Encodes Information. Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it." Direct indictment of stacking a hud row + kicker + rule + tag row + pager as pure decoration.
- The Chanel rule: "before leaving the house, take a look in the mirror and remove one accessory." Every slide should get this pass.
- Banned overused fonts: Inter, Roboto, Arial, Space Grotesk (per a search snippet of the same skill). It pushes committing to ONE explicit aesthetic direction up front: brutalist, editorial, retro-futuristic, or maximalist. "Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail."
- Process is a TWO-PASS system: Pass 1 write a compact token plan (4-6 named hex, 2+ typeface roles, one-sentence layout descriptions plus ASCII wireframes, and one "signature" element). Pass 2 critique the plan against the brief BEFORE writing code: "if you arrive somewhere similar without the specific brief's constraints, revise."
- Verification: "Critique your own work as you build, taking screenshots if your environment supports it. A picture is worth 1000 tokens." Confirms the screenshot-feedback loop is the intended pattern.
- CSS gotcha it warns about: type-based selectors (.section) and element-based selectors (.cta) can cancel each other out via specificity. Relevant since we ship one standalone HTML per slide.

### 2. The screenshot-QA feedback loop is the universal pro pattern, done two ways

Way A, self-critique screenshots (Peter Yang /slides skill). Source: creatoreconomy.so "Build Beautiful Slides with Claude Code in 12 Minutes," Peter Yang (@petergyang), dated May 27, 2026; X post x.com/petergyang/status/2059642246614647259. Six-step terminal workflow: (1) read skill.md and styles.md design guidelines, (2) clarify topic, (3) research online, (4) generate a single HTML file, (5) run a visual QA loop with screenshots to fix layout, (6) deliver browser-presentable deck. 12 slide formats (cover, agenda, two-column, stat grid, feature bento, comparison, timeline, chart, plus 4 more) and 3 templates (Default editorial-warm with sharp red accent; Dark black with yellow accents; Light Apple-clean). Zero dependencies, single HTML file, Chart.js for live charts. Peter Yang's stated thesis: build the system (skill) ONCE instead of doing the work every time.

Way B, parallel independent review subagents (Camron Haider). Source: medium.com/@camronhaider "I Hate Making Slideshows," dated September 25, 2025 (BACKGROUND, pre-window, but the single best idea found). Repo: github.com/camronh/slidev-agent. Instead of the main agent grading its own work, it spins up ONE independent review subagent PER slide, in parallel, each with fresh context and no attachment to the original design. They critique: white text on white/pastel background, broken layouts, content overflow, raw HTML rendering instead of components, blank slides. Critical implementation detail: it exports each slide to an individual labeled PNG ({slide-number}.png) and feeds the PNGs to the vision model, because feeding a multi-page PDF hid the visual issues from Claude. Vision works per-image, not per-PDF.

### 3. The production-grade Instagram carousel skill architecture (closest mirror to Carter's pipeline)

Source: github.com/jeevanbavandla/instagram-carousel-skill (read directly; only ~2 stars, so treat as a reference architecture not a popularity signal). Near-exact template for how to structure our own skill:

```
instagram-carousel/SKILL.md            (auto-loaded by Claude Code)
instagram-carousel/references/
  design-system.md   (dimensions, fonts, color tokens)
  components.md      (profile header, progress bar, CTA slide)
  styles.md          (4 style specs with full CSS)
  export-guide.md    (Playwright PNG export methodology)
carousels/brand-config.json            (captured once on first run)
```

Four named styles, each mapped to a content type: Bold Impact (dark navy, massive text, film grain; for numbered tips/mistakes), Tweet Post (ultra minimal, zero effects; for hot takes/quotes), Clean Editorial (white, grid overlay, coral accent; for frameworks/tutorials), Product Showcase (warm gradient, app-icon cards; for tool lists/comparisons). Design at 420x525 px, export at 1080x1350 (4:5) via Playwright device_scale_factor (roughly 2.57x). Brand config (name, handle, tagline, photo, accent hex, default style) is captured once and persisted, never re-asked. HTML is generated programmatically (write full file to carousels/[topic].html). Copy this SKILL.md + references + brand-config.json + Playwright-export pattern wholesale.

### 4. The exact export mechanics everyone converges on (steal these verbatim)

Sources: aiguide101.com (Ryan Carter, dated May 21, 2026), jeevanbavandla export-guide, and crossaitools/marcolang Instagram Carousel skill (search snippet). Consensus PNG-export recipe:

- Embed fonts as base64 data URIs BEFORE exporting. Fallback fonts are the number-one export failure. aiguide101 states this as a hard requirement in the carousel-to-png SKILL.md. We already base64-embed fonts, so we are ahead here.
- Screenshot the SLIDE ELEMENT, not the page, using a clip. aiguide101 quotes the skill: "Screenshot the slide element, NOT the page with clip rectangle" for pixel-perfect output. jeevanbavandla confirms element-level capture avoids browser chrome.
- Wait for document.fonts.ready PLUS a fixed buffer (aiguide101 uses fonts.ready + 3 seconds) before capturing, so web fonts and layout settle.
- Scale via device_scale_factor rather than changing the layout viewport. aiguide101: design 420x525, export 1080x1350, scale factor 1080/420 = 2.57; viewport buffer = slide width + 400 px. crossaitools skill: "uses Playwright's device_scale_factor to scale up to 1080px output without changing the layout viewport." Design at CSS px and let scale handle DPI, exactly our shotpls model.
- Write HTML via Python, not shell string interpolation, "to avoid shell interpolation corrupting the strings" (crossaitools/marcolang skill). Relevant to us because our tooling runs via uv/Python; do NOT build slide HTML with shell heredocs.
- Embed user photos as base64 data URIs, never relative paths (crossaitools/marcolang). We already inline all assets.

### 5. Do NOT use HTML-to-PDF renderers. Headless Chrome (our shotpls) is the correct choice.

Source: wonderingaboutai.substack.com "CarouselBot vs. Claude Skills," Karen Spinner, dated February 20, 2026 (BACKGROUND but a direct, useful negative result). The Claude-Skills carousel she built rendered HTML to PDF with WeasyPrint (the PDF engine in the Claude sandbox). It required FIVE iterations to render correctly: unreadable text sizing, squished footers, misaligned watermarks. WeasyPrint chokes on CSS flexbox and margins. Her fixes: replace flexbox with HTML table layouts, and download Google Fonts from the whitelisted registry.npmjs.org and embed as @font-face data URIs. Takeaway: Carter's headless-Chrome (shotpls) pipeline sidesteps this entire class of pain. Any CSS that works in Chrome renders perfectly (confirmed independently by the Puppeteer-based slide tutorials). Do not let anyone talk us into a PDF-engine path.

### 6. Design-system-as-file is the dominant "200 IQ trick," and it comes in three schools

Markdown school (DESIGN.md / brand.md). VoltAgent/awesome-design-md and the widely-cited "Awesome Design MD" (per MindStudio, reported around 71,000 stars mid-2026; that star count is from a secondary source, not verified on GitHub directly) ship 57 to 68 brand systems as plain markdown: colors, typography, spacing, feel. Drop one in and the coding agent matches it. Ryan Frizelle's carousel guide (ryanfrizelle.com, no date on page) uses the same idea as a single CAROUSEL-BRAND.md at project root holding style direction, hex codes, typography rules, slide templates with {{variable}} placeholders, and hard constraints, and insists the file be "read fresh each run, caching disabled." His line: "The brand file is the whole ballgame." Note: Frizelle's actual image render uses Gemini 3 Pro Image Preview (nano banana) at 1080x1080, NOT HTML-to-PNG, so his design-file idea is portable to us but his renderer is not.

HTML school (design.html reference files). yzfly/awesome-design-html (author yzfly / 云中江树, v1.0.0 dated May 20, 2026, MIT, ~122 stars) ships 116 self-contained brand HTML files (94 web + 22 iOS). Each embeds tokens inline as :root CSS custom properties (hex, type, radius, button shape). Claude reads the reference HTML source to extract brand tokens, then applies them to a new layout. Its thesis is explicitly anti-Markdown: "HTML is alive," the artifact is both the documentation and the spec. Maps to our world better than Markdown because our deliverable IS HTML.

Ported-internal-prompt school. jiji262/claude-design-skill (author jiji262, 143 stars, MIT) ports Claude.ai's INTERNAL Design system prompt into a portable skill. Its "anti-slop discipline" bans, quoted: "aggressive gradients, emoji bullets, rounded-cards-with-left-border, CSS-silhouettes-as-product-shots, gradient-orbs-representing-AI." It also enforces fact-verification (WebSearch before assuming) and a brand-asset protocol before any ideation. Worth reading for the banned-pattern list alone.

### 7. Real X/Twitter handles and threads (Claude Design launch week, mid-April 2026)

Sourced from the "X signal" table inside github.com/rohitg00/awesome-claude-design (read directly). These are Claude Design (web) launch-week posts, but two describe TERMINAL-portable techniques:

- @petergyang (Peter Yang), 2026-04-18, x.com/petergyang/status/2045527271650558383: 16-minute multi-artifact build (video + slides + website + app + design system in one session). Same person who built the terminal /slides skill (finding 2). Follow this account; highest-signal creator for our exact use case.
- @Flomerboy (Ryan Mather), 2026-04-19, x.com/Flomerboy/status/2045162321589252458: a 7-tip thread. Key portable tip: "system-first" = build the DESIGN.md FIRST, then reference it across subsequent prompts rather than regenerating tokens each request. Second tip: "comments-not-chat" (element-specific feedback beats full-design chat regeneration). Comments-not-chat maps in the terminal to: point Claude at a specific slide file and a specific screenshot region rather than re-describing the whole deck.
- @helloitsaustin, 2026-04-17, x.com/helloitsaustin/status/2045176910569980318: tweaks-panel demo, inline comment-and-adjust loop, faster than chat iteration for carousel/poster refinement.
- @claudeai official launch 2026-04-17 (x.com/claudeai/status/2045156267690213649) and a later @claudeai post confirming Claude Design "stays on brand with your design system across projects" and "syncs with Claude Code."
- @ClaudeDevs, x.com/ClaudeDevs/status/2067391951725629941: "/design-sync to pull your design system into your repo and build against your real components, or push what you've built back into Claude Design." The one official terminal-relevant handle: /design-sync bridges the web canvas and the repo. Note only as the compare-the-two boundary the mission flagged.

MacStories (John Voorhees, 2026-04-18, per the same table) reported "comment-on-element covered 95% of what's needed," reinforcing that granular per-element feedback beats whole-deck regeneration.

### 8. Other real skills/repos worth cataloguing (varied maturity)

- itchernetski/threads-carousel-claude-skill (@itchernetski), v1.2.0 dated Apr 19, 2026, read directly. Strongest TOKEN SYSTEM found: a 4-axis composable design system yielding "880 valid combinations" = 5 fonts (Minimal, Editorial, Clean, Mono, Condensed) x 8 surfaces (Dark, White, Light, Paper, Gradient, Pastel, Neon, Ember) x 11 accents x 2 purposes (Carousel = 44px uppercase, Presentation = 72px sentence case). 12 slide types (hook, body, list, stats, quote, checklist, process, comparison, cta, image, emoji, number). Formats: Threads/IG 1080x1350, square, 9:16, 16:9, LinkedIn PDF. Export via html-to-image (PNG) or jsPDF (PDF). Runs a local preview on bun dev port 3333. Trigger is literally "make a carousel."
- Hainrixz/open-carrusel (founder Enrique Rocha, @soyenriquerocha, handle tododeia), read directly. Full-stack app that spawns Claude CLI as a subprocess with --allowedTools Bash WebFetch, streams via SSE. Claude writes full HTML/CSS then POSTs slides via curl to an API. Single wrapSlideHtml() function feeds BOTH the preview iframe AND the Puppeteer export so "what you see is exactly what you export" (good principle: one render contract for preview and export). Supports 1080x1080, 1080x1350, 1080x1920. Sharp for image processing, Archiver to zip. Brand config in /data/brand.json injected into the system prompt every request.
- tylergermain gists (curl-able installers for Claude Code): Thread Carousels (gist 177a85e818379db324abf6ae3481e2e3) and Instagram Skills (gist c8392860f7b82d048e69db1c9efef53d). install.sh installers that drop tweet-style-carousel and slide-stitching skills into Claude Code.
- charlesdove977/carousel-builder: end-to-end IG carousel in Claude Code but uses Higgsfield (AI images) + Canva assembly + a /short-form-caption skill. Different model (image-gen, not HTML-to-PNG). Note only.
- MattGaiser/claude-html-powerpoint-skill and zarazhangrui/frontend-slides (packaged as a Claude Code plugin, zero-dependency single HTML files with inline CSS/JS, "show don't tell" preview picking). frontend-slides confirms the zero-dependency single-HTML-file discipline we already use.
- Composio note: their design-skills roundup says most serious design skills REJECT carousels as a poor pattern by default (the Anthropic frontend-design skill included). The lesson is not "don't do carousels," it is "a carousel must have narrative purpose per slide or the skill treats it as slop."

### 9. Animated slides (video-in-carousel): thin evidence, one concrete mechanic

The searches turned up almost nothing on genuinely animated slides authored via Claude Code terminal. The only concrete mechanic found: creatorflow.so and an iconictechs guide describe auto-converting GIF to MP4 to keep color consistent and meet Instagram's carousel video requirements. Claude Design (web) can build animated HTML prototypes with a timeline animation engine and easing (per jiji262 skill's "timeline animation engine with easing" starter asset and MindStudio's Claude Design coverage), but that is the web product. For a terminal pipeline, the portable path is: author a CSS/JS keyframe animation in the standalone slide HTML, capture frames headlessly, encode to MP4/GIF. No creator was found publishing exactly this for IG carousels in-window. GAP flagged below.

---

## SO WHAT FOR US

1. Adopt the Anthropic frontend-design SKILL.md philosophy as the spine of our make-carousel skill. Its rules ARE the cure for busy slides: one signature element per slide, hero-as-thesis, remove-one-accessory, and an explicit ban on decorative structure (our hud rows, kickers, pagers, tag rows). Bake its two-pass process (write a token plan, then critique it against the brief before rendering) into the skill so Claude commits to ONE focal point before it writes a line of HTML. Add its banned-defaults list (Warm Cream, Dark Acid, Broadsheet) and banned fonts (Inter, Roboto, Arial, Space Grotesk) as hard constraints so we never regress to newspaper mode.

2. Build the parallel per-slide review subagent (Camron Haider pattern) into our shotpls flow. After rendering all slides to PNG, fan out one review subagent per PNG with fresh context, each checking a fixed rubric: contrast failures, overflow, more than one focal point, decorative-only rows, readability at thumbnail size. Feed PNGs individually, never as a combined PDF, or vision misses the defects. Single highest-leverage build and it fits our existing "render to PNG then inspect" loop.

3. Our pipeline choices are already correct and validated by the negative results. Headless Chrome (shotpls) beats WeasyPrint HTML-to-PDF (5-iteration flexbox hell). We already base64-embed fonts and inline all assets. Keep both. Steal the two export refinements we may be missing: wait for document.fonts.ready plus a settle buffer before capture, and capture the SLIDE ELEMENT with a clip rectangle rather than the full page. Design at CSS px (1080x1350) and let device_scale_factor produce 2160x2700, exactly what we do.

4. Codify our design system as a versioned file the skill reads FRESH every run. The whole field converges on this (CAROUSEL-BRAND.md / DESIGN.md / brand-config.json / design.html). Given our deliverable is HTML, prefer the HTML-reference school (yzfly) or a hybrid: a tokens file plus 2-3 canonical reference slide HTMLs that encode the poster look. Never let the skill cache the brand file. Capture Carter's brand config once (handle, accent, fonts, default style) and persist it, jeevanbavandla-style.

5. Ship a small number of named styles bound to content types, not infinite knobs. jeevanbavandla's four (Bold Impact, Tweet Post, Clean Editorial, Product Showcase) and itchernetski's constrained axes both beat a free-for-all. For the poster pivot, define styles that each enforce one focal point: a giant-type style, a single-image style, a one-number style, a quote style. The itchernetski Carousel-vs-Presentation purpose split (44px uppercase vs 72px sentence case) is a good size lever to borrow.

6. Follow @petergyang and @Flomerboy for ongoing signal. Peter Yang is building the exact terminal /slides skill we want and publishes the internals. Ryan Mather's "system-first, comments-not-chat" is the correct mental model: build the design file first, then iterate by pointing Claude at ONE slide and ONE screenshot region, not by re-describing the whole deck.

7. Animated slides: treat as an R and D spike, not a copy job. No creator was found shipping in-window animated IG carousel slides via terminal. The portable path is CSS/JS keyframes in the standalone slide HTML, headless frame capture, then encode to MP4/GIF (matching Instagram's GIF-to-MP4 requirement). We would be early here, which is upside for "best carousels on Instagram."

---

## GAPS AND DEAD ENDS

- Direct X/Twitter post bodies were unreadable: every x.com WebFetch returned HTTP 402. All handles/dates above are from search snippets and the rohitg00 X-signal table, not from reading the posts. Confidence on the exact WORDING of threads is therefore lower than on the repos I read directly.
- Most named X activity clusters in mid-April 2026 (Claude Design launch week) and is about the WEB product, not the terminal. Genuinely terminal-native carousel X threads from June-July 2026 were thin; the strongest terminal material lived in GitHub repos and creator blogs, not on X.
- The "71,000 stars" for Awesome Design MD comes only from MindStudio's secondary reporting; not verified on GitHub directly. yzfly (~122) and jiji262 (143) star counts were read on the repo pages.
- No creator was found publishing a real terminal workflow for animated/video slides inside an IG carousel. The video-slide angle is under-documented and unverified beyond the GIF-to-MP4 requirement.
- Peter Yang's skill.md and styles.md internals are behind a paid membership (creatoreconomy.so returned 402); I have the 6-step workflow and format/template list from search, but not the verbatim skill files.
