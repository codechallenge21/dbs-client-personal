'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import {
  COOKIEPOLICY,
  COOKIEPOLICYTITLE,
  PRIVACYPOLICY,
  PRIVACYPOLICYTITLE,
  TERMSOFUSE,
  TERMSOFUSETITLE,
} from 'minimal/_mock/_policies';
import ResponsiveTabs from '@/components/ResponsiveTabs';

const useStyles = makeStyles(() => ({
  logoContainer: {
    '& .MuiPaper-root': {
      borderRadius: 0,
      boxShadow: 'none',
      marginBlock: '1rem',
      paddingLeft: '3px',
    },
  },
  appBarWrapper: {
    background: '#FFFFFF !important',
  },
  divider: {
    marginBottom: '2rem',
  },
  content: {
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '100%',
    margin: '30px 0px 30px',
    padding: 0,
    border: '1px solid #ccc',
    borderRadius: '16px',
    background: '#FFFFFF',
  },
}));

const PoliciesContent = function () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classes = useStyles();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState('termsOfUse');

  useEffect(() => {
    setMounted(true);
    const tab = searchParams?.get('tab') || 'termsOfUse';
    setCurrentTab(tab);
    document.body.style.padding = '0';
  }, [searchParams]);

  // Handle tab changes
  const handleTabChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', newValue);
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
    setCurrentTab(newValue);
  };

  const tabData = [
    {
      value: 'termsOfUse',
      label: '服務條款',
    },
    {
      value: 'privacyPolicy',
      label: '隱私政策',
    },
    {
      value: 'cookiePolicy',
      label: 'Cookie 政策',
    },
  ];

  const renderContent = ({ policyTitle, policyContent }) => (
    <Box
      sx={{
        padding: '24px',
      }}
    >
      <Grid container>
        <Typography
          variant="h3"
          className="fr-element fr-view"
          sx={{ fontSize: '40px !important', mb: '32px' }}
        >
          {policyTitle}
        </Typography>
      </Grid>
      <Grid
        sx={{
          width: '100%',
          maxWidth: '745px',
        }}
      >
        <Box
          className="policy-content"
          sx={{
            '& h1, & h1 > p, & h1 > span': {
              fontSize: '30px',
              fontWeight: 700,
              lineHeight: 1.5,
              margin: 0,
            },
            '& h2, & h2 > p, & h2 > span': {
              fontSize: '21px',
              fontWeight: 700,
              lineHeight: 1.5,
              margin: 0,
            },
            '& h1 strong, & h2 strong': {
              textShadow:
                '0.5px 0.5px 0 rgba(0, 0, 0, 0.2), -0.5px -0.5px 0 rgba(0, 0, 0, 0.2), 0.5px -0.5px 0 rgba(0, 0, 0, 0.2), -0.5px 0.5px 0 rgba(0, 0, 0, 0.2)',
            },
            '& h3, & h3 > p, & h3 > span, & h4, & h4 > p, & h4 > span, & h5, & h5 > p, & h5 > span, & h6, & h6 > p, & h6 > span':
              {
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.5,
                margin: 0,
              },
            '& p': {
              fontSize: '16px',
              lineHeight: 1.5,
              margin: 0,
            },
            '& ul, & ol': {
              paddingLeft: '1.5rem',
            },
            '& li': {
              margin: '0',
            },
            '& strong': {
              fontWeight: 700,
            },
          }}
          dangerouslySetInnerHTML={{ __html: policyContent }}
        />
      </Grid>
    </Box>
  );

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <Box className={classes.appBarWrapper}>
        <AppBar
          position="sticky"
          sx={{
            background: 'rgba(255,255,255,0) !important',
            zIndex: theme.zIndex.appBar + 1,
            transition: theme.transitions.create(['height'], {
              duration: theme.transitions.duration.shorter,
            }),
            boxShadow: 'none',
          }}
        >
          <Container className={classes.logoContainer}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={isDownSm ? 'center' : 'flex-start'}
              sx={{
                paddingInline: '7px',
              }}
            >
              <Image
                src="/assets/images/DBS_logo.svg"
                alt="DBS's logo"
                width={200}
                height={52}
                priority
                quality={100}
                style={{
                  width: '160px',
                  height: 'auto',
                }}
              />
            </Stack>
          </Container>
        </AppBar>
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.content}>
        <Container className={classes.contentWrapper}>
          <ResponsiveTabs
            value={currentTab}
            tabData={tabData}
            onChange={handleTabChange}
          />
          {currentTab === 'termsOfUse' &&
            renderContent({
              policyTitle: TERMSOFUSETITLE,
              policyContent: TERMSOFUSE,
            })}
          {currentTab === 'privacyPolicy' &&
            renderContent({
              policyTitle: PRIVACYPOLICYTITLE,
              policyContent: PRIVACYPOLICY,
            })}
          {currentTab === 'cookiePolicy' &&
            renderContent({
              policyTitle: COOKIEPOLICYTITLE,
              policyContent: COOKIEPOLICY,
            })}
        </Container>
      </Box>
    </Box>
  );
};

const Policies = function () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PoliciesContent />
    </Suspense>
  );
};

export default Policies;
