import { createContext } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();

const StoreProvider = ({children}) {
  return <StoreContext

}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
};
