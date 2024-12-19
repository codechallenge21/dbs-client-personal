"use client";
import { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SwitchDialog from "./components/SwitchDialog";
import ToolboxDrawer from "@/components/toolbox-drawer/ToolboxDrawer";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    console.log("Switched to 意外事件顧問");
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  return (
    <ToolboxDrawer open={isOpenDrawer} toggleDrawer={toggleDrawer}>
      <Header
        toggleDrawer={toggleDrawer}
        open={isOpenDrawer}
        title="債務事件顧問"
      />
      <MainContent />
      <SwitchDialog
        open={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </ToolboxDrawer>
  );
}
