import { useEffect, useState } from "react";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import Layout from "../components/Layout";
import { CartProvider, getCart } from "../context/CartContext";
import { LanguageProvider } from "../context/LanguageContext"
import SSRProvider from "react-bootstrap/SSRProvider";
import axios from "axios";


function MyApp({ Component, pageProps }) {
  const [section, setSection] = useState({});

  useEffect(() => {
    const templateId = localStorage.getItem('templateId') || "1";

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/store/website/${templateId}/`);
        setSection(response.data);
      }
      catch (error) {
        console.error('There was an error!', error);
      }
    }
    fetchData();
  }, []);

  return (
    <SSRProvider>
    <CartProvider>
	    <LanguageProvider>
      <Layout>
      <Head>
          <link rel="shortcut icon" href="/logos/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/logos/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/logos/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logos/favicon-16x16.png" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          <style>
            {section.section8}
          </style>
        </Head>
        <Component {...pageProps} />
      </Layout>
		    </LanguageProvider>
    </CartProvider>
    </SSRProvider>

  );
}

export default MyApp
