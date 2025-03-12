import FontLoader from "@/components/font-loader";
import ChannelContextProvider from "@/context/ChannelContextProvider";
import { LoginProvider } from "@/context/LoginContext";
import { SnackbarProvider } from "@/context/SnackbarContext";
import ThemeProvider from "@/theme";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import {
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
  Public_Sans,
} from "next/font/google";
import DynaFontScript from "../assets/font/DynaFontScript";
import "./globals.css";
import { metadata } from './metadata';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSansFont = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  adjustFontFallback: false,
  display: "swap",
});

const publicSansFont = Public_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-public-sans",
  adjustFontFallback: false,
  display: "swap",
});

const interFont = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  adjustFontFallback: false,
  display: "swap",
});

export { metadata };

type Props = {
  readonly children: React.ReactNode;
};

function Providers({ children }: Props) {
  return (
    <ReduxProvider>
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
    </ReduxProvider>
  );
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="zh-TW">
      <head>
        <DynaFontScript />
        <meta httpEquiv="Content-Language" content="zh-TW" />
        <meta name="google" content="notranslate" />
        <meta property="og:locale" content="zh_TW" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicSansFont.variable} ${openSansFont.variable} ${interFont.variable}`}
        style={{ visibility: "visible" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
