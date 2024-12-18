"use client";

import { usePathname } from "next/navigation";
import { HomeNavbar } from "../components/home-header";
import { Header } from "@/components/header";

export default function NavBarSwitcher() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return isHomePage ? <HomeNavbar /> : <Header />;
}
