"use client";
import React, { Suspense } from "react";
import PopularArea from "@/app/popular/PopularArea";


const LoadingComponent = () => {
  return <div>Loading...</div>;
};

export default function PopularPageWrapper() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PopularArea />
    </Suspense>
  );
}
