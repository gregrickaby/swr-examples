# SWR Examples

[SWR](https://swr.now.sh/) is a React Hooks library for remote data fetching. The examples are all run on [Next.js](https://nextjs.org/).

## Basic Example

```js
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const ExampleBasic = () => {
  const { data, error } = useSWR(`https://swapi.dev/api/people/1/`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ExampleBasic;
```

[![Edit gregrickaby/swr-examples: example-basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-basic?fontsize=14&hidenavigation=1&theme=dark)

---

## GraphQL

```js
import { request } from "graphql-request";

const API = "https://graphql-pokemon.now.sh";
const fetcher = (query) => request(API, query);

function ExampleGraphQL() {
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

export default ExampleGraphQL
```

[![Edit gregrickaby/swr-examples: example-graphql](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/example-graphql?fontsize=14&hidenavigation=1&theme=dark)

---
