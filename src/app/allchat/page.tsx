"use client";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import Header from "../../components/all-chat-header/Header";
import SwitchDialog from "../../components/dialogs/SwitchDialog";
import ChannelSearch from "../../components/view-all-history/ViewAllHistory";

// 動態導入 ToolbarDrawer，並禁用 SSR
const ToolbarDrawer = dynamic(
  () => import("@/components/toolbar-drawer-new/ToolbarDrawer"),
  { ssr: false }
);

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(!isMobile);

  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => setIsOpen(false);
  const toggleDrawer = (newOpen: boolean) => setIsOpenDrawer(newOpen);

  useEffect(() => {
    toggleDrawer(!isMobile);
  }, [isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* 將整個頁面內容包裝在單一的 Suspense 邊界中 */}
      <Suspense fallback={<CircularProgress />}>
        <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={toggleDrawer}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: isMobile ? "100vh" : "calc(100vh - 32px)",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
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
      </Suspense>
    </Box>
  );
}
