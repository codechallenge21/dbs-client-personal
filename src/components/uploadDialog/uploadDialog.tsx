'use client';

import { SnackbarContext } from '@/context/SnackbarContext';
import { formatDate } from '@/utils/formatDate';
import { useRequireAuth } from '@/utils/hooks/useRequireAuth';
import { CloseRounded, UploadRounded } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useContext, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

// File Upload Configuration
export const FILE_CONFIG = {
  maxSize: 200 * 1024 * 1024, // 200MB
  allowedFormats: [
    'audio/mpeg',
    'audio/mp4',
    'audio/mpga',
    'audio/wav',
    'audio/webm',
    'audio/x-m4a',
    'audio/vnd.dlna.adts', // 'audio/aac',
    'audio/amr',
    'video/mp4',
  ] as const,
  allowedExtensions: [
    '.mp3',
    '.mp4',
    '.mpeg',
    '.mpga',
    '.m4a',
    '.wav',
    '.aac',
    '.webm',
    '.amr',
  ] as const,
  errorMessages: {
    invalidFormat:
      '不支援的檔案格式，請選擇 mp3, mp4, mpeg, mpga, m4a, wav, aac, webm 或 amr 格式',
    sizeExceeded: '檔案大小超過 200MB 限制',
    uploadFailed: '上傳失敗',
  },
  supportedFormats: {
    mobile: '支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, aac, webm, amr',
    desktop: '支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, aac, webm, amr',
  },
} as const;

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  handleUploadFile: (
    file: File,
    fileInfo: {
      organizationChannelTitle: string;
      organizationChannelCreateDate: string;
    }
  ) => void;
}

export default function UploadDialog({
  open,
  onClose,
  handleUploadFile,
}: UploadDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { requireAuth } = useRequireAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useContext(SnackbarContext);

  const validateFile = async (file: File) => {
    try {
      // Check if the file extension matches any of our allowed extensions
      const fileExtension = file.name.toLowerCase().split('.').pop();
      const isValidExtension = FILE_CONFIG.allowedExtensions.some(ext => 
        ext.toLowerCase() === `.${fileExtension}`
      );
      
      // Check for valid MIME type
      const isValidMimeType = FILE_CONFIG.allowedFormats.includes(
        file.type as (typeof FILE_CONFIG.allowedFormats)[number]
      );
      
      // Accept if either the extension or MIME type is valid
      if (!isValidExtension && !isValidMimeType) {
        showSnackbar(FILE_CONFIG.errorMessages.invalidFormat, 'error');
        return;
      }

      if (file.size > FILE_CONFIG.maxSize) {
        showSnackbar(FILE_CONFIG.errorMessages.sizeExceeded, 'error');
        return;
      }
      
      // Use the formatDate utility function for consistent date formatting
      const formattedDate = formatDate();

      // Create header info with filename as name and current timestamp
      const fileInfo = {
        organizationChannelTitle: file.name.split('.')[0] || 'Unknown', // Remove file extension
        organizationChannelCreateDate: formattedDate,
      };
      onClose();
      handleUploadFile(file, fileInfo);
    } catch (error) {
      showSnackbar(FILE_CONFIG.errorMessages.uploadFailed, 'error');
      console.error(error);
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles[0]) {
      validateFile(acceptedFiles[0]);
    }
  };

  const handleDropRejected = (fileRejections: any[]) => {
    showSnackbar('檔案格式錯誤或檔案大小超過 200MB 限制', 'error');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: {
      'audio/*': FILE_CONFIG.allowedExtensions,
    },
    maxSize: FILE_CONFIG.maxSize,
  });

  return (
    <>
      <Dialog
        role="dialog"
        open={open}
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
            fontFamily: 'var(--font-bold)',
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
                fontFamily: 'var(--font-bold)',
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
              fontFamily: 'var(--font-bold)',
              mb: isMobile ? '32px' : '65px',
              height: isMobile ? '46px' : '46px',
              width: isMobile ? '180px' : '294px',
              color: 'var(--Info-ContrastText, #FFF)',
              background: 'var(--Secondary-Dark-Gray, #5C443A)',
            }}
            variant="contained"
            startIcon={<UploadRounded />}
          >
            {isMobile ? '選擇檔案' : '選擇檔案'}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept={FILE_CONFIG.allowedExtensions.join(',')}
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
                ? FILE_CONFIG.supportedFormats.mobile
                : FILE_CONFIG.supportedFormats.desktop}
            </Typography>
            <Typography
              sx={{
                color: 'grey.600',
                fontSize: isMobile ? 14 : 16,
              }}
            >
              限制大小：{FILE_CONFIG.maxSize / (1024 * 1024)}MB
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
