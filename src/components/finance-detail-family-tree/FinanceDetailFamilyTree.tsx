'use client';

import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import checkerImage from '../../../public/assets/images/checker.png';

const FinanceDetailFamilyTree = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            gap: '16px',
            flex: '1 0 0',
            display: 'flex',
            alignSelf: 'stretch',
            alignItems: 'center',
            padding: '16px  32px',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 'calc(100vh - 130px)',
            minHeight: 'calc(100vh - 130px)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              borderRadius: '10px',
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10px',
              background: '#888',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Box
            sx={{
              gap: '20px',
              flex: '1 0 0',
              display: 'flex',
              padding: '16px',
              borderRadius: '8px',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Image src={checkerImage} alt="Finance Detail Family Tree" />
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            gap: '16px',
            flex: '1 0 0',
            display: 'flex',
            padding: '16px',
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 'calc(100vh - 170px)',
            minHeight: 'calc(100vh - 170px)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              borderRadius: '10px',
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10px',
              background: '#888',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Box
            sx={{
              gap: '20px',
              flex: '1 0 0',
              display: 'flex',
              padding: '16px',
              borderRadius: '8px',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Image src={checkerImage} alt="Finance Detail Family Tree" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FinanceDetailFamilyTree;
