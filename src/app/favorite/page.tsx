'use client';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import FavouriteList from './favoriteList';

export default function Favorite() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <FavouriteList />
    </Suspense>
  );
}
