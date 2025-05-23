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
  maxSize: 300 * 1024 * 1024, // 300MB
  maxFiles: 5,
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
    sizeExceeded: '檔案大小超過 300MB 限制',
    uploadFailed: '上傳失敗',
    maxFilesExceeded: '最多只能上傳 5 個檔案',
  },
  supportedFormats: {
    mobile: '支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, aac, webm, amr',
    desktop: '支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, aac, webm, amr',
  },
} as const;

interface FileInfo {
  organizationChannelTitle: string;
  organizationChannelCreateDate: string;
}

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  handleUploadFiles: (files: File[], filesInfo: FileInfo[]) => void;
}

export default function UploadDialog({
  open,
  onClose,
  handleUploadFiles,
}: UploadDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { requireAuth } = useRequireAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useContext(SnackbarContext);

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
    } catch (error) {
      showSnackbar(FILE_CONFIG.errorMessages.uploadFailed, 'error');
      console.error(error);
      return null;
    }
  };

  // Process an array of files, validate each and call the upload API once for valid files.
  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > FILE_CONFIG.maxFiles) {
      showSnackbar(FILE_CONFIG.errorMessages.maxFilesExceeded, 'error');
      return;
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      const results = await Promise.all(acceptedFiles.map(validateFile));
      const validResults = results.filter(Boolean) as {
        file: File;
        fileInfo: FileInfo;
      }[];
      if (validResults.length > 0) {
        onClose();
        handleUploadFiles(
          validResults.map((r) => r.file),
          validResults.map((r) => r.fileInfo)
        );
      }
    }
  };

  // Handle rejected drops (e.g., too many files or invalid file)
  const handleDropRejected = (fileRejections: any[]) => {
    const tooManyFiles = fileRejections.some((rejection: any) =>
      rejection.errors.some((err: any) => err.code === 'too-many-files')
    );
    if (tooManyFiles) {
      showSnackbar(FILE_CONFIG.errorMessages.maxFilesExceeded, 'error');
    } else {
      showSnackbar('檔案格式錯誤或檔案大小超過 300MB 限制', 'error');
    }
  };

  // Process file(s) selected via file input.
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (files.length > FILE_CONFIG.maxFiles) {
        showSnackbar(FILE_CONFIG.errorMessages.maxFilesExceeded, 'error');
        e.target.value = '';
        return;
      }
      const results = await Promise.all(files.map(validateFile));
      const validResults = results.filter(Boolean) as {
        file: File;
        fileInfo: FileInfo;
      }[];
      if (validResults.length > 0) {
        onClose();
        handleUploadFiles(
          validResults.map((r) => r.file),
          validResults.map((r) => r.fileInfo)
        );
      }
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: { 'audio/*': FILE_CONFIG.allowedExtensions },
    maxSize: FILE_CONFIG.maxSize,
    maxFiles: FILE_CONFIG.maxFiles,
    multiple: true,
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
            fontFamily: 'var(--font-bold)',
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
            fontFamily: 'var(--font-bold)',
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
          
          {/* Audio quality notice with emojis */}
          <Typography
            sx={{
              color: '#CC0000',
              fontFamily: 'var(--font-medium)',
              fontSize: isMobile ? '14px' : '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              mb: isMobile ? '16px' : '24px',
              textAlign: 'center',
              maxWidth: isMobile ? '280px' : '500px',
            }}
          >
            ☝️ 為了提高語音轉文字的準確度，請確保音檔清晰 ☝️
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
            {/* Hidden file input for button clicks */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept={FILE_CONFIG.allowedExtensions.join(',')}
              multiple
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
        </DialogContent>
      </Dialog>
    </>
  );
}
