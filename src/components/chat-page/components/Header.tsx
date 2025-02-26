'use client';

import React, { useContext, useCallback, memo, useMemo } from 'react';
import DropdownMenu from './DropdownMenu';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  MenuRounded,
  HistoryRounded,
  StarBorderRounded,
  SettingsInputComponentRounded,
} from '@mui/icons-material';
import { AdvisorType } from '../../../app/chat/types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ChannelContentContext from '@/context/ChannelContentContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  open: boolean;
  setIsopen?: (isOpen: boolean) => void;
  advisor: AdvisorType;
  isChat?: boolean;
  setIsOpenDrawer?: (open: boolean) => void;
  openUpload?: boolean;
  setOpenUpload?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDataSource: React.Dispatch<React.SetStateAction<boolean>>;
  openDataSource: boolean;
}

const Header: React.FC<HeaderProps> = ({
  open,
  setIsOpenDrawer = () => {},
  advisor,
  isChat = false,
  setOpenUpload = () => {},
  setOpenDataSource,
  openDataSource,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedChannelId, selectedChannel, chatResponses } = useContext(
    ChannelContentContext
  );
  const router = useRouter();

  const memoizedToggleDrawer = useCallback(
    (drawerOpen: boolean) => {
      setIsOpenDrawer(drawerOpen);
    },
    [setIsOpenDrawer]
  );

  const headerWidth = useMemo(() => {
    if (isMobile) return '100%';
    return open
      ? `calc(100% - 287px - ${openDataSource ? 446 : 0}px)`
      : `calc(100% - 107px - ${openDataSource ? 446 : 0}px)`;
  }, [isMobile, open, openDataSource]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: headerWidth,
        mt: isMobile ? 0 : '16px',
        py: isMobile ? '8px' : 0,
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
            <IconButton
              role="button"
              aria-label="Menu"
              onClick={() => memoizedToggleDrawer(true)}
            >
              <MenuRounded sx={{ color: '#212B36' }} />
            </IconButton>
            {isChat && <DropdownMenu advisor={advisor} />}
          </Box>
          {!isChat && (
            <IconButton
              role="button"
              aria-label="File Upload"
              onClick={() => setOpenUpload(true)}
            >
              <FileUploadIcon sx={{ color: '#212B36' }} />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              role="button"
              aria-label="Add Favorite"
              sx={{ padding: '0px' }}
            >
              <StarBorderRounded sx={{ color: '#212B36', margin: '8px' }} />
            </IconButton>
            <IconButton
              role="button"
              aria-label="Data Source"
              sx={{ padding: '0px' }}
              onClick={() => setOpenDataSource(true)}
            >
              <SettingsInputComponentRounded
                sx={{ color: '#212B36', margin: '8px' }}
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
              {!isChat && (
                <IconButton
                  role="button"
                  aria-label="File Upload"
                  onClick={() => setOpenUpload(true)}
                >
                  <FileUploadIcon sx={{ color: '#212B36' }} />
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
                <IconButton
                  role="button"
                  aria-label="Add Favorite"
                  sx={{ padding: '0px' }}
                >
                  <StarBorderRounded sx={{ color: '#212B36', margin: '8px' }} />
                </IconButton>
                {selectedChannel ||
                selectedChannelId ||
                chatResponses.length ? (
                  <IconButton
                    role="button"
                    aria-label="All Chats"
                    sx={{ padding: '0px' }}
                    onClick={() => router.push('/allchat')}
                  >
                    <HistoryRounded sx={{ color: '#212B36', margin: '8px' }} />
                  </IconButton>
                ) : null}
                <IconButton
                  role="button"
                  aria-label="Data Source"
                  sx={{ padding: '0px' }}
                  onClick={() => setOpenDataSource(true)}
                >
                  <SettingsInputComponentRounded
                    sx={{ color: '#212B36', margin: '8px' }}
                  />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(Header);
