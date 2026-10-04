---
title: "The Debasement of the AI Token"
date: 2026-09-30T00:00:00Z
draft: true
tags: []
categories: []
summary: ""
---

Debasement is the act or process of reducing the quality, value, or standard of something. Essentially, it is trying to purport that something still contains the same intrinsic value whilist hollowing aforementioned value. One of my favourite examples was the eventual hyper inflation and subsequent economic collapse of the Roman Empire caused by successive emperors "watering down" their silver coins; the silver contenr of the denarius went from ~95% in 14AD to just under 5% by the time of Emperor Gallienus in 268 AD.

I believe that this very debasement is actively happening right now, and the entities doing it are not even trying to be subtle at this point. Closed weight providers such as Anthropic and OpenAI are most definitely replacing the silver in their coins (AI tokens) with copper, and claiming it's still 95% silver. This debasement relies on the user's ignorance and deceptive design tactics, and on principle I am opposed to such things.

This post will essentially be a long-form rant of my main gripes with the cloud providers as a whole, and outline my rationale of why I've decided it's worth it to establish my own local infrastructure and break my reliance on cloud providers entirely. My goal is to have convinced you of the shortsighted nature of building your castle on sand (cloud providers), and the urgency of getting your own local infrastructure and being self-sufficient.

## Pre-ramble Preamble

If you asked anyone who knew me well, they'd tell you I'm very open to the fact that I am someone with very intense (and unyielding) ADHD. I'm continually driven by a need to deeply understand how things work and how I could tinker with it to make it fit better for me. As a result, I end up having many various side projects that often get shelved due to a lack of time.

To say that LLMs and agentic workflows have completely changed how I operate would be an understatement. Agentic workflows and pair programming has been an insane force multipler for me allowing me to simultaneously work across multiple side projects and actually see them through to completion, this is because I have always struggled with the last 20% polish required to actually release something publically.

As a result, I have heavily integrated the use of agentic AI into my existing workflows and have come to understand a great deal of the inner mechanics of how things work. To clarify, not specifically on how models are trained, but rather how models are served and easy it is for someone providing inference services to make cost cutting changes that are essentially invisible to the user (you).

---

To contextualise just how far I've dived into the deep end, here's a few things I've ended up doing in the last 6 months:

- [QMLX](https://mrzk.io/posts/qmlx-maximising-ai-psychosis-minmaxing-mac-studio/), A custom fork of RapidMLX that specifically addressed my woes with my Mac Studio and specifically GatedDeltaNet KV (cold caching only, tape rollback). For this project I was forced to understand how the internals of GatedDeltaNet, and how it compared to other KV cache approaches of other model families such as DeepSeek, etc.
- I have about a dozen deep dive experiments which ended up being non-results or failures, however, three preprints I wrote with my colleague Jeremiah Mannings survived the cut:

| DOI | Description |
| --- | ---         |
| [10.5281/zenodo.22159835](https://mrzk.io/papers/pauper-consensus-llm-studies/) | The "Pauper Consensus" protcol, using an assemble of cheap deployable tiny models to improve the accuracy of heavier models at a fraction of the compute cost or hardware. |
| [10.5281/zenodo.22006608](https://mrzk.io/papers/instructional-fingerprints-moe-routing/) |  A study to research whether or not it's possible to remove weight-level fingerprinting / finetuning. This was spurred by the discovery that Claude began watermarking its outputs and my paranoia to the scenario that open weights may already be compromised. |
| [10.5281/zenodo.21869190](https://mrzk.io/papers/pruning-damage-evaluation-corpus/) | An accidental discovery arising from a different experiment I was doing, but an identification that benchmarking post REAP actually was likely overstated due to the fact that REAPing asymetrically impacts memorisation as opposed to reasoning. |

To clarify, the reason I've vomitted my life story is not because I am of the habit of sharing personal information, rather, to provide the reader some of my credentials as to why I think I should even have an opinion on it. I am by no means an expert in this field (far from it), but as a tinkerer I feel compelled to share what I've come to understand.

## Who's Going to Know?

I opened this post with an example of debasement of the denarius, I phrased it this way because I enjoyed the parallels between aforementioned reduction of silver content and reduction of the intrinsict value of a token. A more apt modern term would be "shrinkflation" (although "enshittification" also readily applies).

Shrinkflation is a tactic to cut costs by reducing the quantity (or quality) of a product while deceptively marketing or presenting as unchanged. An example of this would be selling a 330ml bottle of soda and then subsequently selling a taller slimmer bottle that only holds 250ml - this allows a company to maintain a price while reducing what they must actually provide.

You can see this tactic playing out in real time in the LLM space, closed weight model providers like OpenAI and Anthropic have many layers in which they can tinker with the product they've sold you. Essentially, they can water down the product they give you to increase the profitability of serving that model to you without you noticing.

Unlike a soda bottle, which you could easily spot if you're looking hard enough. The shrinkflation/enshitiification happening with AI providers is much more insidious. These providers can provide the appearance of rapid token-price deflation, but the problem is that a token yesterday is not the same product as a token today, despite appearing fungible.

The problem expands when it comes to the models themselves, new models are not stable or equivalent units. They may advertise a similar name or even the same name, but they may use substantially more reasoning tokens, require additional agent turns, route requests through smaller models, change behaviour over time, or regress on specific tasks. Research has also shown that model behaviour can drift between releases, while reasoning-oriented systems consume far more tokens than earlier generations.

Even worse, benchmarks can be gamed quite easily meaning that a lower-cost model that achieves a similar benchmark score may still require more retries, more supervision, more context, or more validation before its output can be used. Benchmark contamination concerns further complicate claims of equivalent capability.

Ultimately, the most meaningful metric is not cost per token, it is cost per accepted result on a fixed workload. When measured this way, the true value of a "token" can be established and see the true delta of pricing overtime even if the on paper tariff price drops.  Independent evaluations have already found cases where a newer model had similar per-token pricing but a higher cost per completed task because it used substantially more tokens and reasoning effort.

All of this to say, the customer who built their process on the model of yesterday will be running the shrinkflated model of tomorrow. Businesses and customers who have leaned too heavily in the subsidised token of yesterday are in a world of pain.

**n.b.** The header of this section is rhetorical.

### Meddling with the Invisible Infrastructure

The problem with closed weight systems like OpenAI's ChatGPT, Anthropic's Claude and Google's Gemini is that it's opaque. This opaqeuness is a feature not a bug and it allows them to mess parts of the serving infrastruture that are essentially invisible. While I singled out closed weight systems, this applies to inference providers for open weight systems too. I witnessed first hand as I was working on qMLX how materially the output quality of a model is impacted by changing things like the KV cache mechanism, and it only became more apparent to see what types of analysis or research others had done.

The example I love to point to is the sheer drop in capability that users of ChatGPT-4 experienced in 2023 (between March and June), the figures I use for the next few bits are from the paper "How is ChatGPT's Behaviour Changing Over Time?" [^2]. I'll gloss over the minutae, but the headline points made in the paper were:

1. The same named model service got drastically worse in a 3 month span without any official notice.
2. The decline was asymetric with some bits improving, with many other benchmarks materially worsening.
3. GPT-4 began failing to follow its own Chain-of-Thought and explicit user instructions.
4. Output length changed sharply.
5. The GPT-4 they sold to users in March 2023 was markedly different than the one in June 2023.

The researchers also tested ChatGPT-3.5 which also showed material changes in its behaviour.

Put simply, something _must_ have changed in how they serve the product, and that is likely cost cutting measures in the invisible infrastructure.

{{< bar tag="FIG. 01" cap="GPT-4 BENCHMARK SCORE: MARCH VS JUNE 2023" unit="SCORE" hint="Same named service, three months apart. OpinionQA drops 74 points, Math II 48, Code Gen 42; USMLE holds within 5 while SensitiveQA and HotpotQA rise. The cuts landed where nobody was measuring." data="[{\"label\":\"OPINIONQA\"},{\"label\":\"MATH II\"},{\"label\":\"MATH I\"},{\"label\":\"USMLE\"},{\"label\":\"CODE GEN\"},{\"label\":\"VISUAL\"},{\"label\":\"HOTPOTQA\"},{\"label\":\"SENSITIVEQA\"}]" series="[{\"name\":\"MARCH 2023\",\"values\":[97.6,83.6,84.0,86.6,52.0,24.6,1.2,79.0]},{\"name\":\"JUNE 2023\",\"values\":[23.4,35.2,51.1,82.1,10.0,27.2,37.8,95.0]}]" >}}

**n.b.** higher is better.

### Prompt Inflation

### Introducing the New Claude Model Class, the Class-Action Lawsuit

I started using Claude at the start of my parental leave in early May, and honestly I was blown away by it's capability and the sheer amount of value I got from it. I was on the 5x Max plan which was $100USD per month, however, I noticed a continual and sharp decline in its overall output. It got chattier, it got needlessly verbose, it started making errors and my weekly tokens ran out quicker each week.

I was not at all surprised to discover that there's actually a lawsuit explicitly accusing of this exact thing: a recent class action lawsuit which was filed against Anthropic on June 14 2026, and it contained a lot damning, dodgy, and misleading behaviour by Anthropic in relation to their various subscription tiers[^1]. The core claims made against Anthropic anchor on the following:

1. Anthropic's "pro" monthly tier subscription packages Max 5x ($100 USD) and Max 20x ($200 USD) were described as having 5 to 20 times more usage than their base subscription.
2. Anthropic's own internal emails revealed that limits do not scale as advertise, and realistically users were getting 3.5 and 6-8 times the usage respectively. This shows that they were aware of their "50% savings" marketing was deceptive, and simply chose to ignore it.
3. Additionally, by nature of being a closed-weight ecosystem their usage calcualtions become a blackbox which their users are not able to transparently audit.

---

{{< line tag="FIG. 02" cap="ACTUAL VS ADVERTISED USAGE HOURS" axis-x="TIER" axis-y="HOURS" hint="Max 5x and Max 20x were sold as 5 and 20 times the base allowance. The internal emails put real delivery at 3.5x and 6x: 280 and 480 hours against an advertised 400 and 1600." series="[{\"name\":\"ACTUAL\",\"role\":\"accent\",\"points\":[{\"t\":\"PRO\",\"v\":80},{\"t\":\"MAX 5X\",\"v\":280},{\"t\":\"MAX 20X\",\"v\":480}]},{\"name\":\"ADVERTISED\",\"role\":\"ink2\",\"points\":[{\"t\":\"PRO\",\"v\":80},{\"t\":\"MAX 5X\",\"v\":400},{\"t\":\"MAX 20X\",\"v\":1600}]}]" >}}

To be clear, I am not outraged at Anthropic's puffery. In this day and age in our capitalistic society, some slight exaggeration is unavoidable. However, reality only equating 1/4 your advertised usage at your most premium tier of subscription is a farce. At this level of difference it would be defensible to say it's encroaching fraud territory (hence the lawsuit I suppose).

{{< line tag="FIG. 03" cap="CENTS PER HOUR: ADVERTISED VS ACTUAL" axis-x="TIER" axis-y="CENTS/HR" hint="Actual cost per hour climbs with the tier: 11 cents on the base plan, 19 on Max 20x. The most expensive subscription is the worst value per dollar, and advertised cost sits 6 to 10 cents below reality at every tier." series="[{\"name\":\"ACTUAL\",\"role\":\"accent\",\"points\":[{\"t\":\"PRO\",\"v\":11},{\"t\":\"MAX 5X\",\"v\":16},{\"t\":\"MAX 20X\",\"v\":19}]},{\"name\":\"ADVERTISED\",\"role\":\"ink2\",\"points\":[{\"t\":\"PRO\",\"v\":5},{\"t\":\"MAX 5X\",\"v\":8},{\"t\":\"MAX 20X\",\"v\":9}]}]" >}}

It get's even more absurd when you look at the cents per hour breakdown, as you're actually achieving _more_ value on the lowest and cheapest base plan as opposed to their power user tiers. The gap in actual cents per hour between what was advertised and what it is in practice is also a joke.

### Sneaky Switching



## Borrowing Tactics from Drug Dealers

If you're not massively laying off your staff to make room for your new army of AI employees, are you even doing business in 2026?

The technology sector across the world has seen major restructuring, layoffs and redundancies over the last 12 months. With mounting hysteria to be seen doing innovations utilising LLMs, many companies have short sightedly executed large organisational changes chasing the promise that LLMs will do the work of a person at a fraction of the cost of said person. These decisions have been made on the cost calculus arising from heavily subsidised pricing provided from frontier cloud providers such as Anthropic, OpenAI and Google.

These cuts aren't localised either, a cursory google search yielded me plenty of alarming headlines:

1. 2025: ~54,800 US cuts cited AI, of 1.2M total [^3]
2. Jan-Aug 2026: 94,046 US tech cuts, +16.8% vs same window 2025. AI cited in 33% of 2026 events, up from 1% in 2024 [^4]
3. H1 2026: AI was the No.1 cited reason for 4 straight months; tech cuts +83% YoY [^5]

The logic and soundness of these reorganisations hinge on the assumption that these prices would not meaningfully change; it would be an absolute disaster if these token prices increased in any significant manner (hint: they will / have).

This is called the loss leader strategy, and it should be a very familiar playbook. Uber, Amazon and many other giants have run this playbook to accumulate singificant amount of market share before cranking up the prices. Specific examples:

1. Uber subsidised the price of its fares for 9 years in order to grow its market share. [^6]
2. Amazon was mostly unprofitable between the years of 1998 and 2013 [^7]

With this analogy, the free market is now hooked on crack cocaine, and it doesn't have the means to go cold-turkey. Given enough support, it could taper off overtime and rehab, but there is little choice in the short term except to pay the increasingly extortionate prices that cloud providers are charging.

They get companies hooked on irresistibly good deals on frontier models that are geninuely capable, these businesses begin migrating to said companies propietary closed weight models, and then the providers simply increase their prices. By the time the bait and switch happens, many organisations have built processes around critical infrastructure and code which they have zero control over. They have in essence traded long term sovereignty for short term gains.

In my opinion, this is equivalent to a drug dealer giving a customer a "free sample" of crack cocaine, however instead of receiving crack cocaine, you simply receive watered down AI capability. It's large frontier cloud providers (such as OpenAI, Anthropic and Google) giving consumers/businesses insanely discounted AI tokens to get them hooked before they crank up the prices.

This strategy should seem familiar, it's called the loss leader strategy. Uber, Amazon and many other giants have run this playbook to accumulate singificant amount of market share before cranking up the prices. With this analogy, the free market is now hooked on crack cocaine, and it doesn't have the means to go cold-turkey. Given enough support, it could taper off overtime and rehab, but there is little choice in the short term except to pay the increasingly extortionate prices that cloud providers are charging.

For example, in March 2025, OpenAI admitted "very expensive to run" and evaluated whether to keep serving it via API, it subsequently killed off GPT-4 [^8] only a few months after Sam Altman said they had no plans to sunset 4o [^9]. This means OpenAI essentially forced anyone who had made the mistake of building their critical infrastructure or services ontop of it forced to migrate to more expensive models.


## AI Soverignty & Local Infrastructure Independence

I have recently made seemingly irrational decision to spend the entirety of my personal hobby fund for AI infrastructure, specifically, two RTX 5000 Pro Blackwell 48GB graphics cards. The MSRP of one of these cards is currently approximately $13-14K AUD with no real signs of slowing down, and I will be the first to admit this type of spend for personal AI infrastructure seems absurd. However, whilst I did not buy these at the current market places rather I did it before the recent eyewatering price surge, but even at current prices I would do it again in a heartbeat.

I'm not saying that because I am a secret millionaire (I wish), rather, the value of having your own AI infrastructure is absolutely and unequivocally game changing. Not only does is there massive ROI, you also entirely de-risk yourself from being at the mercy of cloud providers who seek to provide you increasingly degraded outputs.

---

{{< bar tag="FIG. 04" cap="WEEKLY TOKEN VOLUME: FRESH READ VS CACHE READ VS WRITE" unit="TOKENS" fmt="num" hint="The SEP 8-14 week is the cold-cache week: 5.07B tokens, 59% of it fresh. From SEP 15 on, cache read carries 80-95% of volume and fresh read collapses from 59% to 4%." data="[{\"label\":\"SEP 1-7\",\"value\":932620000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":184580000},{\"name\":\"CACHE READ\",\"value\":738390000},{\"name\":\"WRITE\",\"value\":9650000}]},{\"label\":\"SEP 8-14\",\"value\":5065400000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":2978020000},{\"name\":\"CACHE READ\",\"value\":2043050000},{\"name\":\"WRITE\",\"value\":44330000}]},{\"label\":\"SEP 15-21\",\"value\":3816050000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":729600000},{\"name\":\"CACHE READ\",\"value\":3057080000},{\"name\":\"WRITE\",\"value\":29370000}]},{\"label\":\"SEP 22-28\",\"value\":2587440000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":122200000},{\"name\":\"CACHE READ\",\"value\":2442830000},{\"name\":\"WRITE\",\"value\":22410000}]},{\"label\":\"SEP 29-30\",\"value\":475820000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":20280000},{\"name\":\"CACHE READ\",\"value\":451920000},{\"name\":\"WRITE\",\"value\":3620000}]}]" >}}

In September alone, I have spent the equivalent of nearly $4K AUD, the data tells the whole story - have a look at my usage in September:

{{< bar tag="FIG. 05" cap="WEEKLY INFERENCE COST: ALL AGENTS (AUD)" unit="AUD" fmt="usd" hint="SEP 8-14 takes $2,212 of the $3,926 September total: the cold-cache week. Cost then roughly halves every week as cache read absorbs the volume." data="[{\"label\":\"SEP 1-7\",\"value\":240.31},{\"label\":\"SEP 8-14\",\"value\":2211.53},{\"label\":\"SEP 15-21\",\"value\":929.19},{\"label\":\"SEP 22-28\",\"value\":463.24},{\"label\":\"SEP 29-30\",\"value\":82.07}]" >}}

These prices are based on the current OpenRouter pricing for Qwen3.8 27B converted to AUD.

---

Having a fully local set up with actual enthusiast grade GPUs has allowed me to run an extremely tight fleet of approximately 12 parallel agents, of which, 3 are orchestrators having the ability to deploy an additional 3 subagents each.

They use a custom harness/bridge (which I'm hesitant to release as there are already far too many harnesses) which allows intra-agent coordiantion and communication, most importantly, the ability to have so many parallel agents allows me to actually implement rigor around SDLC practices. Specifically, my one golden rule that every PR must be continually adversarially reviewed by independent agents until there are no more defects, whilst merges are gated by the operator (me).

At my current burn rate I'll likely be breakeven well within a year... and these cards will still have a 3 year warranty. On the flipside, if I kept things on cloud, I would've been on the path to bankruptcy.

Now imagine what I just shared, but at the mindboggingly large scale of big corporates, these companies _do not_ have their own infrastructure. They must spend to get tokens, and those tokens are getting more expensive by overt price increases or dilution of its intrinsict value.

This is a roundabout way to say that if you're an executive who's gone all in on AI without thinking about what happens when the subsidies stop, I'd say you might be in trouble in the near future.

**n.b.** To anyone who's viewed my previous qMLX post(s) or starred my qMLX repository, I must apologise that I've since sold a part of my soul to Nvidia and have abandonded the hipster metal lifestyle for my local setup.

## AI Disclosure

- This essay was written by a human, excuse my rambling.
- AI resarcher used to research and fact check.

## References

[^1]: https://storage.courtlistener.com/recap/gov.uscourts.cand.472161/gov.uscourts.cand.472161.1.0.pdf
[^2]: https://doi.org/10.1162/99608f92.5317da47
[^3]: https://cnbc.com/2025/12/21/ai-job-cuts-amazon-microsoft-and-more-cite-ai-for-2025-layoffs.html
[^4]: https://news.crunchbase.com/layoffs/2026-layoff-numbers-rise-ai-shift-orcl-meta-amzn
[^5]: https://hrdive.com/news/tech-layoffs-surge-83percent-h1-2026-challenger-ai-disruption/824320
[^6]: https://www.competitionpolicyinternational.com/wp-content/uploads/2020/02/CPI-Abi-Rafeh-Palikot.pd
[^7]: https://www.npr.org/2023/02/02/1153562994/amazon-reports-its-first-unprofitable-year-since-2014
[^8]: https://techcrunch.com/2025/03/05/openais-gpt-4-5-ai-model-comes-to-more-chatgpt-users
[^9]: https://venturebeat.com/technology/openai-is-ending-api-access-to-fan-favorite-gpt-4o-model-in-february-2026
