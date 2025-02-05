"use client";
import React, { Suspense } from "react";
import { CircularProgress } from '@mui/material';
import PopularArea from "@/app/popular/PopularArea";


export default function PopularPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <PopularArea />
    </Suspense>
  );
}
