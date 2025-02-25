'use client';

import { SnackbarContext } from '@/context/SnackbarContext';
import apis from '@/utils/hooks/apis/apis';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import { CircularProgress, Container } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useContext, useEffect } from 'react';

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
            showSnackbar('電子郵件已驗證', 'success');
            // Redirect to home with login dialog open after a short delay
            setTimeout(() => {
              router.push('/?login=true');
            }, 2500);
          } else {
            showSnackbar('驗證失敗。請再試一次。', 'error');
            setTimeout(() => {
              router.push('/');
            }, 2500);
          }
        })
        .catch(() => {
          showSnackbar('驗證失敗。請再試一次。', 'error');
          setTimeout(() => {
            router.push('/');
          }, 2500);
        });
    } else {
      showSnackbar('無效的驗證連結。', 'error');
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
