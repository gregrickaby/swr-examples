import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((r) => r.json()) // eslint-disable-line no-undef

const BasicExample = () => {
  const {data, error} = useSWR(
    `https://www.reddit.com/r/itookapicture/.json?limit=8&show=all`,
    fetcher
  )
  if (error) return <div>Failed to load</div>
  if (!data) return <div>loading subreddit...</div>
  return (
    <>
      <div className="example-content">
        <h1 className="text-2xl my-8 text-center">Basic Example</h1>
        <p className="text-center">Display posts from r/itookapicture</p>
        <div className="grid grid-cols-2 gap-4">
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
      </div>
      <Link href="/">
        <a className="mt-8 text-center">Back home</a>
      </Link>
    </>
  )
}

export default BasicExample
