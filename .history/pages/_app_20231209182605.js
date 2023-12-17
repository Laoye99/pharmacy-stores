import { createContext } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();

const StoreProvider = ({children}) {
  

}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
};
