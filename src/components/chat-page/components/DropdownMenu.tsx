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
} from '@mui/material';
import {
  AccountBalanceWalletRounded,
  ArrowDropDown,
  BusinessCenterRounded,
  LocalHospitalRounded,
  MoneyOffRounded,
  PhishingRounded,
  WorkRounded,
} from '@mui/icons-material';
import { AdvisorType } from '../../../app/chat/types';
import ChannelContentContext from '../../channel-context-provider/ChannelContentContext';
import EditDeleteModal from '../../dialogs/EditDeleteModal';
import DeleteConfirmationModal from '@/components/dialogs/DeleteConfirmationModal';
import RenameDialog from './renameChat';
import { useRouter } from 'next/navigation';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

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

  const { setAdvisorType, chatResponses, selectedChannel } = useContext(
    ChannelContentContext
  );

  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [openEditDeleteModal, setOpenEditDeleteModal] =
    useState<HTMLElement | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenEditDeleteModal(event.currentTarget);
  };

  const handleSave = (newName: string) => {
    console.log('New name:', newName);
  };

  const handleClose = () => {
    setOpenEditDeleteModal(null);
  };

  const handleConfirmDelete = () => {
    router.push('/');
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    setIsRenameDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleOnClickMenuItem = useCallback(
    (value: AdvisorType) => {
      if (setAdvisorType) setAdvisorType(value);
      setToolsAnchor(null);
    },
    [setAdvisorType]
  );

  return (
    <>
      {isTextInput ? (
        <div
          onClick={(e) => setToolsAnchor(e.currentTarget)}
          style={{
            background: 'none',
            cursor: 'pointer',
          }}
        >
          {listItems
            .filter((item) => item.value === advisor)
            .map((item) => (
              <SupportAgentIcon
                key={item.value}
                sx={{ color: 'black', minWidth: 'auto' }}
              >
                {item.icon}
              </SupportAgentIcon>
            ))}
        </div>
      ) : (
        <>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 8px',
              color: toolsAnchor ? '#0066cc' : 'black',
              backgroundColor: toolsAnchor ? '#F5F5F5' : 'white',
              borderRadius: toolsAnchor ? '10px' : '0px',
              cursor: 'pointer',
              height: '40px',
              fontSize: '16px',
              fontFamily: 'DFPHeiBold-B5',
            }}
            onClick={
              chatResponses[1]?.organizationChannelTitle
                ? handleClick
                : undefined
            }
          >
            {chatResponses[1]?.organizationChannelTitle ? (
              <>
                {chatResponses[1]?.organizationChannelTitle}
                <ArrowDropDown
                  sx={{ width: '32px', height: '32px', color: 'black' }}
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
              sm: '358px',
            },
            maxWidth: '358px',
            minHeight: '392px',
          },
        }}
      >
        {listItems.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              alignItems: 'flex-start',
              padding: '8px',
              margin: '0px 4px',
              borderRadius: '8px',
              backgroundColor:
                advisor === item.value ? 'rgba(204, 0, 0, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: '#FBEDED',
                borderRadius: '8px',
                margin: '0px 4px',
              },
            }}
            disabled={
              item.value !== AdvisorType.DEFAULT &&
              item.value !== AdvisorType.DEBT
            }
            onClick={() => handleOnClickMenuItem(item.value)}
          >
            <ListItemIcon sx={{ color: 'black' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    overflow: 'hidden',
                    color: 'var(--Primary-Black, #000)',
                    textOverflow: 'ellipsis',
                    fontFamily: 'DFPHeiBold-B5',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
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
                    selectedChannel.organizationChannelId || '',
                  selected: true,
                  organization: selectedChannel.organization || {},
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
}
