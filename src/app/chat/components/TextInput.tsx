import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import {
  Box,
  IconButton,
  TextareaAutosize,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import RotateRightRounded from '@mui/icons-material/RotateRightRounded';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import ChannelContentContext from './ChannelContentContext';
import { SendRounded, CloseRounded } from '@mui/icons-material';
import Image from 'next/image';
import pdfPreview from '@/assets/Images/Pdf Icon.svg';
import txtPerview from '@/assets/Images/Txt Icon.svg';
import imagePerview from '@/assets/Images/Image Icon.svg';
import docPerview from '@/assets/Images/Doc Icon.svg';
import DropdownMenu from './DropdownMenu';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [userInputValue, setUserInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<null | SpeechRecognition>(null);
  const [files, setFiles] = useState<{ file: File; preview: string | null }[]>(
    []
  );
  const { excute: submitUserInputs, isLoading: isInteracting } = useAxiosApi(
    apis.submitUserInputs
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const mappedFiles = droppedFiles.map((file) => ({ file, preview: null }));
    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
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
        return txtPerview;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return imagePerview;
      case 'doc':
      case 'docx':
      case 'xlsx':
      case 'xls':
        return docPerview;
      default:
        return imagePerview;
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
    setIsLoading(true);
    if (isInteracting) return;
    setChatResponses((prev) => [
      ...prev,
      {
        organizationChannelMessageType: 'USER',
        organizationChannelMessageContent: userInputValue,
        organizationChannelFiles: files,
      },
    ]);
    const response = await submitUserInputs({
      organizationId: '4aba77788ae94eca8d6ff330506af944',
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
          organizationChannelTitle: response?.data?.organizationChannelTitle,
        },
      ]);
      setSelectedChannelId(response?.data?.organizationChannelId);
      if (channelsMutate) {
        channelsMutate();
      }
      setUserInputValue('');
      setFiles([]);
      setIsLoading(false);
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
      if (e.key === 'Enter' && !e.shiftKey) {
        if (userInputValue.trim() !== '') {
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
            .map((result) => result[0].transcript)
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
          width: isMobile ? '90%' : '100%',
          maxWidth: '760px',
          maxHeight: '760px',
          minHeight: '108px',
          position: isMobile ? 'fixed' : 'relative',
          bottom: isMobile ? 0 : 'auto',
          backgroundColor: '#F5F5F5',
          borderRadius: 2,
          zIndex: isMobile ? 10 : '',
          margin: isMobile ? 3 : 0,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        }}
      >
        {files.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              padding: '8px',
              height: '180px',
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
                  src={file.preview ?? imagePerview}
                  alt={file.file.name}
                  width={48}
                  height={48}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  sx={{
                    mt: 1,
                    fontSize: '12px',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                  }}
                >
                  {file.file.name}
                </Box>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '0px',
                    left: '6px', // Adjusted for top-left placement
                    backgroundColor: 'red',
                    width: '16px', // Smaller size for the button
                    height: '16px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkred', // Optional hover effect
                    },
                  }}
                  onClick={() => handleRemoveFile(index)} // Your event handler
                >
                  <CloseRounded sx={{ fontSize: '14px' }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            paddingTop: '8px',
            paddingInline: '20px',
            overflowY: 'auto',
            maxHeight: '200px',
            minHeight: '40px',
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
            minRows={1}
            // maxRows={10}
            placeholder="傳訊息給智能顧問"
            style={{
              width: '100%',
              paddingTop: isMobile ? '20px' : '2px',
              paddingBottom: isMobile ? '20px' : '',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '16px',
              color: '#000',
              backgroundColor: '#F5F5F5',
              overflow: 'auto',
            }}
            value={userInputValue}
            onChange={handleOnChangeUserInput}
            onKeyDown={handleOnKeyDownUserInput}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            marginTop: '12px',
            justifyContent: 'space-between',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            padding: '22px',
            position: 'relative',
            bottom: '-4px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '16px',
            }}
          >
            <IconButton
              component="span"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                position: 'absolute',
                bottom: '12px',
                left: '10px',
              }}
            >
              <AttachFileRoundedIcon
                sx={{ transform: 'rotate(180deg)', color: 'black' }}
                onClick={() => document.getElementById('file-upload')?.click()}
              />
            </IconButton>
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: '12px',
                left: '49px',
                padding: '4px',
              }}
            >
              <DropdownMenu isTextInput advisor={advisorType} />
            </IconButton>
          </Box>

          {isLoading || isInteracting ? (
            <Box
              sx={{
                position: 'absolute',
                bottom: '12px',
                right: '10px',
              }}
            >
              <RotateRightRounded sx={{ color: '#1877F2', fontSize: 24 }} />
            </Box>
          ) : userInputValue !== '' && !isListening ? (
            <IconButton
              sx={{
                position: 'absolute',
                bottom: '12px',
                right: '10px',
              }}
              onClick={handleClickSubmitOrAudioFileUpload}
            >
              <SendRounded sx={{ color: 'black' }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleListening}
              className={isListening ? 'mic-listening' : ''}
              sx={{
                position: 'absolute',
                bottom: '12px',
                right: '10px',
              }}
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
