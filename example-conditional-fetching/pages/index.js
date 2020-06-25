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
