---
author: "Andryo Marzuki"
title: "Mapping an Undocumented API Easily With Python"
date: "2020-09-13"
description: "Using your browser and Python to map out an undocumented API quickly"
tags: [
    "Python"
]
---

I was working on an NBA related project the other week and I had decided I wanted to create my own API wrapper (for fun) as part of the project.

The primary source of data I was looking to use was the [stats.nba.com](stats.nba.com) API, our biggest challenge in using this endpoint is the fact they do not want to use it. Let's breakdown the issues we face:
1. They block calls of any suspicious activity very liberally
2. The API is undocumented
3. The API constantly changes

I've done different projects on this API in the past with has aimed to address some of these challenges such as [aionba](https://github.com/marzukia/aionba), which incorporated asynchronous calls with rotating proxies and caching to avoid the chances of being blocked. This project was ultimately unfinished as it ended up being more reliable just to call the API slowly.

This post will talk about the second challenge, the fact that the API is undocumented. Whilst you could rely on other people's lists that they have compiled, it's often nice to be able to this on your own. I'll breakdown the method I came up with this particular instance as it was a snap to do, and gave me a pretty comprehensive list to use for development purposes.

If you came here solely for the endpoints, you can find it [here](https://github.com/marzukia/nba/wiki).

## Tooling

For this method, you'll need some basic familiarity with working with JSON data. We'll be taking advantage of `HAR` data collected by Firefox (or similar) and using Python (you can use what you're most comfortable with) to unpack this data and generate markdown documentation for our project.

I use Firefox as my primary browser, however, I assume whatever browser you use will suffice provided it is a modern one.

JavaScript or C# would probably work fine here too, in general, I use Python for quick and dirty projects where speed/performance is not a priority.

## Method

There is a manual element in this process, and without significant effort to automate it, it's probably unavoidable. If you intend to do this regularly to make sure your documentation is up to date, you could do this portion with macros or something like Selenium. In this case, I'll be doing this as a one-off so I've done it manually.

### Collecting HAR Data

> **Note**: Make sure you tick 'Persist Logs'.

For this step, you'll want to systematically go through every visible page on the available to you, and apply each filter possible. The purpose of this is that the code you'll write will summarise this data into 'valid' parameters and options for the various endpoints. This part is very tedious but it does not take that long.

You'll notice very quickly that [stats.nba.com](stats.nba.com) throttles the majority of your requests. This highlights how badly they don't want people using their data, to the point where they hamstring their user experience.

Once you've gone through the different pages and filters, simply save your `HAR` data from the network tab of your developer tools.

### Analysing the HAR Data

This step is the interesting part, as you'll be able to quickly see commonalities in the endpoint and how it's used. In particular, common properties and their payloads are evident.

In the below example, you'll note that I've specified `predefined` values of which I know their values. This is due to my laziness in wanting to minimize the amount of manual work in the previous step - as I know these values are essentially static, I did not bother changing their filter values.

```py
import json
import os
from collections import defaultdict
from urllib.parse import urlparse, parse_qs
import strconv

urls = []
folder = 'har/'
base_url = "https://stats.nba.com/stats/"

for filepath in os.listdir(folder):
    f = open(folder + filepath)
    data = json.load(f)
    data = data.get('log')
    for entry in data['entries']:
        urls.append(entry['request']['url'])

endpoint_map = defaultdict(lambda: defaultdict(list))
predefined = {
    "LastNGames": set([8, 11, 2, 6, 5, 7, 12, 14, 10, 3, 1, 9, 4, 13]),
    "Month": set([8, 11, 2, 6, 5, 7, 12, 10, 1, 9, 4]),
    "SeasonSegment": set(['Post All-Star', 'Pre All-Star']),
    "SeasonType": set(['Regular Season', 'All Star', 'Playoffs'])
}

for url in urls:
    if "?" in url:
        endpoint = url.split('?')[0]
        endpoint = endpoint.split(base_url)[-1]
        params = parse_qs(urlparse(url).query)

        for key, value in params.items():
            endpoint_map[endpoint][key] += value

for endpoint in endpoint_map:
    for key, value in endpoint_map[endpoint].items():
        if key in predefined:
            endpoint_map[endpoint][key] = predefined[key]
        else:
            endpoint_map[endpoint][key] = set(value)
```

The steps above breakdown as follows:
1. Load the `HAR` file as a `JSON`.
2. Grab the relevant data within the logs.
3. Use a basic `for` loop to tidy the data and summarise it.

### Making our Documentation

Once our data is nicely organised and structured, we can quickly make some nice documentation.

```py
f = open('output.md', "w")

f.write('# stats.nba.com Endpoints\n')

f.write(f'This document was autogenerated on `{ str(datetime.datetime.utcnow()) }`, the below endpoints are valid to the best of my knowledge at time of creation. \n \n This document was prepared for educational purposes only, it should not be used for commercial use. \n \n __Note__: type inferences may not be correct, use this as a reference rather than a guide. \n \n')

for endpoint, params in endpoint_map.items():
    f.write(f'\n## `{endpoint}`\n\n')
    f.write(f'### Parameters \n\n')

    for key, values in params.items():
        inferred_type = None
        if len(values) > 0:
            _ = [i for i in list(values)]
            inferred_type = set([strconv.infer(i) if strconv.infer(i) else 'str' for i in _])
            inferred_type = " ,".join([f'`{i}`' for i in inferred_type])


        f.write(f'* __{key}__:\n')
        f.write(f'  * Inferred Type: { inferred_type } \n')
        f.write(f'  * Valid Values: { ", ".join([f"`{v}`" for v in values]) }\n')

```

The above code snippet writes each line of our data into a `md` document. *Easy*.

You can see the results [here](https://github.com/marzukia/nba/blob/master/api_documentation.md).

## Closing Thoughts

Next time you're wanting to work with a non-public friendly API, give this method a try. I'll likely follow up on this post in the future as to my approach to making an API wrapper and how I would automate the process done in this article.
