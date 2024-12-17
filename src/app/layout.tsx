// import Header from "@/components/header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";
import NavBarSwitcher from "@/components/client-components/NavBarSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DBS Client",
  description: "DBS Client Official WebSite",
  keywords: "react,material,kit,application,dashboard,admin,template",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.svg",
    },
    {
      rel: "icon",
      type: "image/svg",
      sizes: "16x16",
      url: "/favicon/favicon.svg",
    },
    {
      rel: "icon",
      type: "image/svg",
      sizes: "32x32",
      url: "/favicon/favicon.svg",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/favicon.svg",
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBarSwitcher />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
