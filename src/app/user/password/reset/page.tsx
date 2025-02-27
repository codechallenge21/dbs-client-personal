// src/app/user/password/reset/page.tsx
'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordDialog from '@/components/ResetPasswordDialog/ResetPasswordDialog';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('emailTokenId'); // from ?emailTokenId=XYZ
  const [openDialog, setOpenDialog] = useState(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Optionally navigate away, e.g. router.replace('/');
  };

  return (
    <ResetPasswordDialog
      token={token}
      open={openDialog}
      onClose={handleCloseDialog}
    />
  );
}
