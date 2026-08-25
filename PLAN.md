# PLAN

## Enoki UI migration (in progress)

### The rule

- Do NOT push to remote (`origin/main`) until every blog post has finished migrating to the new house-style figures.
- Push to main = GitHub Pages deploys mrzk.io. Until the migration is done, all commits stay local on vm-frank.
- Local commits are normal and expected. Push is the gate.

### Why

Migrated posts would mix house-style `<en-*>` figures with the old matplotlib SVG/PNG exports. The site ships once the visual language is consistent.

### Rebuild chain

`franky-ui` (core) -> `ui-wc` (bundle) -> `ui-hugo` (theme) -> this repo (`hugo mod vendor`).

Commands and gotchas live in each sibling repo's `AGENTS.md`. Do not hand-edit `_vendor/`; vendor it.

### Post status

| post | figures | state |
| --- | --- | --- |
| qmlx-optimising-multiplexing-and-dogfood | 6 SVG | DONE (5 figures migrated; 1 SVG was never referenced). Delete old SVGs after sign-off. |
| qmlx-maximising-ai-psychosis-minmaxing-mac-studio | 4 SVG (chart-ab-cache, chart-decode, chart-prefill, chart-throughput-lie) | DONE (4 figures: 2 grouped bar, 2 line). Sign-off given; old SVGs deleted (`42cb4c5`). |
| collectable-video-games-market-manipulation | 7 chart PNG (wata_*) | DONE (6 figures: 3 bars, 1 dense scatter, 1 trend line, 1 histogram). Andryo dropped FIG.07 avg-price figure + "trending downwards" claim (data showed avg RISING); 7 wata PNGs deleted (`b24e04e`), wata_scatter.json kept. Awaiting sign-off; blog not pushed yet (more posts to migrate). |
| building-optimised-gis-applications | 4 mermaid diagrams (+1 external bbox.png, not a chart) | DONE (4 figures: 3 topologies, 1 auto-playing sequence; mermaid blocks replaced, data in fig-*.json). Added `topology` + `sequence` shortcodes (inline or page-resource JSON) + flagship title/tag/hint/legend/aria props (franky-ui `97c5cc9`, ui-wc `4032617`, ui-hugo `c71df24`). Mermaid shortcode kept for charted-zero-deps. Awaiting sign-off. |
| did-covid19-make-trump-president | 6 chart PNG (unvax, long-covid, poverty, votes-*) | DONE (6 figures: 2 exit-poll stacked bars, 3 county scatters with regression trend + 95% CI band, 1 grouped long-covid histogram on a 1e-3 density scale). Data re-derived from marzukia/covid-trump-analysis (notebook + county CSVs, 10k Monte Carlo): r = 0.608 / 0.258 / 0.147, matching the originals (0.609 / 0.258 / 0.149); exit-poll bars pixel-verified against the PNGs. Added `y-fmt` / `trend` / `trend-band` to en-scatter (franky-ui `758314f`, ui-wc `2e56468`, ui-hugo `5762b45` + `550b6da`). Awaiting sign-off. |
| election-results-advanced-analytics | 3 chart PNG (age_party, housing_party, votes_seats_party) + 1 map | DONE (6 figures: the 2x2 votes/donations/cost grid split into 4 single-series bars, 1 five-segment age stack, 1 grouped housing chart). The map (elections-map-gis.png) is a methodology image, not a chart — kept as-is. Vote/donation/cost values read off the PNGs; age + housing values pixel-measured from the unlabeled PNGs (PIL). Added `fmt` prop (compact/num/usd) to en-bar + six part colors for 5+ stacked segments (franky-ui `a0aa9ef`, ui-wc `effd649`+`0b7e0fe`, ui-hugo `e3d9d97`). Awaiting sign-off. |
| buyers-guide-to-melbourne | 7 map PNG | DONE (7 GeoMap figures: rail/tram network, transit + cycling 6-class choropleths, schools/income/gentrification/scored 5-class choropleths, all with POA overlay + labels + scale bar). Added GeoMap component + `map` shortcode with file-backed geo JSON (franky-ui `bb6cfb6`+`f57a111`, ui-wc `b2a07f5`, ui-hugo `20696fa`). Map bin ramp = hue rotation (blue -> green -> amber -> accent) mirroring the originals' RdYlGn; two-hue lightness ramp read "red sea" because classes 4+5 cover 49% of the pt map. **Re-rendered with MapLibre GL + Mapbox Light base map** (Andryo: "ugly label", "Plz use maplibre") — real pan/zoom, scale bar, click-to-reveal postcode popups (replaced always-on chips); narrow-width network tuning so the rail/tram map isn't a beaded smear; shims the `mapbox://` protocol MapLibre v6 dropped; fixed a `resolveRamp` color-mix inversion that washed out the high bins (franky-ui `a3128af`+`0715ece`, ui-wc `2eb9a18` base.ts style-attr clobber fix, ui-hugo `1b3a09e`+`7fcec45` token/style + workers + mobile table scroll). Awaiting sign-off. |
| remaining posts | covers, photos, or nothing | no chart figures |

Cover and thumbnail images are not part of the migration.

### Per-post process

1. Extract the data from the original figure (SVG: parse paths; PNG: measure with PIL).
2. Replace the image with the matching shortcode (`{{< bar >}}`, `{{< line >}}`, `{{< donut >}}`, ...).
3. Rebuild the chain, `hugo mod vendor`.
4. Pixel-verify against the original (the original is the reference; measure both rendered PNGs with PIL and trust the pixels).
5. Check rendered HTML: zero `#ZgotmplZ`, zero percent-encoded JSON in component attributes.
6. Commit locally. Update this file's status table.

### Done when

- Every chart figure on every post is a house-style figure.
- Old chart SVG/PNG files deleted from the post directories.
- This file says DONE and Andryo signs off.
- Then: push main, site deploys.
