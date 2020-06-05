import { Suspense } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Profile = () => {
  const { data } = useSWR(`https://swapi.dev/api/people/1/`, fetcher, {
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
