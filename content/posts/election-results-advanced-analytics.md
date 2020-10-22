---
author: "Andryo Marzuki"
title: "Breaking Down the Elections... Like a Sport?"
date: "2020-10-21"
description: "With the New Zealand 2020 general elections now over, I can have a deep dive into the election results. This article treats the election results as if it were a sport... which means bringing out the big guns, advanced analytics."
tags: [
    "Data Analysis", "Geospatial"
]
draft: true
---

I’ll be the first to admit that I’m not the greatest fan of politics, in a typical scenario I’d avoid talking about it like the plague. However, as the elections have come and gone, it’d be sacrilege for me to pretend the goldmine of electoral data now available did not exist.

In this case, my love for all things data outweighs my disdain for politics. So I thought, why not make it fun?
In Basketball, there is a litany of metrics which can give a different perspective on how good a player is. There are standard metrics like Points per Game, or Assists per Game which give a pretty obvious indicator of a player’s contribution to a game, and more detailed measurements such as ‘Offensive Rating’ which are far more complex. For example, ‘Offensive Rating’ attempts to paint an overall picture of how well a player plays offensively by not only his points contribution but things like how well he passes or how well he sets screens for a play.

So in the theme of treating the elections like a sport, our ‘plain jane’ metrics would be votes received and seats gained. What about our complex or advanced metrics? What can we do to get a better idea of the ‘full picture’?

> **Note**: Please keep in mind that there are quite a few assumptions which have been made, aswell as limitations of the data itself. For my methodology, approach and commentary on decisions around the underlying data please see the end of this article.

## Donation Utilisation Efficiency

Measures which explicitly look at the return on hard-earned dollars are the norm in almost every industry; it’s natural to want to understand what you’re getting out of spending your hard-earned dollar(s). For a political party, the equivalent of money going in would be donations received from the government and their private supporters.

> **Note**: olitical parties have to disclose what they receive in donations each year. Unfortunately, at the time of writing this data was not available for 2020. The figures discussed in this section are the sum of contributions received by each party in 2018 and 2019.

As a banker, I love my acronyms. Therefore I have devised a new one ‘Donation Utilisation Efficiency’, or DUE for short. DUE looks at the ratio of donations received per party, and the overall results achieved by the said party; this metric looks at both seats and votes acquired.

This metric intends to do the following:
* Act as my proxy to quantify the overall 'brand power' of each party (votes)
* Describe how effectively they've translated party donations into actual power (seats)

| Party Name      | Seats | Votes   | Donations (18-19) | DUE ($/Seats)     | DUE ($/Votes) |
|-----------------|-------|---------|-------------------|------------|--------|
| National Party  | 35    | 638,393  | $1,963,782.23     | $56,108.06 | $3.08  |
| Labour Party    | 64    | 1,169,397 | $957,262.70       | $14,957.23 | $0.82  |
| Green Party     | 10    | 180,224  | $942,746.53       | $94,274.65 | $5.23  |
| ACT New Zealand | 10    | 190,106  | $477,097.00       | $47,709.70 | $2.51  |

<img src="/images/votes_seats_party.png" width="100%" alt="votes_seats_party" />

The graph and table above is a summary of the main parties, and how well they've translated their donation funds into both votes and seats.

## Voter Age Demographics

Age plays a big factor on who you would likely vote for, this is simply due to the fact that your age will dictate things like your phase in life, asset ownership or general financial security.

<img src="/images/age_party.png" width="100%" alt="age_party" />

There wasn't much that I wasn't expecting when seeing the results, key take-aways being:
* The left leaning parties (Green and Labour) have far greater representation for the younger generations (Gen X and Millenials).
* Conversely, the right leaning parties have far greater representation of the older generation.

## Voter Housing Demographics

The housing crisis in New Zealand is one of the biggest issues that New Zealand currently faces, so naturally I wanted to make a graph on that too.

<img src="/images/housing_party.png" width="100%" alt="housing_party" />

There are some really interesting that instantly pop out to me when I view this data:
* Labor has a massive porportion of their voter base that do not own homes, I was incredibly surprised by this given that Labor's position on the matter is 'keep house prices as they are'.
* The majority of National and ACT supports own their own homes, so it feels inituive that the housing crisis would not be as front of mind as it would be for Green/Labour supporters.

## Power Rankings

In the next few sections I'll attempt a 'power ranking' of sorts of the four political parties noted.

### 1. Labour
It's not an easy feat to have a single majority in an MMP government, but Labour has done it. Regardless of how you view Labour's policy, there's no denying that Jacinda Ardern has been an excellent crisis leader over the last three years handling the major incidents like the Christchurch Mosque Shootings, White Island Eruption, and now the COVID-19 pandemic very well.

I'd say that Jacinda is more or less Labour at this point, and the DUE reflects that. The cost for Labour to influence voters and convert their relatively scarce resources into seats is significantly less than their competition.

Labour's position is more or less 'keep the status quo' - maybe that's just what New Zealanders want?

Labour has some significant challenges in their near future with some of the key ones being:
* Handling of the COVID19 recovery both economically and socially. Would be continued and prolonged lockdowns erode the public goodwill in the Labour 'brand'?
* Opposition from both the right and left will likely cause additional pressure Labour did not experience in their last term.
* Actually dealing with the housing crisis. 80% of their voters do not own their own home; it's a serious no brainer to deal with this if they want to retain their voting base.

### 2. National
It couldn't of been easy to be the opposition to a party which had recently sucessfully contained a pandemic. The constant string of internal bickering, leaks and controversies definitely also did not help.

Their perfect storm of missteps and misfortune has predictable results:
* Right leaning national supports fled in droves to the likes of ACT and New Conservative.
* In an attempt to recover these voters, National shifted further right in their policies around tax breaks, gun control, and border control causing their more centrist supporters to shift inwards towards Labour.
* This resulted in National seeing a massive decline losing 21 seats between elections, long held seats such as Ilam were lost to Labour.
* Despite only receiving 26% of votes, National by far has the greatest amount of donations with nearly double the next highest party.
* Compared to their greatest rival, Labour's DUE was three times less than National indicating it was far easier for them to influence voters to vote for them or rather voters were already inclined to vote for them over National.their mo

In summary, National did bad - but I didn't have to tell you that did I?

### 3. Greens
I've placed Greens ahead of ACT as I feel that Labour would be much more willing to deal with the Greens due to their closer ideologies.

### 4. ACT
Wow! ACT came back with a vengence coming in with 9 extra seats than they had the previous elections.

## Assumptions, Limitations & Methodology

If you're not a data geek, I'd advise you skip this section as your eyes may glaze over.