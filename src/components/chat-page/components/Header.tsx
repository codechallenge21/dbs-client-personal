'use client';

import React, { useState, useContext } from 'react';
import DropdownMenu from './DropdownMenu';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  HistoryRounded,
  MenuRounded,
  SettingsInputComponentRounded,
  StarBorderRounded,
} from '@mui/icons-material';
import UploadDialog from '@/components/uploadDialog/page';
import { AdvisorType } from '../../../app/chat/types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DataSourceDialog from './chatDataStore';
import ChannelContentContext from '../../channel-context-provider/ChannelContentContext';
import { useRouter } from 'next/navigation';

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
  const { selectedChannelId, selectedChannel, chatResponses } = useContext(
    ChannelContentContext
  );
  const router = useRouter();

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
            {isChat && <DropdownMenu advisor={advisor} />}
          </IconButton>
          {!isChat && (
            <IconButton onClick={() => (isChat ? null : setOpenUpload(true))}>
              <FileUploadIcon sx={{ color: 'black' }} />
            </IconButton>
          )}

          <IconButton sx={{ padding: '0px' }}>
            <StarBorderRounded sx={{ color: 'black', margin: '8px' }} />
            <SettingsInputComponentRounded
              onClick={() => setOpenDataSource(true)}
              sx={{ color: 'black', margin: '8px' }}
            />
          </IconButton>
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
                alignItems: 'center',
              }}
            >
              <DropdownMenu advisor={advisor} />
              <Box>
                <IconButton sx={{ padding: '0px' }}>
                  <StarBorderRounded sx={{ color: 'black', margin: '8px' }} />
                </IconButton>
                {selectedChannel ||
                selectedChannelId ||
                chatResponses.length ? (
                  <IconButton
                    sx={{ padding: '0px' }}
                    onClick={() => {
                      router.push('/allchat');
                    }}
                  >
                    <HistoryRounded sx={{ color: 'black', margin: '8px' }} />
                  </IconButton>
                ) : (
                  <></>
                )}
                <IconButton sx={{ padding: '0px' }}>
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
