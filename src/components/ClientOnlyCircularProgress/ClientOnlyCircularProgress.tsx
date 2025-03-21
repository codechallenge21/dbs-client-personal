'use client';

import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// This component ensures CircularProgress only renders on the client
// to avoid hydration mismatches
export default function ClientOnlyCircularProgress() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CircularProgress />;
}
