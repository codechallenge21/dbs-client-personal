'use client';
import { SnackbarContext } from '@/context/SnackbarContext';
import { formatDate } from '@/utils/formatDate';
import { useRequireAuth } from '@/utils/hooks/useRequireAuth';
import { UploadRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useContext, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileInfo {
  organizationChannelTitle: string;
  organizationChannelCreateDate: string;
}

interface UploadScreenProps {
  handleUploadFiles: (files: File[], filesInfo: FileInfo[]) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ handleUploadFiles }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { requireAuth } = useRequireAuth();
  const { showSnackbar } = useContext(SnackbarContext);

  const FILE_CONFIG = {
    maxSize: 300 * 1024 * 1024, // 300MB
    maxFiles: 5,
    allowedFormats: [
      'audio/mpeg',
      'audio/mp4',
      'audio/mpga',
      'audio/wav',
      'audio/webm',
      'audio/x-m4a',
      'audio/vnd.dlna.adts',
      'audio/amr',
      'video/mp4',
    ],
    allowedExtensions: [
      '.mp3',
      '.m4a',
      '.wav',
      '.aac',
      '.mp4',
      '.mpeg',
      '.mpga',
      '.webm',
      '.amr',
    ],
    errorMessages: {
      invalidFormat:
        '不支援的檔案格式，請選擇 mp3, mp4, mpeg, mpga, m4a, wav, aac, webm 或 amr 格式',
      sizeExceeded: '檔案大小超過 300MB 限制',
      uploadFailed: '上傳失敗',
      maxFilesExceeded: '最多只能上傳 5 個檔案',
    },
    supportedFormats: {
      mobile: '支援檔案格式： mp3, mp4, mpeg, mpga, m4a, wav, aac, webm, amr',
      desktop: '支援檔案格式： mp3, mp4, mpeg, mpga, m4a, wav, aac, webm, amr',
    },
  };

  // Validate a single file and return its info if valid.
  const validateFile = async (
    file: File
  ): Promise<{ file: File; fileInfo: FileInfo } | null> => {
    try {
      const fileExtension = file.name.toLowerCase().split('.').pop();
      const isValidExtension = FILE_CONFIG.allowedExtensions.some(
        (ext) => ext.toLowerCase() === `.${fileExtension}`
      );
      const isValidMimeType = FILE_CONFIG.allowedFormats.includes(
        file.type as (typeof FILE_CONFIG.allowedFormats)[number]
      );

      if (!isValidExtension && !isValidMimeType) {
        showSnackbar(FILE_CONFIG.errorMessages.invalidFormat, 'error');
        return null;
      }

      if (file.size > FILE_CONFIG.maxSize) {
        showSnackbar(FILE_CONFIG.errorMessages.sizeExceeded, 'error');
        return null;
      }

      const formattedDate = formatDate();
      const fileInfo: FileInfo = {
        organizationChannelTitle: file.name.split('.')[0] || 'Unknown',
        organizationChannelCreateDate: formattedDate,
      };
      return { file, fileInfo };
    } catch (err) {
      showSnackbar(FILE_CONFIG.errorMessages.uploadFailed, 'error');
      console.error(err);
      return null;
    }
  };

  // Process an array of files, validate each and call the upload API once for valid files.
  const processFiles = async (files: File[]) => {
    // Validate file count before processing.
    if (files.length > FILE_CONFIG.maxFiles) {
      showSnackbar(FILE_CONFIG.errorMessages.maxFilesExceeded, 'error');
      return;
    }
    const validationResults = await Promise.all(
      files.map((file) => validateFile(file))
    );
    const validResults = validationResults.filter(
      (result) => result !== null
    ) as { file: File; fileInfo: FileInfo }[];

    if (validResults.length === 0) return;

    const filesToUpload = validResults.map((result) => result.file);
    const filesInfoToUpload = validResults.map((result) => result.fileInfo);
    handleUploadFiles(filesToUpload, filesInfoToUpload);
  };

  // Handle file input change.
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (files.length > FILE_CONFIG.maxFiles) {
        showSnackbar(FILE_CONFIG.errorMessages.maxFilesExceeded, 'error');
        e.target.value = '';
        return;
      }
      processFiles(files);
      e.target.value = '';
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!requireAuth()) return;
    if (
      fileInputRef.current &&
      !fileInputRef.current.hasAttribute('data-clicked')
    ) {
      fileInputRef.current.setAttribute('data-clicked', 'true');
      fileInputRef.current.click();
      setTimeout(() => {
        fileInputRef.current?.removeAttribute('data-clicked');
      }, 1000);
    }
  };

  // Handle files dropped via drag-and-drop.
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      if (acceptedFiles.length > FILE_CONFIG.maxFiles) {
        showSnackbar(FILE_CONFIG.errorMessages.maxFilesExceeded, 'error');
        return;
      }
      processFiles(acceptedFiles);
    }
  };

  const handleDropRejected = () => {
    showSnackbar('檔案格式錯誤或檔案大小超過 300MB 限制', 'error');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: { 'audio/*': FILE_CONFIG.allowedExtensions },
    maxSize: FILE_CONFIG.maxSize,
    multiple: true,
    maxFiles: FILE_CONFIG.maxFiles,
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
          {/* The dropzone input */}
          <input
            {...getInputProps({ multiple: true })}
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
          <Typography
            sx={{
              color: 'var(--Primary-Black, #212B36)',
              fontFamily: 'var(--font-bold)',
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
              fontFamily: 'var(--font-bold)',
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
            {/* Secondary hidden file input for button clicks */}
            <input
              type="file"
              multiple
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
                fontFamily: 'var(--font-bold)',
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
                fontFamily: 'var(--font-bold)',
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
