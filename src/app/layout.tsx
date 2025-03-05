import ChannelContextProvider from '@/context/ChannelContextProvider';
import ThemeProvider from '@/theme';
import {
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
  Public_Sans,
} from 'next/font/google';
import './globals.css';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { LoginProvider } from '@/context/LoginContext';
import DynaFontScript from '../assets/font/DynaFontScript';
import FontLoader from '@/components/font-loader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const openSansFont = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-open-sans',
  adjustFontFallback: false,
  display: 'swap',
});

const publicSansFont = Public_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-public-sans',
  adjustFontFallback: false,
  display: 'swap',
});

const interFont = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  adjustFontFallback: false,
  display: 'swap',
});

export const metadata = {
  title: '好理家在-財務健檢網｜好好理財，家就會在',
  description: '好理家在-財務健檢網官方網站',
  keywords: 'react,material,kit,application,dashboard,admin,template',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '16x16',
      url: '/favicon/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '32x32',
      url: '/favicon/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/favicon.svg',
    },
  ],
};

type Props = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <DynaFontScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicSansFont.variable} ${openSansFont.variable} ${interFont.variable}`}
      >
        <ThemeProvider>
          <SnackbarProvider>
            <LoginProvider>
              <ChannelContextProvider>
                <FontLoader />
                {children}
              </ChannelContextProvider>
            </LoginProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
