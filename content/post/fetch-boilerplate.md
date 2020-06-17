+++
author = "Andryo Marzuki"
title = "Reusable API class with Fetch in Typescript"
date = "2020-06-17"
description = "Guide to setting up a basic reusable API class in Typescript using Fetch as opposed to third party libraries such as axios. "
tags = [
    "typescript", "fetch",
]
+++

# Fetch!

As I've become more familiar with ReactJS I've started to stray away from third party libraries such as [axios](https://github.com/axios/axios) and leaned towards using more first party libraries such as fetch, my rationale for this boils down to attempting to reduce the complexity of my projects.

My applications generally define an `API` class which is then exported onto other parts of my application such as my actions. My ethos while doing this is to make very understandable and reusable methods, which are then called for more specific requests.

This tutorial uses TypeScript. If you use JavaScript instead of TypeScript the code itself should be easily adjustable to meet your requirements.

At the start of any frontend builds I do, I normally just cut paste the below into my `/api/index.ts` file.

# Code Example

```ts
import Cookies from 'js-cookie';

interface Params {[key: string]: any};

class API {
    baseUrl: string;
    csrfToken: string | undefined = Cookies.get('csrftoken');
    jwt: string | null | undefined = Cookies.get('jwt');
    params: {[key: string]: any} = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'x-csrftoken': this.csrfToken ? this.csrfToken : '',
            'Authorization': this.jwt ? 'Bearer ' + this.jwt : '',
        },
        credentials: 'same-origin',
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

    async delete(endpoint: string) {
        const url: URL = new URL(endpoint, this.baseUrl);

        return await fetch(url.toString(), {...this.params, method: 'DELETE'})
            .then((response) => {return response.json()})
            .catch((error) => {return error});
    };
};

export const api = new API('https://localhost:5001/api/')
```