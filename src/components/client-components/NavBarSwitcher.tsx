"use client";

import { usePathname } from "next/navigation";
import { Header } from "../header";
import { HomeNavbar } from "../home-header";

export default function NavBarSwitcher() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return isHomePage ? <HomeNavbar /> : <Header />;
}
