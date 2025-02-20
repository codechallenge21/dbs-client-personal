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
  InputAdornment,
} from '@mui/material';
import { CloseRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import GoogleIcon from '../../assets/google.png';

const SignupDialog = ({ open, onClose, setIsLoginOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    if (onClose) onClose();
  };

  const handleLoginClick = () => {
    handleClose();
    setIsLoginOpen(true);
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
            height: '696px',
            borderRadius: '8px',
            position: 'absolute',
            paddingBottom: '24px',
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto',
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
          },
        },
      }}
    >
      <Box
        sx={{
          height: '64px',
          display: 'flex',
          paddingTop: '8px',
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
          註冊
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
          建立帳戶
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
          已經擁有帳戶?{' '}
          <span
            onClick={handleLoginClick}
            style={{
              color: '#C00',
              cursor: 'pointer',
              fontFamily: 'DFPHeiBold-B5',
            }}
          >
            登入
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          gap: '16px',
          width: '341px',
          height: '388px',
          display: 'flex',
          margin: '0px auto',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="signup-dialog-name-input"
          data-tid="signup-dialog-name-input"
          sx={{
            gap: '8px',
            minHeight: '54px',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px ',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
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
          placeholder="使用者名稱*"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setName(value);
          }}
        />
        <TextField
          id="signup-dialog-email-input"
          data-tid="signup-dialog-email-input"
          sx={{
            gap: '8px',
            minHeight: '54px',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px ',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
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
          id="signup-dialog-password-input"
          data-tid="signup-dialog-password-input"
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
            borderRadius: '8px ',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
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
        <TextField
          id="signup-dialog-confirm-password-input"
          data-tid="signup-dialog-confirm-password-input"
          type={showPassword2 ? 'text' : 'password'}
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
                      showPassword2 ? 'Hide password' : 'Show password'
                    }
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
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
            borderRadius: '8px ',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '341px',
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
          placeholder="確認密碼*"
          value={confirmPassword}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setConfirmPassword(value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{
            gap: '8px',
            width: '341px',
            height: '46px',
            borderRadius: '8px',
            background: 'var(--Secondary-, #5C443A)',
            padding: isMobile ? '8px 16px' : '11px 12px',
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
            註冊
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
            width: '341px',
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
      <FormControlLabel
        sx={{
          margin: '0px auto',
          width: '366px',
          height: '28px',
          alignItems: 'center',
          display: 'flex',
        }}
        control={
          <Checkbox
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            sx={{
              width: '24px',
              height: '24px',
              padding: '3px',
              '& .MuiSvgIcon-root': {
                fontSize: '18px',
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{ fontFamily: 'DFPHeiMedium-B5', fontSize: '14px' }}
          >
            我同意{' '}
            <Typography
              component="span"
              color="#06C"
              sx={{ fontFamily: 'DFPHeiMedium-B5', fontSize: '14px' }}
            >
              《服務條款》
            </Typography>
            、
            <Typography
              component="span"
              color="#06C"
              sx={{ fontFamily: 'DFPHeiMedium-B5', fontSize: '14px' }}
            >
              《隱私政策》
            </Typography>{' '}
            和
            <Typography
              component="span"
              color="#06C"
              sx={{ fontFamily: 'DFPHeiMedium-B5', fontSize: '14px' }}
            >
              《Cookie 政策》
            </Typography>
          </Typography>
        }
      />
    </Dialog>
  );
};

export default SignupDialog;
