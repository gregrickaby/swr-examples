import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const ExampleBasic = () => {
  const { data, error } = useSWR(
    `https://www.reddit.com/r/itookapicture/.json?limit=2&show=all`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ExampleBasic;
