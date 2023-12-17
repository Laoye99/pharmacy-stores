import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel='preload' href='/fonts/Roboto-Bold.ttf'
      as='font' crossOrigin='anonymous'></link>
      <link rel='preload' href='/fonts/Roboto-Light.ttf'
      as='font' crossOrigin='anonymous'></link>
      <link rel='preload' href='/fonts/Roboto-Medium.ttf'
      as='font' crossOrigin='anonymous'></link>
      <link rel='preload' href='/fonts/Roboto-Regular.ttf'
      as='font' crossOrigin='anonymous'></link>
      <link rel='preload' href='/fonts/Roboto-Thin.ttf'
      as='font' crossOrigin='anonymous'></link>
      </Head> 
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
