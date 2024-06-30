import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "./Providers";
import Header from "@/widget/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return <Providers>
    <Header/>
    <div style={{marginTop: "50px"}}>
    <Component {...pageProps} />
    </div>
   
  </Providers>
}
