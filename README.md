# SWR Examples

[SWR](https://swr.now.sh/) is an awesome [React Hook](https://reactjs.org/docs/hooks-intro.html) library for remote data fetching, maintained by the team at [Vercel](https://vercel.com). SWR stands for "[stale-while-revalidating](https://tools.ietf.org/html/rfc5861)", which means, SWR will attempt to load cached data (stale) first, and then fetch new data (revalidate) in the background.

### Table of Contents

- [Introduction](#introduction)
  - [Preface](#preface)
  - [The API](#the-api)
    - [Parameters](#parameters)
    - [Return Values](#return-values)
- [Examples](#examples)
  - [Basic Example with `fetch()`](#basic-example-with-fetch)
  - [Axios](#axios)
  - [GraphQL](#graphql)
  - [Dependent Fetching](#dependent-fetching)
  - [Conditional Fetching](#conditional-fetching)
  - [React Suspense (Experimental)](#react-suspense-experimental)

# Introduction

The examples listed on the [SWR website](https://swr.now.sh/) and [Github](https://github.com/vercel/swr/tree/master/examples) are great, but for brevity, some of the them omit small bits and don't actually "do anything"; while other examples feel overly complex and assume we're all "10x developers". I put together this repo to teach myself how to use SWR, and I hope that these simplistic examples will help others. 🍻

**Before jumping in, take a minute to read the following:**

## Preface

First, all the examples in this repo run on [Next.js](https://nextjs.org/), which is _one of two_ [recommended toolchains](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) by the React core team. Next.js has built-in support for [Fetch](https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support), so you don't have to install a fetch library as a dependency. Just know, _if you do copy/paste these examples into something like Create React App, you'll need to install and import a fetch library first._

Second, all examples use `JSON.stringify()` to display the fetched data. I didn't want to overcomplicate things with opinionated markup about displaying data. Chances are, you just need to `.map()` over the fetched data like this:

```js
return (
  <>
    {data.items.map((item, index) => (
      <div key={index}>{item.title}</div>
    ))}
  </>
);
```

And finally, SWR needs _something_ to actually fetch data. The `fetcher()` function below, is a quick one-liner used for example purposes throughout this repo. _I wouldn't use this on a complex project._

```js
const fetcher = (url) => fetch(url).then((r) => r.json());
```

Engage...

## The API

Here is the full `useSWR()` hook:

```js
const { data, error, isValidating, mutate } = useSWR(key, fetcher, options);
```

### Parameters

- `key`: A unique string (or function / array / null) for the request. Usually the URL of an API. ([advanced usage](https://github.com/vercel/swr#conditional-fetching))
- `fetcher`: (optional) _Any_ Promise returning function or library to fetch your data. ([details](https://github.com/vercel/swr#data-fetching))
- `options`: (optional) An object of options for this SWR hook. ([view all options](https://github.com/vercel/swr#options))

### Return Values

- `data`: The data from the fetcher.
- `error`: An error thrown by fetcher.
- `isValidating`: If there's a request or revalidation loading.
- `mutate(data?, shouldRevalidate?)`: A function to mutate the cached data.

# Examples

## Basic Example with `fetch()`

In the basic example, let's fetch a person from the [SWAPI](https://swapi.dev/):

```js
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Example() {
  const { data, error } = useSWR(`https://swapi.dev/api/people/1/`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

[![Edit gregrickaby/swr-examples: example-basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-basic?fontsize=14&hidenavigation=1&theme=dark)

---

## Axios

Know what's cool about SWR? You're not restricted to just using `fetch()` to grab data from REST APIs. You can define _any asynchronous function or library_ as the `fetcher()`!

In this example, we'll use the tried and true data fetching library, [Axios](https://github.com/axios/axios) to fetch a person from the [SWAPI](https://swapi.dev/):

```js
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url);

export default function Example() {
  const { data, error } = useSWR(`https://swapi.dev/api/people/1/`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

[![Edit gregrickaby/swr-examples: example-axios](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-axios?fontsize=14&hidenavigation=1&theme=dark)

---

## GraphQL

Since SWR is fetching library agnostic, let's use another third-party library to fetch data. In this example, we'll use the [graph-request](https://www.npmjs.com/package/graphql-request) library, to query a [GraphQL](https://graphql.org/) endpoint, and display data for _Pikachu_:

```js
import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (query) => request(`https://graphql-pokemon.now.sh`, query);

export default function Example() {
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
}
```

[![Edit gregrickaby/swr-examples: example-graphql](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-graphql?fontsize=14&hidenavigation=1&theme=dark)

---

## Dependent Fetching

SWR allows you to fetch data that depends on other data, as well as serial fetching when a piece of dynamic data is required for the next data fetch to happen.

In this example, we're going to query a WordPress blog post, then pluck a tag, and display the tag to the user.

```js
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Example() {
  // First, fetch a blog post...
  const { data: post } = useSWR(
    `https://webdevstudios.com/wp-json/wp/v2/posts/22342`,
    fetcher
  );

  // Then, fetch a tag from the blog post.
  const { data: tag } = useSWR(
    () => `https://webdevstudios.com/wp-json/wp/v2/tags/${post.tags[1]}`,
    fetcher
  );

  if (!tag) return "loading...";

  return <pre>{JSON.stringify(tag.name, null, 2)}</pre>;
}
```

[![Edit gregrickaby/swr-examples: example-dependent-fetching](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-dependent-fetching?fontsize=14&hidenavigation=1&theme=dark)

---

## Conditional Fetching

You can use a ternary operator in the `key` parameter to conditionally fetch data.

In this example, I use both the `useState()` and `useEffect()` hooks, along with `setTimeout()` to delay loading the data.

```js
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Example() {
  // Set "sleeping" to true.
  const [sleeping, setSleeping] = useState(true);

  // Do not fetch until sleeping is false.
  const { data, error } = useSWR(
    sleeping ? null : `https://swapi.dev/api/people/1/`,
    fetcher
  );

  // After 3 seconds, setSleeping to false.
  useEffect(() => {
    setTimeout(() => {
      setSleeping(false);
    }, 3000);
  }, []);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading in 3 seconds...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

[![Edit gregrickaby/swr-examples: example-conditional-fetching](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-conditional-fetching?fontsize=14&hidenavigation=1&theme=dark)

---

## React Suspense (Experimental)

When using `react@experimental`, you can load a `<Suspense>` component that waits for _and_ displays a loading state (like a spinner) until all the data has loaded in the background.

By passing `{ suspense: true }` into SWR's `options`, you can leverage [React Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html) for data fetching. In this example, let's fetch another person from the [SWAPI](https://swapi.dev/), and display `loading...` why we wait:

```js
import { Suspense } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function Profile() {
  const { data } = useSWR(`https://swapi.dev/api/people/1/`, fetcher, {
    suspense: true,
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default function Example() {
  <Suspense fallback={<div>loading...</div>}>
    <Profile />
  </Suspense>
);
```

[![Edit gregrickaby/swr-examples: example-react-suspense](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-react-suspense?fontsize=14&hidenavigation=1&theme=dark)

---

Learn more about SWR, and see all the examples on the official [Github](https://github.com/vercel/swr/tree/master/examples). 👋🏻
