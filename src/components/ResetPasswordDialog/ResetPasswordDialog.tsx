'use client';

import { useLoginContext } from '@/context/LoginContext';
import { SnackbarContext } from '@/context/SnackbarContext';
import apis from '@/utils/hooks/apis/apis';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import { CloseRounded } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
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
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

interface ResetPasswordDialogProps {
  token: string | null;
  open: boolean;
  onClose: () => void;
}

export default function ResetPasswordDialog({
  token,
  open,
  onClose,
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { showSnackbar } = useContext(SnackbarContext);
  const router = useRouter();

  const { excute: resetPassword } = useAxiosApi(apis.resetPassword);
  const { setIsLoginOpen } = useLoginContext();

  useEffect(() => {
    if (open) {
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError(false);
    }
  }, [open]);

  // Check for password match when confirmPassword changes
  useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [confirmPassword, newPassword]);

  // Example of your custom axios hook
  //   const { excute: resetPassword } = useAxiosApi(apis.resetPassword);

  const handleSubmit = async () => {
    if (!token) {
      showSnackbar('無效的重設連結或 Token。', 'error');
      return;
    }
    if (!newPassword || !confirmPassword) {
      showSnackbar('請填寫所有欄位。', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      showSnackbar('請輸入相同的新密碼。', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      // Call the API with the required request body
      // {
      //   "emailTokenId": token,
      //   "organizationUserPassword": newPassword
      // }
      const response = await resetPassword({
        emailTokenId: token,
        organizationUserPassword: newPassword,
      });

      if (response.status === 200) {
        // Success
        showSnackbar('密碼重設成功！請重新登入。', 'success');
        onClose();
        router.push('/');
        setIsLoginOpen(true);
      } else if (response.status === 400 || response.status === 404) {
        // Token expired/invalid
        showSnackbar('重設連結已失效或無效，請重新申請。', 'error');
      } else {
        // Fallback
        showSnackbar('重設失敗，請稍後再試。', 'error');
      }
    } catch (error: any) {
      // For any network/other errors
      showSnackbar('重設失敗，請稍後再試。', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '8px',
          width: isMobile ? '100%' : '405px',
          maxWidth: isMobile ? '100%' : '405px',
          boxShadow: 'none',
          height: isMobile ? 'auto' : '314px',
          overflow: 'hidden',
          paddingBottom: '16px',
          margin: isMobile ? 0 : 'auto',
        },
      }}
    >
      <Box position="relative">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: isMobile ? '56px' : '64px',
            padding: isMobile ? '8px 16px' : '8px 16px 8px 32px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              color: '#212B36',
              fontSize: isMobile ? '24px' : '32px',
              fontStyle: 'normal',
              lineHeight: isMobile ? '36px' : '48px',
              fontFamily: 'var(--font-bold)',
            }}
          >
            重設密碼
          </Typography>
          <IconButton onClick={handleClose} sx={{ p: 1 }}>
            <CloseRounded
              sx={{ fontSize: isMobile ? '24px' : '32px', color: '#212B36' }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{
            paddingTop: '16px',
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            margin="dense"
            label="新密碼*"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              marginBottom: '32px',
              width: isMobile ? 'calc(100% - 32px)' : '341px',
              height: '54px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '16px',
                '& fieldset': {
                  borderColor: 'rgba(145, 158, 171, 0.20)',
                },
                '&:hover fieldset': {
                  borderColor: '#637381',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0066cc',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#637381',
                '&.Mui-focused': {
                  color: '#0066cc',
                },
              },
              '& .MuiInputBase-input': {
                padding: '16px 14px',
              },
              '& .MuiInputBase-input::placeholder': {
                fontSize: '14px',
              },
            }}
          />

          <TextField
            margin="dense"
            label="確認密碼*"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordError}
            sx={{
              width: isMobile ? 'calc(100% - 32px)' : '341px',
              height: '54px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '16px',
                '& fieldset': {
                  borderColor: passwordError
                    ? '#cc0000'
                    : 'rgba(145, 158, 171, 0.20)',
                },
                '&:hover fieldset': {
                  borderColor: passwordError ? '#cc0000' : '#637381',
                },
                '&.Mui-focused fieldset': {
                  borderColor: passwordError ? '#cc0000' : '#0066cc',
                },
                '&.Mui-error fieldset': {
                  borderColor: '#cc0000',
                },
              },
              '& .MuiInputLabel-root': {
                color: passwordError ? '#cc0000' : '#637381',
                fontSize: '16px',
                '&.Mui-focused': {
                  color: passwordError ? '#cc0000' : '#0066cc',
                },
                '&.Mui-error': {
                  color: '#cc0000',
                },
              },
              '& .MuiInputBase-input': {
                padding: '16px 14px',
              },
              '& .MuiInputBase-input::placeholder': {
                fontSize: '14px',
              },
            }}
          />
        </Box>

        {passwordError && (
          <Box
            sx={{
              color: '#cc0000',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: isMobile ? '16px' : '40px',
              width: isMobile ? 'calc(100% - 32px)' : '341px',
              gap: '4px',
              marginTop: '4px',
            }}
          >
            <ErrorIcon sx={{ width: '16px', height: '16px' }} />
            <Typography sx={{ fontSize: '12px', color: '#cc0000' }}>
              請輸入相同的新密碼
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            justifyContent: 'end',
            gap: '10px',
            width: '100%',
            display: 'flex',
            marginTop: passwordError ? '4px' : '22px',
            padding: isMobile ? '0px 16px 16px' : '0px 24px 16px 32px',
          }}
        >
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              borderRadius: '8px',
              minWidth: '52px',
              height: '36px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'none',
              color: '#212b36',
              backgroundColor: '#ffffff',
              padding: '6px 8px',
              border: '1px solid #919eab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#637381',
              },
            }}
          >
            返回
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting || passwordError || !newPassword || !confirmPassword
            }
            sx={{
              borderRadius: '8px',
              minWidth: '52px',
              height: '36px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'none',
              color: '#ffffff',
              padding: '6px 8px',
              backgroundColor: '#212b36',
              '&:hover': {
                backgroundColor: '#000000',
              },
              '&.Mui-disabled': {
                backgroundColor: '#919eab',
                color: '#ffffff',
              },
            }}
          >
            儲存
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
