import { Box, useTheme, useMediaQuery, Skeleton } from "@mui/material";
import TextInput from "./TextInput";
import { useContext, useState } from "react";
import ChannelContentContext from "./ChannelContentContext";
import ChannelMessagePanel from "./ChannelMessagePanel";

export default function MainContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { selectedChannelId, selectedChannel, chatResponses, isInteractingInChat } =
    useContext(ChannelContentContext);

  // Add state management for the drawer's open/close status
  const [open, setOpen] = useState(false);

  // Add a function to toggle the drawer state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (selectedChannel || selectedChannelId)
    return (
      <Box
        sx={{
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isMobile ? "flex-end" : "center",
        }}
      >
        <ChannelMessagePanel channel={selectedChannel} chatResponses={chatResponses} />
        {isInteractingInChat && (
          <Skeleton
            variant="text"
            sx={{
              fontSize: "32px",
              maxWidth: isMobile ? "80%" : "760px",
              mb: isMobile ? 50 : 5,
            }}
          />
        )}
        <TextInput
          open={open}
          toggleDrawer={toggleDrawer}
        >
          {/* 加入需要的子元素 */}
          <div>Input content here</div>
        </TextInput>
      </Box>
    );

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: isMobile ? "192px" : "0px",
        paddingLeft: isMobile ? "16px" : "0px",
        paddingRight: isMobile ? "16px" : "0px",
        paddingBottom: isMobile ? "16px" : "0px",
      }}
    >
      {/* ... 其他程式碼保持不變 ... */}

      <TextInput
        open={open}
        toggleDrawer={toggleDrawer}
      >
        <div>Input content here</div>
      </TextInput>
    </Box>
  );
}