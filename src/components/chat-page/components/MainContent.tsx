import ChannelContentContext from '@/context/ChannelContentContext';
import {
  OrganizationChannel,
  OrganizationChannelData,
} from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import ChannelMessagePanel from '../../channel-message-panel/ChannelMessagePanel';
import HistoryChats from './HistoryChats';
import {
  TextInput,
  MAX_FILES,
  MAX_FILE_SIZE,
  allowedExtensions,
} from './TextInput';
import ViewChats from './viewChats';
import { customScrollbarStyle } from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { useDropzone } from 'react-dropzone';
import { SnackbarContext } from '@/context/SnackbarContext';
import { AxiosRequestConfig } from 'axios';

interface MainContentProps {
  chatsData?: OrganizationChannel[];
}

const MainContent: React.FC<MainContentProps> = ({ chatsData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const {
    selectedChannelId,
    selectedChannel,
    chatResponses,
    setSelectedChannel,
  } = useContext(ChannelContentContext);
  const [files, setFiles] = useState<{ file: File; preview: string | null }[]>(
    []
  );
  const { excute: submitUserInputs, isLoading: isInteracting } = useAxiosApi(
    apis.submitUserInputs
  );
  const { excute: chatWithFiles, isLoading: isInteractingwithfile } =
    useAxiosApi(apis.chatWithFiles);

  const moveToChannelDetail = (channel: OrganizationChannelData) => {
    setSelectedChannel(channel);
    const searchParams = new URLSearchParams({
      organizationChannelId: channel.organizationChannelId,
    });

    router.push(`/chat?${searchParams.toString()}`);
  };

  const boxRef = useRef<HTMLDivElement>(null);

  const { showSnackbar } = useContext(SnackbarContext);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles[0]) {
      if (files.length + acceptedFiles.length > MAX_FILES) {
        showSnackbar(`您一次最多只能上傳 ${MAX_FILES} 個檔案。`, 'error');
        return;
      }

      for (const file of acceptedFiles) {
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

      const mappedFiles = acceptedFiles.map((file) => ({
        file,
        preview: null,
      }));
      setFiles((prev) => [...prev, ...mappedFiles]);
    }
  };

  const handleDropRejected = (fileRejections: any[]) => {
    showSnackbar('檔案格式錯誤或檔案大小超過 300MB 限制', 'error');
  };

  const allowedExtensionsObj = allowedExtensions.reduce((acc, ext) => {
    acc[`.${ext}`] = [];
    return acc;
  }, {} as { [key: string]: string[] });

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: allowedExtensionsObj,
    maxSize: MAX_FILE_SIZE,
  });

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [selectedChannel, chatResponses]);

  if (selectedChannel || selectedChannelId || chatResponses.length) {
    return (
      <Box
        sx={{
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: '16px',
          justifyContent: isMobile ? 'flex-end' : 'center',
          marginTop: '56px',
          width: '100%',
          borderLeft: '1px solid #F5F5F5',
        }}
      >
        <Box
          ref={boxRef}
          sx={{
            width: '100%',
            height: 'calc(100vh - 105px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            paddingX: { xs: '16px', md: '24px' },
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              ...customScrollbarStyle,
            }}
          >
            <ChannelMessagePanel
              channel={selectedChannel}
              chatResponses={chatResponses}
              isInteracting={isInteracting || isInteractingwithfile}
            />
          </Box>
          <Box>
            <TextInput
              from={'mainContent'}
              submitUserInputs={submitUserInputs}
              isInteracting={isInteracting}
              files={files}
              setFiles={setFiles}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  const paddingTop = (() => {
    if (isMobile) {
      return chatsData && chatsData.length > 0 ? '40vh' : '10vh';
    }
    return chatsData && chatsData.length > 0 ? '15vh' : '0vh';
  })();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        minHeight: 0,
        overflow: 'auto',
        justifyContent: 'center',
        pt: paddingTop,
        borderLeft: '1px solid #F5F5F5',
        px: { xs: '16px', md: '24px' },
        ...(isDragActive && { backgroundColor: '#e0f7fa' }),
      }}
      {...getRootProps()}
    >
      <Typography
        sx={{
          mb: '24px',
          color: '#000',
          fontSize: '32px',
          fontWeight: '400',
          overflow: 'visible',
          fontFamily: 'var(--font-bold)',
          textAlign: 'center',
          ...(isDragActive && { color: '#9e9e9e' }),
        }}
      >
        嗨！我能為您做些什麼？
      </Typography>
      <TextInput
        chatWithFiles={chatWithFiles}
        submitUserInputs={submitUserInputs}
        isInteracting={isInteracting}
        files={files}
        setFiles={setFiles}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: '24px',
          gap: '16px',
          flexWrap: 'wrap',
          maxWidth: '760px',
          width: '100%',
        }}
      >
        {/* {SuggestionsData.map((suggestion) => (
          <Suggestions key={suggestion.id} title={suggestion.title} />
        ))} */}
      </Box>
      <Box
        sx={{
          marginTop: isMobile ? '32px' : '40px',
          width: '100%',
          maxWidth: '760px',
        }}
      >
        <ViewChats
          onClick={() => {
            router.push('/allchat');
          }}
        />
      </Box>
      <Box sx={{ marginTop: '12px', width: '100%', maxWidth: '760px' }}>
        <HistoryChats
          chats={chatsData || []}
          moveToChannelDetail={moveToChannelDetail}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
