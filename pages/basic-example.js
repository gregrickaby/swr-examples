import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function IndexPage() {
  const {data, error} = useSWR(
    `https://www.reddit.com/r/itookapicture/.json?limit=3&show=all`,
    fetcher
  )
  if (error) return <div>Failed to load</div>
  if (!data) return <div>loading subreddit...</div>
  return (
    <>
      <h1>Basic Example</h1>
      <a href="https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fbasic-example&module=%2Fpages%2Fbasic-example.js&moduleview=1&theme=dark">
        <img
          alt="Edit gregrickaby/swr-examples"
          src="https://codesandbox.io/static/img/play-codesandbox.svg"
        />
      </a>
      <div className="example-content">
        {data.data.children.map((post, index) => (
          <div key={index}>
            <h2>
              <a
                href={`https://www.reddit.com${post.data.permalink}`}
                dangerouslySetInnerHTML={{__html: post.data.title}}
              />
            </h2>
            <img src={post.data.thumbnail} alt={post.data.title} />
          </div>
        ))}
      </div>
    </>
  )
}
