'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, CircularProgress, Snackbar, Alert } from '@mui/material';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';

const VerifyAccountPage = () => {
  // Retrieve the emailTokenId query parameter
  const searchParams = useSearchParams();
  const emailTokenId = searchParams.get('emailTokenId');
  const router = useRouter();
  // Setup the verifyAccount API hook
  const { excute: verifyAccount, isLoading } = useAxiosApi(apis.verifyAccount);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (emailTokenId) {
      verifyAccount({ emailTokenId })
        .then((response) => {
          if (response.status === 200) {
            setSnackbarMessage('Email is verified');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            // Redirect to home with login dialog open after a short delay
            setTimeout(() => {
              router.push('/?login=true');
            }, 2500);
          } else {
            setSnackbarMessage('Verification failed. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setTimeout(() => {
              router.push('/');
            }, 2500);
          }
        })
        .catch(() => {
          setSnackbarMessage('Verification failed. Please try again.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          setTimeout(() => {
            router.push('/');
          }, 2500);
        });
    } else {
      setSnackbarMessage('Invalid verification link.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  }, [emailTokenId, verifyAccount, router]);

  return (
    <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
      {isLoading && <CircularProgress />}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VerifyAccountPage;
