import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import TextInput from "./TextInput";
import { useContext } from "react";
import ChannelContentContext from "./ChannelContentContext";
import ChannelMessagePanel from "./ChannelMessagePanel";

export default function MainContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { selectedChannel } = useContext(ChannelContentContext);

  console.log("selectedChannel", selectedChannel);

  if (selectedChannel)
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
        <ChannelMessagePanel channel={selectedChannel} />
        <TextInput />
      </Box>
    );

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-end" : "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontFamily: "DFPHeiBold-B5",
          fontSize: "32px",
          fontWeight: "400",
          mb: isMobile ? 50 : 5,
        }}
      >
        嘿！我能為你做些什麼？
      </Typography>

      <TextInput />
    </Box>
  );
}
