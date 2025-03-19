'use client';
import { useState } from 'react';
import FinanceSearch from '../view-all-history-finance/ViewAllHistoryFinance';
import SwitchDialog from '../../components/dialogs/SwitchDialog';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const FinanceDetailSolutionHistory: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100vh' : 'calc(100vh - 32px)',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <FinanceSearch />
      <SwitchDialog
        open={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default FinanceDetailSolutionHistory;
