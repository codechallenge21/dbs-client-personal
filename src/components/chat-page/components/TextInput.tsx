import docPreview from '@/assets/Images/Doc Icon.svg';
import imagePreview from '@/assets/Images/Image Icon.svg';
import pdfPreview from '@/assets/Images/Pdf Icon.svg';
import txtPreview from '@/assets/Images/Txt Icon.svg';
import { SubmitUserInputsApiPayload } from '@/interfaces/payloads';
import { CloseRounded, SendRounded } from '@mui/icons-material';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import RotateRightRounded from '@mui/icons-material/RotateRightRounded';
import { Box, IconButton, TextareaAutosize, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ChannelContentContext from '@/context/ChannelContentContext';
import DropdownMenu from './DropdownMenu';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';

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

type TextInputProps = {
  submitUserInputs: (input: SubmitUserInputsApiPayload) => Promise<{
    data: {
      response: string;
      organizationChannelTitle: string;
      organizationChannelId: string;
    };
  }>;
  isInteracting: boolean;
  setIsLoginOpen?: (value: boolean) => void;
  from?: string;
};

interface ChatWithFilesPayload {
  chatRequest: {
    query: string;
    advisorType: string;
  };
  files: File[];
  organizationId: string;
}

interface ChatWithFilesResponse {
  data: {
    response: string;
    organizationChannelTitle: string;
    organizationChannelId: string;
  };
}

const TextInput: React.FC<TextInputProps> = ({
  submitUserInputs,
  isInteracting,
  setIsLoginOpen,
  from,
}) => {
  const [userInputValue, setUserInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<null | SpeechRecognition>(null);
  const [files, setFiles] = useState<{ file: File; preview: string | null }[]>(
    []
  );

  const MAX_FILES = 3;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const { excute: chatWithFiles } = useAxiosApi<
    ChatWithFilesResponse,
    ChatWithFilesPayload
  >(apis.chatWithFiles);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (files.length + droppedFiles.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    for (const file of droppedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`File "${file.name}" exceeds the 5MB limit.`);
        return;
      }
      setError('');
    }

    const mappedFiles = droppedFiles.map((file) => ({ file, preview: null }));
    setFiles((prev) => [...prev, ...mappedFiles]);
    setError('');
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (files.length + selectedFiles.length > MAX_FILES) {
        setError(`You can only upload up to ${MAX_FILES} files.`);
        return;
      }
      // Validate each file's size
      for (const file of selectedFiles) {
        if (file.size > MAX_FILE_SIZE) {
          setError(`File "${file.name}" exceeds the 5MB limit.`);
          return;
        }
        setError('');
      }
      const newFiles = selectedFiles.map((file) => {
        const icon = getFileIcon(file);
        return { file, preview: icon };
      });
      setFiles((prev) => [...prev, ...newFiles]);
      setError('');
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return pdfPreview;
      case 'txt':
        return txtPreview;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return imagePreview;
      case 'doc':
      case 'docx':
      case 'xlsx':
      case 'xls':
        return docPreview;
      default:
        return imagePreview;
    }
  };

  const {
    selectedChannelId,
    setIsInteractingInChat,
    setSelectedChannelId,
    setChatResponses,
    channelsMutate,
    advisorType,
  } = useContext(ChannelContentContext);

  const handleSendMessage = useCallback(async () => {
    if (isInteracting) {
      return;
    }
    setChatResponses((prev) => [
      ...prev,
      {
        organizationChannelMessageType: 'USER',
        organizationChannelMessageContent: userInputValue,
        organizationChannelFiles: files,
      },
    ]);
    if (files.length > 0) {
      try {
        const response = await chatWithFiles({
          chatRequest: {
            query: userInputValue,
            advisorType: 'DEBT',
          },
          files: files.map((item) => item.file),
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
        });
        if (response.data.response) {
          setChatResponses((prev) => [
            ...prev,
            {
              organizationChannelMessageType: 'AI',
              organizationChannelMessageContent: response.data.response,
              organizationChannelTitle: response.data.organizationChannelTitle,
            },
          ]);
          setSelectedChannelId(response.data.organizationChannelId);
          if (channelsMutate) {
            channelsMutate();
          }
          setUserInputValue('');
          setFiles([]);
        }
      } catch (error) {
        console.error('Error sending message with files:', error);
      }
    } else {
      try {
        const response = await submitUserInputs({
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
          query: userInputValue,
          advisorType,
          organizationChannelId: selectedChannelId,
        });
        if (response.data.response) {
          setChatResponses((prev) => [
            ...prev,
            {
              organizationChannelMessageType: 'AI',
              organizationChannelMessageContent: response?.data?.response,
              organizationChannelTitle:
                response?.data?.organizationChannelTitle,
            },
          ]);
          setSelectedChannelId(response?.data?.organizationChannelId);
          if (channelsMutate) {
            channelsMutate();
          }
          setUserInputValue('');
          setFiles([]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
    files,
  ]);

  const handleClickSubmitOrAudioFileUpload = useCallback(() => {
    if (userInputValue !== '') {
      handleSendMessage();
      setFiles([]);
      setUserInputValue('');
    }
  }, [handleSendMessage, userInputValue]);

  const handleOnChangeUserInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const isLoggedin = Cookies.get('u_info');
      if (!isLoggedin) {
        if (setIsLoginOpen) setIsLoginOpen(true);
        return;
      }
      const { value } = e.target;
      setUserInputValue(value);
    },
    []
  );

  const handleOnKeyDownUserInput = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        if (userInputValue.trim() !== '') {
          e.preventDefault();
          handleSendMessage();
          setFiles([]);
          setUserInputValue('');
        }
      }
    },
    [handleSendMessage, userInputValue]
  );

  useEffect(() => {
    setIsInteractingInChat(isInteracting);
  }, [isInteracting, setIsInteractingInChat]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'zh-TW';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const finalTranscript = Array.from(event.results)
            .map((result) => result[0]?.transcript)
            .join('');
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
      setError('Your browser does not support Speech Recognition.');
    }
  }, []);

  const handleListening = useCallback(() => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
        if (userInputValue !== '') {
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box
        sx={{
          width: '100%',
          maxWidth: '760px',
          minHeight: '116px',
          position: from === 'mainContent' ? 'sticky' : 'relative',
          bottom: 0,
          backgroundColor: '#F5F5F5',
          borderRadius: '16px',
          zIndex: 10,
          overflow: 'hidden',
          margin: from === 'mainContent' ? 'auto' : '0',
        }}
        className="chat-text-input"
      >
        {files.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              padding: '12px',
              maxHeight: '180px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#a8a8a8',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: '4px',
              },
            }}
          >
            {files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  width: 80,
                  paddingTop: '10px',
                }}
              >
                <Image
                  src={file.preview ?? imagePreview}
                  alt={file.file.name}
                  width={64}
                  height={64}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: '14px',
                    fontFamily: 'DFPHeiBold-B5',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                  }}
                >
                  {file.file.name}
                </Typography>
                <IconButton
                  aria-label="remove file"
                  sx={{
                    position: 'absolute',
                    top: '0px',
                    left: '6px',
                    backgroundColor: 'red',
                    width: '16px',
                    height: '16px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <CloseRounded sx={{ fontSize: '14px' }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        <Box
          sx={{
            margin: '8px 0px 8px 16px',
            overflowY: 'auto',
            minHeight: '40px',
            maxHeight: '200px',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#a8a8a8',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
            },
          }}
        >
          <TextareaAutosize
            aria-label="Ask the AI"
            minRows={1}
            placeholder="傳訊息給智能顧問"
            style={{
              width: '100%',
              border: 'none',
              resize: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#212B36',
              overflow: 'auto',
              borderRadius: '8px',
              backgroundColor: '#F5F5F5',
              paddingTop: '2px',
              paddingBottom: '',
            }}
            className="textarea-autosize"
            value={userInputValue}
            onChange={handleOnChangeUserInput}
            onKeyDown={handleOnKeyDownUserInput}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            display: 'flex',
            padding: '10px 16px 10px 6px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
            }}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <Box sx={{ display: 'flex' }}>
              <IconButton
                aria-label="attach file"
                component="span"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                sx={{ padding: '8px' }}
              >
                <AttachFileRoundedIcon
                  sx={{ transform: 'rotate(180deg)', color: 'black' }}
                  onClick={() =>
                    document.getElementById('file-upload')?.click()
                  }
                />
              </IconButton>
              <IconButton
                aria-label="attach file"
                sx={{ padding: '8px', borderRadius: '7px 10px' }}
              >
                <DropdownMenu isTextInput advisor={advisorType} />
              </IconButton>
            </Box>
          </Box>

          {isInteracting ? (
            <Box>
              <RotateRightRounded sx={{ color: '#1877F2', fontSize: 24 }} />
            </Box>
          ) : userInputValue !== '' && !isListening ? (
            <IconButton
              aria-label="send message"
              onClick={handleClickSubmitOrAudioFileUpload}
            >
              <SendRounded sx={{ color: 'black' }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Audio Message"
              onClick={handleListening}
              className={isListening ? 'mic-listening' : ''}
              sx={{ padding: '8px' }}
            >
              <MicRoundedIcon
                className={isListening ? 'mic-icon' : ''}
                sx={{ color: isListening ? 'white' : 'black' }}
              />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TextInput;
