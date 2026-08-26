---
author: "Andryo Marzuki"
title: "Modelling the Unseen: A Statistical Look at COVID-19's Impact on Voter Behaviour"
seotitle: "Did COVID-19 Make Trump President?"
date: "2025-04-23"
description: "I've long entertained a personal pet conspiracy theory that COVID-19 has had a far deeper impact on Trump's re-election in 2024 than most realise. While numerous factors undoubtedly contributed to Trump's victory, this article specifically explores the subtle but significant role COVID-19 may have played."
tags: ["Data", "World"]
slug: "did-covid19-make-trump-president"
lastmod: "2025-04-23"
canonicalURL: "https://mrzk.io/posts/did-covid19-make-trump-president/"
keywords:
    - covid-19 election impact
    - 2024 us election analysis
    - voter disenfranchisement
    - long covid politics
    - political data analysis
---

As a non-American observing America’s enthusiastic self-destructing, I find it utterly baffling that a man like Donald Trump could secure a second term. Over half the nation saw the individual who somehow achieved the rare feat of bankrupting not one but two casinos, which are famously designed to print money, as the best choice to lead the country. There's definitely something wrong with America right?

I've long entertained a personal pet conspiracy theory that COVID-19 has had a far deeper impact on Trump's re-election in 2024 than most realise. While numerous factors undoubtedly contributed to Trump's victory, this article specifically explores the subtle but significant role COVID-19 may have played.

My hypothesis revolves around the idea that COVID-19 exacerbated existing socioeconomic inequalities among marginalised communities, making them easier targets for disenfranchisement, whether intentional or accidental. This was compounded by targeted misinformation campaigns and systemic neglect, ultimately diminishing voter turnout among communities less likely to support Trump.

Although I initially approached this topic somewhat facetiously, the data aligned surprisingly well with my suspicion, compelling me to fully commit to this analysis.

In short: Did COVID-19 help Trump win the 2024 election? Probably. But you'll need to read on for the long answer.

## The Neoliberal Playbook: Disenfranchisement

To understand how COVID-19 may have materially influenced the outcome of the 2024 election, it is first necessary to grasp the role of neoliberalism in shaping contemporary American governance. This section serves as essential context for the remainder of the analysis.

Neoliberalism in the United States often manifests through policies that systematically disenfranchise those least likely to support conservative interests, particularly marginalised or economically vulnerable communities. This disenfranchisement is not incidental but is integral to the neoliberal project.

It typically takes the form of privatising essential public services such as healthcare and education, implementing austerity measures, concentrating decision-making in the hands of unelected technocrats (cough, Elon Musk), and deploying voter suppression tactics including gerrymandering and restrictive voter ID laws. These mechanisms, whether legal, procedural or administrative, function to erect barriers that disproportionately hinder political participation among already disadvantaged groups.

Understanding this deliberate strategy of exclusion is crucial; without it, the broader implications of pandemic-era policies on democratic participation cannot be fully appreciated.

### Undermining Education, Shaping Votes

Given the stark differences in voting patterns between college-educated and non-degree holders, it's unsurprising that Republicans consistently seek to defund public education[^3]. For instance, the 2024 Republican education bill proposed slashing $64 billion (28%) from education budgets, severely impacting critical programmes such as Title I funding, special education, and support for English learners.

This deliberate undermining of education cultivates a populace less capable of critically evaluating political information, leaving them more susceptible to emotional manipulation, political apathy, and anti-government sentiment. Conversely, research consistently demonstrates that improved media literacy education significantly boosts civic engagement and reduces political apathy[^5].

Statistically, lower education levels, particularly among White voters, correlate strongly with increased Republican support. This dynamic reinforces existing inequalities and pushes marginalised communities further towards political disengagement or manipulation[^4].

{{< bar tag="FIG. 01" cap="EXIT POLLS 2024: EDUCATION AND RACE" hint="56% of college graduates voted DEM. White non-graduates voted GOP 66 to 32. The education gap is the widest split in the exit data and holds across every race group." data="[{\"label\":\"COLLEGE GRADUATE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":56},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":42}]},{\"label\":\"NO COLLEGE DEGREE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":43},{\"name\":\"OTHER\",\"value\":1},{\"name\":\"REPUBLICAN\",\"value\":56}]},{\"label\":\"WHITE COLLEGE GRADUATE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":53},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":45}]},{\"label\":\"WHITE NO COLLEGE DEGREE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":32},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":66}]},{\"label\":\"NON-WHITE COLLEGE GRADUATE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":65},{\"name\":\"OTHER\",\"value\":3},{\"name\":\"REPUBLICAN\",\"value\":32}]},{\"label\":\"NON-WHITE NO COLLEGE DEGREE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":64},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":34}]}]" >}}

The relationship between education, race, and political alignment is stark: Non-White, college-educated voters overwhelmingly favour Democrats, highlighting education's strong correlation with Democratic support. In contrast, White voters without college degrees predominantly vote Republican, illustrating how education intersects significantly with racial identity to shape voting behaviours. This pronounced educational gap remains consistent across racial groups, underscoring education's pivotal role in shaping electoral outcomes.

Younger voters and voters of colour have increasingly become targets of Republican voter-suppression tactics. In North Carolina, Republicans contested over 65,000 ballots, primarily from college students, unsuccessfully attempting to overturn election results[^11]. Similarly, in Florida, Governor DeSantis's administration penalised voter-registration groups for minor procedural infractions, disproportionately impacting minority communities[^12].

### Making Voting Harder (For Some)

Rather than explicitly prohibiting voting, Republicans typically create logistical and administrative hurdles designed to discourage participation among voters unlikely to support them, effectively eroding democracy by attrition.

{{< bar tag="FIG. 02" cap="EXIT POLLS 2024: RACE AND GENDER" hint="Black women voted 92% DEM; white men 60% GOP. Inside every race group, women outvote men for DEM by 8 to 15 points." data="[{\"label\":\"MEN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":43},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":55}]},{\"label\":\"WOMEN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":53},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":45}]},{\"label\":\"WHITE MALE\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":38},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":60}]},{\"label\":\"WHITE WOMAN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":46},{\"name\":\"OTHER\",\"value\":1},{\"name\":\"REPUBLICAN\",\"value\":53}]},{\"label\":\"BLACK MEN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":77},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":21}]},{\"label\":\"BLACK WOMEN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":92},{\"name\":\"OTHER\",\"value\":1},{\"name\":\"REPUBLICAN\",\"value\":7}]},{\"label\":\"LATINO MEN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":44},{\"name\":\"OTHER\",\"value\":2},{\"name\":\"REPUBLICAN\",\"value\":54}]},{\"label\":\"LATINO WOMEN\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":58},{\"name\":\"OTHER\",\"value\":3},{\"name\":\"REPUBLICAN\",\"value\":39}]},{\"label\":\"ALL OTHER RACES\",\"value\":100,\"parts\":[{\"name\":\"DEMOCRAT\",\"value\":49},{\"name\":\"OTHER\",\"value\":4},{\"name\":\"REPUBLICAN\",\"value\":47}]}]" >}}

Black voters overwhelmingly support Democrats, and Latino voters also lean Democratic, although less decisively. Conversely, White men strongly favour Republicans, with White women also generally leaning Republican, albeit more moderately. Additionally, women across all racial groups consistently prefer Democrats, emphasising gender's significant influence on voting behaviour.

A particularly egregious example of Republican tactics is the SAVE Act. Presented as a measure to enhance election security, the Act demands documentary proof of citizenship, such as birth certificates or passports, in order to vote. This significantly disadvantages women who have changed their surnames following marriage, as well as transgender individuals whose documents might not reflect their current identity.

Approximately 69 million American women lack identification matching their birth names[^6], and more than half the population does not possess a passport[^7]. Consequently, voting becomes effectively paywalled, disproportionately impacting groups historically less supportive of Republicans.

Republican-led voter roll purges, justified by claims of preventing fraud, frequently remove thousands of legitimate voters. For instance, in 2024, Virginia Governor Youngkin’s administration purged over 6,000 voters, many of whom were later confirmed eligible. Despite initial legal challenges, the U.S. Supreme Court ultimately permitted this purge to proceed[^9]. Similar attempts in Alabama, however, were blocked for violating federal election laws[^10].

## COVID-19 and the 2024 Election

COVID-19 became a potent instrument of voter disenfranchisement, largely through the proliferation of disinformation campaigns[^13]. Social media platforms were inundated with misleading content, much of it specifically targeting communities of colour, sowing confusion around voting procedures and eligibility.

This phenomenon was not confined to the United States. In New Zealand, a similar dynamic unfolded when the rural protest movement Groundswell, originally formed to oppose regulatory and environmental reforms affecting farmers, began attracting support from individuals aligned with anti-lockdown and anti-vaccine ideologies. While these views were not part of Groundswell’s founding purpose, they increasingly found a platform within its broader protest activity, particularly during the height of pandemic-related restrictions.

At the time, the Labour Government had implemented stringent but effective lockdown measures. Groundswell received vocal support from the National and ACT parties [^15], and later also from New Zealand First. These three parties would go on to form the coalition government following the general election.

Thus, COVID-19 intensified existing inequalities, erected new voting barriers, and amplified targeted misinformation, significantly suppressing democratic participation in marginalised communities.

### Vaccinations & Voting

Political affiliation strongly influenced vaccination rates, with clear party divides: 92% Democrats, 68% Independents, and only 56% Republicans vaccinated[^14].

A distinct correlation emerged in 2024 data showing lower vaccination rates strongly associated with higher Republican vote shares. This relationship was notably absent in 2020, suggesting vaccination status became a politically defining factor between 2020 and 2024.

{{< scatter tag="FIG. 03" cap="GOP VOTE SHARE VS UNVACCINATED, 2024" dense="true" hint="1,573 counties. The unvaccinated rate tracks GOP share hard: r = 0.61, r-squared 0.37. Red line is the least-squares fit, the band its 95% confidence interval." points="fig-scatter-2024.json" y-fmt="pct" trend="{\"x0\":1.8,\"y0\":49.6,\"x1\":72.6,\"y1\":90.53}" trend-band="[{\"x\":1.8,\"y\":48.31},{\"x\":4.16,\"y\":49.76},{\"x\":6.52,\"y\":51.2},{\"x\":8.88,\"y\":52.64},{\"x\":11.24,\"y\":54.08},{\"x\":13.6,\"y\":55.52},{\"x\":15.96,\"y\":56.95},{\"x\":18.32,\"y\":58.38},{\"x\":20.68,\"y\":59.81},{\"x\":23.04,\"y\":61.23},{\"x\":25.4,\"y\":62.64},{\"x\":27.76,\"y\":64.04},{\"x\":30.12,\"y\":65.43},{\"x\":32.48,\"y\":66.8},{\"x\":34.84,\"y\":68.17},{\"x\":37.2,\"y\":69.51},{\"x\":39.56,\"y\":70.85},{\"x\":41.92,\"y\":72.17},{\"x\":44.28,\"y\":73.48},{\"x\":46.64,\"y\":74.79},{\"x\":49.0,\"y\":76.09},{\"x\":51.36,\"y\":77.39},{\"x\":53.72,\"y\":78.68},{\"x\":56.08,\"y\":79.97},{\"x\":58.44,\"y\":81.26},{\"x\":60.8,\"y\":82.55},{\"x\":63.16,\"y\":83.83},{\"x\":65.52,\"y\":85.12},{\"x\":67.88,\"y\":86.4},{\"x\":70.24,\"y\":87.68},{\"x\":72.6,\"y\":88.96},{\"x\":72.6,\"y\":88.96},{\"x\":72.6,\"y\":92.09},{\"x\":70.24,\"y\":90.64},{\"x\":67.88,\"y\":89.2},{\"x\":65.52,\"y\":87.75},{\"x\":63.16,\"y\":86.31},{\"x\":60.8,\"y\":84.86},{\"x\":58.44,\"y\":83.42},{\"x\":56.08,\"y\":81.98},{\"x\":53.72,\"y\":80.54},{\"x\":51.36,\"y\":79.11},{\"x\":49.0,\"y\":77.68},{\"x\":46.64,\"y\":76.25},{\"x\":44.28,\"y\":74.83},{\"x\":41.92,\"y\":73.41},{\"x\":39.56,\"y\":72.01},{\"x\":37.2,\"y\":70.61},{\"x\":34.84,\"y\":69.23},{\"x\":32.48,\"y\":67.86},{\"x\":30.12,\"y\":66.51},{\"x\":27.76,\"y\":65.17},{\"x\":25.4,\"y\":63.85},{\"x\":23.04,\"y\":62.53},{\"x\":20.68,\"y\":61.22},{\"x\":18.32,\"y\":59.92},{\"x\":15.96,\"y\":58.62},{\"x\":13.6,\"y\":57.32},{\"x\":11.24,\"y\":56.03},{\"x\":8.88,\"y\":54.74},{\"x\":6.52,\"y\":53.46},{\"x\":4.16,\"y\":52.17},{\"x\":1.8,\"y\":50.89}]" x-min="0" x-max="75" y-max="95" axis-x="UNVACCINATED RATE" axis-y="GOP VOTE SHARE" >}}

{{< scatter tag="FIG. 04" cap="GOP VOTE SHARE VS UNVACCINATED, 2020" dense="true" hint="The same counties in 2020: r falls to 0.26, r-squared 0.07. The vaccination to GOP link is a 2024 shift, not a stable county trait." points="fig-scatter-2020.json" y-fmt="pct" trend="{\"x0\":1.8,\"y0\":57.09,\"x1\":72.6,\"y1\":75.91}" trend-band="[{\"x\":1.8,\"y\":55.39},{\"x\":4.16,\"y\":56.12},{\"x\":6.52,\"y\":56.85},{\"x\":8.88,\"y\":57.58},{\"x\":11.24,\"y\":58.31},{\"x\":13.6,\"y\":59.03},{\"x\":15.96,\"y\":59.75},{\"x\":18.32,\"y\":60.47},{\"x\":20.68,\"y\":61.17},{\"x\":23.04,\"y\":61.87},{\"x\":25.4,\"y\":62.56},{\"x\":27.76,\"y\":63.24},{\"x\":30.12,\"y\":63.9},{\"x\":32.48,\"y\":64.54},{\"x\":34.84,\"y\":65.16},{\"x\":37.2,\"y\":65.77},{\"x\":39.56,\"y\":66.35},{\"x\":41.92,\"y\":66.93},{\"x\":44.28,\"y\":67.49},{\"x\":46.64,\"y\":68.04},{\"x\":49.0,\"y\":68.58},{\"x\":51.36,\"y\":69.12},{\"x\":53.72,\"y\":69.65},{\"x\":56.08,\"y\":70.18},{\"x\":58.44,\"y\":70.71},{\"x\":60.8,\"y\":71.24},{\"x\":63.16,\"y\":71.76},{\"x\":65.52,\"y\":72.28},{\"x\":67.88,\"y\":72.8},{\"x\":70.24,\"y\":73.32},{\"x\":72.6,\"y\":73.84},{\"x\":72.6,\"y\":73.84},{\"x\":72.6,\"y\":77.98},{\"x\":70.24,\"y\":77.24},{\"x\":67.88,\"y\":76.51},{\"x\":65.52,\"y\":75.77},{\"x\":63.16,\"y\":75.04},{\"x\":60.8,\"y\":74.31},{\"x\":58.44,\"y\":73.58},{\"x\":56.08,\"y\":72.85},{\"x\":53.72,\"y\":72.13},{\"x\":51.36,\"y\":71.4},{\"x\":49.0,\"y\":70.69},{\"x\":46.64,\"y\":69.98},{\"x\":44.28,\"y\":69.27},{\"x\":41.92,\"y\":68.58},{\"x\":39.56,\"y\":67.9},{\"x\":37.2,\"y\":67.23},{\"x\":34.84,\"y\":66.58},{\"x\":32.48,\"y\":65.95},{\"x\":30.12,\"y\":65.34},{\"x\":27.76,\"y\":64.74},{\"x\":25.4,\"y\":64.17},{\"x\":23.04,\"y\":63.6},{\"x\":20.68,\"y\":63.05},{\"x\":18.32,\"y\":62.5},{\"x\":15.96,\"y\":61.96},{\"x\":13.6,\"y\":61.42},{\"x\":11.24,\"y\":60.89},{\"x\":8.88,\"y\":60.36},{\"x\":6.52,\"y\":59.84},{\"x\":4.16,\"y\":59.31},{\"x\":1.8,\"y\":58.79}]" x-min="0" x-max="75" y-max="95" axis-x="UNVACCINATED RATE" axis-y="GOP VOTE SHARE" >}}

Interestingly, poverty levels did not correlate strongly with lower vaccination rates, countering the intuitive expectation that poorer counties would be less vaccinated due to education or resource barriers.

{{< scatter tag="FIG. 05" cap="POVERTY VS UNVACCINATED RATE" dense="true" hint="Poverty and vaccination barely correlate: r = 0.15, r-squared 0.02. Poor counties are not the unvaccinated ones. Party, not income, splits the map." points="fig-scatter-poverty.json" y-fmt="pct" trend="{\"x0\":1.8,\"y0\":12.87,\"x1\":52.7,\"y1\":15.3}" trend-band="[{\"x\":1.8,\"y\":12.31},{\"x\":3.5,\"y\":12.42},{\"x\":5.19,\"y\":12.52},{\"x\":6.89,\"y\":12.63},{\"x\":8.59,\"y\":12.74},{\"x\":10.28,\"y\":12.85},{\"x\":11.98,\"y\":12.95},{\"x\":13.68,\"y\":13.06},{\"x\":15.37,\"y\":13.16},{\"x\":17.07,\"y\":13.27},{\"x\":18.77,\"y\":13.37},{\"x\":20.46,\"y\":13.47},{\"x\":22.16,\"y\":13.57},{\"x\":23.86,\"y\":13.67},{\"x\":25.55,\"y\":13.76},{\"x\":27.25,\"y\":13.85},{\"x\":28.95,\"y\":13.94},{\"x\":30.64,\"y\":14.02},{\"x\":32.34,\"y\":14.1},{\"x\":34.04,\"y\":14.18},{\"x\":35.73,\"y\":14.25},{\"x\":37.43,\"y\":14.32},{\"x\":39.13,\"y\":14.39},{\"x\":40.82,\"y\":14.45},{\"x\":42.52,\"y\":14.51},{\"x\":44.22,\"y\":14.58},{\"x\":45.91,\"y\":14.63},{\"x\":47.61,\"y\":14.69},{\"x\":49.31,\"y\":14.75},{\"x\":51.0,\"y\":14.81},{\"x\":52.7,\"y\":14.86},{\"x\":52.7,\"y\":14.86},{\"x\":52.7,\"y\":15.74},{\"x\":51.0,\"y\":15.63},{\"x\":49.31,\"y\":15.53},{\"x\":47.61,\"y\":15.42},{\"x\":45.91,\"y\":15.32},{\"x\":44.22,\"y\":15.22},{\"x\":42.52,\"y\":15.11},{\"x\":40.82,\"y\":15.01},{\"x\":39.13,\"y\":14.92},{\"x\":37.43,\"y\":14.82},{\"x\":35.73,\"y\":14.73},{\"x\":34.04,\"y\":14.64},{\"x\":32.34,\"y\":14.55},{\"x\":30.64,\"y\":14.47},{\"x\":28.95,\"y\":14.39},{\"x\":27.25,\"y\":14.32},{\"x\":25.55,\"y\":14.25},{\"x\":23.86,\"y\":14.18},{\"x\":22.16,\"y\":14.11},{\"x\":20.46,\"y\":14.05},{\"x\":18.77,\"y\":13.99},{\"x\":17.07,\"y\":13.93},{\"x\":15.37,\"y\":13.87},{\"x\":13.68,\"y\":13.81},{\"x\":11.98,\"y\":13.76},{\"x\":10.28,\"y\":13.7},{\"x\":8.59,\"y\":13.65},{\"x\":6.89,\"y\":13.59},{\"x\":5.19,\"y\":13.54},{\"x\":3.5,\"y\":13.48},{\"x\":1.8,\"y\":13.43}]" x-min="0" x-max="55" y-max="25" axis-x="UNVACCINATED RATE" axis-y="POVERTY RATE" >}}

### Estimating Long COVID's Hidden Impact

This section ventures into more speculative territory. Data constraints limit firm conclusions, but my ~~conspiracy theory~~ general hypothesis includes:

- Republican-leaning counties, with lower vaccination rates, likely faced greater vulnerability to long COVID. Studies indicate vaccinated individuals experience significantly lower risks of developing persistent symptoms[^1].
- Long COVID symptoms (e.g., cognitive impairment or "brain fog") could further diminish political engagement, increase susceptibility to misinformation, and exacerbate socioeconomic disparities.

Due to limited county-level long COVID data, I've simulated potential prevalence using COVID case and vaccination rates. This simulation provides a structured estimate of how long COVID may disproportionately impact areas with low vaccine uptake.

Using Monte Carlo simulation, I estimated county-level long COVID prevalence based on COVID cases, vaccination status, and established risk factors. Running 10,000 simulations, outcomes were normalised per 100,000 residents and classified by political leaning. Results allowed comparison between Democrat and Republican counties, exploring how vaccination rates potentially influence broader political dynamics.

{{< bar tag="FIG. 06" cap="LONG COVID PER 100K: GOP VS DEM COUNTIES" hint="10,000 Monte Carlo runs, clipped at 1000 per 100k. Y axis is histogram density on a 1e-3 scale. The GOP distribution sits right of DEM with a fatter upper tail." data="[{\"label\":\"2-37\",\"value\":2.866},{\"label\":\"37-71\",\"value\":2.456},{\"label\":\"71-106\",\"value\":2.32},{\"label\":\"106-140\",\"value\":3.684},{\"label\":\"140-174\",\"value\":3.957},{\"label\":\"174-209\",\"value\":2.664},{\"label\":\"209-243\",\"value\":2.784},{\"label\":\"243-278\",\"value\":2.456},{\"label\":\"278-312\",\"value\":3.065},{\"label\":\"312-346\",\"value\":2.364},{\"label\":\"346-381\",\"value\":1.683},{\"label\":\"381-415\",\"value\":1.462},{\"label\":\"415-450\",\"value\":1.262},{\"label\":\"450-484\",\"value\":0.881},{\"label\":\"484-518\",\"value\":1.042},{\"label\":\"518-553\",\"value\":0.682},{\"label\":\"553-587\",\"value\":0.421},{\"label\":\"587-622\",\"value\":0.501},{\"label\":\"622-656\",\"value\":0.24},{\"label\":\"656-690\",\"value\":0.3},{\"label\":\"690-725\",\"value\":0.136},{\"label\":\"725-759\",\"value\":0.24},{\"label\":\"759-794\",\"value\":0.02},{\"label\":\"794-828\",\"value\":0.02},{\"label\":\"828-862\",\"value\":0.136},{\"label\":\"862-897\",\"value\":0.04},{\"label\":\"897-931\",\"value\":0.06},{\"label\":\"931-966\",\"value\":0.136},{\"label\":\"966-1000\",\"value\":0.546}]" series="[{\"name\":\"DEM COUNTIES\",\"values\":[2.866,2.456,2.32,3.684,3.957,2.32,1.91,2.456,1.91,1.092,0.273,0.682,0.682,0.136,0.136,0.682,0.136,0.273,0.0,0.136,0.136,0.0,0.0,0.0,0.136,0.0,0.0,0.136,0.546]},{\"name\":\"GOP COUNTIES\",\"values\":[0.681,1.002,1.342,1.583,2.344,2.664,2.784,2.284,3.065,2.364,1.683,1.462,1.262,0.881,1.042,0.601,0.421,0.501,0.24,0.3,0.06,0.24,0.02,0.02,0.04,0.04,0.06,0.02,0.06]}]" ticks="[{\"at\":0,\"label\":\"0\"},{\"at\":5,\"label\":\"200\"},{\"at\":11,\"label\":\"400\"},{\"at\":17,\"label\":\"600\"},{\"at\":22,\"label\":\"800\"},{\"at\":28,\"label\":\"1000\"}]" >}}

Republican-leaning counties exhibit distinctly higher estimated long COVID prevalence, suggesting a potential public health and socioeconomic divergence along political lines.

Although these estimates can't definitively prove long COVID’s electoral influence, they indicate it likely had some impact. Across counties analysed, around 500,000 long COVID cases were estimated, alongside a notable increase in Republican votes (approximately 2.5 million) between elections, despite incomplete data coverage.

## Conclusion

A fundamental rule of statistics remains: correlation does not equal causation. Nonetheless, the evidence strongly suggests COVID-19 played a substantial role in Trump's 2024 victory.

To summarise clearly:

- COVID-19 likely contributed, intentionally or not, to voter disenfranchisement.
- Low vaccination rates correlated strongly with Republican support in 2024, suggesting vaccination status became politicised.
- Republican counties, due to lower vaccinations, face higher long COVID risks and potential ongoing cognitive impacts.
- Political affiliation is more strongly linked with vaccination rates than poverty or education, although these may indirectly influence the situation.

If you disagree with my conclusions, please challenge them. While I believe my analysis holds water, constructive discourse is always welcome, and there is always a chance I have overlooked something crucial.

In short, COVID-19 just gave us one more reason to dislike it.

## Appendix

- [GitHub Repo](https://github.com/marzukia/covid-trump-analysis)
- [Exit Poll Demographics](https://www.nbcnews.com/politics/2024-elections/exit-polls)
- [2020 & 2024 Voting Data](https://github.com/tonmcg/US_County_Level_Election_Results_08-24)
- [County Level Vaccination Data](https://data.cdc.gov/Vaccinations/COVID-19-Vaccinations-in-the-United-States-County/8xkx-amqh)
- [County Level COVID-19 Data](https://covid.cdc.gov/covid-data-tracker/#datatracker-home)
- [County Poverty Data](https://data.ers.usda.gov/reports.aspx?ID=4040)

## References

[^1]: [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC10664948/) "Association between long COVID and vaccination: A 12-month follow-up study in a low- to middle-income country"
[^2]: [www.nbcnews.com](https://www.nbcnews.com/politics/2024-elections/exit-polls) "2024 Elections Exit Polls"
[^3]: [democrats-appropriations.house.gov](https://democrats-appropriations.house.gov/news/fact-sheets/fact-sheet-house-republican-funding-bill-denies-education-and-training) "FACT SHEET: House Republican Funding Bill Denies Education and Training Opportunities for Students and Job Seekers at All Stages of Life"
[^4]: [files.eric.ed.gov](https://files.eric.ed.gov/fulltext/EJ1151035.pdf) "News Media Literacy and Political Engagement: What's the Connection?"
[^5]: [www.researchgate.net](https://www.researchgate.net/publication/340394976_Media_Literacy_Dimension_in_Reinforcing_Political_Participation_Integrity_Among_Young_People_in_Social_Media) "Media Literacy Dimension in Reinforcing Political Participation Integrity Among Young People in Social Media"
[^6]: [www.americanprogress.org](https://www.americanprogress.org/article/the-save-act-would-disenfranchise-millions-of-citizens/) "The SAVE Act Would Disenfranchise Millions of Citizens"
[^7]: [today.yougov.com](https://today.yougov.com/travel/articles/46028-adults-under-30-more-likely-have-us-passport) "Adults under 30 are more likely than older Americans to have a current U.S. passport"
[^8]: [www.npr.org](https://www.npr.org/2025/04/13/g-s1-59684/save-act-married-women-vote-rights-explained) "Will the SAVE Act make it harder for married women to vote? We ask legal experts"
[^9]: [apnews.com](https://apnews.com/article/north-carolina-governor-legislature-elections-board-auditor-44db0cb156c701577b9cb2d22b1d135f) "North Carolina judges block GOP law to strip governor’s election board powers"
[^10]: [edition.cnn.com](https://edition.cnn.com/2024/09/29/politics/alabama-justice-department-election-lawsuit/index.html) "Justice Department sues Alabama over its effort to remove more than 3,000 names from voter rolls too close to election"
[^11]: [www.teenvogue.com](https://www.teenvogue.com/story/north-carolina-republicans-college-students-votes-election) "North Carolina Republicans are Trying to Throw Out College Students’ Votes to Steal an Election"
[^12]: [www.theguardian.com](https://www.theguardian.com/us-news/2023/jul/13/florida-fines-voter-registration-groups) "Revealed: Florida Republicans target voter registration groups with thousands in fines"
[^13]: [theemancipator.org](https://theemancipator.org/2024/11/05/topics/technology/voter-suppression-2-0-how-digital-misinformation-targets-marginalized-communities) "Voter suppression 2.0: How digital misinformation targets marginalized communities"
[^14]: [www.brookings.edu](https://www.brookings.edu/articles/for-covid-19-vaccinations-party-affiliation-matters-more-than-race-and-ethnicity/) "For COVID-19 vaccinations, party affiliation matters more than race and ethnicity"
[^15]: [www.act.org.nz](https://www.act.org.nz/act-mps-back-rural-new-zealand-at-groundswell) "ACT MPs back rural New Zealand at Groundswell"
