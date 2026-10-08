---
author: "Andryo Marzuki"
title: "The Debasement of the AI Token"
date: 2026-10-06T00:00:00Z
description: "By 268 AD the denarius was 5% silver, and the Empire's economy collapsed with it. The AI token is being debased the same way - subsidised, opaque, mutable at the whim of one party. My pitch for why you should've got your own LLM infrastructure yesterday."
tags: ["AI"]
---

Debasement is the act or process of reducing the quality, value, or standard of something. It's purporting that something still contains the same intrinsic value whilst hollowing aforementioned value.

By the end of Gallienus' reign in 268 AD, the Roman denarius's silver content was a paltry 5%. In contrast, the denarius was almost entirely silver (~98%) during the time of Augustus just 254 years prior. The Roman Empire's economy collapsed because the unwritten contract between the Roman Empire and those who used the denarius was broken when the emperors plundered the silver in their coins.

Today, the debasing emperors are no longer ancient Romans. Now, they're faceless corporations who assure you that the AI token you spent yesterday is the same you're spending today. That the intrinsic value hasn't changed.

The market's already gone all in, everyone's been building their processes and infrastructure with the idea that the intrinsic value of the AI token is stable and treat it as bedrock. What happens when that foundation is not bedrock, rather it's sand that's slowly shifting before your feet? What if that very slick process automation you built using GPT-4o suddenly ceases to function when OpenAI decides to decommission it with just two weeks' notice?

This is a long form essay (rant) that nobody's asked for, but I nonetheless feel compelled to write. It will be my pitch to you, the reader, why you should've got your own LLM infrastructure yesterday, and why I am deeply sceptical of the closed weight giants such as Anthropic and OpenAI.

## The AI Token Is a Lie

As much as I enjoy a good Roman analogy, the denarius parallel begins to logically fall apart as we examine the details more closely. There's a fundamental and structural difference between the denarius and the AI token, the former is currency and the latter is a token (duh).

It's a mistake to think of AI tokens as currency. Currency would hold the underlying assumption that it is standardised, a medium of exchange and a store of value. AI tokens are none of these things; each is a representative unit of value that is volatile and completely mutable by a single party.

The denarius analogy is compelling because it _feels_ right, doesn't it? It still works because the core fundamental imagery of a Roman emperor being able to unilaterally debase their coinage without the want or need to care for whom it may impact remains extremely relevant. It highlights the core problem at its heart, the concentration of power over critical infrastructure in the hands of a chosen few.

The specific mechanics of _how_ this figurative debasement is being perpetrated are just as interesting. I am instantly drawn to the parallels and similarities this type of token pricing has with dark patterns associated with predatory gaming. Specifically, four key "features" that come with this token model:

1. **Financial Opacity (Premium Currencies)**: The AI token is a way to make things more financially opaque. It's there to obfuscate the true value of what you're *actually* consuming. Instead of saying this answer cost me 2c, you're being charged a rate of $0.23 per 1M tokens. This means that the onus is shifted onto you (the user) to translate these rates into real life spend. How much is that PDF going to cost you? [^1]
2. **Transactional Uncertainty (RNG / Lootboxes)**: The value of an AI token can wildly vary depending on your luck and timing. This is because the serving stacks of both closed weight and open weight inference providers are almost always entirely opaque. There are many invisible levers that providers can use to cut cost that materially impact the quality of your LLM output without ever touching the model weights themselves. [^1]
3. **Systemic Mutability (Silent Patches / Stealth Nerfs)**: The issue is even more exacerbated with closed weight providers such as Anthropic and OpenAI. The model class you thought you were using may've got a silent and undisclosed downgrade and you were none the wiser that you were using an inferior product that was still priced the same.
4. **Asymmetric Power Dynamics (Developer Omnipotence)**: You (the user) have zero leverage over what Anthropic or OpenAI choose to do. You operate entirely at their whim and mercy; if you've decided to build a critical dependency on one of their products, all you have is hope that they do not decide to unilaterally decommission or retire their products.

## Subsidised Tokens, the Gateway Drug

> "Can I interest you in a free sample? The first one is on the house ;)" - Drug Dealer

I think the most impressive feat these AI giants have done is that they've been able to convince the market that the subsidised token prices of today, are here to stay (spoiler: they are not). Whether or not the participants in the market have truly bought the hype or whether they're just using it as a smoke screen for cost cutting is irrelevant as ultimately the consequences are the same.

The technology sector across the world has seen major restructuring, layoffs and redundancies since 2025. Amid mounting pressure to adopt LLMs, the reorganisation wave that kicked off in 2025 eagerly chased the promise that LLMs would do the work of a person at a fraction of the cost of said person. These decisions have been made on the cost calculus arising from heavily subsidised pricing provided from frontier cloud providers such as Anthropic and OpenAI.

In FY25, OpenAI generated an impressive $13.07B in sales revenue, unfortunately its total spend came to $34.0B, meaning that for every $1 OpenAI earned, it had to spend $2.60. This means that OpenAI (via its many private investors) are topping up an additional $1.60 for every $1 you give OpenAI while using the likes of ChatGPT and Codex. [^3]. Anthropic, OpenAI's primary competitor, are much the same, earning $4.59B in sales revenue in FY25 whilst its total spend came to $7.33B. For every dollar that Anthropic earns, they're spending $1.60 meaning that investors are having to top up an additional $0.60 for every dollar you give Anthropic. [^4]

The logic and soundness of these aforementioned reorganisations hinge on the assumption that these prices would not meaningfully change; it would be an absolute disaster if these token prices increased in any significant manner (hint: they will / have).

From OpenAI/Anthropic's POV they've successfully got companies hooked on irresistibly good deals on frontier models that are genuinely capable, these businesses become increasingly dependent as LLM-based automation occurs. At this point, the customer is now captive and tethered to a closed ecosystem which they have zero control over. These organisations have in essence traded long term sovereignty for short term gains.

## Invisible Cuts, Visible Degradation

The problem with closed weight systems like OpenAI's ChatGPT and Anthropic's Claude is that they are entirely opaque. To be clear, this opaqueness is a feature not a bug. It allows them to freely "optimise" for cost with infrastructure that is invisible and undisclosed to the user.

I have zero doubt that this type of meddling definitely happens with open weight inference providers too, however, because those offerings are generally federated, it's harder to find high profile incidents. I witnessed first hand as I was working on qMLX how the output quality of a model can be materially impacted by simply changing how a model's KV is stored.

My go-to example is the "optimisations" OpenAI silently did to their ChatGPT-4 model in 2023. The figures I use for the next few bits are from the paper "How Is ChatGPT's Behavior Changing Over Time?" [^5] and compare how ChatGPT-4 and ChatGPT-3.5 significantly degraded over the span of a few months with no patch notes or disclosures. The key findings from the paper were:

1. The same named model service got drastically worse in a 3 month span without any official notice.
2. The decline was asymmetric with some bits improving, with many other benchmarks materially worsening.
3. GPT-4 began failing to follow its own Chain-of-Thought and explicit user instructions.
4. Output length changed sharply.
5. The GPT-4 they sold to users in March 2023 was markedly different than the one in June 2023.

{{< radar tag="FIG. 01" cap="GPT-4 BENCHMARK SCORE: MARCH VS JUNE 2023" unit="SCORE" hint="Same model, three months apart. OpinionQA drops 74 points, Math II 48, Code Gen 42; USMLE holds within 5 while SensitiveQA and HotpotQA rise." labels="[\"OPINIONQA\",\"MATH II\",\"MATH I\",\"USMLE\",\"CODE GEN\",\"VISUAL\",\"HOTPOTQA\",\"SENSITIVEQA\"]" series="[{\"name\":\"JUNE 2023\",\"values\":[23.4,35.2,51.1,82.1,10.0,27.2,37.8,95.0]},{\"name\":\"MARCH 2023\",\"values\":[97.6,83.6,84.0,86.6,52.0,24.6,1.2,79.0]}]" >}}

The only conclusion that can be logically made is that something *must* have changed in how they serve the product, and that is likely cost cutting measures in the invisible infrastructure.

## Nobody's Gonna Notice...

Have you heard of the new Claude model class? It's the class action lawsuit! On 14 June 2026, a class action was lodged against Anthropic citing a litany of damning and dodgy behaviour relating to their various subscription tiers [^2].

_*n.b.* "allegedly" lawsuit ongoing._

The core claims made against Anthropic anchor on the following:

1. Anthropic's "pro" monthly tier subscription packages Max 5x ($100 USD) and Max 20x ($200 USD) were described as having 5 to 20 times more usage than their base subscription.
2. Anthropic's own internal emails revealed that limits did not scale as advertised, and realistically users were getting 3.5 and 6 to 8 times the usage respectively. This shows that they were aware that their "50% savings" marketing was deceptive, and simply chose to ignore it.
3. Additionally, by nature of being a closed-weight ecosystem their usage calculations become a black box which their users are not able to transparently audit.

{{< line tag="FIG. 02" cap="ACTUAL VS ADVERTISED USAGE HOURS" axis-x="TIER" axis-y="HOURS" hint="Max 5x and Max 20x were sold as 5 and 20 times the base allowance. The internal emails put real delivery at 3.5x and 6x: 280 and 480 hours against an advertised 400 and 1600." series="[{\"name\":\"ACTUAL\",\"role\":\"accent\",\"points\":[{\"t\":\"PRO\",\"v\":80},{\"t\":\"MAX 5X\",\"v\":280},{\"t\":\"MAX 20X\",\"v\":480}]},{\"name\":\"ADVERTISED\",\"role\":\"ink2\",\"points\":[{\"t\":\"PRO\",\"v\":80},{\"t\":\"MAX 5X\",\"v\":400},{\"t\":\"MAX 20X\",\"v\":1600}]}]" >}}

To be clear, I am not outraged at Anthropic's puffery. In this day and age in our capitalistic society, some slight exaggeration is unavoidable. However, reality only equating 1/4 of your advertised usage at your most premium tier of subscription is a farce. At this level of difference it would be defensible to say it's encroaching fraud territory (hence the lawsuit I suppose).

{{< line tag="FIG. 03" cap="CENTS PER HOUR: ADVERTISED VS ACTUAL" axis-x="TIER" axis-y="CENTS/HR" hint="Actual cost per hour climbs with the tier: 11 cents on the base plan, 19 on Max 20x. The most expensive subscription is the worst value per dollar, and advertised cost sits 6 to 10 cents below reality at every tier." series="[{\"name\":\"ACTUAL\",\"role\":\"accent\",\"points\":[{\"t\":\"PRO\",\"v\":11},{\"t\":\"MAX 5X\",\"v\":16},{\"t\":\"MAX 20X\",\"v\":19}]},{\"name\":\"ADVERTISED\",\"role\":\"ink2\",\"points\":[{\"t\":\"PRO\",\"v\":5},{\"t\":\"MAX 5X\",\"v\":8},{\"t\":\"MAX 20X\",\"v\":9}]}]" >}}

It gets even more absurd when you look at the cents per hour breakdown, as you're actually achieving *more* value on the lowest and cheapest base plan as opposed to their power user tiers. The gap in actual cents per hour between what was advertised and what it is in practice is also a joke.

**Personal anecdote**: I heavily used Claude Code at the start of my parental leave in early May, and honestly I was blown away by its capability and the sheer amount of value I got from it. I was on the 5x Max plan which was $100USD per month, however, I noticed a continual and sharp decline in its overall output. It got chattier, it got needlessly verbose, it started making errors and my weekly tokens ran out quicker each week. That is to say, I am not at all surprised this lawsuit happened.

## You Don't Have a Say

What would you say if that being financially extorted isn't even the worst thing that can happen to you? I think an even bigger issue is that you have absolutely zero ability to influence what OpenAI or Anthropic do. If they've decided that they don't like a product or it's no longer sufficiently profitable, they can cut it without consequence.

Here's a hypothetical, you're a business owner who has recently automated a manual (read: human) process that's a core critical part of your business. That graduate you were paying is now no longer needed as ChatGPT-4o can do it for a fraction of the cost, amazing! Now imagine months later, OpenAI, without notice, emails you saying they're decommissioning that model. You don't have to imagine the latter scenario as it's recently happened. In March 2025 OpenAI was already admitting that GPT-4.5 was "very expensive to run", and weighing whether to keep serving it via API at all [^6]. GPT-4o, the model people had actually built on, was retired in February 2026, from ChatGPT and from the API alias chatgpt-4o-latest [^7], barely two weeks after Sam Altman said there were no plans to sunset it [^8]. GPT-4.5 followed in June.

This means OpenAI essentially forced anyone who had made the mistake of building their critical infrastructure or services on top of it to migrate to more expensive models. This can happen with any of these closed-weight providers, they don't care that it will disrupt your business or that you are reliant on their product.

## Should You Go Local?

I have spent an exorbitant amount of my spare time, and sacrificed my entire tactical hobby fund, in the pursuit of local AI sovereignty. Over the last 2 months I've created my own personal home lab that is capable of hosting a large fleet of AI agents for my personal use. This necessitated acquiring two RTX 5000 Pros (which now retail at an irrational $14K AUD a piece, I did not pay this insane price tag) plus an assortment of old server parts I got from lowballing people on Facebook Marketplace and eBay.

My ethos when it comes to AI is that it is not something to be feared or shunned, AI has taken a crowbar and wrenched open Pandora's box. Desperately coping that AI is not transformational or here to stay is equivalent to burying your head in the sand. Embracing AI does NOT mean you should be haphazardly replacing skilled humans; AI is a tool to be used by people not a substitute for people. AI usage is fundamentally limited to the skill of the operator using it, this means if you give a skilled developer 5 AI agents, you'd likely increase their productivity several fold; it's an extension of the operator, a tool. However, AI agents in the hands of an inexperienced operator is more akin to blind trust; the operator must trust whatever the AI says, this is a recipe for disaster (LLMs are dirty little liars).

Ultimately, the cost calculus in determining whether you _should_ invest in local infrastructure is dependent on whether you, your business, or employees have the pre-requisite skills to actually utilise the infrastructure effectively and efficiently. From an outsider's perspective I must certainly seem irrational or insane to spend this kind of money on server hardware. However, with hindsight and knowledge of how transformational agentic AI has been for me, I would do it again even if the prices were doubled - it's not even a hard choice for me.

I'm not saying that because I am a secret millionaire (I wish), rather, the value of having your own AI infrastructure is absolutely and unequivocally game changing. Not only is there massive ROI, you also entirely de-risk yourself from being at the mercy of cloud providers who seek to provide you increasingly degraded outputs. However, this conclusion is only true because I was lucky enough to have had the opportunities in my career to develop deep technical skills to allow me to effectively leverage AI. It would be absolutely arrogant of me to assume everyone has the same circumstances, so I won't.

I can however share the data that I use to justify the rationale of why it's worth it for me. For this we need to look no further than my usage data. In September alone, I have spent the equivalent of nearly $4K AUD:

{{< bar tag="FIG. 04" cap="WEEKLY INFERENCE COST: ALL AGENTS (AUD)" unit="AUD" fmt="usd" hint="Based on OpenRouter pricing as of time of writing" data="[{\"label\":\"SEP 1-7\",\"value\":240.31},{\"label\":\"SEP 8-14\",\"value\":2211.53},{\"label\":\"SEP 15-21\",\"value\":929.19},{\"label\":\"SEP 22-28\",\"value\":463.24},{\"label\":\"SEP 29-30\",\"value\":82.07}]" >}}

{{< bar tag="FIG. 05" cap="WEEKLY TOKEN VOLUME: FRESH READ VS CACHE READ VS WRITE" unit="TOKENS" fmt="num" data="[{\"label\":\"SEP 1-7\",\"value\":932620000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":184580000},{\"name\":\"CACHE READ\",\"value\":738390000},{\"name\":\"WRITE\",\"value\":9650000}]},{\"label\":\"SEP 8-14\",\"value\":5065400000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":2978020000},{\"name\":\"CACHE READ\",\"value\":2043050000},{\"name\":\"WRITE\",\"value\":44330000}]},{\"label\":\"SEP 15-21\",\"value\":3816050000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":729600000},{\"name\":\"CACHE READ\",\"value\":3057080000},{\"name\":\"WRITE\",\"value\":29370000}]},{\"label\":\"SEP 22-28\",\"value\":2587440000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":122200000},{\"name\":\"CACHE READ\",\"value\":2442830000},{\"name\":\"WRITE\",\"value\":22410000}]},{\"label\":\"SEP 29-30\",\"value\":475820000,\"parts\":[{\"name\":\"FRESH READ\",\"value\":20280000},{\"name\":\"CACHE READ\",\"value\":451920000},{\"name\":\"WRITE\",\"value\":3620000}]}]" >}}

## Why I Went Local

Having my own infrastructure means that I can:

* Run a fleet of 12 parallel AI agents 24/7 without having to worry that I've spent this month's mortgage payment on AI tokens (YMMV).
* Not worry about data exfiltration, everything is local and I have complete control over my data.
* The value of my AI tokens actually act as a stable unit of value.
* Nobody can dilute the efficacy of my agentic fleet without my knowledge or consent. The "invisible levers" are completely visible and within my controls.
* I can actually automate my personal workflows, I am not at anyone's mercy.
* It is a baseline capability that I now have *forever*. Nobody can take it from me.

At my current burn rate I'll have broken even within a year, and these GPUs have a 3 year warranty. Every single LLM call from that point is pure value on top of the innate value received from owning your own infrastructure. I am a single full stack developer who burns through ~$4K AUD worth of tokens every month.

If you've built on the assumption that today's token prices will hold, I'd make sure contingency plans are in place. I struggle to grasp the scale of the introduced financial risk for teams with hundreds or thousands of developers, all running their cloud AI agents as part of their day to day activities.

Investing in your own infrastructure becomes more difficult the larger you get, but I still strongly believe that the best time to have gotten your own infrastructure was yesterday, the next best time is right now.

## Post-ramble Footnotes

I've been sitting on this essay for ages now, and this is chiefly because I suffer from an extreme case of imposter syndrome when it comes to writing about LLMs, I have never been an academic nor would I ever purport to be one. I therefore have a reflexive need to disclose how mentally invested I have been in this space recently.

Since May of this year, I have utterly gone off the deep end, dabbling and tinkering on deeply integrating agentic coding into my core workflows. To be absolutely clear, I'm not listing these as credentials, rather the foundational basis of my argument:

* My learnings from making **[QMLX](https://mrzk.io/posts/qmlx-maximising-ai-psychosis-minmaxing-mac-studio/)** - a custom fork of RapidMLX to fix my GatedDeltaNet KV woes on the Mac Studio (cold caching only, tape rollback). Building this forced me to understand how GatedDeltaNet's internals function compared to how other model families manage their KV caches.
* About a dozen deep-dive experiments were non-results or failures, however, three preprints with my fellow obsessive, [Jeremiah Mannings](https://mainlobe.sh/), survived:
    * **Pauper Consensus** ([10.5281/zenodo.22159835](https://mrzk.io/papers/pauper-consensus-llm-studies/)) - an ensemble of cheap deployable tiny models matching heavier models at a fraction of the compute. The debasement thesis in empirical form: the same output is available for less, so the token's price was never its value.
    * **Instructional Fingerprints** ([10.5281/zenodo.22006608](https://mrzk.io/papers/instructional-fingerprints-moe-routing/)) - can you strip weight-level fingerprinting from a finetune? Spurred by Claude starting to watermark its outputs and my paranoia that open weights may already be compromised. Debasement doesn't require closed coinage.
    * **REAP pruning damage** ([10.5281/zenodo.21869190](https://mrzk.io/papers/pruning-damage-evaluation-corpus/)) - an accidental find: post-REAP benchmarks overstate the model, because REAP hits memorisation harder than reasoning. The benchmarks selling you the token are themselves debased.

The general theme in all four of those items is that I was trying to optimise for compute cost on my limited local hardware, and more often than not, these optimisations harmed output quality.

To anyone who's viewed my previous qMLX post(s) or starred my qMLX repository, I must apologise that I've since sold a part of my soul to Nvidia and have abandoned the hipster metal lifestyle for my local setup.

**AI Disclosure**: This essay was written by a human, excuse my rambling. AI was used for proofreading and source research.

Views are my own, not my employer's. Written on my own time, on my own domain

## References

[^1]: [*Bringing Dark Patterns to Light*, FTC staff report, Sep 2022](https://www.ftc.gov/system/files/ftc_gov/pdf/P214800+Dark+Patterns+Report+9.14.2022+-+FINAL.pdf)
[^2]: [*Kahn v. Anthropic, PBC*, No. 3:26-cv-5763, N.D. Cal., filed 14 Jun 2026, class action complaint on Claude Max subscription limits](https://storage.courtlistener.com/recap/gov.uscourts.cand.472161/gov.uscourts.cand.472161.1.0.pdf)
[^3]: [Ed Zitron, "Exclusive: OpenAI Losses Increased Nearly 8X in 2025", *Where's Your Ed At*](https://www.wheresyoured.at/exclusive-openai-financials/)
[^4]: ["Anthropic's leaked financials reflect fast growth, but not a $2 trillion valuation", *Morningstar*](https://www.morningstar.com.au/stocks/anthropics-leaked-financials-reflect-fast-growth-not-2-trillion-valuation)
[^5]: ["How Is ChatGPT's Behavior Changing Over Time?", *Harvard Data Science Review*](https://doi.org/10.1162/99608f92.5317da47)
[^6]: ["OpenAI's GPT-4.5 AI model comes to more ChatGPT users",*TechCrunch*, 5 Mar 2025](https://techcrunch.com/2025/03/05/openais-gpt-4-5-ai-model-comes-to-more-chatgpt-users)
[^7]: ["OpenAI is ending API access to chatgpt-4o-latest in February 2026", *VentureBeat*](https://venturebeat.com/technology/openai-is-ending-api-access-to-fan-favorite-gpt-4o-model-in-february-2026)
[^8]: [r/ChatGPTcomplaints, "Sam Altman lied. No plan to sunset 4o", on the reversal roughly two weeks after the statement](https://www.reddit.com/r/ChatGPTcomplaints/comments/1rx1raa/sam_altman_lied_no_plan_to_sunset_4o_15_days/)
