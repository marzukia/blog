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
| did-covid19-make-trump-president | 6 chart PNG (unvax, long-covid, poverty, votes-*) | TO DO |
| election-results-advanced-analytics | 3 chart PNG (age_party, housing_party, votes_seats_party) + 1 map | TO DO (confirm map scope) |
| buyers-guide-to-melbourne | 7 maps | confirm with Andryo whether maps are in scope |
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
