'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, CircularProgress, Typography } from '@mui/material';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';

const VerifyAccountPage = () => {
  // Get the emailTokenId from the URL query string.
  const searchParams = useSearchParams();
  const emailTokenId = searchParams.get('emailTokenId');
  console.log('emailTokenId:', emailTokenId);
  const router = useRouter();
  // Use your custom hook to get the verifyAccount API function.
  const { excute: verifyAccount, isLoading } = useAxiosApi(apis.verifyAccount);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (emailTokenId) {
      verifyAccount({ emailTokenId })
        .then((response) => {
          if (response.status === 200) {
            setMessage('Email is verified. Redirecting to home page...');
            // After a short delay, redirect to home and open the login dialog.
            setTimeout(() => {
              router.push('/?login=true');
            }, 2000);
          } else {
            setMessage('Verification failed. Please try again.');
          }
        })
        .catch(() => {
          setMessage('Verification failed. Please try again.');
        });
    } else {
      setMessage('Invalid verification link.');
    }
  }, [emailTokenId, verifyAccount, router]);

  return (
    <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h5">{message}</Typography>
      )}
    </Container>
  );
};

export default VerifyAccountPage;
