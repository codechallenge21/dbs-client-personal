"use client";

import { usePathname } from "next/navigation";
import { Header } from "../components/header";
import { HomeNavbar } from "../components/home-header";

export default function NavBarSwitcher() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return isHomePage ? <HomeNavbar /> : <Header />;
}
