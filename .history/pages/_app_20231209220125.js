import { createContext, useReducer } from 'react';
import '../styles/globals.css';

const StoreContext = createContext();

const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_PHARMACY_STORES: "SET_PHARMACY_STORES",
}

const storeReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {

    }
    case ACTION_TYPES.SET_PHARMACY_STORES: {

    }
    default:
      throw new Error(`Unhandled action type: ${action.type} `);
  }
}

const StoreProvider = ({children})  => {
  const initialState ={
    latLong: "",
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(ST);
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
