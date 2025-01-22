'use client';
import SummaryCard from '@/components/summaryCard/page';
import ToolboxDrawer from '../popular/components/ToolboxDrawer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import Header from "../chat/components/Header";
import { useAudioChannel } from '@/utils/hooks/useAudioChannel';
import { useSearchParams } from 'next/navigation';
import ChannelContentContext from '../chat/components/ChannelContentContext';
import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import { Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { AdvisorType } from '../chat/components/types';
import SummaryDetailPage from '@/components/summary-details/page';

export default function SummaryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * @useSearchParams hook requires Suspense Boundary Component wrapping
   * Reference: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
   ** */
  const searchParams = useSearchParams();

  const organizationChannelId = searchParams.get('organizationChannelId') || '';
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );
  const [isClient, setIsClient] = React.useState(false);

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

  const [openUpload, setOpenUpload] = React.useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeComponent, setActiveComponent] = useState<'card' | 'detail'>(
    'card'
  );

  const handleShowCard = () => {
    setActiveComponent('card');
  };

  const handleShowDetail = (channel: OrganizationChannel) => {
    setSelectedChannel(channel);
    setActiveComponent('detail');
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
  const {
    data: channel,
    mutate: mutateChannel,
    isValidating: isloadingChannelData,
  } = useAudioChannel({
    organizationId: '4aba77788ae94eca8d6ff330506af944',
    organizationChannelId,
  });

  useEffect(() => {
    if (channel) {
      if (channel?.organizationChannelTranscriptList.length > 0) {
        setSelectedChannel(channel);
      } else {
        timeoutRef.current = setTimeout(() => {
          mutateChannel();
        }, 5000);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [channel, mutateChannel]);

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--Primary-, #EBE3DD)',
      }}
    >
      <ChannelContentContext.Provider value={contextValue}>
        <ToolboxDrawer open={isOpenDrawer} toggleDrawer={toggleDrawer}>
          {isloadingChannelData ||
          selectedChannel?.organizationChannelTranscriptList.length === 0 ? (
            <Box
              sx={{
                top: '50%',
                left: '50%',
                display: 'flex',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              {activeComponent === 'card' && (
                <SummaryCard
                  openUpload={openUpload}
                  setOpenUpload={setOpenUpload}
                  handleShowDetail={handleShowDetail}
                />
              )}
              {activeComponent === 'detail' && (
                <SummaryDetailPage
                  handleShowCard={handleShowCard}
                  selectedChannel={selectedChannel}
                />
              )}
            </>
          )}
        </ToolboxDrawer>
      </ChannelContentContext.Provider>
    </Box>
  );
}
