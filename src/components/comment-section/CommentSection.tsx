import React from "react";
import { Avatar, Box, Typography, TextField, Divider } from "@mui/material";
import SingleComment from "./SingleComment";

export default function CommentSection() {
  const comments = [
    {
      id: 1,
      user: "王大明",
      role: "使用者",
      comment: "希望增加更多的財務管理工具",
      likes: 5,
      dislikes: 0,
      replies: [
        {
          id: 2,
          user: "李小美",
          role: "使用者",
          comment: "這是個好主意！",
          likes: 3,
          dislikes: 0,
        },
        {
          id: 3,
          user: "陳大華",
          role: "使用者",
          comment: "我也覺得應該增加這類工具",
          likes: 2,
          dislikes: 0,
        },
        {
          id: 4,
          user: "林小紅",
          role: "使用者",
          comment: "支持！",
          likes: 1,
          dislikes: 0,
        },
      ],
    },
    {
      id: 2,
      user: "王大明",
      role: "使用者",
      comment: "希望增加更多的財務管理工具",
      likes: 5,
      dislikes: 0,
      replies: [
        {
          id: 2,
          user: "李小美",
          role: "使用者",
          comment: "這是個好主意！",
          likes: 3,
          dislikes: 0,
        },
        {
          id: 3,
          user: "陳大華",
          role: "使用者",
          comment: "我也覺得應該增加這類工具",
          likes: 2,
          dislikes: 0,
        },
        {
          id: 4,
          user: "林小紅",
          role: "使用者",
          comment: "支持！",
          likes: 1,
          dislikes: 0,
        },
      ],
    },
  ];

  return (
    <Box sx={{ borderRadius: 2 }}>
      <Divider sx={{ backgroundColor: "rgba(182, 151, 145, 0.20)", my: 4 }} />
      <Typography
        sx={{
          color: "#E4DAD7",
          fontFamily: "Roboto Serif",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "24px", // 120%
          letterSpacing: "-0.4px",
          textAlign: "left",
        }}
      >
        許願池
      </Typography>
      {/* Input Field */}
      <Box
        sx={{
          display: "flex",
          padding: "20px 0px",
          alignItems: "flex-start",
          gap: "14px",
          alignSelf: "stretch",
        }}
      >
        <Avatar
          alt="User Avatar"
          src="/assets/images/person2.png"
          sx={{ width: 40, height: 40 }}
        />
        <TextField
          placeholder="留下您的建議或意見..."
          fullWidth
          multiline
          minRows={3}
          sx={{
            display: "flex",
            minHeight: "76px",
            alignItems: "flex-start",
            gap: "8px",
            flex: "1 0 0",
            borderRadius: "8px",
            border: "1.5px solid rgba(255, 255, 255, 0.00)",
            backgroundColor: "rgba(224, 191, 184, 0.12)",
            padding: "0",
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(235, 213, 209, 0.40)",
              fontFamily: "Public Sans",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px", // 133.333%
              letterSpacing: "-0.075px",
            },
            input: {
              color: "#FFFFFF",
            },
          }}
        />
      </Box>

      {/* Comments */}
      {comments.map((comment) => (
        <Box key={comment.id} sx={{ mb: 3 }}>
          <SingleComment comment={comment} />

          {/* Replies */}
          {comment.replies &&
            comment.replies.map((reply) => (
              <Box
                key={reply.id}
                sx={{
                  display: "flex",
                  padding: "10px 0px 10px 40px",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "rgba(182, 151, 145, 0.20)" }}
                />
                <SingleComment comment={reply} />
              </Box>
            ))}
        </Box>
      ))}
    </Box>
  );
}
