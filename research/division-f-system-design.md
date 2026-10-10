<!-- © AngelaMos | 2026 | division-f-system-design.md -->

# DIVISION F: System Architecture. Skills That Stay Fresh, and the Self-Improving Loop

Compiled 2026-07-10 from scouts F1 (skill architecture / anti-cloning), F2 (metrics feedback loop), F3 (visual QA gate), plus four head-level verification fetches/searches. Recency: April to July 2026 is primary. Older material is labeled background.

Source files:
- business/media/carousel-lab/research/raw/f1-skill-architecture.md
- business/media/carousel-lab/research/raw/f2-feedback-loop.md
- business/media/carousel-lab/research/raw/f3-visual-qa.md

---

## EXECUTIVE SUMMARY

1. Anthropic already deleted the exact architecture our make-carousel skill uses. Their 564k-install frontend-design skill dropped its ban-list and replaced it with a two-pass brainstorm-then-critique process. Prohibition-lists clone; reasoning processes generalize. Verified verbatim by head re-fetch of the raw SKILL.md.
2. Our "Synthetic" house look is a named AI tell. Anthropic's cluster 2 (near-black + one bright vermilion/acid accent) and cluster 3 (broadsheet, hairline rules, zero radius, dense columns) together describe our current decks almost exactly. Operation Carousel Maxx is confirmed by first-party guidance.
3. Prose alone does not stop cloning. Even Anthropic's skill clones itself at scale ("recognizable signature, monotony at scale"). We need a real variation layer (combinatorial seed + Verbalized Sampling) plus a cross-slide consistency layer on top.
4. The Instagram Graph API gives ZERO per-slide retention. Swipe-through and completion rate live in the app UI only. The loop's backbone is whole-deck save rate and share rate, sliced by design tags we assign ourselves.
5. But per-slide retention IS recoverable via a vision-model OCR read of the Insights screenshot. The same self-hosted Qwen2.5-VL that runs the visual QA gate also reads the Insights panel. One model, two jobs. This is the cross-division unlock.
6. The self-improving artifact is a plain-text carousel-design-rules.md that make-carousel reads every run and a weekly /carousel-retro edits with minimal atomic diffs, gated by a scored verifier. Three independent research lines (Anthropic, Karpathy, Self-Harness) converge on this shape.
7. The visual QA gate is four layers: DOM overflow + safe-zone lint (free, deterministic), pixel WCAG/APCA contrast, odiff regression lock, and a VLM pairwise self-review that catches gross defects but never arbitrates taste.

---

## THE FINDINGS THAT MATTER (ranked)

### 1. Rewrite make-carousel from template-fill to two-pass brainstorm-then-critique (highest leverage)
Anthropic's frontend-design skill (anthropics/skills, 564k+ installs per dmaya.ai teardown 2026-04-28) was rewritten in commit 2235be7 to DELETE the ban-list (26 lines: no Inter, no purple gradients, prescriptive categories) and ADD a process: signature element, subject grounding, two-pass critique. Head re-fetch of raw SKILL.md confirmed the wording verbatim:
- Two passes: "First, brainstorm a short design plan based on the human's design brief. Then review that plan against the brief before building."
- Signature element: "the single unique element this page will be remembered by that embodies the brief."
- Restraint: "Spend your boldness in one place... cut any decoration that does not serve the brief." Plus the Chanel rule: "before leaving the house, take a look in the mirror and remove one accessory."
- Self-critique: "Critique your own work as you build, taking screenshots if your environment supports it."
- Structural honesty: "Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it."
This is first-party proof that our template-clone architecture is wrong and a reasoning process is right. It is also the single most-adopted design skill in existence, so this is a proven pattern, not a bet.
Source: github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md (head-verified verbatim); commit 2235be7; dmaya.ai/blog/claude-code-frontend-design-skill (F1).

### 2. Our Synthetic style is one of Anthropic's three named AI tells
The rewritten skill warns against three AI-default clusters. Verbatim from head re-fetch: "(2) a near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns." Those two clusters together describe the current Synthetic carousel look. The skill's language is that these are "defaults rather than choices... they appear regardless of subject." That is precisely the busy-newspaper 6-to-9-reading-zones problem this operation exists to kill. Our own hud row, kicker, rule, tag row, stat block, and pager are the "structural decoration that does not encode content" anti-pattern, verbatim.
Source: frontend-design SKILL.md (head-verified) (F1).

### 3. Build a real variation layer. Prose does not stop self-cloning
Anthropic's own skill still clones itself at scale ("the skill has its own recognizable signature... monotony at scale"; "each generation is independent, screens drift"). Two stacked mechanisms fix this, both fitting the terminal pipeline (no API temperature control needed):
- Combinatorial wildcard seed (background technique, SD-era 2023+, still the reliable floor): small named lists rolled per deck from a seed or slug-hash. 6 palettes x 5 layouts x 5 type pairs x 4 signature devices = 600 starting configs. Randomness picks the starting point; reasoning does the rest.
- Verbalized Sampling (arXiv 2510.01171, primary): ask the model to "Generate k responses with their probabilities" (k=5 to 20), optionally with an in-prompt rarity threshold ("probabilities below {threshold}"). Reported 1.6-2.1x creative-diversity gain, +25.7% human-rated diversity. Pure prompting.
Source: dmaya.ai teardown; arxiv.org/html/2510.01171v1; github.com/adieyal/sd-dynamic-prompts (F1). Numbers are the paper authors' claims, not independently reproduced.

### 4. Per-STEP constraint design, not one freedom level for the whole skill
dev.to/akari_iku: assign a constraint TYPE per step (Procedural, Criteria, Template, Guardrail). "Loose where you want divergence, tight where you need convergence." Maps cleanly to a carousel skill:
- HIGH freedom: art direction / signature move.
- Guardrail (LOW): 1080x1350 canvas, no emojis, no em dashes, never abbreviate "certification," save/comment CTA grammar.
- Criteria (MEDIUM): copy word-tier, artifact test, one-focal-point-per-slide bar, max body-copy zones.
- Loose Template: slide scaffold.
Source: dev.to/akari_iku/how-to-stop-claude-code-skills-from-drifting-with-per-step-constraint-design-2ogd (F1).

### 5. The self-improving loop is a plain-text rules file edited by a gated retro (three sources converge)
The "define success, loop until verified" pattern appears in three unrelated places, which is strong signal:
- Anthropic best-practices: "Run validator, fix errors, repeat." The validator can be a text doc ("The validator is STYLE_GUIDE.md, and Claude performs the check by reading and comparing").
- Karpathy CLAUDE.md (multica-ai/andrej-karpathy-skills), Rule 4 Goal-Driven Execution: "Define success criteria. Loop until verified."
- 9-principles post (generativeprogrammer): "state the rule, then state the reason. Reasoning becomes the rubric for cases the skill did not spell out." Plus "write the rebuttal to the excuse next to the rule."
The applied shape (from Stormy AI's Claude Code playbook, which stores brand voice in an INSTAGRAM_VOICE.md the generator reads every run but ADMITS it never closes the metrics-to-prompt loop): our differentiator is a carousel-design-rules.md that make-carousel reads AND the weekly retro edits.
Source: platform.claude.com best-practices; github.com/multica-ai/andrej-karpathy-skills; generativeprogrammer.com/p/9-principles; stormy.ai/blog/autonomous-instagram-content-engine-claude-code-playbook (F1, F2). Karpathy's original 2026-01-26 X thread was reached only via the distilled repo, not the tweets.

### 6. The API gives whole-deck metrics only. Per-slide retention is UI-only but OCR-recoverable
Head-verified across four searches. The Graph API (v25.0, July 2026) returns at the album parent level: reach, saved, shares, total_interactions, follows, profile_activity, profile_visits, views. Carousel CHILDREN return the documented error "(#100) Field is not available for Carousel children media." So the loop's backbone is whole-deck SAVE RATE (saved/reach) and SHARE RATE (shares/reach), sliced by design tags we assign.
Per-slide swipe-through and completion rate DO exist, in the native app Insights UI only. Head search surfaced concrete 2026 benchmark targets: swipe-through 65%+, completion 55%+, described as the #1 and #2 carousel ranking signals, with 60-80% completion triggering Explore distribution. Instagram is also testing per-frame like attribution ("which specific slide caused users to exit or share"), still rolling out, UI-only. The Edits app can now export a performance PDF (no more manual screenshots).
THE BRIDGE (cross-division unlock): a vision model OCRs the Insights screenshot/PDF to recover per-slide retention. Head search confirms Qwen2.5-VL 7B is the recommended 2026 local model for reading dashboards/charts/UIs into structured output. That is the SAME self-hosted VLM F3 recommends for the visual QA gate. One Ollama model, two jobs: QA the render, and read back the metrics the API cannot give.
Source: developers.facebook.com media insights reference; krbnite.github.io/Metrics-on-the-Instagraph; trymypost.com carousel algorithm 2026; localaimaster.com local-ai-vision-tasks; inro.social insights update 2026 (F2 + head searches). AdSpyder Feb 2026 per-slide test remains a search snippet, not a fetchable primary source.

### 7. The build-the-puller path and the retro decision thresholds
- Puller: dltHub "instagram-graph" verified source pipelines Graph API media + insights into a local DB, uv/Python-native, TOS-safe, Claude Code supported. Own this. Windsor.ai MCP is a same-day no-code shortcut for the read side only.
- Thresholds (crescitaly 2026, most concrete): 3 variants (control, minor=copy-only, structural=format-only), isolate one variable. Min runtime 72h/7d. SCALE at >=10% lift with >=80% confidence + min sample; KILL at >=15% worse; HOLD below confidence.
- Guardrails (o-mega 2026 + Self-Harness arXiv 2606.09498): success metric in code not prose (agent cannot redefine "better"); propose atomic DIFFS not rewrites; accept only after regression-test on held-out set (our tagged past decks); version with before/after numbers and auto-rollback; Variance Inequality Principle: when stalled, strengthen the VERIFIER not the generator. Self-Harness lifted held-out pass rates ~40 to 62, 24 to 38, 43 to 57%.
- Cadence (Buffer 2026): weekly ~15-min review, monthly changes, judge on 4-6 week windows and engagement RATE. Track save rate, share rate, reach, follows-from-post, profile visits. Ignore likes.
Source: dlthub.com/context/source/instagram-graph; blog.crescitaly.com creative-testing-workflow-2026; o-mega.ai self-improving-agents-2026; arxiv.org/abs/2606.09498; buffer.com/resources/creator-growth-playbook (F2). With a solo-account tiny n, per-deck statistical confidence is genuinely weak; lean on the verifier and long windows.

### 8. The four-layer visual QA gate (runs between "HTML written" and "PNG shipped")
- Gate 0 (in-page DOM, milliseconds, no ML): font actually loaded (document.fonts.status === 'loaded', catches silent base64-embed fallback, a killer specific to our inline pipeline); overflow (scrollHeight > clientHeight + 1, offsetWidth < scrollWidth, +1px tolerance for sub-pixel rounding); safe-zone (inset 120px top, 162px bottom, ~56px sides on the 1080 base; cover slide stricter: central 1080x1080, never top/bottom 6% bands). Emit a red-band debug PNG.
- Gate 1 (pixel, Pillow+numpy, ~40 lines we write): per-text-region worst-case contrast on the final 2160x2700 pixels. Report WCAG 2.1 (4.5:1 / 3:1) AND APCA Lc (target Lc 60 for giant poster headlines, 75 body). Do NOT average the box; mask text vs background. No ready-made snippet exists.
- Gate 2 (regression lock, odiff on Linux): lock an APPROVED slide against environment drift (font embed broke, Chrome AA changed). maxDiffPixelRatio ~0.01, threshold 0.1. NEVER use pixel/SSIM diff to judge new design quality, only drift.
- Gate 3 (VLM self-review, the differentiator): rubric from arXiv 2604.05839 (layout, contrast, typography, spacing, missing-elements, 1-10) PLUS a hard yes/no defect checklist. Respect arXiv 2604.25235 ("VLMs rank but cannot score"): use 1-10 as triage only, gate accept/reject PAIRWISE (variant B vs current best). Respect arXiv 2605.12684 (VLMs pick best+worst correctly only 26.5% vs 68.9% human): trust the VLM for GROSS defects, keep fine taste human. 3-cycle keep-best loop (~17.8% gain). Self-hosted qwen2.5-vl / llama3.2-vision first, escalate to a frontier model only for the final pairwise taste call.
Source: MDN scrollWidth; W3C relative-luminance; git.apcacontrast.com; github.com/dmtrKovalenko/odiff (v4.3.8, 2026-04-17); arxiv 2604.05839, 2604.25235, 2605.12684; namangoyal.com codex-vision; Tal Rotbart round-trip screenshot testing (F3).

### 9. Multiple design languages under one brand: engine + N swappable bundles
Real shipped catalogs prove the pattern: ui-ux-pro-max-skill (67 styles + 161 palettes + 57 font pairs in a CSV, BM25 retrieval + industry reasoning + anti-pattern list + pre-delivery checklist) and bergside/awesome-design-skills (67 named languages, SKILL.md for the agent + DESIGN.md for humans). Steal the shape: one carousel ENGINE (canvas, render, embed-fonts, CTA grammar, guardrails) + N named design-language bundles (Synthetic becomes language 1, not the only language). Our own design-ethos skill already carries the anti-clone philosophy these catalogs lack ("the images are the instruction", "the best output contains one choice the reference never made"); wire it INTO make-carousel rather than keeping it a separate skill.
Source: github.com/nextlevelbuilder/ui-ux-pro-max-skill; github.com/bergside/awesome-design-skills; .claude/skills/design-ethos/SKILL.md (F1).

### Contradictions flagged
- Absolute vs pairwise VLM scoring: arXiv 2604.05839 uses 1-10 absolute scores in its refinement loop; arXiv 2604.25235 says absolute VLM scoring is the weak spot and pairwise is reliable. Reconcile: absolute score = triage only, pairwise = the accept/reject gate (F3, both sources cited).
- Pixel-diff benchmark numbers disagree across tools (odiff vs BlazeDiff vs honeydiff) because hardware/images/versions differ. Only the relative ordering is trustworthy, not absolute ms figures (F3).
- No true contradiction between scouts on architecture; F1, F2, F3 are complementary and converge on the same self-improving-loop shape from three angles.

---

## DIRECTIVES FOR THE REBUILD (numbered, concrete)

1. Gut make-carousel's template-fill core and rebuild it on the frontend-design two-pass shape: PASS 1 brainstorm a compact per-deck token system (4-6 named hex, 2-3 type roles, one-sentence layout + ASCII wireframe, one named signature device); PASS 2 critique the plan against "would I produce this for any deck," revise and log what changed and why, THEN build.

2. Add a variation layer with two stacked mechanisms: (a) a combinatorial seed rolled per deck from small named lists (palettes x layouts x type-pairs x signature-devices) via a --seed flag or slug-hash; (b) Verbalized Sampling on the concept step (ask for k=5-20 art-directions with probabilities, pick one). Randomness picks the starting point, reasoning finishes it.

3. Apply per-STEP constraint types inside the one skill: Guardrail for brand rules (canvas, no-emoji, no-em-dash, "certification" spelled out, CTA), Criteria for copy word-tier and the one-focal-point bar, HIGH freedom for art direction, loose Template for the slide scaffold.

4. Write every rule as rule + REASON and pre-answer the likely excuse next to it, so the reasoning becomes the rubric for cases the skill did not spell out.

5. Architect as engine + N design languages: one carousel engine (canvas, render, embed-fonts, CTA grammar, guardrails) plus swappable Synthetic-is-just-language-1 bundles in a small data file. Fold design-ethos's anti-clone philosophy directly into the engine.

6. Build a Python insights puller now via dltHub instagram-graph (uv, TOS-safe), storing one row per deck at album level: reach, saved, shares, total_interactions, follows, profile_visits, views. Own the pipeline; Windsor.ai MCP is only a same-day shortcut.

7. Tag every deck's design DNA at publish (hook type, poster-vs-newspaper slide-1, body-copy density, animated-slide flag, type scale, palette, format). Without the tags there is nothing to correlate and the loop is blind.

8. Recover per-slide retention via a vision-model OCR read of the Insights screenshot or Edits-app PDF, using the SAME self-hosted Qwen2.5-VL that runs the QA gate. Treat it as an optional side channel, not the backbone.

9. Build /carousel-retro as a weekly gated skill: join design tags to save/share rate vs trailing baseline, surface verified deltas, propose atomic diffs to carousel-design-rules.md with a one-line rationale + the numbers, apply only at >=10% lift with adequate sample, version with before/after and keep revertible. Success metric lives in code, never let the agent redefine "better."

10. make-carousel reads carousel-design-rules.md every run. That closes the loop: every deck teaches the next.

11. Build slide-qa as a four-gate pre-flight (Gate 0 DOM lint + safe-zone, Gate 1 pixel WCAG/APCA contrast, Gate 2 odiff drift lock, Gate 3 VLM pairwise self-review) that runs between HTML-written and PNG-shipped. Cheapest deterministic checks first, VLM last.

12. In Gate 3, use VLM absolute 1-10 as triage only and pairwise (variant B vs current best) for accept/reject; trust the VLM for gross defects only (clipping, overlap, dead contrast, unsafe zone, off-center), keep fine taste human, 3-cycle keep-best.

---

## OPEN QUESTIONS

1. Is there ANY programmatic export (even undocumented/private) of per-slide swipe-through or completion rate, or is the vision-OCR-of-Insights read the only path? Four head searches all point to UI-only. The AdSpyder Feb 2026 per-frame-attribution test remains an unverified snippet.

2. For a solo low-volume account, what minimum sample makes a per-deck save-rate A/B decision trustworthy? crescitaly punts to "tie to your conversion volume." This is a real design risk for the gating logic; the practical answer may be long trailing windows over per-deck calls.

3. Does the Edits-app performance PDF include per-slide numbers in a machine-readable layout the VLM can OCR reliably, or only aggregate figures? Not verified with a real export.

4. Exact miscalibration figures from arXiv 2604.25235 (ECE numbers) were not fetched; the qualitative "rank reliable, score unreliable" conclusion is confirmed but the magnitude is not.

5. No published example exists of a fully autonomous loop that rewrites its own carousel design guidelines from Instagram metrics in production. The pieces are all proven separately; the assembled end-to-end system is greenfield. We would be building it, not copying it.

6. No published vision-model art-direction loop is applied specifically to Instagram-carousel or poster-style graphics; all shipped examples are UI/webpage-oriented. Our carousel-specific rubric is an extrapolation to validate on real decks.

7. Verbalized Sampling metrics (1.6-2.1x, +25.7%, k and threshold syntax) are the authors' claims, not reproduced by us. Re-verify the exact frontend-design SKILL.md wording from raw before lifting any line into shipped skill code (head re-fetch confirmed the six load-bearing passages verbatim; the rest is faithful paraphrase).
