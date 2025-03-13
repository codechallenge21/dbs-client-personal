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
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback, useContext, useState } from "react";

// 定義負面回饋類別的列舉項
enum ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_ {
  INTERFACE_ISSUE = "INTERFACE_ISSUE",
  HARMFUL_CONTENT = "HARMFUL_CONTENT",
  OVER_REFUSAL = "OVER_REFUSAL",
  NOT_FULLY_MEET_REQUIREMENT = "NOT_FULLY_MEET_REQUIREMENT",
  FACTUAL_INACCURACY = "FACTUAL_INACCURACY",
  INCOMPLETE_ANSWER = "INCOMPLETE_ANSWER",
  OTHER = "OTHER",
}

// 定義每個負面回饋類別對應的繁體中文標籤
const negativeFeedbackCategoryLabels: Record<
  ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_,
  string
> = {
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.INTERFACE_ISSUE]:
    "操作介面問題",
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.HARMFUL_CONTENT]:
    "包含有害或不當內容",
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.OVER_REFUSAL]:
    "過度拒絕回答問題",
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.NOT_FULLY_MEET_REQUIREMENT]:
    "未能完全滿足需求",
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.FACTUAL_INACCURACY]:
    "資訊或事實不準確",
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.INCOMPLETE_ANSWER]:
    "回答內容不完整",
  [ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_.OTHER]: "其他問題",
};

interface NegativeFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  userChatMessage?: any;
  setUserFeedback: React.Dispatch<React.SetStateAction<string>>;
}

export default function NegativeFeedbackModal({
  open,
  onClose,
  userChatMessage,
  setUserFeedback,
}: NegativeFeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const searchParams = useSearchParams();
  const { showSnackbar } = useContext(SnackbarContext);
  const organizationChannelId = searchParams.get("organizationChannelId") ?? "";
  const { excute: submitUserInputs } = useAxiosApi(apis.addUserFeedback);
  const { excute: getUserFeedback } = useAxiosApi(apis.getUserFeedback);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setFeedbackType(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackText(event.target.value);
  };

  const fetchUserFeedback = useCallback(
    async (organizationChannelId: string) => {
      try {
        await getUserFeedback({
          organizationId: "yMJHyi6R1CB9whpdNvtA",
          organizationChannelId,
          messageId: userChatMessage.organizationChannelMessageId,
        });
        setUserFeedback(
          // res.data.organizationChannelFeedbackType
          "NEGATIVE"
        );
        onClose();
        showSnackbar("感謝您的回饋!", "success");
      } catch (error) {
        console.error("Failed to fetch channel details:", error);
      }
    },
    [userChatMessage, getUserFeedback, setUserFeedback]
  );

  const handleSubmit = async () => {
    if (userChatMessage) {
      try {
        await submitUserInputs({
          organizationChannelFeedbackTarget: "AI_RESPONSE",
          organizationChannelFeedbackTargetId:
            userChatMessage.organizationChannelMessageId,
          organizationChannelFeedbackType: "NEGATIVE",
          organizationId: "yMJHyi6R1CB9whpdNvtA",
          organizationChannelFeedbackComment: feedbackText,
          organizationChannelFeedbackNegativeCategory: feedbackType,
        });
        await fetchUserFeedback(organizationChannelId);
        onClose();
      } catch (error) {
        showSnackbar("出了點問題", "error");
      } finally {
        setFeedbackType("");
        setFeedbackText("");
      }
    } else {
      setUserFeedback("NEGATIVE");
      onClose();
      setFeedbackType("");
      setFeedbackText("");
    }
  };

  // 取得所有負面回饋類別的鍵作為選項
  const feedbackOptions = Object.values(
    ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_
  );

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
              您希望回饋的問題類型？（選填）
            </Typography>
            <FormControl fullWidth>
              <Select
                value={feedbackType}
                onChange={handleTypeChange}
                displayEmpty
                sx={{
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography
                        sx={{ color: "text.secondary", fontSize: "0.9rem" }}
                      >
                        請選擇類型
                      </Typography>
                    );
                  }
                  return (
                    negativeFeedbackCategoryLabels[
                      selected as ORGANIZATION_CHANNEL_FEEDBACK_NEGATIVE_CATEGORY_
                    ] || selected
                  );
                }}
              >
                {feedbackOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {negativeFeedbackCategoryLabels[option]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>
              請詳細說明：（選填）
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="有什麼可以改進的地方嗎？請提供您的建議"
              value={feedbackText}
              onChange={handleTextChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "0.9rem",
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
              {/* <Typography
                component="span"
                sx={{
                  color: "#1976d2",
                  ml: 0.5,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                了解更多
              </Typography> */}
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
            傳送
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
