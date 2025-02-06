'use client';

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

interface SwitchDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SwitchDialog: React.FC<SwitchDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      role="dialog"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 1,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px 8px 32px',
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontFamily: 'DFPHeiBold-B5',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}
        >
          切換顧問
        </Typography>
        <IconButton
          role="button"
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'black',
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          padding: '32px !important',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '32px',
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20px',
            fontFamily: 'DFPHeiMedium-B5',
          }}
        >
          您即將切換到 <strong>意外事件顧問</strong>。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          role="button"
          aria-label="confirm"
          variant="contained"
          color="primary"
          onClick={onConfirm}
          sx={{
            borderRadius: '16px',
            textTransform: 'none',
            backgroundColor: 'black',
            padding: '0px',
          }}
        >
          <Typography
            sx={{
              padding: '11px 16px',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: 'normal',
            }}
          >
            確認
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SwitchDialog;
