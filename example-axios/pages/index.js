import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url);

const Example = () => {
  const { data, error } = useSWR(`https://swapi.dev/api/people/1/`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Example;
