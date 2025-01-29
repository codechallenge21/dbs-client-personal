'use client';

import React from 'react';
import {
  Button,
  Dialog,
  useTheme,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery,
  DialogContentText,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

interface DeleteDialogProps {
  open: boolean;
  deletableName?: string;
  onClose: (event: React.MouseEvent) => void;
  onConfirm: (event: React.MouseEvent) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  deletableName,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '460px',
            minHeight: '80px',
            maxHeight: 'calc(100% - 64px)',
            borderRadius: '16px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          paddingTop: '8px',
          paddingRight: '8px',
          paddingLeft: '16px',
          paddingBottom: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontSize: '24px',
            fontWeight: '400',
            fontStyle: 'normal',
            lineHeight: 'normal',
            fontFamily: 'DFPHeiBold-B5',
          }}
        >
          刪除紀錄
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'black',
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            color: '#000',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '20px',
            fontStyle: 'normal',
            wordBreak: 'break-all',
            fontFamily: 'DFPHeiMedium-B5',
          }}
        >
          {`您確定要刪除 "${deletableName}" 嗎？`}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: '0px !important',
          paddingLeft: '24px !important',
          paddingRight: '24px !important',
          paddingBottom: '16px !important',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          sx={{
            borderRadius: '8px',
            backgroundColor: 'red',
            width: isMobile ? '100%' : 'auto',
            padding: isMobile ? '8px 16px' : '6px 12px',
          }}
        >
          <Typography
            sx={{
              padding: '0px',
              fontSize: '14px',
              fontWeight: '700',
              lineHeight: 'normal',
            }}
          >
            刪除
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
