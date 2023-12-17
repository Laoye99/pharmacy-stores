import { createContext } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();

const ACTION_TYPES = {
  SET_LA
}

const StoreProvider = ({children})  => {
  const initialState ={
    latLong: "",
    coffeeStores: [],
  };
  return (<StoreContext.Provider value={{state: {} }}>
  {children}
  </StoreContext.Provider>
  )
}

export default function App({ Component, pageProps }) {
  return <StoreProvider>
  <Component {...pageProps} />
  </StoreProvider>
};
