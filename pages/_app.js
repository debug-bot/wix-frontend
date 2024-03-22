import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { CartProvider, getCart } from "../context/CartContext";
import { LanguageProvider } from "../context/LanguageContext";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <Layout>
              <Head>
                <title>Market Master</title>
                <link rel="shortcut icon" href="/logos/favicon.ico" />
                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/logos/apple-touch-icon.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/logos/favicon-32x32.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/logos/favicon-16x16.png"
                />
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                />

                <script
                  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
                  defer
                ></script>
              </Head>
              <Component {...pageProps} />
            </Layout>
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
