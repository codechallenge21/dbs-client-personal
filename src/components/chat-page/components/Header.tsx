'use client';

import React, { useContext, useCallback } from 'react';
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
  setOpenDataSource: React.Dispatch<React.SetStateAction<boolean>>;
  openDataSource: boolean;
}

export default function Header({
  open,
  toggleDrawer = () => {},
  advisor,
  isChat = false,
  openUpload = false,
  setOpenUpload = () => {},
  setOpenDataSource,
  openDataSource,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedChannelId, selectedChannel, chatResponses } = useContext(
    ChannelContentContext
  );
  const router = useRouter();

  const handleOpenUpload = () => {
    if (setOpenUpload) setOpenUpload(false);
  };

  const memoizedToggleDrawer = useCallback(
    (open: boolean) => {
      toggleDrawer(open);
    },
    [toggleDrawer]
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: isMobile
          ? '100%'
          : open
          ? `calc(100% - 287px - ${openDataSource ? 446 : 0}px)`
          : `calc(100% - 107px - ${openDataSource ? 446 : 0}px)`,
        mt: isMobile ? 0 : '16px',
        pt: isMobile ? '16px' : 0,
        px: isMobile ? '16px' : 0,
        zIndex: 11,
        marginRight: 'auto',
        backgroundColor: 'white',
        borderRadius: isMobile ? 0 : '8px',
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => memoizedToggleDrawer(true)}>
              <MenuRounded sx={{ color: 'black' }} />
            </IconButton>
            {isChat && (
              <Box sx={{ marginLeft: '8px' }}>
                <DropdownMenu advisor={advisor} />
              </Box>
            )}
          </Box>
          {!isChat && (
            <IconButton onClick={() => (isChat ? null : setOpenUpload(true))}>
              <FileUploadIcon sx={{ color: 'black' }} />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ padding: '0px' }}>
              <StarBorderRounded sx={{ color: 'black', margin: '8px' }} />
            </IconButton>
            <IconButton
              sx={{ padding: '0px' }}
              onClick={() => setOpenDataSource(true)}
            >
              <SettingsInputComponentRounded
                sx={{ color: 'black', margin: '8px' }}
              />
            </IconButton>
          </Box>
        </Box>
      ) : (
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
              <IconButton onClick={() => memoizedToggleDrawer(true)}>
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
                <IconButton
                  sx={{ padding: '0px' }}
                  onClick={() => setOpenDataSource(true)}
                >
                  <SettingsInputComponentRounded
                    sx={{ color: 'black', margin: '8px' }}
                  />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {!isChat && <UploadDialog open={openUpload} onClose={handleOpenUpload} />}
    </Box>
  );
}
