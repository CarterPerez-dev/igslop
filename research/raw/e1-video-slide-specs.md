<!-- © AngelaMos | 2026 | e1-video-slide-specs.md -->

# Division E1: Instagram Video Slide Specs and Animated Carousels (mid-2026)

Research date: 2026-07-10. Recency priority: 2026 material foregrounded. Older data labeled as background.
Scope: exact video-slide specs, mixed-media prevalence, retention/reach lift, named examples, and cinemagraph vs motion-graphics aesthetics. Plus the programmatic-generation angle that maps to Carter's headless-Chrome HTML pipeline.

## SEARCHES RUN

1. Instagram carousel video slide specs 2026 resolution fps bitrate 4:5
2. mixing video and photo slides Instagram carousel 2026 retention
3. Instagram carousel 20 slides limit video 2026 max photos videos per carousel
4. Meta official Instagram feed video specifications carousel aspect ratio resolution 2026
5. animated carousel slides Instagram accounts examples motion graphics 2026
6. cinemagraph subtle loop Instagram carousel slide design 2026
7. "hold and scroll" Instagram carousel how to make After Effects export video slides
8. best animated Instagram carousels 2026 creators motion design accounts to follow
9. Instagram carousel video slide compression export settings avoid blur mp4 handbrake 2026
10. Instagram carousel video slide autoplay muted loop feed 2026 behavior
11. creators using video slides in carousels case study reach lift 2026 mixed media
12. motion designer Instagram carousel animated slides 2026 "@" account frame by frame
13. panoramic seamless carousel Instagram creators example accounts 2026 named
14. render HTML CSS animation to mp4 video puppeteer headless chrome ffmpeg frames 2026
15. tech cybersecurity creator Instagram carousel motion video slide 2026 example
16. Instagram carousel 3:4 aspect ratio new 2026 feed portrait update
17. carousel with music pushed into reels feed Instagram 2026 audio slideshow reach
18. "can't add music" Instagram carousel with video slide 2026 restriction

Pages fetched and read: heyorca.com media specs 2026, postnitro.ai video-in-carousel, kashu.co animated-carousel, contentdrips.com carousel size/format, growthscribe.com instagram-video-size, trymypost.com carousel algorithm (x2), buffer.com state-of-social-media-engagement-2026, dsplce.co claude-animation-to-video, github.com/dtinth/html5-animation-video-renderer.

## FINDINGS

### 1. Exact video slide specs (cross-verified across sources)

Container/format: MP4 (preferred) or MOV. Source: heyorca 2026, contentdrips 2026-05, growthscribe.
Video codec: H.264, High profile. Do NOT use H.265/HEVC. growthscribe states HEVC "often glitches during the Instagram upload process." Meta's ad spec (superscale/adsuploader) confirms H.264 is required for all Meta video uploads.
Audio codec: AAC. Sample rate cited as 44.1 kHz (heyorca) or 48 kHz (carouselpost/contentdrips-adjacent). Audio bitrate 256 kbps (growthscribe) up to 256 to 320 kbps (carouselpost). 48 kHz AAC is the safer modern choice.
Resolution for 4:5: 1080 x 1350 px. This is the recommended default. growthscribe: "Standard Size: 1080 x 1350 (4:5)." Also valid: 1:1 at 1080 x 1080.
Frame rate: 30 fps recommended, constant (CFR). growthscribe and heyorca both flag that 60 fps "often gets compressed more heavily by Instagram, leading to a softer look," so 30 fps is the sweet spot. postnitro: "Frame rate: 30 fps constant."
Bitrate: two credible bands appear.
  - Conservative (matches Instagram's own recommended encode): 3,500 to 5,000 kbps for 1080p. Source: growthscribe, heyorca.
  - Quality-max (survives IG re-encode better): VBR 2-pass, target 8 to 12 Mb/s, max 16 Mb/s, keyframes every 2 seconds (GOP approx 60). Source: carouselpost / carouselli export-settings guidance.
  Reconciliation: Instagram re-encodes everything on ingest, so uploading a higher source bitrate (8 to 12 Mb/s) gives the re-encoder more to work with and reduces visible blocking. Upload high, let IG down-convert.
Color: Rec.709 for video, sRGB for stills. carouselpost. Using Adobe RGB shifts colors after IG conversion.
Max file size per video: 4 GB. Consistent across heyorca, contentdrips, growthscribe, Meta ad specs.
Max duration per video slide: up to 60 seconds. Consistent across postnitro, contentdrips, carouselli. (This is a hard ceiling, not a target. See retention section for the real target of 5 to 10 s.)

### 2. Carousel structural limits (2026)

Max slides: 20 total (photos + videos combined), up from the old limit of 10. Minimum 2. Sources: carouselli 2026, postnitro 20-photo guide, storrito, socialrails "Up to 20 Slides in 2026." Note: several spec pages (contentdrips, some Meta-ad references) still quote the older "10" because ad-placement carousels and organic carousels diverged; organic is 20.
Aspect-ratio lock: the FIRST slide sets the crop/aspect for the entire carousel. Every subsequent slide, video or image, is forced to the first slide's ratio. If slide 1 is square, all video slides get square-cropped. Universal across every source. Practical rule: make slide 1 a 4:5 (1080x1350) frame and keep every asset 4:5.
Mixing is fully supported: "Instagram allows mixed-media carousels with both images and video slides. Videos in carousels follow the same dimensional guidelines as images." Source: contentdrips 2026-05. Order is free (any sequence of stills and clips).
2026 editing update (March 2026): you can now reorder and delete carousel slides after posting, but still cannot ADD new slides post-publish. Source: carouselli, inro.social.
New 3:4 option (1080 x 1440): Instagram added a third vertical ratio in 2026, between 4:5 and 9:16, giving roughly 7 percent more vertical space than 4:5, and matching the profile-grid 3:4 preview so cover slides stop getting top/bottom cropped on the grid. BUT the uploader still defaults to 4:5, and 4:5 "remains the format with the longest engagement track record." Source: inro.social, growthscribe size-ratio, carouselpost size guide. Recommendation: stay 4:5 for now; 3:4 is a grid-cosmetics upgrade, not an engagement upgrade.

### 3. Autoplay / loop / sound behavior (CRITICAL for design)

Video slides autoplay MUTED. Design for sound-off. Source: trymypost carousel algorithm 2026.
Carousel video cards play ONCE and STOP. They do NOT auto-loop the way a standalone feed video or Reel does. Verbatim from trymypost: "Instagram carousel video cards may not auto-loop. The video plays once and stops, which changes how you should design the ending frame." This is the single most important design constraint: the last frame of every video slide is what the viewer stares at, so the clip must END on a legible, composed still (the "resting frame"), not mid-motion.
Music: as of a 2024 update, Instagram lets you add music to carousels that contain VIDEO slides (previously music was photo-only carousels). Confirmed via Lindsey Gamble (industry analyst) post on Threads: "Instagram now lets users add music to video carousels." So a mixed video+still carousel can carry a trending track.
Music unlocks Reels-feed reach: attaching audio makes a carousel eligible for Reels-level discovery. It "shows up as a carousel in your feed but as Reels in the explore/reels surface." Sources: metricool add-music-2026, robeandsignet slideshow-reel, socialz.ai. This is the hybrid play: carousel-depth engagement PLUS Reels-reach in one post.

### 4. How many creators mix video with static (prevalence)

Only about 7 percent of carousels currently use the mixed-media (image + video) approach, described repeatedly as "a major opportunity gap." Sources: postnitro video-in-carousel and the mixed-media stat echoed across carouselli/trymypost. Background caveat: this figure recurs across multiple 2026 blog sources without a single named primary dataset, so treat "7 percent" as directionally true (mixing is still rare) rather than a hard measured number.
Takeaway: video slides are UNDER-used. Being early on high-craft video slides is a differentiation lever, not a crowded field.

### 5. Does animated/video slides measurably lift retention or reach

Mixed-media (image + video) carousels: 2.33 percent average engagement rate, vs 1.80 percent image-only and 1.74 percent to 1.45 percent for single-format posts. Sources: postnitro (2.33 vs 1.74 image-only vs 1.45 video-only), and the 2.33 vs 1.80 image-only pairing echoed in trymypost/carouselli. So mixing video INTO a carousel is the top-performing configuration measured.
Cinemagraph / subtle motion on slide 1: "Adding subtle motion to the first slide (via cinemagraphs or subtle zooms) can increase initial stop-scroll power by up to 22 percent compared to static headers." Source: socialhabitmarketing 2026 guide, repeated in scrolo and creatorflow. Background caveat: "up to 22 percent" is a blog-cited figure without a named study; use as a hypothesis to A/B test, not gospel.
Mid-carousel video "attention reset": highest-performing 2026 carousels interspace 5 to 10 second video clips between static photos to "reset the viewer's attention span" and spike dwell time. Source: creatorflow, postnitro. The mechanism is that IG's 2026 ranking leans on active dwell time and swipe-through velocity, so a motion slide that re-hooks attention mid-deck lifts completion.
Carousels as a format (background, for context): highest-engagement format in 2026. Buffer's 2026 report (52M+ posts, historical dataset skewing 2025) puts carousels at 6.90 percent median engagement vs 4.44 percent single image vs 3.31 percent Reels, and "carousels earn roughly 109 percent more engagement per person reached than reels." Mosseri (per creatorflow) confirmed carousels get 1.4x more reach than single-image posts. Reels still win raw REACH (36 percent more reach than carousels, 125 percent more than single images, per Buffer's 4M-post Jan 2022 to Oct 2024 slice), which is exactly why music-on-carousel matters: it borrows Reels reach.
Honest caveat from the same sources: pure-static carousels still win SAVE rate for educational content; video-heavy carousels win WATCH TIME. Source: trymypost. So video slides trade save-rate for dwell-time. For an educational cyber niche where saves are the KPI, the right move is 1 to 2 motion slides inside an otherwise static deck, not an all-video deck.

### 6. Optimal counts and durations (the target, not the ceiling)

Slide count sweet spot: 7 to 10 slides for maximum retention; several sources say 8 to 10; performance drops after slide 12 unless the content is "highly serialized." Sources: postnitro, trymypost, socialrails.
Completion gate: 10-slide carousels only maximize dwell time "if the completion rate stays above 60 percent." trymypost.
Per-video-slide duration TARGET: 5 to 10 seconds (not the 60 s max). trymypost, creatorflow, postnitro all converge on 5 to 10 s for retention.
Serialized data point: 5 to 7 slide carousels generate 3.4x more saves and 2.1x more shares than static images. trymypost (Q1 2026).

### 7. Cinemagraph aesthetic vs full motion graphics on slides

Two distinct 2026 techniques, and the sources treat them differently:
Cinemagraph / subtle-loop (mostly still, one small looping element): positioned as the SLIDE-1 stop-scroll play and the mid-deck "attention reset." The winning "Hybrid Method" from socialhabitmarketing/creatorflow: Slide 1 = static hook, Slide 2 = 3-second looping video or cinemagraph showing a process, Slides 3 to 5 = static value, final = static CTA. Subtle motion signals "high-effort, high-retention" to the algorithm without overwhelming the message. This is the recommended default for educational/authority content.
Full motion graphics (whole slide animates, kinetic type, animated icons, micro-transitions): described as effective for grabbing scroll attention but with the risk of "overwhelming the message." Best used sparingly. The consensus 2026 rule: "subtle animation, looping text movement, animated icons, micro-transitions" bring a post to life "without overwhelming." Source: socialhabitmarketing, versacreative trends.
Note the contradiction with Carter's "posters not newspapers" goal: full kinetic motion on a data-dense slide re-introduces busyness. The cinemagraph/one-moving-element approach is the aligned technique, one focal motion per slide.

### 8. Named examples (thin, honestly)

This was the weakest vein. Specific creator @handles doing video-slide carousels well did not surface in search; blog sources abstract away the accounts. What IS named:
- Manu Muraro / Your Social Team (yoursocial.team): the industry educator who popularized and named the "Hold and Scroll" carousel trend. Not a video-slide technique (see below) but the leading named voice on animated-feeling carousels.
- Disney: cited as shipping a seamless/panoramic "action shot" carousel for the Ice Age 20th anniversary. Source: postplanify/planable seamless-carousel roundup.
- @panoramaker.app: an account/tool (PANO Carousel Collage Maker) for seamless panoramic carousels.
- @lindseygamble_ (Lindsey Gamble, Threads/blog): analyst who documented the video-carousel music unlock.
Gap flagged: no strong list of individual creators shipping high-craft VIDEO-slide carousels emerged. This is a real hole (see GAPS).

### 9. "Hold and Scroll" is NOT video slides (important disambiguation)

The "Hold and Scroll" trend (Manu Muraro / Your Social Team) is a FLIPBOOK made of STATIC image slides, not video. Each slide has a slight incremental change; when the user holds the pager dots and swipes fast, the stills animate like a flipbook. Verbatim: "each slide contains a slight visual change" and "when swiped quickly, the images animate like a flipbook." Tool cited: Canva. Dimensions: 1080x1350. Source: yoursocial.team.
Why this matters for us: this is a MOTION-FEEL effect achievable with pure PNG slides, which is exactly Carter's current shotpls output. It gets flipbook animation with zero video encoding. Cheapest possible "animated" carousel.

### 10. Programmatic generation: HTML/CSS to MP4 (maps directly to Carter's pipeline)

Carter already renders one standalone 1080x1350 HTML file per slide to PNG via headless Chrome (shotpls). Extending that same architecture to VIDEO slides is a solved problem in 2026. Proven approaches:
- dtinth/html5-animation-video-renderer (GitHub): the reference pattern. The HTML page must expose two functions: getInfo() returning {fps, numberOfFrames}, and seekToFrame(frameNumber) which displays that exact frame (may return a promise, or a data:image/png;base64 string). A Puppeteer driver calls seekToFrame for every frame, screenshots it, and pipes frames straight to ffmpeg with NO temp files on disk. Tested at 1080p60. Supports MOV with alpha via --alpha. Determinism requirement: CSS keyframe animations are explicitly UNSUPPORTED because they are wall-clock nondeterministic; you must drive animation state as an explicit function of frameNumber. This is the key architectural rule: parametrize motion by frame index, not by CSS animation-duration.
- htmlrec / hrec CLI (dsplce.co, "Claude animation to video"): brew install dsplce-co/tap/htmlrec ffmpeg, then hrec render animation.html -o out.mp4. Defaults 1280x720, 30fps, 5s; override with --width --height --fps --duration. Explicitly built to render Claude-generated self-contained HTML/CSS animation. Determinism via stepping the page frame-by-frame at precise timestamps then handing the sequence to ffmpeg, "a screen recorder can't promise that."
- html-video (silenceper, 2026-06): coding-agent-oriented tool that builds storyboards, expresses frames as HTML/CSS, and renders real MP4 locally via Chromium + ffmpeg from a prompt/article/repo. Confirms the agent-driven HTML-to-MP4 pattern is a live 2026 workflow.
General ffmpeg target for these slides: H.264 (libx264), pix_fmt yuv420p (required for IG/Chrome-safe playback), 30 fps CFR, 1080x1350, high source bitrate (8 to 12 Mb/s) or CRF ~18 to 20. The specific tools abstract exact ffmpeg flags, but yuv420p + libx264 + 30fps CFR is the safe encode.
After Effects alternative (for reference, not our pipeline): kashu.co builds a master comp (10800x1350 for a 10-slide 4:5 deck), lays slides side by side, then the deck is split into individual slide videos for upload. Heavier, manual, off-pipeline for us.

## SO WHAT FOR US

1. We can generate video slides from the SAME HTML-per-slide architecture we already use. Do not adopt After Effects. Build a "shotpls-video" sibling: an HTML slide exposes getInfo() + seekToFrame(n) (per the dtinth pattern), a Puppeteer/CDP driver steps frames, pipes to ffmpeg (libx264, yuv420p, 30fps CFR, 1080x1350). Motion is parametrized by frame index, never CSS animation-duration (nondeterministic renders will desync). This is a weekend-scale tool build, fully in Carter's wheelhouse, and it lets us keep every slide individually editable exactly like now.

2. The winning config is a mostly-static deck with 1 to 2 motion slides, not an all-video deck. Data: mixed-media carousels lead engagement at 2.33 percent, but pure-static still wins SAVES (our KPI for educational cyber content). So: static hook, one cinemagraph/subtle-motion moment (slide 1 or a mid-deck "attention reset"), static value, static CTA. One focal motion per slide. This is also the ONLY motion approach that respects Carter's "posters not newspapers" thesis, full kinetic motion on a data-dense slide re-introduces busyness.

3. Design every video slide to END on a legible resting frame. Carousel video cards play once and STOP (they do not loop like Reels). The last frame is what the viewer reads. Motion should resolve INTO the composed still, so a clip that reveals a headline should hold the finished headline on its final frame. This also means our existing static slide design IS the target end-state of each animated slide.

4. Autoplay is muted. Every video slide must be 100 percent legible with sound off. No reliance on audio for meaning. This matches how we already build stills. Captions/on-screen text carry everything.

5. Cheapest win first: the "Hold and Scroll" flipbook needs ZERO video encoding. It is N static PNG slides with incremental change, animated by the user's fast swipe. We can ship this TODAY with current shotpls by generating a slide sequence where one element advances per frame (a counter climbing, a bar filling, a line threading across slides). Prototype this before building the MP4 pipeline, it de-risks the "motion" thesis for free.

6. Lead slide 1 at 4:5 (1080x1350) and keep every asset 4:5 so the ratio-lock never crops a video slide. Skip 3:4 for now (grid cosmetics only, no engagement upside). We can generate video slides at 1080x1350 natively.

7. Add a trending track to unlock Reels-feed reach. Since 2024, music works on carousels that contain video slides. A mixed static+video deck WITH audio shows as a carousel in-feed but surfaces in Reels/explore, borrowing Reels reach while keeping carousel engagement depth. Given Reels out-reach carousels by 36 percent, this is the single highest-leverage distribution move. Wire "recommend a track" into the carousel workflow.

8. Per-slide clips: target 5 to 10 seconds, not the 60 s ceiling. Keep decks at 7 to 10 slides, aim for >60 percent completion. Upload high source bitrate (8 to 12 Mb/s), 30fps CFR, H.264 High, yuv420p, AAC 48 kHz, MP4, and let Instagram down-convert. Never HEVC/H.265 (upload glitches). sRGB stills, Rec.709 video.

9. Differentiation is real: only ~7 percent of carousels mix video. High-craft, deterministic, code-generated motion slides in a cyber-authority niche is close to an empty lane. This directly serves the "best carousels on Instagram" goal.

10. Named-account intel is a gap. We did not find strong individual creators shipping video-slide carousels to model against. Next research pass should manually browse Instagram (motion-design and B2B-marketing carousel accounts) rather than rely on blog roundups, and pull specific decks to reverse-engineer.
