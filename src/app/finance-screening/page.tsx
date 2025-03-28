'use client';
import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import FinanceScreeningTest from './FinanceScreeningTest';

export default function FinanceScreeningPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    }>
      <FinanceScreeningTest />
    </Suspense>
  );
}