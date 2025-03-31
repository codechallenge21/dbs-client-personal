import ClientOnlyCircularProgress from '@/components/ClientOnlyCircularProgress/ClientOnlyCircularProgress';
import FontLoader from '@/components/font-loader';
import EmotionCache from '@/components/providers/EmotionCache';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import TokenValidator from '@/components/TokenValidator';
import ChannelContextProvider from '@/context/ChannelContextProvider';
import { LoginProvider } from '@/context/LoginContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import ThemeProvider from '@/theme';
import { Suspense } from 'react';
import DynaFontScript from '../assets/font/DynaFontScript';
import './globals.css';
import { metadata } from './metadata';

export { metadata };

type Props = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='zh-TW'>
      <head>
        <DynaFontScript />
        <meta httpEquiv='Content-Language' content='zh-TW' />
        <meta name='google' content='notranslate' />
        <meta property='og:locale' content='zh_TW' />
      </head>
      <body className='visible-body' suppressHydrationWarning={true}>
        <EmotionCache>
          <ReduxProvider>
            <ThemeProvider>
              <SnackbarProvider>
                <LoginProvider>
                  <ChannelContextProvider>
                    <Suspense fallback={<ClientOnlyCircularProgress />}>
                      <FontLoader />
                      <TokenValidator />
                      {children}
                    </Suspense>
                  </ChannelContextProvider>
                </LoginProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </ReduxProvider>
        </EmotionCache>
      </body>
    </html>
  );
}
