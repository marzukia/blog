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

For my last few projects I made the switch from using [Axios](https://www.google.com/search?client=firefox-b-d&q=axios) to plain ol' [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). My rationale for making this switch was:

1. Axios is a third party library, where possible I would like to reduce usage of third party libraries; and
2. Fetch is a perfectly capable library for the purposes of building my resuable API class with.

My approach in using Fetch or Axios is to create a class which contains all my API logic. I prefer to clearly define my `GET`, `POST`, `DELETE`, `PUT` methods and then build specific functions on top of those.

# The Code

## CRSF Considerations

One little bug bear to tackle is the fact that Axios handles the CSRF for you. In fact, it's as simple as defining your header names as follows:

```ts
axiosDefaults.xsrfCookieName = "csrftoken"
axiosDefaults.xsrfHeaderName = "X-CSRFToken"
```

While using Fetch, we need to manually configure this ourselves. We'll need to manually set our `x-csrftoken` header in our Fetch parameters.

I accomplish this by defining parameters I want to pass through in every request as static properties of the class.

```ts
import Cookies from 'js-cookie';

interface Params { [key: string]: any };

class API {
    baseUrl: string;
    csrfToken: string | undefined = Cookies.get('csrftoken');
    params: Params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-csrftoken': this.csrfToken ? this.csrfToken : '',
        },
        credentials: 'include',
        mode: 'cors'
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    };
};
```

In the above code snippet, I've used `js-cookie` to grab the token value and pass it through in the headers.

## Reusable Methods

### GET

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

### POST

With my `POST` method, params are compulsory. The params are passed through in the request's body.

```ts
async post(endpoint: string, params: Params) {
    const url: URL = new URL(endpoint, this.baseUrl);

    return await fetch(url.toString(), {...this.params, method: 'POST', body: JSON.stringify(params),})
        .then((response) => {return response.json()})
        .catch((error) => {return error})
};
```

### PUT / DELETE

My `PUT` and `DELETE` methods are more or less the same as how I construct my `POST` method

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
### Usage

Once we've defined these methods, we can create more specific methods which are highly understandable and structured. The below example shows how I would create a function which authenticates the user:

```ts
async authenticate(username: string, password: string): Promise<User> {
    const endpoint: string = 'users/authenticate/';
    let result = await this.post(endpoint, {username: username, password: password});
    return result;
};
```

## Full Working Example

And lastly, here is the full working example of my boilerplate Fetch API class.

```ts
import Cookies from 'js-cookie';

interface Params { [key: string]: any };

class API {
    baseUrl: string;
    csrfToken: string | undefined = Cookies.get('csrftoken');
    params: Params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-csrftoken': this.csrfToken ? this.csrfToken : '',
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

If you're already invested in using Axios for your development stacks there's probably no reason to change.

I personally quite like how succint the code is using Fetch, and bonus points to the fact that I am no longer reliant on a third party library.

With this article posted, I can now delete the code scraps I have saved on GitHub!