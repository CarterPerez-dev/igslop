<!-- © AngelaMos | 2026 | b2-reddit-forums.md -->

# DIVISION B: Claude Code carousel and design workflows in the wild

Research date: 2026-07-10. Recency target: Apr-Jul 2026. Older items labeled BACKGROUND.

Scope note: the brief named Reddit (r/ClaudeAI, r/ClaudeCode, r/Anthropic, r/InstagramMarketing, r/socialmedia, r/contentcreation), Hacker News, and dev.to. Direct `site:reddit.com` and forum-scoped queries mostly dead-ended (Reddit is poorly indexed by this search engine and X/Twitter refuses fetch). The signal that DID surface lives in the GitHub repos, SKILL.md files, and dev/creator blogs that these forum posts point to. Those are the concrete, verifiable techniques. Where a source is a blog rather than a raw forum thread, it is labeled. Every technique below was read from an actual fetched page, not inferred.

---

## SEARCHES RUN

1. Claude Code generate Instagram carousel HTML slides render PNG
2. reddit r/ClaudeAI carousel HTML to image workflow skill
3. Claude skill Playwright screenshot HTML slide 1080x1350 carousel base64 font
4. Hacker News Claude Code generate social media graphics HTML headless chrome 2026
5. dev.to Claude Code carousel generator skill HTML CSS export PNG 2026
6. MCP server design assets fonts images carousel Claude 2026
7. site:reddit.com Claude carousel HTML slides skill generate images  (NO RESULTS)
8. Claude animated carousel slide video Instagram HTML CSS animation render mp4 2026
9. reddit ClaudeCode skill make carousel slides screenshot puppeteer
10. r/ClaudeAI I built a skill Instagram carousel HTML render
11. Claude Code content creator workflow carousel poster style minimal one focal point 2026
12. "Claude" carousel skill reddit posted 2026 design workflow HTML PNG
13. Instagram carousel with video slides 2026 mixed photo video carousel trend engagement
14. Remotion Claude Code programmatic carousel video slides React render mp4 social
15. reddit socialmedia OR InstagramMarketing AI generate carousel HTML code developer workflow 2026  (NO RESULTS)
16. "claude code" skill screenshot deck slides "shotpls" OR "chrome --headless" render 1080

Pages fetched and read in full: marcolang/marketing-skills instagram-carousel SKILL.md; itchernetski/threads-carousel-claude-skill; Hainrixz/open-carrusel CLAUDE.md; HN item 48071940; wonderingaboutai CarouselBot-vs-Skills; jeevanbavandla/instagram-carousel-skill; aimaker LinkedIn-carousel substack; mirra.my MCP guide; neonwatty/css-animation-skill; onewave-ai HyperFrames; firecrawl best-skills; claudevideoexport reel pipeline; postnitro video-in-carousel; jimliu/baoyu-design; creatoreconomy.so /slides.

---

## FINDINGS

### 1. The exact HTML-to-PNG render recipe everyone converged on (Playwright + device_scale_factor)

This is the single most-repeated technique and it maps almost 1:1 onto Carter's shotpls pipeline. Source: marcolang/marketing-skills `instagram-carousel/SKILL.md` (GitHub, part of the marketing-skills plugin Carter already has installed). Verbatim mechanics:

- Layout viewport is SMALL: 420x525 CSS px. Export target is 1080x1350. The trick is `device_scale_factor = 1080 / 420 = 2.5714`. A 420px element becomes 1080px in output while the LAYOUT never reflows. Quote: "Keep at 420x525, scale via device factor." Warned anti-pattern: setting the viewport to 1080x1350 directly, which reflows layout and makes fonts tiny.
- Render loop: `chromium.launch()` -> `new_page(viewport={420,525}, device_scale_factor=2.5714)` -> `set_content(html, wait_until="networkidle")` -> `wait_for_timeout(3000)` for Google Fonts -> hide IG chrome elements via `page.evaluate` -> per-slide `translateX(-idx*420)` transform -> `wait_for_timeout(400)` -> `screenshot(clip={0,0,420,525})`.
- Install: `pip3 install playwright && python3 -m playwright install chromium`.

Anti-pattern table from that SKILL.md (all directly relevant to shotpls):
- Relative image paths break in all contexts. Use base64 data URIs.
- `background: url(base64)` with a 1.5MB+ inline string crashes the browser parser. Use `<img>` with `object-fit: cover` instead.
- Shell heredocs corrupt base64 (the `$` and backticks interpolate). ALWAYS write HTML via Python `Path.write_text(html, encoding="utf-8")`, never a shell heredoc. (Carter already knows this pain from the sed rule; same class of bug.)
- Extension may lie: run `file /path/image.png` to get the true MIME before choosing `image/jpeg` vs `image/png`.
- Missing font wait -> headings render in fallback fonts. Minimum `wait_for_timeout(3000)`.

### 2. Two render engines are in the wild, and they behave differently

- Engine A: headless Chromium via Playwright OR Puppeteer, screenshot to PNG. Used by marcolang instagram-carousel, jeevanbavandla/instagram-carousel-skill (Claude Code version), Hainrixz/open-carrusel, baoyu-design. This is Carter's exact class of pipeline (shotpls IS headless Chrome). Full CSS support, real fonts, `device_scale_factor` upscaling.
- Engine B: WeasyPrint HTML-to-PDF, used inside Claude.ai's own sandbox (no headless browser available there). Source: wonderingaboutai.substack.com "CarouselBot vs Claude Skills" (2026). WeasyPrint has real limitations that forced ugly workarounds: it does NOT handle CSS flexbox `gap` reliably, so the author "abandoned flexbox in favor of HTML tables" for navigation dots and bullet rows. Bullets "would smash together on one slide and space perfectly on the next" under flexbox. Takeaway for us: because shotpls is real Chromium, we get to IGNORE all the WeasyPrint tax. Flexbox and grid are safe. This is a genuine advantage of the terminal-Chrome pipeline over the Claude.ai-sandbox pipeline.

### 3. The npm @fontsource base64 font-embedding trick (allowed-domains workaround)

Source: wonderingaboutai substack + aimaker LinkedIn-carousel piece (author Wyndo, dated Jan 22 2026, BACKGROUND). Inside Claude.ai's sandbox, CDN font URLs (fonts.googleapis.com) are blocked. Fix: `npm install @fontsource/inter`, then base64-encode the woff2 files and embed them as `@font-face` data URIs. npm's registry (registry.npmjs.org) IS on Claude's allowed-domains list, so this is the sanctioned path to real fonts. Adds roughly 46KB to the HTML. For Carter this is irrelevant at render time (shotpls has no allowlist) but it IS the correct pattern for making a slide file self-contained and portable: fonts as base64 @font-face data URIs, which is exactly what he already does.

### 4. Concrete design-spec numbers other people ship (useful as calibration, NOT as a template)

From jeevanbavandla/instagram-carousel-skill (Claude Code + Claude.ai versions, GitHub) and marcolang SKILL.md. These are the OPPOSITE of poster minimalism in most cases, so they double as a "what makes carousels busy" reference:
- 6-token palette derived from ONE primary hex: BRAND_PRIMARY, BRAND_LIGHT (+~20% lightness), BRAND_DARK (-~30%), LIGHT_BG (off-white tinted), LIGHT_BORDER, DARK_BG (near-black brand tint). Rule: replace the token with the literal hex before render, never leave a variable name in output HTML.
- Standard 7-slide arc with alternating light/dark surfaces: Hero(light) / Problem(dark) / Solution(gradient) / Features(light) / Details(dark) / How-to(light) / CTA(gradient).
- Universal per-slide furniture: progress bar (3px, bottom, rounded, `rgba(0,0,0,0.08)` track on light), "1/7" counter at 11px, swipe arrow (48px wide, 24x24 SVG chevron) on every slide except the last. This is the SAME multi-zone furniture stack that makes Carter's decks feel busy. jeevanbavandla names 4 auto-selected styles: "Bold Impact" (dark navy, massive text, film grain), "Tweet Post" (minimal, ZERO effects), "Clean Editorial" (white, grid, coral accent), "Product Showcase" (warm gradient, icon cards). The "Tweet Post = zero effects" style is the closest to the poster direction Carter wants.
- LinkedIn-doc numbers (aimaker/Wyndo, BACKGROUND): body text 32px (they explicitly called 24px "unreadable"), side padding 100px to clear LinkedIn's nav arrows, background watermark 1000px centered at 8% opacity, 64px headshot footer.

### 5. open-carrusel architecture (the "self-contained slide contract" idea)

Source: Hainrixz/open-carrusel CLAUDE.md (GitHub). Aspect ratios: 1:1=1080x1080, 4:5=1080x1350 (recommended), 9:16=1080x1920, max 10 slides. The load-bearing design idea: slides store ONLY body-level HTML (no `<html>/<head>/<!DOCTYPE>`), and a single `wrapSlideHtml()` function is the "shared rendering contract between preview and export" so the browser preview and the Puppeteer export are guaranteed identical. This is a pattern worth stealing: one wrapper function that both the live preview and shotpls consume, so what you see is byte-identical to what renders. They also sandbox the preview iframe with `sandbox=""` (no JS) and forbid `<script>` in slides.

### 6. MCP-server-as-design-backend path (Mirra)

Source: mirra.my/en/blog/ai-carousel-generator-mcp-guide (2026). Mirra ships an MCP server exposing three tools Claude calls mid-conversation: `carousel_generate` (slide structure from prompt), `carousel_refine_page` (edit one slide in place), `carousel_render_images` (final composite). Reported 43-second average prompt-to-preview in Q1 2026, down from 4m12s in mid-2024, and they explicitly attribute the speedup to "removing handoffs, not a smarter model." It returns preview URLs, not raw HTML or per-slide PNGs, and outputs structured JSON per page (headline, body, layout suggestion). Relevance: this validates building our OWN MCP server that exposes `render_slide(html) -> png` and `list_fonts()` / `get_asset(name)` as tools, so the model can render-and-inspect in one loop instead of us shelling out. The "remove handoffs" insight is the real lesson.

### 7. The animation frontier: three real paths to animated slides inside a carousel

Instagram now strongly rewards mixed photo+video carousels (see Findings section 9). Three verifiable code-first paths surfaced for generating those video slides from the terminal:

- HyperFrames (heygen-com/hyperframes). Source: onewave-ai.com HyperFrames blog (2026). "Video as code": loads your HTML in headless Chrome, steps frame by frame (frame = time x fps), encodes with FFmpeg. Deterministic: same input -> same frames (versionable, CI-regenerable), because it seeks CSS keyframes rather than playing in real time. Timing lives in `data-*` attrs: `data-start`, `data-duration`, `data-track-index`. Commands: `npx skills add heygen-com/hyperframes`, `npx hyperframes init`, `npx hyperframes preview`, `npx hyperframes render`. Default 1920x1080 @ 30fps MP4, WebM export supports transparency. This is the closest match to Carter's stack: it is literally shotpls-plus-ffmpeg with a timing layer. Reframe to 1080x1350 and you have animated carousel slides from the same HTML files.

- Remotion + Claude Code Agent Skills. Sources: remotion.dev, multiple 2026 dev blogs (Medium/Dev.to/32blog), firecrawl best-skills (Remotion best-practices skill reports 117k weekly installs, the single most-installed design-adjacent skill found). "React for video": each frame is a React component, time is a variable via `useFrame()`, renders via headless Chromium -> PNG-per-frame in parallel -> FFmpeg -> MP4. Agent Skills for Claude Code released January 2026 (BACKGROUND-ish, still current). Reported case: 50 personalized demo videos from one component in 15 minutes. Supports H.264 MP4 (default), H.265, VP8/VP9 WebM (transparency), ProRes, GIF. Heavier than HyperFrames (full React/TS project) but far more programmable for data-driven variants.

- neonwatty/css-animation-skill (GitHub). A Claude Code skill that generates self-contained HTML/CSS animations (~30KB, no external assets beyond Google Fonts) with two named modes: "Feature Demo" (before/action/after) and "Carousel" (multi-screen cycling with cross-fade transitions). It does NOT ship its own video encoder (output is HTML/CSS + minimal JS), so you'd pair it with HyperFrames or shotpls-frame-capture to get MP4. Useful as the "animation authoring" half.

- baoyu-design (JimLiu/baoyu-design, GitHub). Runs Claude Design locally as an agent skill, "best with Opus 4.8." Its per-element animation syntax is worth stealing wholesale: `data-anim="fade-in|zoom-in|fly|wipe|bounce"`, `data-anim-trigger="click|with|after"`, plus `delay`, `duration`, `order`, `repeat`, `auto-reverse`, and cubic-Bezier motion paths. Its export CLI drives headless Chromium via Playwright, hides UI chrome, applies font substitutions, and waits for `document.fonts.ready` before capture (a cleaner font-ready signal than a blind 3000ms sleep). Two export modes: flat screenshot at 2x device scale, or "editable" mode that serializes the DOM to PptxGenJS with `px / 96 = inches` and `px * 0.75 = points` conversions. The `document.fonts.ready` wait is a concrete upgrade over the fixed `wait_for_timeout(3000)` in the marcolang recipe.

### 8. The visual-QA render loop (the actual 200 IQ move)

Repeated across creatoreconomy.so `/slides` (author Peter Yang, dated May 27 2026), baoyu-design, and the marcolang skill: after generating HTML, the agent SCREENSHOTS EACH SLIDE, looks at the PNG, and fixes layout issues before delivering. Peter Yang's step 5 verbatim: "take screenshots of each slide and fix layout issues." This closes the loop that Carter currently does by eyeball. The high-leverage build: give the skill a render-then-see step (shotpls -> read the PNG back into the model -> auto-correct overflow/orphans/contrast) so the deck self-corrects before he ever looks. baoyu-design also validates with a djb2 hash per slide and a dimension check to flag render failures programmatically.

### 9. Instagram strategic data that should drive the design bet (Apr-Jul 2026 sources)

Multiple 2026 marketing sources (postnitro.ai video-in-carousel; krumzi; trymypost; metricool) converge on hard numbers:
- Mixed image+video carousels: 2.33% avg engagement, vs 1.74% image-only and 1.45% video-only (postnitro figures; a second source cited 1.80% image-only). Carousels overall beat Reels (~1.92% vs ~0.50%) and single posts (1.4-1.9x more reach, 114% more total engagement).
- Only ~7% of carousels currently use mixed media. Stated as "a massive opportunity gap."
- Adding AUDIO to a carousel pushes it into the Reels feed algorithm for wider reach.
- Video-slide placement formula (postnitro): bold headline on slide 1 to build curiosity, then reward the first swipe with the video on slide 2. Alt placements: slides 3-7 after problem setup, or final-slide CTA. Up to 20 items, 60s max per video slide, 4:5 captures more screen than 1:1, MP4/H.264, 30fps constant, 3-6 Mbps @ 1080p, burned-in captions non-negotiable (sound-off default), keep ALL items the same aspect ratio (mixing ratios is "jarring" and hurts engagement).

### 10. Hacker News reality check (honest negative)

HN item 48071940 "Using Claude Code: the unreasonable effectiveness of HTML" (surfaced repeatedly) is about single-file HTML apps and human-LLM co-editing, NOT carousels or rendering. The concrete techniques there (single `index.html` no-deps prompt from user "momojo"; markdown+inline-HTML hybrids; custom DSLs) are tangential. No HN thread found that specifically covers the terminal HTML-to-image carousel pipeline. Noting this so we don't overstate HN as a source.

---

## SO WHAT FOR US

1. Our pipeline is already the best-in-class engine, not a compromise. Every serious skill in the wild is doing headless-Chrome-screenshot-to-PNG. shotpls IS that. The Claude.ai-sandbox crowd is stuck on WeasyPrint and its flexbox-gap bugs, HTML-table hacks, and CDN font blocks. We inherit NONE of that tax. Message to Carter: stop treating shotpls like a hack. It is the same primitive the best public skills use, minus their limitations.

2. Steal three concrete upgrades into the make-carousel skill immediately:
   - Adopt `device_scale_factor` thinking if not already: author at a smaller layout px and upscale, so type math stays sane. (Verify what shotpls currently does; if it authors at full 1080x1350 that is fine too since real Chrome does not reflow like WeasyPrint, but the 420-and-scale trick is a proven ergonomics win.)
   - Replace any blind sleep with a `document.fonts.ready` await before capture (from baoyu-design). Kills the fallback-font flash without a fixed 3s penalty.
   - Add a wrap-once contract function so preview HTML and shotpls-rendered HTML are byte-identical (from open-carrusel `wrapSlideHtml`).

3. Build the visual-QA self-correction loop. This is the biggest differentiator available. After shotpls renders, read the PNGs back into the model and auto-fix overflow, orphaned words, weak contrast, and busy zones BEFORE Carter sees them. Add a programmatic guard (dimension check + per-slide hash like baoyu-design) so a broken render fails loudly instead of shipping.

4. The poster direction is directly supported by what the busy skills DON'T do well. The universal furniture stack (progress bar + counter + swipe arrow + watermark + 6-token palette on every slide) IS the busyness Carter is fighting. jeevanbavandla's "Tweet Post: zero effects" style and the general poster brief mean: kill the per-slide furniture, one focal point, massive type, near-zero body. We are deliberately deleting the thing every template ships. That is the wedge to being the best.

5. Go after the animated-slide gap HARD, it is the clearest edge. Mixed image+video carousels get ~2.33% vs ~1.74%, and only ~7% of accounts do it. Best-fit build for our terminal: HyperFrames (heygen-com/hyperframes) because it is shotpls+ffmpeg with a `data-start`/`data-duration` timing layer over the SAME HTML files we already write, deterministic and versionable. Second option Remotion (React-for-video, 117k-install skill) when we want data-driven variant generation. Author animations with baoyu-design's `data-anim` syntax. Rule: keep every slide 4:5, burn in captions, put the animated slide at position 2 to reward the first swipe, add audio to get pushed into the Reels feed.

6. Consider a tiny local MCP server (Mirra pattern) exposing `render_slide(html)->png`, `render_video(html)->mp4`, `list_fonts()`, `get_asset(name)` as tools, so the model renders-inspects-corrects in ONE loop with no shell handoff. Mirra's own lesson: the speed win came from "removing handoffs, not a smarter model." That is a build we can own end to end since the whole toolchain is ours.

---

## GAPS / DEAD ENDS (honest)

- Raw Reddit threads: `site:reddit.com` and the r/socialmedia / r/InstagramMarketing scoped queries returned zero usable results. This search engine indexes Reddit poorly and X/Twitter refuses fetch. The forum SIGNAL exists but is reachable only via the GitHub repos and blogs those threads link to, which is what this file captured. A native Reddit search (old.reddit.com JSON or Pushshift-style) would likely surface first-person "I built a carousel skill" threads I could not reach here.
- No single canonical HN thread on the terminal carousel pipeline exists; the closest (48071940) is about single-file HTML apps generally.
- The two most-detailed proprietary workflows (Wyndo/Maker Labs LinkedIn generator; Ryan Frizelle's Gemini-nano-banana image-gen carousel) intentionally paywall or omit their exact code. Frizelle's is also a DIFFERENT pipeline (Gemini 3 Pro Image "nano banana" image generation at 1080x1080, not HTML render), so it is a contrast case, not a template.
- Exact frame-capture code for HyperFrames/Remotion at 1080x1350 specifically (vs their 1920x1080 default) was not shown on the fetched pages; the reframe is trivial but unverified in-source.

---

## SECOND-PASS ADDENDUM (2026-07-10, additional verified sources)

A second independent sweep confirmed everything above and added the following distinct, fetched-and-read findings. Additional queries run: "Claude Code animated carousel slide video Instagram HTML canvas ffmpeg export 2026"; "MCP server design assets fonts icons unsplash Claude Code carousel"; "reddit ClaudeAI skills carousel poster design one focal point big type minimal"; "Claude Code carousel workflow base64 embed fonts inline assets standalone HTML slide render"; and Reddit-scoped rephrasings (all Reddit-scoped queries still dead-ended, gap unchanged).

A. The 880-combination style-token system (itchernetski/threads-carousel-claude-skill, GitHub, fetched in full). Best design-system idea in the sweep. FOUR independent axes: Fonts(5: Unbounded/Playfair/Inter/JetBrains Mono/Oswald) x Surfaces(8: Dark/White/Light/Paper/Gradient/Pastel/Neon/Ember) x Accents(11: Yellow/Red/Teal/Coral/Orange/Violet/Lime/Blue/Fuchsia/Pink/Amber) x Purpose(2) = 880 valid combos. Poster-scale type numbers to steal: Hook 88-170px weight 800; Big-number slide 320-560px weight 900; Stats value 140-170px weight 900; Title 44px uppercase (carousel) or 72px sentence case (presentation). "Adaptive typography" scales size to content length; `text-wrap: balance` on hooks/titles. 8 background decorations, ONE per slide (organic blobs, dot grid, diagonal lines, ruled paper, SVG noise, big-number watermark, radial glow, none). Highlighted-keyword pattern: accent color, optional "italic-box" = Playfair italic on a colored rectangle. Caveat: this skill renders via the weaker `html-to-image` lib + jsPDF (Next.js 15 + bun on port 3333), NOT real Chromium, so steal the SYSTEM, keep shotpls as the engine.

B. Deterministic time-freeze = the canonical animated-slide technique, now double-confirmed. tomaspavlin, "I Built a Tool to Export Claude Design Animations as MP4" (dev.to, published 2026-04-24, fetched). Verbatim: "Instead of letting time flow naturally, the backend freezes it and advances it manually, frame by frame." For React it calls the internal time hook with exact timestamps (0ms, 16.6ms, 33.3ms... for 60fps). Critical detail not in the HyperFrames writeup above: WAIT TWO `requestAnimationFrame` cycles before each screenshot so the DOM actually paints; for canvas/WebGL, STUB OUT `requestAnimationFrame` entirely. Stack = Playwright headless Chromium, PNGs stream straight into ffmpeg for H.264. This is the same primitive as HyperFrames/Remotion (Findings 7) but the two-rAF-wait and rAF-stub are the concrete gotchas to implement.

C. dawoodtrumboo/claude-video-export (GitHub, fetched) = productized version of B. Animations must be a "pure function of time" via a `useTime()` hook; BANS CSS @keyframes, setTimeout/setInterval, and rAF-for-timing (they break determinism). Renders at 2x supersample then downsamples for clean anti-aliasing. Bundled ffmpeg. CLI: `node cli.mjs "/path/to/My Project" --res 4k --fps 60 --out trailer.mp4`, plus `--batch`. Exposes `window.__videoMeta` and `window.__seek(2.5)` to drive time; auto-detects and muxes voiceover files. Node 18+, `npx playwright install chromium`. For our carousel video slides: render 1080x1350 / 30fps, short clips.

D. Graceful animated-slide fallback pattern is already shipping. tylergermain Instagram Skills installer gist (fetched): checks for ffmpeg and warns that if absent, animated slides "fall back to GIF." Copy this exactly as an `--animate` flag: ffmpeg present = MP4 video slide, absent = animated GIF. Also installs Playwright chromium, requires Python 3.10+.

E. Redesign quantifies headless-Chrome-per-slide throughput (scriptbyai, fetched). Claude drives a 40-tool MCP server that "exposes the canvas as structured data"; first export downloads headless Chrome to `~/.redesign/chromium/` (30-60s one-time, ~250MB), then ~3 seconds per slide. Fonts discovered via `media_list_fonts`, applied by family (ttf/otf/woff/woff2 up to 5MB). MIT, `npx @nodewave-io/redesign`, Node 20+. Corroborates the Mirra MCP-as-backend path (Finding 6) and sets a throughput expectation (~3s/slide is normal).

F. Two free asset MCP servers worth wiring (search-confirmed). Icons8 MCP (github.com/icons8/icons8-mcp): 368,865+ icons across 116 styles; free tier streams high-res PNG (base64-inlinable), API key unlocks SVG. Unsplash MCP for Claude Code (github.com/violent-madman/unsplash-mcp and hellokaton's server): real stock photography by prompt. These plug the two things pure HTML cannot invent, keeping every asset inline and license-clean at render time. Directory: mcpservers.org/category/design (48 design MCP servers).

G. HTML infographics are already pulling six-figure reach (Charlie Hills, "Design in Claude Code not Canva or Figma", fetched). His "54 Claude Code resources" graphic = 171,915 impressions; "Claude Code has 93 commands" = 123,024. Targets 1080x1350, HTML/CSS output, "a file you own, every pixel editable." Architecture worth adopting: keep brand styling in ONE file, layout in another, and the WORDS in a third, so we re-theme without touching copy and re-copy without touching design (shotpls: tokens.scss / layout.html / content.json).

H. The "Follow the Line" / seamless-bleed format is a buildable poster move AND a swipe mechanic. 2026 trend reports (slidycreator, scrolo, krumzi) converge on: 15-20 words max per slide + one strong visual anchor; a line/arrow/image that BLEEDS across slide boundaries reportedly lifts completion (percentages are vendor-blog, uncited, treat as directional). In HTML this is trivial and impossible for AI-image generation to do consistently: author one wide artboard, slice into slide-width frames via a shared background positioned by negative per-slide offsets so a continuous line/number crosses the seams. Build this as a named shotpls format.

I. The "defection" argument for Family-A over image-gen, cleanest statement (aimaker Substack, fetched): author tried PPTX (too plain), then Nano Banana Pro (beautiful but "inconsistent element placement across slides; couldn't reliably render the author's face in brand footers"), then chose HTML/CSS because "unlike image generation, code is perfectly reproducible." Keep as the canonical justification for the shotpls approach.

Additional confirming sources (not previously listed): github.com/marcolang/marketing-skills/blob/HEAD/instagram-carousel/SKILL.md; github.com/ComposioHQ/awesome-claude-skills/blob/master/canvas-design/SKILL.md (poster ethos: "Text as rare, powerful gesture, never paragraphs"; "font should be thin"; "vast negative space"); news.ycombinator.com/item?id=48071940; github.com/Hainrixz/open-carrusel/blob/main/CLAUDE.md.
