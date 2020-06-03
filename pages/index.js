import SiteHead from '@/components/SiteHead'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Home = () => (
  <>
    <SiteHead />
    <Header />
    <main className="container">
      <div className="example">
        <h2 className="text-2xl mb-2">Basic Example</h2>
        <iframe
          src="https://codesandbox.io/embed/github/gregrickaby/swr-examples/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fbasic-example&module=%2Fpages%2Fbasic-example.js&moduleview=1&theme=dark"
          className="iframe"
          title="gregrickaby/swr-examples"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    </main>
    <Footer />
  </>
)

export default Home
