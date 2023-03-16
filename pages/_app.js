import React from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}
