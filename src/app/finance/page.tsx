'use client';
import React, { Suspense } from 'react';
import FinanceScreen from './FinanceScreen';
import { CircularProgress } from '@mui/material';

export default function PopularPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <FinanceScreen />
    </Suspense>
  );
}
