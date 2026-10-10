<!-- © AngelaMos | 2026 | division-b-claude-workflows.md -->

# DIVISION B REPORT: Claude Code carousel and design workflows in the wild (the 200-IQ tricks)

Compiled 2026-07-10 from five scout sweeps (b1 X/Twitter, b2 Reddit/forums, b3 YouTube/pipelines, b4 Claude Design teardown, b5 galaxy-brain tricks) plus a division-head verification pass. Recency window: April to July 2026. Older material labeled BACKGROUND. Every claim below traces to a named source a scout actually fetched or that I confirmed myself; unverified items are flagged.

---

## EXECUTIVE SUMMARY

1. Carter's stack is already the winning architecture. Every credible builder (marcolang, open-carrusel, baoyu-design, jeevanbavandla, Peter Yang) does exactly what shotpls does: Claude writes standalone HTML, headless Chrome screenshots it to PNG. The image-gen route (Gemini nano-banana, Leonardo) is rejected industry-wide for element drift and unreadable text.
2. The single biggest gap between us and the frontier is NOT the renderer. It is the vision QA self-correction loop: render the PNG, read it BACK into the model, critique against a rubric, fix, re-render. shotpls renders and stops. Anthropic's own docs endorse this loop (2-3 iterations, roughly 2-3x quality lift).
3. The "busy newspaper" look is a TEMPLATE default, not a rendering limit. The popular skills mandate a progress bar + counter + swipe chevron + kicker + alternating cards on every slide. Deleting that chrome toward one focal point + huge type IS the differentiator.
4. Animated/video slides inside the carousel are a solved problem on this exact stack (headless Chrome, freeze the clock, seek frame by frame, pipe to ffmpeg) and are a genuine open lane: no cybersecurity creator was found shipping it.
5. Everything actionable maps onto tooling Carter already owns (shotpls, ffmpeg on the box, uv, pnpm).

---

## THE FINDINGS THAT MATTER (ranked)

### 1. The vision QA self-correction loop is the #1 lever, and it is Anthropic-official
Render the slide PNG, feed it BACK to the model, critique against a structured rubric, fix the HTML, re-render, loop. Sources: Anthropic official best-practices (code.claude.com/docs/en/best-practices) states the paste-screenshot-and-compare pattern verbatim ("take a screenshot of the result and compare it to the original. list differences and fix them") and names the failure mode we currently have: "the trust-then-verify gap... if you can't verify it, don't ship it." Peter Yang's terminal /slides skill step 5 (creatoreconomy.so, May 27 2026, @petergyang, x.com/petergyang/status/2059642246614647259) is "take screenshots of each slide and fix layout issues." ktundwal/presentation-skills is built entirely on "visual QA feedback loops powered by Claude's vision." Reported cadence: 2-3 rounds, roughly 8 minutes, to reach 80-90% quality (tweag agentic-coding-handbook; Tal Rotbart, Medium, 2026-02-22). shotpls already produces the PNG. We are missing only the read-back-and-fix leg. This is the whole ballgame.

### 2. Feed slide PNGs to the model INDIVIDUALLY, never as a combined PDF
Hard gotcha for building our own loop. Camron Haider (github.com/camronh/slidev-agent, Sept 2025, BACKGROUND but the cleanest statement) fans out one independent review subagent PER slide in parallel, each with fresh context, and exports each slide as a labeled single PNG ({n}.png) because feeding a multi-page PDF HID the visual defects from Claude's vision. Name our PNGs stably (slide-01.png ... slide-08.png) so a critique agent reasons slide-by-slide. Corroborated by baoyu-design and Tal Rotbart's numeric per-action PNG naming.

### 3. The critique must be a "specific diff, not a vibe check"
The loop only pays off if the critique prompt is structured, or the model just says "looks great." Load-bearing phrase from Jason Zhou's prompt #7 (superdesign.dev, 2026-06-21): "Give me a specific diff, not a vibe check: list every place the spacing, hierarchy, type size, or alignment differs." Our poster critique axes: is there ONE focal point, is the hero numeric genuinely huge vs body, are we under a 2-3 reading-zone ceiling, negative-space ratio, edge alignment.

### 4. The poster ethos is the cure for busy slides, and Claude nails it when constrained
This is the thesis. Multiple codified sources converge:
- Anthropic frontend-design SKILL.md (github.com/anthropics, 277k+ installs by Mar 2026), verbatim: "Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief." It bans the template answer ("a big number with a small label, supporting stats, and a gradient accent"), and "Structure Encodes Information": numbering/eyebrows/dividers must encode something true, not decorate. It names THREE AI-default aesthetics to avoid, one of which ("Broadsheet: hairline rules, zero border-radius, dense newspaper columns") is Carter's current look. Flagged bluntly: the busy style is not just cluttered, it reads as an AI default.
- ComposioHQ canvas-design SKILL.md: "90% visual design, 10% essential text," "sculptural typography (huge single words, tiny labels)," "text as rare, powerful gesture, never paragraphs."
- Techpresso poster prompts (academy.techpresso.co, fetched by me 2026-07-10): keep the headline under six words, cap each step description at ONE line, one display typeface + one body face maximum, two or three colors max often with one accent, one dominant element. This is a ~10x cut in reading zones vs Carter's current 6-9 per slide.

### 5. Codify the brand as a file read FRESH every run (DESIGN.md / brand.json / reference HTML)
The dominant 200-IQ trick, in three schools. Markdown school: VoltAgent/awesome-claude-design ships a 9-section DESIGN.md format (theme, color roles as CSS vars, type rules, components, layout, elevation, dos/donts, responsive, agent-prompt guide) with the enforced rule "do not introduce new colors or fonts without updating this file"; rohitg00/awesome-claude-design adds a break-default-aesthetic anti-slop neutralizer and a 3-designer-debate critique prompt. HTML-reference school: yzfly/awesome-design-html (v1.0.0 May 20 2026) ships 116 brand HTMLs with :root token vars; its thesis is "HTML is alive," the artifact is both spec and documentation, which fits us because our deliverable IS HTML. Injection pattern: open-carrusel injects a brand.json (colors/fonts/keywords) into the system prompt every request. Every source insists the brand file be read fresh, never cached (Ryan Frizelle: "the brand file is the whole ballgame").

### 6. Animated/video slides are buildable on shotpls's exact stack, and it is an open lane
The mechanism is fully mapped and identical in philosophy to shotpls: load HTML in headless Chrome, FREEZE the clock, advance time manually frame by frame (frame = time x fps), screenshot each frame, pipe PNGs to ffmpeg for H.264. Four proven reference implementations:
- HyperFrames (github.com/heygen-com/hyperframes, HeyGen, free Claude skill): timing via data-start / data-duration attributes, seeks a paused CSS/GSAP timeline, deterministic. Install: npx skills add heygen-com/hyperframes (Node 22+, FFmpeg). Hard rules: no Date.now(), no unseeded Math.random(), no render-time network.
- tomaspavlin (dev.to, 2026-04-24) and dawoodtrumboo/claude-video-export: the concrete gotchas the others omit: wait TWO requestAnimationFrame cycles before each screenshot so the DOM paints; STUB OUT rAF for canvas/WebGL; BAN CSS @keyframes / setTimeout / rAF-for-timing so frames are deterministic; supersample at 2x then downsample.
- dtinth/html5-animation-video-renderer (BACKGROUND): the timeline must be seekable (seekToFrame(n)), which is why it never drops frames.
- huashu-design (alchaincyf/huashu-design, 19.5k stars, MIT since 2026-05-14): bundles MP4 25/60fps + GIF + a 5-dimension self-review in one skill.
Fallback pattern already ships (tylergermain installer gist): ffmpeg present = MP4 video slide, absent = animated GIF. Copy as an --animate flag.

### 7. IG mixed-media spec, confirmed fresh (build target for the animation path)
I verified this myself 2026-07-10 (socialpilot.co, contentdrips, growthscribe, heyorca; corroborates postnitro.ai Mar 27 2026): a video slide inside a mixed carousel is MP4, H.264, AAC audio, up to 60s, up to ~250MB, 1080p, and MUST share ONE aspect ratio with every other slide (1080x1350 works for both static and video). Up to 20 slides. Burn in captions (sound-off default). Placement play (postnitro): motion on slides 1-2 as a pattern interrupt, video mid-deck as credibility, video final as CTA. Adding audio pushes the whole carousel into the Reels feed for wider reach.

### 8. The 1080x1440 (3:4) grid-dominance format is real, confirmed fresh
I verified 2026-07-10 (inro.social, buffer.com, creatorflow, wavegen): Instagram's profile grid now previews every post at 3:4, and 1080x1440 (3:4) is a native feed upload size that shows UNCROPPED in both feed and grid, taking more real estate than 4:5. Because the first slide locks the ratio for the whole carousel, a 3:4 carousel needs every slide at 1080x1440. This is one CSS var + one shotpls dimension change to A/B against Carter's current 1080x1350.

### 9. Export mechanics to steal verbatim (consensus across marcolang, jeevanbavandla, baoyu-design, aiguide101)
- Wait for document.fonts.ready plus a small settle buffer before capture (baoyu-design), a cleaner signal than a blind 3000ms sleep (marcolang's fallback).
- Screenshot the SLIDE ELEMENT with a clip rectangle, not the whole page.
- Write slide HTML via Python Path.write_text, NEVER a shell heredoc/echo: $ and backticks corrupt base64 (same class as Carter's sed ban). Carter's Write tool already avoids this.
- Embed fonts and images as base64 data URIs, never relative paths.
- One wrap function feeds BOTH preview and export so what-you-see-is-what-you-export (open-carrusel wrapSlideHtml). baoyu-design adds a per-slide djb2 hash + dimension check so a broken render fails loudly.

### 10. Cheap zero-tooling wins
Seamless bleed / "Follow the Line": author one wide artboard, give each slide a shared background offset by -(index*1080)px so a focal line/number bleeds across the swipe seam. Poster move plus swipe mechanic in one, and impossible for image-gen to do consistently. text-wrap: balance on every hook/title kills orphan words (threads-carousel, one CSS line). A safe-zone overlay in preview (open-carrusel) so nothing critical dies at IG's crop.

### CONTRADICTIONS AND CALIBRATION NOTES
- The 420x525-author-then-scale trick (marcolang, jeevanbavandla, device_scale_factor 2.5714) vs Carter's true-1080x1350-at-2x. Not a real conflict: the 420 trick is an ergonomics shortcut for reasoning about layout at a small number; Carter's true-CSS-px approach is higher fidelity and fine, because real Chromium does not reflow the way WeasyPrint does. Keep Carter's approach; the 420 trick is optional.
- Image-only engagement baseline disagrees between blogs (1.74% postnitro vs 1.80% others). All carousel percentages (2.33% mixed, 40% completion, 2x swipe-through, 1.92% vs Reels) are vendor/marketing blogs with no linked methodology. Treat as DIRECTIONAL, never as citable fact. The consistent figure across sources is 2.33% for mixed image+video, and mixed beats image-only and video-only.
- Do NOT use HTML-to-PDF (WeasyPrint): it chokes on flexbox gap and margins, forcing HTML-table hacks and blocking CDN fonts (Karen Spinner, wonderingaboutai, Feb 20 2026, needed FIVE iterations). shotpls (real Chromium) sidesteps this entire tax. This is a validated NEGATIVE result confirming Carter's engine choice.
- Do NOT switch to a Gemini/nano-banana image-gen route (Ryan Frizelle's pipeline): non-deterministic, not per-element editable, weak typographic control, faces drift across slides. Keep his one durable idea (read brand file fresh, analyze top-performing posts before drafting) and drop his renderer.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Build the vision QA self-correction loop into make-carousel. After shotpls renders, Read each PNG back into context, run a structured critique, edit the HTML, re-render. Cap at 3 iterations. This is the highest-ROI change and closes the gap to the frontier.

2. Feed PNGs to the critique step INDIVIDUALLY with stable names (slide-01.png...), never as a combined PDF. Optionally fan out one review subagent per slide in parallel (Camron Haider pattern) for flagship decks only.

3. Frame every critique as "specific diff, not a vibe check" against poster axes: one focal point, hero-type genuinely huge vs body, under 3 reading zones, negative-space ratio, edge alignment. Never accept "looks great."

4. Adopt the poster ethos as a HARD per-slide budget: one headline moment (under ~6 words), one label, at most one supporting line, cap decoration at one structural moment per slide. Anchor to frontend-design's "spend your boldness in one place." This directly kills the 6-9-reading-zone problem.

5. Write a versioned DESIGN.md (or brand.json + 2-3 reference slide HTMLs) for the @carterperez.dev "Synthetic technical-brutalist" system, inject it into every generation, read it FRESH every run, and enforce "do not invent hex or fonts not in this file."

6. Bake in the anti-slop guardrail: frontend-design's banned defaults (Broadsheet/hairline-rules is Carter's current look) and banned fonts (Inter, Roboto, Arial, Space Grotesk), plus rohitg00's break-default-aesthetic neutralizer.

7. Add a headless animation module: seek a paused CSS/JS timeline frame by frame in headless Chrome and encode to MP4 with ffmpeg (already on the box). Start with HyperFrames' data-start/data-duration convention. Ship an --animate flag with MP4-or-GIF fallback. Implement the two-rAF-wait and rAF-stub gotchas.

8. Ship mixed carousels to the confirmed IG spec: MP4/H.264/AAC, under 60s, all slides same aspect ratio (1080x1350), burned-in captions. Put the animated slide at position 1-2 as a pattern interrupt; add audio to reach the Reels feed.

9. Add 1080x1440 (3:4) as a second render target behind a flag and A/B it against 1080x1350 for grid dominance. One CSS var + one shotpls dimension.

10. Steal the export refinements: await document.fonts.ready (not a blind sleep) before capture, clip to the slide element, one wrap function shared by preview and export, and a per-slide hash + dimension check so broken renders fail loudly.

11. Ship two free wins now: seamless-bleed background offset by -(index*1080)px for a focal element that crosses the swipe seam, and text-wrap: balance on all hooks/titles. Add a preview safe-zone overlay for IG's crop.

12. Ground the visual language in cyber vernacular as real information structure (terminals, hex, packet dumps, CVE/MITRE labels), the frontend-design "ground in the subject" principle, so our structural devices ENCODE meaning instead of decorating. Competitors ship generic startup posters; this is a free moat.

---

## OPEN QUESTIONS

1. The "Your Claude Code Carousels Suck (Here's The Fix)" video (youtube.com/watch?v=7taGazHQkMg, Jun 2 2026) is the single most on-thesis title found, but its fix technique is STILL unverified. YouTube pages return footer-only to WebFetch and the channel name never surfaced. Needs a real transcript pull (yt-dlp + the whisper service Carter already runs at localhost:5069) to confirm whether its "fix" matches our poster + vision-loop conclusion or contradicts it.
2. No cybersecurity or large-follower creator was found running a shotpls-style HTML-slide + vision-critique poster carousel loop. Directive 1 transfers proven general Claude Code UI practice to posters rather than citing a same-niche competitor. Upside: Carter is plausibly a first-mover in his niche with this exact stack.
3. Exact ffmpeg encoding flags / framerate handling at 1080x1350 specifically (vs HyperFrames' 1920x1080 default) were not shown in-source. The reframe is trivial but unverified; needs a one-off render test once the animation module is stubbed.
4. All engagement/completion percentages are vendor-blog directional, not primary Instagram data. Before betting real production time on the animated-slide play, pull one cohort of Carter's own posts to measure whether mixed-media actually lifts HIS numbers.
5. Peter Yang's skill.md/styles.md and the strongest paid write-ups (aiblewmymind, lazymillionaire) gate exact prompts behind paywalls. We have the workflow shape, not the verbatim files. Not blocking, since the frontend-design SKILL.md (read directly) gives us the same taste engine free.
6. The harness exposes a DesignSync deferred tool implying a two-way Claude-Design-to-Claude-Code handoff may be reachable from the terminal directly (vibecoder.me community blog, unconfirmed by Anthropic docs). Worth a 10-minute probe: if it works, it is a free bridge; if not, ignore, our pipeline does not need it.
