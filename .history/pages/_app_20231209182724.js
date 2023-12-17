import { createContext } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();

const StoreProvider = ({children}) {
  return <StoreContext.Provider value='{dark}'>
  <Toolbar/>
  </StoreContext.Provider>
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
};
