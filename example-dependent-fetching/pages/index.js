import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Example = () => {
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
};

export default Example;
