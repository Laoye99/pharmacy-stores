import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "@/components/banner";
import Image from "next/image";
import Card from "@/components/card";
import { fetchPharmacyStores } from "@/lib/pharmacy-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { useEffect, useState } from "react";

export async function getStaticProps(context) {

  const pharmacyStores = await fetchPharmacyStores();

  return{
    props: {
      pharmacyStores,
    },
  };
}

export default function Home(props) {
  console.log("props", props);

  const {handleTrackLocation, latLong, locationErrorMsg, isFindingLocation} = 
  useTrackLocation();

  const [pharmacyStores, setPharmacyStores] = useState('');

  const [coffee]

  console.log({latLong, locationErrorMsg});

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedPharmacyStores = await fetchPharmacyStores(latLong,30);
          console.log({ fetchedPharmacyStores });
          setPharmacyStores(fetchedPharmacyStores);
        } catch (error) {
          console.log({ error });
        }
      }
    };
  
    setCoffeeStoresByLocation(); // Call the async function immediately
  
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
    handleTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Pharma Find</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: 
          {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>

        {pharmacyStores.length > 0 && (
          
          <div className={styles.sectionWrapper}>
        <h2 className={styles.heading2}>Stores near me</h2>
        <div className={styles.cardLayout}>
        {pharmacyStores.map((pharmacyStore) =>{
          return (
         <Card
          key= {pharmacyStore.id}  
          name={pharmacyStore.name}
          imgUrl={pharmacyStore.imgUrl || 
            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          }
          href={`/pharmacy-store/${pharmacyStore.id}`}
          className= {styles.card}
        />
          );
        })}
        
        </div>
        </div>
        )}

        {props.pharmacyStores.length > 0 && (
          
          <div className={styles.sectionWrapper}>
        <h2 className={styles.heading2}>Lagos stores</h2>
        <div className={styles.cardLayout}>
        {props.pharmacyStores.map((pharmacyStore) =>{
          return (
         <Card
          key= {pharmacyStore.id}  
          name={pharmacyStore.name}
          imgUrl={pharmacyStore.imgUrl || 
            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          }
          href={`/pharmacy-store/${pharmacyStore.id}`}
          className= {styles.card}
        />
          );
        })}
        
        </div>
        </div>
        )}
      </main>
    </div>
  );
}
