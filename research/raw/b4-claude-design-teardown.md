<!-- © AngelaMos | 2026 | b4-claude-design-teardown.md -->

# DIVISION B / B4: Claude Design teardown + Anthropic 2026 design releases

Mission: teardown the "Claude Design" product, decide which features to replicate in a Claude Code terminal carousel workflow, and identify what we can EXCEED. Plus cover the Anthropic official design releases relevant to us (agent skills, frontend-design skill, artifacts, vision-based iteration).

Date compiled: 2026-07-10. Recency window prioritized: April to July 2026. Claude Design launched 2026-04-17, so essentially all of this is inside the window.

---

## SEARCHES RUN

1. `Anthropic Claude Design product 2026 design tool features`
2. `"Claude" design tool export sizes live preview in-place editing 2026`
3. `Claude Design pricing limitations complaints review Figma replacement 2026`
4. `Anthropic frontend-design skill agent skills 2026 aesthetic HTML`
5. `Claude Code carousel Instagram HTML slides workflow shotpls headless chrome 2026`
6. `Instagram animated carousel video slides 2026 mixed photo video carousel trend`
7. `Claude Code vision screenshot iteration loop UI design feedback 2026 "take a screenshot" agentic`
8. `Claude Design shaders 3D voice video code-powered prototypes animation review 2026`
9. `"awesome-claude-design" OR "claude design" recipe poster minimal one focal point big type carousel`

Pages fetched and read in full:
- anthropic.com/news/claude-design-anthropic-labs (official launch post)
- github.com/jimliu/baoyu-design (Claude Design repackaged as a LOCAL Agent Skill: the single most important source for us)
- github.com/JimLiu/baoyu-design SKILL.md + system-prompt.md + starter-components/animations.jsx (raw)
- github.com/Hainrixz/open-carrusel (near-identical competitor to Carter's exact pipeline)
- github.com/itchernetski/threads-carousel-claude-skill (another terminal carousel skill)
- github.com/VoltAgent/awesome-claude-design (68 DESIGN.md design-system files)
- github.com/ComposioHQ/awesome-claude-skills canvas-design/SKILL.md (poster philosophy)
- github.com/rohitg00/awesome-claude-design (recipes + remix + token-budget)
- raw.githubusercontent anthropics/skills frontend-design/SKILL.md (the official design methodology)
- uxpilot.ai/blogs/claude-design-review (pricing + limits + bugs)
- blog.vibecoder.me/claude-design-system-sync-code-handoff (design-sync + Claude Code handoff, beta)

Dead ends: rohitg00/awesome-claude-design landing page returned HTTP 403 on direct WebFetch (got its contents via a subpath fetch + search snippets instead). Exact per-recipe code from the awesome-claude-design "frontier-3d-shaders.md" recipe was not retrievable in full. Reddit r/ClaudeAI raw threads were only available as quoted snippets ("resounding meh"), not fetched directly. The Figma-stock-dropped-7% number is press-reported (TechCrunch/eigent/getaiperks), not a primary source.

---

## FINDINGS

### 1. What Claude Design actually IS

Claude Design is a separate Anthropic Labs product (its own workspace at claude.ai/design), launched 2026-04-17. It is NOT the same surface as Artifacts or Claude Code. Positioned by Anthropic as complementary to Canva, explicitly not a replacement for professional design tools.

- Model under the hood at launch: Claude Opus 4.7.
- Availability: research preview for Claude Pro, Max, Team, Enterprise. Enterprise access is OFF by default (admin must enable).
- Market signal on launch day: multiple outlets reported Figma stock dropped ~7% and Claude search interest hit an all-time high on Google Trends (TechCrunch, eigent.ai, getaiperks). Treat the 7% figure as reported-by-press, not primary.

The core loop: you describe what you want, Claude generates a working visual draft on a LIVE CANVAS (real clickable HTML, not a flat mockup), and you refine through conversation, inline comments, direct text edits, or "adjustment knobs" / sliders for spacing, color, layout.

Source: anthropic.com/news/claude-design-anthropic-labs; support.claude.com/en/articles/14604416-get-started-with-claude-design; datacamp.com/blog/claude-design.

### 2. Feature inventory (verbatim capabilities)

Inputs:
- Text prompt.
- Image uploads.
- Documents: DOCX, PPTX, XLSX.
- Point it at your codebase.
- Web capture tool: grab elements directly from a live website so prototypes look like the real product.

Refinement:
- Inline comments on specific elements.
- Direct text editing on the canvas.
- "Adjustment knobs" / sliders to tweak spacing, color, layout LIVE.
- Then "ask Claude to apply your changes across the full design" (propagate one change to every slide/screen).

Outputs / exports:
- Internal org URL (share within organization).
- Save as a folder.
- Canva integration.
- PDF.
- PPTX (PowerPoint).
- Standalone HTML files.
- Single-instruction handoff bundle straight to Claude Code.

Design system:
- During onboarding Claude reads your codebase + design files and builds a design system (colors, typography, components). Every project after uses it automatically. Teams can maintain multiple systems.
- Differentiator claimed: Lovable and v0 do NOT infer a coherent design system from a GitHub repo; Claude Design does (per launch positioning + reviews).

Frontier / code-powered prototypes:
- "Anyone can build code-powered prototypes with voice, video, shaders, 3D and built-in AI." Claude writes the underlying code and renders it live. So the canvas can host WebGL shaders, 3D, video, voice interaction. This is the animation/motion story: it is not a keyframe timeline UI, it is Claude writing real animated/interactive HTML/JS.

Source: anthropic.com launch post; agence-scroll.com/en/blog/claude-design-anthropic-2026-guide; mavgpt.ai guide.

### 3. Pricing, usage limits, and the KILLER complaint (token burn)

This is the single most repeated criticism and it is the exact thing our pipeline structurally avoids.

Plans (uxpilot.ai/blogs/claude-design-review, eesel.ai/blog/claude-design-pricing):
- Pro: $20/mo. Positioned for "non-designers, occasional prototyping."
- Max 5X: $100/mo (5x usage).
- Max 20X: $200/mo (20x usage).
- Team Standard: $20/seat/mo. Team Premium: $125/seat/mo (5x limits).
- Enterprise: custom.

Usage meter reality:
- Claude Design runs on a WEEKLY usage meter, metered SEPARATELY from your chat and Claude Code limits.
- aitoolanalysis.com headline: "Burns Pro Quotas In 30 Minutes." An independent tester burned ~80% of a Pro plan's weekly Design allowance in roughly 30 minutes of prototyping.
- uxpilot reviewer: exhausted Pro credits in "36 minutes ... that's five prompts." Individual prompts took "around four to seven minutes per prompt"; four prompts = ~21 minutes of waiting. Tasks completed before the cutoff: one homepage prototype, one hero fix, one checkout flow, one product page, one design-system setup.
- rohitg00 token-budget recipe notes token costs are ~3x normal text because generation routes through a vision model; the whole recipe exists to conserve tokens (scaffold once, cap reference screens at 4, iterate via inline comments, bundle to Claude Code in one shot).

Other documented limitations / bugs:
- No Figma export. If Figma is your destination you rebuild by hand.
- No desktop app.
- Text overlaps; hero sometimes placed below the fold; interactive elements trigger incorrectly or not at all; sometimes generates illustrations when you asked for photographs.
- Section selector "often imprecise"; annotations "easy to miss," no canvas visual feedback confirming your annotation landed.
- Slow: 4 to 7 min per prompt.
- r/ClaudeAI launch reaction landed at "resounding meh" per aitoolanalysis; the two dominant complaints were token limits and GENERIC aesthetics.
- Anthropic itself positions it as complementary to Canva, NOT a pro-design replacement. Missing for pro teams: real-time multi-editor collab, persistent component/token design systems, precise vector illustration, dev handoff with measurements/annotations, plugin ecosystem, named version snapshots.

Source: uxpilot.ai/blogs/claude-design-review; aitoolanalysis.com/claude-design-review; eesel.ai/blog/claude-design-pricing; yiannisantoniou.substack.com "impressive but not yet ready to replace Figma."

### 4. baoyu-design: Claude Design rebuilt as a LOCAL Agent Skill (our exact blueprint)

github.com/jimliu/baoyu-design (Jim Liu, MIT, community, not Anthropic-affiliated). This repackages the Claude Design methodology to run LOCALLY inside Claude Code / Cursor / Codex, producing self-contained HTML without claude.ai/design. It targets Opus 4.8 explicitly ("the stronger the model, the better the result"). This is the closest existing thing to what Carter wants, and it proves the whole thesis: you can run Claude-Design-grade craft in the terminal with zero token meter.

Structure:
- `skills/baoyu-design/SKILL.md` (orchestration entry point).
- `system-prompt.md` (the design methodology + craft standards, called "source of truth").
- `references/` tool maps for Claude Code, Cursor, Codex (each harness has its own preview/screenshot mechanism).
- `built-in-skills/` prompt modules: `wireframe.md`, `hi-fi-design.md`, `interactive-prototype.md`, `create-design-system.md`, `design-components.md`, `design-system-authoring-guide.md`, `use-design-system.md`, `import-from-figma.md`, `import-from-github.md`, `import-from-html.md`, `make-a-doc.md`, `animated-video.md`, `export-as-video.md`, `export-as-pptx-editable.md`, `something-cool.md`.
- `starter-components/`: `ios-frame.jsx`, `android-frame.jsx`, `browser-window.jsx`, `macos-window.jsx`, `design-canvas.jsx`, `deck-stage.js`, `animations.jsx`, `anim-demo.html`, `tweaks-panel.jsx`, `image-slot.js`.
- `agents/`: `compile-design-system.mjs`, `check-design-system.mjs`, `build-preview.mjs`, `import-figma.mjs`, `import-design-system.mjs`, `record-asset.mjs`, plus `gen-pptx/` and a `gen-video` tool.

Install: `npx skills add JimLiu/baoyu-design --agent claude-code` (or `--agent cursor`). Or paste the repo URL into an agent chat for one-off use.

Design-system workflow (worth stealing wholesale):
1. Create or import a system into `designs/`.
2. Bind it to projects; systems sync to `_ds/<slug>/` and bindings recorded in `_d_meta.json`.
3. Agent reads the binding and maintains consistency across projects.
4. Refresh/update the system without restarting the conversation.
- Figma import is OFFLINE: `.fig` decoded via `agents/import-figma.mjs`, no Figma API. Modes: outline, mount, materialize, render, design-system. Produces semantic component groups, curated token CSS, extracted SVG/PNG assets, guideline cards, and a self-contained `preview.html`.

Iteration loop (the "visual second-pass"):
1. Build HTML into `designs/<project>/`.
2. Preview over HTTP (localhost) using the harness-specific tool.
3. Point at elements in the live preview, request changes, agent edits the SOURCE.
4. Verify clean load; fix errors before delivery.

PPTX export: `agents/gen-pptx/` drives headless Chromium via Playwright, renders the deck as a live web page, and serializes each slide into PowerPoint objects via PptxGenJS. Editable-PPTX mode preserves native PowerPoint animations; screenshot mode just embeds images.

Source: github.com/jimliu/baoyu-design and its raw SKILL.md / system-prompt.md.

Craft standards from baoyu-design system-prompt.md worth quoting:
- "Strongly prefer flex/grid with `gap` over inline flow"; "One thousand no's for every yes" (avoid filler; every element earns its place).
- Slide text minimum 24px (never smaller for 1920x1080); 44px minimum hit targets on mobile.
- "Never pad a design with placeholder text, dummy sections, or informational material just to fill space." Ask before adding material; avoid "data slop" (unnecessary numbers, stats, icons).
- Decks: 1 to 2 background colors maximum; use different bg colors only for SECTION starters; full-bleed imagery when central.
- Motion: prefer CSS transitions for interactive work; use the `animations.jsx` timeline engine for video-style work; make the visible end-state the base style; avoid infinite decorative loops.

### 5. The baoyu-design ANIMATION ENGINE (how "animated slides" get built + exported to video)

`starter-components/animations.jsx` is a React timeline framework (NOT a data-attribute system). It is the thing that turns HTML slides into video-style motion and is the template for animated carousel slides.

Primitives:
- `<Stage width height duration>`: container managing the playhead, duration, playback.
- `<Sprite start={s} end={e}>`: renders children only inside that time window.
- Hooks: `useTime()` (current playhead in seconds), `useTimeline()` (time/duration/playing), `useSprite()` (localTime, progress, duration for a sprite's children).

Built-in sprite types:
- `TextSprite` (fade + vertical slide in on entry, hold, fade out): props text, x, y, size, color, entryDur, exitDur, entryEase, exitEase, align.
- `ImageSprite` (scale + fade, optional Ken Burns drift): props src, width, height, entryDur, exitDur, kenBurns, kenBurnsScale, radius, fit.
- `RectSprite` (animatable rectangle): x, y, width, height, color, radius, entryDur, exitDur, render.

Easing library (full list, useful reference): linear, easeInQuad/OutQuad/InOutQuad, InCubic/OutCubic/InOutCubic, InQuart/OutQuart/InOutQuart, InExpo/OutExpo/InOutExpo, InSine/OutSine/InOutSine, OutBack/InBack/InOutBack, OutElastic.

Motion utilities: `interpolate(input, output, ease?)` (Popmotion-style keyframe mapper), `animate({from, to, start, end, ease})` (single-segment tween returning a time-based function), `clamp(v, min, max)`.

Export/capture: a `capture` prop or `?capture` URL param triggers deterministic frame-by-frame rendering. It exposes a `window.__animStage` bridge so an external tool can seek and record every frame to video (the `gen-video` tool records this to MP4). THIS is the exact pattern for producing a video slide inside a carousel headlessly: build the motion in the Stage, seek frame by frame in headless Chrome, encode to MP4.

Separately, the deck path uses a `data-anim` attribute convention for per-element builds that exports as NATIVE PowerPoint animations:
```
<li data-anim="fade-in" data-anim-trigger="click">First point</li>
<img data-anim="zoom-in" data-anim-trigger="with" src="chart.png">
```
Effects: entrances (fade, fly, wipe, bounce, zoom), emphasis (spin, pulse), custom `path` motion. Triggers: click, with, after.

Source: raw animations.jsx + baoyu-design deck docs.

### 6. Direct competitors already running Carter's exact pipeline (terminal HTML to PNG carousels)

open-carrusel (github.com/Hainrixz/open-carrusel, by Enrique Rocha / tododeia, MIT): this is essentially Carter's pipeline productized as a local webapp. Read this closely, it is the benchmark to beat.
- Claude CLI spawned as a subprocess from `/api/chat` with `--allowedTools Bash WebFetch`, streamed to browser via SSE. So the agent gets Bash (to curl slides into the store) and WebFetch (to research while designing) mid-generation.
- Slides stored as body-level HTML only (no html/head/doctype). A `wrapSlideHtml()` function (`src/lib/slide-html.ts`) adds the document shell, fonts, dimension constraints, box-sizing reset. The SAME wrapped HTML powers both the live iframe preview AND the Puppeteer PNG export, so "what you see is exactly what you export."
- Dimensions supported: 1:1 = 1080x1080, 4:5 = 1080x1350 (Carter's format), 9:16 = 1080x1920.
- Export: Puppeteer headless Chromium loads wrapped HTML, screenshots at exact IG px, Sharp processes, Archiver zips PNGs, single download.
- Brand config JSON (`/data/brand.json`): name, primary/secondary/accent/background/surface colors, heading+body Google Fonts, logo, free-text style keywords ("editorial, minimalist, warm tones"). Injected into the system prompt (`chat-system-prompt.ts`) before every request so output stays on-brand.
- Preview has a SAFE-ZONE OVERLAY showing the IG UI crop boundary. Filmstrip is drag-reorderable (@dnd-kit). Per-slide version history + undo.
- Sandboxed iframe (`sandbox=""`, no scripts) for preview so slides can't execute.
- Slash commands via `.claude/commands/`: `/start [port]`, `/stop`, `/reset`, `/doctor`.
- Stack: Next.js 16 Turbopack, React 19, Tailwind v4, Radix, Puppeteer, Sharp, Archiver, async-mutex (atomic tmp-file-then-rename JSON writes). Motion is "CSS-first (Emil Kowalski philosophy)": custom easings, `@starting-style`, `prefers-reduced-motion` respect.

threads-carousel-claude-skill (github.com/itchernetski, Claude Code skill): a template-driven approach worth noting for its axis system.
- Renders via React 19 / Next 15, exports CLIENT-SIDE with `html-to-image` (PNG/JPEG) and `jspdf` (multi-slide PDF). No headless browser. PDF ~5-8MB per 10 slides.
- Six presets: Threads/IG portrait 1080x1350, IG square 1080x1080, LinkedIn PDF, TikTok 9:16, Stories 9:16, Wide 16:9 (1920x1080).
- 4-axis composable design system: Font (5: Minimal/Editorial/Clean/Mono/Condensed), Surface (8: Dark/White/Light/Paper/Gradient/Pastel/Neon/Ember), Accent (11 colors), Purpose (Carousel 44px bold titles vs Presentation 72px sentence case). 5x8x11x2 = 880 configs.
- 12 slide types: hook, body, list, stats, quote, checklist, process, comparison, cta, image, emoji, number.
- Claude edits ONLY `src/slides.ts`, then launches `bun dev --port 3333` on a temp copy for live preview.
- Typography defaults: Hook 88 to 170px adaptive weight 800; Title 44px weight 800 uppercase; Body 48 to 88px weight 600; presentation overrides title to 72px weight 700 sentence case. `text-wrap: balance` on hooks/titles to kill orphans. 8 background decorations: none, organic blobs, dot grid, diagonal lines, ruled paper, SVG noise, big-number watermark, radial glow.

Source: the two repos above.

### 7. Official Anthropic frontend-design skill (the design METHODOLOGY that powers all of this)

github.com/anthropics/skills skills/frontend-design (277,000+ installs as of March 2026 per officialskills / medium). Invoke `/frontend-design`. This is the official, free, terminal-native version of Claude Design's taste engine. It is already available to us as a skill in this repo.

Two-pass workflow it prescribes:
1. Brainstorm and plan: build a compact token system: color (4 to 6 named hex), typography (2+ roles, characterful display + complementary body), layout (one-sentence descriptions + ASCII wireframes), and ONE signature element.
2. Review and critique the plan against the brief. Verbatim: "if any part of it reads like the generic default you would produce for any similar page ... rather than a choice made for this specific brief, revise that part."
3. Build and self-critique: execute exactly, keep CSS specificity discipline, iterate through screenshots.

Core principles (all directly load-bearing for our carousels):
- Ground in subject: "The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from." (For us: cybersecurity vernacular = terminals, packet dumps, CVE IDs, MITRE tactics, hex.)
- Typography as personality: pair display + body deliberately; do not repeat typeface choices across projects.
- Structure encodes information: "Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it." (This is the antidote to Carter's current problem: his HUD rows/tags/pagers are decoration, not information.)
- Motion serves purpose: orchestrated moments beat scattered effects; excessive animation signals AI generation.
- Restraint, verbatim: "Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined." (This IS the fix for busy carousels: one focal point per slide.)
- Named banned defaults it warns against (so we don't accidentally ship the AI-default look): (a) cream #F4F1EA bg + high-contrast serif + terracotta accent; (b) near-black bg + single acid-green/vermilion accent; (c) broadsheet layout, hairline rules, zero border-radius, dense columns. NOTE: Carter's current "designed newspaper" style is basically default (c). Worth flagging.
- Quality floor: responsive, visible keyboard focus, reduced-motion respect.

Source: raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md.

### 8. Poster / canvas-design philosophy (the exact target aesthetic Carter described)

ComposioHQ/awesome-claude-skills canvas-design/SKILL.md nails the poster ethos in explicit words:
- "90% visual design, 10% essential text."
- "Massive color blocks, sculptural typography (huge single words, tiny labels), Brutalist spatial divisions."
- "ideas expressed through visual weight and spatial tension, not explanation."
- "text as rare, powerful gesture: never paragraphs, only essential words integrated into the visual architecture."
- Craft imperative: work must appear "meticulously crafted," as if by someone "at the absolute top of their field," demonstrating "countless hours." No prescriptive numeric ratios; leans on Brutalist and Swiss formalist precedent.

From the poster-prompt research (academy.techpresso poster prompts + Claude Design poster usage): "one clear focal point with benefit headlines ... legible at a glance. A single sharp promise outperforms a crowded spec dump on a poster."

This is the north star: Carter's current slides are 6 to 9 reading zones. Poster theory says 1 focal point + tiny label. That is a ~10x reduction in reading zones per slide, and it is exactly what the elite competitors do.

Source: github.com/ComposioHQ/awesome-claude-skills canvas-design/SKILL.md; academy.techpresso.co/prompts/claude-prompts-posters.

### 9. DESIGN.md as a portable design-system file (steal this format for our brand)

VoltAgent/awesome-claude-design: 68 ready-to-use design systems in DESIGN.md format; "drop one in, scaffold a full UI in one shot." A DESIGN.md has 9 canonical sections:
1. Visual Theme and Atmosphere (mood, density)
2. Color Palette and Roles (CSS vars, semantic names)
3. Typography Rules (scale, fallbacks)
4. Component Stylings (buttons/inputs/cards/nav with states)
5. Layout Principles (spacing scale, grid, whitespace rhythm)
6. Depth and Elevation (shadow tokens, surface hierarchy)
7. Do's and Don'ts (guardrails)
8. Responsive Behavior (breakpoints, touch targets)
9. Agent Prompt Guide (reusable prompts for future generation)

Uploading one DESIGN.md produces a README, `colors_and_type.css`, Google Font substitutes for proprietary faces, preview cards, a working UI kit, and a portable SKILL.md.

rohitg00/awesome-claude-design adds remix recipes (mix two brand DESIGN.md files, e.g. `stripe-x-a24.md` = "layout discipline + poster boldness", `warp-x-sentry.md` = "terminal mono + cinematic purple", `vercel-x-pitchfork.md` = "grayscale + editorial orange"), an anti-slop `break-default-aesthetic` prompt that neutralizes "teal-accent, serif-default, container-soup fingerprints", a `3-designer-debate` critique prompt (three-voice critique with minority reports), and an `audit-live-site` scorer (hierarchy, spacing, a11y, slop detection). It also documents the token-budget recipe and notes Claude Design vision routing is ~3x token cost. Its "Cinematic Dark" family (Runway, ElevenLabs, NVIDIA, Ferrari) emphasizes oversized type, film-grade gradients, media-heavy hero: relevant reference for our poster pivot.

Source: github.com/VoltAgent/awesome-claude-design; github.com/rohitg00/awesome-claude-design.

### 10. design-sync + Claude Code handoff (beta) and vision-based iteration

blog.vibecoder.me/claude-design-system-sync-code-handoff reports (dated to the beta, Pro and above): two-way `/design-sync` between Claude Design and Claude Code, WYSIWYG canvas editing, design-system imports, and direct Claude Code handoff, so Claude Code receives component context, layout, and canvas annotations from Claude Design "eliminating the screenshot-and-rebuild step." Treat this community blog's exact wording as secondary. (Our own harness also exposes a `DesignSync` tool name in its deferred-tool list, hinting the same handoff plumbing may be reachable from Claude Code directly; unverified here.)

Vision-based iteration (the real mechanism behind all of the above, and free to us):
- The screenshot loop: write code, screenshot the render, paste the image back to Claude, give specific visual feedback, repeat. Anthropic's own best-practice guidance is explicit that Claude writes correct CSS but cannot evaluate its own visual output, so you must verify UI changes visually and paste images directly (superdesign.dev, tweag agentic-coding-handbook, youcanbuildthings.com fix-ugly-UI).
- Claude CAN reason over an attached screenshot: layout, hierarchy, spacing, component relationships, and can flag inconsistent spacing, low-contrast text, over-heavy shadow, no visual hierarchy (mindstudio.ai iterative-refinement-loop).
- This is the single highest-leverage thing we are probably UNDER-using: our shotpls PNGs should be fed straight back into the model as a critique gate before shipping.

Source: blog.vibecoder.me; superdesign.dev/blog/claude-code-ui-design; tweag.github.io/agentic-coding-handbook/WORKFLOW_VISUAL_FEEDBACK; mindstudio.ai/blog/iterative-refinement-loop-claude-design-multimodal.

### 11. 2026 Instagram carousel spec + the mixed photo/video trend (why animated slides matter now)

- IG allows up to 20 slides per carousel (raised from 10 in 2024).
- New in 2026: 1080x1440 (3:4 tall portrait) is now supported and fills the 3:4 profile grid without cropping, taking even more feed real estate than 4:5. Carter is currently on 1080x1350 (4:5). Worth testing 1080x1440. (wavegen.ai; creatorflow; socialrails)
- Mixed-media carousels (static images + short video clips in one carousel, all SAME aspect ratio, video slides up to 60s) are treated favorably by the 2026 algorithm when file size is optimized. Pure static still wins Save rate for educational content; video-heavy wins Watch Time. Recommended pattern: static hook, video demo in the middle, static CTA. (creatorflow; 2slides; marketingagent.blog)
- Frame-by-frame animation across swipes (design sequential frames that read as motion as the user swipes) is called out as a 2026 technique for processes/transformations/reveals. This costs us nothing: it is just N carefully-sequenced static HTML slides.

Source: wavegen.ai/instagram-carousel; creatorflow.so; socialrails.com; 2slides.com; marketingagent.blog.

---

## SO WHAT FOR US

The headline: Claude Design's ONLY real moats over a Claude Code terminal pipeline are the live canvas UI, the adjustment-knob sliders, and the Canva/PPTX exports. Every one of those is either irrelevant to IG carousels or cheaply rebuildable. Meanwhile Claude Design's two worst problems, the token meter (80% of a Pro week gone in 30 min, 4-7 min per prompt) and generic output, are problems our pipeline STRUCTURALLY DOES NOT HAVE. We run on Claude Code's own budget, iterate instantly, and control every pixel of the HTML. baoyu-design and open-carrusel prove this is not theoretical: two shipping projects already do exactly the terminal-HTML-to-PNG thing. Our job is to out-craft them.

Replicate (cheap, high value):
1. Poster ethos as the core rule. Adopt "90% visual, 10% text, one focal point, sculptural type (huge single word + tiny label)" as the hard constraint for every slide. This directly kills Carter's 6-to-9-reading-zone problem. Codify it in the make-carousel skill as a per-slide budget: ONE headline moment, ONE label, one optional supporting line, and a hard cap on reading zones (target 2-3, not 9). Anchor it to frontend-design's "spend your boldness in one place."
2. A DESIGN.md brand file (9 sections) as the single source of truth for the @carterperez.dev system, injected into every generation the way open-carrusel injects `brand.json`. One file, versioned, drives color/type/spacing/motion so every deck is on-brand without re-specifying.
3. A safe-zone overlay in preview (IG crops the edges of 4:5 in-feed) so nothing critical dies at the crop. open-carrusel already does this; trivial to add to our preview HTML.
4. A vision critique gate. After shotpls renders the 2160x2700 PNGs, feed them BACK into the model with an explicit audit rubric (hierarchy, contrast, one-focal-point check, orphan/overlap check, slop check) before declaring done. This is the free version of Claude Design's inline-annotation loop and is our biggest current gap. rohitg00's `audit-live-site` and `3-designer-debate` prompts are ready-made rubrics to adapt.
5. `text-wrap: balance` on all hooks/titles to kill orphan words (threads-carousel does this). One CSS line, immediate polish.
6. An anti-slop guardrail. Bake in the frontend-design banned-defaults list AND rohitg00's `break-default-aesthetic` neutralizers. Uncomfortable finding to flag: Carter's current "designed newspaper / broadsheet with hairline rules and dense columns" is literally one of frontend-design's three named AI-default aesthetics. The busy style is not just cluttered, it reads as a default. The poster pivot is also a de-slopping.

Exceed (things a terminal pipeline can do that Claude Design cannot):
1. Animated / video slides inside the carousel, headless. Port the baoyu-design animation Stage pattern (React `<Stage>/<Sprite>` + `?capture` frame-stepping + `window.__animStage` bridge) OR a simpler CSS-timeline, drive it frame-by-frame in headless Chrome (we already run shotpls / Puppeteer-class tooling), and encode to MP4 with ffmpeg (already on the box per the whisper service). Result: a static hook slide, a real motion demo slide, a static CTA, all in one IG carousel, matching the 2026 mixed-media trend. Claude Design cannot export an IG-ready MP4 slide at 1080x1350; we can. Single biggest differentiator available.
2. Exact-pixel control and unlimited iteration. Claude Design overlaps text, drops heroes below the fold, and can't be pixel-corrected; our HTML is deterministic and free to re-render. Lean into hairline-precise Swiss/brutalist layouts that Claude Design's fuzzy canvas can't hold.
3. 1080x1440 (3:4) variant. Add it as a render target alongside 1080x1350 and A/B it for grid dominance. Claude Design has fixed canvas assumptions; we just change one CSS var and one shotpls dimension.
4. Frame-by-frame swipe animation. Free with our model: author N sequenced static slides that read as motion across swipes (2026 technique). No new tooling.
5. Native cyber vernacular as the "ground in subject" material (frontend-design principle 1): terminals, hex, packet captures, CVE/MITRE labels as the structural devices that ENCODE information, not decorate. Competitors ship generic startup posters; our subject gives us a distinctive visual language for free.
6. No token meter, ever. Our marginal cost per carousel is Claude Code's normal budget, not a separate weekly Design allowance that dies in 30 minutes. This means we can run the full generate + vision-critique + regenerate loop as many times as needed, which is exactly the iteration Claude Design's economics forbid. Quality ceiling is therefore higher for us.

Concrete build list this unlocks:
- make-carousel skill: add a hard per-slide reading-zone budget + poster mode + inject a DESIGN.md brand file.
- New `carousel-audit` step: render PNGs, feed back to model with the audit rubric, auto-fix, re-render.
- New animation module: `<Stage>`-style HTML motion + headless frame capture + ffmpeg to MP4 at 1080x1350 (and 1080x1440), so one carousel can carry a video slide.
- Add 1080x1440 as a second render dimension behind a flag.

Bottom line for the "best carousels on Instagram" claim: Claude Design is a token-metered, generic-leaning, no-video-export web app. baoyu-design and open-carrusel already show the terminal path is viable. Our edge is the combination nobody else is shipping: poster-grade single-focal craft (from frontend-design + canvas-design), a persistent DESIGN.md brand system, a free unlimited vision-critique loop, cyber-native visual vernacular, and headless-rendered animated/video slides that hit the exact 2026 mixed-media trend. That stack is strictly stronger than Claude Design for this specific job.
