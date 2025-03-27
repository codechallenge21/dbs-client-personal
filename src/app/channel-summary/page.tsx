'use client';
import React, { Suspense, useEffect, useState } from 'react';
import ChannelSummary from './channelSummary';
import { CircularProgress } from '@mui/material';

export default function SummaryPageWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Suspense fallback={<CircularProgress />}>
      <ChannelSummary />
    </Suspense>
  );
}
