'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import checkerImage from '../../../public/assets/images/checker.png';
import { Box, useTheme, useMediaQuery } from '@mui/material';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const FinanceDetailFamilyTree = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

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
            height: 'calc(100vh - 135px)',
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '64px',
            },
            '&::-webkit-scrollbar-track': {
              opacity: '0.48',
              borderRadius: '12px',
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              opacity: '0.48',
              background: '#888',
              borderRadius: '12px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              opacity: '0.48',
              background: '#555',
            },
          }}
        >
          <Box
            sx={{
              height: '10%',
              display: 'flex',
              padding: '16px',
              borderRadius: '8px',
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="時間"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              gap: '20px',
              height: '90%',
              flex: '1 0 0',
              display: 'flex',
              padding: '16px',
              borderRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--Primary-, #EBE3DD)',
            }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              src={checkerImage}
              alt="Finance Detail Family Tree"
            />
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
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '64px',
            },
            '&::-webkit-scrollbar-track': {
              opacity: '0.48',
              borderRadius: '12px',
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              opacity: '0.48',
              background: '#888',
              borderRadius: '12px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              opacity: '0.48',
              background: '#555',
            },
          }}
        >
          <Box
            sx={{
              height: '10%',
              display: 'flex',
              padding: '16px',
              borderRadius: '8px',
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="時間"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              gap: '20px',
              height: '90%',
              flex: '1 0 0',
              display: 'flex',
              padding: '16px',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '8px',
              alignItems: 'center',
              flexDirection: 'column',
              background: 'var(--Primary-, #EBE3DD)',
            }}
          >
            <Image
              src={checkerImage}
              alt="Finance Detail Family Tree"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FinanceDetailFamilyTree;
