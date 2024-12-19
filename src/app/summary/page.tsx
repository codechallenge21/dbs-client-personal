"use client";
import SummaryCard from "@/components/summaryCard/page";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";
import React, { useMemo, useState } from "react";
import Header from "../chat/components/Header";
import { useAudioChannel } from "@/utils/hooks/useAudioChannel";
import { useSearchParams } from "next/navigation";
import { useAudioChannels } from "@/utils/hooks/useAudioChannels";
import ChannelContentContext from "../chat/components/ChannelContentContext";
import { OrganizationChannel } from "@/interfaces/entities";

export default function SummaryPage() {
  const searchParams = useSearchParams();

  const organizationChannelId = searchParams.get("organizationChannelId") || "";
  const organizationChannelTitle = searchParams.get("organizationChannelTitle");
  const organizationChannelType = searchParams.get("organizationChannelType");

  console.log("organizationChannelId", organizationChannelId);
  console.log("organizationChannelTitle", organizationChannelTitle);
  console.log("organizationChannelType", organizationChannelType);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<OrganizationChannel>();

  const { data: channels } = useAudioChannels({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
  });

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      selectedChannel,
      setSelectedChannel,
    }),
    [isLoading, selectedChannel]
  );

  const { data: channel } = useAudioChannel({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
    organizationChannelId,
  });
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
          <Header
            toggleDrawer={toggleDrawer}
            open={isOpenDrawer}
            title="智能語音摘要"
          />
          <SummaryCard />
        </ToolboxDrawer>
      </ChannelContentContext.Provider>
    </>
  );
}
