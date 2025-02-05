'use client';
import React, { Suspense } from 'react';
import ChannelSummary from './channelSummary';
import { CircularProgress } from '@mui/material';

export default function SummaryPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ChannelSummary />
    </Suspense>
  );
}
