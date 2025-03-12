'use client';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import HomePage from './HomePage';

export default function SummaryPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <HomePage />
    </Suspense>
  );
}
