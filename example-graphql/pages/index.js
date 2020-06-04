import { request } from "graphql-request";
import useSWR from "swr";

const API = "https://api.graph.cool/simple/v1/movies";
const fetcher = (query) => request(API, query);

const ExampleGraphQL = () => {
  const { data, error } = useSWR(
    `{
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ExampleGraphQL;
