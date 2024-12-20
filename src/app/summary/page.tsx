"use client";
import React, {Suspense } from "react";
import { CircularProgress } from "@mui/material";
import SummaryPage from "./summarypage";


export default function SummaryPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <SummaryPage />
    </Suspense>
  );
}
