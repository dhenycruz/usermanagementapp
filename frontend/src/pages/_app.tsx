import { ThemeProvider, theme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '../context/UserContext';
import { GlobalStyles } from '../themes/globalStyles';
import { Theme } from '../themes/themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>User Management APP</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet" />
        <link rel="icon" type="imagem/png" href="https://img.icons8.com/office/344/select-users.png" />
      </Head>
      <Theme>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </Theme>
    </>
  );
};

export default MyApp;
