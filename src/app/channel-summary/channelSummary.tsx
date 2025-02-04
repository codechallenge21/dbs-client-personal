'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Tab,
  Box,
  Tabs,
  Card,
  Paper,
  Grid2,
  styled,
  Button,
  useTheme,
  Typography,
  IconButton,
  CardContent,
  useMediaQuery,
  TextareaAutosize,
  Tooltip,
  // CircularProgress,
} from '@mui/material';
import {
  Done as DoneIcon,
  MicRounded,
  SyncRounded,
  ReplayRounded,
  PushPinRounded,
  StarBorderRounded,
  ContentCopyRounded,
  PermIdentityRounded,
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ThumbDownOffAltRounded,
  SettingsInputComponentRounded,
  ArrowBackIosNewRounded,
  HistoryRounded,
  ArrowDropDownRounded,
} from '@mui/icons-material';
import { OrganizationChannel } from '@/interfaces/entities';
import { useAudioChannel } from '@/utils/hooks/useAudioChannel';
import { useRouter, useSearchParams } from 'next/navigation';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import UploadDialog from '@/components/uploadDialog/page';
import DataSourceDialog from '@/components/chat-page/components/chatDataStore';
import ReactMarkdown from 'react-markdown';
import EditDeleteModal from '@/components/dialogs/EditDeleteModal';
import RenameDialog from '@/components/chat-page/components/renameChat';
import DeleteConfirmationModal from '@/components/dialogs/DeleteConfirmationModal';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';

function TabPanel(props: {
  value: number;
  index: number;
  children: React.ReactNode;
}) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const dataRow1 = [
  {
    title: '延伸資料A',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
  {
    title: '延伸資料B',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
  {
    title: '延伸資料C',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
];

const dataRow2 = [
  {
    title: '延伸資料D',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
  {
    title: '延伸資料E',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
  {
    title: '延伸資料F',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
];
const dataRow3 = [
  {
    title: '延伸資料G',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
  {
    title: '延伸資料H',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
  {
    title: '延伸資料I',
    description:
      '社工在財務類別的知識中，了解如何幫助客戶管理個人財務是至關重要的。這不僅包括制定預算和儲蓄計劃',
  },
];

const ChannelSummary = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tabValue, setTabValue] = React.useState(0);
  const [selectedChannel, setSelectedChannel] =
    React.useState<OrganizationChannel | null>(null);
  const [openDataSource, setOpenDataSource] = useState(false);
  const [aIAnalysisTabValue, setAIAnalysisTabValue] = React.useState(0);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(!isMobile);
  const [openUpload, setOpenUpload] = React.useState(false);
  /**
   * @useSearchParams hook requires Suspense Boundary Component wrapping
   * Reference: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
   ** */
  const searchParams = useSearchParams();
  const organizationChannelId = searchParams.get('organizationChannelId') ?? '';
  const [copiedMessageId, setCopiedMessageId] = React.useState<string | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [openEditDeleteModal, setOpenEditDeleteModal] =
    useState<HTMLElement | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const {
    data: channel,
    mutate: mutateChannel,
    // isValidating: isloadingChannelData,
  } = useAudioChannel({
    organizationChannelId,
    organizationId: '4aba77788ae94eca8d6ff330506af944',
  });

  const copyPrompt = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMessageId(messageId);
        setTimeout(() => {
          setCopiedMessageId(null);
        }, 1000);
      },
      (err) => {
        console.error('Failed to copy to clipboard', err);
      }
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenEditDeleteModal(event.currentTarget);
  };
  const handleSave = (newName: string) => {
    console.log('New name:', newName);
  };

  const handleClose = () => {
    setOpenEditDeleteModal(null);
  };

  const handleConfirmDelete = useCallback(async () => {
    deleteChannel({
      organizationId: '4aba77788ae94eca8d6ff330506af944',
      organizationChannelId: organizationChannelId || '',
    })
      .then(() => {
        router.push('/toolbox');
        setIsDeleteDialogOpen(false);
      })
      .catch(() => {});
  }, [deleteChannel, organizationChannelId]);

  const handleEdit = () => {
    setIsRenameDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    const updateChannelData = async () => {
      if (channel) {
        if (channel?.organizationChannelTranscriptList.length > 0) {
          setSelectedChannel(channel);
        }
        // const isDataIncomplete =
        //   !channel.organizationChannelTranscriptList?.length;
        // console.log('channel', channel);

        // if (isDataIncomplete) {
        //   try {
        //     await mutateChannel();
        //   } catch (error) {
        //     console.error('Error re-fetching channel data:', error);
        //   }
        // } else {
        //   setSelectedChannel(channel);
        // }
      }
    };
    updateChannelData();
  }, [channel, mutateChannel]);

  const handleBackButtonClick = () => {
    router.push('/toolbox');
  };

  const handleAIAnalysisTabChange = (
    _: React.SyntheticEvent,
    newValue: number
  ) => {
    setAIAnalysisTabValue(newValue);
  };

  const handleCloseUploadDialog = () => {
    setOpenUpload(false);
  };

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            minHeight: '100vh',
            background: 'var(--Primary-, #EBE3DD)',
          }}
        >
          <ToolbarDrawer
            open={isOpenDrawer}
            setOpenUpload={setOpenUpload}
            setIsOpenDrawer={setIsOpenDrawer}
          >
            <Box
              sx={{
                minHeight: '97vh',
                maxHeight: '97vh',
                overflow: 'hidden',
                borderRadius: '8px',
                padding: '16px 32px',
                backgroundColor: 'white',
                width: openDataSource
                  ? isOpenDrawer
                    ? '73.5%'
                    : '76%'
                  : '100%',
              }}
            >
              {/* {isloadingChannelData ? (
          <Box
            sx={{
              top: '50%',
              left: '50%',
              display: 'flex',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : ( */}
              <>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{ mb: 2 }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: '#212B36',
                    },
                  }}
                >
                  <Tab
                    label="智能生活轉文字"
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #637381))',
                      '&.Mui-selected': {
                        color: 'var(--Primary-Black, #212B36)',
                      },
                    }}
                  />
                  <Tab
                    label="家系圖"
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #637381)',
                      '&.Mui-selected': {
                        color: 'var(--Primary-Black, #212B36)',
                      },
                    }}
                  />
                  <Tab
                    label="問答語音錄音"
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #637381)',
                      '&.Mui-selected': {
                        color: 'var(--Primary-Black, #212B36)',
                      },
                    }}
                  />
                  <Tab
                    label="個別與實時錄音"
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #637381)',
                      '&.Mui-selected': {
                        color: 'var(--Primary-Black, #212B36)',
                      },
                    }}
                  />
                </Tabs>
                <Box
                  sx={{
                    display: 'flex',
                    padding: '8px 16px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton onClick={handleBackButtonClick}>
                      <ArrowBackIosRounded sx={{ color: 'black' }} />
                    </IconButton>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        overflow: 'hidden',
                        fontStyle: 'normal',
                        fontFamily: 'Inter',
                        lineHeight: 'normal',
                        textOverflow: 'ellipsis',
                        color: 'var(--Text-Primary, #212B36)',
                      }}
                    >
                      {selectedChannel?.organizationChannelTitle}
                    </Typography>
                    <IconButton onClick={handleClick}>
                      <ArrowDropDownRounded sx={{ color: 'black' }} />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton>
                      <StarBorderRounded sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => setOpenDataSource(!openDataSource)}
                    >
                      <SettingsInputComponentRounded sx={{ color: 'black' }} />
                    </IconButton>
                  </Box>
                </Box>
                <Grid2 container sx={{ flex: 1, height: '100vh' }}>
                  <Grid2
                    size={{ xs: 5 }}
                    sx={{
                      overflowY: 'auto',
                      height: 'calc(100vh - 200px)',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        background: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        borderRadius: '10px',
                        background: '#888',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}
                  >
                    <Item>
                      <Paper
                        variant="outlined"
                        sx={{
                          padding: '16px 16px 16px 32px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: '24px',
                            textAlign: 'start',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            fontFamily: 'DFPHeiBold-B5',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                          gutterBottom
                        >
                          逐字稿
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: '16px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            原稿
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Tooltip
                              title={
                                copiedMessageId ===
                                selectedChannel
                                  ?.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptId
                                  ? 'Copied'
                                  : 'Copy'
                              }
                              placement="top"
                              arrow
                            >
                              <IconButton
                                onClick={() =>
                                  selectedChannel
                                    ?.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptId &&
                                  copyPrompt(
                                    selectedChannel
                                      ?.organizationChannelTranscriptList[0]
                                      ?.organizationChannelTranscriptContent,
                                    selectedChannel
                                      ?.organizationChannelTranscriptList[0]
                                      ?.organizationChannelTranscriptId
                                  )
                                }
                              >
                                {copiedMessageId ===
                                selectedChannel
                                  ?.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptId ? (
                                  <DoneIcon />
                                ) : (
                                  <ContentCopyRounded
                                    sx={{ color: '#212B36', fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                            <IconButton>
                              <ThumbDownOffAltRounded
                                sx={{
                                  color: 'black',
                                  transform: 'scale(-1, -1)',
                                }}
                              />
                            </IconButton>

                            <IconButton>
                              <ThumbDownOffAltRounded sx={{ color: 'black' }} />
                            </IconButton>
                          </Box>
                        </Box>
                        <ReactMarkdown>
                          {
                            selectedChannel
                              ?.organizationChannelTranscriptList[0]
                              ?.organizationChannelTranscriptContent
                          }
                        </ReactMarkdown>
                      </Paper>
                    </Item>
                  </Grid2>
                  <Grid2
                    size={{ xs: 7 }}
                    sx={{
                      overflowY: 'auto',
                      height: 'calc(100vh - 200px)',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        background: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        borderRadius: '10px',
                        background: '#888',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}
                  >
                    <Item>
                      <Paper
                        variant="outlined"
                        sx={{
                          padding: '16px 16px 16px 32px',
                        }}
                      >
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            minHeight: '33px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: '24px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {' '}
                            AI分析
                          </Typography>
                          {aIAnalysisTabValue === 1 && (
                            <Button
                              sx={{
                                gap: '8px',
                                color: 'white',
                                display: 'flex',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--Secondary-, #5C443A)',
                              }}
                              startIcon={<ReplayRounded />}
                            >
                              {' '}
                              重新整理
                            </Button>
                          )}
                        </Box>
                        <Tabs
                          value={aIAnalysisTabValue}
                          onChange={handleAIAnalysisTabChange}
                          TabIndicatorProps={{
                            style: {
                              backgroundColor: '#212B36',
                            },
                          }}
                        >
                          <Tab
                            label="摘要"
                            sx={{
                              fontWeight: 700,
                              fontSize: '14px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              // fontFamily: "Open Sans",
                              color: 'var(--Text-Secondary, #637381)',
                              '&.Mui-selected': {
                                color: 'var(--Text-Primary, #212B36)',
                              },
                            }}
                          />
                          <Tab
                            label="問問AI"
                            sx={{
                              fontWeight: 700,
                              fontSize: '14px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              // fontFamily: "Open Sans",
                              color: 'var(--Text-Secondary, #637381)',
                              '&.Mui-selected': {
                                color: 'var(--Text-Primary, #212B36)',
                              },
                            }}
                          />
                          <Tab
                            label="相關資料"
                            sx={{
                              fontWeight: 700,
                              fontSize: '14px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              // fontFamily: "Open Sans",
                              color: 'var(--Text-Secondary, #637381)',
                              '&.Mui-selected': {
                                color: 'var(--Text-Primary, #212B36)',
                              },
                            }}
                          />
                        </Tabs>
                        <TabPanel value={aIAnalysisTabValue} index={0}>
                          <Box
                            sx={{
                              mt: '10px',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                // alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Tooltip
                                title={
                                  copiedMessageId ===
                                  selectedChannel
                                    ?.organizationChannelMessageList[0]
                                    ?.organizationChannelMessageId
                                    ? 'Copied'
                                    : 'Copy'
                                }
                                placement="top"
                                arrow
                              >
                                <IconButton
                                  onClick={() =>
                                    selectedChannel
                                      ?.organizationChannelMessageList[0]
                                      ?.organizationChannelMessageContent &&
                                    selectedChannel
                                      ?.organizationChannelMessageList[0]
                                      ?.organizationChannelMessageId &&
                                    copyPrompt(
                                      selectedChannel
                                        ?.organizationChannelMessageList[0]
                                        ?.organizationChannelMessageContent,
                                      selectedChannel
                                        ?.organizationChannelMessageList[0]
                                        ?.organizationChannelMessageId
                                    )
                                  }
                                >
                                  {copiedMessageId ===
                                  selectedChannel
                                    ?.organizationChannelMessageList[0]
                                    ?.organizationChannelMessageId ? (
                                    <DoneIcon />
                                  ) : (
                                    <ContentCopyRounded
                                      sx={{ color: '#212B36', fontSize: 20 }}
                                    />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <IconButton>
                                <ThumbDownOffAltRounded
                                  sx={{
                                    color: 'black',
                                    transform: 'scale(-1, -1)',
                                  }}
                                />
                              </IconButton>
                              <IconButton>
                                <ThumbDownOffAltRounded
                                  sx={{ color: 'black' }}
                                />
                              </IconButton>
                              <IconButton>
                                <SyncRounded sx={{ color: 'black' }} />
                              </IconButton>
                            </Box>
                          </Box>
                          <ReactMarkdown>
                            {
                              selectedChannel?.organizationChannelMessageList[0]
                                ?.organizationChannelMessageContent
                            }
                          </ReactMarkdown>
                        </TabPanel>
                        <TabPanel value={aIAnalysisTabValue} index={1}>
                          <Box
                            sx={{
                              padding: '0px 32px',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                mt: '23px',
                                height: '72px',
                                display: 'flex',
                                maxWidth: '760px',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <Box
                                sx={{
                                  gap: '16px',
                                  height: '72px',
                                  display: 'flex',
                                  padding: '16px',
                                  borderRadius: '8px',
                                  alignItems: 'center',
                                  background:
                                    'var(--Secondary-Lite-Gray, #F5F5F5)',
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <PermIdentityRounded
                                    sx={{
                                      width: '30px',
                                      height: '30px',
                                      color: 'white',
                                      borderRadius: '50px',
                                      background: '#5C443A',
                                    }}
                                  />
                                </Box>
                                <Typography variant="body1">
                                  我要協助個案擺脫負債，我應該怎麼做會比較好?
                                </Typography>
                              </Box>
                            </Box>
                            <Typography
                              sx={{
                                mt: '10px',
                              }}
                            >
                              此專案的目標是透過提供一個線上平台來協助弱勢家庭改善財務狀況，並最終促進整體社會的福祉。
                              社會效益方面，此專案旨在： 改善家庭財務健康：
                              藉由提供財務知識、工具和資源，協助家庭更有效地管理財務，避免陷入債務困境。
                              減少社會問題：
                              透過改善家庭財務狀況，可以減少貧窮、隔代教養等社會問題。
                              提升社會工作效能：
                              平台可以協助社工更有效率地處理個案，並提供更精準的協助。
                              促進知識普及：
                              平台可以作為一個知識庫，讓大眾更容易取得相關資訊。
                              商業目標方面，此專案期望： 建立可持續營運模式：
                              透過與政府或企業合作，以及發展多元服務，確保平台的長期營運。
                              拓展國際市場：
                              將平台推廣至其他華人社會，甚至全球市場。
                              提升台灣IT和服務能力的國際能見度：
                              透過與新加坡政府的合作，展現台灣的技術實力和服務品質。
                              此專案的設計理念是將社會效益與商業目標緊密結合。透過解決社會問題，平台可以獲得更多使用者和支持，進而提升其影響力和商業價值。同時，商業上的成功可以確保平台的永續經營，使其能夠持續為社會帶來正面的影響。
                              專案團隊相信，透過科技和創新，可以有效地解決社會問題，並創造商業價值。
                              他們希望這個平台能夠成為一個典範，證明社會企業可以兼顧社會責任和商業成功。
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <IconButton>
                                  <ContentCopyRounded sx={{ color: 'black' }} />
                                </IconButton>
                                <IconButton>
                                  <ThumbDownOffAltRounded
                                    sx={{
                                      color: 'black',
                                      transform: 'scale(-1, -1)',
                                    }}
                                  />
                                </IconButton>
                                <IconButton>
                                  <ThumbDownOffAltRounded
                                    sx={{ color: 'black' }}
                                  />
                                </IconButton>
                                <IconButton>
                                  <PushPinRounded sx={{ color: 'black' }} />
                                </IconButton>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                width: '100%',
                                display: 'flex',
                                borderRadius: '8px',
                                alignSelf: 'stretch',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                background: 'var(--Primary-, #EBE3DD)',
                              }}
                            >
                              <Box
                                sx={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '8px 16px 8px 20px',
                                  borderRadius: '0px 16px 0px 0px',
                                  background: 'var(--Primary-, #EBE3DD)',
                                }}
                              >
                                <TextareaAutosize
                                  minRows={1}
                                  maxRows={10}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    border: 'none',
                                    resize: 'none',
                                    outline: 'none',
                                    display: 'flex',
                                    fontWeight: 400,
                                    overflow: 'auto',
                                    fontSize: '16px',
                                    minHeight: '40px',
                                    maxHeight: '198px',
                                    fontStyle: 'normal',
                                    alignItems: 'center',
                                    alignSelf: 'stretch',
                                    whiteSpace: 'nowrap',
                                    lineHeight: 'normal',
                                    textOverflow: 'ellipsis',
                                    fontFamily: 'DFPHeiBold-B5',
                                    background: 'var(--Primary-, #EBE3DD)',
                                  }}
                                  placeholder="問問AI"
                                />
                                <MicRounded
                                  sx={{
                                    color: 'black',
                                    marginLeft: '8px',
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </TabPanel>
                        <TabPanel value={aIAnalysisTabValue} index={2}>
                          <Grid2 container spacing={2} direction="column">
                            <Grid2
                              container
                              direction="column"
                              spacing={2}
                              sx={{
                                display: 'flex',
                                overflowX: 'auto',
                              }}
                            >
                              <Typography
                                sx={{
                                  mt: '10px',
                                  fontWeight: 400,
                                  fontSize: '24px',
                                  textAlign: 'start',
                                  fontStyle: 'normal',
                                  lineHeight: 'normal',
                                  fontFamily: 'DFPHeiBold-B5',
                                  color: 'var(--Primary-Black, #212B36)',
                                }}
                                gutterBottom
                              >
                                類別
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  overflowX: 'auto',
                                  '&::-webkit-scrollbar': {
                                    height: '8px',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'transparent',
                                  },
                                }}
                              >
                                {dataRow1.map((item, index) => (
                                  <Card
                                    key={index}
                                    sx={{
                                      gap: '20px',
                                      width: '300px',
                                      height: '146px',
                                      padding: '16px',
                                      display: 'flex',
                                      minWidth: '300px',
                                      maxWidth: '384px',
                                      maxHeight: '146px',
                                      borderRadius: '8px',
                                      flexDirection: 'column',
                                      alignItems: 'flex-start',
                                      background: 'var(--Primary-, #EBE3DD)',
                                      marginRight: '16px',
                                    }}
                                  >
                                    <CardContent sx={{ padding: '0px' }}>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: '24px',
                                            textAlign: 'start',
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            lineHeight: 'normal',
                                            color:
                                              'var(--Primary-Black, #212B36)',
                                          }}
                                        >
                                          {item.title}
                                        </Typography>
                                        <IconButton sx={{ padding: '0px' }}>
                                          <ArrowForwardIosRounded
                                            sx={{
                                              width: '16px',
                                              height: '16px',
                                              color: 'black',
                                            }}
                                          />
                                        </IconButton>
                                      </Box>
                                      <Typography
                                        sx={{
                                          mt: '20px',
                                          fontWeight: 400,
                                          fontSize: '16px',
                                          overflow: 'hidden',
                                          fontStyle: 'normal',
                                          lineHeight: 'normal',
                                          fontFamily: 'Open Sans',
                                          textOverflow: 'ellipsis',
                                          color:
                                            'var(--Primary-Black, #212B36)',
                                        }}
                                      >
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                ))}
                              </Box>
                            </Grid2>

                            <Grid2
                              container
                              direction="column"
                              spacing={2}
                              sx={{
                                display: 'flex',
                                overflowX: 'auto',
                              }}
                            >
                              <Typography
                                sx={{
                                  mt: '10px',
                                  fontWeight: 400,
                                  fontSize: '24px',
                                  textAlign: 'start',
                                  fontStyle: 'normal',
                                  lineHeight: 'normal',
                                  fontFamily: 'DFPHeiBold-B5',
                                  color: 'var(--Primary-Black, #212B36)',
                                }}
                                gutterBottom
                              >
                                類別
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  overflowX: 'auto',
                                  '&::-webkit-scrollbar': {
                                    height: '8px',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'transparent',
                                  },
                                }}
                              >
                                {dataRow2.map((item, index) => (
                                  <Card
                                    key={index}
                                    sx={{
                                      gap: '20px',
                                      width: '300px',
                                      height: '146px',
                                      padding: '16px',
                                      display: 'flex',
                                      minWidth: '300px',
                                      maxWidth: '384px',
                                      maxHeight: '146px',
                                      borderRadius: '8px',
                                      flexDirection: 'column',
                                      alignItems: 'flex-start',
                                      background: 'var(--Primary-, #EBE3DD)',
                                      marginRight: '16px',
                                    }}
                                  >
                                    <CardContent sx={{ padding: '0px' }}>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: '24px',
                                            textAlign: 'start',
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            lineHeight: 'normal',
                                            color:
                                              'var(--Primary-Black, #212B36)',
                                          }}
                                        >
                                          {item.title}
                                        </Typography>
                                        <IconButton sx={{ padding: '0px' }}>
                                          <ArrowForwardIosRounded
                                            sx={{
                                              width: '16px',
                                              height: '16px',
                                              color: 'black',
                                            }}
                                          />
                                        </IconButton>
                                      </Box>
                                      <Typography
                                        sx={{
                                          mt: '20px',
                                          fontWeight: 400,
                                          fontSize: '16px',
                                          overflow: 'hidden',
                                          fontStyle: 'normal',
                                          lineHeight: 'normal',
                                          fontFamily: 'Open Sans',
                                          textOverflow: 'ellipsis',
                                          color:
                                            'var(--Primary-Black, #212B36)',
                                        }}
                                      >
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                ))}
                              </Box>
                            </Grid2>

                            <Grid2
                              container
                              direction="column"
                              spacing={2}
                              sx={{
                                display: 'flex',
                                overflowX: 'auto',
                              }}
                            >
                              <Typography
                                sx={{
                                  mt: '10px',
                                  fontWeight: 400,
                                  fontSize: '24px',
                                  textAlign: 'start',
                                  fontStyle: 'normal',
                                  lineHeight: 'normal',
                                  fontFamily: 'DFPHeiBold-B5',
                                  color: 'var(--Primary-Black, #212B36)',
                                }}
                                gutterBottom
                              >
                                類別
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  overflowX: 'auto',
                                  '&::-webkit-scrollbar': {
                                    height: '8px',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'transparent',
                                  },
                                }}
                              >
                                {dataRow3.map((item, index) => (
                                  <Card
                                    key={index}
                                    sx={{
                                      gap: '20px',
                                      width: '300px',
                                      height: '146px',
                                      padding: '16px',
                                      display: 'flex',
                                      minWidth: '300px',
                                      maxWidth: '384px',
                                      maxHeight: '146px',
                                      borderRadius: '8px',
                                      flexDirection: 'column',
                                      alignItems: 'flex-start',
                                      background: 'var(--Primary-, #EBE3DD)',
                                      marginRight: '16px',
                                    }}
                                  >
                                    <CardContent sx={{ padding: '0px' }}>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: '24px',
                                            textAlign: 'start',
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            lineHeight: 'normal',
                                            color:
                                              'var(--Primary-Black, #212B36)',
                                          }}
                                        >
                                          {item.title}
                                        </Typography>
                                        <IconButton sx={{ padding: '0px' }}>
                                          <ArrowForwardIosRounded
                                            sx={{
                                              width: '16px',
                                              height: '16px',
                                              color: 'black',
                                            }}
                                          />
                                        </IconButton>
                                      </Box>
                                      <Typography
                                        sx={{
                                          mt: '20px',
                                          fontWeight: 400,
                                          fontSize: '16px',
                                          overflow: 'hidden',
                                          fontStyle: 'normal',
                                          lineHeight: 'normal',
                                          fontFamily: 'Open Sans',
                                          textOverflow: 'ellipsis',
                                          color:
                                            'var(--Primary-Black, #212B36)',
                                        }}
                                      >
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                ))}
                              </Box>
                            </Grid2>
                          </Grid2>
                        </TabPanel>
                      </Paper>
                    </Item>
                  </Grid2>
                </Grid2>
              </>
              {/* )} */}
              <UploadDialog
                open={openUpload}
                onClose={handleCloseUploadDialog}
              />
            </Box>
          </ToolbarDrawer>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            height: '100vh',
            overflowY: 'auto',
            background: 'var(--Primary-, #FFFFFF)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignSelf: 'stretch',
              alignItems: 'center',
              padding: '8px 16px 8px 0px',
            }}
          >
            <IconButton
              sx={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={handleBackButtonClick}
            >
              <ArrowBackIosNewRounded sx={{ color: '#212B36' }} />
            </IconButton>
            <Box
              sx={{
                flex: '1 0 0',
                height: '40px',
                display: 'flex',
                minHeight: '32px',
                alignItems: 'center',
                padding: '4px 0px 4px 8px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  overflow: 'hidden',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  textOverflow: 'ellipsis',
                  color: 'var(--Text-Primary, #212B36)',
                }}
              >
                {selectedChannel?.organizationChannelTitle}
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleClick}>
                <ArrowDropDownRounded />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <StarBorderRounded sx={{ color: '#212B36' }} />
              </IconButton>
              <IconButton>
                <HistoryRounded sx={{ color: '#212B36' }} />
              </IconButton>
              <IconButton>
                <SettingsInputComponentRounded sx={{ color: '#212B36' }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ padding: '16px' }}>
            <Typography
              sx={{
                mb: '10px',
                fontWeight: 400,
                fontSize: '24px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              逐字稿
            </Typography>
            <Box
              sx={{
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                <Tooltip
                  title={
                    copiedMessageId ===
                    selectedChannel?.organizationChannelTranscriptList[0]
                      ?.organizationChannelTranscriptId
                      ? 'Copied'
                      : 'Copy'
                  }
                  placement="top"
                  arrow
                >
                  <IconButton
                    onClick={() =>
                      selectedChannel?.organizationChannelTranscriptList[0]
                        ?.organizationChannelTranscriptId &&
                      copyPrompt(
                        selectedChannel?.organizationChannelTranscriptList[0]
                          ?.organizationChannelTranscriptContent,
                        selectedChannel?.organizationChannelTranscriptList[0]
                          ?.organizationChannelTranscriptId
                      )
                    }
                  >
                    {copiedMessageId ===
                    selectedChannel?.organizationChannelTranscriptList[0]
                      ?.organizationChannelTranscriptId ? (
                      <DoneIcon />
                    ) : (
                      <ContentCopyRounded
                        sx={{ color: '#212B36', fontSize: 20 }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <IconButton>
                  <ThumbDownOffAltRounded
                    sx={{
                      color: '#212B36',
                      transform: 'scale(-1, -1)',
                    }}
                  />
                </IconButton>
                <IconButton>
                  <ThumbDownOffAltRounded sx={{ color: '#212B36' }} />
                </IconButton>
              </Box>
            </Box>
            <ReactMarkdown>
              {
                selectedChannel?.organizationChannelTranscriptList[0]
                  ?.organizationChannelTranscriptContent
              }
            </ReactMarkdown>
          </Box>
          <Box sx={{ padding: '16px' }}>
            <Box
              sx={{
                display: 'flex',
                minHeight: '33px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '24px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Primary-Black, #212B36)',
                }}
              >
                AI分析
              </Typography>
              {aIAnalysisTabValue === 1 && (
                <Button
                  sx={{
                    gap: '8px',
                    color: 'white',
                    display: 'flex',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--Secondary-, #5C443A)',
                  }}
                  startIcon={<ReplayRounded />}
                >
                  {' '}
                  重新整理
                </Button>
              )}
            </Box>

            <Tabs
              value={aIAnalysisTabValue}
              onChange={handleAIAnalysisTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#212B36',
                },
              }}
            >
              <Tab
                label="摘要"
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'Open Sans',
                  color: 'var(--Text-Secondary, #637381)',
                  '&.Mui-selected': {
                    color: 'var(--Text-Primary, #212B36)',
                  },
                }}
              />
              <Tab
                label="問問AI"
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'Open Sans',
                  color: 'var(--Text-Secondary, #637381)',
                  '&.Mui-selected': {
                    color: 'var(--Text-Primary, #212B36)',
                  },
                }}
              />
              <Tab
                label="相關資料"
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'Open Sans',
                  color: 'var(--Text-Secondary, #637381)',
                  '&.Mui-selected': {
                    color: 'var(--Text-Primary, #212B36)',
                  },
                }}
              />
            </Tabs>

            <TabPanel value={aIAnalysisTabValue} index={0}>
              <Box
                sx={{
                  mt: '10px',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Primary-Black, #212B36)',
                  }}
                >
                  總結
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Tooltip
                    title={
                      copiedMessageId ===
                      selectedChannel?.organizationChannelMessageList[0]
                        ?.organizationChannelMessageId
                        ? 'Copied'
                        : 'Copy'
                    }
                    placement="top"
                    arrow
                  >
                    <IconButton
                      onClick={() =>
                        selectedChannel?.organizationChannelMessageList[0]
                          ?.organizationChannelMessageContent &&
                        selectedChannel?.organizationChannelMessageList[0]
                          ?.organizationChannelMessageId &&
                        copyPrompt(
                          selectedChannel?.organizationChannelMessageList[0]
                            ?.organizationChannelMessageContent,
                          selectedChannel?.organizationChannelMessageList[0]
                            ?.organizationChannelMessageId
                        )
                      }
                    >
                      {copiedMessageId ===
                      selectedChannel?.organizationChannelMessageList[0]
                        ?.organizationChannelMessageId ? (
                        <DoneIcon />
                      ) : (
                        <ContentCopyRounded
                          sx={{ color: '#212B36', fontSize: 20 }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  <IconButton>
                    <ThumbDownOffAltRounded
                      sx={{
                        color: 'black',
                        transform: 'scale(-1, -1)',
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    <ThumbDownOffAltRounded sx={{ color: 'black' }} />
                  </IconButton>
                  <IconButton>
                    <SyncRounded sx={{ color: 'black' }} />
                  </IconButton>
                </Box>
              </Box>
              <ReactMarkdown>
                {
                  selectedChannel?.organizationChannelMessageList[0]
                    ?.organizationChannelMessageContent
                }
              </ReactMarkdown>
            </TabPanel>
            <TabPanel value={aIAnalysisTabValue} index={1}>
              <Box
                sx={{
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    mt: '23px',
                    height: '72px',
                    display: 'flex',
                    maxWidth: '760px',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      gap: '16px',
                      height: '72px',
                      display: 'flex',
                      padding: '16px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      background: 'var(--Secondary-Lite-Gray, #F5F5F5)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PermIdentityRounded
                        sx={{
                          width: '30px',
                          height: '30px',
                          color: 'white',
                          borderRadius: '50px',
                          background: '#5C443A',
                        }}
                      />
                    </Box>
                    <Typography variant="body1">
                      我要協助個案擺脫負債，我應該怎麼做會比較好?
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    mt: '10px',
                  }}
                >
                  此專案的目標是透過提供一個線上平台來協助弱勢家庭改善財務狀況，並最終促進整體社會的福祉。
                  社會效益方面，此專案旨在： 改善家庭財務健康：
                  藉由提供財務知識、工具和資源，協助家庭更有效地管理財務，避免陷入債務困境。
                  減少社會問題：
                  透過改善家庭財務狀況，可以減少貧窮、隔代教養等社會問題。
                  提升社會工作效能：
                  平台可以協助社工更有效率地處理個案，並提供更精準的協助。
                  促進知識普及：
                  平台可以作為一個知識庫，讓大眾更容易取得相關資訊。
                  商業目標方面，此專案期望： 建立可持續營運模式：
                  透過與政府或企業合作，以及發展多元服務，確保平台的長期營運。
                  拓展國際市場： 將平台推廣至其他華人社會，甚至全球市場。
                  提升台灣IT和服務能力的國際能見度：
                  透過與新加坡政府的合作，展現台灣的技術實力和服務品質。
                  此專案的設計理念是將社會效益與商業目標緊密結合。透過解決社會問題，平台可以獲得更多使用者和支持，進而提升其影響力和商業價值。同時，商業上的成功可以確保平台的永續經營，使其能夠持續為社會帶來正面的影響。
                  專案團隊相信，透過科技和創新，可以有效地解決社會問題，並創造商業價值。
                  他們希望這個平台能夠成為一個典範，證明社會企業可以兼顧社會責任和商業成功。
                </Typography>
                <Box
                  sx={{
                    mt: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <IconButton>
                      <ContentCopyRounded sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton>
                      <ThumbDownOffAltRounded
                        sx={{
                          color: 'black',
                          transform: 'scale(-1, -1)',
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <ThumbDownOffAltRounded sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton>
                      <PushPinRounded sx={{ color: 'black' }} />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: '16px',
                    width: '100%',
                    display: 'flex',
                    borderRadius: '8px',
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    background: 'var(--Primary-, #EBE3DD)',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 16px 8px 20px',
                      borderRadius: '0px 16px 0px 0px',
                      background: 'var(--Primary-, #EBE3DD)',
                    }}
                  >
                    <TextareaAutosize
                      minRows={1}
                      maxRows={10}
                      style={{
                        width: '100%',
                        color: 'black',
                        border: 'none',
                        resize: 'none',
                        outline: 'none',
                        display: 'flex',
                        fontWeight: 400,
                        overflow: 'auto',
                        fontSize: '16px',
                        minHeight: '40px',
                        maxHeight: '198px',
                        fontStyle: 'normal',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        whiteSpace: 'nowrap',
                        lineHeight: 'normal',
                        textOverflow: 'ellipsis',
                        fontFamily: 'DFPHeiBold-B5',
                        background: 'var(--Primary-, #EBE3DD)',
                      }}
                      placeholder="問問AI"
                    />
                    <MicRounded
                      sx={{
                        color: 'black',
                        marginLeft: '8px',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={aIAnalysisTabValue} index={2}>
              <Grid2 container spacing={2} direction="column">
                <Grid2
                  container
                  direction="column"
                  spacing={2}
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                  }}
                >
                  <Typography
                    sx={{
                      mt: '10px',
                      mb: '10px',
                      fontWeight: 400,
                      fontSize: '24px',
                      textAlign: 'start',
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-Black, #212B36)',
                    }}
                    gutterBottom
                  >
                    類別
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': {
                        height: '8px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {dataRow1.map((item, index) => (
                      <Card
                        key={index}
                        sx={{
                          gap: '20px',
                          width: '300px',
                          height: '146px',
                          padding: '16px',
                          display: 'flex',
                          minWidth: '300px',
                          maxWidth: '384px',
                          maxHeight: '146px',
                          borderRadius: '8px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          background: 'var(--Primary-, #EBE3DD)',
                          marginRight: '16px',
                        }}
                      >
                        <CardContent sx={{ padding: '0px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: '24px',
                                textAlign: 'start',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <IconButton sx={{ padding: '0px' }}>
                              <ArrowForwardIosRounded
                                sx={{
                                  width: '16px',
                                  height: '16px',
                                  color: 'black',
                                }}
                              />
                            </IconButton>
                          </Box>
                          <Typography
                            sx={{
                              mt: '20px',
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'Open Sans',
                              textOverflow: 'ellipsis',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Grid2>

                <Grid2
                  container
                  direction="column"
                  spacing={2}
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                  }}
                >
                  <Typography
                    sx={{
                      mt: '10px',
                      fontWeight: 400,
                      fontSize: '24px',
                      textAlign: 'start',
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-Black, #212B36)',
                    }}
                    gutterBottom
                  >
                    類別
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': {
                        height: '8px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {dataRow2.map((item, index) => (
                      <Card
                        key={index}
                        sx={{
                          gap: '20px',
                          width: '300px',
                          height: '146px',
                          padding: '16px',
                          display: 'flex',
                          minWidth: '300px',
                          maxWidth: '384px',
                          maxHeight: '146px',
                          borderRadius: '8px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          background: 'var(--Primary-, #EBE3DD)',
                          marginRight: '16px',
                        }}
                      >
                        <CardContent sx={{ padding: '0px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: '24px',
                                textAlign: 'start',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <IconButton sx={{ padding: '0px' }}>
                              <ArrowForwardIosRounded
                                sx={{
                                  width: '16px',
                                  height: '16px',
                                  color: 'black',
                                }}
                              />
                            </IconButton>
                          </Box>
                          <Typography
                            sx={{
                              mt: '20px',
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'Open Sans',
                              textOverflow: 'ellipsis',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Grid2>

                <Grid2
                  container
                  direction="column"
                  spacing={2}
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                  }}
                >
                  <Typography
                    sx={{
                      mt: '10px',
                      fontWeight: 400,
                      fontSize: '24px',
                      textAlign: 'start',
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-Black, #212B36)',
                    }}
                    gutterBottom
                  >
                    類別
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': {
                        height: '8px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {dataRow3.map((item, index) => (
                      <Card
                        key={index}
                        sx={{
                          gap: '20px',
                          width: '300px',
                          height: '146px',
                          padding: '16px',
                          display: 'flex',
                          minWidth: '300px',
                          maxWidth: '384px',
                          maxHeight: '146px',
                          borderRadius: '8px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          background: 'var(--Primary-, #EBE3DD)',
                          marginRight: '16px',
                        }}
                      >
                        <CardContent sx={{ padding: '0px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: '24px',
                                textAlign: 'start',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <IconButton sx={{ padding: '0px' }}>
                              <ArrowForwardIosRounded
                                sx={{
                                  width: '16px',
                                  height: '16px',
                                  color: 'black',
                                }}
                              />
                            </IconButton>
                          </Box>
                          <Typography
                            sx={{
                              mt: '20px',
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'Open Sans',
                              textOverflow: 'ellipsis',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Grid2>
              </Grid2>
            </TabPanel>
          </Box>
        </Box>
      )}
      <DataSourceDialog
        open={openDataSource}
        onClose={() => setOpenDataSource(false)}
      />
      <DeleteConfirmationModal
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleConfirmDelete}
        channelName={
          selectedChannel
            ? [
                {
                  ...selectedChannel,
                  organizationChannelId:
                    selectedChannel?.organizationChannelId || '',
                  selected: true,
                  organization: selectedChannel?.organization || {},
                },
              ]
            : []
        }
      />
      <EditDeleteModal
        anchorEl={openEditDeleteModal}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <RenameDialog
        open={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        onSave={handleSave}
        initialName=""
      />
    </>
  );
};

export default ChannelSummary;
