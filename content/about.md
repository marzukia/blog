---
title: "About"
date: 2026-07-12T00:00:00Z
lastmod: 2026-10-12T00:00:00Z
description: "Andryo Marzuki: climate-risk data platforms by day, open-source tools by night."
showDate: false
showReadingTime: false
showAuthor: false
showEdit: false
schemaType: "WebPage"
---

<img src="/img/andryo-circle.png" alt="Andryo Marzuki" class="about-avatar" width="180" height="180" />

I've spent most of the last decade building geospatial, data-driven platforms for banking: collateral appraisal, green lending, physical benchmarking, and most recently the modelling tools required to meet climate risk reporting under NZ CS1 and ASRS, the New Zealand and Australian climate disclosure standards.

I came up through lending first, retail then commercial, over four years. When a specialised data role was created for me in 2018 it was a bit of a shock for those who expected me to continue on the traditional banking path, especially given my Accounting & Commercial Law background. In retrospect, it was the best decision I've ever made, it's allowed me to solve problems which spans finance and banking, climate risk, and software engineering, and having all three in one head is what lets me hold the whole thing, regulation down to data model, and carry the code, the platform, and its business support forward together.

My proudest achievement is a platform I built in New Zealand called ESGIS, the Environmental, Social and Geospatial Information System. Put simply, it got asset-level climate and environmental data into lending decisions. It became the basis for CROP, the Climate Risk and Opportunity Platform, which is its group-wide successor and now runs scenario modelling and asset valuation against ASRS.

The team I built in New Zealand grew from two people to twelve in five years, all of them home grown, and the only person who left went to Europe with a partner. They got to the point where they could take on work that would have buried a vendor team. Six ran the NZ CS1 scope 3 emissions work and six ran ESGIS, both on the same architecture. Between them that covered the retail and wholesale books twice over, once for disclosure reporting and once for lending decisions, and it ran without me needing to be in every call. I was underneath it rather than in front of it during that stretch: the architecture, the data model, and the business relationships that kept it funded.

In October 2024, ANZ took the platform to group level and moved me to Melbourne to build its successor. They wanted the whole of what I do rather than a piece of it: what to build and why, the regulation, the data model, the engineering. There was rarely a roadmap I was executing. I worked out what needed building, then talked people into funding it and into using it. Alongside that comes an occasional rescue, something that has stalled and needs a person who can see the whole problem at once. That is a different job from building one app. One tool becoming infrastructure, more users, more data, and standards a single-country build never had to meet.

## Problems I love to solve

- Geospatial modelling and analysis. PostGIS, unwieldy geometries, ETL that doesn't fall over at scale.
- Turning climate and regulatory reporting requirements (APRA, NZ CS1, scope 3 and financed emissions) into software that actually runs.
- Reverse-engineering undocumented APIs and gluing systems never meant to talk.
- Data platforms and pipelines, end to end from deep source-system sourcing to finished product, including the unglamorous performance work that makes them usable.
- Local LLM inference that behaves on real hardware.

## Some of what I've shipped

- CROP, the Climate Risk and Opportunity Platform, 2024 onwards. Group-wide successor to ESGIS, covering geospatial climate scenario modelling and asset valuation, built to meet ASRS disclosure requirements.
- ESGIS, the Environmental, Social and Geospatial Information System, ANZ New Zealand, 2018 to 2024. The original app: asset-level climate and environmental data feeding lending decisions. [2023 NZ INFINZ finalist](https://www.linkedin.com/posts/anznewzealand_its-great-to-see-anzs-insights-and-esg-activity-7059339312248606720-tIyU).
- The catastrophe modelling module, idea to production in about three months, built as the response to NZ CS1.
- A green loan engine validating initiatives against the four Green Loan Principles.
- An on-the-fly benchmarking and financial-insights platform covering the entire commercial segment.
- An experimental multi-layer peril composite engine. Fixed-cardinality peril vectors composited via memmap-backed matmuls, many hazard inputs in, one asset risk score out.
- [junkyard.sh](https://junkyard.sh), 48 client-side web tools salvaged from behind paywalls. No accounts, no uploads, open source.
- [charted](https://github.com/marzukia/charted), beautiful SVG charts with zero dependencies.
- [qMLX](https://github.com/marzukia/qMLX), a Qwen-specialised MLX fork with disk KV restore. A 130,000 token follow-up drops from a multi-minute cold prefill to a sub-second restore.
- [ppgrid](https://github.com/marzukia/ppgrid), fast continent-scale raster interpolation, a pull-push mipmap of inverse-distance-weighting. 20M plus point rows to an adaptive-resolution raster in seconds rather than days. Open source, and [here's the write-up](https://mrzk.io/posts/ppgrid-fast-continentscale-raster-interpolation/) if you want the method and the error numbers.

Twelve years at ANZ across banking, agri and commercial data, and climate risk, the last several building the platforms above, most of which shipped before the LLM era. BCom in Accounting and Commercial Law, University of Auckland. Based in Melbourne, by way of Auckland.

If you've got a data, geospatial, or climate-tech problem that needs someone who ships rather than someone who reports, I take on a small number of engagements when I have room. Best chance of a yes is an interesting or complex problem where the hard part is the data and the domain at once, geospatial risk, climate or lending, and where nobody has worked out yet whether it can be done. I'll say no to most things, and I'd rather do that quickly than slowly. Find me on [LinkedIn](https://www.linkedin.com/in/andryomarzuki/) or [GitHub](https://github.com/marzukia).
