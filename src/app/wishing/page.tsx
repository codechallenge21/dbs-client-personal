'use client';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import WishingWell from './WishingWell';

export default function WishingWellWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <WishingWell />
    </Suspense>
  );
}
