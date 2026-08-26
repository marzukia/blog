---
author: "Andryo Marzuki"
title: "Measured Pruning Damage Depends on the Evaluation Corpus: A Renaming Control for Mixture-of-Experts Expert Pruning"
date: "2026-08-08"
description: "Code-side evaluation of MoE expert pruning runs on corpora the model has partly memorised. A renaming control on CPython stdlib moves reported damage 1.6x while preserving program structure."
tags: ["AI"]
authors: ["Andryo Marzuki", "Jeremiah Mannings"]
affiliation: "Mainlobe Labs"
doi: "10.5281/zenodo.21869190"
zenodo: "https://zenodo.org/records/21869190"
pdf: "https://zenodo.org/records/21869190/files/measured-pruning-damage-paper-v1.pdf?download=1"
artifact: "https://zenodo.org/records/21869190/files/measured-pruning-damage-artifacts-v1.tgz?download=1"
arxiv: ""
---

**Preprint.** Awaiting arXiv endorsement; DOI via Zenodo in the meantime.

## Abstract

Code-side evaluation of MoE expert pruning is conducted almost entirely on corpora the model has partly memorised, principally CPython stdlib and GitHub-derived source, and on benchmarks whose solutions appear verbatim throughout any web-scale pretraining set. We show that the damage figure such an evaluation produces is a property of the corpus as much as of the prune. On Qwen3.6-35B-A3B (40 layers, 256 routed experts, top-8) we removed the 32 lowest-saliency experts per layer under a GSM8K-calibrated mask and scored the resulting damage on 200 CPython stdlib files twice, once as written and once with all 17,731 file-local identifiers renamed to novel names of matched token length, leaving structure and the stdlib API surface intact and verifying every rewrite by re-parsing.

Damage falls from +0.4469 to +0.2780 nats per token, which is 44.2% of base NLL against 16.1%, while the flip rate at confidently predicted positions falls from 5.17% to 2.64%. Damage on renamed code remains twenty standard errors above the noise floor, so the effect being measured is real even though the figure a paper reports for it moves by 1.6x with a corpus rewrite that preserves program structure. An extractability probe confirms the unrenamed corpus is substantially more memorised on every measure, but per-file extractability does not predict per-file damage; extractable files are also easy files (r = -0.49 against base NLL), and controlling for difficulty reverses the sign to -0.175 (p = 0.013).

## Links

- **Paper** — [measured-pruning-damage-paper-v1.pdf (285 KB)]({{ .Params.pdf }})
- **Artifacts** — [measured-pruning-damage-artifacts-v1.tgz (101 KB)]({{ .Params.artifact }}) — every number reported in the paper is read from a file in `out/`, with the scripts that produced them in `tools/`.
- **DOI** — [10.5281/zenodo.21869190](https://doi.org/10.5281/zenodo.21869190)
- **Zenodo record** — [zenodo.org/records/21869190]({{ .Params.zenodo }})
- **arXiv** — {{ if .Params.arxiv }}[{{ .Params.arxiv }}]({{ .Params.arxiv }}){{ else }}pending endorsement{{ end }}

*Andryo Marzuki & Jeremiah Mannings · Mainlobe Labs · [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)*
