---
author: "Andryo Marzuki"
title: "Making a React Blog (and Why It Sucks)"
date: "2021-10-31"
description: "A few months ago, I had decided that it would be a great idea to convert my static-page blog (powered by Hugo) into a CMS made with Django and React. This post is going to talk about why that was a stupid idea and why I was a stupid person for thinking that it would be better than a static-page blog."
tags: [
    "React", "TypeScript"
]
---

A couple of months ago, I thought it would be a fun project to create my own CMS/blog to replace the static pages (Hugo) blog I currently had deployed on my GitHub Pages. My primary motivator for doing this was my perceived lack of flexibility of Hugo, which was the lack of flexibility outside of written content. The biggest strength of a static pages blog is that it's all pre-rendered; your website will load lightning-quick and give you great SEO; however, it becomes a massive chore when you attempt to integrate external projects.

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

When I checked the website on Google to see how it performed, it performed awfully. In general, the pages loaded far too slowly, and this was because there was too backwards and forwards occurring behind the scenes.

### Server-Side Rendering Code

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