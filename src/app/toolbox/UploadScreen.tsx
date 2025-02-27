'use client';
import { UploadRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import React, { useRef, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { SnackbarContext } from '@/context/SnackbarContext';
import { useRequireAuth } from '@/utils/hooks/useRequireAuth';

interface UploadScreenProps {
  handleUploadFile: (
    file: File,
    fileInfo: {
      organizationChannelTitle: string;
      organizationChannelCreateDate: string;
    }
  ) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ handleUploadFile }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { requireAuth } = useRequireAuth();
  const { showSnackbar } = useContext(SnackbarContext);

  const FILE_CONFIG = {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedFormats: [
      'audio/mpeg',
      'audio/mp4',
      'audio/mpga',
      'audio/wav',
      'audio/webm',
      'audio/x-m4a',
      'audio/vnd.dlna.adts',
      'video/mp4',
    ],
    allowedExtensions: ['.mp3', '.m4a', '.wav', '.aac'],
    errorMessages: {
      invalidFormat:
        '不支援的檔案格式，請選擇 mp3, mp4, mpeg, mpga, m4a, wav, aac 或 webm 格式',
      sizeExceeded: '檔案大小超過 100MB 限制',
      uploadFailed: '上傳失敗',
    },
    supportedFormats: {
      mobile: '支援檔案格式：.mp3, .m4a, .wav, .aac',
      desktop: '支援檔案格式：.mp3, .m4a, .wav, .aac',
    },
  };

  const validateFile = async (file: File) => {
    try {
      if (
        !FILE_CONFIG.allowedFormats.includes(
          file.type as (typeof FILE_CONFIG.allowedFormats)[number]
        )
      ) {
        showSnackbar(FILE_CONFIG.errorMessages.invalidFormat, 'error');
        return;
      }

      if (file.size > FILE_CONFIG.maxSize) {
        showSnackbar(FILE_CONFIG.errorMessages.sizeExceeded, 'error');
        return;
      }

      // Generate current timestamp
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${now.getFullYear()}, ${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
        .getSeconds()
        .toString()
        .padStart(2, '0')} ${now.getHours() >= 12 ? 'pm' : 'am'}`;

      // Create header info with filename as name and current timestamp
      const fileInfo = {
        organizationChannelTitle: file.name.split('.')[0] || 'Unknown', // Remove file extension
        organizationChannelCreateDate: formattedDate,
      };
      handleUploadFile(file, fileInfo);
    } catch (err) {
      showSnackbar(FILE_CONFIG.errorMessages.uploadFailed, 'error');
      console.error(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (e.target.files && e.target.files.length > 0 && e.target.files[0]) {
      validateFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!requireAuth()) return;
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

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles[0]) {
      validateFile(acceptedFiles[0]);
    }
  };

  const handleDropRejected = () => {
    showSnackbar('檔案格式錯誤或檔案大小超過 100MB 限制', 'error');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: { 'audio/*': FILE_CONFIG.allowedExtensions },
    maxSize: FILE_CONFIG.maxSize,
  });

  return (
    <Container
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'start' : 'center',
        alignItems: 'center',
        height: 'calc(100vh - 230px)',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: isMobile ? '343px' : '564px',
          height: isMobile ? '548px' : '453px',
          bgcolor: '#fff',
          border: '2px dashed #5C443A',
          borderRadius: '16px',
          ...(isDragActive && { backgroundColor: '#e0f7fa' }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '160px',
            paddingBottom: '80px',
            width: '100%',
            height: '253px',
          }}
        >
          <input
            {...getInputProps()}
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
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
            {isMobile ? '請上傳音訊檔案' : '請將音訊檔案拖曳到這裡上傳'}
          </Typography>

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
              mb: '65px',
              minHeight: '46px',
              width: '294px',
              color: 'var(--Info-ContrastText, #FFF)',
              background: 'var(--Secondary-Dark-Gray, #5C443A)',
              '& .MuiButton-startIcon': {
                '& svg': {
                  width: '24px',
                  height: '24px',
                },
                margin: '0px',
              },
            }}
            variant="contained"
            startIcon={<UploadRounded />}
          >
            上傳檔案
            <input
              type="file"
              onChange={handleFileUpload}
              accept={FILE_CONFIG.allowedExtensions.join(',')}
              style={{ display: 'none' }}
            />
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                color: '#9B9B9B',
                fontSize: isMobile ? 14 : 16,
                fontFamily: 'DFPHeiBold-B5',
                fontStyle: 'normal',
                fontWeight: 400,
                mb: 0.5,
                width: '100%',
                height: 'auto',
              }}
            >
              {isMobile
                ? FILE_CONFIG.supportedFormats.mobile
                : FILE_CONFIG.supportedFormats.desktop}
            </Typography>
            <Typography
              sx={{
                color: '#9B9B9B',
                fontSize: isMobile ? 14 : 16,
                fontFamily: 'DFPHeiBold-B5',
                fontStyle: 'normal',
                fontWeight: 400,
                width: '100%',
                height: 'auto',
              }}
            >
              限制大小：{FILE_CONFIG.maxSize / (1024 * 1024)}MB
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UploadScreen;
