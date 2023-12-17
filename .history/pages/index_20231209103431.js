import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "@/components/banner";
import Image from "next/image";
import Card from "@/components/card";
import { fetchPharmacyStores } from "@/lib/pharmacy-stores";
import useTrackLocation from "@/hooks/use-track-location";

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

  const {handleTrackLcation} = useTrackLocation();

  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
    handleTrackLcation(;
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Pharma Find</title>
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
        {props.pharmacyStores.length > 0 && (
          <>
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
        </>
        )}
      </main>
    </div>
  );
}