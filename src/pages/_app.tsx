import Head from "next/head"
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
import { useEffect } from "react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import type { AppProps } from "next/app"
import parseSession from "@/services/helper/parseSession"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const cookies = parseCookies()
  const token = cookies.token

  useEffect(() => {
    const session = token ? parseSession(token) : null

    if (!session && router.pathname !== "/login") {
      router.push("/login")
    }

    if (session && router.pathname === "/login") {
      router.push("/")
    }
  }, [router, token])

  const renderWithLayout =
    (Component as any).getLayout || ((page: any) => <Layout>{page}</Layout>)

  return (
    <>
      <Head>
        <title>SDM x Roland</title>
      </Head>
      {renderWithLayout(<Component {...pageProps} />)}
    </>
  )
}
