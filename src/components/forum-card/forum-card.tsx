import React from "react";
import { Typography, Box } from "@mui/material";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function ForumCard() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px 0px",
        alignItems: "flex-start",
        gap: "14px",
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingTop: "12px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          flex: "1 0 0",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            color: "#E4DAD7",
            textOverflow: "ellipsis",
            fontFamily: "Public Sans",
            fontSize: "17px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "24px", // 141.176%
            letterSpacing: "-0.085px",
          }}
        >
          如何應對詐騙
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            color: "#E4DAD7",
            textOverflow: "ellipsis",
            fontFamily: "Public Sans",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "20px", // 133.333%
            letterSpacing: "-0.075px",
          }}
        >
          詳細介紹如何識別和應對詐騙...
        </Typography>

        {/* Action Row */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 1 }}
        >
          {/* Like Icon and Count */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ThumbUpAltOutlined sx={{ color: "#FF5733", fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{
                color: "#FF5733",
                fontWeight: 500,
                fontFamily: "Public Sans",
                lineHeight: "16px",
              }}
            >
              1.2k
            </Typography>
          </Box>

          {/* Forum Icon and Count */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ChatBubbleOutlineIcon sx={{ color: "#FF5733", fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{
                color: "#FF5733",
                fontWeight: 500,
                fontSize: "13px",
                lineHeight: "16px",
              }}
            >
              12
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
