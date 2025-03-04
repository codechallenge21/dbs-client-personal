'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Button,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import {
  StarRounded,
  MenuRounded,
  StarBorderRounded,
  ArrowDropDownRounded,
  ArrowBackIosNewRounded,
  SettingsInputComponentRounded,
} from '@mui/icons-material';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import FinanceDetailInfo from '@/components/finance-detail-info/FinanceDetailInfo';
import FinanceDetailFamilyTree from '@/components/finance-detail-family-tree/FinanceDetailFamilyTree';
import FinanceDetailInventorySheet from '@/components/finance-detail-inventory-sheet/FinanceDetailInventorySheet';
import { useRouter } from 'next/navigation';

function TabPanel(props: {
  value: number;
  index: number;
  children: React.ReactNode;
}) {
  const { children, value, index } = props;
  return (
    <div style={{ width: '100%' }} role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function FinanceDetailScreen() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tabValue, setTabValue] = useState(0);
  const [starred, setStarred] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackButton = () => {
    router.push('/finance');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--Primary-, #EBE3DD)',
      }}
    >
      <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}>
        <Box
          sx={{
            display: 'flex',
            overflow: 'hidden',
            borderRadius: '8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            paddingBottom: '16px',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: isMobile ? '100%' : '96.5vh',
          }}
        >
          {isMobile && (
            <Box
              sx={{
                flexShrink: 0,
                height: '64px',
                display: 'flex',
                padding: '8px 16px',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '-webkit-fill-available',
                borderRadius: '8px 0px 0px 8px',
                background: 'var(--Primary-White, #FFF)',
              }}
            >
              <IconButton
                aria-label="menu"
                sx={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50px',
                  justifyContent: 'center',
                }}
                onClick={() => setIsOpenDrawer(true)}
              >
                <MenuRounded
                  sx={{ width: '24px', height: '24px', color: '#212B36' }}
                />
              </IconButton>
              <Button
                sx={{
                  gap: '8px',
                  display: 'flex',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  alignItems: 'center',
                }}
                endIcon={
                  <ArrowDropDownRounded
                    sx={{
                      margin: '0',
                      width: '20px',
                      height: '20px',
                      color: '#212B36',
                    }}
                  />
                }
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Primary, #212B36)',
                  }}
                >
                  財務快篩
                </Typography>
              </Button>
            </Box>
          )}

          {/* {Header} */}
          <Box
            sx={{
              display: 'flex',
              padding: '8px 16px',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label="back"
                sx={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50px',
                  justifyContent: 'center',
                }}
                onClick={handleBackButton}
              >
                <ArrowBackIosNewRounded sx={{ color: '#212B36' }} />
              </IconButton>
              <Button
                sx={{
                  gap: '8px',
                  display: 'flex',
                  color: '#212B36',
                  padding: '6px 8px',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Primary, #212B36)',
                  }}
                >
                  Allen
                </Typography>
                <ArrowDropDownRounded
                  sx={{ width: '20px', height: '20px', color: '#212B36' }}
                />
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                sx={{
                  gap: '8px',
                  display: 'flex',
                  padding: '6px 8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    fontStyle: 'normal',
                    textAlign: 'center',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Primary, #212B36)',
                  }}
                >
                  AI協助
                </Typography>
              </Button>
              <IconButton
                sx={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50px',
                  justifyContent: 'center',
                }}
                onClick={() => setStarred(!starred)}
              >
                {starred ? (
                  <StarRounded sx={{ color: '#212B36' }} />
                ) : (
                  <StarBorderRounded sx={{ color: '#212B36' }} />
                )}
              </IconButton>
              <IconButton
                sx={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50px',
                  justifyContent: 'center',
                }}
              >
                <SettingsInputComponentRounded sx={{ color: '#212B36' }} />
              </IconButton>
            </Box>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              gap: '40px',
              height: '48px',
              display: 'flex',
              padding: '0px 20px',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderBottom:
                '2px solid var(--transparent-grey-8, rgba(145, 158, 171, 0.08))',
              background: 'var(--Primary-White, #FFF)',
              '& .MuiTabs-flexContainer': {
                gap: '40px',
              },
            }}
            TabIndicatorProps={{
              style: {
                height: '3px',
                backgroundColor: '#212B36',
              },
            }}
          >
            <Tab
              disableRipple
              label="資料管理"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '13px 0px 12px 0px',
                fontSize: '14px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'Open Sans',
                color: 'var(--Text-Secondary, #637381)',
                '&.Mui-selected': {
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontStyle: 'normal',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Text-Secondary, #212B36)',
                },
              }}
            />
            <Tab
              disableRipple
              label="家系圖"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '13px 0px 12px 0px',
                fontSize: '14px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'Open Sans',
                color: 'var(--Text-Secondary, #637381)',
                '&.Mui-selected': {
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontStyle: 'normal',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Text-Secondary, #212B36)',
                },
              }}
            />
            <Tab
              disableRipple
              label="財務 / 債務盤點表"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '13px 0px 12px 0px',
                fontSize: '14px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'Open Sans',
                color: 'var(--Text-Secondary, #637381)',
                '&.Mui-selected': {
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontStyle: 'normal',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Text-Secondary, #212B36)',
                },
              }}
            />
            <Tab
              disableRipple
              label="AI 協助紀錄"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '13px 0px 12px 0px',
                fontSize: '14px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'Open Sans',
                color: 'var(--Text-Secondary, #637381)',
                '&.Mui-selected': {
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontStyle: 'normal',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Text-Secondary, #212B36)',
                },
              }}
            />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <FinanceDetailInfo />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <FinanceDetailFamilyTree />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <FinanceDetailInventorySheet />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <FinanceDetailInfo />
          </TabPanel>
        </Box>
      </ToolbarDrawer>
    </Box>
  );
}
