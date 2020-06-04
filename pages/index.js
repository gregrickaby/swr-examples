import SiteHead from '@/components/SiteHead'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const Home = () => (
  <>
    <SiteHead />
    <Header />
    <main className="container">
      <div className="flex flex-col justify-center items-center text-center">
        <Link href="/basic-example">
          <a className="underline">
            <h2 className="text-2xl mb-2">Basic Example</h2>
          </a>
        </Link>
        <pre className="text-left whitespace-pre overflow-x-auto">
          {`
          import useSWR from 'swr'

          const fetcher = (url) => fetch(url).then((r) => r.json())

          function Profile() {
            const { data, error } = useSWR('/api/user', fetcher)

            if (error) return <div>failed to load</div>
            if (!data) return <div>loading...</div>
            return <div>hello {data.name}!</div>
          }
          `}
        </pre>
        <a href="https://codesandbox.io/s/github/gregrickaby/swr-examples/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fbasic-example&moduleview=1&theme=dark">
          <img
            alt="Edit gregrickaby/swr-examples"
            src="https://codesandbox.io/static/img/play-codesandbox.svg"
          />
        </a>
      </div>
    </main>
    <Footer />
  </>
)

export default Home
