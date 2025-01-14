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

  const localFiles = displayFiles.filter((file) => file.isLocal);
  const sourceFiles = displayFiles.filter((file) => !file.isLocal);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          display: 'flex',
          maxWidth: '430px',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexShrink: 0,
          alignSelf: 'stretch',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          pt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ p: 0, width: '96%' }}>
        <Typography variant="subtitle1" sx={{ px: 2, pt: 2 }}>
          本地上傳
        </Typography>
        {localFiles.map((file, index) => (
          <ListItem
            key={index}
            onClick={file.onClick}
            sx={{
              m: '8px',
              width: '100%',
              backgroundColor: '#EBE3DD',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {file.type === 'doc' ? <DescriptionIcon /> : <FileIcon />}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.875rem',
                },
              }}
            />
          </ListItem>
        ))}
        <Typography variant="subtitle1" sx={{ px: 2 }}>
          資料來源
        </Typography>
        {sourceFiles.map((file, index) => (
          <ListItem
            key={index}
            onClick={file.onClick}
            sx={{
              m: '8px',
              width: '100%',
              backgroundColor: '#EBE3DD',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {file.type === 'doc' ? <DescriptionIcon /> : <FileIcon />}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.875rem',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
