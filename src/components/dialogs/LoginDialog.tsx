'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  useTheme,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';
import { CloseRounded, Google } from '@mui/icons-material';

const LoginDialog = ({ open, onClose, setIsSignupOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

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
            width: '500px',
            height: '538px',
            borderRadius: '8px',
            position: 'absolute',
            paddingBottom: '24px',
            transform: 'translate(-50%, -50%)',
          },
        },
      }}
    >
      <Box
        sx={{
          height: '64px',
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
            style={{ color: 'red', cursor: 'pointer' }}
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
            borderRadius: '8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
              padding: '16px 14px',
              '& input': {
                padding: '0px',
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
              '& input': {
                padding: '0px',
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
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{
            gap: '8px',
            width: '341px',
            height: '46px',
            paddingTop: '11px',
            borderRadius: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingBottom: '11px',
            background: 'var(--Secondary-, #5C443A)',
            padding: isMobile ? '8px 16px' : '6px 12px',
            border: '1px solid var(--Secondary-, #5C443A)',
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
            }}
          >
            確認
          </Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {}}
          startIcon={<Google />}
          sx={{
            gap: '8px',
            width: '341px',
            height: '46px',
            paddingTop: '11px',
            borderRadius: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingBottom: '11px',
            border: '1px solid #212B36',
            padding: isMobile ? '8px 16px' : '6px 12px',
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
      <FormControlLabel
        sx={{ margin: '0px auto' }}
        control={
          <Checkbox
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
        }
        label={
          <Typography variant="body2">
            我同意{' '}
            <Typography component="span" color="blue">
              《服務條款》
            </Typography>
            、
            <Typography component="span" color="blue">
              《隱私政策》
            </Typography>{' '}
            和
            <Typography component="span" color="blue">
              《Cookie 政策》
            </Typography>
          </Typography>
        }
      />
    </Dialog>
  );
};

export default LoginDialog;
