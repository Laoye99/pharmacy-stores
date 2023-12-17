import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "@/components/banner";
import Image from "next/image";
import Card from "@/components/card";
import { fetchPharmacyStores } from "@/lib/pharmacy-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {

  const pharmacyStores = await fetchPharmacyStores();

  return{
    props: {
      pharmacyStores,
    },
  };
}

export default function Home(props) {
  const {handleTrackLocation, locationErrorMsg, isFindingLocation} = 
  useTrackLocation();
  const [pharmacyStoresError, setPharmacyStoresError] = useState(null);

  const {dispatch, state} = useContext(StoreContext);

  const { pharmacyStores, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getPharmacyStoresByLocation?latLong${latLong}&limit=30`
          );

          const pharmacyStores = await response.json();
          dispatch({
            type: ACTION_TYPES.SET_PHARMACY_STORES,
            payload: {
              pharmacyStores,
            }
          });
          setPharmacyStoresError('');
        } catch (error) {
          setPharmacyStoresError(error.message);
        }
      }
    };
  
    setCoffeeStoresByLocation(); // Call the async function immediately
  
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
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
         {pharmacyStoresError && <p>Something went wrong: 
            {pharmacyStoresError}</p>}  

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
