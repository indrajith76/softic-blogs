import Head from "next/head";
import { Provider } from "react-redux";
import { Navbar } from "../components/Navbar";
import store from "../store";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Softic Blogs</title>
      </Head>
      <Navbar />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
