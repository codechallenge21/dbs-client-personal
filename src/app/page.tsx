'use client';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/app/chat/components/Header';
import MainContent from '@/app/chat/components/MainContent';
import SwitchDialog from '@/app/chat/components/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import ChannelContentContext from '@/app/chat/components/ChannelContentContext';
import { AdvisorType } from '@/app/chat/components/types';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const [isLoadingChannel, setIsLoadingChannel] = useState(false);
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
        <Header
          isChat
          toggleDrawer={toggleDrawer}
          open={isOpenDrawer}
          advisor={advisorType}
        />
        <MainContent />
        <SwitchDialog
          open={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </ToolbarDrawer>
    </ChannelContentContext.Provider>
  );
}
