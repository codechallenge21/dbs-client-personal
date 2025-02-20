'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  useTheme,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { CloseRounded, Google } from '@mui/icons-material';

const LoginDialog = ({ open, onClose, setIsSignupOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setEmail('');
    setPassword('');
    if (onClose) onClose();
  };

  const handleRegisterClick = () => {
    handleClose();
    setIsSignupOpen(true);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            top: '50%',
            gap: '32px',
            left: '50%',
            margin: '0px',
            width: '600px',
            height: '532px',
            borderRadius: '8px',
            position: 'absolute',
            paddingBottom: '24px',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box
        sx={{
          minHeight: '64px',
          display: 'flex',
          paddingTop: '8px',
          overflow: 'hidden',
          paddingLeft: '32px',
          paddingRight: '16px',
          paddingBottom: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            color: '#212B36',
            fontSize: '32px',
            lineHeight: '32px',
            letterSpacing: '0%',
            fontFamily: 'DFPHeiBold-B5',
            alignItems: 'center',
          }}
        >
          登入
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            width: '48px',
            height: '48px',
            padding: '8px',
            borderRadius: '50px',
          }}
        >
          <CloseRounded
            sx={{
              width: '32px',
              height: '32px',
              color: '#212B36',
            }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          gap: '24px',
          // width: '128px',
          height: '78px',
          display: 'flex',
          margin: '0px auto',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            // width: '128px',
            height: '32px',
            fontWeight: 400,
            fontSize: '32px',
            color: '#212B36',
            lineHeight: '32px',
            letterSpacing: '0%',
            fontFamily: 'DFPHeiBold-B5',
          }}
        >
          歡迎回來
        </Typography>
        <Typography
          sx={{
            // width: '124px',
            height: '22px',
            fontWeight: 400,
            fontSize: '14px',
            color: '#212B36',
            lineHeight: '22px',
            letterSpacing: '0%',
            fontFamily: 'DFPHeiMedium-B5',
          }}
        >
          還沒有帳戶嗎?{' '}
          <span
            onClick={handleRegisterClick}
            style={{
              color: '#C00',
              cursor: 'pointer',
              fontFamily: 'DFPHeiBold-B5',
            }}
          >
            註冊
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          gap: '16px',
          width: '341px',
          height: '248px',
          display: 'flex',
          margin: '0px auto',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="login-dialog-email-input"
          data-tid="login-dialog-email-input"
          sx={{
            gap: '8px',
            height: '54px',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px ',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
              padding: '16px 14px',
              borderRadius: '8px',
              '& input': {
                padding: '0px',
                borderRadius: '8px',
                '&::placeholder': {
                  color: '#919EAB',
                  opacity: 1,
                },
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
              '&:hover fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
              '&.Mui-focused fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
            },
          }}
          placeholder="電子郵件地址*"
          value={email}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setEmail(value);
          }}
        />
        <TextField
          id="login-dialog-password-input"
          data-tid="login-dialog-password-input"
          type="password"
          sx={{
            gap: '8px',
            height: '54px',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
              padding: '16px 14px',
              borderRadius: '8px',
              '& input': {
                padding: '0px',
                borderRadius: '8px',
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
              '&:hover fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
              '&.Mui-focused fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
            },
          }}
          placeholder="密碼*"
          value={password}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setPassword(value);
          }}
        />
        <Typography
          sx={{
            color: 'var(--Primary-DBS-Red, #C00)',
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: 0,
            fontFamily: 'DFPHeiBold-B5',
            fontStyle: 'normal',
            fontWeight: 400,
            cursor: 'pointer',
            width: '100%',
            textAlign: 'right',
            marginTop: '-12px',
          }}
        >
          忘記密碼?
        </Typography>
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{
            gap: '8px',
            width: '341px',
            minHeight: '46px',
            borderRadius: '8px',
            background: 'var(--Secondary-, #5C443A)',
            padding: isMobile ? '8px 16px' : '11px 12px',
            border: '1px solid var(--Secondary-, #5C443A)',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              textAlign: 'center',
              fontStyle: 'normal',
              lineHeight: 'normal',
              fontFamily: 'Open Sans',
              color: 'var(--Error-ContrastText, #FFF)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            登入
          </Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {}}
          startIcon={<Google />}
          sx={{
            gap: '8px',
            width: '341px',
            minHeight: '46px',
            borderRadius: '8px',
            padding: isMobile ? '8px 16px' : '11px 12px',
            border: '1px solid #212B36',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              color: '#212B36',
              lineHeight: '24px',
              letterSpacing: '0%',
              textTransform: 'none',
              fontFamily: 'DFPHeiMedium-B5',
            }}
          >
            使用 Google 帳號繼續
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
