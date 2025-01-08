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
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import apis from "@/utils/hooks/apis/apis";
import ChannelContentContext from "./ChannelContentContext";

// Define the types for SpeechRecognition and related events
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

const TextInput = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [userInputValue, setUserInputValue] = useState("");

  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<null | SpeechRecognition>(null);

  const { excute: submitUserInputs, isLoading: isInteracting } = useAxiosApi(
    apis.submitUserInputs
  );

  const {
    selectedChannelId,
    setIsInteractingInChat,
    setSelectedChannelId,
    setChatResponses,
    channelsMutate,
    advisorType,
  } = useContext(ChannelContentContext);

  const handleSendMessage = useCallback(async () => {
    if (isInteracting) return;
    const response = await submitUserInputs({
      organizationId: "4aba77788ae94eca8d6ff330506af944",
      query: userInputValue,
      advisorType,
      organizationChannelId: selectedChannelId,
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
    selectedChannelId,
    setChatResponses,
    setSelectedChannelId,
    submitUserInputs,
    userInputValue,
    advisorType,
  ]);

  const handleClickSubmitOrAudioFileUpload = useCallback(() => {
    if (userInputValue !== "") {
      handleSendMessage();
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
      if (e.key === "Enter" && !e.shiftKey) {
        if (userInputValue.trim() !== "") {
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

  // Initialize webkitSpeechRecognition for speech-to-text
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition; // eslint-disable-line
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true; // Keep listening until stopped
        recognitionRef.current.interimResults = true; // Show interim results
        recognitionRef.current.lang = "zh-TW"; // Set language

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const finalTranscript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setUserInputValue(finalTranscript);
        };

        recognitionRef.current.onerror = (
          event: SpeechRecognitionErrorEvent
        ) => {
          setError(event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    } else {
      setError("Your browser does not support Speech Recognition.");
    }
  }, []);

  const handleListening = useCallback(() => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
        if (userInputValue !== "") {
          handleSendMessage();
        }
      } else {
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
      }
    }
  }, [handleSendMessage, isListening, userInputValue]);

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "95%" : "calc(100% - 20px)",
          height: isMobile ? "100px" : "124px",
          maxWidth: "760px",
          minHeight: "108px",
          position: isMobile ? "fixed" : "relative",
          bottom: isMobile ? 0 : "auto",
          backgroundColor: "#F5F5F5",
          borderRadius: 2,
          overflow: "hidden",
          margin: isMobile ? 3 : 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            paddingTop: "8px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "8px",
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
        </Box>
        <Box
          sx={{
            bottom: 0,
            width: "100%",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              bottom: "12px",
              left: "10px",
            }}
          >
            <AttachFileRoundedIcon
              sx={{ transform: "rotate(180deg)", color: "black" }}
            />
          </IconButton>
          {userInputValue !== "" && !isListening ? (
            <IconButton
              sx={{
                position: "absolute",
                bottom: "12px",
                right: "10px",
              }}
              onClick={handleClickSubmitOrAudioFileUpload}
            >
              <ArrowUpwardIcon sx={{ color: "black" }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleListening}
              className={isListening ? "mic-listening" : ""}
              sx={{
                position: "absolute",
                bottom: "12px",
                right: "10px",
              }}
            >
              <MicRoundedIcon
                className={isListening ? "mic-icon" : ""}
                sx={{ color: isListening ? "white" : "black" }}
              />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TextInput;
