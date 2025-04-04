import docPreview from '@/assets/Images/Doc Icon.svg';
import imagePreview from '@/assets/Images/Image Icon.svg';
import pdfPreview from '@/assets/Images/Pdf Icon.svg';
import txtPreview from '@/assets/Images/Txt Icon.svg';
import { SnackbarContext } from '@/context/SnackbarContext';
import { SubmitUserInputsApiPayload } from '@/interfaces/payloads';
import { useRequireAuth } from '@/utils/hooks/useRequireAuth';
import {
  CloseRounded,
  SendRounded,
  StopCircleRounded,
} from '@mui/icons-material';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import { Box, IconButton, TextareaAutosize, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ChannelContentContext from '@/context/ChannelContentContext';
import DropdownMenu from './DropdownMenu';
import axios, { AxiosRequestConfig } from 'axios';

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
  submitUserInputs: (
    input: SubmitUserInputsApiPayload,
    config?: { signal?: AbortSignal }
  ) => Promise<{
    data: {
      response: string;
      organizationChannelTitle: string;
      organizationChannelId: string;
    };
  }>;
  chatWithFiles: (
    payload: ChatWithFilesPayload,
    config?: AxiosRequestConfig // Change from { signal?: AbortSignal }
  ) => Promise<{ data: ChatWithFilesResponse }>;
  isInteracting: boolean;
  setIsLoginOpen?: (value: boolean) => void;
  from?: string;
  files: { file: File; preview: string | null }[];
  setFiles: React.Dispatch<
    React.SetStateAction<{ file: File; preview: string | null }[]>
  >;
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
  response: string;
  organizationChannelTitle: string;
  organizationChannelId: string;
}

export const MAX_FILES = 3;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const allowedExtensions = [
  'pdf', // PDF
  'ppt', // PowerPoint
  'pptx', // PowerPoint (新格式)
  'doc', // Word
  'docx', // Word (新格式)
  'xls', // Excel
  'xlsx', // Excel (新格式)
  'html', // HTML
  'csv', // CSV
  'json', // JSON
  'xml', // XML
  'zip', // ZIP
  'txt', // Text
];

const TextInput: React.FC<TextInputProps> = ({
  submitUserInputs,
  chatWithFiles,
  isInteracting,
  from,
  files,
  setFiles,
}) => {
  console.log(isInteracting )
  const { requireAuth } = useRequireAuth();

  const [userInputValue, setUserInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const { showSnackbar } = useContext(SnackbarContext);

  const MAX_FILES = 3;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const allowedExtensions = [
    'pdf', // PDF
    'ppt', // PowerPoint
    'pptx', // PowerPoint (新格式)
    'doc', // Word
    'docx', // Word (新格式)
    'xls', // Excel
    'xlsx', // Excel (新格式)
    'html', // HTML
    'csv', // CSV
    'json', // JSON
    'xml', // XML
    'zip', // ZIP
    'txt', // Text
  ];

  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const droppedFiles = Array.from(event.dataTransfer.files);
  //   if (files.length + droppedFiles.length > MAX_FILES) {
  //     showSnackbar(`您一次最多只能上傳 ${MAX_FILES} 個檔案。`, 'error');
  //     return;
  //   }

  //   for (const file of droppedFiles) {
  //     const extension = file.name.split('.').pop()?.toLowerCase();
  //     if (!allowedExtensions.includes(extension ?? '')) {
  //       showSnackbar(`檔案格式不支援: ${file.name}`, 'error');
  //       return;
  //     }
  //     if (file.size > MAX_FILE_SIZE) {
  //       showSnackbar(`檔案 "${file.name}" 超過 5MB 的限制。`, 'error');
  //       return;
  //     }
  //   }
  // }
  //   const mappedFiles = droppedFiles.map((file) => ({ file, preview: null }));
  //   setFiles((prev) => [...prev, ...mappedFiles]);
  // };

  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (files.length + selectedFiles.length > MAX_FILES) {
        showSnackbar(`您一次最多只能上傳 ${MAX_FILES} 個檔案。`, 'error');
        return;
      }
      // Validate each file's size
      for (const file of selectedFiles) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(extension ?? '')) {
          showSnackbar(`檔案格式不支援: ${file.name}`, 'error');
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          showSnackbar(`檔案 "${file.name}" 超過 5MB 的限制。`, 'error');
          return;
        }
      }
      const newFiles = selectedFiles.map((file) => {
        const icon = getFileIcon(file);
        return { file, preview: icon };
      });
      setFiles((prev) => [...prev, ...newFiles]);
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
    abortControllerRef.current = new AbortController();
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
        const controller = abortControllerRef.current;

        const response = await chatWithFiles(
          {
            chatRequest: {
              query: userInputValue,
              advisorType: 'DEBT',
            },
            files: files.map((item) => item.file),
            organizationId: 'yMJHyi6R1CB9whpdNvtA',
          },
          { signal: controller.signal } // Pass the abort signal
        );
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
      } catch (error: unknown) {
        if (
          (error instanceof Error && error.name === 'AbortError') ||
          axios?.isCancel?.(error)
        ) {
          showSnackbar(`File upload was aborted`, 'error');
        } else {
          showSnackbar(`Error sending message with files:${error}`, 'error');
        }
      } finally {
        abortControllerRef.current = null; // Clear the abort controller ref
      }
    } else {
      try {
        const controller = abortControllerRef.current;
        const response = await submitUserInputs(
          {
            organizationId: 'yMJHyi6R1CB9whpdNvtA',
            query: userInputValue,
            advisorType,
            organizationChannelId: selectedChannelId,
          },
          { signal: controller.signal } // Pass as part of AxiosRequestConfig
        );
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
          setSelectedChannelId(response.data.organizationChannelId);
          if (channelsMutate) {
            channelsMutate();
          }
          setUserInputValue('');
          setFiles([]);
        }
      } catch (error: unknown) {
        if (
          (error instanceof Error && error.name === 'AbortError') ||
          axios?.isCancel?.(error)
        ) {
          showSnackbar(`Request was aborted`, 'error');
        } else {
          showSnackbar(`Error sending message:${error}`, 'error');
        }
      } finally {
        abortControllerRef.current = null;
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

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClickSubmitOrAudioFileUpload = useCallback(() => {
    if (userInputValue !== '' || files.length > 0) {
      handleSendMessage();
      setFiles([]);
      setUserInputValue('');
    }
  }, [handleSendMessage, userInputValue]);

  const handleOnChangeUserInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!requireAuth()) return;

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
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: { xs: '100%', md: '760px' },
          position: from === 'mainContent' ? 'sticky' : 'relative',
          bottom: 0,
          backgroundColor: '#F5F5F5',
          borderRadius: { xs: 0, md: '16px' },
          zIndex: 10,
          margin: from === 'mainContent' ? 'auto' : 0,
        }}
        className="chat-text-input"
      >
        <Box
          sx={{
            maxHeight: { xs: '220px', md: '300px' },
            overflowY: 'auto',
            px: { xs: 2, md: 3 },
            pt: { xs: 2, md: 3 },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
            },
          }}
        // onDrop={handleDrop}
        // onDragOver={handleDragOver}
        >
          {files.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                pb: 2,
                '@media (max-width: 600px)': {
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
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
                    '@media (max-width: 600px)': {
                      width: 60,
                    },
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
                      fontFamily: 'var(--font-bold)',
                      wordBreak: 'break-word',
                      textAlign: 'center',
                      '@media (max-width: 600px)': {
                        fontSize: '12px',
                      },
                    }}
                  >
                    {file.file.name}
                  </Typography>
                  <IconButton
                    aria-label="remove file"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: '6px',
                      backgroundColor: 'red',
                      width: '16px',
                      height: '16px',
                      color: 'white',
                      p: 0.5,
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
              mb: 2,
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
                overflow: 'hidden',
                borderRadius: '8px',
                backgroundColor: '#F5F5F5',
                caretColor: '#000000', // 設置游標顏色為藍色
                caretShape: 'block', // 部分瀏覽器支持，使游標呈現塊狀
                padding: '8px', // 增加內邊距，增大互動區域
                fontFamily: 'var(--font-medium)',
              }}
              className="textarea-autosize"
              value={userInputValue}
              onChange={handleOnChangeUserInput}
              onKeyDown={handleOnKeyDownUserInput}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 16px 10px 6px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <IconButton
              aria-label="attach file"
              component="span"
              onClick={() => document.getElementById('file-upload')?.click()}
              sx={{ padding: '8px' }}
            >
              <AttachFileRoundedIcon
                sx={{ transform: 'rotate(180deg)', color: 'black' }}
              />
            </IconButton>
            <IconButton
              aria-label="Advisor Options"
              sx={{ padding: '8px', borderRadius: '7px 10px' }}
            >
              <DropdownMenu isTextInput advisor={advisorType} />
            </IconButton>
          </Box>

          {isInteracting ? (
            <IconButton
              onClick={handleCancel}
              className={isInteracting ? 'interacting' : ''}
              sx={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
              }}
            >
              <StopCircleRounded
                className={'interactingIcon'}
                sx={{ color: '#0066CC' }}
              />
            </IconButton>
          ) : (userInputValue !== '' || files.length > 0) && !isListening ? (
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
