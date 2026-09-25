---
author: "Andryo Marzuki"
title: "Pauper Consensus: Two Pre-Registered LLM Studies"
seotitle: "Pauper Consensus"
date: "2026-09-25"
description: "A jury of twelve 3–4B local models votes on 8,000 claims from 200 news articles, aggregated by Dawid–Skene with frozen calibration maps. The instrument is the object under test."
tags: ["AI"]
authors: ["Andryo Marzuki"]
affiliation: "Mainlobe Labs"
doi: "10.5281/zenodo.22159835"
zenodo: "https://zenodo.org/records/22159835"
pdf: "https://zenodo.org/records/22159835/files/pauper-consensus.pdf?download=1"
arxiv: ""
---

**Preprint.** DOI via Zenodo.

## Abstract

Agreement across large language models is a measurement instrument, and this paper treats the whole instrument as the object under test, under pre-registration, in two studies built one on top of the other.

In Study 1, an identical frozen proposition-aggregation protocol run on two independently selected three-model panels returned opposite registered verdicts on synthetic reasoning traces (−0.159 vs +0.122 nats, both 95% CIs excluding zero). A post-hoc diagnosis located the disagreement in the instrument twice over — a calibration map with no intercept measured against a baseline that had one, and a corpus that could barely contain falsehoods. A second registration confirmed the central repair on two panel–corpus configurations sharing no model family (+0.220 and +0.272 nats) while falsifying two companion predictions.

Study 2 stands on the repaired instrument: a jury of twelve 3–4B local language-model configurations (four families × three arms) votes PASS / FAIL / NOT_STATED on 8,000 labeled claims constructed from 200 real news articles (96,000 votes in 13.2 h on one Mac Studio). Votes are aggregated by a Dawid–Skene model with per-arm calibration maps fitted once on a smaller prior corpus and applied frozen — the protocol we name Pauper Consensus. The pre-registered capability gate passes: +0.20289 nats of log-loss over a frozen model-free bar. The system gate against a single near-frontier 27B model passes via its cheaper-and-indistinguishable branch; the jury route is 0.781× length-adjusted cost.

Across the two studies, every "failure" — the cycle-1 flip, the two failed cycle-2 predictions, the mis-specified null — was an instrument property or a registered bound, surfaced under frozen registration, not a failed hypothesis. The honest unit of account for LLM-based verification is the instrument: protocol, corpus, calibration, hardware, cost.

## Links

- **Paper** — [pauper-consensus.pdf (390 KB)](https://zenodo.org/records/22159835/files/pauper-consensus.pdf?download=1)
- **DOI** — [10.5281/zenodo.22159835](https://doi.org/10.5281/zenodo.22159835)
- **Zenodo record** — [zenodo.org/records/22159835](https://zenodo.org/records/22159835)
