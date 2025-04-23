// pages/_app.js
import { SessionProvider } from "next-auth/react";
import Layout from '../components/layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const hideLayout = Component.hideLayout; // detectamos si el componente quiere ocultar el layout

  return (
    <SessionProvider session={session}>
      {hideLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
