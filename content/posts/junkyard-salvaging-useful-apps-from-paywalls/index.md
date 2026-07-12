---
title: "junkyard.sh: Salvaging useful apps from the terrors of paywalls"
date: 2026-07-01T00:00:00Z
description: "Why I rebuilt 48 paywalled web tools to run free in your browser, with no account and no upload."
tags: ["open-source", "ai", "paywalls", "web-ecosystem", "junkyard"]
categories: ["Philosophy"]
draft: false
---

remove.bg hands you a blurry preview, then asks for credits before it releases the full-resolution cut-out. Under the paywall it is a background-removal model and an upload box, nothing more. [junkyard.sh](https://junkyard.sh) has the same thing running entirely in your browser tab: full resolution, no upload, no account. It is one of 48 tools I have rebuilt that way, all client-side, all free.

I got tired of hitting that wall. You are building something, you find a tool that looks perfect, and then it happens: "Create an account", "Upgrade to Pro", "Sorry, this feature is for paid users." The free tier is usually a demo designed to show you what you are missing before it locks the gate. Then the AI wave hit, and every tool grew an "AI" label while the paywalls got thicker. They will tell you the AI costs money to run. The real cost is not the compute, it is a business model that treats users as revenue streams.

So I started rebuilding them.

## What it actually is

**junkyard.sh** is 48 small web tools that used to be paywalled, freemium, or just annoying, rebuilt to run entirely in your browser. The stuff you reach for once a fortnight and resent paying a subscription for: converting an image, removing a background, formatting JSON, generating a QR code, transcribing audio. No server, no upload, no account. Your files never leave your machine because there is nowhere for them to go.

## The approach

When I find a useful tool trapped behind a subscription, I look at what it actually does, then rebuild the core as a self-contained browser app. This is not about hating on SaaS companies. It is about tools that:

- never disappear when a company pivots or shuts down
- never change pricing without notice
- never touch your files, because nothing leaves your machine
- can be audited, forked, and improved by anyone

## The toolkit in action

The catalogue is 48 tools in four buckets:

- **Image and media (16):** converter, background remover, QR code, collage, OG image generator.
- **Text and code (12):** JSON formatter, diff, regex tester, base64.
- **AI (7):** transcribe, upscale, chat, summarise.
- **Docs and utility (10):** PDF tools, password generator, unit converter, invoice.

Every one runs client-side. No dashboard, no tracking, no account. Browse the full grid at [junkyard.sh](https://junkyard.sh), or fetch the machine-readable catalogue at [junkyard.sh/catalogue.json](https://junkyard.sh/catalogue.json).

## How it is built

Each tool is a self-contained Vite and React app under `apps/<slug>/`. The headless logic lives in `@junkyard/core`, the shared UI in `kit/`, and the whole thing builds to a single GitHub Pages site. There is no backend to run, which is also why there is nothing to paywall and nothing to shut down. The repo is at [marzukia/junkyard](https://github.com/marzukia/junkyard).

That headless core has a second use. There is an MCP server, `@junkyard/mcp-server`, that exposes 17 of the categories as 25 operations over stdio, so Claude Desktop or Claude Code can call the same tools without a browser.

## Where AI actually helped

AI gets blamed for degrading the web, and a lot of that is fair. But the same models are good at the boring parts of rebuilding these tools: reading a spec, writing the glue, porting logic to run client-side. I used them to get 48 tools out the door faster than I could have on my own. That is the honest version. Not repairing the internet, just clearing a backlog faster.

## Join the salvage operation

If you just want the tools, go to [junkyard.sh](https://junkyard.sh) and use them. Nothing to install.

If you want to add one, clone the repo, drop into a tool, and run it:

```bash
git clone https://github.com/marzukia/junkyard
cd junkyard/apps/<slug>
bun install && bun run dev
```

Fix a bug, improve a tool, or add your own salvage and send a PR. No gatekeeping, no "enterprise features".

## The bottom line

Salvage what you can, share what works. **junkyard.sh** is 48 tools that run in your browser, free, open source, no accounts. Take what you need, fork what you want, and keep the web usable for humans rather than paying customers.

*Built with [Bun](https://bun.sh) and a healthy dose of frustration.*
