'use client';

import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  MenuRounded,
  SettingsInputComponentRounded,
  StarBorderRounded,
} from '@mui/icons-material';
import UploadDialog from '@/components/uploadDialog/page';
import { AdvisorType } from './types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DataSourceDialog from './chatDataStore';

interface HeaderProps {
  open?: boolean;
  setIsopen?: boolean;
  advisor: AdvisorType;
  isChat?: boolean;
  toggleDrawer?: (open: boolean) => void;
  openUpload?: boolean;
  setOpenUpload?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  open,
  toggleDrawer = () => {},
  advisor,
  isChat = false,
  openUpload = false,
  setOpenUpload = () => {},
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDataSource, setOpenDataSource] = useState(false);

  const handleOpenUpload = () => {
    if (setOpenUpload) setOpenUpload(false);
  };

  return (
    <Box>
      {isMobile && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuRounded sx={{ color: 'black' }} />
          </IconButton>
          {isChat && <DropdownMenu advisor={advisor} />}
          {!isChat && (
            <IconButton onClick={() => (isChat ? null : setOpenUpload(true))}>
              <FileUploadIcon sx={{ color: 'black' }} />
            </IconButton>
          )}
        </Box>
      )}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            padding: '8px 16px',
            alignItems: 'flex-start',
            justifyContent: open ? 'space-between' : 'flex-start',
          }}
        >
          {!open && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <IconButton onClick={() => toggleDrawer(true)}>
                <MenuRounded sx={{ color: 'black' }} />
              </IconButton>

              {!isChat && (
                <IconButton
                  onClick={() => (isChat ? null : setOpenUpload(true))}
                >
                  <FileUploadIcon sx={{ color: 'black' }} />
                </IconButton>
              )}
            </Box>
          )}
          {isChat && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <DropdownMenu advisor={advisor} />
              <Box>
                <IconButton>
                  <StarBorderRounded sx={{ color: 'black', margin: '8px' }} />
                </IconButton>
                <IconButton>
                  <SettingsInputComponentRounded
                    onClick={() => setOpenDataSource(true)}
                    sx={{ color: 'black', margin: '8px' }}
                  />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {!isChat && <UploadDialog open={openUpload} onClose={handleOpenUpload} />}
      <DataSourceDialog
        open={openDataSource}
        onClose={() => setOpenDataSource(false)}
      />
    </Box>
  );
}
