'use client';

import { useEffect, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, CircularProgress, Typography } from '@mui/material';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import { SnackbarContext } from '@/context/SnackbarContext';

export default function GUserLoginPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();
  const { showSnackbar } = useContext(SnackbarContext);
  const { excute: googleLogin, isLoading } = useAxiosApi(apis.googleLogin);

  useEffect(() => {
    if (!code) {
      showSnackbar('Missing Google login code.', 'error');
      router.push('/login');
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        const response = await googleLogin({ code });
        console.log('response', response);
        if (response.status === 200) {
          // On success, the server sets u_lid, u_tid, u_info cookies automatically
          showSnackbar('Login successful.', 'success');
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          showSnackbar('Google login failed. Please try again.', 'error');
          router.push('/');
        }
      } catch (error) {
        showSnackbar('Google login failed. Please try again.', 'error');
        router.push('/');
      }
    };

    completeGoogleLogin();
  }, [code, googleLogin, router, showSnackbar]);

  return (
    <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h5">Processing Google login...</Typography>
      )}
    </Container>
  );
}
