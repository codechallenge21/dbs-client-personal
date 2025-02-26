import ChannelContextProvider from '@/context/ChannelContextProvider';
import ThemeProvider from '@/theme';
import {
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
  Public_Sans,
} from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SnackbarProvider } from '@/context/SnackbarContext';
// import { Box } from "@mui/material";
// import { Header } from "@/components/header";

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
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <Script id="dynafont-config" strategy="beforeInteractive">
          {`
            FontJSON={
              User:"16697",
              DomainID:"D0005795KZB", 
              Font:["DFT_B5","DFT_B7","DFT_B3","DFT_BC"]
            }
          `}
        </Script>
        <Script
          src="https://dfo.dynacw.com.tw/DynaJSFont/DynaFont_FOUT.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicSansFont.variable} ${openSansFont.variable} ${interFont.variable}`}
      >
        {/* <Box>
          <Header />
        </Box> */}
        <ThemeProvider>
          {' '}
          <SnackbarProvider>
            <ChannelContextProvider>{children}</ChannelContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
