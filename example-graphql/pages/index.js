import { request } from "graphql-request";
import useSWR from "swr";

const API = "https://graphql-pokemon.now.sh";
const fetcher = (query) => request(API, query);

const ExampleGraphQL = () => {
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

export default ExampleGraphQL;
