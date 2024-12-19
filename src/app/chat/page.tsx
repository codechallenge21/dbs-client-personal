"use client";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SwitchDialog from "./components/SwitchDialog";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";
import { useChatChannels } from "@/utils/hooks/useChatChannels";
import { OrganizationChannel } from "@/interfaces/entities";
import ChannelContentContext from "./components/ChannelContentContext";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<OrganizationChannel>();

  const { data: channels } = useChatChannels({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
  });

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    console.log("Switched to 意外事件顧問");
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      selectedChannel,
      setSelectedChannel,
    }),
    [isLoading, selectedChannel]
  );

  return (
    <ChannelContentContext.Provider value={contextValue}>
      <ToolboxDrawer
        open={isOpenDrawer}
        toggleDrawer={toggleDrawer}
        channelList={channels}
      >
        <Header toggleDrawer={toggleDrawer} open={isOpenDrawer} title="債務事件顧問" />
        <MainContent />
        <SwitchDialog open={isOpen} onClose={handleClose} onConfirm={handleConfirm} />
      </ToolboxDrawer>
    </ChannelContentContext.Provider>
  );
}
