import { createContext } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();



export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
