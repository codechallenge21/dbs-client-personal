'use client';

import * as React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  FilePresentRounded,
  ImageRounded,
  PictureAsPdfRounded,
  ArticleRounded,
} from '@mui/icons-material';
import { customScrollbarStyle } from '@/components/toolbar-drawer-new/ToolbarDrawer';

interface DataSourceDialogFile {
  name: string;
  type: string;
  isLocal?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface DataSourceDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  files?: DataSourceDialogFile[];
}

export default function DataSourceDialog({
  open,
  onClose,
  title = '詳細內容',
  files = [],
}: DataSourceDialogProps) {
  // If no files are provided, use these default files
  const defaultFiles: DataSourceDialogFile[] = [
    {
      name: 'LocalsIFile_name_00.text',
      type: 'text',
      isLocal: true,
      onClick: () => {},
      icon: <FilePresentRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: 'LocalsIFile_name_01.aff',
      type: 'file',
      isLocal: true,
      onClick: () => {},
      icon: <ImageRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: 'LocalsIFile_name_02.img',
      type: 'image',
      isLocal: true,
      onClick: () => {},
      icon: <ImageRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: 'LocalsIFile_name_03.pdf',
      type: 'pdf',
      isLocal: true,
      onClick: () => {},
      icon: <PictureAsPdfRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: 'LocalsIFile_name_04.tsx',
      type: 'code',
      isLocal: true,
      onClick: () => {},
      icon: <FilePresentRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: 'LocalsIFile_name_05.docx',
      type: 'code',
      isLocal: true,
      onClick: () => {},
      icon: <FilePresentRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: '技術資料01',
      type: 'doc',
      isLocal: false,
      onClick: () => {},
      icon: <ArticleRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: '技術資料02',
      type: 'doc',
      isLocal: false,
      onClick: () => {},
      icon: <ArticleRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: '技術資料03',
      type: 'doc',
      isLocal: false,
      onClick: () => {},
      icon: <ArticleRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: '技術資料04',
      type: 'doc',
      isLocal: false,
      onClick: () => {},
      icon: <ArticleRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: '技術資料05',
      type: 'doc',
      isLocal: false,
      onClick: () => {},
      icon: <ArticleRounded sx={{ color: '#212B36' }} />,
    },
    {
      name: '技術資料06',
      type: 'doc',
      isLocal: false,
      onClick: () => {},
      icon: <ArticleRounded sx={{ color: '#212B36' }} />,
    },
  ];

  const displayFiles = files.length > 0 ? files : defaultFiles;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const localFiles = displayFiles.filter((file) => file.isLocal);
  const sourceFiles = displayFiles.filter((file) => !file.isLocal);

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          display: 'flex',
          maxWidth: isMobile ? '100%' : '430px',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexShrink: 0,
          borderRadius: isMobile ? '8px 8px 0 0' : '8px',
          alignSelf: 'stretch',
          backgroundColor: '#ffffff',
          marginTop: isMobile ? '0' : '16px',
          marginRight: isMobile ? '0' : '16px',
          height: isMobile ? 'auto' : 'calc(100vh - 30px)',
          top: isMobile ? '112px' : '',
        },
      }}
      variant={isMobile ? 'temporary' : 'persistent'}
    >
      <Box
        sx={{
          width: '100%',
          pt: isMobile ? 1 : 0,
          pb: isMobile ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isMobile ? '48px' : '62px',
          pl: '8px',
          gap: '8px',
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'var(--font-bold)',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <IconButton
          role="button"
          aria-label="close"
          onClick={onClose}
          size={isMobile ? 'small' : 'medium'}
        >
          <CloseIcon sx={{ color: '#212B36' }} />
        </IconButton>
      </Box>
      <List
        sx={{
          p: '16px 12px',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          ...customScrollbarStyle,
        }}
      >
        <Typography
          variant={isMobile ? 'body2' : 'subtitle1'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'var(--font-bold)',
            fontSize: '14px',
            lineHeight: 'normal',
            fontStyle: 'normal',
            fontWeight: 400,
            pb: '8px',
          }}
        >
          本地上傳
        </Typography>
        {localFiles.map((file, index) => (
          <ListItem
            key={index}
            onClick={file.onClick}
            sx={{
              mb: '8px',
              width: 'auto',
              backgroundColor: '#EBE3DD',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
              py: '16px',
              px: '8px',
            }}
          >
            <ListItemIcon sx={{ minWidth: '0px', pr: '16px' }}>
              {file.icon}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'var(--font-bold)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                },
              }}
            />
          </ListItem>
        ))}
        <Typography
          variant={isMobile ? 'body2' : 'subtitle1'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'var(--font-bold)',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            pb: '8px',
            pt: '16px',
          }}
        >
          資料來源
        </Typography>
        {sourceFiles.map((file, index) => (
          <ListItem
            key={index}
            onClick={file.onClick}
            sx={{
              mb: '8px',
              width: 'auto',
              backgroundColor: '#EBE3DD',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
              py: '16px',
              px: '8px',
            }}
          >
            <ListItemIcon sx={{ minWidth: '0px', pr: '16px' }}>
              {file.icon}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'var(--font-bold)',
                  color: 'var(--Primary-Black, #212B36)',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
