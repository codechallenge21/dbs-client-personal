'use client'; // Mark this file as a client component

import React, { useState, useMemo } from 'react';
import ChannelContentContext from '@/components/channel-context-provider/ChannelContentContext';
import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import { AdvisorType } from '@/app/chat/types';

export default function ChannelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const contextValue = useMemo(
    () => ({
      isLoadingChannel,
      setIsLoadingChannel,
      selectedChannel,
      setSelectedChannel,
      selectedChannelId,
      setSelectedChannelId,
      isInteractingInChat,
      setIsInteractingInChat,
      chatResponses,
      setChatResponses,
      advisorType,
      setAdvisorType,
    }),
    [
      isLoadingChannel,
      setIsLoadingChannel,
      selectedChannel,
      setSelectedChannel,
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

  return (
    <ChannelContentContext.Provider value={contextValue}>
      {children}
    </ChannelContentContext.Provider>
  );
}
