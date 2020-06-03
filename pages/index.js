import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main>
        <h1 className="title">SWR Examples</h1>

        <p className="description">
          <a href="https://swr.now.sh/">SWR</a> is a React Hooks library for
          remote data fetching.
        </p>

        <div className="grid">
          <Link href="/basic-example">
            <a className="card">
              <h3>Basic Example &rarr;</h3>
              <p>Fetch some data from the Reddit API.</p>
            </a>
          </Link>
        </div>

        <p>
          <em>
            *Due to{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">
              CORS
            </a>{' '}
            issues, you may need to{' '}
            <a href="/disable-firefox-tracking-protection.png">
              disable Firefox Tracking Protection
            </a>{' '}
            and/or any AdBlockers to view examples.
          </em>
        </p>
      </main>

      <Footer />
    </div>
  )
}
