# SWR Examples

[SWR](https://swr.now.sh/) is an awesome [React Hooks](https://reactjs.org/docs/hooks-intro.html) library for remote data fetching, maintained by [Vercel](https://vercel.com).

[![Edit gregrickaby/swr-examples](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

**Why this repo?**

The examples listed on the SWR website (and Github) are great, but as a Junior JavaScript developer, I struggled to understand a few of them, so I put this repo together in hopes that it will help others. 🍻

### Table of Contents

- [Introduction](#introduction)
  - [Preface](#preface)
  - [The `useSWR()` API](#the-useswr-api)
    - [Parameters](#parameters)
    - [Return Values](#return-values)
- [Examples](#examples)
  - [Basic Example](#basic-example)
  - [GraphQL](#graphql)
  - [React Suspense (Experimental)](#react-suspense-experimental)

# Introduction

Before jumping in, take a minute to read the following:

## Preface

First, all examples run on [Next.js](https://nextjs.org/), which has built-in support for both React and [Fetch](https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support). If you do copy/paste these examples into something like Create React App, you'll probably need to install and import those dependencies first.

Secondly, all examples use `JSON.stringify` to display the fetched data. I didn't want to overcomplicate things with opinionated markup around displaying data.

And finally, the `fetcher` below, is a quick one-liner for example purposes. _I wouldn't use this on a complex project._

```js
const fetcher = (url) => fetch(url).then((r) => r.json());
```

Onward!

## The `useSWR()` API

Here is the full `useSWR()` hook:

```js
const { data, error, isValidating, mutate } = useSWR(key, fetcher, options);
```

### Parameters

- `key`: A unique string for the request. Usually the URL of an API. ([advanced usage](https://github.com/vercel/swr#conditional-fetching))
- `fetcher`: (optional) _Any_ Promise returning function or library to fetch your data. ([details](https://github.com/vercel/swr#data-fetching))
- `options`: (optional) An object of options for this SWR hook. ([view all options](https://github.com/vercel/swr#options))

### Return Values

- `data`: The data from the fetcher.
- `error`: An error thrown by fetcher.
- `isValidating`: If there's a request or revalidation loading.
- `mutate(data?, shouldRevalidate?)`: A function to mutate the cached data.

# Examples

## Basic Example

In the basic example, let's fetch a person from the [SWAPI](https://swapi.dev/):

```js
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Example = () => {
  const { data, error } = useSWR(`https://swapi.dev/api/people/1/`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Example;
```

[![Edit gregrickaby/swr-examples: example-basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-basic?fontsize=14&hidenavigation=1&theme=dark)

---

## GraphQL

What's really cool about `SWR`, is you're not restricted to just using `fetch` for REST APIs. You can define _any asynchronous function or library_ as the `fetcher`!

In this example, let's use the [graph-request](https://www.npmjs.com/package/graphql-request) library to query and display data for _Pikachu_:

```js
import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (query) => request(`https://graphql-pokemon.now.sh`, query);

const Example = () => {
  const { data, error } = useSWR(
    `{
      pokemon(name: "Pikachu") {
        name
        image
      }
    }`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Example;
```

[![Edit gregrickaby/swr-examples: example-graphql](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-graphql?fontsize=14&hidenavigation=1&theme=dark)

---

## React Suspense (Experimental)

When using `react@experimental`, you can load a `<Suspense>` component that waits for _and_ displays a loading state (like a spinner) until all the data has loaded in the background.

By passing `{ suspense: true }` into SWR's `options`, you can leverage [React Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html) for data fetching. 

In this example, let's fetch another person from the [SWAPI](https://swapi.dev/), and display `loading...` why we wait:

```js
import { Suspense } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Profile = () => {
  const { data } = useSWR("https://swapi.dev/api/people/1/", fetcher, {
    suspense: true,
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

const Example = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Profile />
  </Suspense>
);

export default Example;
```

[![Edit gregrickaby/swr-examples: example-graphql](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-react-suspense?fontsize=14&hidenavigation=1&theme=dark)

---

More examples soon...In the meantime, learn more about SWR and see all the examples on [Github](https://github.com/vercel/swr). 👋🏻
