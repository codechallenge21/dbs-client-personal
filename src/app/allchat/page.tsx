'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import ChannelSearch from './ViewAllHistory';
import { AdvisorType } from '../chat/components/types';
import ChannelContentContext from '../chat/components/ChannelContentContext';
import Header from './components/Header';
import SwitchDialog from '../chat/components/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box } from '@mui/material';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);

  const [isLoadingChannel, setIsLoadingChannel] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<OrganizationChannel>();
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [isInteractingInChat, setIsInteractingInChat] =
    useState<boolean>(false);
  const [chatResponses, setChatResponses] = useState<
    OrganizationChannelMessage[]
  >([]);
  const [advisorType, setAdvisorType] = useState<AdvisorType>(
    AdvisorType.DEFAULT
  );

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  const contextValue = useMemo(
    () => ({
      isLoadingChannel,
      setIsLoadingChannel,
      selectedChannel,
      setSelectedChannel,
      isInteractingInChat,
      selectedChannelId,
      setSelectedChannelId,
      setIsInteractingInChat,
      chatResponses,
      setChatResponses,
      advisorType,
      setAdvisorType,
    }),
    [
      isLoadingChannel,
      selectedChannel,
      selectedChannelId,
      setSelectedChannelId,
      isInteractingInChat,
      setIsInteractingInChat,
      chatResponses,
      setChatResponses,
      advisorType,
      setAdvisorType,
    ]
  );

  useEffect(() => {
    if (selectedChannel)
      setSelectedChannelId(selectedChannel?.organizationChannelId);
    else setSelectedChannelId(undefined);
  }, [selectedChannel]);

  return (
    <ChannelContentContext.Provider value={contextValue}>
      <ToolbarDrawer open={isOpenDrawer} toggleDrawer={toggleDrawer}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 32px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
          }}
        >
          <Header />
          <ChannelSearch />
          <SwitchDialog
            open={isOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        </Box>
      </ToolbarDrawer>
    </ChannelContentContext.Provider>
  );
}
