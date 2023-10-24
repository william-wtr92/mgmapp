import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@fontsource/chivo"; // Defaults to weight 400
import "@fontsource/chivo/400.css"; // Specify weight
import "@fontsource/chivo/400-italic.css"; // Specify weight and style

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
