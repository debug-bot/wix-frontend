import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useCart } from "../context/CartContext";
import OrderSuccessfullyMade from "../components/OrderSuccessfullyMade";
import SecondaryNavbar from "../components/SecondaryNavbar";
import NextNavbar from "../components/NextNavbar";

export default function OderMade() {
  const { cart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Order Made Successfully - Market Master</title>
        <meta
          name="description"
          content="Order Made Successfully of linen and cotton clothes at Market Master"
        />
        <meta
          property="og:title"
          content="Order Made Successfully - Market Master"
        />
        <meta
          property="og:description"
          content="Order Made Successfully of linen and cotton clothes at Market Master"
        />
        <meta property="og:url" content="https://habanerasdelino/order-made" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <NextNavbar navy={true} />
      <SecondaryNavbar navbarShow={false} navy={true} />

      <main className={styles.main}>
        <OrderSuccessfullyMade />
      </main>

      <footer className={styles.footer} />
    </div>
  );
}
