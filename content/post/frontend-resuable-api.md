+++
author = "Andryo Marzuki"
title = "Using Fetch over Axios in ReactJS Applications"
date = "2020-06-17"
description = "Tutorial about designing a reusable API class using Fetch instead of a third-party library such as Axios."
tags = [
    "ReactJS", "Typescript"
]
+++

# Go Fetch!

For my last few projects I've made the switch from [Axios](https://www.google.com/search?client=firefox-b-d&q=axios) to plain ol' [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). My rationale for making this switch was:

1. Axios is a third party library. Where possible I would like to reduce usage of third party libraries; and
2. Fetch is a perfectly capable library for the purposes of building my resuable API class with.

My approach in using Fetch or Axios is to create a class which contains all my API logic. The idea is to clearly define my `GET`, `POST`, `DELETE`, `PUT` methods and then build understandable and elegant functions on top of these.

```ts
interface Params { [key: string]: any };

class API {
    baseUrl: string;
    params: Params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    };
};
```

# Reusable Methods

This next section I'll break down my 'main' methods which form the basis of my API class' functions.

## GET

With my `GET` method, I make params optional given. The params are then converted to search params and added to the url if applicable.

```ts
async get(endpoint: string, params?: Params) {
    const url: URL = new URL(endpoint, this.baseUrl);

    if (params)
        url.search = new URLSearchParams(params).toString();

    return await fetch(url.toString(), {...this.params, method: 'GET'})
        .then((response) => {return response.json()})
        .catch((error) => {return error})
};
```

## POST

With my `POST` method, params are compulsory. The params are passed through in the request's body.

```ts
async post(endpoint: string, params: Params) {
    const url: URL = new URL(endpoint, this.baseUrl);

    return await fetch(url.toString(), {...this.params, method: 'POST', body: JSON.stringify(params),})
        .then((response) => {return response.json()})
        .catch((error) => {return error})
};
```

## PUT / DELETE

My `PUT` and `DELETE` methods are more or less the same as how I construct my `POST` method.

```ts
async put(endpoint: string, params: Params) {
    const url: URL = new URL(endpoint, this.baseUrl);

    return await fetch(url.toString(), {...this.params, method: 'PUT', body: JSON.stringify(params),})
        .then((response) => {return response.json()})
        .catch((error) => {return error})
};

async delete(endpoint: string) {
    const url: URL = new URL(endpoint, this.baseUrl);

    return await fetch(url.toString(), {...this.params, method: 'DELETE'})
        .then((response) => {return response.json()})
        .catch((error) => {return error});
}
```
## Usage

Once we've defined these methods, we can create more specific methods which are highly understandable and structured. The below example shows how I would create a function which authenticates the user:

```ts
async authenticate(username: string, password: string): Promise<User> {
    const endpoint: string = 'users/authenticate/';
    let result = await this.post(endpoint, {username: username, password: password});
    return result;
};
```

# Full Working Example

Here is the full working example of my boilerplate Fetch API class.

```ts
interface Params { [key: string]: any };

class API {
    baseUrl: string;
    params: Params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    };

    async get(endpoint: string, params?: Params) {
        const url: URL = new URL(endpoint, this.baseUrl);

        if (params)
            url.search = new URLSearchParams(params).toString();

        return await fetch(url.toString(), {...this.params, method: 'GET'})
            .then((response) => {return response.json()})
            .catch((error) => {return error})
    };

    async post(endpoint: string, params: Params) {
        const url: URL = new URL(endpoint, this.baseUrl);

        return await fetch(url.toString(), {...this.params, method: 'POST', body: JSON.stringify(params),})
            .then((response) => {return response.json()})
            .catch((error) => {return error})
    };

    async put(endpoint: string, params: Params) {
        const url: URL = new URL(endpoint, this.baseUrl);

        return await fetch(url.toString(), {...this.params, method: 'PUT', body: JSON.stringify(params),})
            .then((response) => {return response.json()})
            .catch((error) => {return error})
    };

    async delete(endpoint: string) {
        const url: URL = new URL(endpoint, this.baseUrl);

        return await fetch(url.toString(), {...this.params, method: 'DELETE'})
            .then((response) => {return response.json()})
            .catch((error) => {return error});
    }

    async authenticate(username: string, password: string): Promise<User> {
        const endpoint: string = 'users/authenticate/';
        let result = await this.post(endpoint, {username: username, password: password});
        return result;
    };
};

export const api = new API('https://localhost:5001/api/')
```

# Closing Thoughts

If you're already invested in using Axios in your developments/projects, there's probably no reason to change.

I personally quite like how succint the code is using Fetch, and bonus points to the fact that I am no longer reliant on a third party library.

Lastly, with this article posted, I can now delete the code scraps I have saved on GitHub!

Hope you've found the article useful.