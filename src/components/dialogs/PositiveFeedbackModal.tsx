"use client";

import { SnackbarContext } from "@/context/SnackbarContext";
import apis from "@/utils/hooks/apis/apis";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";

interface PositiveFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  userChatMessage: any;
  setUserFeedback: React.Dispatch<React.SetStateAction<string>>;
}

export default function PositiveFeedbackModal({
  open,
  onClose,
  userChatMessage,
  setUserFeedback,
}: PositiveFeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const searchParams = useSearchParams();
  const { showSnackbar } = useContext(SnackbarContext);
  const organizationChannelId = searchParams.get("organizationChannelId") ?? "";
  const { excute: submitUserInputs } = useAxiosApi(apis.addUserFeedback);
  const { excute: getUserFeedback } = useAxiosApi(apis.getUserFeedback);

  const fetchUserFeedback = useCallback(
    async (organizationChannelId: string) => {
      try {
        const res = await getUserFeedback({
          organizationId: "yMJHyi6R1CB9whpdNvtA",
          organizationChannelId,
          messageId: userChatMessage.organizationChannelMessageId,
        });
        console.log("res for positive feedback", res.data);
        setUserFeedback(
          // res.data?.organizationChannelFeedbackList
          //   ?.organizationChannelFeedbackType
          "POSITIVE"
        );
        onClose();
        showSnackbar("感謝您的回饋!", "success");
      } catch (error) {
        console.error("Failed to fetch channel details:", error);
      }
    },
    [getUserFeedback, userChatMessage, onClose, showSnackbar, setUserFeedback]
  );

  const handleSubmit = () => {
    submitUserInputs({
      organizationChannelFeedbackTarget: "AI_RESPONSE",
      organizationChannelFeedbackTargetId:
        userChatMessage.organizationChannelMessageId,
      organizationChannelFeedbackType: "POSITIVE",
      organizationChannelFeedbackComment: feedback,
      organizationId: "yMJHyi6R1CB9whpdNvtA",
    });
    fetchUserFeedback(organizationChannelId);
    setFeedback("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          m: { xs: 2, sm: 4 },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2,
          fontWeight: "bold",
          fontSize: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        回饋
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            p: 0.5,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2, pt: 1 }}>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          請詳細說明：（選填）
        </Typography>

        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="您對這個回覆滿意嗎？請說明您的理由"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
          }}
        />

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          <InfoIcon
            sx={{
              color: "text.disabled",
              fontSize: "20px",
              mt: 0.3,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              lineHeight: 1.3,
            }}
          >
            提交此報告將把整個對話發送給eGroup，以便未來改進我們的模型。
            <Typography component="span" sx={{ color: "#0066CC" }}>
              了解更多 &gt;
            </Typography>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#6D4C41",
            color: "white",
            "&:hover": {
              bgcolor: "#5D4037",
            },
            borderRadius: "4px",
            px: 2,
            py: 0.5,
            textTransform: "none",
            boxShadow: "none",
          }}
        >
          傳送
        </Button>
      </DialogActions>
    </Dialog>
  );
}
