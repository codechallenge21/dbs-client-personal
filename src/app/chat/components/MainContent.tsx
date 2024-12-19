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
      {isMobile ? (
        <>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "DFPHeiBold-B5",
              fontSize: "32px",
              fontWeight: "400",
            }}
          >
            嘿！
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "DFPHeiBold-B5",
              fontSize: "32px",
              fontWeight: "400",
              mb: "319px",
            }}
          >
            我能為你做些什麼？
          </Typography>
        </>
      ) : (
        <Typography
          sx={{
            color: "#000",
            fontFamily: "DFPHeiBold-B5",
            fontSize: "32px",
            fontWeight: "400",
            mb: 5,
          }}
        >
          嘿！我能為你做些什麼？
        </Typography>
      )}
      <TextInput />
    </Box>
  );
}
