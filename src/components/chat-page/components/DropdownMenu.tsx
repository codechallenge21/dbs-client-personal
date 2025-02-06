'use client';

import { useCallback, useContext, useState } from 'react';
import {
  Typography,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import {
  AccountBalanceWalletRounded,
  BusinessCenterRounded,
  LocalHospitalRounded,
  MoneyOffRounded,
  PhishingRounded,
  WorkRounded,
} from '@mui/icons-material';
import { AdvisorType } from '../../../app/chat/types';
import ChannelContentContext from '../../channel-context-provider/ChannelContentContext';
import { useRouter } from 'next/navigation';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EditableItem from '@/components/editable-item/EditableItem';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import EditDialog from '@/components/dialogs/EditDialog';

const listItems = [
  {
    title: '萬事通',
    value: AdvisorType.DEFAULT,
    description: '提供應對策略與資源連結。',
    icon: <SupportAgentIcon />,
  },
  {
    title: '債務案件顧問',
    value: AdvisorType.DEBT,
    description: '提供債務管理與還款建議，幫助改善財務壓力。',
    icon: <MoneyOffRounded />,
  },
  {
    title: '意外案件顧問',
    value: AdvisorType.CONTINGENCY,
    description: '快速提供應急策略與風險評估。',
    icon: <BusinessCenterRounded />,
  },
  {
    title: '詐騙案件顧問',
    value: AdvisorType.FRAUD,
    description: '快速辨識詐騙風險，提供建議與後續行動指引。',
    icon: <PhishingRounded />,
  },
  {
    title: '醫療案件顧問',
    value: AdvisorType.MEDICAL,
    description: '提供您醫療案件應對策略與資源連結。',
    icon: <LocalHospitalRounded />,
  },
  {
    title: '就業協助顧問',
    value: AdvisorType.EMPLOYMENT,
    description: '支援您求職與職涯規劃。',
    icon: <WorkRounded />,
  },
  {
    title: '財務案件顧問',
    value: AdvisorType.FINANCIAL,
    description: '提供儲蓄、投資與債務建議。',
    icon: <AccountBalanceWalletRounded />,
  },
];

export default function DropdownMenu({
  advisor,
  isTextInput = false,
}: {
  advisor: AdvisorType;
  isTextInput?: boolean;
}) {
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
          organizationId: '4aba77788ae94eca8d6ff330506af944',
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
          organizationId: '4aba77788ae94eca8d6ff330506af944',
          organizationChannelId: selectedChannelId || '',
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
          organizationId: '4aba77788ae94eca8d6ff330506af944',
          organizationChannelId: selectedChannelId || '',
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
            background: 'none',
            cursor: 'pointer',
            width: '24px',
            height: '24px',
          }}
        >
          {listItems
            .filter((item) => item.value === advisor)
            .map((item) => (
              <ListItemIcon
                key={item.value}
                sx={{
                  color: 'black',
                  minWidth: 'auto',
                  width: '24px',
                  height: '24px',
                }}
              >
                {item.icon}
              </ListItemIcon>
            ))}
        </Box>
      ) : (
        <>
          <Typography
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
                {chatResponses[1]?.organizationChannelTitle ||
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
          </Typography>
        </>
      )}
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor)}
        onClose={() => setToolsAnchor(null)}
        PaperProps={{
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
          vertical:
            chatResponses.length || selectedChannel ? 'bottom' : 'bottom', // Align vertically to the center
          horizontal:
            chatResponses.length || selectedChannel ? 'right' : 'left', // Align to the right side of the anchor element
        }}
        transformOrigin={{
          vertical: chatResponses.length || selectedChannel ? 'bottom' : 'top', // Transform origin to match the vertical alignment
          horizontal: chatResponses.length || selectedChannel ? 'left' : 'left', // Ensure the menu starts from the left edge of its anchor
        }}
      >
        {listItems.map((item, index) => (
          <MenuItem
            key={index}
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
            disabled={
              item.value !== AdvisorType.DEFAULT &&
              item.value !== AdvisorType.DEBT
            }
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
          selectedChannel?.organizationChannelTitle ||
          chatResponses[1]?.organizationChannelTitle ||
          ''
        }
      />
      <EditDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onConfirm={handleEditChannelConfirm}
        editableName={
          selectedChannel?.organizationChannelTitle ||
          chatResponses[1]?.organizationChannelTitle ||
          ''
        }
      />
    </>
  );
}
