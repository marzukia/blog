---
author: "Andryo Marzuki"
title: "Collectable Video Games & Market Manipulation"
date: "2021-09-11"
description: "Diving deep into the unraveling collectable video game market, analysing sales data to identify whether potential market manipulation is occuring."
tags: [
    "Data Analysis"
]
---

It's not often that three of my interests mash intersect together, in this case, my love of video games, data and technology. So you can imagine my excitement when I discovered a scandal in the making currently brewing in the collectable gaming world. Two significant players are colluding to inflate prices, causing a bubble rapidly.

This post will go in-depth about the unravelling situation involving Heritage Auctions and Wata (a game grading company) and talk about the evidence in the data supporting the theory that collusion/market manipulation is occurring.

I should be clear; this post has been written purely for educational purposes. While I've used data collected from Heritage Auctions, no copyright infringement is intended.

This article will be pretty long. If you can't read through everything, check the \"Key Findings\" section for a summary of the findings.

As part of this mini-project, [I've made a tool that provides a quasi-population report for any collectable game sold at Heritage Auctions](https://mrzk.io/games/), you can find this tool here. The data I've collected from Heritage Auctions is also freely available for anyone to use for their purposes.

[This data is now available for anyone to use and collected as of the 5th September 2021](https://github.com/marzukia/wata).

# Background

The video game collectables market has recently seen an insane increase in prices, with a copy of Super Mario 64 selling for an absurd US$1.6M. To put things into perspective, this exact copy of Super Mario 64 sold for approximately US$30K a few years ago. To reiterate, a video game that has sold 11 million times just sold for US$1.6M...

A key driving force of this insane price spike is thanks to two companies' efforts, Heritage Auctions and Wata Games. Their behaviour and actions strongly suggest that they are manipulating the market.

## Wata Games & Heritage Auctions

Wata Games is a video gaming grading agency, a company that values an item based on its overall condition and whether it's a loose cartridge, completed in the box, sealed, etc. In their own words, Wata Games describes their services as:

> We have fair, objective grading standards you can count on to help assess a game's condition and authenticity with the utmost confidence in your purchase.

Given Wata Game's role in the collectable video game market, it's clear that they significantly influence the price of collectable games. It quickly becomes alarming when you discover that a co-founder of Heritage Auctions (Jim Halperin) sits on the advisory board of Wata Games.

Jim Halperin, coincidentally, has previously been sued by the Fair Trade Commission (and was essentially fined $1.2M) [for purposefully inflating the prices of collectable coins](https://www.latimes.com/archives/la-xpm-1989-08-10-vw-88-story.html).

# Key Findings

To date, Wata Games has not released a population report. A population report is a critical piece of information that quantifies games that have been graded/assessed to a specific grade. Not releasing this information means that the overall rarity of any given video game is incredibly opaque and can lead to distortions of perceived value. To make things worse, Heritage Auctions does not release the details of buyers or sellers of listings leading to even more room for shady things to happen.

In my analysis of the data I collected, I think I can summarise my findings to the following points:


0. Recent sales of video games at ridiculous prices have distorted the perception of video game prices. The average price of video games has been trending downwards over the last two years.
1. These 'headline' sales are extreme outliers when viewed concerning the distribution of other video game sale prices.
2. Only a handful of games have sale prices more significant than the six-figure mark, and there is seemingly no relationship with a given video game's overall popularity.
3. While not definitive, the data strongly suggests that these 'headline' sales are being used as a mechanism to inflate the prices of games artificially, or at the very least, the perception of said games.

In conclusion, something fishy is going on here.

As I've stated at the start of the article, the data I've collected is [available for download here](https://github.com/marzukia/wata).

# Game Inflation & Activity

If the market were genuinely surging, I'd expect that the max sale price of a collectable game would have a uniform deviation from their average price. If we look at the top ten video games with the highest deviation from their average price we find the following: ![](/images/wata/wata_top_ten_delta_max.png)

If you're at all familiar with video games, these names should be very familiar as they are either culturally iconic games, sold millions of copies, or both.

 ![](/images/wata/wata_top_ten_copies_sold.png)

However, when we look at the maximum prices of these games, we see some very striking outliers. In particular, we have three games (Super Mario 64, Super Mario Bros, The Legend of Zelda) with extremely high sale prices compared to other games in the top ten.

 ![](/images/wata/wata_top_ten_sale_price.png)

If we plot the relationship of these ten games regarding their lifetime copies sold versus their maximum sale price, there is no clear pattern or relationship visible. Granted, the population for this visualisation is small.

 ![](/images/wata/wata_sales_over_time.png)

If we look at all games sales from the available data, we can see some clear outliers. In particular, lets zone in on two of these four sales:

* [Super Mario Bros](https://www.polygon.com/22364101/super-mario-bros-nes-collectible-auction-price-world-record/)
* [Super Mario 64](https://www.newshub.co.nz/home/technology/2021/07/sealed-mario-game-sells-for-us-1-56-million-as-retro-game-prices-soar.html)
* [The Legend of Zelda](https://www.theverge.com/2021/7/9/22570401/legend-of-zelda-nes-sealed-copy-heritage-auctions-most-expensive-game)

The justification for the extreme price premium on these games is that they have some rarity element, i.e. early copies or a missing trademark.

However, is this rarity precious enough to increase the prices tenfold to twentyfold the norm?

Whether or not this scarcity truly justifies the crazy price tag, what's certain is that comments such as \"The last year has seen the market for retro games increase tenfold.\" would achieve what someone attempting to manipulate the market would want to do.

These comments would generate the perception/news coverage that the video game collectable market is the next big thing.

# Market Volumes & Trends

If we were to plot the total value of market activity on a time series and looked over the last two years, we'd see a market with an almost exponential growth curve in terms of value. This is consistent with the narrative you'd be expected to buy in, the video game market is scorching right now, and you should buy games.

 ![](/images/wata/wata_total_sales_over_time.png)

When we look at the distribution of sale prices, we can quickly see that the headline sales, which have caused so much enthusiasm, make an extremely small amount of total sales. A tiny fraction of total sales is between $30K and $1.6M, with \\~99% under $10K.

 ![](/images/wata/wata_histogram.png)

If we instead look at average prices of sales, we see the actual story. On average, video game prices have been trending downwards. If your goal is to inflate games to make a tidy profit, this is not something you want to advertise.

 ![](/images/wata/wata_average_sales_over_time.png)

## Further Reading

If you'd like more information about the key players and accusations, the following are great pieces of media:

* This [Kotaku article](https://kotaku.com/youtuber-accuses-million-dollar-retro-game-sales-of-bei-1847557296) provides an excellent written summary.
* Karl Jobst's video covering the situation covers the topic very well. If you have an hour to kill, I would recommend a watch.
