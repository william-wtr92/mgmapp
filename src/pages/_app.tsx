import Layout from "@/components/ui/Layout"
import "@/styles/globals.css"
import "@fontsource/chivo"
import "@fontsource/chivo/400.css"
import "@fontsource/chivo/400-italic.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
