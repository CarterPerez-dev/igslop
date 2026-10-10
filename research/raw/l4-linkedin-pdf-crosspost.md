<!-- © AngelaMos | 2026 | l4-linkedin-pdf-crosspost.md -->

# DIVISION L / L4: Repurposing an Instagram carousel as a LinkedIn document (PDF) post

Research date: 2026-07-10. Recency priority: April to July 2026 material treated as current; anything older labeled background.

Scope: exact LinkedIn document-post PDF specs, how document posts rank in the 2026 feed, cover-page differences for a professional audience, and concrete open-source headless tooling to assemble Carter's shotpls PNGs into an optimized PDF. Written for Carter's pipeline: one 1080x1350 CSS-px HTML per slide, rendered to 2160x2700 PNG by shotpls, all offline.

---

## SEARCHES RUN

1. LinkedIn document post PDF specs 2026 page size file size limit dimensions
2. LinkedIn carousel document post algorithm reach 2026 how it ranks feed
3. convert PNG images to PDF command line ImageMagick img2pdf headless preserve resolution
4. img2pdf lossless PNG to PDF no recompression python 2026
5. LinkedIn document post cover page best practices professional audience 2026 first slide hook
6. img2pdf PNG large file size flate encoding convert to JPEG reduce PDF size LinkedIn carousel
7. LinkedIn algorithm dwell time 2026 Richard van der Blom document posts reach study
8. LinkedIn document post mobile UI safe zone title banner arrows overlay first slide cut off design
9. Instagram carousel 1080x1350 repurpose LinkedIn document PDF workflow script batch convert
10. LinkedIn document post caption character limit hook first line "see more" 2026 how many characters
11. img2pdf set dpi 144 page size points pixels high resolution image PDF page dimension math
12. repurpose Instagram carousel to LinkedIn differences cover slide professional B2B tone 2026
13. Ghostscript compress PDF LinkedIn under 10MB downsample JPEG quality command line
14. LinkedIn document post 2026 renders all pages same first page aspect ratio locks subsequent slides letterbox
15. img2pdf --imgsize 144dpi high resolution image half physical size PDF page points example

Pages fetched and read in full: contentin.io LinkedIn post specs, contentdrips.com LinkedIn document posts (July 2026), oktopost.com LinkedIn carousel PDF best practices, dataslayer.ai LinkedIn algorithm Feb 2026, github.com/myollie/img2pdf, manpages.debian.org img2pdf (testing + unstable), igli.app.

---

## FINDINGS

### 1. LinkedIn document-post PDF hard specs (2026)

Consistent across contentin.io, oktopost.com, contentdrips.com, screensnap.pro, sendible.com:

- Max file size: 100 MB (hard platform cap).
- Max page count: 300 pages.
- Accepted formats: PDF, DOC, DOCX, PPT, PPTX. PDF is the only format that renders reliably across all devices and browsers. PPTX/DOCX shift fonts and alignment during LinkedIn's server-side conversion. Always ship PDF.
- Upload path: native document upload ("Add a document"), not a link. This matters, see the link-penalty note in section 2.
- Recommended dimensions: 1080x1080 px (1:1 square) or 1080x1350 px (4:5 portrait). Portrait "occupies the most vertical screen space, which increases dwell time" (oktopost). Landscape 1920x1080 is accepted but sits smaller in-feed.
- Resolution guidance (oktopost): 300 DPI "for print-quality text clarity." Note: this is design-tool advice, not a LinkedIn requirement. LinkedIn does not read DPI to decide display size; it fits the page to the feed column width. DPI only matters for how sharp the embedded raster is when a viewer zooms.
- Safe margin from edges: at least 50 px (oktopost). aicarousels.com safe-zone checker cites more aggressive numbers for the UI-overlaid first slide, see section 4.
- Minimum type: oktopost says 24 pt body minimum in design tools; contentin says 14 pt minimum and flags anything under 8 pt as LinkedIn's "warning zone." Practical read: nothing under roughly 24 px at 1080-wide, and the cover headline should be far larger.

CRITICAL rendering rule (screensnap.pro, contentdrips): do NOT mix aspect ratios inside one PDF. If pages differ, LinkedIn pads the odd ones with white to force-fit, and the effective display ratio is locked by the first page. So every page in the exported PDF must be the identical pixel size. Carter's rig already outputs uniform 2160x2700, so this is satisfied for free as long as no stray page slips in.

### 2. How document posts rank in the 2026 feed

The dominant signal is dwell time, and documents are engineered to farm it. Numbers below are from AuthoredUp (3M+ posts, March 2025 to February 2026), Richard van der Blom's Algorithm Insights report, and vendor blogs citing them. Vendor blogs inflate, so treat exact percentages as directional; the direction is unanimous.

- Document posts generate 39% more reach and 30% more engagement than the average LinkedIn post (AuthoredUp, cited by contentdrips July 2026).
- Average engagement rate by format (dataslayer.ai, Feb 2026, citing van der Blom + Sprout Social):
  - Document posts: 6.60% (highest of any format)
  - Native video (30 to 90s): 5.60%
  - Image + text: 3.20%
  - Text-only: 2.00%
  - Posts with an external link: roughly 60% less reach
- Documents beat video by 278% and text by 596% on engagement per the same source (these are the loud vendor multipliers; the 6.60 vs 2.00 rate comparison is the more sober version of the same claim).
- Only 4.88% of LinkedIn creators post documents regularly (contentdrips). Low-supply format, high-demand signal. This is the arbitrage.
- Documents are 12.92% of all saved posts despite being a small share of volume (contentdrips). Saves are the strongest 2026 distribution signal: one save is worth roughly 5x a like for reach (contentdrips, dataslayer).
- Dwell-time curve (dataslayer, citing LinkedIn guidance): 0 to 3s dwell = 1.2% engagement; 61s+ dwell = 15.6% engagement. A 13x spread. A document that holds someone 15 to 20s across 8 slides sits high on that curve. dataslayer cites a 1.45x reach multiplier for well-built 8 to 10 slide documents.
- Three algorithmic factors LinkedIn rewards on documents (dataslayer): dwell time, saves, and completion (how many slides get viewed). Completion tracking means the LAST slides matter, not just the cover: getting people to swipe to the end is itself a ranked signal.
- First 30 to 60 minutes determine reach trajectory (van der Blom, 1.8M-post report). Strong early engagement in that window promotes the post to wider distribution.
- Keep people ON platform. External links get suppressed roughly 60% (dataslayer). A document keeps the swipe inside LinkedIn, which is exactly what the algorithm wants. So the CTA to certgames goes in the CAPTION or the final slide as text, never as a link that pulls users off-platform in the post body.

Background (older, still cited): LinkedIn publicly confirmed in 2025 that document posts drive higher dwell time and that dwell time is a key distribution input. That is the origin of the whole document-post meta.

### 3. Ideal slide count and caption for the professional audience

- Slide count sweet spot: 6 to 10 slides, engagement drops after 10 to 12 (contentdrips, dataslayer). Oktopost says 5 to 15. Cross-platform sources note the LinkedIn default can run slightly longer than Instagram (10 to 15 for LinkedIn vs 7 to 10 for Instagram per one source) because professionals will actually study dense slides. For Carter, keeping decks at 8 to 10 works for both platforms with no re-cut.
- Words per slide: 40 to 60 words max, one idea per slide (contentdrips: 40 to 50; oktopost: under 60 words, 6 to 8 lines max). This aligns with the poster-not-newspaper mandate for Instagram, so the same tighter deck serves both.
- Add a progress cue ("3 of 8") to gamify swiping (contentdrips). Helps completion, which is ranked.
- Final slide: a specific CTA, not "like and share" (contentdrips).
- Caption character mechanics (connectsafely.ai, authoredup):
  - "See more" truncation: about 140 characters on mobile, about 210 on desktop. Write the hook to land inside the mobile 140.
  - Total caption for a document post: 300 to 500 characters is the recommended range, because the slides carry the payload and the caption is just the on-ramp. Full LinkedIn post cap is 3,000 characters.
  - 60 to 70% of readers never expand the caption, so the first line before "see more" is the whole ballgame.

### 4. LinkedIn UI overlay and the cover-page safe zone

The document-post first slide is shown in-feed with LinkedIn chrome painted over it: swipe arrows on the sides and a document title banner. On mobile the banner sits at the bottom and can obscure a meaningful chunk of the first page (oktopost, aicarousels.com safe-zone checker).

- Practical rule (oktopost + cross-platform sources): keep all critical text, logos, and CTAs out of the bottom 15 to 20% of the cover slide. At 1350 px tall that is roughly the bottom 200 to 270 px. Keep the hook vertically centered / upper-two-thirds.
- aicarousels.com safe-zone checker numbers (for its overlay template): stay 108 px below the top, leave 320 px free at the bottom, 60 px left, 120 px right. These are that tool's specific values, not an official LinkedIn spec, but they are directionally consistent: the bottom is the danger zone and the right side takes an arrow.
- Another cross-platform source: center main content horizontally and stay at least 100 px off every edge.
- Only the FIRST page gets the banner overlay in-feed; interior slides are seen full-bleed once the viewer taps in. So the safe-zone tax is a cover-slide-only cost. Design interior slides edge-to-edge; design the cover with a bottom gutter.

### 5. Cover-page differences for a professional (LinkedIn) audience vs Instagram

Sources: carouselli, oktopost, socialchamp, morphica.studio, buffer, contentin. The through-line:

- Tone: Instagram rewards personal, relatable, visual-first. LinkedIn rewards structured, insight-driven, text-forward. "Unlike Instagram where imagery can carry the slide, LinkedIn audiences expect to read."
- Cover copy: LinkedIn covers should lead with a specific claim or data point ("B2B pages that post carousels see 22% higher engagement") plus a clear topic statement, one logo, contrasting background, and an explicit swipe indicator ("Swipe for the full breakdown"). Avoid generic titles ("Tips for LinkedIn", "Did you know?"): they do not earn the swipe.
- Dedicate about 50% of creative effort to slide one (contentdrips). It is the only slide that earns the swipe and the only one carrying the UI overlay.
- Palette: one or two accent colors on a consistent base signals credibility on LinkedIn. Avoid rainbow gradients / neon. This actually lines up with Carter's brutalist restraint; his decks are already on the right side of this.
- What to strip when moving an Instagram deck to LinkedIn: heavy meme energy and Instagram-culture references. What to strip going the OTHER way (LinkedIn to Instagram): dense data slides, LinkedIn-feature references, and heavy jargon. For Carter's cyber-cert content the substance travels fine; the main edit is the cover HEADLINE and the CTA slide, plus a slightly more buttoned caption.
- The safest single dimension for BOTH platforms is 1080x1350 (4:5 portrait). It is Instagram-native and it is a fully supported, uncropped LinkedIn document ratio. So Carter does NOT need a separate square re-render for LinkedIn: the same 2160x2700 PNGs feed both. That is the key efficiency finding.

### 6. Open-source, headless PNG-to-PDF assembly (the actual tooling)

Two real constraints collide here:
(a) LinkedIn wants a clean uniform PDF, and (b) Carter's inputs are 2160x2700 PNGs, and PNG-in-PDF via flate encoding BLOATS file size.

#### Tool of record: img2pdf (josch/img2pdf)

- Canonical, actively maintained repo: gitlab.mister-muffin.de/josch/img2pdf (GitHub mirrors: josch/img2pdf, jbarlow83/img2pdf, myollie/img2pdf, DarwinAwardWinner/img2pdf are all forks/mirrors of the same josch codebase). Install via uv-managed venv (pip package name img2pdf, PyPI) or system package. Pure headless CLI, no GUI, no network.
- Why img2pdf over ImageMagick: img2pdf embeds image data WITHOUT re-encoding (lossless), so JPEG/JPEG2000 go in byte-for-byte. ImageMagick's `convert`/`magick` re-rasterizes and degrades quality unless you fight it with `-quality 100`, and even then it is a full re-encode. img2pdf is the technically correct wrapper.
- The PNG file-size trap (verified, from josch README and Debian manpage): "Raster images in other formats (like png, gif or tif) will be included using the lossless zip/flate encoding which usually leads to a significant increase in the PDF size if the input was for example a png image." Reason: PDF's flate is worse at compressing bitmaps than PNG's own filters, so a PNG re-wrapped as flate-in-PDF gets BIGGER. Only JPEG and JPEG2000 are embedded with zero re-encode and stay small.
- Consequence for Carter: piping 2160x2700 PNGs straight through img2pdf yields a large PDF (each full-bleed 2160x2700 flate page can run several MB; a 10-slide deck can push toward or past the "keep under 10 MB for fast load" guidance even though it is nowhere near the 100 MB hard cap). The fix is a JPEG intermediate.

#### The page-size math (load-bearing, verified by arithmetic)

img2pdf default DPI is 96.00 when the image has no embedded DPI. At 96 DPI a 2160 px image becomes 2160/96 = 22.5 in = 1620 pt wide, which is oversized. To make a 2160x2700 PNG land on an exact 1080x1350 pt page (the LinkedIn 4:5 page in PDF points, 1 pt = 1/72 in), you need 144 DPI:

- 2160 px / 144 dpi = 15.0 in = 1080.0 pt
- 2700 px / 144 dpi = 18.75 in = 1350.0 pt

So the correct flag is `--imgsize 144dpi` (sets the image's physical size at 144 dots/inch). This yields a 1080x1350 pt page carrying the full 2160x2700 raster. Do NOT trust the "1080ptx1350pt" one-off examples floating around unless you also confirm the raster is not downscaled; `--imgsize 144dpi` is the clean way to say "half the physical size, full pixels."

#### Recommended pipeline (concrete, headless, offline)

1. shotpls renders each slide HTML to a 2160x2700 PNG (existing step).
2. Convert each PNG to a high-quality JPEG. This is the single most important step for LinkedIn file size. Use Pillow (uv-managed) at quality ~92 and 4:4:4 chroma, or ImageMagick `magick slide.png -quality 92 slide.jpg`. JPEG at q92 on flat brutalist type/graphics is visually lossless in-feed and cuts file size dramatically vs flate PNG.
3. Assemble losslessly with img2pdf so the JPEGs go in without re-encode:
   `img2pdf --imgsize 144dpi --output linkedin.pdf slide-01.jpg slide-02.jpg ... slide-N.jpg`
   (or shell-glob a zero-padded sequence so page order is guaranteed).
4. Optional guard: if the deck is graphic-heavy and still over ~10 MB, downsample/re-compress once with Ghostscript:
   `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 -dDownsampleColorImages=true -dColorImageResolution=150 -dNOPAUSE -dQUIET -dBATCH -sOutputFile=linkedin-small.pdf linkedin.pdf`
   Ghostscript presets `-dPDFSETTINGS=/ebook` (150 dpi target) or `/screen` (72 dpi, too soft) are the coarse levers; the explicit `-dColorImageResolution` route gives finer control. Only reach for this if step 3's output exceeds budget; every gs pass is a re-encode, so skip it when not needed.

Alternatives considered:
- ImageMagick `magick *.png slide.pdf`: works headless but re-rasterizes and is quality-lossy by default; not recommended as the assembler. Fine as the PNG-to-JPEG converter in step 2.
- Ghostscript alone cannot assemble images into a PDF; it is a post-processing compressor only.
- Pillow can write a multi-page PDF directly (`img.save('out.pdf', save_all=True, append_images=[...])`) which keeps it in one Python/uv dependency, but Pillow re-encodes to JPEG internally at its own quality and does not give the clean lossless-embed guarantee img2pdf does. img2pdf + a JPEG intermediate is the cleaner separation of concerns.
- Reference SaaS doing exactly this crosspost: igli.app (Instagram carousel to LinkedIn PDF, accepts PNG/JPG/WebP, "pixel-perfect", sample output "6 pages, 2.4 MB", sub-5s). Confirms the target: a ~6 to 10 page deck should land around 2 to 4 MB, well under the fast-load ceiling. That is the number to engineer toward.

---

## SO WHAT FOR US

1. One render feeds both platforms. Keep every deck at 1080x1350 (Carter already does). 4:5 is Instagram-native AND a fully supported, uncropped LinkedIn document ratio. No square re-render, no second design pass for LinkedIn. The ONLY per-platform edits are: swap the cover HEADLINE to a specific-claim/data-point framing, add an explicit "Swipe" cue, and rewrite the CTA slide + caption in a more buttoned tone. Everything else travels.

2. Build a `just linkedin-pdf` recipe into the carousel rig. Steps: PNG -> JPEG q92 (Pillow or magick) -> `img2pdf --imgsize 144dpi -o deck.pdf slide-*.jpg`. That `--imgsize 144dpi` is the exact value that maps 2160x2700 px to a 1080x1350 pt page; it is verified arithmetic, not a guess. Gate on a 10 MB target with an optional Ghostscript downsample only if exceeded. All offline, all uv/pnpm-clean, no SaaS.

3. Do NOT feed PNGs straight to img2pdf. Flate-wrapping PNGs bloats the PDF (worse compression than PNG itself). The JPEG intermediate is mandatory for hitting the "under 10 MB fast-load" number. Target ~2 to 4 MB for an 8 to 10 slide deck (igli's real output confirms this is achievable).

4. Cover slide carries a safe-zone tax that interior slides do not. LinkedIn overlays a title banner (bottom, mobile) and swipe arrows (sides) ONLY on the first page in-feed. Keep the cover's hook, logo, and CTA out of the bottom 15 to 20% (roughly the bottom 200 to 270 px of 1350) and off the right edge. Interior slides can stay full-bleed. This is a small, mechanical change: the carousel skill should generate a LinkedIn cover variant with a bottom gutter, or just enforce the gutter on cover slides globally (Instagram tolerates the extra breathing room fine).

5. Document posts are the single highest-leverage format on LinkedIn right now and almost nobody ships them (only ~4.88% of creators post documents regularly). 6.60% engagement, highest of any format, and saves are worth ~5x a like. Carter's save-heavy image-artifact decks (his own data: 2,700 to 6,600 saves) are already tuned for the exact signal LinkedIn ranks hardest. Crossposting them as documents is close to free upside.

6. Optimize for completion and saves, not just the cover. LinkedIn ranks how many slides get viewed and how many saves land. Add a "3 of 8" progress cue to pull people to the end, make the final slide a genuine save-worthy summary/CTA, and put the certgames CTA in the caption or as on-slide text, never as an external link in the post (links get ~60% suppression and kill dwell by pulling people off-platform).

7. Caption is a 140-character hook, not a body. Write the LinkedIn caption to deliver the hook inside the mobile "see more" cutoff (~140 chars), total 300 to 500 chars, because the slides carry the payload and 60 to 70% never expand it.

---

## GAPS / WHERE SEARCHES DEAD-ENDED

- No first-party LinkedIn engineering doc for the exact 2026 dwell-time weighting was reachable; every algorithm number traces to AuthoredUp's 3M-post study, Richard van der Blom's report, or vendor blogs restating them. Directionally unanimous but the precise multipliers (278%, 596%, 1.45x, 6.60%) are vendor-reported, not LinkedIn-published. Treat as directional.
- The exact pixel geometry of the current LinkedIn mobile document-post banner and arrow overlay is not officially published; the 15 to 20% bottom gutter and the aicarousels.com 108/320/60/120 px numbers are best-available community/tool values, not a LinkedIn spec. Worth a one-time manual visual QA on a real posted deck to pin the true safe box on Carter's own device.
- No source confirmed whether LinkedIn server-side re-compresses uploaded PDF pages (as it does for feed images). Could not verify a JPEG-q92 source actually survives to the viewer untouched vs being re-encoded by LinkedIn. Assume some server-side processing and do not over-invest in q98+.
- img2pdf's precise interaction between `--imgsize 144dpi` and an embedded DPI chunk already present in a shotpls PNG/JPEG was not testable here. If shotpls stamps a DPI into the file, that may override the default and change page size. This is a 2-minute empirical check once in the rig: render one deck, open the PDF, confirm the page mediabox reads 1080x1350 pt.
