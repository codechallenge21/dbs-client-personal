'use client';

import { Suspense, useEffect, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, CircularProgress } from '@mui/material';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import { SnackbarContext } from '@/context/SnackbarContext';

function VerifyAccountPageInner() {
  // Retrieve the emailTokenId query parameter
  const searchParams = useSearchParams();
  const emailTokenId = searchParams.get('emailTokenId');
  const router = useRouter();
  const { excute: verifyAccount, isLoading } = useAxiosApi(apis.verifyAccount);
  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (emailTokenId) {
      verifyAccount({ emailTokenId })
        .then((response) => {
          if (response.status === 200) {
            showSnackbar('Email is verified', 'success');
            // Redirect to home with login dialog open after a short delay
            setTimeout(() => {
              router.push('/?login=true');
            }, 2500);
          } else {
            showSnackbar('Verification failed. Please try again.', 'error');
            setTimeout(() => {
              router.push('/');
            }, 2500);
          }
        })
        .catch(() => {
          showSnackbar('Verification failed. Please try again.', 'error');
          setTimeout(() => {
            router.push('/');
          }, 2500);
        });
    } else {
      showSnackbar('Invalid verification link.', 'error');
      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  }, [emailTokenId, verifyAccount, router, showSnackbar]);

  return (
    <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
      {isLoading ? <CircularProgress /> : null}
    </Container>
  );
}

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <VerifyAccountPageInner />
    </Suspense>
  );
}
