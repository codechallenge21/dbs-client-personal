'use client';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import Events from './Events';

export default function EventsWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Events />
    </Suspense>
  );
}
