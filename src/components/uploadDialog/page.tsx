'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
  Typography,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import apiExports from '@/utils/hooks/apis/apis';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import { useRef, useState } from 'react';
import LoadingScreen from '../loading/page';
import { CloseRounded, UploadRounded } from '@mui/icons-material';

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: UploadDialogProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { excute: createChannelByAudio, isLoading: isCreating } = useAxiosApi(
    apiExports.createChannelByAudio
  );

  const validateFile = async (file: File) => {
    try {
      const allowedFormats = [
        'audio/mpeg',
        'audio/mp4',
        'audio/mpga',
        'audio/wav',
        'audio/webm',
        'audio/x-m4a',
        'video/mp4',
      ];
      const maxFileSize = 200 * 1024 * 1024; // 200MB

      if (!allowedFormats.includes(file.type)) {
        setError(
          '不支援的檔案格式，請選擇 mp3, mp4, mpeg, mpga, m4a, wav 或 webm 格式'
        );
        return;
      }

      if (file.size > maxFileSize) {
        setError('檔案大小超過 200MB 限制');
        return;
      }

      setFile(file);
      onClose();

      const res = await createChannelByAudio({
        file,
      });

      const { data } = res;

      router.push(
        `/channel-summary?organizationChannelId=${data.organizationChannelId}`
      );
    } catch (error) {
      setError('上傳失敗');
      console.error(error);
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      validateFile(acceptedFiles[0]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0 && e.target.files?.[0]) {
      validateFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (
      fileInputRef?.current &&
      !fileInputRef.current.hasAttribute('data-clicked')
    ) {
      fileInputRef.current.setAttribute('data-clicked', 'true');
      fileInputRef.current.click();
      setTimeout(() => {
        fileInputRef?.current?.removeAttribute('data-clicked');
      }, 1000);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'audio/*': ['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm'],
    },
    maxSize: 200 * 1024 * 1024, // 100MB
  });

  const handleCloseError = () => {
    setError(null);
  };

  if (isCreating) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          bgcolor: '#fff',
          zIndex: 1300,
        }}
      >
        <LoadingScreen />
      </Box>
    );
  }

  return (
    <>
      <Dialog
        role="dialog"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            bgcolor: '#fff',
            maxWidth: '800px',
            borderRadius: '16px',
            justifyContent: 'center',
            width: isMobile ? '324px' : '780px',
            height: isMobile ? '448px' : '581px',
            m: 0,
          },
        }}
      >
        <DialogTitle
          aria-label="Dialog Title"
          sx={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 'normal',
            fontFamily: 'DFPHeiBold-B5',
            color: 'var(--Primary-Black, #212B36)',
          }}
        >
          {isMobile ? '上傳檔案' : 'AI 語音轉文字'}
          <IconButton
            role="button"
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseRounded sx={{ color: 'black' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            margin: isMobile ? '16px' : '32px',
            height: isMobile ? '352px !important' : '453px !important',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '16px',
            flexDirection: 'column',
            justifyContent: isMobile ? 'center' : 'flex-end',
            padding: isMobile ? '20px' : '160px 0px 80px 0px',
            border: '2px dashed #2196f3',
            ...(isDragActive && { backgroundColor: '#e0f7fa' }),
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {!isMobile && (
            <Typography
              sx={{
                color: 'var(--Primary-Black, #212B36)',
                fontFamily: 'DFPHeiBold-B5',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                mb: '40px',
              }}
            >
              {isDragActive
                ? '放開檔案以進行上傳'
                : '請將音訊檔案拖曳到這裡上傳'}
            </Typography>
          )}
          <Button
            role="button"
            aria-label="Upload File"
            onClick={handleClick}
            sx={{
              zIndex: 1,
              gap: '8px',
              display: 'flex',
              fontWeight: 400,
              fontSize: '16px',
              borderRadius: '8px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              padding: '11px 16px',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'DFPHeiBold-B5',
              mb: isMobile ? '32px' : '65px',
              height: isMobile ? '46px' : '46px',
              width: isMobile ? '180px' : '294px',
              color: 'var(--Info-ContrastText, #FFF)',
              background: 'var(--Secondary-Dark-Gray, #4A4A4A)',
            }}
            variant="contained"
            startIcon={<UploadRounded />}
          >
            {isMobile ? ' 選擇檔案' : '選擇檔案'}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .webm"
              style={{ display: 'none' }}
            />
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                color: 'grey.600',
                fontSize: isMobile ? 14 : 16,
                mb: 0.5,
                width: '100%',
                height: 'auto',
              }}
            >
              {isMobile
                ? '支援檔案格式：mp3, wav, m4a'
                : '支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, webm'}
            </Typography>
            <Typography
              sx={{
                color: 'grey.600',
                fontSize: isMobile ? 14 : 16,
              }}
            >
              限制大小：200MB
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={!!error} // Opens if error is set
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
