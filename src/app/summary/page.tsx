"use client";
import LoadingScreen from "@/components/loading/page";
import SummaryCard from "@/components/summaryCard/page";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";
import React, { useState, useEffect } from "react";

export default function SummaryPage() {
  const [loading, setLoading] = useState(true);

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
      <ToolboxDrawer>
        <SummaryCard />
      </ToolboxDrawer>
    </>
  );
}
