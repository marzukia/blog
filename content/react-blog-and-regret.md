---
author: "Andryo Marzuki"
title: "Making a React Blog (and Why It Sucks)"
date: "2021-10-29"
description: "A few months ago, I had decided that it would be a great idea to convert my static-page blog (powered by Hugo) into a CMS made with Django and React. This post is going to talk about why that was a stupid idea and why I was a stupid person for thinking that it would be better than a static-page blog."
tags: [
    "React", "TypeScript"
]
---

A couple of months ago, I thought it would be a fun project to create my own CMS/blog to replace the static pages (Hugo) blog I currently had deployed on my GitHub Pages. My primary motivator for doing this was my perceived lack of flexibility of Hugo, which was the lack of flexibility outside of written content. The biggest strength of a static pages blog is that it's all pre-rendered; your website will load lightning-quick and give you great SEO; however, it becomes a massive chore when you attempt to integrate external projects.

I let it run for a couple of months before I decided the other day that I'd had enough and reverted to my Hugo blog.

## The Challenge

I went with a Django (with DRF) backend, React (with RTK) frontend, and PostgreSQL for this particular project - this combination is probably my project favourite stack. With a little bit of tweaking, you can get a project up and running in no time at all. While I love this project stack, this experience has taught me a valuable lesson. There is no such thing as a one-size-fits-all solution.

### Architecture

An application made with React can be incredibly dynamic and flexible. Still, one of its biggest problems is that it is an incredible pain in the ass to do the SEO and performance comparable to that of a static page.

Server-side rendering (SSR) becomes a necessity when you dynamically set meta tags for your content; this means that the minimum architecture you would need to deploy a React CMS/blog is as follows:

![Architecture flow chart of my project](/images/react_blog/flow.png)

The application flow works out to be something like this:
1. A user requests to visit a page
2. NGINX routes the request to the relevant parts of the application
3. The React SSR needs to render the React page and relevant meta tags before returning it to the user. The SSR requests the metadata from the backend.
4. The metadata is retrieved from the backend and injected into the HTML response.
5. Both the backend and SSR return their respective responses to NGINX.
6. NGINX routes through the appropriate reverse proxy, and the user receives the rendered page.

If it looks overly complicated, that's because it is. In hindsight, I may have over-engineered this, but I couldn't develop another way to make this reliably work. If someone smarter than me has an easier way to achieve what I was trying to do, please reach out to me and let me know.

When I checked the website on Google to see how it performed, it performed awfully. Too many things were happening behind the scenes, which resulted in sluggish performance. It's just not comparable to a static page where all the content is ready to go.

## Other Issues

Beyond performance, there are other costs to doing this approach, making the whole thing even more unappealing. Depending on your stance and preferences, you may consider me unreasonable here, but hear me out.

### Deployment Overhead

Naturally, having a Django/React application was more resource-intensive in regards to deployment. I self-host my applications, so the cost, in this case, was not monetary. Instead, it was the administrative overhead of deploying this project. In this case, we have even more overhead than a standard Django/React application as we need to worry about the SSR element of the project.

It's tough to compete with the almost no-overhead static pages type blog, especially when paired with something like GitHub pages which makes the process almost braindead.

In my case, when I want to make changes to the blog, I execute a simple shell script:

```bash
#!/bin/bash
hugo
cd marzukia.github.io/
git add .
git commit -m 'deploy changes'
git push
cd ..
cd themes/salt
git add .
git commit -m 'deploy changes'
git push
cd ../..
git add .
git commit -m 'new post or changes'
git push
```

As soon as I execute the script, it'll run Hugo to build the static pages, recursively go into each submodule I have associated with the project, push changes, and we're good to go. While in general, I would not consider the deployment overhead a factor, given the alternative is so easy, it becomes a pretty material consideration.

### Ongoing Development & Maintenance

Why start a project if you aren't going to maintain it? Having an application that has a backend, frontend and database will, of course, require more love and attention than a static page which is just HTML and CSS. This complaint seems like a stupid thing to whinge about, but given the purpose of my blog, I couldn't justify it.

My blog serves two purposes for me:
1. The blog acts as a diary of sorts to help me crystalise my thoughts and retrospectively review things I've done.
2. The blog acts as a tool to help me build and maintain a social media presence in the industry.

Ultimately, it came back to "this is not worth it" for me.

## Why Do It?

I've been fairly negative in this article, but I did allude to having reasons for doing this in the first place.

### Dynamic Pages & Data

I absolutely love creating exciting data visualisations and tools. One significant benefit of building the project in Django/React meant that I had a much more sophisticated toolset to work with in terms of the content I could produce. The tool that I had packaged with the release of my React blog was a game-price finder that analysed scraped data from Wata Games/Heritage Auctions.

> **Note**: This tool will be down at the time of writing, but I'll look at rebuilding it without the blog component. Also, you can find the aforementioned article [here](https://mrzk.io/collectable-video-games-market-manipulation/).

I will make standalone applications in the future rather than trying to have it all unified as a single experience.

### Good Practice & Self Reflection

I recently discovered RTK Query this year, and I love it. I haven't had much time to explore the full capabilities, so I thought this project would be great practice.

Another huge thing for me was the opportunity to self-reflect on the progress I've made as a developer. Every time I do a Python, TypeScript, or C# project, I use it as a way to see how my overall code quality has improved. Ultimately, this blog rework was a bit of a pointless exercise. The project itself may not be valuable, but the lessons learned are valuable and immediately apply to my personal and professional work.

It's also never a bad thing to have too much code in your GitHub. There's no doubt in the future, and I may run into a problem that will require a solution that I've already come up with.

## Closing Thoughts

I don't know where I was going with this blog post - but if you've managed to make it this far, I hope it was at least somewhat interesting. If you were considering making a React blog and I've successfully stopped you, I will take that as a win.

In conclusion, don't bother trying to make React blog, it sucks, and it's painful to do. I'm open to changing my mind here, but for now, this will be my position.

## Server-Side Rendering Code

If you stumble across this page sometime in the future and you want to know how I set up my SSR, I've placed the code snippet below.

I'm going to add a disclaimer here that I do not have much familiarity with NodeJS, nor do I work in plain JavaScript very often. There will be a certain level of "jank" that I won't be able to hide in the following code snippet.

```js
import express from 'express';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

var app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 1235;

app.use(express.static(path.resolve(__dirname, './build')));

app.get('/', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Andryo Marzuki - Data & Analytics');
        data = data.replace(/\$OG_DESCRIPTION/g, "Data analytics & personal blog of Andryo Marzuki");
        response.send(data);
    });
});

app.get('/about', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Andryo Marzuki - About');
        data = data.replace(/\$OG_DESCRIPTION/g, "About Andryo Marzuki, career history and interests.");
        response.send(data);
    });
});

app.get('/contact', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Andryo Marzuki Contact Details');
        data = data.replace(/\$OG_DESCRIPTION/g, "Contact details for Andryo Marzuki");
        response.send(data);
    });
});

app.get('/posts/*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        const doAsync = async () => {
            const meta = await fetch(`https://api.mrzk.io${request.url}?meta=True`)
                .then(response => response.json())

            data = data.replace(/\$OG_TITLE/g, "Andryo Marzuki - " + meta.title);
            data = data.replace(/\$OG_DESCRIPTION/g, meta.description);
            data = data.replace(/\$OG_URL/g, `https://mrzk.io${request.url}`);
            data = data.replace(/\$OG_PUBLISH_TIME/g, meta.createdDate);

            response.send(data);
        };
        doAsync();
    });
});

app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_TITLE/g, 'Andryo Marzuki - Data & Analytics');
        data = data.replace(/\$OG_DESCRIPTION/g, "Data analytics & personal blog of Andryo Marzuki");

        response.send(data);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```