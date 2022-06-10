import { ThemeProvider, theme } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { GlobalStyles } from '../themes/globalStyles';
import { Theme } from '../themes/themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>User Manageem</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet" />
      </Head>
      <Theme>
        <GlobalStyles />
        <ThemeProvider theme={ theme }>
          <Component {...pageProps} />
        </ThemeProvider>
      </Theme>
    </>
  )
}

export default MyApp
