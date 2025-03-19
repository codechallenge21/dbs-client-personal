'use client';
import DataSourceDialog from '@/components/dialogs/ChatDataStore';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import EditDialog from '@/components/dialogs/EditDialog';
import EditableItem from '@/components/editable-item/EditableItem';
import ToolbarDrawer, {
  customScrollbarStyle,
} from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { OrganizationChannel } from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import { useAudioChannel } from '@/utils/hooks/useAudioChannel';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import {
  ArrowBackIosNewRounded,
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ContentCopyRounded,
  Done as DoneIcon,
  MicRounded,
  PermIdentityRounded,
  ReplayRounded,
  SyncRounded,
  ThumbDownAltRounded,
  ThumbDownOffAltRounded,
  ThumbUpAltRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Paper,
  styled,
  Tab,
  Tabs,
  TextareaAutosize,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PositiveFeedbackModal from '@/components/dialogs/PositiveFeedbackModal';
import NegativeFeedbackModal from '@/components/dialogs/NegativeFeedbackModal';

function TabPanel(props: {
  readonly value: number;
  readonly index: number;
  readonly children: React.ReactNode;
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

// Create a separate component that uses useSearchParams
const ChannelSummaryContent = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const searchParams = useSearchParams();
  const organizationChannelId = searchParams.get('organizationChannelId') ?? '';

  const [tabValue, setTabValue] = React.useState(0);
  const [selectedChannel, setSelectedChannel] =
    React.useState<OrganizationChannel | null>(null);
  const [openDataSource, setOpenDataSource] = useState(false);
  const [aIAnalysisTabValue, setAIAnalysisTabValue] = React.useState(0);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(!isMobile);
  const [copiedMessageId, setCopiedMessageId] = React.useState<string | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, string>>({});
  const [openPositiveFeedbackModal, setOpenPositiveFeedbackModal] =
    useState(false);
  const [openNegativeFeedbackModal, setOpenNegativeFeedbackModal] =
    useState(false);
  const [activeTargetId, setActiveTargetId] = useState<string | null>(null);
  const [feedbackTarget, setFeedbackTarget] = useState<string>('');
  const { excute: submitFeedback } = useAxiosApi(apis.addUserFeedback);
  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);
  const { excute: ApiRegenerateSummary, isLoading } = useAxiosApi(
    apis.ApiRegenerateSummary
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setOpenPositiveFeedbackModal(false);
    setOpenNegativeFeedbackModal(false);
  };

  const {
    data: channel,
    mutate: mutateChannel,
    // isValidating: isloadingChannelData,
  } = useAudioChannel({
    organizationChannelId,
    organizationId: 'yMJHyi6R1CB9whpdNvtA',
  });

  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);

  const copyPrompt = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMessageId(messageId);
        setTimeout(() => {
          setCopiedMessageId(null);
        }, 1000);
      },
      (err) => {
        console.error('複製失敗', err);
      }
    );
  };

  const handleCloseToolsMenu = useCallback(() => {
    setToolsAnchor(null);
    setActiveIndex(null);
  }, []);

  const handleDeleteChannelOpenConfirmDialog = useCallback(
    (event: React.MouseEvent) => {
      setToolsAnchor(null);
      event.stopPropagation();
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleCloseDeleteDialog = useCallback((event: React.MouseEvent) => {
    setToolsAnchor(null);
    event.stopPropagation();
    setIsDeleteDialogOpen(false);
  }, []);

  const handleDeleteChannelConfirm = useCallback(
    async (event: React.MouseEvent) => {
      event.stopPropagation();
      deleteChannel({
        organizationId: 'yMJHyi6R1CB9whpdNvtA',
        organizationChannelId: organizationChannelId || '',
      })
        .then(() => {
          router.push('/toolbox');
          setIsDeleteDialogOpen(false);
          handleCloseToolsMenu();
        })
        .catch(() => {});
    },
    [deleteChannel, mutateChannel, handleCloseToolsMenu, organizationChannelId]
  );

  const handleEditChannelConfirm = useCallback(
    async (newTitle: string) => {
      await updateChannelDetail({
        organizationId: 'yMJHyi6R1CB9whpdNvtA',
        organizationChannelId: selectedChannel?.organizationChannelId ?? '',
        organizationChannelTitle: newTitle,
      });
      setIsEditDialogOpen(false);
      if (mutateChannel) mutateChannel();
    },
    [updateChannelDetail, selectedChannel, mutateChannel]
  );

  const handleOpenEditChannelDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(true);
    setToolsAnchor(null);
  }, []);

  const handleCloseEditDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(false);
    setToolsAnchor(null);
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    setToolsAnchor(event.currentTarget);
    setActiveIndex(index);
  };

  useEffect(() => {
    const updateChannelData = async () => {
      if (channel) {
        if (channel?.organizationChannelTranscriptList.length > 0) {
          setSelectedChannel(channel);
        }
        // const isDataIncomplete =
        //   !channel.organizationChannelTranscriptList?.length;

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

  const handlePostiveModalOpen = (targetId: string, feedbackTarget: string) => {
    // If this message already has positive feedback, directly submit to cancel it
    if (feedbackMap[targetId] === 'POSITIVE') {
      handleDirectFeedbackToggle(targetId, 'POSITIVE');
      return;
    }

    setActiveTargetId(targetId);
    setFeedbackTarget(feedbackTarget);
    setOpenPositiveFeedbackModal(true);
  };

  const handleNegativeModalOpen = (
    targetId: string,
    feedbackTarget: string
  ) => {
    // If this message already has negative feedback, directly submit to cancel it
    if (feedbackMap[targetId] === 'NEGATIVE') {
      handleDirectFeedbackToggle(targetId, 'NEGATIVE');
      return;
    }

    setActiveTargetId(targetId);
    setFeedbackTarget(feedbackTarget);
    setOpenNegativeFeedbackModal(true);
  };

  const handleDirectFeedbackToggle = async (
    targetId: string,
    feedbackType: string
  ) => {
    try {
      // Remove the feedback from our local state first for immediate UI response
      setFeedbackMap((prev) => {
        const newMap = { ...prev };
        delete newMap[targetId];
        return newMap;
      });

      // Submit the feedback to the server - always use the same type as the button clicked
      await submitFeedback({
        organizationChannelFeedbackTarget: feedbackTarget,
        organizationChannelFeedbackTargetId: targetId,
        organizationChannelFeedbackType: feedbackType,
        organizationChannelFeedbackComment: '',
        organizationId: 'yMJHyi6R1CB9whpdNvtA',
      });
    } catch (error) {
      console.error('Failed to toggle feedback:', error);
      // Restore the previous feedback state if the request failed
      setFeedbackMap((prev) => ({
        ...prev,
        [targetId]: feedbackType,
      }));
      // showSnackbar('取消失敗', 'error');
    }
  };

  const updateMessageFeedback = (messageId: string, feedbackType: string) => {
    setFeedbackMap((prev) => ({
      ...prev,
      [messageId]: feedbackType,
    }));
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
          <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}>
            <Box
              sx={{
                height: isMobile ? 'auto' : 'calc(100vh - 30px)',
                overflow: 'hidden',
                borderRadius: '8px',
                padding: '16px 32px',
                backgroundColor: 'white',
                width: openDataSource
                  ? isOpenDrawer
                    ? 'calc(100vw - 732px)'
                    : '76%'
                  : '100%',
              }}
            >
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
                    label="智能語音轉文字"
                    sx={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Text-Secondary, #637381))',
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
                    <Tooltip title="返回" placement="top" arrow>
                      <IconButton
                        aria-label="back"
                        onClick={handleBackButtonClick}
                      >
                        <ArrowBackIosRounded sx={{ color: 'black' }} />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        overflow: 'hidden',
                        fontStyle: 'normal',
                        fontFamily: 'var(--font-bold)',
                        lineHeight: 'normal',
                        textOverflow: 'ellipsis',
                        color: 'var(--Text-Primary, #212B36)',
                      }}
                    >
                      {selectedChannel?.organizationChannelTitle}
                    </Typography>
                    <EditableItem
                      index={0}
                      isChannelSummary
                      toolsAnchor={toolsAnchor}
                      activeIndex={activeIndex}
                      key={organizationChannelId}
                      handleMenuOpen={handleMenuOpen}
                      setToolsAnchor={setToolsAnchor}
                      handleCloseToolsMenu={handleCloseToolsMenu}
                      handleOpenEditChannelDialog={handleOpenEditChannelDialog}
                      handleDeleteChannelOpenConfirmDialog={
                        handleDeleteChannelOpenConfirmDialog
                      }
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    />
                  </Box>
                  <Box>
                    {/* <Tooltip title="收藏" placement="top" arrow>
                      <IconButton aria-label="Add Favorite">
                        <StarBorderRounded sx={{ color: "black" }} />
                      </IconButton>
                    </Tooltip> */}
                    {/* <IconButton
                      aria-label="Open Data Source"
                      onClick={() => setOpenDataSource(!openDataSource)}
                    >
                      <SettingsInputComponentRounded sx={{ color: "black" }} />
                    </IconButton> */}
                  </Box>
                </Box>
                <Grid2 container sx={{ flex: 1, height: '100vh' }}>
                  <Grid2
                    size={{ xs: 5 }}
                    sx={{
                      overflowY: 'auto',
                      ...customScrollbarStyle,
                      height: 'calc(100vh - 200px)',
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
                            fontFamily: 'var(--font-bold)',
                            lineHeight: 'normal',
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
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          ></Typography>
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
                                  ? '已複製'
                                  : '複製'
                              }
                              placement="top"
                              arrow
                            >
                              <IconButton
                                aria-label="Copy"
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
                                  <DoneIcon sx={{ color: '#212B36' }} />
                                ) : (
                                  <ContentCopyRounded
                                    sx={{ color: '#212B36', fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="回應良好" placement="top" arrow>
                              <IconButton
                                aria-label="Like"
                                onClick={() =>
                                  handlePostiveModalOpen(
                                    selectedChannel
                                      ?.organizationChannelTranscriptList[0]
                                      ?.organizationChannelTranscriptId ?? '',
                                    'TRANSCRIPT'
                                  )
                                }
                              >
                                {feedbackMap[
                                  selectedChannel
                                    ?.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptId ?? ''
                                ] === 'POSITIVE' ? (
                                  <ThumbUpAltRounded
                                    sx={{
                                      fontSize: 20,
                                      color: 'black',
                                    }}
                                  />
                                ) : (
                                  <ThumbDownOffAltRounded
                                    sx={{
                                      fontSize: 20,
                                      color: 'black',
                                      transform: 'scale(-1, -1)',
                                    }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="回應不佳" placement="top" arrow>
                              <IconButton
                                aria-label="Dislike"
                                onClick={() =>
                                  handleNegativeModalOpen(
                                    selectedChannel
                                      ?.organizationChannelTranscriptList[0]
                                      ?.organizationChannelTranscriptId ?? '',
                                    'TRANSCRIPT'
                                  )
                                }
                              >
                                {feedbackMap[
                                  selectedChannel
                                    ?.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptId ?? ''
                                ] === 'NEGATIVE' ? (
                                  <ThumbDownAltRounded
                                    sx={{ color: 'black', fontSize: 20 }}
                                  />
                                ) : (
                                  <ThumbDownOffAltRounded
                                    sx={{ color: 'black', fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '24px',
                            fontStyle: 'normal',
                            fontFamily: 'DFPHeiMedium-B5',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                        >
                          <ReactMarkdown>
                            {
                              selectedChannel
                                ?.organizationChannelTranscriptList[0]
                                ?.organizationChannelTranscriptContent
                            }
                          </ReactMarkdown>
                        </Box>
                      </Paper>
                    </Item>
                  </Grid2>
                  <Grid2
                    size={{ xs: 7 }}
                    sx={{
                      overflowY: 'auto',
                      height: 'calc(100vh - 200px)',
                      ...customScrollbarStyle,
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
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {' '}
                            AI分析
                          </Typography>
                          {aIAnalysisTabValue === 1 && (
                            <Button
                              aria-label="Regenerate"
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
                              fontFamily: 'var(--font-medium)',
                              color: 'var(--Text-Secondary, #637381)',
                              '&.Mui-selected': {
                                color: 'var(--Text-Primary, #212B36)',
                              },
                            }}
                          />
                          <Tab
                            label="問問AI"
                            disabled
                            sx={{
                              fontWeight: 700,
                              fontSize: '14px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'var(--font-medium)',
                              color: 'var(--Text-Secondary, #637381)',
                              '&.Mui-selected': {
                                color: 'var(--Text-Primary, #212B36)',
                              },
                              '&.Mui-disabled': {
                                color: 'rgba(99, 115, 129, 0.5)',
                              },
                            }}
                          />
                          <Tab
                            label="相關資料"
                            disabled
                            sx={{
                              fontWeight: 700,
                              fontSize: '14px',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              fontFamily: 'var(--font-medium)',
                              color: 'var(--Text-Secondary, #637381)',
                              '&.Mui-selected': {
                                color: 'var(--Text-Primary, #212B36)',
                              },
                              '&.Mui-disabled': {
                                color: 'rgba(99, 115, 129, 0.5)',
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
                                    ?.organizationChannelMessageList[
                                    selectedChannel
                                      ?.organizationChannelMessageList.length -
                                      1
                                  ]?.organizationChannelMessageId
                                    ? '已複製'
                                    : '複製'
                                }
                                placement="top"
                                arrow
                              >
                                <IconButton
                                  aria-label="Copy"
                                  onClick={() =>
                                    selectedChannel
                                      ?.organizationChannelMessageList[
                                      selectedChannel
                                        ?.organizationChannelMessageList
                                        .length - 1
                                    ]?.organizationChannelMessageContent &&
                                    selectedChannel
                                      ?.organizationChannelMessageList[
                                      selectedChannel
                                        ?.organizationChannelMessageList
                                        .length - 1
                                    ]?.organizationChannelMessageId &&
                                    copyPrompt(
                                      selectedChannel
                                        ?.organizationChannelMessageList[
                                        selectedChannel
                                          ?.organizationChannelMessageList
                                          .length - 1
                                      ]?.organizationChannelMessageContent ??
                                        '',
                                      selectedChannel
                                        ?.organizationChannelMessageList[
                                        selectedChannel
                                          ?.organizationChannelMessageList
                                          .length - 1
                                      ]?.organizationChannelMessageId ?? ''
                                    )
                                  }
                                >
                                  {copiedMessageId ===
                                  selectedChannel
                                    ?.organizationChannelMessageList[
                                    selectedChannel
                                      ?.organizationChannelMessageList.length -
                                      1
                                  ]?.organizationChannelMessageId ? (
                                    <DoneIcon sx={{ color: '#212B36' }} />
                                  ) : (
                                    <ContentCopyRounded
                                      sx={{ color: '#212B36', fontSize: 20 }}
                                    />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="回應良好" placement="top" arrow>
                                <IconButton
                                  aria-label="Like"
                                  onClick={() =>
                                    handlePostiveModalOpen(
                                      selectedChannel
                                        ?.organizationChannelMessageList[0]
                                        ?.organizationChannelMessageId ?? '',
                                      'AI_RESPONSE'
                                    )
                                  }
                                >
                                  {feedbackMap[
                                    selectedChannel
                                      ?.organizationChannelMessageList[0]
                                      ?.organizationChannelMessageId ?? ''
                                  ] === 'POSITIVE' ? (
                                    <ThumbUpAltRounded
                                      sx={{
                                        fontSize: 20,
                                        color: 'black',
                                      }}
                                    />
                                  ) : (
                                    <ThumbDownOffAltRounded
                                      sx={{
                                        fontSize: 20,
                                        color: 'black',
                                        transform: 'scale(-1, -1)',
                                      }}
                                    />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="回應不佳" placement="top" arrow>
                                <IconButton
                                  aria-label="Dislike"
                                  onClick={() =>
                                    handleNegativeModalOpen(
                                      selectedChannel
                                        ?.organizationChannelMessageList[0]
                                        ?.organizationChannelMessageId ?? '',
                                      'AI_RESPONSE'
                                    )
                                  }
                                >
                                  {feedbackMap[
                                    selectedChannel
                                      ?.organizationChannelMessageList[0]
                                      ?.organizationChannelMessageId ?? ''
                                  ] === 'NEGATIVE' ? (
                                    <ThumbDownAltRounded
                                      sx={{ color: 'black', fontSize: 20 }}
                                    />
                                  ) : (
                                    <ThumbDownOffAltRounded
                                      sx={{ color: 'black', fontSize: 20 }}
                                    />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="重新產生" placement="top" arrow>
                                <IconButton
                                  aria-label="Regenerate"
                                  onClick={async () => {
                                    if (!isLoading) {
                                      await ApiRegenerateSummary({
                                        organizationId: 'yMJHyi6R1CB9whpdNvtA',
                                        organizationChannelId,
                                      });
                                      mutateChannel();
                                    }
                                  }}
                                  sx={{
                                    borderRadius: '50%',
                                    padding: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      backgroundColor: '#e0e0e0',
                                      transform: 'scale(1.1)',
                                    },
                                  }}
                                >
                                  {isLoading ? (
                                    <SyncRounded
                                      sx={{
                                        color: 'black',
                                        '@keyframes spin': {
                                          '0%': { transform: 'rotate(0deg)' },
                                          '100%': {
                                            transform: 'rotate(360deg)',
                                          },
                                        },
                                        animation: 'spin 1s linear infinite',
                                      }}
                                    />
                                  ) : (
                                    <SyncRounded sx={{ color: 'black' }} />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              fontSize: '16px',
                              fontWeight: '400',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              fontFamily: 'DFPHeiMedium-B5',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            <ReactMarkdown>
                              {
                                selectedChannel?.organizationChannelMessageList[
                                  selectedChannel
                                    ?.organizationChannelMessageList.length - 1
                                ]?.organizationChannelMessageContent
                              }
                            </ReactMarkdown>
                          </Box>
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
                                <Tooltip title="複製" placement="top" arrow>
                                  <IconButton aria-label="Copy">
                                    <ContentCopyRounded
                                      sx={{ color: '#212B36', fontSize: 20 }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="回應良好" placement="top" arrow>
                                  <IconButton
                                    aria-label="Like"
                                    // onClick={() =>
                                    //   handlePostiveModalOpen(
                                    //     selectedChannel
                                    //       ?.organizationChannelMessageList[0]
                                    //       ?.organizationChannelMessageId ?? ''
                                    //   )
                                    // }
                                  >
                                    {feedbackMap[
                                      selectedChannel
                                        ?.organizationChannelMessageList[0]
                                        ?.organizationChannelMessageId ?? ''
                                    ] === 'POSITIVE' ? (
                                      <ThumbUpAltRounded
                                        sx={{
                                          color: 'black',
                                          fontSize: 20,
                                          transform: 'scale(-1, -1)',
                                        }}
                                      />
                                    ) : (
                                      <ThumbDownOffAltRounded
                                        sx={{
                                          color: 'black',
                                          transform: 'scale(-1, -1)',
                                          fontSize: 20,
                                        }}
                                      />
                                    )}
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="回應不佳" placement="top" arrow>
                                  <IconButton
                                    aria-label="Dislike"
                                    // onClick={() =>
                                    //   handleNegativeModalOpen(
                                    //     selectedChannel
                                    //       ?.organizationChannelMessageList[0]
                                    //       ?.organizationChannelMessageId ?? ''
                                    //   )
                                    // }
                                  >
                                    {feedbackMap[
                                      selectedChannel
                                        ?.organizationChannelMessageList[0]
                                        ?.organizationChannelMessageId ?? ''
                                    ] === 'NEGATIVE' ? (
                                      <ThumbUpAltRounded
                                        sx={{ color: 'black', fontSize: 20 }}
                                      />
                                    ) : (
                                      <ThumbDownOffAltRounded
                                        sx={{ color: 'black', fontSize: 20 }}
                                      />
                                    )}
                                  </IconButton>
                                </Tooltip>
                                {/* <IconButton aria-label="Pin">
                                  <PushPinRounded sx={{ color: "black" }} />
                                </IconButton> */}
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
                                  aria-label="Ask the AI"
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
                                    fontFamily: 'var(--font-bold)',
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
                                  fontFamily: 'var(--font-bold)',
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
                                  ...customScrollbarStyle,
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
                                            fontFamily: 'var(--font-bold)',
                                            fontStyle: 'normal',
                                            lineHeight: 'normal',
                                            color:
                                              'var(--Primary-Black, #212B36)',
                                          }}
                                        >
                                          {item.title}
                                        </Typography>
                                        <IconButton
                                          aria-label="More Details"
                                          sx={{ padding: '0px' }}
                                        >
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
                                          fontFamily: 'var(--font-bold)',
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
                                  fontFamily: 'var(--font-bold)',
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
                                  ...customScrollbarStyle,
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
                                            fontFamily: 'var(--font-bold)',
                                            fontStyle: 'normal',
                                            lineHeight: 'normal',
                                            color:
                                              'var(--Primary-Black, #212B36)',
                                          }}
                                        >
                                          {item.title}
                                        </Typography>
                                        <IconButton
                                          aria-label="More Details"
                                          sx={{ padding: '0px' }}
                                        >
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
                                          fontFamily: 'var(--font-bold)',
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
                                  fontFamily: 'var(--font-bold)',
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
                                  ...customScrollbarStyle,
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
                                            fontFamily: 'var(--font-bold)',
                                            fontStyle: 'normal',
                                            lineHeight: 'normal',
                                            color:
                                              'var(--Primary-Black, #212B36)',
                                          }}
                                        >
                                          {item.title}
                                        </Typography>
                                        <IconButton
                                          aria-label="More Details"
                                          sx={{ padding: '0px' }}
                                        >
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
                                          fontFamily: 'var(--font-bold)',
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
              aria-label="back"
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
                  fontFamily: 'var(--font-bold)',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  textOverflow: 'ellipsis',
                  color: 'var(--Text-Primary, #212B36)',
                }}
              >
                {selectedChannel?.organizationChannelTitle}
              </Typography>
              <EditableItem
                index={0}
                isChannelSummary
                toolsAnchor={toolsAnchor}
                activeIndex={activeIndex}
                key={organizationChannelId}
                handleMenuOpen={handleMenuOpen}
                setToolsAnchor={setToolsAnchor}
                handleCloseToolsMenu={handleCloseToolsMenu}
                handleOpenEditChannelDialog={handleOpenEditChannelDialog}
                handleDeleteChannelOpenConfirmDialog={
                  handleDeleteChannelOpenConfirmDialog
                }
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              />
            </Box>
            <Box>
              {/* <IconButton aria-label="Add Favorite">
                <StarBorderRounded sx={{ color: "#212B36" }} />
              </IconButton> */}
              {/* <IconButton aria-label="History">
                <HistoryRounded sx={{ color: "#212B36" }} />
              </IconButton> */}
              {/* <IconButton aria-label="Open Data Source">
                <SettingsInputComponentRounded sx={{ color: "#212B36" }} />
              </IconButton> */}
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
                fontFamily: 'var(--font-bold)',
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
                      ? '已複製'
                      : '複製'
                  }
                  placement="top"
                  arrow
                >
                  <IconButton
                    aria-label="Copy"
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
                      <DoneIcon sx={{ color: '#212B36' }} />
                    ) : (
                      <ContentCopyRounded
                        sx={{ color: '#212B36', fontSize: 20 }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="回應良好" placement="top" arrow>
                  <IconButton
                    aria-label="Like"
                    onClick={() =>
                      handlePostiveModalOpen(
                        selectedChannel?.organizationChannelTranscriptList[0]
                          ?.organizationChannelTranscriptId ?? '',
                        'TRANSCRIPT'
                      )
                    }
                  >
                    {feedbackMap[
                      selectedChannel?.organizationChannelTranscriptList[0]
                        ?.organizationChannelTranscriptId ?? ''
                    ] === 'POSITIVE' ? (
                      <ThumbUpAltRounded
                        sx={{
                          fontSize: 20,
                          color: 'black',
                        }}
                      />
                    ) : (
                      <ThumbDownOffAltRounded
                        sx={{
                          fontSize: 20,
                          color: 'black',
                          transform: 'scale(-1, -1)',
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="回應不佳" placement="top" arrow>
                  <IconButton
                    aria-label="Dislike"
                    onClick={() =>
                      handleNegativeModalOpen(
                        selectedChannel?.organizationChannelTranscriptList[0]
                          ?.organizationChannelTranscriptId ?? '',
                        'TRANSCRIPT'
                      )
                    }
                  >
                    {feedbackMap[
                      selectedChannel?.organizationChannelTranscriptList[0]
                        ?.organizationChannelTranscriptId ?? ''
                    ] === 'NEGATIVE' ? (
                      <ThumbDownAltRounded
                        sx={{ color: 'black', fontSize: 20 }}
                      />
                    ) : (
                      <ThumbDownOffAltRounded
                        sx={{ color: 'black', fontSize: 20 }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                fontStyle: 'normal',
                fontFamily: 'DFPHeiMedium-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              <ReactMarkdown>
                {
                  selectedChannel?.organizationChannelTranscriptList[0]
                    ?.organizationChannelTranscriptContent
                }
              </ReactMarkdown>
            </Box>
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
                  fontFamily: 'var(--font-bold)',
                  color: 'var(--Primary-Black, #212B36)',
                }}
              >
                AI分析
              </Typography>
              {aIAnalysisTabValue === 1 && (
                <Button
                  aria-label="Regenerate"
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
                  fontFamily: 'var(--font-bold)',
                  color: 'var(--Text-Secondary, #637381)',
                  '&.Mui-selected': {
                    color: 'var(--Text-Primary, #212B36)',
                  },
                }}
              />
              <Tab
                label="問問AI"
                disabled
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'var(--font-bold)',
                  color: 'var(--Text-Secondary, #637381)',
                  '&.Mui-selected': {
                    color: 'var(--Text-Primary, #212B36)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(99, 115, 129, 0.5)',
                  },
                }}
              />
              <Tab
                label="相關資料"
                disabled
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'var(--font-bold)',
                  color: 'var(--Text-Secondary, #637381)',
                  '&.Mui-selected': {
                    color: 'var(--Text-Primary, #212B36)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(99, 115, 129, 0.5)',
                  },
                }}
              />
            </Tabs>

            <TabPanel value={aIAnalysisTabValue} index={0}>
              <Box
                sx={{
                  mt: '10px',

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
                    fontFamily: 'var(--font-bold)',
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
                      selectedChannel?.organizationChannelMessageList[
                        selectedChannel?.organizationChannelMessageList.length -
                          1
                      ]?.organizationChannelMessageId
                        ? 'Copied'
                        : 'Copy'
                    }
                    placement="top"
                    arrow
                  >
                    <IconButton
                      aria-label="Copy"
                      onClick={() =>
                        selectedChannel?.organizationChannelMessageList[
                          selectedChannel?.organizationChannelMessageList
                            .length - 1
                        ]?.organizationChannelMessageContent &&
                        selectedChannel?.organizationChannelMessageList[
                          selectedChannel?.organizationChannelMessageList
                            .length - 1
                        ]?.organizationChannelMessageId &&
                        copyPrompt(
                          selectedChannel?.organizationChannelMessageList[
                            selectedChannel?.organizationChannelMessageList
                              .length - 1
                          ]?.organizationChannelMessageContent ?? '',
                          selectedChannel?.organizationChannelMessageList[
                            selectedChannel?.organizationChannelMessageList
                              .length - 1
                          ]?.organizationChannelMessageId ?? ''
                        )
                      }
                    >
                      {copiedMessageId ===
                      selectedChannel?.organizationChannelMessageList[
                        selectedChannel?.organizationChannelMessageList.length -
                          1
                      ]?.organizationChannelMessageId ? (
                        <DoneIcon sx={{ color: '#212B36' }} />
                      ) : (
                        <ContentCopyRounded
                          sx={{ color: '#212B36', fontSize: 20 }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="回應良好" placement="top" arrow>
                    <IconButton
                      aria-label="Like"
                      onClick={() =>
                        handlePostiveModalOpen(
                          selectedChannel?.organizationChannelMessageList[0]
                            ?.organizationChannelMessageId ?? '',
                          'AI_RESPONSE'
                        )
                      }
                    >
                      {feedbackMap[
                        selectedChannel?.organizationChannelMessageList[0]
                          ?.organizationChannelMessageId ?? ''
                      ] === 'POSITIVE' ? (
                        <ThumbUpAltRounded
                          sx={{
                            fontSize: 20,
                            color: 'black',
                          }}
                        />
                      ) : (
                        <ThumbDownOffAltRounded
                          sx={{
                            fontSize: 20,
                            color: 'black',
                            transform: 'scale(-1, -1)',
                          }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="回應不佳" placement="top" arrow>
                    <IconButton
                      aria-label="Dislike"
                      onClick={() =>
                        handleNegativeModalOpen(
                          selectedChannel?.organizationChannelMessageList[0]
                            ?.organizationChannelMessageId ?? '',
                          'AI_RESPONSE'
                        )
                      }
                    >
                      {feedbackMap[
                        selectedChannel?.organizationChannelMessageList[0]
                          ?.organizationChannelMessageId ?? ''
                      ] === 'NEGATIVE' ? (
                        <ThumbDownAltRounded
                          sx={{ color: 'black', fontSize: 20 }}
                        />
                      ) : (
                        <ThumbDownOffAltRounded
                          sx={{ color: 'black', fontSize: 20 }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="重新產生" placement="top" arrow>
                    <IconButton
                      aria-label="Regenerate"
                      onClick={async () => {
                        if (!isLoading) {
                          await ApiRegenerateSummary({
                            organizationId: 'yMJHyi6R1CB9whpdNvtA',
                            organizationChannelId,
                          });
                          mutateChannel();
                        }
                      }}
                      sx={{
                        borderRadius: '50%',
                        padding: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      {isLoading ? (
                        <SyncRounded
                          sx={{
                            color: 'black',
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' },
                            },
                            animation: 'spin 1s linear infinite',
                          }}
                        />
                      ) : (
                        <SyncRounded sx={{ color: 'black' }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              {isMobile && (
                <Box
                  sx={{
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiMedium-B5',
                    color: 'var(--Primary-Black, #212B36)',
                  }}
                >
                  <ReactMarkdown>
                    {
                      selectedChannel?.organizationChannelMessageList[
                        selectedChannel?.organizationChannelMessageList.length -
                          1
                      ]?.organizationChannelMessageContent
                    }
                  </ReactMarkdown>
                </Box>
              )}
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
                    <Tooltip title="複製" placement="top" arrow>
                      <IconButton aria-label="Copy">
                        <ContentCopyRounded
                          sx={{ color: '#212B36', fontSize: 20 }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="回應良好" placement="top" arrow>
                      <IconButton
                        aria-label="Like"
                        // onClick={() =>
                        //   handlePostiveModalOpen(
                        //     selectedChannel?.organizationChannelMessageList[0]
                        //       ?.organizationChannelMessageId ?? ''
                        //   )
                        // }
                      >
                        {feedbackMap[
                          selectedChannel?.organizationChannelMessageList[0]
                            ?.organizationChannelMessageId ?? ''
                        ] === 'POSITIVE' ? (
                          <ThumbUpAltRounded
                            sx={{
                              color: 'black',
                              fontSize: 20,
                              transform: 'scale(-1, -1)',
                            }}
                          />
                        ) : (
                          <ThumbDownOffAltRounded
                            sx={{
                              color: 'black',
                              transform: 'scale(-1, -1)',
                              fontSize: 20,
                            }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="回應不佳" placement="top" arrow>
                      <IconButton
                        aria-label="Dislike"
                        // onClick={() =>
                        //   handleNegativeModalOpen(
                        //     selectedChannel?.organizationChannelMessageList[0]
                        //       ?.organizationChannelMessageId ?? ''
                        //   )
                        // }
                      >
                        {feedbackMap[
                          selectedChannel?.organizationChannelMessageList[0]
                            ?.organizationChannelMessageId ?? ''
                        ] === 'NEGATIVE' ? (
                          <ThumbUpAltRounded
                            sx={{ color: 'black', fontSize: 20 }}
                          />
                        ) : (
                          <ThumbDownOffAltRounded
                            sx={{ color: 'black', fontSize: 20 }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    {/* <IconButton aria-label="Pin">
                      <PushPinRounded sx={{ color: "black" }} />
                    </IconButton> */}
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
                      aria-label="Ask the AI"
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
                        fontFamily: 'var(--font-bold)',
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
                      fontFamily: 'var(--font-bold)',
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
                      ...customScrollbarStyle,
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
                                fontFamily: 'var(--font-bold)',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <IconButton
                              aria-label="More Details"
                              sx={{ padding: '0px' }}
                            >
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
                              fontFamily: 'var(--font-bold)',
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
                      fontFamily: 'var(--font-bold)',
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
                      ...customScrollbarStyle,
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
                                fontFamily: 'var(--font-bold)',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <IconButton
                              aria-label="More Details"
                              sx={{ padding: '0px' }}
                            >
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
                              fontFamily: 'var(--font-bold)',
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
                      fontFamily: 'var(--font-bold)',
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
                      ...customScrollbarStyle,
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
                                fontFamily: 'var(--font-bold)',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <IconButton
                              aria-label="More Details"
                              sx={{ padding: '0px' }}
                            >
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
                              fontFamily: 'var(--font-bold)',
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
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteChannelConfirm}
        deletableName={selectedChannel?.organizationChannelTitle || ''}
      />
      <EditDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onConfirm={handleEditChannelConfirm}
        editableName={selectedChannel?.organizationChannelTitle || ''}
      />
      {activeTargetId ===
        selectedChannel?.organizationChannelTranscriptList[0]
          ?.organizationChannelTranscriptId && (
        <>
          <PositiveFeedbackModal
            open={openPositiveFeedbackModal}
            onClose={handleClose}
            setUserFeedback={() =>
              updateMessageFeedback(
                selectedChannel?.organizationChannelTranscriptList[0]
                  ?.organizationChannelTranscriptId ?? '',
                'POSITIVE'
              )
            }
            userChatMessage={
              selectedChannel?.organizationChannelTranscriptList[0]
            }
          />
          <NegativeFeedbackModal
            open={openNegativeFeedbackModal}
            onClose={handleClose}
            setUserFeedback={() =>
              updateMessageFeedback(
                selectedChannel?.organizationChannelTranscriptList[0]
                  ?.organizationChannelTranscriptId ?? '',
                'NEGATIVE'
              )
            }
            userChatMessage={
              selectedChannel?.organizationChannelTranscriptList[0]
            }
          />
        </>
      )}

      {activeTargetId ===
        selectedChannel?.organizationChannelMessageList[0]
          ?.organizationChannelMessageId && (
        <>
          <PositiveFeedbackModal
            open={openPositiveFeedbackModal}
            onClose={handleClose}
            setUserFeedback={() =>
              updateMessageFeedback(
                selectedChannel?.organizationChannelMessageList[0]
                  ?.organizationChannelMessageId ?? '',
                'POSITIVE'
              )
            }
            userChatMessage={selectedChannel?.organizationChannelMessageList[0]}
          />
          <NegativeFeedbackModal
            open={openNegativeFeedbackModal}
            onClose={handleClose}
            setUserFeedback={() =>
              updateMessageFeedback(
                selectedChannel?.organizationChannelMessageList[0]
                  ?.organizationChannelMessageId ?? '',
                'NEGATIVE'
              )
            }
            userChatMessage={selectedChannel?.organizationChannelMessageList[0]}
          />
        </>
      )}
    </>
  );
};

// Main component that wraps with Suspense
const ChannelSummary = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChannelSummaryContent />
    </Suspense>
  );
};

export default ChannelSummary;
