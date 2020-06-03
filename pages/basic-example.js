import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function IndexPage() {
  const { data, error } = useSWR(
    `https://www.reddit.com/r/itookapicture/.json?limit=5&show=all`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading subreddit...</div>;
  return (
    <>
      <h1>Reddit Viewer</h1>
      💻{" "}
      <a href="https://github.com/gregrickaby/swr-examples/blob/master/pages/basic-example.js">
        View source code on Github
      </a>
      {data.data.children.map((post, index) => (
        <div key={index}>
          <h2>
            <a
              href={`https://www.reddit.com${post.data.permalink}`}
              dangerouslySetInnerHTML={{ __html: post.data.title }}
            />
          </h2>
          <img src={post.data.thumbnail} alt={post.data.title} />
        </div>
      ))}
    </>
  );
}
