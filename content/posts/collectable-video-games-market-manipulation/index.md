---
author: "Andryo Marzuki"
title: "Collectable Video Games & Market Manipulation"
date: "2021-09-11"
description: "Diving deep into the unraveling collectable video game market, analysing sales data to identify whether potential market manipulation is occurring."
tags: ["Data Analysis"]
aliases:
  - "/posts/17/"
---

It's not often that three of my interests mash intersect together, in this case, my love of video games, data and technology. So you can imagine my excitement when I discovered a scandal in the making currently brewing in the collectable gaming world. Two significant players are colluding to inflate prices, causing a bubble rapidly.

This post will go in-depth about the unravelling situation involving Heritage Auctions and Wata (a game grading company) and talk about the evidence in the data supporting the theory that collusion/market manipulation is occurring.

I should be clear; this post has been written purely for educational purposes. While I've used data collected from Heritage Auctions, no copyright infringement is intended.

This article will be pretty long. If you can't read through everything, check the \"Key Findings\" section for a summary of the findings.

As part of this mini-project, [I've made a tool that provides a quasi-population report for any collectable game sold at Heritage Auctions](https://mrzk.io/games/), you can find this tool here. The data I've collected from Heritage Auctions is also freely available for anyone to use for their purposes.

[This data is now available for anyone to use and collected as of the 5th September 2021](https://github.com/marzukia/wata).

## Background

The video game collectables market has recently seen an insane increase in prices, with a copy of Super Mario 64 selling for an absurd US$1.6M. To put things into perspective, this exact copy of Super Mario 64 sold for approximately US$30K a few years ago. To reiterate, a video game that has sold 11 million times just sold for US$1.6M...

A key driving force of this insane price spike is thanks to two companies' efforts, Heritage Auctions and Wata Games. Their behaviour and actions strongly suggest that they are manipulating the market.

### Wata Games & Heritage Auctions

Wata Games is a video gaming grading agency, a company that values an item based on its overall condition and whether it's a loose cartridge, completed in the box, sealed, etc. In their own words, Wata Games describes their services as:

> We have fair, objective grading standards you can count on to help assess a game's condition and authenticity with the utmost confidence in your purchase.

Given Wata Game's role in the collectable video game market, it's clear that they significantly influence the price of collectable games. It quickly becomes alarming when you discover that a co-founder of Heritage Auctions (Jim Halperin) sits on the advisory board of Wata Games.

Jim Halperin, coincidentally, has previously been sued by the Fair Trade Commission (and was essentially fined $1.2M) [for purposefully inflating the prices of collectable coins](https://www.latimes.com/archives/la-xpm-1989-08-10-vw-88-story.html).

## Key Findings

To date, Wata Games has not released a population report. A population report is a critical piece of information that quantifies games that have been graded/assessed to a specific grade. Not releasing this information means that the overall rarity of any given video game is incredibly opaque and can lead to distortions of perceived value. To make things worse, Heritage Auctions does not release the details of buyers or sellers of listings leading to even more room for shady things to happen.

In my analysis of the data I collected, I think I can summarise my findings to the following points:

- Recent sales of video games at ridiculous prices have distorted the perception of video game prices.
- These 'headline' sales are extreme outliers when viewed concerning the distribution of other video game sale prices.
- Only a handful of games have sale prices more significant than the six-figure mark, and there is seemingly no relationship with a given video game's overall popularity.
- While not definitive, the data strongly suggests that these 'headline' sales are being used as a mechanism to inflate the prices of games artificially, or at the very least, the perception of said games.

In conclusion, something fishy is going on here.

As I've stated at the start of the article, the data I've collected is [available for download here](https://github.com/marzukia/wata).

## Game Inflation & Activity

If the market were genuinely surging, I'd expect that the max sale price of a collectable game would have a uniform deviation from their average price. If we look at the top ten video games with the highest deviation from their average price we find the following:

{{< bar tag="FIG. 01" cap="TOP TEN GAMES BY DELTA: MAX VS AVERAGE" hint="How far each game's top sale strays above its own average price. The biggest gaps sit on iconic, mass-market titles: the headline sale is 13x to 55x the normal fetch." data="[{\"label\":\"THE LEGEND OF ZELDA\",\"value\":54.99},{\"label\":\"DONKEY KONG\",\"value\":35.85},{\"label\":\"MARIO BROS\",\"value\":30.51},{\"label\":\"SUPER MARIO BROS\",\"value\":29.94},{\"label\":\"SUPER MARIO BROS 3\",\"value\":18.76},{\"label\":\"GYROMITE\",\"value\":16.87},{\"label\":\"F-ZERO\",\"value\":16.65},{\"label\":\"FINAL FANTASY VII\",\"value\":15.97},{\"label\":\"COMMANDO\",\"value\":14.91},{\"label\":\"SUPER MARIO 64\",\"value\":13.54}]" >}}

If you're at all familiar with video games, these names should be very familiar as they are either culturally iconic games, sold millions of copies, or both.

{{< bar tag="FIG. 02" cap="TOP TEN GAMES BY DELTA: COPIES SOLD" hint="The same ten games by lifetime copies sold. Volumes range from 1.1M to 40.2M with no relation to the delta ranking: the rarity narrative does not follow popularity." data="[{\"label\":\"THE LEGEND OF ZELDA\",\"value\":6510000},{\"label\":\"DONKEY KONG\",\"value\":7000000},{\"label\":\"MARIO BROS\",\"value\":2280000},{\"label\":\"SUPER MARIO BROS\",\"value\":40240000},{\"label\":\"SUPER MARIO BROS 3\",\"value\":17280000},{\"label\":\"GYROMITE\",\"value\":1320000},{\"label\":\"F-ZERO\",\"value\":5850000},{\"label\":\"FINAL FANTASY VII\",\"value\":12800000},{\"label\":\"COMMANDO\",\"value\":1140000},{\"label\":\"SUPER MARIO 64\",\"value\":11000000}]" >}}

However, when we look at the maximum prices of these games, we see some very striking outliers. In particular, we have three games (Super Mario 64, Super Mario Bros, The Legend of Zelda) with extremely high sale prices compared to other games in the top ten.

{{< bar tag="FIG. 03" cap="TOP TEN GAMES BY DELTA: MAX SALE PRICE" hint="The same ten games by top sale price. Three names tower over the field: the outliers the key findings keep circling back to." data="[{\"label\":\"THE LEGEND OF ZELDA\",\"value\":870000},{\"label\":\"DONKEY KONG\",\"value\":72000},{\"label\":\"MARIO BROS\",\"value\":156000},{\"label\":\"SUPER MARIO BROS\",\"value\":660000},{\"label\":\"SUPER MARIO BROS 3\",\"value\":156000},{\"label\":\"GYROMITE\",\"value\":33600},{\"label\":\"F-ZERO\",\"value\":10800},{\"label\":\"FINAL FANTASY VII\",\"value\":144000},{\"label\":\"COMMANDO\",\"value\":15600},{\"label\":\"SUPER MARIO 64\",\"value\":1560000}]" >}}

If we plot the relationship of these ten games regarding their lifetime copies sold versus their maximum sale price, there is no clear pattern or relationship visible. Granted, the population for this visualisation is small.

{{< scatter tag="FIG. 04" cap="EVERY SALE, JAN 2019 TO AUG 2021" dense="true" hint="9,286 heritage auctions on one plane. The cloud is the market; four headline sales punch far above it." points="wata_scatter.json" highlights="[8448,1614,4678,6206]" x-min="2019" x-max="2021.9" y-max="1600000" x-ticks="[{\"v\":2019,\"label\":\"2019\"},{\"v\":2020,\"label\":\"2020\"},{\"v\":2021,\"label\":\"2021\"}]" axis-x="SALE DATE" axis-y="SALE PRICE" >}}

If we look at all games sales from the available data, we can see some clear outliers. In particular, lets zone in on two of these four sales:

- [Super Mario Bros](https://www.polygon.com/22364101/super-mario-bros-nes-collectible-auction-price-world-record/)
- [Super Mario 64](https://www.newshub.co.nz/home/technology/2021/07/sealed-mario-game-sells-for-us-1-56-million-as-retro-game-prices-soar.html)
- [The Legend of Zelda](https://www.theverge.com/2021/7/9/22570401/legend-of-zelda-nes-sealed-copy-heritage-auctions-most-expensive-game)

The justification for the extreme price premium on these games is that they have some rarity element, i.e. early copies or a missing trademark.

However, is this rarity precious enough to increase the prices tenfold to twentyfold the norm?

Whether or not this scarcity truly justifies the crazy price tag, what's certain is that comments such as \"The last year has seen the market for retro games increase tenfold.\" would achieve what someone attempting to manipulate the market would want to do.

These comments would generate the perception/news coverage that the video game collectable market is the next big thing.

## Market Volumes & Trends

If we were to plot the total value of market activity on a time series and looked over the last two years, we'd see a market with an almost exponential growth curve in terms of value. This is consistent with the narrative you'd be expected to buy in, the video game market is scorching right now, and you should buy games.

{{< line tag="FIG. 05" cap="TOTAL SALES VALUE OVER TIME" axis-x="MONTH" axis-y="USD TOTAL" hint="Monthly totals with a 5-month trend. July 2021 alone takes $8.9M, but even the smoothed line climbs from $40K to $3.3M." series="[{\"name\":\"5-MO TREND\",\"role\":\"accent\",\"points\":[{\"t\":\"2019-01\",\"v\":40477},{\"t\":\"2019-02\",\"v\":38423},{\"t\":\"2019-03\",\"v\":62620},{\"t\":\"2019-04\",\"v\":61830},{\"t\":\"2019-05\",\"v\":49858},{\"t\":\"2019-06\",\"v\":77819},{\"t\":\"2019-07\",\"v\":83499},{\"t\":\"2019-08\",\"v\":64517},{\"t\":\"2019-09\",\"v\":190260},{\"t\":\"2019-10\",\"v\":197229},{\"t\":\"2019-11\",\"v\":171463},{\"t\":\"2019-12\",\"v\":164187},{\"t\":\"2020-01\",\"v\":251948},{\"t\":\"2020-02\",\"v\":131201},{\"t\":\"2020-03\",\"v\":243103},{\"t\":\"2020-04\",\"v\":256971},{\"t\":\"2020-05\",\"v\":432048},{\"t\":\"2020-06\",\"v\":352089},{\"t\":\"2020-07\",\"v\":500231},{\"t\":\"2020-08\",\"v\":401449},{\"t\":\"2020-09\",\"v\":666543},{\"t\":\"2020-10\",\"v\":517398},{\"t\":\"2020-11\",\"v\":729453},{\"t\":\"2020-12\",\"v\":607817},{\"t\":\"2021-01\",\"v\":635698},{\"t\":\"2021-02\",\"v\":1052842},{\"t\":\"2021-03\",\"v\":1067118},{\"t\":\"2021-04\",\"v\":901817},{\"t\":\"2021-05\",\"v\":2639711},{\"t\":\"2021-06\",\"v\":2715800},{\"t\":\"2021-07\",\"v\":2517957},{\"t\":\"2021-08\",\"v\":3282169}]},{\"name\":\"MONTHLY TOTAL\",\"role\":\"ink2\",\"points\":[{\"t\":\"2019-01\",\"v\":15606},{\"t\":\"2019-02\",\"v\":90156},{\"t\":\"2019-03\",\"v\":15668},{\"t\":\"2019-04\",\"v\":32263},{\"t\":\"2019-05\",\"v\":159409},{\"t\":\"2019-06\",\"v\":11654},{\"t\":\"2019-07\",\"v\":30297},{\"t\":\"2019-08\",\"v\":155473},{\"t\":\"2019-09\",\"v\":60660},{\"t\":\"2019-10\",\"v\":64499},{\"t\":\"2019-11\",\"v\":640371},{\"t\":\"2019-12\",\"v\":65140},{\"t\":\"2020-01\",\"v\":26646},{\"t\":\"2020-02\",\"v\":24278},{\"t\":\"2020-03\",\"v\":503307},{\"t\":\"2020-04\",\"v\":36633},{\"t\":\"2020-05\",\"v\":624653},{\"t\":\"2020-06\",\"v\":95987},{\"t\":\"2020-07\",\"v\":899662},{\"t\":\"2020-08\",\"v\":103513},{\"t\":\"2020-09\",\"v\":777341},{\"t\":\"2020-10\",\"v\":130743},{\"t\":\"2020-11\",\"v\":1421455},{\"t\":\"2020-12\",\"v\":153941},{\"t\":\"2021-01\",\"v\":1163784},{\"t\":\"2021-02\",\"v\":169160},{\"t\":\"2021-03\",\"v\":270151},{\"t\":\"2021-04\",\"v\":3507172},{\"t\":\"2021-05\",\"v\":225321},{\"t\":\"2021-06\",\"v\":337281},{\"t\":\"2021-07\",\"v\":8858630},{\"t\":\"2021-08\",\"v\":650595}]}]" >}}

When we look at the distribution of sale prices, we can quickly see that the headline sales, which have caused so much enthusiasm, make an extremely small amount of total sales. A tiny fraction of total sales is between $30K and $1.6M, with \\~99% under $10K.

{{< bar tag="FIG. 06" cap="HISTOGRAM OF SALE PRICES" hint="97% of sales land under $10K. Three sales sit above $500K; everything between is a thinning tail." data="[{\"label\":\"$0-500\",\"value\":5371},{\"label\":\"$500-1K\",\"value\":1483},{\"label\":\"$1-2K\",\"value\":1046},{\"label\":\"$2-5K\",\"value\":782},{\"label\":\"$5-10K\",\"value\":304},{\"label\":\"$10-20K\",\"value\":153},{\"label\":\"$20-50K\",\"value\":99},{\"label\":\"$50-100K\",\"value\":27},{\"label\":\"$100-500K\",\"value\":18},{\"label\":\"$500K+\",\"value\":3}]" >}}


### Further Reading

If you'd like more information about the key players and accusations, the following are great pieces of media:

- This [Kotaku article](https://kotaku.com/youtuber-accuses-million-dollar-retro-game-sales-of-bei-1847557296) provides an excellent written summary.
- Karl Jobst's video covering the situation covers the topic very well. If you have an hour to kill, I would recommend a watch.
