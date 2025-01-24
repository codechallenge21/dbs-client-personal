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
  Description as DescriptionIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface DataSourceDialogFile {
  name: string;
  type: string;
  isLocal?: boolean;
  onClick?: () => void;
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
  title = '詳細内容',
  files = [],
}: DataSourceDialogProps) {
  // If no files are provided, use these default files
  const defaultFiles: DataSourceDialogFile[] = [
    {
      name: 'LocalsIFile_name_00.text',
      type: 'text',
      isLocal: true,
      onClick: () => console.log('clicked'),
    },
    {
      name: 'LocalsIFile_name_01.aff',
      type: 'file',
      isLocal: true,
      onClick: () => console.log('clicked'),
    },
    {
      name: 'LocalsIFile_name_02.img',
      type: 'image',
      isLocal: true,
      onClick: () => console.log('clicked'),
    },
    {
      name: 'LocalsIFile_name_03.pdf',
      type: 'pdf',
      isLocal: true,
      onClick: () => console.log('clicked'),
    },
    {
      name: 'LocalsIFile_name_04.tsx',
      type: 'code',
      isLocal: true,
      onClick: () => console.log('clicked'),
    },
    {
      name: 'LocalsIFile_name_05.docx',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
    {
      name: '技術資料01',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
    {
      name: '技術資料02',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
    {
      name: '技術資料03',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
    {
      name: '技術資料04',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
    {
      name: '技術資料05',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
    {
      name: '技術資料06',
      type: 'doc',
      isLocal: false,
      onClick: () => console.log('clicked'),
    },
  ];

  const displayFiles = files.length > 0 ? files : defaultFiles;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          top: isMobile ? '112px' : '',
          borderRadius: isMobile ? '8px 8px 0 0' : '8px',
          alignSelf: 'stretch',
          backgroundColor: '#ffffff',
          marginTop: isMobile ? '0' : '16px',
          marginRight: isMobile ? '0' : '16px',
          height: isMobile ? 'auto' : 'calc(100vh - 32px)',
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
          pr: '4px',
          gap: '8px',
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'DFPHeiBold-B5',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={onClose} size={isMobile ? 'small' : 'medium'}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List
        sx={{
          p: '16px 12px',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
        }}
      >
        <Typography
          variant={isMobile ? 'body2' : 'subtitle1'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'DFPHeiBold-B5',
            fontSize: '14px',
            lineHeight: 'normal',
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
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
              py: isMobile ? 0.75 : 1,
            }}
          >
            <ListItemIcon sx={{ minWidth: isMobile ? 32 : 36 }}>
              {file.type === 'doc' ? (
                <DescriptionIcon fontSize={isMobile ? 'small' : 'medium'} />
              ) : (
                <FileIcon fontSize={isMobile ? 'small' : 'medium'} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: isMobile ? '0.813rem' : '0.875rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
            />
          </ListItem>
        ))}
        <Typography
          variant={isMobile ? 'body2' : 'subtitle1'}
          sx={{
            pt: 2,
            pb: 1,
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
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
              py: isMobile ? 0.75 : 1,
            }}
          >
            <ListItemIcon sx={{ minWidth: isMobile ? 32 : 36 }}>
              {file.type === 'doc' ? (
                <DescriptionIcon fontSize={isMobile ? 'small' : 'medium'} />
              ) : (
                <FileIcon fontSize={isMobile ? 'small' : 'medium'} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: isMobile ? '0.813rem' : '0.875rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
