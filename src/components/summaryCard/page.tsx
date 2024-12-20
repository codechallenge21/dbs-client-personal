import { useContext } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import SmsSharpIcon from "@mui/icons-material/SmsSharp";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";
import ChannelContentContext from "@/app/chat/components/ChannelContentContext";

export default function SummaryCard() {
  const { selectedChannel } = useContext(ChannelContentContext);

  return (
    !!selectedChannel && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "24px 16px",
          bgcolor: "#fff",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            bgcolor: "#fff",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                mb: 2,
                bgcolor: "#f8f8f8",
                p: 2,
                borderRadius: "4px",
                padding: {
                  xs: "32px 15px 52px 15px",
                  sm: "32px 98px 52px 98px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  摘要
                </Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#000", borderRadius: 2 }}
                >
                  <LoopSharpIcon sx={{ mr: 2 }} /> 重新生成
                </Button>
              </Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  maxWidth: "1004px",
                  maxHeight: "239px",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#c1c1c1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#a8a8a8",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                  },
                }}
              >
                {selectedChannel?.organizationChannelTranscriptList?.[0]
                  ?.organizationChannelTranscriptContent ?? ""}
              </Typography>
            </Box>

            <Box
              sx={{
                padding: {
                  xs: "32px 15px 52px 15px",
                  sm: "32px 98px 52px 98px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  gap: 1,
                }}
              >
                <SmsSharpIcon />
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  逐字稿
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#333",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  maxWidth: "1004px",
                  maxHeight: "516px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#c1c1c1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#a8a8a8",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                  },
                }}
              >
                {selectedChannel?.organizationChannelTranscriptList?.[0]
                  ?.organizationChannelTranscriptContent ?? ""}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  );
}
