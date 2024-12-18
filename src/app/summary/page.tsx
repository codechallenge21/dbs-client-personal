"use client";
import LoadingScreen from "@/components/loading/page";
import SummaryCard from "@/components/summaryCard/page";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";
import React, { useState, useEffect } from "react";
import Header from "../chat/components/Header";

export default function SummaryPage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToolboxDrawer open={open} toggleDrawer={toggleDrawer}>
        <Header toggleDrawer={toggleDrawer} open={open} title="智能語音摘要"/>
        <SummaryCard />
      </ToolboxDrawer>
    </>
  );
}
