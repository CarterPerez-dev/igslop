<!-- © AngelaMos | 2026 | MASTER-BRIEF.md -->

# OPERATION CAROUSEL MAXX: MASTER BRIEF

The single source of truth for rebuilding the @carterperez.dev / @certsgamified Instagram carousel system from scratch. Synthesized 2026-07-10 by the Chief Intelligence Officer from six division reports (A instagram-meta, B claude-workflows, C reference-decks, D asset-arsenal, E motion-lab, F system-design) plus the publish-mechanism gapfill, with a head-level verification pass on the load-bearing facts.

Mission in one line: the current decks are competent but BUSY. Every slide stacks 6 to 9 equal reading zones (hud row, kicker, multi-line headline, rule, paragraph, tag row, stat block, pager, button) and reads like a designed newspaper. The target is a POSTER: one focal point, two type sizes, near-zero body copy, one deliberate motion moment, and a self-improving pipeline that gets better every week. Stated goal: "we will have the best carousels on Instagram, and that is a fact."

SOURCE-HONESTY RULE (applies to the whole brief). Almost nothing here is a Meta engineering doc. The genuinely primary, dateable facts are: Mosseri's signal statements, the native 20-slide expansion, the 3:4 grid shift, the June 2026 grid reorder, the June 18 2026 per-slide caption global rollout, the API 10-item cap, the Chromium 147 beginFrame removal, and the frontend-design skill rewrite. Every engagement decimal (completion rate, dwell time, 3-5x sends, 2.33% mixed-media) is aggregator paraphrase of a small handful of studies (Buffer, Socialinsider, Metricool) and is DIRECTIONAL. Confidence is flagged inline. No handle, URL, or number in this brief was invented; each traces to a division scout's fetched page or a head-level verification.

---

## 1. STATE OF THE CAROUSEL META (mid-2026)

### What wins

**Posters beat newspapers, and it is mechanical, not taste.** All four Division A scouts, all four Division C scouts, and Anthropic's own first-party design guidance land here independently. The 2026 ranker rewards completion rate, dwell time, and sends-per-reach. A 6-to-9-zone slide raises per-slide read cost, slows the swipe, and reads to the ranker as a drop-off (Division A finding 1; Mosseri via socialmediatoday.com/news/instagram-chief-post-share-rates-key-driver-reach/716540).

**Carousels are the top-performing feed format.** Head-verified at source (metricool.com/press-release-instagram-study-2026, fetched 2026-07-10): the Metricool 2026 corpus is 24,364,803 posts across 375,118 accounts, Jan-Feb 2025 to Jan-Feb 2026. Carousels produce "nine times more saves than single-image posts" and outperform single images "across every major metric." Single-image reach is down 21.96% YoY, interactions down 25.41%, engagement down 45.98%. Ranking is consistent across studies with different denominators: Buffer (52M+ posts, by REACH) carousels 6.90% > images 4.44% > Reels 3.31%; Socialinsider (35M posts, by FOLLOWERS) carousels 0.55% > Reels 0.52% > images 0.37% (Division A minor-spread note, re-confirmed by head search 2026-07-10 against socialinsider.io/social-media-benchmarks/instagram).

**Text is a triple SEO surface and per-slide captions are LIVE.** HEAD-VERIFIED 2026-07-10 (fresh search): per-slide captions rolled out globally starting the week of June 18 2026, reaching all users by ~June 27, up to 20 captions per carousel (Engadget engadget.com/2197622, Dataconomy dataconomy.com/2026/06/19, TechBriefly techbriefly.com/2026/06/19, Ubergizmo, pc-tablet, finallyoffline.com, russh.com). Instagram confirms per-slide keywords feed SEARCH discovery. Combined with on-slide overlay text (indexed like a caption) and per-image alt text (~100 chars), a carousel now has three keyword surfaces competitors are not yet exploiting.

**Mixed image+video carousels are the biggest untapped edge.** ~2.33% engagement vs ~1.80% image-only, and only ~7% of carousels use the mix. HEAD-VERIFIED 2026-07-10: the 2.33 vs 1.80 figure recurs across Contentdrips, creatorflow.so, postnitro.ai, and was re-surfaced in fresh search. ADJUDICATED CAVEAT (Division A head note): Metricool's own press release does NOT publish the mixed-media split, so 2.33 traces only through Contentdrips/postnitro, not the primary release. The 24.36M corpus is real; the mixed-media decimal is a downstream single-blog figure. Direction (mixed beats image-only, mixing is still rare) is firm; the decimal is directional.

**Music borrows Reels-feed reach (strong upside, not confirmed by Meta).** ADJUDICATED (Division A Contradiction 1, resolved at head level): an audio-bearing carousel can ALSO surface in the Reels FEED, attributed to a Mosseri / Instagram-Creators post (Oct 2024) verbatim: "Photos and carousels with music are now eligible to appear in the reels tab" (jennstrends.com, fetched 2026-07-10), corroborated by Buffer 2026 and Ned Potter (ned-potter.com, +201% YoY on his own numbers). The lone 2026 dissent (Storyboard18) denies a DIFFERENT claim (format-conversion), not Reels-tab eligibility. Both can be true. Treat as strong upside; verify in Insights; do not build a strategy that depends on it. CRITICAL CONSTRAINT (gapfill): whole-swipe music is native-mobile-only and cannot be added via API.

**Originality is now a hard gate.** April 2026 Mosseri (to PetaPixel, cited widely): accounts posting mostly others' content "are no longer going to be recommendable." Reported 60-80% reach drops for aggregators. Our decks are original by construction, which is exactly what 2026 rewards (Division A finding 12).

### What died

- **The busy newspaper slide.** Named a failure state by three independent bodies: Vignelli ("bad layouts have no space left for breathing... a cacophony of type-sizes"), Smashing ("three hierarchy levels is all most people can discern"), and Krebs' 1,590-page slop study. Our current slide stacks 4-5 of Krebs' 16 mechanical AI tells at once (Division C findings 2, 3).
- **Our own "Synthetic" look is a named AI tell.** Anthropic's rewritten frontend-design skill warns against three AI-default clusters; two of them together describe our current decks: "(2) a near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns" (Division F finding 2, head-verified verbatim from the raw SKILL.md).
- **Geometric sans as display type.** Poppins/Montserrat read "budget template" in 2026, Proxima Nova reads dated (Typewolf 2026 usage data via Division C finding 9).
- **Purple/indigo gradients (#6366F1 to #8B5CF6), gradient text, gradient-on-numbers.** "The single loudest AI tell" (Division C finding 13).
- **Colored 3-4px side-border card stripes, 3-card icon grids, badge-above-headline, all-caps label rows as chrome, numbered pagers.** Independently ranked the #1 mechanical tell by two sources (Division C finding 3). Every one of these is in our current deck.
- **Corporate Memphis bendy-limb people, stock 3D blobs, glassmorphism, bento grids.** Confirmed dead (Division C finding 13). For a CYBER brand specifically: neon/chrome/glowing-orb "machine logic" imagery is itself the cyber cliche, so avoid it (aigoodies.beehiiv.com via Division C).
- **Content aggregation / reposting.** Excluded from recommendations (Division A finding 12).

### Contested / directional (do not treat as gospel)

- Slide count: sources span 5-8 to 8-12. Synthesized default 7-9, hard floor 5, exceed 10 only for a genuinely serialized numbered list (Division A finding 8, Division E finding 9). Engagement dips after slide 3, recovers slide 8+.
- 3:4 (1080x1440) vs 4:5 (1080x1350): Division B and one Division A thread promote testing 3:4 for grid dominance; Division C, Division E, and the mixed-media ratio-lock rule keep 4:5 as the entrenched default. ADJUDICATION below in section 7.
- All absolute engagement percentages are vendor-blog tier. The RANKINGS are firm (carousel > reel > image; mixed > image-only; sends >> saves >> likes for reach). The decimals are not.

---

## 2. THE WORKFLOW TRICKS WORTH STEALING (ranked Claude Code techniques)

Ranked by leverage. Each entry states exactly how it works and its source. Divisions B and F converge hard here.

### 1. The vision QA self-correction loop (the #1 lever, Anthropic-official)

Render the slide PNG, feed it BACK into the model, critique against a structured rubric, edit the HTML, re-render, loop. HOW: shotpls already produces the PNG; we are missing only the read-back-and-fix leg. Cap at 3 iterations (reported 2-3x quality lift, ~8 min to 80-90%). Sources: Anthropic best-practices (code.claude.com/docs/en/best-practices) states the paste-screenshot-and-compare pattern verbatim and names our failure mode ("the trust-then-verify gap... if you can't verify it, don't ship it"); Peter Yang /slides step 5 (x.com/petergyang/status/2059642246614647259); ktundwal/presentation-skills; Tal Rotbart (Medium 2026-02-22). Division B finding 1, Division F finding 8.

### 2. Feed slide PNGs to the model INDIVIDUALLY, never as a combined PDF

HOW: name PNGs stably (slide-01.png ... slide-08.png) and critique slide-by-slide. A multi-page PDF HIDES visual defects from Claude's vision (Camron Haider, github.com/camronh/slidev-agent). For flagship decks only, fan out one review subagent per slide in parallel with fresh context (Division B findings 2, 3).

### 3. The critique must be a "specific diff, not a vibe check"

HOW: force a structured critique so the model cannot say "looks great." Load-bearing phrase (Jason Zhou prompt #7, superdesign.dev 2026-06-21): "Give me a specific diff, not a vibe check: list every place the spacing, hierarchy, type size, or alignment differs." Our poster axes: is there ONE focal point, is the hero numeric genuinely huge vs body, are we under a 2-3 reading-zone ceiling, negative-space ratio, edge alignment (Division B finding 3).

### 4. Rewrite the skill from template-fill to two-pass brainstorm-then-critique

HOW: PASS 1 brainstorm a compact per-deck token system (4-6 hex, 2-3 type roles, one-sentence layout + ASCII wireframe, one signature device) from the brief; PASS 2 critique the plan against "would I produce this for any deck," revise, log what changed, THEN build. This is Anthropic's own move: the frontend-design skill was rewritten (commit 2235be7) to DELETE its 26-line ban-list and ADD this process. HEAD-VERIFIED install trajectory: 277k in March 2026 (per the older teardown), climbing past 564k/646k by mid-2026 (fresh search 2026-07-10, medium.com design-bootcamp + skills.sh). Both division figures were right at different dates. This is the single most-installed design skill in existence, so it is a proven pattern, not a bet (Division F finding 1). Note: some mirrors still serve the OLD ban-list version; the CURRENT github.com/anthropics/skills SKILL.md is the two-pass rewrite.

### 5. Codify the brand as a file read FRESH every run

HOW: a versioned DESIGN.md (or brand.json + 2-3 reference slide HTMLs) injected into every generation, read fresh, never cached, with "do not introduce new colors or fonts without updating this file." Three schools: markdown (VoltAgent/awesome-claude-design 9-section format; rohitg00/awesome-claude-design adds a break-default-aesthetic neutralizer); HTML-reference (yzfly/awesome-design-html, "HTML is alive," fits us because our deliverable IS HTML); injection (open-carrusel injects brand.json every request). "The brand file is the whole ballgame" (Ryan Frizelle). Division B finding 5.

### 6. A real variation layer, because prose alone does not stop self-cloning

HOW: two stacked mechanisms, both pure-prompting (no API temperature needed). (a) Combinatorial seed: small named lists rolled per deck from a --seed flag or slug-hash (6 palettes x 5 layouts x 5 type pairs x 4 signature devices = 600 starting configs). (b) Verbalized Sampling (arXiv 2510.01171): ask the model to "Generate k responses with their probabilities" (k=5-20), reported 1.6-2.1x diversity gain. Anthropic's own skill clones itself at scale ("recognizable signature, monotony at scale"), which is why prose is not enough (Division F finding 3). Numbers are the paper authors' claims, not independently reproduced.

### 7. Per-STEP constraint types, not one freedom level for the whole skill

HOW (dev.to/akari_iku): assign a constraint TYPE per step. Guardrail (LOW) for brand rules (1080x1350 canvas, no emojis, no em dashes, "certification" spelled out, CTA grammar); Criteria (MEDIUM) for copy word-tier and the one-focal-point bar; HIGH freedom for art direction / signature move; loose Template for the slide scaffold. "Loose where you want divergence, tight where you need convergence" (Division F finding 4).

### 8. Write every rule as rule + REASON, and pre-answer the excuse

HOW: state the rule, then the reason, then the rebuttal to the likely excuse next to it. The reasoning becomes the rubric for cases the skill did not spell out (generativeprogrammer 9-principles, via Division F finding 5).

### 9. Export refinements to steal verbatim

HOW: await document.fonts.ready plus a settle buffer before capture (VERIFIED already done in shotpls, Division D finding 11); clip the screenshot to the slide ELEMENT not the whole page; one wrap function shared by preview and export (open-carrusel); a per-slide djb2 hash + dimension check so a broken render fails loudly (baoyu-design); write slide HTML via Python Path.write_text, NEVER a shell heredoc/echo (same corruption class as Carter's sed ban). Division B finding 9.

### 10. Free zero-tooling wins

HOW: seamless bleed / "Follow the Line" (each slide's shared background offset by -(index*1080)px so a focal line/number bleeds across the swipe seam); text-wrap: balance on every hook/title to kill orphan words; a safe-zone overlay in preview (Division B finding 10).

### Rejected techniques (validated NEGATIVE results, keep Carter's current choices)

- Do NOT switch to HTML-to-PDF (WeasyPrint): chokes on flexbox gap/margins, needed five iterations (Karen Spinner, Feb 2026). shotpls (real Chromium) sidesteps the whole tax. Confirms the engine choice (Division B calibration).
- Do NOT switch to a Gemini/nano-banana image-gen renderer: non-deterministic, not per-element editable, faces drift across slides. Keep the one durable idea (read brand file fresh, analyze top posts first) and drop the renderer (Division B).
- The 420x525-author-then-scale trick is optional ergonomics, not a real conflict with Carter's true-1080x1350-at-2x approach. Keep Carter's (Division B calibration).

---

## 3. REFERENCE BANK (named accounts and post URLs worth studying)

CAVEAT applied everywhere: no live Instagram profile/post DOM is fetchable (WebFetch returns the SPA shell). All follower counts are third-party search snapshots. No standout carousel POST could be measured slide-by-slide for exact type sizes; a manual in-app pull into a vision pass is the only way to get measured anatomy (Division C open question 1, Division E open question 1).

### The direct model to copy

- **@visualizevalue** (Jack Butcher, ~482K, ~1,099 posts). THE model. Strict black-on-white (or inverted), one concept per frame reduced to a diagram, near-zero words, a FIXED toolkit of ~12 reusable visual devices (scale, comparison, metaphor, flow, stacking, continuum, Venn, hierarchy, Cartesian plot, loops, spectra). Steal: recognizability comes from the LOCKED SYSTEM, not per-post novelty. This is the exact opposite of stacking 6-9 zones. (designdisciplin.com/p/how-to-design-like-vv, visualizevalue.com/about, instagram.com/visualizevalue; Division C finding 1.)

### Card discipline to steal (the real design competitors are CODING accounts, not cyber)

- **@coding_unicorn** (Julia, ~97K). Called "best coding account on IG," dark aesthetic, clean carousel cards. Steal: card discipline, one idea per card. (Division A finding 10.)
- **@samanthaming** (~clean graphic cards). Steal: clean, legible code-card layout. (Division A finding 10.)
- **@coder.journey**. Steal: illustration/storytelling structure across a deck. (Division A finding 10.)

### Motion-craft ceilings

- **@studiofeixen** (Studio Feixen, ~214K). Seamless looping moving posters, one dominant type object per frame, flat bold color, single element / single motion / perfect loop. Steal: the loop QUALITY (t=0 == t=duration, one element, one motion). (itsnicethat.com/articles/studio-feixen-posters-graphic-design-230118; Division C findings 7, 8; Division E.)
- **@em0n33y** (Emonee LaRussa, ~800K). Motion-craft ceiling, seamless loops. Steal: motion polish reference only. (Division C finding 7.)

### Motion trend primary sources (named, confirmed)

- **@yoursocialteam** (Manu Muraro, yoursocial.team blog). The "Hold and Scroll" flipbook trend, CONFIRMED PRIMARY SOURCE. N static slides with a slight incremental change per slide; the fast swipe animates them like a flipbook. Steal: this is the cheapest motion win, shippable on current shotpls with zero new tooling. (Division E finding 7.)
- **@lindseygamble_** (analyst). Documented the carousel-music unlock. Reference for the music-to-Reels mechanic. (Division E finding 8.)
- **@panoramaker.app** (PANO tool) and Disney's Ice Age panoramic seamless carousel: seamless-panorama references. (Division E open question 1.)

### Do NOT copy (high volume, low design)

- **@thecybersecurityhub** (~421K) and **@thecyberexpress** (~4.9K): cyber news-aggregator look, busy and low-design. (Division A finding 10.)
- **@cybersecuritygirl** (Caitlin Sarian, ~2M): the largest cyber account, but video-forward and runs busy conventional carousels. Not a carousel-design model. (Division A finding 10, Division C finding 7.)

### The competitive read (why the lane is open)

Direct-topic cyber-career creators barely ship polished carousels and are small on IG: @joshmadakor 19K, @nahamsec 42K, @sisinerd 32K, @grantcollins ~623. Carter's @certsgamified (~54K) already outranks nearly all of them. The design leaders are in CODING, not cyber. Steal the coding-account card discipline, apply it to cyber/cert, and add the motion the coding accounts are NOT doing. (Division A finding 10.)

### Confirmed dead end (this IS the open lane)

NO named creator runs a documented video-slide-inside-a-carousel workflow. Confirmed across all six scouts plus head verification: even 2Slides treats carousel and video as either/or outputs. We would be first-of-kind with a real systematized one. Feixen/LaRussa are motion-craft refs only, not video-slide-carousel practitioners. (Division C finding 7, Division E open question 1.)

---

## 4. ASSET ARSENAL (every fetchable source and generator worth wiring in)

Every URL, count, and license below traces to a Division D scout's curl/WebFetch. The entire arsenal is buildable with zero design GUI and near-zero recurring cost.

### Icons: Iconify (the single highest-leverage source)

- Fetch pattern: `https://api.iconify.design/{prefix}/{name}.svg` returns raw SVG, NO key, NO auth, NO User-Agent. Live-measured catalog: 230 sets / 314,397 icons. Params: `color=%23HEX` (URL-encode the #, monotone only), `width`, `height`, `rotate=90deg`, `flip=horizontal`.
- Discovery: `/search?query=shield` returns prefix:name pairs; `/collection?prefix=X&info=true` returns per-set SPDX license; `.json?icons=a,b` batch returns raw `body` markup with currentColor preserved (ideal for local caching).
- Build ONE `fetch_icon(prefix, name, color, w, h)` helper, not ten. (Division D findings 1, 2.)

### License guard (the real gate for a no-credit-line carousel)

- Read `license.spdx` before any use. Whitelist {MIT, ISC, Apache-2.0, CC0-1.0}.
- No-attribution safe: tabler MIT (6,146), lucide ISC (1,745), phosphor ph MIT (~9,072), hugeicons MIT (5,065), mdi Apache-2.0 (7,447), material-symbols Apache-2.0 (15,457), simple-icons CC0 (~3,447).
- ATTRIBUTION REQUIRED (reject for no-credit slides): solar CC-BY-4.0 (7,401), streamline CC-BY-4.0 (3,000). (Division D finding 2.)

### Cert-vendor logos: LEGALLY OFF-LIMITS, and the legal-safe path IS the design-goal path

- CompTIA, Cisco, AWS, ISC2, EC-Council license logos only to certified individuals/partners, unaltered, never combined, never animated. AWS is most explicit: plain text only. A third-party marketing carousel is the restricted use. The animated-slide ambition directly collides with the "do not animate" clauses.
- Posture: reference the certification by NAME in big type (nominative use of "Security+" is defensible; the logo is not) plus a generic MIT shield/lock/badge from Lucide/Tabler/Phosphor. This reinforces the poster aesthetic AND satisfies Carter's "never abbreviate certification" rule: full cert name in type, one clean generic glyph, no vendor-logo clutter. Animate OUR icons, never their marks. (Division D finding 3; not legal counsel, defensible not guaranteed.)

### Textures: all generatable inline, shotpls-native, zero assets

- feTurbulence is the grain workhorse (`type=fractalNoise` for paper, `turbulence` for ink; `baseFrequency` sets grain size; force crisp with `filter: contrast(170%) brightness(1000%)`).
- Pure-CSS halftone in 3 declarations (radial-gradient tiled + linear map + `background-blend-mode: multiply` + `filter: contrast(16)`); swap the map for a base64 grayscale photo as `mask-image` to print a real photo as dots.
- Mesh gradients = 4-6 layered `radial-gradient(at x% y%, hsla, transparent)` over a base color (replaces flat brand backgrounds). Riso/duotone via feComponentTransfer + grain + 2-6px ink offset.
- Suite: fffuel.co (~30 tools) outputs copy-paste SVG/CSS for every primitive. RENDER RULE: generate feTurbulence at a small viewBox (200-250px) and tile via CSS, never native 2160x2700, or shotpls crawls.
- Build a `textures.css` library of 10-15 named recipes (grain-fine, grain-coarse, paper-rough, halftone-photo, halftone-flat, mesh-brand, riso-duotone, contour-faint, dot-grid, blueprint-grid), each driven by CSS custom properties. (Division D finding 4.)

### Fonts: a uv pipeline for sub-2KB inline display fonts

- THE TRAP: gwfh.mranftl.com silently serves STATIC weights for variable fonts (spoofs Firefox 39). NEVER use it for the variable path.
- Fetch pattern: css2 endpoint with a modern Chrome UA (`fonts.googleapis.com/css2?family=X:wght@100..900`, curl the returned woff2) OR the Developer API with `capability=VF&capability=WOFF2`.
- Pipeline: `varLib.instancer` (drop undriven axes) -> `pyftsubset --flavor=woff2 --no-hinting --desubroutinize --text="..."` (or glyphhanger against the finished slide HTML) -> base64 into `@font-face`. Embed woff2 (already Brotli-compressed), NEVER ttf (shotpls loads from disk with no transport compression, so on-disk = raw bytes * 1.33).
- Expressive OFL display targets with real axes: Fraunces (wght+opsz+SOFT+WONK), Big Shoulders (opsz condensed monoliths), Bricolage (wght+wdth+opsz), Hubot Sans (wght+wdth+slnt technical), Playfair Display (true weight axis added Jan 2026). Utility layer: Geist, Space Grotesk (wght-only).
- CSS GOTCHA: `font-variation-settings` does NOT cascade; re-declare every axis in every rule via CSS custom properties. (Division D findings 5, 6.)

### Generation MCPs (split by JOB, not by vendor)

- Vector shapes -> **Recraft MCP** (`npx -y @recraft-ai/mcp-recraft-server@latest`, v1.6.5, reaches both V3 and V4 models; V4 controls style via prompt). The ONLY generator whose native output is VECTOR SVG (inlines crisp at 2160x2700, no raster bloat). $0.04 raster / $0.08 vector / $0.01 vectorize.
- Text baked into art -> **Nano Banana Pro / Ideogram v3** (~0.97 OCR; beat FLUX/SD which smear type). shinpr/mcp-image (`npx mcp-image`) wraps them.
- Animated video slide -> **Higgsfield MCP** (`https://mcp.higgsfield.ai/mcp`, no API keys, native 4:5 and 9:16, up to 15s/4K).
- Color/type/icon backbone -> **Google Design MCP** (`https://design.googleapis.com/mcp`, NO key, NO OAuth, NO documented quota): generate_color_scheme + Material icon search + Google Font search in one install.
- Palette theft + contrast audit -> **coolors-mcp** (`npx -y @trishchuk/coolors-mcp`): extract_image_colors + HCT + APCA/WCAG + colorblind sim (steal a competitor palette, make it legible).
- Real vendor logos (Wireshark, Burp, Nmap) -> **theSVG MCP** (`@thesvg/mcp-server`, 6,400+ brand SVGs). Iconify is weak on tool/vendor marks; trademark caveat from finding 3 still applies (nominative, unaltered). (Division D findings 6, 7, 8.)

### Photos and people (fetch-ahead bank; API never touches render)

- Default **Pexels**: raw-key `Authorization: KEY` header, 200 req/hr + 20,000/mo, `orientation=portrait` gives a pre-cropped tall `src.portrait` for 1080x1350, free VIDEO for the animation path, no per-display attribution demand.
- Reserve **Unsplash** for hero shots (fire a GET to `photo.links.download_location` per pick, stricter per-display credit). Credit the photographer in the IG caption either way.
- **DiceBear** (`https://api.dicebear.com/{version}/{style}/svg?seed=X`, deterministic by seed) is the only headless people/cover generator; art is CC0 (Pablo Stanley) but the HOSTED endpoint is positioned non-commercial, so SELF-HOST it (pnpm). unDraw/Humaaans/Open Peeps: manual download-and-cache only, no automated fetcher. (Division D findings 9, 10.)

### Version-pin for reproducible base64-embedded renders

simple-icons@16, lucide-static@1.24.0, @tabler/icons@3.x, @phosphor-icons/core@2.x. Snapshot Iconify SVG bodies into the repo on first fetch. Cloudflare UA gotchas: `cdn.simpleicons.org` and `svgl.app` 403 a bare curl, 200 with a full Mozilla/5.0 UA (or route simple-icons through jsDelivr). Phosphor non-regular weights repeat the weight in the filename. (Division D findings 11, 12.)

---

## 5. MOTION PIPELINE (the recommended HTML-to-video approach + motion vocabulary)

### The strategic frame (adjudicated, load-bearing)

STATIC wins SAVES, video wins WATCH TIME, and this is a genuine trade-off, not a free win (Division E finding 4). Educational carousels get 2-5x the save rate of single images, and 2026 made SAVES the single most heavily weighted signal. Carter's niche is educational cyber; saves are the KPI. THEREFORE the correct deck is NOT all-video: it is a mostly-static poster deck with 1 to 2 motion moments at slides 3-5, which also happens to be the ONLY motion approach that respects poster-not-newspaper. This is the whole-operation reconciliation between the "add motion" and "go minimal" mandates.

### The recommended render approach

Animated slides are a SMALL extension of shotpls, not a new system (all four Division E scouts agree). shotpls already renders one HTML to one PNG deterministically; an animated slide is the same thing looped over N frames with the animation seeked between shots, then ffmpeg-assembled.

- CORRECT METHOD: seek-and-capture. NEVER screen recording (Page.screencast / puppeteer-screen-recorder), which drops frames and is non-deterministic.
- BEST MECHANISM (portability): Web Animations API seek. `document.getAnimations().forEach(a => { a.currentTime = t; a.pause(); })`, then screenshot. Covers every CSS @keyframes and WAAPI animation. NO special Chrome flags, NO CDP. (Division E finding 2.)
- CONFIRMED LANDMINE: Chromium 147+ REMOVED `HeadlessExperimental.beginFrame` from system Chrome (verified across NousResearch hermes-agent, hyperframes issue #294). It survives only in a pinned chrome-headless-shell. So EITHER pin chrome-headless-shell OR avoid beginFrame entirely via WAAPI seek. WAAPI seek sidesteps the whole class of breakage. (Division E finding 3.)
- HARD ENGINEERING RULE (the most load-bearing one): enforce a CSS @keyframes / WAAPI-only motion contract. FORBID raw requestAnimationFrame / setInterval in slides. Then WAAPI seek alone covers everything, no CDP surface, immune to the Chromium 147 removal. (Division E finding 2, directive 2.)

### shotpls status (VERIFIED against source, Division D finding 11)

shotpls already `await document.fonts.ready`, waits on image decode, double-rAF before capture with captureBeyondViewport. BUT shotpls is PNG-only, no video path. So animation needs a SIBLING renderer ("shotpls-motion"), not a shotpls change.

### Turnkey option (if not the ~60-line in-house loop)

HyperFrames (HeyGen, github.com/heygen-com/hyperframes, Apache 2.0, ~34k stars, v0.7.51 dated 2026-07-11, extremely fresh, Node 22+). Plain index.html substrate, ships h264/yuv420p/crf-23 presets, applyFaststart, GPU detection, auto screenshot-fallback when beginFrame is absent. Reject Remotion (React, wrong substrate), Lottie/Rive (wrong lanes), timecut (stale since 2022, weak on pure-CSS), Helios (weaker ELv2 fallback). (Division E finding 12.)

### The Instagram export contract (reconciled across E1/E2/E3)

- Container MP4. Video codec H.264 High profile. NEVER H.265/HEVC (glitches on IG upload). Audio AAC 48kHz even if silent (safer than 44.1kHz per the flagged contradiction).
- 1080x1350, 4:5, zero crop. First slide LOCKS the aspect ratio for every subsequent slide, so lead 4:5 and keep every asset 4:5.
- 30fps constant (CFR). 60fps gets compressed softer by IG.
- `-pix_fmt yuv420p` MANDATORY (without it IG can refuse or color-shift). `-movflags +faststart`. crf 18-20 for flat graphics.
- Reference command: `ffmpeg -framerate 30 -i frame_%06d.png -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart out.mp4`.
- Upload HIGH source bitrate (8-12 Mb/s VBR) and let IG down-convert. 60s / 250MB (or 4GB total, flagged contradiction) hard ceilings per clip; keep clips 5-10s. (Division E finding 14.)

### Publish-mechanism reality (gapfill, LOAD-BEARING)

- Mixed image+video carousel (<=10 items) = AUTO-PUBLISHABLE via Graph API. This is the sanctioned way to ship animated slides.
- 20-slide carousel via API = NO, native mobile only. Design the auto-publisher around a HARD 10-item ceiling.
- Whole-swipe Instagram-library music = NO via API, native mobile only (not even in the desktop web uploader). Baked-in per-video-slide audio is technically publishable but is NOT the swipe-wide feature. Carousel video is a plain muted VIDEO, not a Reel (no Reels distribution/audio/tab).
- First-slide crop is enforced by the API ("cropped based on the first image, default 1:1"). Our uniform 1080x1350 satisfies this by construction; assert it in tooling.
- Container flow: per slide POST /media with is_carousel_item=true, poll status_code to FINISHED (~1/min, backoff, 200 calls/hr ceiling), POST parent media_type=CAROUSEL with children, POST media_publish. Assets must be served from a public HTTPS URL (MinIO/R2) at publish time. 100 posts/24h. Containers expire in 24h. (Gapfill.)

### Motion vocabulary rules (lock a HOUSE SET; restraint IS the premium signal)

- EASING: easeOutExpo `cubic-bezier(0.19,1,0.22,1)` for hero reveals / big numbers; easeOutQuint `cubic-bezier(0.23,1,0.32,1)` for supporting text; easeInOutCubic `cubic-bezier(0.645,0.045,0.355,1)` for on-screen repositioning; linear ONLY for loops. BAN ease-in on entrances. BAN linear on entrances.
- DURATIONS: micro feedback 100-150ms; standard reveal 400-600ms; ONE hero luxury reveal per deck 1200-1800ms; hold each legible line >=500ms after settle; total per-slide loop 2-4s; exits shorter than entrances (200-250ms). Char stagger 40-60ms/char, left-to-right default.
- ANIMATE ONLY transform, opacity, clip-path, filter, background-position. NEVER width/height/top/left/margin (layout-triggering, non-deterministic, janky, and they break frame-by-frame capture).
- Cards play ONCE and STOP, muted: every clip must be 100% legible with sound off (burn in captions) and must resolve INTO a composed legible still (Carter's existing static slide IS the target end frame). Author t=0 == t=duration for a seamless single play; ffmpeg boomerang only as fallback.
- Count-up (for scale, smooth ease-out) and odometer (for a landed milestone, digit slots rolling) are the biggest single upgrade for salary/stats decks. MANDATORY `font-feature-settings: "tnum"` or digits jitter and it reads cheap. Drive the number by a clock keyed to the virtual frame index, never wall-clock rAF.
- Restraint: 1-2 motion moments per slide, one hero reveal per deck, overshoot/bounce as a rare accent. Motion must MEAN something ("motion for motion's sake" is a named 2026 cliche). (Division E findings 5, 10, 11; Division C finding 8.)

### Ship order (de-risk cheaply first)

1. "Hold and Scroll" flipbook on CURRENT shotpls (N static PNGs, one element advancing per slide, no video encoding). Ships today, de-risks the motion thesis for free (Division E finding 7).
2. First MP4 asset = parametric geometry (Beethoven-style rings/bars sweeping, monochrome + one accent), because parametric geometry is trivially animatable (Division C finding 8, Division E).
3. Python asset layer: shared `brutalist.mplstyle` chart helper (pyfonts/HighlightText/pypalettes/drawarrow) -> drawsvg inline diagrams -> manim scene templates (0.20.1, uv-recommended, pyav so no system ffmpeg, `-t --format=mov -r 1080,1350 --fps 30`, Cairo not OpenGL) -> assemble.py that validates the export contract (Division E finding 13).

---

## 6. SYSTEM ARCHITECTURE RECOMMENDATIONS

### Skill structure that avoids template cloning

Gut make-carousel's template-fill core. Rebuild on the frontend-design two-pass shape (section 2, trick 4): PASS 1 brainstorm a compact per-deck token system + ASCII wireframe + one named signature device; PASS 2 critique the plan against "would I produce this for any deck," revise, log the delta, THEN build. Layer the variation mechanisms (combinatorial seed + Verbalized Sampling, trick 6) on the concept step so randomness picks the starting point and reasoning finishes it. Apply per-step constraint types (trick 7): Guardrail for brand rules, Criteria for copy word-tier and the one-focal-point bar, HIGH freedom for art direction, loose Template for the scaffold. Write every rule as rule + reason + rebuttal-to-the-excuse (trick 8). (Division F directives 1-4.)

### Multi-design-language setup (engine + N swappable bundles)

Architect as ONE carousel ENGINE (canvas, render, embed-fonts, CTA grammar, guardrails, the QA gate, the publisher) plus N named design-language bundles in a small data file. "Synthetic" becomes language 1, not the only language. Proven by shipped catalogs: ui-ux-pro-max-skill (67 styles + 161 palettes + 57 font pairs, BM25 retrieval) and bergside/awesome-design-skills (67 named languages, SKILL.md for the agent + DESIGN.md for humans). Fold the existing design-ethos skill's anti-clone philosophy ("the images are the instruction," "the best output contains one choice the reference never made") directly INTO the engine rather than keeping it separate. (Division F finding 9, directive 5.)

### Visual QA gates (four layers, cheapest deterministic first, VLM last)

Runs between "HTML written" and "PNG shipped."
- GATE 0 (in-page DOM, milliseconds, no ML): font actually loaded (`document.fonts.status === 'loaded'`, catches silent base64-embed fallback, a killer specific to our inline pipeline); overflow (`scrollHeight > clientHeight + 1`, +1px sub-pixel tolerance); safe-zone (inset ~120px top / 162px bottom / ~56px sides on the 1080 base; cover slide stricter: central 1080x1080). Emit a red-band debug PNG.
- GATE 1 (pixel, Pillow+numpy, ~40 lines): per-text-region worst-case contrast on the final 2160x2700 pixels, MASK text vs background (do not average the box). Report WCAG 2.1 (4.5:1) AND APCA (Lc 60 for giant poster headlines, 75 body).
- GATE 2 (regression lock, odiff on Linux, v4.3.8): lock an APPROVED slide against environment drift (font embed broke, Chrome AA changed). maxDiffPixelRatio ~0.01. NEVER use pixel/SSIM diff to judge new design quality, only drift.
- GATE 3 (VLM self-review, the differentiator): 1-10 rubric (layout, contrast, typography, spacing, missing-elements) as TRIAGE ONLY, plus a hard yes/no defect checklist. Gate accept/reject PAIRWISE (variant B vs current best), because arXiv research says VLMs rank but cannot score (2604.25235) and pick best+worst correctly only 26.5% vs 68.9% human (2605.12684). Trust the VLM for GROSS defects (clipping, overlap, dead contrast, unsafe zone, off-center); keep fine taste human. 3-cycle keep-best (~17.8% gain). Self-hosted qwen2.5-vl / llama3.2-vision first, escalate to a frontier model only for the final pairwise taste call. (Division F finding 8, directives 11-12.)

ADD (from Division C): a DETERMINISTIC DOM/CSS slop linter (we render via headless Chrome exactly like Krebs rendered his 1,590 pages). Flag: badge-above-headline, all-caps label rows, gradient text, gradient-on-number, colored side-border stripes, 3-card icon grids, purple/indigo accents (#6366F1 to #8B5CF6), uniform 16px radius, uniform padding, mono-as-body. REJECT any deck where all interior slides share one layout hash (the self-cloning check). ADD a squint/blur validator (Division C directive 8): Gaussian-blur each 2160x2700 PNG; if no single element still dominates the blur, the slide FAILS the poster test. ADD a per-slide word-count check (fail over ~15 words) and a type-size check (fail over 3 sizes or under 4:1 hero-to-support). (Division C findings 3, 7, directives 7, 8.)

### The self-improving feedback loop

- METRICS REALITY (head-verified, Division F finding 6): the Graph API (v25.0) returns only ALBUM-PARENT metrics (reach, saved, shares, total_interactions, follows, profile_activity, profile_visits, views). Carousel CHILDREN return "(#100) Field is not available for Carousel children media." So the loop's BACKBONE is whole-deck SAVE RATE (saved/reach) and SHARE RATE (shares/reach), sliced by design tags we assign at publish.
- THE CROSS-DIVISION UNLOCK: per-slide swipe-through and completion rate exist in the native app Insights UI only, BUT are recoverable via a vision-model OCR read of the Insights screenshot or Edits-app performance PDF, using the SAME self-hosted Qwen2.5-VL that runs Gate 3. One Ollama model, two jobs: QA the render AND read back the metrics the API cannot give. Treat per-slide retention as an optional side channel, not the backbone (2026 benchmark targets seen: swipe-through 65%+, completion 55%+, 60-80% completion triggers Explore).
- THE PULLER: dltHub "instagram-graph" verified source (uv/Python-native, TOS-safe), one row per deck at album level. Own it; Windsor.ai MCP is a same-day read-only shortcut.
- THE ARTIFACT: a plain-text carousel-design-rules.md that make-carousel reads EVERY run and a weekly /carousel-retro edits with minimal atomic diffs. Three independent research lines converge on this shape (Anthropic best-practices "run validator, fix errors, repeat"; Karpathy "define success criteria, loop until verified"; generativeprogrammer "state the rule, then the reason").
- THE RETRO (gated): join design tags to save/share rate vs trailing baseline, surface verified deltas, propose atomic diffs with a one-line rationale + numbers. SCALE at >=10% lift with >=80% confidence + min sample; KILL at >=15% worse; HOLD below confidence. Success metric lives IN CODE, never let the agent redefine "better" (Self-Harness arXiv 2606.09498: when stalled, strengthen the VERIFIER not the generator). Min runtime 72h-7d, judge on 4-6 week windows and engagement RATE, ignore likes. HONEST LIMIT: for a solo low-volume account, per-deck statistical confidence is genuinely weak; lean on the verifier and long trailing windows. (Division F findings 5, 6, 7, directives 6-10.)
- TAG EVERY DECK'S DESIGN DNA at publish (hook type, poster-vs-newspaper slide-1, body-copy density, animated-slide flag, type scale, palette, format). Without the tags the loop is blind. (Division F directive 7.)

---

## 7. THE COMMANDMENTS (non-negotiable principles for the new design language)

Each is traceable to research evidence. These govern every deck.

1. ONE FOCAL POINT PER SLIDE. Kill the default stack of hud row + kicker + multi-line headline + rule + paragraph + tag row + stat block + pager + button. Max 2 reading zones per interior slide. WHY: the busy slide is the named failure state in Vignelli, Smashing, AND Krebs simultaneously, and it reads to the 2026 ranker as a drop-off. (Divisions A1, C2/C3, F2.)

2. HARD WORD BUDGET, ENFORCED IN CODE. Cover 8-10 words max, interior 15 words hard ceiling, one idea per frame. Make the tool REFUSE to render an over-budget slide. WHY: the single sharpest, most-repeated finding; current decks run 3-9x over budget. (Division A2, C directive 7.)

3. MAX TWO TYPE SIZES, MAX THREE HIERARCHY LEVELS, HERO-TO-SUPPORT JUMP 4:1 TO 6:1 WITH NOTHING BETWEEN. More distinction comes from weight/color/space, never a fourth size. Use one aggressive modular ratio (1.333 to 1.5), never a UI ratio (1.125). WHY: Vignelli "one or two type sizes," Smashing "three levels is all most people can discern." (Division C2, C11.)

4. THREE FREE FONTS MAX: a display face (Anton/Archivo Black for brutalist, or high-opsz Fraunces-with-WONK for editorial), a grotesque body (Space Grotesk / Hanken Grotesk), a mono accent (Space Mono / IBM Plex Mono / JetBrains Mono) used ONLY for metadata. Kill Poppins/Montserrat/Inter as display. Use opsz to let ONE massive headline carry the slide. WHY: type is the single fastest escape from slop; geometric sans reads "budget template" in 2026. (Division C9, C4, D6.)

5. ONE ACCENT, SPENT ON ONE THING PER SLIDE (60-30-10). Palette 3-5 colors total. No decks where HUD + tag row + button + stat all glow at once. BAN purple/indigo gradients, gradient text, gradient-on-numbers. WHY: "accents are spices, not the main course"; the purple gradient is "the single loudest AI tell." (Division C10, C13.)

6. THE COVER IS A BILLBOARD POSTER, THE HOOK NOT A TITLE. 5-8 specific number-anchored words (largest type in the deck), one pattern-interrupt visual, an OPEN LOOP (cropped diagram, blurred result, "#1 of 7", before-with-no-after), min 4.5:1 contrast, resolving in under 50ms, a directional cue toward the right edge. Keep hook/face/logo inside a centered 3:4 SAFE ZONE so the grid crop never decapitates it. Reject any "pretty background + generic phrase" cover. WHY: slide 1 carries 60-80% of the weight; a hook opens a loop, a title closes it; the grid crops thumbnails to 3:4. (Division A6, A11, C5, C11.)

7. SLIDE 2 IS A SECOND COVER. Design slides 1 AND 2 as parallel cold-open hooks, and make every interior slide also work as a standalone entry point. WHY: the unswiped re-serve mechanic shows unseen slides again as "new content" (Buffer 2026, buffer.com/resources/instagram-algorithms). Add a named-destination pointer ("the payoff is on slide N") to plant a reward at a reachable slide. (Division A3, A6.)

8. NEVER ABBREVIATE "CERTIFICATION" IN VISIBLE COPY; CERT NAME IN BIG TYPE, GENERIC GLYPH, NEVER A VENDOR LOGO. WHY: Carter's house rule AND the trademark-safe path IS the poster-clean path (vendor logos may not be placed, altered, or animated by a third party). (Division D3; house rule.)

9. BREAK RHYTHM ON PURPOSE IN EVERY DECK. Swing word count (a 2-word slide next to a 12-word slide), include exactly one 72pt pull-quote slide and one near-empty "confident emptiness" transition. Vary which accent element changes per slide. WHY: uniform typographic rhythm is the #1 perceptual "this is AI" tell (2Slides eye-tracking, 2slides.com/blog/why-ai-slides-look-fake-and-how-to-fix). (Division C4, F3.)

10. RECOGNIZABILITY = A LOCKED SYSTEM, NOT PER-POST NOVELTY. Define 8-12 locked slide archetypes (hero-number, one-line-verdict, single-diagram, giant-word, tool-card, confident-emptiness, panorama-segment, cover) and reuse them forever. Fix a small invariant set (palette, display face, voice, one signature mark); VARY interior layout/scale/emphasis. WHY: Visualize Value's entire moat is a ~12-device locked vocabulary; series identity is house-style + varied layout, and DTC data shows swipe rates crater without variation. (Division C1, C12.)

11. GENERATE, DO NOT DECORATE: STRUCTURAL DEVICES MUST ENCODE SOMETHING TRUE. Numbering, eyebrows, dividers, labels must encode real content, not decorate. Ground the visual language in cyber vernacular as real information structure (terminals, hex, packet dumps, CVE/MITRE labels). Every element justifies its presence. WHY: Anthropic frontend-design "structural devices should encode something true, not decorate"; slop is INDISTINCT not ugly ("resembles everything, argues for nothing," Built In). (Divisions B12, C5, F1/F2.)

12. MOSTLY-STATIC POSTER DECK WITH 1-2 MOTION MOMENTS, NEVER ALL-VIDEO. Motion at slides 3-5, one hero reveal per deck. WHY: static wins SAVES (the KPI for educational cyber), video wins watch-time; the mostly-static-plus-motion shape is the ONLY approach that gets both AND respects poster-not-newspaper. Mixed-media is a ~2.33% vs ~1.80% edge only ~7% exploit. (Division E4, A4.)

13. CSS @KEYFRAMES / WAAPI-ONLY MOTION; FORBID raw rAF/setInterval; ANIMATE ONLY transform/opacity/clip-path/filter. Restraint IS the premium signal: lock the house easing/duration set, one hero reveal per deck, motion must mean something. WHY: WAAPI seek makes renders deterministic and immune to the Chromium 147 beginFrame removal; layout-triggering properties break frame capture; "motion for motion's sake" is a named cliche. (Division E2, E3, E10.)

14. THE LAST SLIDE IS A DOUBLE CTA AND A SAVE-EARNING REFERENCE. Save-ask and send-ask on separate lines ("save this for the next time you ___" / "send this to the [person] still doing X"), plus the comment-keyword DM trigger, and repeat the send-ask on its own line in the caption. Include at least one genuinely keep-worthy reference slide (cheat sheet, command list, salary table) AND one forward-worthy slide (validating, funny, tag-worthy). WHY: saves are volume, sends are the rare 3-5x reach multiplier; they are two different design jobs; the algorithm weights saves/DM-shares 3-5x over likes. (Division A5, A9, C12.)

15. SHIP THE CAPTION STACK AS A BUILD ARTIFACT. Line-1 hook with the primary keyword in the first ~125 chars, a 150-300 word body that EXTENDS (never repeats) the slides, an isolated single-line CTA, 3-5 hashtags (the 30-hashtag era is dead), a per-image alt-text field (<=100 chars), and a per-slide caption line seeded with a distinct searchable term (tool, CVE, cert code, command) per slide. WHY: per-slide captions are LIVE globally (June 2026, head-verified) and feed search discovery; text is a triple SEO surface competitors are not yet using. (Division A7, A directive 10.)

---

## APPENDIX: UNRESOLVED, TEST IN-HOUSE

These are the honest gaps. None blocks the rebuild; each is an A/B to run once the pipeline ships.

1. Every engagement decimal (2.33% mixed-media, 3-5x sends, 80% completion, 24-48h re-serve, +22% cinemagraph stop-scroll) is aggregator paraphrase. Magnitudes are directional. Our own account is the only place to get real effect sizes.
2. Music-to-Reels-feed eligibility is not settled by any Meta doc. Post two matched carousels (one with music, one without) and compare Reels-feed impressions in Insights.
3. No verified 2026 CYBER-niche carousel permalink with real save/view numbers exists (in-app only, not web-indexable). Reference anatomy needs a manual in-app screenshot pull into a vision pass.
4. No named creator runs a documented video-slide-inside-a-carousel workflow. We define this ourselves; there is no template. Feixen/LaRussa are motion-craft refs only.
5. 3:4 (1080x1440) vs 4:5: ADJUDICATED. Keep 4:5 as the production default and the REQUIRED ratio for any mixed-media (video) deck (the first slide locks the ratio; a video deck cannot mix ratios). Run 3:4 as a WHOLE-DECK static A/B only, never mixed within a post. Division B/one-A-thread favored testing 3:4; Division C/E/gapfill keep 4:5 default. They are not truly contradictory once you separate "whole-deck experiment" from "mixed within a post."
6. Video-slide file-size cap conflicts (4GB total vs 250MB per slide) and audio sample rate (44.1 vs 48kHz). Keep clips short/light and use 48kHz to stay safe under either.
7. Solo-account statistical confidence for per-deck A/Bs is genuinely weak. Lean on the verifier and long trailing windows, not per-deck calls.
8. No published end-to-end system rewrites its own carousel design rules from IG metrics in production. The pieces are all proven separately; the assembled loop is greenfield. We build it, not copy it.
