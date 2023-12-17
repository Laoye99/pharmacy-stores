import { createContext, useReducer } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <StoreProvider>
  <Component {...pageProps} />
  </StoreProvider>
};
