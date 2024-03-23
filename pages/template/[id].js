import Head from "next/head";
import styles from "../../styles/Home.module.css";
import stylesi from "../../styles/index.module.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import SecondaryNavbar from "../../components/SecondaryNavbar";
import CollectionCarousel from "../../components/CollectionCarousel";
import Offers from "../../components/Offers";
import AboutUs from "../../components/AboutUs";
import NextNavbar from "../../components/NextNavbar";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';


const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const language_dictionary = {
  slogan: {
    en:
      "The linen and cotton clothes that offer comfort, luxury, and modernity",
    es: "La ropa de lino y algodón que ofrece confort, lujo y modernidad",
  },
};

export default function Home() {
  
  const { cart } = useCart();
  const { language } = useLanguage();
  const { user } = useContext(AuthContext);


  const [categories, setCategories] = useState(null);
  const [collections, setCollections] = useState(null);
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [section, setSection] = useState({});


  useEffect(async () => {
    await getCategories(setCategories);
    await getCollections(setCollections);
  }, []);

  const languageTranslate = (phrase) => {
    return language_dictionary[phrase][language];
  };

  const router = useRouter();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/store/website/${userId}/${id}/`);
        setSection(response.data);
      }
      catch (error) {
        console.error('There was an error!', error);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady])


  const userId = user ? user.user_id : 1;

  if (!isRouterReady) {
        return <div>Loading...</div>;
  }

  const { id } = router.query;

  if (!id) {
        return <div>Error: Template ID is missing.</div>;
    }



  

  return (
    <div className={stylesi.container}>
      <Head>
        <title>Market Master</title>
        <meta
          name="description"
          content="Market Master is an e-commerce that sells high quality linen and cotton clothing, and that specializes in Caribbean guayaberas and guayamisas"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Market Master" />
        <meta
          property="og:description"
          content="Market Master is an e-commerce that sells high quality linen and cotton clothing, and that specializes in Caribbean guayaberas and guayamisas"
        />
        <meta property="og:url" content="https://habanerasdelino.com/" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <style>
            {section.section8}
        </style>
      </Head>

      <NextNavbar navy={false}/>

      <SecondaryNavbar navbarShow={false} navy={false} linkBackShow={false} />


      <main className={styles.main}>

      
      <div className={stylesi.background_div} style={{ backgroundImage: `url('/images/Navbar/LUX8A.jpg')` }}>
        <div className={stylesi.title_div}>
        <div className={stylesi.about_title}>
          <Banner templateId={id} userId={userId}/>
          
        </div>
        </div>
        </div>
        

        <div className={stylesi.small_br} />

        <div className={stylesi.collection_carousel_wrapper_div}>


        <CollectionCarousel collection={"Luxury"} />
        <CollectionCarousel collection={"Etnik"} />

        </div>
        <Offers templateId={id} userId={userId}/>

        <AboutUs templateId={id} userId={userId}/>

        <Footer templateId={id} userId={userId}/>

      </main>
    </div>
  );
}

const getCategories = (setCategories) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const categories_url = domain + "store/categories/";
  axios
    .get(categories_url, config)
    .then(async (res) => {
      const result = await res.data;
      setCategories(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCollections = (setCollections) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const collections_url = domain + "store/collections/";
  axios
    .get(collections_url, config)
    .then(async (res) => {
      const result = await res.data;
      setCollections(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
