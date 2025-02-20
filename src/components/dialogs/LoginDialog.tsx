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
  InputAdornment,
} from '@mui/material';
import { CloseRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '../../assets/google.png';
import Image from 'next/image';

const LoginDialog = ({ open, onClose, setIsSignupOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
            gap: isMobile ? '16px' : '32px',
            left: '50%',
            margin: '0px',
            width: isMobile ? '324px' : '600px',
            height: isMobile ? '540px' : '532px',
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
          paddingLeft: isMobile ? '16px' : '32px',
          paddingRight: isMobile ? '8px' : '16px',
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
          minHeight: isMobile ? '84px' : '78px',
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
            minHeight: isMobile ? '36px' : '32px',
            fontWeight: 400,
            fontSize: isMobile ? '24px' : '32px',
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
            minHeight: '22px',
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
          minHeight: '276px',
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
            minHeight: '54px',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px ',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: isMobile ? '276px' : '341px',
              padding: '16px 14px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-input': {
                padding: '0px',
                borderRadius: '8px',
                fontSize: '14px !important',

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
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    cursor: 'pointer',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            gap: '8px',
            minHeight: '54px',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: isMobile ? '276px' : '341px',
              padding: '16px 14px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-input': {
                padding: '0px',
                borderRadius: '8px',
                fontSize: '14px !important',

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
            width: isMobile ? '80%' : '100%',
            minHeight: '24px',
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
            width: isMobile ? '276px' : '341px',
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
          startIcon={
            <Image src={GoogleIcon} alt="Google" width={24} height={24} />
          }
          sx={{
            gap: '8px',
            width: isMobile ? '276px' : '341px',
            minHeight: '46px',
            borderRadius: '8px',
            padding: isMobile ? '8px 16px' : '11px 12px',
            border: '1px solid #212B36',
            justifyContent: 'center',
            alignItems: 'center',

            '& .MuiButton-startIcon': {
              margin: '0px !important',
            },
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
