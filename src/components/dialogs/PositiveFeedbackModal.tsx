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
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";

interface PositiveFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  userChatMessage?: any;
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
        showSnackbar("感謝您的回饋"!, "success");
      } catch (error) {
        console.error("Failed to fetch channel details:", error);
      }
    },
    [getUserFeedback, userChatMessage, onClose, showSnackbar, setUserFeedback]
  );

  const handleSubmit = () => {
    if (userChatMessage) {
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
    } else {
      setUserFeedback("POSITIVE");
      onClose();
      setFeedback("");
      showSnackbar("感謝您的回饋!", "success");
      return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          fontWeight: "bold",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          回饋
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "black",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>
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
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              p: 1.5,
              borderRadius: "4px",
            }}
          >
            <InfoIcon
              sx={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "1.2rem", mt: 0.2 }}
            />
            <Typography
              sx={{ fontSize: "0.8rem", color: "rgba(0, 0, 0, 0.7)" }}
            >
              提交此回饋將會把對話內容發送至好理家在團隊，以協助我們改進 AI
              回應品質。
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#6d4c41",
              color: "white",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#5d4037",
              },
              px: 3,
              py: 1,
              borderRadius: "4px",
            }}
          >
            送出
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
