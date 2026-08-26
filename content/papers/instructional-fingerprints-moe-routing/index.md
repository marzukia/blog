---
author: "Andryo Marzuki"
title: "Do Instructional Fingerprints Produce Stable Expert-Routing Signatures in a Mixture-of-Experts Model?"
date: "2026-08-19"
description: "A controlled negative: implanting three trigger-response fingerprints in Qwen1.5-MoE-A2.7B with router-trainable fine-tuning produces measurable routing changes, but no stable trigger-specific expert-routing signature above matched nulls."
tags: ["AI"]
authors: ["Andryo Marzuki", "Jeremiah Mannings"]
affiliation: "Mainlobe Labs"
doi: "10.5281/zenodo.22006608"
zenodo: "https://zenodo.org/records/22006608"
pdf: "https://zenodo.org/records/22006608/files/moe-fingerprint-localisation.pdf?download=1"
arxiv: ""
---

**Preprint.** Awaiting arXiv endorsement; DOI via Zenodo in the meantime.

## Abstract

Mixture-of-Experts (MoE) language models route each token to a small set of experts. This raises a practical question for model fingerprinting: if an instructional trigger-response fingerprint is implanted in an MoE model, does the fingerprint localise to a stable set of experts? If it does, targeted expert removal could be a direct defence. If it does not, pruning-based defences need a different criterion.

We test this question on Qwen1.5-MoE-A2.7B. We implant three trigger-response fingerprints using router-trainable full fine-tuning, so that both expert MLPs and routing weights are allowed to change. We then use a routing-only router-activation localiser and compare trigger overlap against same-syntax null prompts. The implant succeeds: all triggers fire, and routing changes measurably. However, we do not detect a stable trigger-specific expert-routing signature above the matched null distribution. In the matched across-model null reruns for seeds 42 and 123, the P95 three-trigger overlap contains 6 experts in both seeds, below the matched null CI-high value of 11. In the full 27,000-triple matched null, only 0.61% and 0.27% of triples fall below that overlap, and 7.57% and 4.32% are at or below it, for seeds 42 and 123 respectively. A weaker-implant sweep does not reach a clean partial-firing regime; the firing confirmatory weaker config remains FFR-saturated, and the negative persists under it. A graded injected router-boost sensitivity control shows that the localiser recovers a known three-expert boost at routing weight 0.10 or higher, while also showing that routing-loss implants can contaminate null prompts.

Our contribution is a controlled negative and a methodological warning. Under the tested implant and routing-only localiser, we did not detect a stable trigger-specific expert-routing signature above the matched across-model null distribution in Qwen1.5-MoE-A2.7B. We argue that MoE fingerprint-localisation claims should include matched null controls, specificity-validated localisers, stated localiser channels, sensitivity estimates, and capability-preserving implant regimes before they can support targeted expert-removal defences.

## Links

- **Paper** — [moe-fingerprint-localisation.pdf (377 KB)](https://zenodo.org/records/22006608/files/moe-fingerprint-localisation.pdf?download=1)
- **DOI** — [10.5281/zenodo.22006608](https://doi.org/10.5281/zenodo.22006608)
- **Zenodo record** — [zenodo.org/records/22006608](https://zenodo.org/records/22006608)
- **arXiv** — pending endorsement

*Andryo Marzuki & Jeremiah Mannings · Mainlobe Labs · [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)*
