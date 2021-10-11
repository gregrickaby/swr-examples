import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (query) =>
  request(`https://nextjs.wpengine.com/graphql`, query);

export default function Example() {
  const { data, error } = useSWR(
    `
      {
        pages {
          nodes {
            title
          }
        }
      }
    `,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
