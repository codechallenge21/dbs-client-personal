import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  useTheme,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
  TableContainer,
  InputAdornment,
} from '@mui/material';
import {
  AddRounded,
  AssessmentRounded,
  MoreVertRounded,
  SearchRounded,
} from '@mui/icons-material';

const tableData = [
  {
    id: 1,
    帳務名稱: '薪水',
    發生時間: '2025/08/04',
    填單時間: '2025/08/04',
    金額: 1000,
  },
  {
    id: 2,
    帳務名稱: '薪水',
    發生時間: '2025/07/04',
    填單時間: '2025/08/04',
    金額: 1000,
  },
  {
    id: 3,
    帳務名稱: '薪水',
    發生時間: '2025/06/04',
    填單時間: '2025/07/04',
    金額: 1000,
  },
  {
    id: 4,
    帳務名稱: '薪水',
    發生時間: '2025/05/04',
    填單時間: '2025/06/04',
    金額: 1000,
  },
  {
    id: 5,
    帳務名稱: '薪水',
    發生時間: '2025/04/04',
    填單時間: '2025/05/04',
    金額: 1000,
  },
  {
    id: 6,
    帳務名稱: '薪水',
    發生時間: '2025/03/04',
    填單時間: '2025/04/04',
    金額: 1000,
  },
  {
    id: 7,
    帳務名稱: '薪水',
    發生時間: '2025/02/04',
    填單時間: '2025/03/04',
    金額: 1000,
  },
  {
    id: 8,
    帳務名稱: '薪水',
    發生時間: '2025/01/04',
    填單時間: '2025/02/04',
    金額: 1000,
  },
];

const FinanceDetailInventorySheet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            gap: '14px',
            flex: '1 0 0',
            display: 'flex',
            padding: '16px 32px',
            alignItems: 'center',
            flexDirection: 'column',
            height: 'calc(100vh - 135px)',
            minHeight: 'calc(100vh - 135px)',
          }}
        >
          {/* {Header} */}
          <Box
            sx={{
              gap: '10px',
              display: 'flex',
              alignSelf: 'stretch',
              alignItems: 'flex-end',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                gap: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {/* Input Box */}
              <TextField
                fullWidth
                placeholder="搜尋頻道"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '36px',
                    display: 'flex',
                    '& fieldset': {
                      borderRadius: '8px',
                      border:
                        '1px solid var(--input-Outline-Stoke-Default, rgba(145, 158, 171, 0.20))',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                    '& input': {
                      fontWeight: 400,
                      padding: '0 8px',
                      fontSize: '14px',
                      lineHeight: '24px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Secondary-Mid-Gray, #9B9B9B)',
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment sx={{ margin: '0px' }} position="start">
                        <SearchRounded sx={{ color: '#9B9B9B' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <IconButton
                sx={{
                  width: '36px',
                  height: '36px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AssessmentRounded
                  sx={{
                    width: '24px',
                    height: '24px',
                    flexShrink: '0',
                    color: '#212B36',
                  }}
                />
              </IconButton>

              <IconButton
                role="button"
                aria-label="Add Record"
                sx={{
                  gap: '8px',
                  display: 'flex',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--Secondary-, #5C443A)',
                  '&:hover': {
                    background: 'rgba(92, 68, 58, 0.8)',
                  },
                  '&:active': {
                    background: 'rgba(92, 68, 58, 0.6)',
                  },
                }}
                // onClick={() => setOpenFinanceDialog(true)}
              >
                <AddRounded sx={{ color: '#fff' }} />
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Primary-ContrastText, #FFF)',
                  }}
                >
                  新增
                </Typography>
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              gap: '16px',
              flex: '1 0 0',
              display: 'flex',
              alignSelf: 'stretch',
              paddingBottom: '16px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: 'calc(100vh - 185px)',
              minHeight: 'calc(100vh - 185px)',
            }}
          >
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
                label="收入"
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
                label="支出"
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
                label="資產"
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
                label="負債"
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
            <TableContainer
              sx={{
                overflowY: 'auto',
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '22px',
                        fontStyle: 'normal',
                        background: '#F5F5F5',
                        fontFamily: 'Public Sans',
                        color: 'var(--Text-Primary, #212B36)',
                      }}
                    >
                      帳務名稱
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '22px',
                        fontStyle: 'normal',
                        background: '#F5F5F5',
                        fontFamily: 'Public Sans',
                        color: 'var(--Text-Primary, #212B36)',
                      }}
                    >
                      發生時間
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '22px',
                        fontStyle: 'normal',
                        background: '#F5F5F5',
                        fontFamily: 'Public Sans',
                        color: 'var(--Text-Primary, #212B36)',
                      }}
                    >
                      填寫時間
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '22px',
                        fontStyle: 'normal',
                        background: '#F5F5F5',
                        fontFamily: 'Public Sans',
                        color: 'var(--Text-Primary, #212B36)',
                      }}
                    >
                      金額
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontStyle: 'normal',
                          fontFamily: 'Public Sans',
                          color: 'var(--Text-Primary, #212B36)',
                        }}
                      >
                        {row.帳務名稱}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontStyle: 'normal',
                          fontFamily: 'Public Sans',
                          color: 'var(--Text-Primary, #212B36)',
                        }}
                      >
                        {row.發生時間}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontStyle: 'normal',
                          fontFamily: 'Public Sans',
                          color: 'var(--Text-Primary, #212B36)',
                        }}
                      >
                        {row.填單時間}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontStyle: 'normal',
                          fontFamily: 'Public Sans',
                          color: 'var(--Text-Primary, #212B36)',
                        }}
                      >
                        {row.金額}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            gap: '16px',
            height: '100%',
            display: 'flex',
            flexShrink: '0',
            padding: '0px 16px',
            alignSelf: 'stretch',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* {Tabs Header} */}
          <Box
            sx={{
              gap: '16px',
              flex: '1 0 0',
              display: 'flex',
              alignSelf: 'stretch',
              paddingBottom: '16px',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                gap: '40px',
                display: 'flex',
                padding: '0px 20px',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderBottom:
                  '2px solid var(--transparent-grey-8, rgba(145, 158, 171, 0.08))',
                '& .MuiTabs-flexContainer': {
                  gap: '40px',
                },
              }}
              slotProps={{
                indicator: {
                  sx: {
                    height: '3px',
                    backgroundColor: '#212B36',
                  },
                },
              }}
            >
              <Tab
                disableRipple
                label="收入"
                sx={{
                  maxWidth: '48px',
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
                label="支出"
                sx={{
                  maxWidth: '48px',
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
                label="資產"
                sx={{
                  maxWidth: '48px',
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
                label="負債"
                sx={{
                  maxWidth: '48px',
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
          </Box>

          <Box
            sx={{
              gap: '8px',
              flex: '1 0 0',
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              flexDirection: 'column',
            }}
          >
            {tabValue === 0 && (
              <>
                {tableData.map((entry, index) => (
                  <Card
                    key={index}
                    sx={{
                      gap: '8px',
                      padding: '16px',
                      display: 'flex',
                      minWidth: '300px',
                      maxwidth: '384px',
                      minHeight: '146px',
                      borderRadius: '16px',
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      background: 'var(--Primary-White, #FFF)',
                      boxShadow:
                        '0px 12px 24px -4px rgba(17, 68, 85, 0.12), 0px 0px 2px 0px rgba(17, 68, 85, 0.12)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignSelf: 'stretch',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '24px',
                          color: ' #212B36',
                          fontWeight: '400',
                          lineHeight: '36px',
                          fontStyle: 'normal',
                          fontFamily: 'DFPHeiBold-B5',
                        }}
                      >
                        薪水
                      </Typography>
                      <IconButton
                        aria-label="more options"
                        sx={{
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MoreVertRounded sx={{ color: '#212B36' }} />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignSelf: 'stretch',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="#1877f2"
                        sx={{ fontWeight: 'medium' }}
                      >
                        金額
                      </Typography>
                      <Typography variant="body2">{entry.填單時間}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignSelf: 'stretch',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="#1877f2"
                        sx={{ fontWeight: 'medium' }}
                      >
                        發生時間
                      </Typography>
                      <Typography variant="body2">{entry.帳務名稱}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignSelf: 'stretch',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="#1877f2"
                        sx={{ fontWeight: 'medium' }}
                      >
                        填寫時間
                      </Typography>
                      <Typography variant="body2">{entry.金額}</Typography>
                    </Box>
                  </Card>
                ))}
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default FinanceDetailInventorySheet;
