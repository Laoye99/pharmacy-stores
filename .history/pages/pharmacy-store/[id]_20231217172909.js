import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import useSWR from 'swr';
import styles from '../../styles/pharmacy-store-module.module.css';
import cls from 'classnames';
import { fetchPharmacyStores } from "../../lib/pharmacy-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import { fetcher, isEmpty } from "@/utils";

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

const PharmacyStore = (initialProps) => {
    const router = useRouter();
    if(router.isFallback) {
        return <div>Loading...</div>
    }
    const id =router.query.id;

    const [pharmacyStore, setPharmacyStore] = useState(initialProps.pharmacyStore);


    const {
        state: {pharmacyStores},
    } = useContext(StoreContext);

    const handleCreatePharmacyStore = async (pharmacyStore) => {
        try {
            const { id, name, voting, formatted_address, locality, imgUrl } = pharmacyStore;
            const requestBody = {
                id,
                name,
                voting: 0,
                formatted_address: formatted_address || '',
                locality: locality || '',
                imgUrl
            };
    
            const response = await fetch('/api/createPharmacyStore', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const dbPharmacyStore = await response.json();
        } catch (err) {
            console.error('Error creating pharmacy store', err);
        }
    };
    

    useEffect(() => {
        if(isEmpty(initialProps.pharmacyStore)) {
            if (pharmacyStores.length>0){
                const pharmacyStoreFromContext=pharmacyStores.find((pharmacyStore) => {
                    return pharmacyStore.id.toString() === id;
                });
                if (pharmacyStoreFromContext) {
                setPharmacyStore(pharmacyStoreFromContext);
                handleCreatePharmacyStore(pharmacyStoreFromContext);
                }
            }
        }
             else{
                handleCreatePharmacyStore(initialProps.pharmacyStore);
            }
        }, [id, initialProps, initialProps.pharmacyStore
    ]);


    const { name, formatted_address, locality, imgUrl } = pharmacyStore;

    const [votingCount, setVotingCount] = useState(0);

    const {data, error } = useSWR(`/api/getPharmacyStoreById?id=${id}`, fetcher);

    useEffect(() => {
        if(data && data.length > 0) {
           setPharmacyStore(data[0]);
            setVotingCount(data[0].voting);
        }
    }, [data]);
 
    const handleUpvoteButton = async() => {
         try {
            const requestBody = {
                id
            };
    
            const response = await fetch('/api/favouritePharmacyStoreById', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const dbPharmacyStore = await response.json();
            if (dbPharmacyStore && dbPharmacyStore.length > 0) {
                let count = votingCount + 1;
        setVotingCount(count);
            }
            
        } catch (err) {
            console.error('Error upvoting the pharmacy store', err);
        }
    };

    if (error){
        return <div>Something went wrong retrieving pharmacy store page</div>;
    }
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
    <Image src="/static/icons/places.svg" width="24" height="24" alt="places icon"/>
    <p className={styles.text}>{formatted_address}</p>
    </div>)
    }
    {locality && (<div className={styles.iconWrapper}>
    <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="near me icon"/>
    <p className={styles.text}>{locality}</p>
    </div>)
    }
    <div className={styles.iconWrapper}>
    <Image src="/static/icons/star.svg" width="24" height="24" alt=""/>
    <p className={styles.text}>{votingCount}</p>
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