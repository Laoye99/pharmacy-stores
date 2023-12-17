import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "@/components/banner";
import Image from "next/image";
import Card from "@/components/card";
import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps(context) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.
      FO
    }
  };
  
  const response = await fetch(
    'https://api.foursquare.com/v3/places/search?query=coffee&ll=6.549210428174546%2C3.3716615277994073&limit=6', options);
    const data = await response.json();
    // .catch(err => console.error(err));

  return{
    props: {
      coffeeStores: data.results,
    },
  };
}

export default function Home(props) {
  console.log("props", props);

  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
        <h2 className={styles.heading2}>Lagos stores</h2>
        <div className={styles.cardLayout}>
        {props.coffeeStores.map((coffeeStore) =>{
          return (
         <Card
          key= {coffeeStore.id}  
          name={coffeeStore.name}
          imgUrl={coffeeStore.imgUrl || 
            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          }
          href={`/coffee-store/${coffeeStore.id}`}
          className= {styles.card}
        />
          );
        })}
        
        </div>
        </>
        )}
      </main>
    </div>
  );
}
