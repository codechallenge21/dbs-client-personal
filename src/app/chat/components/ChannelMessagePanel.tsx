import { OrganizationChannel } from "@/interfaces/entities";
import { Box, Container } from "@mui/material";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

export interface ChannelMessagePanelProps {
  channel: OrganizationChannel;
}

const ChannelMessagePanel: FC<ChannelMessagePanelProps> = ({ channel }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        height: "70vh",
        overflow: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "760px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {channel.organizationChannelMessageList.map((message, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              ...(message.organizationChannelMessageType === "AI"
                ? { padding: 2, px: 0, textAlign: "left", "& p": { marginBottom: 1 } }
                : {
                    padding: 2,
                    width: "auto",
                    backgroundColor: "#E8E8E8",
                    borderRadius: 5,
                    textAlign: "right",
                    alignContent: "right",
                    alignItems: "right",
                    justifyContent: "flex-end",
                    "& p": { marginBottom: 0 },
                  }),
            }}
          >
            <ReactMarkdown>{message.organizationChannelMessageContent}</ReactMarkdown>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ChannelMessagePanel;
