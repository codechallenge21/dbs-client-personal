"use client";
import SummaryCard from "@/components/summaryCard/page";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../chat/components/Header";
import { useAudioChannel } from "@/utils/hooks/useAudioChannel";
import { useSearchParams } from "next/navigation";
import { useAudioChannels } from "@/utils/hooks/useAudioChannels";
import ChannelContentContext from "../chat/components/ChannelContentContext";
import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from "@/interfaces/entities";
import { Box, CircularProgress,  useTheme,
  useMediaQuery, } from "@mui/material";
import { AdvisorType } from "../chat/components/types";

export default function SummaryPage() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * @useSearchParams hook requires Suspense Boundary Component wrapping
   * Reference: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
   ** */
  const searchParams = useSearchParams();

  const organizationChannelId = searchParams.get("organizationChannelId") || "";
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(isMobile ? false : true);

  const [isLoadingChannel, setIsLoadingChannel] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<OrganizationChannel>();
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [isInteractingInChat, setIsInteractingInChat] =
    useState<boolean>(false);
  const [chatResponses, setChatResponses] = useState<
    OrganizationChannelMessage[]
  >([]);
  const [advisorType, setAdvisorType] = useState<AdvisorType>(AdvisorType.DEFAULT);

  const { data: channels, mutate } = useAudioChannels({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
  });

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
      channelsMutate: mutate,
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
      mutate,
      advisorType,
      setAdvisorType,
    ]
  );
  const {
    data: channel,
    mutate: mutateChannel,
    isValidating: isloadingChannelData,
  } = useAudioChannel({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
    organizationChannelId,
  });

  useEffect(() => {
    if (channel) {
      if (channel?.organizationChannelTranscriptList.length > 0) {
        setSelectedChannel(channel);
      } else {
        setTimeout(() => {
          mutateChannel();
        }, 5000);
      }
    }
  }, [channel, mutateChannel]);

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  return (
    <>
      <ChannelContentContext.Provider value={contextValue}>
        <ToolboxDrawer
          open={isOpenDrawer}
          toggleDrawer={toggleDrawer}
          channelList={channels}
        >
          <Header toggleDrawer={toggleDrawer} open={isOpenDrawer} advisor={advisorType} />
          {isloadingChannelData ||
          channel?.organizationChannelTranscriptList.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <SummaryCard />
          )}
        </ToolboxDrawer>
      </ChannelContentContext.Provider>
    </>
  );
}
