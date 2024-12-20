import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Box,
  IconButton,
  TextareaAutosize,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import apis from "@/utils/hooks/apis/apis";
import ChannelContentContext from "./ChannelContentContext";

const TextInput = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [userInputValue, setUserInputValue] = useState("");

  const { excute: submitUserInputs, isLoading: isInteracting } = useAxiosApi(
    apis.submitUserInputs
  );

  const {
    selectedChannel,
    setIsInteractingInChat,
    setSelectedChannelId,
    setChatResponses,
    channelsMutate,
  } = useContext(ChannelContentContext);

  const handleSendMessage = useCallback(async () => {
    if (isInteracting) return;
    const response = await submitUserInputs({
      organizationId: "4aba77788ae94eca8d6ff330506af944",
      query: userInputValue,
      advisorType: "DEFAULT",
      organizationChannelId: selectedChannel?.organizationChannelId,
    });
    if (response.data.response) {
      setChatResponses((prev) => [
        ...prev,
        {
          organizationChannelMessageType: "USER",
          organizationChannelMessageContent: userInputValue,
        },
        {
          organizationChannelMessageType: "AI",
          organizationChannelMessageContent: response?.data?.response,
        },
      ]);
      setSelectedChannelId(response?.data?.channelId);
      if (channelsMutate) {
        channelsMutate();
      }
      setUserInputValue("");
    }
  }, [
    channelsMutate,
    isInteracting,
    selectedChannel?.organizationChannelId,
    setChatResponses,
    setSelectedChannelId,
    submitUserInputs,
    userInputValue,
  ]);

  const handleClickSubmitOrAudioFileUpload = useCallback(() => {
    if (userInputValue !== "") {
      handleSendMessage();
    } else {
      console.log("upload audio file");
    }
  }, [handleSendMessage, userInputValue]);

  const handleOnChangeUserInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setUserInputValue(value);
    },
    []
  );

  const handleOnKeyDownUserInput = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        const lines = userInputValue.split("\n");
        const currentLine = lines[lines.length - 1];
        console.log("userInputValue.trim()", userInputValue.trim());
        if (currentLine.trim() === "" && userInputValue.trim() !== "") {
          e.preventDefault();
          handleSendMessage();
        }
      }
    },
    [handleSendMessage, userInputValue]
  );

  useEffect(() => {
    setIsInteractingInChat(isInteracting);
  }, [isInteracting, setIsInteractingInChat]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "95%" : "calc(100% - 20px)",
        height: isMobile ? "100px" : "124px",
        maxWidth: "760px",
        position: isMobile ? "absolute" : "relative",
        bottom: isMobile ? 0 : "auto",
        backgroundColor: "#F5F5F5",
        borderRadius: 2,
        overflow: "hidden",
        margin: isMobile ? 3 : 0,
      }}
    >
      <TextareaAutosize
        minRows={2}
        maxRows={10}
        placeholder="傳訊息給智能顧問"
        style={{
          width: "100%",
          paddingTop: isMobile ? "20px" : "24px",
          paddingRight: "20px",
          paddingBottom: isMobile ? "20px" : "24px",
          paddingLeft: "20px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: isMobile ? "16px" : "24px",
          color: "#000",
          backgroundColor: "#F5F5F5",
          overflow: "auto",
        }}
        value={userInputValue}
        onChange={handleOnChangeUserInput}
        onKeyDown={handleOnKeyDownUserInput}
      />
      <IconButton
        sx={{
          position: "absolute",
          bottom: "12px",
          left: "10px",
        }}
      >
        <AttachFileRoundedIcon sx={{ transform: "rotate(180deg)", color: "black" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          bottom: "12px",
          right: "10px",
        }}
        onClick={handleClickSubmitOrAudioFileUpload}
      >
        {userInputValue !== "" ? (
          <ArrowUpwardIcon sx={{ color: "black" }} />
        ) : (
          <MicRoundedIcon sx={{ color: "black" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default TextInput;
