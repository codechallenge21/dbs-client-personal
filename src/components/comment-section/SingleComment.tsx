import { Avatar, Box, Typography, IconButton, Stack } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

type Comment = {
  user: string;
  role: string;
  comment: string;
  likes: number;
  dislikes: number;
};

type SingleCommentProps = {
  comment: Comment;
};

const SingleComment = ({ comment }: SingleCommentProps) => (
  <Box
    sx={{
      display: "flex",
      padding: "20px 0px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "14px",
    }}
  >
    {/* User Profile */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        alignSelf: "stretch",
      }}
    >
      <Avatar
        alt="User Avatar"
        src="/assets/images/person2.png"
        sx={{ width: 40, height: 40 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          alignSelf: "stretch",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            color: "#E4DAD7",
            textOverflow: "ellipsis",
            fontFamily: "Public Sans",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "16px", // 123.077%
            letterSpacing: "-0.065px",
          }}
        >
          {comment.user}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            color: "rgba(235, 213, 209, 0.62)",
            textOverflow: "ellipsis",
            fontFamily: "Public Sans",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "16px", // 123.077%
            letterSpacing: "-0.065px",
          }}
        >
          {comment.role}
        </Typography>
      </Box>
    </Box>

    {/* Comment Content */}
    <Typography
      variant="body1"
      sx={{
        color: "#E4DAD7",
        fontFamily: "Public Sans",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px", // 133.333%
        letterSpacing: "-0.075px",
      }}
    >
      {comment.comment}
    </Typography>

    {/* Action Buttons */}
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton sx={{ color: "white", py: 0, pl: 0 }}>
          <ThumbUpOutlinedIcon />
        </IconButton>
        <Typography>{comment.likes}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton sx={{ color: "white", py: 0 }}>
          <ThumbDownOutlinedIcon />
        </IconButton>
        <Typography>{comment.dislikes}</Typography>
      </Box>

      <Box>
        <IconButton sx={{ color: "white", py: 0 }}>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </Stack>
  </Box>
);

export default SingleComment;
