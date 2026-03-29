---
title: "Building a Memory Layer for AI"
date: 2026-03-29T12:00:00+11:00
draft: true
tags: ["ai", "llm", "memory", "technology"]
---

# Building a Memory Layer for AI

29 March 2026 · 8 mins

I've been tinkering with AI since 2019. Always been charmed by the idea that an AI could remember things, build on our conversations, and feel more like a collaborator than a database.

The problem is obvious: AI models have the memory span of a goldfish on espresso. Your first interaction is charming, but by day three, it's a blank slate. You repeat yourself. It forgets the context you painstakingly provided.

This isn't a feature. It's a fundamental limitation of how LLMs work. Each conversation starts fresh. You can try to inject context, but it's like trying to fill a leaky bucket.

I'm in a lucky position. I have the technical curiosity, the skills, and the excuse to actually look into this problem properly. In my work with geospatial data and climate risk modelling, I've seen how critical context is for meaningful analysis. Yet when it came to AI assistants, there was no good solution.

The truth is, I don't necessarily think LLMs are the path to true AGI. They're incredibly impressive, sure, but they're fundamentally different from how human intelligence works. They're pattern matchers on steroids, not thinkers in any real sense.

Recent research confirms this. There's growing evidence about the limitations of current AI approaches:

**Reasoning skills are overestimated**. A 2024 MIT study found that models like GPT-4 and Claude perform well on "default tasks" (what they're trained on) but struggle significantly with "counterfactual scenarios" that deviate from familiar patterns. Their reasoning abilities are context-dependent, not genuine understanding.

**Novel task performance**. Research published in ScienceDirect (2025) highlights that LLMs still face "challenges in advancing LLM capabilities, including improving multi-step reasoning without human supervision, overcoming limitations in chained tasks, and enhancing long-context retrieval". They're good at mimicking reasoning, not actually reasoning.

**Training requirements**. The amount of computation and data required just to reach the current level of capability is staggering. And even then, the models remain brittle when faced with truly novel problems.

You can:

- Use a vector database (pgvector, Pinecone, etc.)
- Rely on conversation history (which grows exponentially and gets messy)
- Accept the forgetfulness (and live with it)

I had an idea for a proof of concept that could potentially work for this problem.

## The Idea: Memories Are Different From Context

Here's where I diverged from the standard approach. Raw conversation history isn't the same as memory.

When I think about how I remember things, I don't remember every single sentence I've ever heard. I remember:

1. The actual event (User: "I prefer Python over Java" | Assistant: "That makes sense—")
2. The distilled insight (Embedding: "Andryo prefers Python for development tasks")
3. The significance (This is a core preference, not a throwaway comment)

Most systems treat all conversation turns equally. My brain doesn't. It stores the essence, not the transcript.

### The Architecture

Watermemo does three things:

```
User + Assistant exchange
        │
        ▼
  POST /api/memories/         ← stores raw content (returns immediately)
        │
        ├──▶ Background thread: LLM distillation (DISTILLATION.md prompt)
        │         │
        │         ├──▶ Evaluate core status (CORE_EVAL.md prompt)
        │         └──▶ Create Distillation record (embedding auto-generated)
        │
        ▼
  POST /api/distillations/search   ← embed query → cosine similarity search
        │
        ▼
  Recalled distillations injected into system prompt
```

Memory is raw `User: ... \n Assistant: ...` exchange text.

Distillation is LLM-generated summary (1-4 factual sentences, third person). Each has a 768-dim embedding and PostgreSQL full-text search vector.

Core memories are identity-level facts (name, location, occupation) that get a 2x looser recall threshold so they're always surfaced.

## The Magic: Time Decay & Core Memories

Not all memories are created equal.

I implemented temporal decay because older memories should fade, right? The exponential decay formula:

$$\text{score} = \text{cosine_distance} \times e^{\frac{\ln 2}{\text{half\\_life}} \times \text{age\\_days}}$$

Set the `decay_half_life_days` to 30 (default), and a memory from 90 days ago has 1/8th the weight of a fresh one. But core memories don't decay.

When the distillation model evaluates a memory, it asks: "Is this a core identity fact?" The system prompt guides it to identify:
- Name and preferred address
- Technical preferences
- Professional context
- Relationship dynamics
- Recurring patterns

These get flagged and receive a 2x boost in recall threshold, ensuring they're always available when relevant.

## Not a Novel Idea, But a Novel Application

It's worth acknowledging that this isn't a novel concept. The AI community has embraced vector databases as the de facto solution for AI memory. They excel at semantic search and power successful RAG (Retrieval Augmented Generation) systems. Papers like "When Large Language Models Meet Vector Databases: A Survey" (arXiv 2024) show how RAG emerges as a solution that addresses challenges faced by LLMs in integrating and processing large and dynamic data in external databases.

There are already many practical implementations: Qdrant, pgvector, Pinecone, and others. The concept of using vector stores for long-term memory is well-established in the community.

What Watermemo does differently is combine several existing methods in a specific way:

- Store raw exchanges separately from distilled summaries
- Use LLM-based classification to identify core identity facts
- Apply temporal decay with configurable half-lives
- Flag and boost core memories with separate logic
- Allow easy correction of distillations through API

It's not inventing new techniques. It's an application of existing methods that tries to create more natural recall patterns.

## Why This Matters: Texture Over Brute Force

Why not just store everything and search later?

Context isn't just about quantity. It's about texture.

When you build an AI assistant that remembers your preferences, you're not just retrieving data. You're creating a sense of continuity, of relationship. It's the difference between talking to a database and talking to a collaborator.

I was inspired by a simple observation. My AI should remember the accumulation of tiny events that build context. When I mention "that library I like" three weeks later, it should know which library that is. When I reference "the project we discussed," it should understand what project.

It's about nuance. More natural or human-like recall would be beneficial in making decisions feel more human.

## The Implementation: Pragmatic & Flexible

Watermemo isn't a monolithic system. It's designed to work with:

- Any LLM via Ollama or OpenAI-compatible API
- Any embedding model (defaults to `nomic-embed-text`)
- Django REST API (Django Ninja for speed)
- PostgreSQL with pgvector (for similarity search)
- Open WebUI (as a filter plugin)
- Standalone use (any HTTP client)

The background distillation runs asynchronously, so storing a memory is instant. The intelligence happens in the background.

Key features:

- Vector similarity search with cosine distance
- PostgreSQL full-text search fallback
- Time decay on memory recency
- Core memory prioritization
- Near-duplicate detection and merging
- User scoping for multi-tenant use
- Open WebUI integration (optional filter)

## Using It

Watermemo works as:

1. A standalone REST API at `/api/memories/` and `/api/distillations/search`
2. An Open WebUI filter that automatically recalls relevant memories before every exchange
3. A middleware for any HTTP-based AI system

You can start with a single Docker Compose, and it's ready to go in minutes. The API docs are at `/api/docs` when you run it.

## The Future

This is still a work in progress, but I hope it's a foundation for something interesting.

There are things I'm thinking about:
- Better core memory detection (is there a pattern we're missing?)
- Cross-session memory transfer (can we share context between users?)
- Multi-modal memories (images, audio, not just text)
- Memory editing (can we correct the distillation process?)

## The Bottom Line

Building AI applications that actually remember things is hard. But it's not impossible.

The key insight: distill the memories, not the conversations. Store the raw exchanges, but let an LLM extract the essence. Search on that essence. Inject the relevant memories as context.

It's a simple idea, but it makes all the difference. I think.

---

Built with: Django, PostgreSQL, pgvector, Ollama, OpenWebUI

Available at: https://github.com/marzukia/watermemo

The API docs are self-contained, and you can run it in Docker in under a minute.

---

[^1]: MIT News, "Reasoning skills of large language models are often overestimated," July 2024. https://news.mit.edu/2024/reasoning-skills-large-language-models-often-overestimated-0711
[^2]: ScienceDirect, "Reasoning beyond limits: Advances and open problems for LLMs," 2025. https://www.sciencedirect.com/science/article/pii/S240595952500133X
[^3]: arXiv 2024, "When Large Language Models Meet Vector Databases: A Survey" - RAG emerges as a solution that addresses challenges faced by LLMs in integrating and processing large and dynamic data in external databases. https://arxiv.org/html/2402.01763v1
