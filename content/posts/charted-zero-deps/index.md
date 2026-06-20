---
author: "Andryo Marzuki"
title: "Charted: a zero-dependency charting library (and an accidental agentic sidequest)"
date: "2026-06-19"
description: "Why I built charted, a zero-dependency Python library for beautiful SVG charts, and how a constraint I picked for fun turned out to be the perfect fit for agentic workflows."
tags: ["Python", "Data Visualisation", "Open Source", "AI", "MCP"]
---

In 2024, I was in the middle of a transition period in my life, moving from Auckland to Melbourne. I had a lot going on, and one of the outlets I leaned on was working on personal projects. One of those was a charting library called "charted." The gimmick was that I wanted to make it a completely zero-dependency Python library, beautiful SVG graphs you can use directly instead of having to lean on third-party libraries.

## Motivations & Principles

My motivations were:

* Python already has a great charting library in matplotlib, but it comes with a lot of bloat. I've also had difficulties in the past installing numpy on base images like Alpine, where the wheels aren't necessarily available.
* This seemed like the perfect "stretch" exercise to transpose my domain knowledge in GIS / spatial mapping into an unrelated (but related) field.
* I wanted a good challenge, and limiting myself to zero dependencies was a fun constraint to work within. (I've since deviated from that a little to add some production polish, but only as optional opt-ins.)
* A lot of the time I just want to dump data into a graph and not have to fine-tune it to make it look pretty.
* I really liked the idea of mermaid.js, but I didn't necessarily like how the graphs looked.
* I had a bunch of personal Django projects I couldn't be bothered building a frontend for, and being able to render straight to a beautiful graph was a huge motivator.
* I'm pretty opinionated about how I want my graphs to look, and this was my chance to have my say on what charts should be.
* `charted` wasn't taken and that's pretty sick.

This is roughly what that looks like in practice:

![A line chart rendered by charted](https://charted.mrzk.io/_static/landing/gallery_light_line.svg)

*Pass it data, get an SVG. No fine-tuning required. [See all 15 types at charted.mrzk.io](https://charted.mrzk.io/gallery).*

Fast forward to 2026. I'm now a sleepless father to a newborn, and one of the things I've been tinkering with heavily is maximising the use of agentic workflows, especially my local inference stack (more on that to come). It kind of dawned on me at this point that I already had the perfect bones to make my agentic experience even better: making data visualisation almost a native part of the conversation.

## Charting & Agentic Workflows

Here's the thing nobody really tells you about charts and agents. The existing options are genuinely awful for it. matplotlib drags in numpy and a pile of compiled wheels (back to my Alpine problem). Anything browser-based wants a headless Chrome and a font stack that you will, at some point, spend an evening debugging. Both are miserable inside a slim container or a sandbox, which is exactly where agents tend to live.

charted's output is just SVG. It's text. There's nothing to compile, no binary to ship, no browser to drive. The model produces a chart the same way it produces a code block. That's the whole trick, and I can't claim I designed it on purpose. I just happened to have built the right thing a couple of years early.

So I wrote `charted-mcp`, a small MCP server that lets an agent render a chart straight into the conversation. Ask for "monthly active users by plan as a stacked area chart," get an actual chart back inline, no tooling, no round-trip, no screenshot. For someone running a local inference stack and a graveyard of half-built Django projects with no frontend, this is kind of the dream.

It happily does the less usual stuff too, not just bars and lines:

![A sankey diagram rendered by charted](https://charted.mrzk.io/_static/landing/gallery_light_sankey.svg)

*A sankey, also pure SVG, also zero dependencies. [Browse the full gallery.](https://charted.mrzk.io/gallery)*

## Using Charted

Both `charted` and `charted-mcp` are fully open source under the MIT license - no paid tiers, no telemetry, no "community edition" gotchas. Fork it, vendor it, embed it, ship it in your product. Do whatever you want with it.

Where it's at now:

* **15 chart types**, including bar, line, area, scatter, combo, gantt, and sankey, plus the rest of the usual (and a few less usual) suspects.
* **A CLI**, so you can throw a CSV or JSON straight at it without writing any Python.
* **`charted-mcp`**, for the agentic stuff above.
* **Still zero required dependencies.** PNG export and a few niceties are opt-in extras, but the core is pure stdlib.

charted started as a way to keep my hands busy during a stressful move, built on an opinion I refused to let go of. A couple of years later it's quietly become one of the more useful things I've made, and the constraint I picked for fun turned out to be the actual feature. If you've ever fought numpy wheels on Alpine at 2am, or, lately, watched an agent try to render a chart and quietly give up, give it a go.

```sh
uv add charted
```

You can see all of it, and play with the gallery, at [charted.mrzk.io](https://charted.mrzk.io).

Go build something. Make it look good.
