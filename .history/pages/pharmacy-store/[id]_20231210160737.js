import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/pharmacy-store-module.module.css';
import cls from 'classnames';
import { fetchPharmacyStores } from "../../lib/pharmacy-stores";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const pharmacyStores = await fetchPharmacyStores();
    const findPharmacyStoreById=pharmacyStores.find((pharmacyStore) => {
        return pharmacyStore.id.toString() === params.id;
    });
    return{
        props: {
            pharmacyStore: findPharmacyStoreById ? findPharmacyStoreById : {},
            },
        };
    
}

export async function getStaticPaths() {
    const pharmacyStores = await fetchPharmacyStores();
    const paths = pharmacyStores.map((pharmacyStore) =>{
        return{
            params: {
                id: pharmacyStore.id.toString(),
            },
        };
    });
    return{
        paths,
        fallback: true,
    };
}

const PharmacyStore = (props) => {
    const router = useRouter();
    if(router.isFallback) {
        return <div>Loading...</div>
    }

    const id =router.query

    const {name,  formatted_address, locality, imgUrl } = props.pharmacyStore;

    const handleUpvoteButton = () => {
        console.log('handle upvote');
    };
    return (
        <div className={styles.layout}>
        <Head>
        <title>{name}</title>
        </Head>
    <div className={styles.container}>
    <div className={styles.col1}>
    <div className={styles.backToHomeLink}>   
    <Link href='/'>
      Back to home
    </Link>
    </div> 
    <div className={styles.nameWrapper}>
    <h1 className={styles.name}>{name}</h1>
    </div>
    <Image
    src={imgUrl || 
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
    width={300}
    height={100}
    className={styles.storeImg}
    alt={name}
    ></Image>
    </div>

    <div className={cls("glass", styles.col2)}>
    {formatted_address &&  (
    <div className={styles.iconWrapper}>
    <Image src="/static/icons/places.svg" width="24" height="24"/>
    <p className={styles.text}>{formatted_address}</p>
    </div>)
    }
    {locality && (<div className={styles.iconWrapper}>
    <Image src="/static/icons/nearMe.svg" width="24" height="24"/>
    <p className={styles.text}>{locality}</p>
    </div>)
    }
    <div className={styles.iconWrapper}>
    <Image src="/static/icons/star.svg" width="24" height="24"/>
    <p className={styles.text}>1</p>
    </div>

    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
    Up Vote !
    </button>
    </div>
    </div>
    </div>
    );
};

export default PharmacyStore;