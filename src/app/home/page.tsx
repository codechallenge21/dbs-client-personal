"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SwitchDialog from "./components/SwitchDialog";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    console.log("Switched to 意外事件顧問");
    setIsOpen(false);
  };
  return (
    <Box>
      <Header />
      <MainContent />
      <SwitchDialog
        open={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
