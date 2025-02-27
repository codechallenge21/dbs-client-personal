'use client';

import type React from 'react';
import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CloseRounded, ArrowBackIos } from '@mui/icons-material';
import { SnackbarContext } from '@/context/SnackbarContext';

interface ForgetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onBack?: () => void;
}

const ForgetPasswordDialog: React.FC<ForgetPasswordDialogProps> = ({
  open,
  onClose,
  onBack,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { showSnackbar } = useContext(SnackbarContext);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      showSnackbar('請輸入電子郵件地址。', 'error');
      return;
    }
    try {
      setIsSubmitting(true);
      // Call your forget password API here
      // Example: await forgetPasswordAPI({ email });
      showSnackbar('重設密碼郵件已發送，請檢查您的信箱。', 'success');
      onClose();
    } catch (error) {
      showSnackbar('發送失敗，請稍後再試。', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    onClose();
  };
  const handleBack = () => {
    setEmail('');
    if (onBack) {
      onBack();
    } else {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '324px' : '600px',
            height: isMobile ? 'auto' : '350px',
            borderRadius: '8px',
            paddingBottom: isMobile ? '16px' : '24px',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '64px',
          padding: '8px 16px 8px 32px',
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            color: '#212B36',
            fontSize: isMobile ? '24px' : '32px',
            fontStyle: 'normal',
            lineHeight: '48px',
            fontFamily: 'DFPHeiBold-B5',
          }}
        >
          忘記密碼
        </Typography>
        <IconButton onClick={handleClose} sx={{ p: 1 }}>
          <CloseRounded
            sx={{ fontSize: isMobile ? '24px' : '32px', color: '#212B36' }}
          />
        </IconButton>
      </Box>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          color: '#212B36',
          fontFamily: 'DFPHeiMedium-B5',
          fontStyle: 'normal',
          lineHeight: '22px',
          textAlign: 'center',
          padding: '32px 0',
          width: '100%',
          display: 'block',
          '& span': {
            display: 'block',
            textAlign: 'center',
          },
        }}
      >
        請輸入您帳戶所用的電子郵件，我們將透過電子郵件向
        <span>您發送重設密碼的連結</span>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <TextField
          fullWidth
          placeholder="電子郵件地址*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: '341px',
            minHeight: '54px',
            borderRadius: '8px',
            border: '1px solid rgba(145, 158, 171, 0.20)',
            justifyContent: 'center',
            '& .MuiInputBase-input': {
              padding: '16px 14px',
            },
            '& .MuiInputBase-input::placeholder': {
              fontSize: '14px',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          fullWidth
          sx={{
            width: '341px',
            minHeight: '46px',
            borderRadius: '8px',
            background: '#5C443A',
            '&:hover': {
              background: '#4A3730',
            },
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#FFF' }}>
            送出
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '16px',
        }}
      >
        <Box
          onClick={handleBack}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <IconButton
            sx={{
              color: '#212B36',
              padding: '4px',
            }}
          >
            <ArrowBackIos sx={{ width: '16px', height: '16px' }} />
          </IconButton>
          <Typography
            sx={{
              fontSize: '14px',
              color: '#212B36',
            }}
          >
            返回登入
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ForgetPasswordDialog;
