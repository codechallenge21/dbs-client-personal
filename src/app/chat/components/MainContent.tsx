import { Box, Typography, useTheme, useMediaQuery, Skeleton } from "@mui/material";
import TextInput from "./TextInput";
import { useContext } from "react";
import ChannelContentContext from "./ChannelContentContext";
import ChannelMessagePanel from "./ChannelMessagePanel";

export default function MainContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { selectedChannelId, selectedChannel, chatResponses, isInteractingInChat } =
    useContext(ChannelContentContext);

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
          {isInteractingInChat && (
            <Skeleton
              variant="text"
              sx={{
                fontSize: "32px",
                width: isMobile ? "50%" : "760px",
                mb: isMobile ? 50 : 5,
              }}
            />
          )}
          {!isInteractingInChat && (
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
          )}
        </>
      ) : (
        <>
          {isInteractingInChat && (
            <Skeleton
              variant="text"
              sx={{
                fontSize: "32px",
                width: isMobile ? "50%" : "760px",
                mb: isMobile ? 50 : 5,
              }}
            />
          )}
          {!isInteractingInChat && (
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
        </>
      )}

      <TextInput />
    </Box>
  );
}
