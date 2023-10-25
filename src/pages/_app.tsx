import Layout from "@/components/ui/Layout"
import "@/styles/globals.css"
import "@fontsource/chivo"
import "@fontsource/chivo/100.css"
import "@fontsource/chivo/200.css"
import "@fontsource/chivo/300.css"
import "@fontsource/chivo/400.css"
import "@fontsource/chivo/500.css"
import "@fontsource/chivo/600.css"
import "@fontsource/chivo/100-italic.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  const renderWithLayout = (Component as any).getLayout || ((page: any) => <Layout>{page}</Layout>)

  return (
    <>
      {renderWithLayout(
        <Component {...pageProps} />
      )}
    </>
  )
}
