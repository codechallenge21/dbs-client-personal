'use client';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import ChannelsList from './channelsList';

export default function SummaryPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ChannelsList />
    </Suspense>
  );
}
