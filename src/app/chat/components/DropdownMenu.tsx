'use client';

import { useCallback, useContext, useState } from 'react';
import {
  Typography,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountBalanceWalletRounded,
  BusinessCenterRounded,
  LocalHospitalRounded,
  MoneyOffRounded,
  PhishingRounded,
  WorkRounded,
} from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { AdvisorType } from './types';
import ChannelContentContext from './ChannelContentContext';

const listItems = [
  {
    title: '萬事通',
    value: AdvisorType.DEFAULT,
    description: '提供應對策略與資源連結。',
    icon: <AutoFixNormalIcon />,
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

export default function DropdownMenu({ advisor }: { advisor: AdvisorType }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);

  const { setAdvisorType } = useContext(ChannelContentContext);

  const handleOnClickMenuItem = useCallback(
    (value: AdvisorType) => {
      if (setAdvisorType) setAdvisorType(value);
    },
    [setAdvisorType]
  );

  return (
    <>
      <Button
        endIcon={<ArrowDropDownIcon />}
        onClick={(e) => setToolsAnchor(e.currentTarget)}
        sx={{
          height: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 12px 4px 16px',
          color: toolsAnchor ? '#0066cc' : 'black',
          backgroundColor: toolsAnchor ? '#F5F5F5' : 'white',
          borderRadius: toolsAnchor ? '10px' : '0px',
        }}
      >
        <Typography sx={{ fontSize: '16px', fontFamily: 'DFPHeiBold-B5' }}>
          {listItems.find((item) => item.value === advisor)?.title}
        </Typography>
      </Button>
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
                sm: '358px',
              },
              maxWidth: '358px',
              minHeight: '392px',
            },
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
                advisor === item.value ? '#E0E0E0' : 'transparent',
              '&:hover': {
                backgroundColor: '#F5F5F5',
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
    </>
  );
}
