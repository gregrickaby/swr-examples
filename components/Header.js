import Head from 'next/head'

const Header = () => (
  <Head>
    <title>SWR Examples</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="description" content="View images from a subreddit." />
    <link rel="dns-prefetch" href="//www.reddit.com" />
    <link
      rel="preload"
      href="//www.reddit.com/r/itookapicture/.json?limit=200&show=all"
      as="fetch"
      crossOrigin="anonymous"
    />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

export default Header
