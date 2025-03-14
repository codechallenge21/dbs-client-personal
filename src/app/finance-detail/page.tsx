'use client';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import FinanceDetailScreen from './FinanceDetailScreen';

export default function PopularPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <FinanceDetailScreen />
    </Suspense>
  );
}
