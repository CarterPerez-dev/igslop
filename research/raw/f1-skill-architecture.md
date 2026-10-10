<!-- © AngelaMos | 2026 | f1-skill-architecture.md -->

# DIVISION F1: Skill architecture for repeatable-but-varied creative output

Research date: 2026-07-10. Recency bias: everything below is 2026 material unless labeled background.
Mission: how people architect Claude Code skills / agent instructions so design output is REPEATABLE (on-brand) but VARIED (not the same slide every time), how they avoid template cloning, and how they wire a mandatory self-critique / self-improving loop.

Note on our own repo: Carter already ships BOTH failure-mode archetypes side by side. `.claude/skills/make-carousel/SKILL.md` is a template-based skill (copy a template, edit text nodes, one accent) which is the exact cloning risk. `.claude/skills/design-ethos/SKILL.md` is a principles-over-implementation skill that explicitly fights cloning ("Am I copying, or am I reasoning?", "surprise is allowed", "the label is not the law"). The external research below independently converges on the design-ethos philosophy and gives us the missing machinery (randomization, per-step constraints, a scored critique pass).

---

## SEARCHES RUN

1. Claude Code skill design template cloning problem concrete example becomes the output
2. Claude Code skills principles not implementations design skill 2026
3. agent skill "degrees of freedom" prompt design variation creative output Anthropic
4. frontend-design skill Anthropic avoid generic AI look art direction rubric
5. Karpathy Claude Code skill four rules behavioral GitHub most starred
6. generative design seed system prompt randomization avoid same output every time AI agent 2026
7. multiple design languages one brand system variant selection art direction agent
8. "claude" skill design output looks the same every time diversity temperature variation trick
9. LLM creative writing avoid mode collapse force variety pick random from list rubric constraint 2026
10. design system agent skill named visual languages pick one per project cybercore brutalism minimalism
11. "design tokens" OR "moodboard" agent skill randomize seed per generation avoid template GitHub 2026
12. generativeprogrammer skill authoring patterns Anthropic degrees of freedom examples pattern
13. "looks AI generated" design self-critique scoring rubric one aesthetic risk signature element skill
14. anthropics/skills frontend-design update April 2026 signature element two-pass critique
15. rotate design direction per run "pick a number" OR "roll" OR "seed" prompt force different aesthetic each time

Pages fetched and read in full: Anthropic skill-authoring best-practices doc; anthropics/skills frontend-design SKILL.md; the frontend-design update commit #1293; the dev.to per-step-constraint-design article; the multica-ai/andrej-karpathy-skills repo; the Verbalized Sampling paper (arXiv 2510.01171); the ui-ux-pro-max-skill README; the generativeprogrammer "9 principles" post; bergside/awesome-design-skills; dmaya.ai frontend-design teardown.

---

## FINDINGS

### 1. Anthropic's OWN design skill was rewritten FROM prohibition TO process (the single most important finding)

The official Anthropic `frontend-design` skill (anthropics/skills, path `skills/frontend-design/SKILL.md`) is the most-adopted design skill in existence: 564,000+ installs as of 2026-04-28 (dmaya.ai teardown). Commit #1293 (SHA 2235be7, author williamqian12) REWROTE its architecture. The diff:

- REMOVED (26 lines): generic "AI slop" warnings, the banned-font list (Arial, Inter, Roboto), the "no purple gradients / no predictable layouts" prohibitions, and prescriptive aesthetic categories (brutalism, maximalism).
- ADDED (39 lines): a signature-element concept, subject grounding, a two-pass brainstorm-then-critique process, and reasoning-based defaults.

Anthropic explicitly moved away from a ban-list ("don't use Inter") toward a process that makes the model reason. This is direct, first-party endorsement of the design-ethos philosophy Carter already wrote. A ban-list is brittle and can itself become a template; a reasoning process generalizes.

The rewritten skill's actual machinery, quoted:

Persona/frame: "Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's." The client "has rejected templated proposals" and pays for "a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify."

The THREE named AI-default clusters it warns against (verbatim):
1. warm cream background near #F4F1EA + high-contrast serif display + terracotta accent
2. near-black background + a single bright acid-green OR vermilion accent
3. broadsheet layout with hairline rules, zero border-radius, dense newspaper-like columns

CRITICAL FOR US: cluster #2 (near-black + single bright vermilion/acid accent) and cluster #3 (broadsheet, hairline rules, zero radius, dense columns) together describe Carter's current "Synthetic" carousel style ALMOST EXACTLY. Anthropic names our house style as one of the three tells of AI-generated design. The skill does not say these are forbidden, it says they are "defaults rather than choices, and they appear regardless of subject." That is precisely the busy-newspaper problem Operation Carousel Maxx exists to fix.

The two-pass process (verbatim structure):
- PASS 1, brainstorm a compact token system: Color = 4-6 named hex values. Type = 2+ roles (a characterful display face used with restraint, a complementary body face, a utility face for captions/data). Layout = a one-sentence prose concept plus ASCII wireframes to "ideate and compare." Signature = "the single unique element this page will be remembered by that embodies the brief."
- PASS 2, critique the plan BEFORE building: "if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief, revise that part, say what you changed and why."

Restraint rule (verbatim): "Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief." It cites Chanel: "before leaving the house, take a look in the mirror and remove one accessory."

Self-critique during build (verbatim): "Critique your own work as you build, taking screenshots if your environment supports it, a picture is worth 1000 tokens."

Structural-honesty rule (verbatim): "Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it." It warns against generic 01/02/03 markers "unless order actually carries information." This is a direct diagnosis of our busy-slide problem: our hud row, kicker, rule, tag row, stat block, and pager are structural DECORATION that does not encode content.

Motion rule (verbatim): "sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated." Relevant to the animated-slide direction, restraint applies to motion too.

The skill's DOCUMENTED failure modes at scale (dmaya.ai teardown, 2026-04-28), which are exactly our risks:
- "Each generation is independent. Screens drift." (the model cannot reference prior outputs, so a multi-slide deck loses internal consistency)
- "The skill has its own recognizable signature" producing "bold display fonts, dramatic gradients, asymmetric grids, creating monotony at scale."

So even the best-adopted design skill on Earth still clones ITSELF across many runs. Fixing cloning is not just "write a better prose skill." It needs an explicit variation layer and a cross-slide consistency layer on top. That is the gap our system must fill.

Sources: github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md ; github.com/anthropics/skills/commit/2235be7c60b551f5de82ade908fd3816455afcda ; dmaya.ai/blog/claude-code-frontend-design-skill

### 2. Anthropic's official "degrees of freedom" doctrine (the core lever)

Anthropic's skill-authoring best-practices doc (platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) has a section titled "Set appropriate degrees of freedom." It defines three levels and, critically, tells you to use HIGH freedom for creative work:

- HIGH freedom (text instructions): "Use when multiple approaches are valid, decisions depend on context, heuristics guide the approach." Their analogy: "open field with no hazards, many paths lead to success, give general direction and trust Claude."
- MEDIUM freedom (pseudocode / parameterized scripts): "a preferred pattern exists, some variation is acceptable."
- LOW freedom (specific scripts, few/no params): "operations are fragile, consistency is critical, a specific sequence must be followed." Analogy: "narrow bridge with cliffs on both sides."

Their Template pattern section explicitly offers two strictness modes. For strict machine-read output: "ALWAYS use this exact template structure." For creative output they say the opposite (verbatim): "Here is a sensible default format, but use your best judgment... Adjust sections as needed." The doc summarizes the rule for creative skills: "Strict templates suppress the structural variation that can make output more useful in edge cases."

The doc's anti-pattern section warns "Avoid offering too many options" (give a default with an escape hatch, not five choices), and warns that "Examples are concrete, not abstract" is a quality bar, but note the tension in finding 3 below: concrete examples are also the cloning trap.

The doc's Examples pattern (verbatim): "For Skills where output quality depends on seeing examples, provide input/output pairs just like in regular prompting... Claude matches on the examples instead of inferring from prose." This is the double-edged sword: examples pin down style, but for creative work a concrete example BECOMES the output. This is why Carter's design-ethos skill uses IMAGES as the reference instead of code snippets, so there is nothing literal to copy-paste.

Source: platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

### 3. The template-cloning failure mode, named and explained

The known failure ("any concrete code example in a skill becomes THE output") is well-documented. Anthropic's own doc admits it: examples cause the model to "match on the examples instead of inferring from prose." The community fix appears in three forms:

- Anthropic's own move (finding 1): delete the concrete ban-list and prescriptive categories, replace with a reasoning process and a subject-grounding instruction ("The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from").
- design-ethos (our repo): make the reference a FOLDER OF IMAGES, not code. "The images are the instruction. The text is just the doorway in." The explicit test: "would they say 'oh you clearly copied that' or 'oh these feel like they come from the same mind'? The first is failure." And a hard rule: "The best output will contain at least one choice the reference images never made. That's the proof you reasoned instead of copied." This is a built-in anti-clone assertion, the skill DEMANDS a novel move per run.
- The Medium teardown of frontend-design ("Why Anthropic's frontend-design Skill Just Works," Ahmed Soliman, Apr 2026) frames the same point: a design system and philosophy is loaded BEFORE any code so the model makes "bold aesthetic choices... intentional rather than decorative."

Source: platform.claude.com doc; .claude/skills/design-ethos/SKILL.md (our repo); medium.com/@ahmed.soliman frontend-design breakdown

### 4. Per-STEP constraint design (the drift fix, better than a single freedom level)

dev.to article "How to Stop Claude Code Skills from Drifting with Per-Step Constraint Design" (akari_iku, 2026). The thesis (verbatim): "LLM output variance (drift) isn't a bug to eliminate. It's a design variable to control intentionally." And: "real-world Skills contain steps that need to diverge and steps that need to converge, living side by side." Assigning ONE freedom level to a whole skill leaves drift; assign a constraint TYPE per step.

Four constraint types:
1. Procedural (HOW): sequential repeatable tasks; method matters more than judgment.
2. Criteria (WHAT): explicit quality thresholds; "Meet this standard" not "Do X."
3. Template: lock structure, leave content flexible.
4. Guardrail: define boundaries by prohibition; "Never do this."

Their worked example (proposal-writing skill): the market-research step stays Procedural and LOOSE (divergence wanted), the selection step is Criteria ("Evaluate on these 3 axes, recommend the highest overall score"), the ROI step is Criteria with numeric specificity (3-year TCO), the output step is a Template (200-word exec summary, conclusion then rationale then impact). Result: "controlled divergence... loose where you want divergence, tight where you need convergence."

Direct mapping to a carousel skill: the CONCEPT/art-direction step should be HIGH freedom (diverge, invent a look), the on-brand safety rails (canvas 1080x1350, no emojis, no em dashes, save/comment CTA) should be Guardrails (LOW freedom), the copy should be Criteria (word-tier bar, artifact test), and the slide SCAFFOLD can be a loose Template. One skill, four freedom settings.

Source: dev.to/akari_iku/how-to-stop-claude-code-skills-from-drifting-with-per-step-constraint-design-2ogd

### 5. Verbalized Sampling: per-deck randomization through PROMPTING alone (fits Carter's terminal pipeline perfectly)

Verbalized Sampling (VS), arXiv 2510.01171, "Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity" (also OpenReview 9jQkmGunGo). This is the single most actionable academic finding because it needs NO temperature/API control, it is pure prompt structure, which is exactly what works in Carter's Claude Code terminal loop.

Mechanism: instead of asking for one output, ask the model to VERBALIZE a distribution: "Generate 5 [things] and their corresponding probabilities." The model's response to a distribution-request approximates the pretraining distribution and bypasses the alignment-induced mode collapse that makes aligned models produce the same safe answer every time.

Variants:
- VS-Standard: "Tell k responses with their probabilities."
- VS-CoT: "Think step-by-step, then tell k responses with probabilities."
- VS-Multi: multi-turn, "k more with probabilities" on later turns.

Numbers: creative-writing diversity improves 1.6x to 2.1x over direct prompting; human-rated diversity up 25.7%; VS retains 66.8% of the base model's diversity vs 23.8% for direct prompting.

Tuning knobs: recommended k = 5 to 20 per call (larger k degrades quality; generate N total across ceil(N/k) calls). Diversity is tunable via an in-prompt probability threshold, verbatim: "Generate five responses with probabilities below {threshold}." Lower threshold = more diverse, no decoding-param change.

Why mode collapse happens (from the same paper and the Verbalized Sampling explainer): "typicality bias," humans prefer typical text, RLHF teaches the model to emit "safe, common, predictable" answers and ignore rare/creative ones. "Stories generated by LLMs are remarkable in their sameness." That is our exact carousel problem stated academically.

Sources: arxiv.org/html/2510.01171v1 ; openreview.net/forum?id=9jQkmGunGo ; ai.plainenglish.io Verbalized Sampling explainer

### 6. Combinatorial wildcard seeding (the other, dumber-but-reliable randomization move)

From the Stable Diffusion dynamic-prompt tooling ecosystem (adieyal/sd-dynamic-prompts) but the pattern is language-agnostic and directly portable to a carousel skill:
- Wildcard syntax: `{green|blue|white}` picks one option; you can nest these across many axes (palette, layout archetype, type pairing, grid, signature-device).
- Combinatorial generation: if one axis has 3 options and another 5, you get 3x5=15 distinct combinations. A deterministic seed (or seed+1 per slide) selects the combination.

Portable design: keep small named lists in the skill (e.g. 6 palettes, 5 layout archetypes, 5 type pairings, 4 signature devices) and have the skill ROLL one combination per deck from a seed (deck slug hashed to an int, or a `--seed` flag). 6x5x5x4 = 600 distinct starting configurations before any creative reasoning even runs. This is background technique (SD-era, 2023+) but it is the reliable floor under the smarter VS layer. Randomness picks the STARTING POINT; reasoning does the rest so it is not a mad-libs machine.

Source: github.com/adieyal/sd-dynamic-prompts ; aiarty.com dynamic-prompts tutorial

### 7. Multiple named design languages under one brand: real published skills

Three real catalogs prove the "one brand, many design languages, pick one per project" pattern is shippable:

- ui-ux-pro-max-skill (github.com/nextlevelbuilder/ui-ux-pro-max-skill): 67 UI styles + 161 color palettes + 57 font pairs. Architecture worth stealing: styles live in a CSV database (source of truth in `src/ui-ux-pro-max/`), selection is BM25 ranking search over the CSV plus 161 industry reasoning rules ("a SaaS product receives different recommendations than a beauty spa, preventing default homogeneity"). It ships an explicit AVOID/anti-pattern list (verbatim: "Bright neon colors + Harsh animations + Dark mode + AI purple/pink gradients") and a PRE-DELIVERY CHECKLIST (verbatim items: "No emojis as icons (use SVG: Heroicons/Lucide)", "Hover states with smooth transitions 150-300ms"). Selection is data-driven retrieval, not random, and not cloned.

- bergside/awesome-design-skills: a registry of 67 named design skill files, each with a SKILL.md (AI-facing: tokens, component families, accessibility, do/don't, quality gates) and a DESIGN.md (human-facing: visual direction, rationale, references). Named languages span aesthetic styles (Glassmorphism, Neumorphism, Retro, Brutalism), philosophies (Minimal, Clean, Enterprise, Artistic), and brand systems (Claude, Shadcn, Material, Roku). It assumes single-skill-per-project deployment (`npx typeui.sh pull <slug>` writes to `.claude/`). Weakness to learn from: it has NO anti-cloning guidance, it tells the agent to "generate UI consistent and true to the design system," so at scale it will clone. Our design-ethos already beats it on this axis.

- plugin87/ux-ui-agent-skills: DTCG design tokens, 42 components, WCAG 2.2, 138 design systems, "Senior Design Architect." Same catalog-of-systems shape.

Multi-brand-design-system theory (Design Systems Collective, UXPin, Rangle, 2026) backs the token architecture: primitive tokens (raw hex, type, spacing) feed brand-specific SEMANTIC tokens, so "the same component expresses dramatically different brand personalities without changing its underlying structure, a button remains a button." Map to us: one carousel ENGINE (canvas, render pipeline, CTA grammar) + N swappable token+layout "design languages" (Synthetic is just language #1).

Sources: github.com/nextlevelbuilder/ui-ux-pro-max-skill ; github.com/bergside/awesome-design-skills ; github.com/plugin87/ux-ui-agent-skills ; designsystemscollective.com multi-brand playbook

### 8. Mandatory self-critique and the self-improving loop (three independent sources converge)

The "define success, loop until verified" pattern shows up three times from three unrelated authors, which is strong signal:

- Anthropic best-practices doc, "Implement feedback loops": the canonical pattern is "Run validator, fix errors, repeat," and for skills WITHOUT code the validator is a reference doc: "The 'validator' is STYLE_GUIDE.md, and Claude performs the check by reading and comparing." Also the "Content review process": draft, review against checklist, "If issues found: note each issue with specific section reference, revise, review again," "Only proceed when all requirements are met." This is a text-only critique loop, no script needed, which is what we can build.

- Karpathy CLAUDE.md (multica-ai/andrej-karpathy-skills, created 2026-01-27 by Forrest Chang, distilled from Karpathy's X posts 2026-01-26; ~91k stars personal / ~132k org mirror, top of GitHub Trending 28 straight days). Rule 4, "Goal-Driven Execution" (verbatim): "Define success criteria. Loop until verified... Transform tasks into declarative goals with explicit verification steps. For multi-step work: state each step with its verification check, enabling independent looping." The insight (verbatim): "LLMs are exceptionally good at looping until they meet specific goals." Rule 1 "Think Before Coding": "Don't assume. Don't hide confusion. Surface tradeoffs." Rule 3 "Surgical Changes": "Touch only what you must." These are the same primitives as design-ethos and the 9-principles post.

- generativeprogrammer "9 Principles That Separate Useful Skills from Markdown Essays" (Bilgin Ibryam). The two most load-bearing for anti-cloning, verbatim: Principle 4 "Explain the why": "state the rule, then state the reason. Reasoning becomes the rubric for cases the skill did not spell out." Principle 5 "Anticipate the excuse": "Write the rebuttal next to the rule, in the skill itself." Plus the self-improving-loop principles: Principle 8 "Skills decay": "skills are living artefacts, not frozen docs. A skill you have not re-run in months is a liability." Principle 9 "Run before you ship": "the skill is debugged from observed runs, not from your imagination at authoring time." And Principle 3 "Process over prose": "a skill is a workflow with checkpoints, not reference documentation."

Anthropic's doc reinforces the loop with "Evaluation-driven development": build 3 evaluations BEFORE writing docs, measure baseline without the skill, write minimal instructions to pass, iterate. And the "Claude A / Claude B" method: one Claude authors the skill, a fresh Claude runs it, you feed observed failures back to the author Claude. That is a literal self-improving loop with a human in the middle.

The convergent architecture: (a) state rule + REASON (reason is the rubric), (b) write the rebuttal to the likely excuse next to the rule, (c) require an explicit verification step per stage with a pass/fail bar, (d) loop until the bar is met, (e) treat the skill as decaying and re-run it on real inputs to debug it.

Sources: platform.claude.com best-practices doc ; github.com/multica-ai/andrej-karpathy-skills ; generativeprogrammer.com/p/9-principles-that-separate-useful ; generativeprogrammer.com/p/skill-authoring-patterns-from-anthropics

### 9. Art-direction as a SCORED critique pass (rubric mechanics)

Design-critique + rubric research (designative.info "Rethinking Design Critiques in the Age of AI Prototyping" 2025-11-10; Georgia Tech CTL on AI rubrics; Frontiers rubric-mediated model 2026) gives the rubric shape: a usable rubric has three parts, evaluation criteria, a scoring scale, and a quality description per criterion, and modern rubrics are "prompt-specific rather than generic." The self-critique in frontend-design is a lightweight version of this ("does this read like the generic default"). To make it teeth-bearing, our critique step should score each slide against named criteria (focal-point count, body-copy-zone count, does the structure encode content, is there one signature move, does it match the deck's rolled design language) and FAIL below threshold, then loop. That turns a vibe-check into a gate.

Background caveat: the aesthetic-bias literature (Journal of Aesthetics and Art Criticism 2026; Frontiers in Psychology PMC12436141) warns AI critics themselves privilege "beauty, spectacle, saturation, symmetry" and "homogenize taste," so an AI self-critic can rubber-stamp its own clone. Mitigation: ground the rubric in Carter's specific winners (the 40k decks) and in the rolled design language, not in generic "is this pretty," and keep the human as final judge.

Sources: designative.info 2025-11-10 ; blog.ctl.gatech.edu AI rubrics ; frontiersin.org rubric-mediated model 2026 ; academic.oup.com/jaac AI aesthetic bias 2026

---

## SO WHAT FOR US

1. Rewrite make-carousel FROM template-fill TO the frontend-design two-pass shape. Our current skill ("copy a template, edit the text nodes, one accent") is the clone machine Anthropic just deleted from their own skill. Replace with: PASS 1 brainstorm a compact per-deck token system (4-6 hex, 2-3 type roles, one-sentence layout + ASCII wireframe, one named SIGNATURE device), PASS 2 critique the plan against "would I produce this for any deck," revise and log what changed and why, THEN build. This is a proven, 564k-install architecture.

2. Our house "Synthetic" look IS one of Anthropic's three named AI tells (near-black + single vermilion/acid accent, plus broadsheet hairline-rule dense columns). That is not opinion, it is written in the most-installed design skill on the planet. Operation Carousel Maxx's entire premise is confirmed by first-party Anthropic guidance. The busy-newspaper 6-9 reading-zones problem is the "structural decoration that does not encode content" anti-pattern, verbatim.

3. Build a real variation layer, do not rely on prose alone. The frontend-design skill STILL clones itself at scale ("the skill has its own recognizable signature, monotony at scale"). Two stacked mechanisms: (a) combinatorial wildcard SEED per deck from small named lists (6 palettes x 5 layouts x 5 type pairs x 4 signature devices = 600 starting configs, selected from a `--seed`/slug-hash), and (b) Verbalized Sampling for the concept step, ask for k=5-20 candidate art-directions WITH probabilities, optionally with an in-prompt probability threshold to push rarity, then pick. VS is pure prompting, no API temperature, fits the terminal pipeline. Expect 1.6-2.1x more concept diversity.

4. Adopt per-STEP freedom, not one setting. Guardrails (LOW freedom): 1080x1350 canvas, no emojis, no em dashes, never abbreviate "certification," CTA grammar. Criteria (MEDIUM): copy word-tier + artifact test, one-focal-point-per-slide bar, max body-copy zones. HIGH freedom: the art direction / signature move. Loose Template: the slide scaffold. This kills drift while keeping the look fresh.

5. Turn "self-review" into a SCORED gate that loops. Steal Karpathy's "define success criteria, loop until verified" and Anthropic's "run validator, fix, repeat." Concretely: after render, score each PNG against a named rubric (focal-point count = 1, body-copy zones <= 2, structure encodes content y/n, one signature move y/n, matches rolled design language y/n, matches a 40k winner not a template). Anything failing loops back and gets rebuilt BEFORE Carter sees it. Ground the rubric in his real winners, not generic prettiness, to avoid the AI-critic-rubber-stamp bias.

6. Architect "multiple design languages under one brand" as engine + swappable languages. One carousel ENGINE (canvas, render, embed-fonts, CTA grammar, guardrails) plus N named design languages, each a small token+layout+signature bundle (Synthetic becomes language #1, not the only language). Steal ui-ux-pro-max's shape: a small data file of languages/palettes/type-pairs, a selection step (seed-roll or brief-match, not always the same one), and a pre-delivery checklist. This is how we ship variety that still reads as one brand. Our design-ethos skill already has the anti-clone philosophy the catalog skills lack, wire it INTO make-carousel rather than keeping it separate.

7. Write rules as rule + REASON, and pre-answer the excuse. Per the 9-principles post, the reason becomes the rubric for cases we did not spell out, and writing the rebuttal next to the rule stops the model rationalizing around it. Every guardrail in the rewritten skill should carry its why.

8. Treat the skill as decaying. Re-run it on real decks, debug from observed PNGs (author-Claude / runner-Claude loop), keep 3 evaluations (e.g. tool deep-dive, salary map, mistakes) as regression tests. A skill not re-run in months is a liability, so the self-improving loop is not optional, it is maintenance.

---

## GAPS / DEAD ENDS

- Found no published skill that combines Verbalized Sampling with a design-token catalog in one shipped artifact. The VS + wildcard-seed + design-language-catalog stack described in SO WHAT is a synthesis of separate proven pieces, not a single repo we can copy wholesale. We would be first to wire it together for carousels.
- Could not confirm the exact CALENDAR DATE of frontend-design commit #1293 (GitHub page showed SHA and author williamqian12 but not a rendered date via fetch); recency is bounded by the dmaya.ai teardown dated 2026-04-28 discussing the already-updated skill, so the two-pass rewrite predates late April 2026.
- No first-party VERBATIM copy of the full frontend-design SKILL.md was captured (fetches returned faithful paraphrase plus many exact quotes, but a couple of sentences are reconstructed from two overlapping fetches). If precise wording matters for lifting a line into our skill, re-fetch github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md raw before quoting in shipped code.
- Verbalized Sampling numbers (1.6-2.1x, 25.7%, k=5-20, threshold syntax) are from the paper's HTML and an explainer, not independently reproduced by us. Treat as the authors' claims.
- X/Twitter primary posts (Karpathy's original 2026-01-26 thread) were reached only via secondary write-ups (techtimes, miraflow, agentpedia), not the tweets themselves; the four-rule wording is from the distilled repo, which is the artifact we would actually use.
