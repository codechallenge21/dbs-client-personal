'use client';

import DeleteDialog from '@/components/dialogs/DeleteDialog';
import EditDialog from '@/components/dialogs/EditDialog';
import EditableItem from '@/components/editable-item/EditableItem';
import apis from '@/utils/hooks/apis/apis';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import {
    AccountBalanceWalletRounded,
    BusinessCenterRounded,
    LocalHospitalRounded,
    MoneyOffRounded,
    PhishingRounded,
    SupportAgentOutlined,
    WorkRounded,
} from '@mui/icons-material';
import {
    Box,
    Button,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import { AdvisorType } from '../../../app/chat/types';
import ChannelContentContext from '../../channel-context-provider/ChannelContentContext';

const listItems = [
  {
    title: '萬事通',
    value: AdvisorType.DEFAULT,
    description: '提供個案跨領域資源評估與整合方案',
    icon: <SupportAgentOutlined />,
  },
  {
    title: '債務案件顧問',
    value: AdvisorType.DEBT,
    description: '提供個案債務評估與紓困整合規劃',
    icon: <MoneyOffRounded />,
  },
  {
    title: '詐騙案件顧問',
    value: AdvisorType.FRAUD,
    description: '提供個案受騙評估與緊急處理建議',
    icon: <PhishingRounded />,
  },
  {
    title: '就業案件顧問',
    value: AdvisorType.EMPLOYMENT,
    description: '提供個案就業評估與職涯輔導規劃',
    icon: <WorkRounded />,
  },
  {
    title: '家庭負擔案件顧問',
    value: AdvisorType.FAMILY,
    description: '提供個案家庭經濟評估與扶助方案',
    icon: <BusinessCenterRounded />,
  },
  {
    title: '醫療及意外案件顧問',
    value: AdvisorType.MEDICAL_CONTINGENCY,
    description: '提供個案醫療評估與資源連結規劃',
    icon: <LocalHospitalRounded />,
  },
  {
    title: '保險案件顧問',
    value: AdvisorType.INSURANCE,
    description: '提供個案保險評估與權益申請規劃',
    icon: <AccountBalanceWalletRounded />,
  },
];

interface DropdownMenuProps {
  readonly advisor: AdvisorType;
  readonly isTextInput?: boolean;
}

export default function DropdownMenu({
  advisor,
  isTextInput = false,
}: DropdownMenuProps) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    setAdvisorType,
    chatResponses,
    selectedChannel,
    selectedChannelId,
    setSelectedChannel,
    setSelectedChannelId,
  } = useContext(ChannelContentContext);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [toolsAnchorDeleteEdit, setToolsAnchorDeleteEdit] =
    useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);
  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);
  const { excute: getChannelDetail } = useAxiosApi(apis.getChannelDetail);

  const fetchChannelDetail = useCallback(
    async (organizationChannelId: string) => {
      try {
        const res = await getChannelDetail({
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
          organizationChannelId,
        });
        setSelectedChannel(res.data);
        setSelectedChannelId(organizationChannelId);
      } catch (error) {
        console.error('Failed to fetch channel details:', error);
      }
    },
    [getChannelDetail, setSelectedChannel, setSelectedChannelId]
  );

  const handleOnClickMenuItem = useCallback(
    (value: AdvisorType) => {
      if (setAdvisorType) setAdvisorType(value);
      setToolsAnchorDeleteEdit(null);
      setToolsAnchor(null);
    },
    [setAdvisorType]
  );

  const handleCloseToolsMenu = useCallback(() => {
    setToolsAnchorDeleteEdit(null);
    setActiveIndex(null);
  }, []);

  const handleCloseDeleteDialog = useCallback((event: React.MouseEvent) => {
    setToolsAnchorDeleteEdit(null);
    event.stopPropagation();
    setIsDeleteDialogOpen(false);
  }, []);

  const handleDeleteChannelOpenConfirmDialog = useCallback(
    (event: React.MouseEvent) => {
      setToolsAnchorDeleteEdit(null);
      event.stopPropagation();
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleDeleteChannelConfirm = useCallback(
    async (event: React.MouseEvent) => {
      event.stopPropagation();
      try {
        await deleteChannel({
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
          organizationChannelId: selectedChannelId ?? '',
        });
        window.location.href = '/chat';
        setIsDeleteDialogOpen(false);
        handleCloseToolsMenu();
      } catch (error) {
        console.error('Error deleting the channel', error);
      }
    },
    [deleteChannel, handleCloseToolsMenu, selectedChannelId]
  );

  const handleEditChannelConfirm = useCallback(
    async (newTitle: string) => {
      try {
        await updateChannelDetail({
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
          organizationChannelId: selectedChannelId ?? '',
          organizationChannelTitle: newTitle,
        });
        if (selectedChannelId) {
          await fetchChannelDetail(selectedChannelId);
          router.push(`/chat?organizationChannelId=${selectedChannelId}`);
        }
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error('Error updating channel title', error);
      }
    },
    [updateChannelDetail, selectedChannelId, fetchChannelDetail]
  );

  const handleOpenEditChannelDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(true);
    setToolsAnchorDeleteEdit(null);
  }, []);

  const handleCloseEditDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(false);
    setToolsAnchorDeleteEdit(null);
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    setToolsAnchorDeleteEdit(event.currentTarget);
    setActiveIndex(index);
  };

  return (
    <>
      {isTextInput ? (
        <Box
          onClick={(e) => setToolsAnchor(e.currentTarget)}
          sx={{
            cursor: 'pointer',
          }}
        >
          {listItems
            .filter((item) => item.value === advisor)
            .map((item) => (
              <Box key={item.value} sx={{ display: 'flex', gap: '8px' }}>
                <ListItemIcon
                  key={item.value}
                  sx={{
                    color: 'black',
                    minWidth: 'auto',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <Typography>{item.title}</Typography>
              </Box>
            ))}
        </Box>
      ) : (
        <Button
          size="medium"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 8px',
            color: toolsAnchor ? '#0066cc' : '#4A4A4A',
            backgroundColor: toolsAnchor ? '#F5F5F5' : 'white',
            borderRadius: toolsAnchor ? '10px' : '0px',
            cursor:
              chatResponses[1]?.organizationChannelTitle ||
              selectedChannel?.organizationChannelTitle
                ? 'pointer'
                : 'default',
            height: '40px',
            fontSize: '16px',
            fontFamily: 'DFPHeiBold-B5',
          }}
        >
          {chatResponses[1]?.organizationChannelTitle ||
          selectedChannel?.organizationChannelTitle ? (
            <>
              {chatResponses[1]?.organizationChannelTitle ??
                selectedChannel?.organizationChannelTitle}
              <EditableItem
                index={0}
                isChannelSummary
                toolsAnchor={toolsAnchorDeleteEdit}
                activeIndex={activeIndex}
                key={selectedChannelId}
                handleMenuOpen={handleMenuOpen}
                setToolsAnchor={setToolsAnchorDeleteEdit}
                handleCloseToolsMenu={handleCloseToolsMenu}
                handleOpenEditChannelDialog={handleOpenEditChannelDialog}
                handleDeleteChannelOpenConfirmDialog={
                  handleDeleteChannelOpenConfirmDialog
                }
              />
            </>
          ) : (
            listItems.find((item) => item.value === advisor)?.title
          )}
        </Button>
      )}
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor)}
        onClose={() => setToolsAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              padding: '4px',
              borderRadius: '12px',
              width: {
                xs: '100%',
                sm: '360px',
              },
              maxWidth: isMobile ? '89%' : '358px',
              minHeight: isMobile ? 'auto' : '392px',
              ml: chatResponses.length || selectedChannel ? 1 : -1,
              mt: chatResponses.length || selectedChannel ? 0 : 1,
              boxShadow:
                '0px 0px 2px 0px rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
            },
          },
        }}
        MenuListProps={{
          sx: {
            padding: '0px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom', // Align vertically to the center
          horizontal:
            chatResponses.length || selectedChannel ? 'right' : 'left', // Align to the right side of the anchor element
        }}
        transformOrigin={{
          vertical: chatResponses.length || selectedChannel ? 'bottom' : 'top', // Transform origin to match the vertical alignment
          horizontal: 'left', // Ensure the menu starts from the left edge of its anchor
        }}
      >
        {listItems.map((item) => (
          <MenuItem
            key={item.value}
            sx={{
              alignItems: 'center',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor:
                advisor === item.value
                  ? 'var(--Action-Selected, rgba(204, 0, 0, 0.20))'
                  : 'transparent',
              '&:hover': {
                backgroundColor: '#FBEDED',
                borderRadius: '8px',
              },
              '& .MuiListItemIcon-root': {
                minWidth: 'auto',
              },
              gap: '16px',
            }}
            onClick={() => handleOnClickMenuItem(item.value)}
          >
            <ListItemIcon
              sx={{
                color: '#212B36',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                textOverflow: 'ellipsis',
              }}
              primary={
                <Typography
                  sx={{
                    overflow: 'hidden',
                    color: 'var(--Primary-Black, #212B36)',
                    textOverflow: 'ellipsis',
                    fontFamily: 'DFPHeiBold-B5',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    whiteSpace: 'nowrap',
                    lineHeight: 'normal',
                  }}
                >
                  {item.title}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{
                    color: 'var(--Text-Secondary, #637381)',
                    fontFamily: 'DFPHeiBold-B5',
                    fontSize: isMobile ? '13px' : '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    marginTop: '8px',
                  }}
                >
                  {item.description}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Menu>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteChannelConfirm}
        deletableName={
          selectedChannel?.organizationChannelTitle ??
          chatResponses[1]?.organizationChannelTitle ??
          ''
        }
      />
      <EditDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onConfirm={handleEditChannelConfirm}
        editableName={
          selectedChannel?.organizationChannelTitle ??
          chatResponses[1]?.organizationChannelTitle ??
          ''
        }
      />
    </>
  );
}
