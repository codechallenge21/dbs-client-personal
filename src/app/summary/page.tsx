"use client";
import SummaryCard from "@/components/summaryCard/page";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";
import React, { useEffect, useMemo, useState, Suspense } from "react";
import Header from "../chat/components/Header";
import { useAudioChannel } from "@/utils/hooks/useAudioChannel";
import { useSearchParams } from "next/navigation";
import { useAudioChannels } from "@/utils/hooks/useAudioChannels";
import ChannelContentContext from "../chat/components/ChannelContentContext";
import { OrganizationChannel, OrganizationChannelMessage } from "@/interfaces/entities";
import { CircularProgress } from "@mui/material";
import { AdvisorType } from "../chat/components/types";

function SummaryPage() {
  /**
   * @useSearchParams hook requires Suspense Boundary Component wrapping
   * Reference: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
   ** */
  const searchParams = useSearchParams();

  const organizationChannelId = searchParams.get("organizationChannelId") || "";
  console.log("organizationChannelId", organizationChannelId);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const [isLoadingChannel, setIsLoadingChannel] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<OrganizationChannel>();
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [isInteractingInChat, setIsInteractingInChat] = useState<boolean>(false);
  const [chatResponses, setChatResponses] = useState<OrganizationChannelMessage[]>([]);
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
  const { data: channel } = useAudioChannel({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
    organizationChannelId,
  });

  useEffect(() => {
    if (channel) {
      setSelectedChannel(channel);
    }
  }, [channel]);

  console.log("channels", channel);
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
          <SummaryCard />
        </ToolboxDrawer>
      </ChannelContentContext.Provider>
    </>
  );
}

export default function SummaryPageWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <SummaryPage />
    </Suspense>
  );
}
