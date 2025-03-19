'use client';
import AddFinanceRecordDialog from '@/components/dialogs/AddFinanceRecordDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import {
  AddRounded,
  ArrowDropDownRounded,
  AttachMoneyRounded,
  DeleteRounded,
  MenuRounded,
  MoreVertRounded,
  PercentRounded,
  SearchRounded,
  StarBorderRounded,
  StarRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const tableRows = [
  {
    id: 1,
    name: 'Allen',
    gender: '男',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '逾期風險: 非常高',
    star: true,
  },
  {
    id: 2,
    name: '陳XX',
    gender: '男',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '安全',
    star: false,
  },
  {
    id: 3,
    name: '黃XX',
    gender: '男',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '疑似高風險',
    star: false,
  },
  {
    id: 4,
    name: '陳XX',
    gender: '女',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '重點關注對象',
    star: false,
  },
  {
    id: 5,
    name: '陳XX',
    gender: '女',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '逾期風險: 非常高',
    star: false,
  },
  {
    id: 6,
    name: '陳XX',
    gender: '女',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '重點關注對象',
    star: false,
  },
  {
    id: 7,
    name: '陳XX',
    gender: '女',
    description: '這是一段很長的描述，用於展示個案的狀況與需求。',
    risk: '逾期風險: 非常高',
    star: false,
  },
];
const tableData = [
  { period: 1, principal: 83, interest: 1, total: 84, balance: 917 },
  { period: 2, principal: 83, interest: 1, total: 84, balance: 833 },
  { period: 3, principal: 83, interest: 1, total: 84, balance: 750 },
  { period: 4, principal: 84, interest: 1, total: 85, balance: 666 },
  { period: 5, principal: 84, interest: 1, total: 85, balance: 582 },
  { period: 6, principal: 83, interest: 1, total: 84, balance: 499 },
  { period: 7, principal: 83, interest: 1, total: 84, balance: 415 },
  { period: 8, principal: 83, interest: 1, total: 84, balance: 332 },
  { period: 9, principal: 83, interest: 1, total: 84, balance: 248 },
  { period: 10, principal: 83, interest: 1, total: 84, balance: 165 },
  { period: 11, principal: 83, interest: 1, total: 84, balance: 81 },
  { period: 12, principal: 87, interest: 0, total: 87, balance: 0 },
];
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

const FinanceScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tabValue, setTabValue] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );
  const [loanTerm, setLoanTerm] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterest, setAnnualInterest] = useState('');
  const [repaymentMethod, setRepaymentMethod] = useState('');
  const [openFinanceDialog, setOpenFinanceDialog] = useState<boolean>(false);
  const [favoriteChannels, setFavoriteChannels] = useState<{
    [key: number]: boolean;
  }>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);

  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number
  ) => {
    e.stopPropagation();
    setSelected((prevSelected: number[]) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const handleToggle = (index: number) => {
    setFavoriteChannels((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRepaymentMethodChange = (event) => {
    setRepaymentMethod(event.target.value);
  };

  const handleCalculate = () => {
    console.log({
      repaymentMethod,
      loanAmount,
      annualInterest,
      loanTerm,
    });
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    // setCurrentMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setCurrentMenuId(null);
  };

  const handleCloseFinanceDialog = () => {
    setOpenFinanceDialog(false);
  };

  const handleRowClick = () => {
    if (anchorEl) setAnchorEl(null);
    else router.push('/finance-detail');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

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
                gap: '16px',
                flex: '1 0 0',
                height: '96.5vh',
                display: 'flex',
                borderRadius: '8px',
                padding: '16px 32px',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexDirection: 'column',
                backgroundColor: 'white',
              }}
            >
              <Box
                sx={{
                  gap: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '32px',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Primary-Black, #212B36)',
                    textAlign: 'left',
                    flex: '1 1 auto',
                  }}
                >
                  財務快篩
                </Typography>

                <Box
                  sx={{
                    gap: '16px',
                    width: '458px',
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
                          fontFamily: 'var(--font-bold)',
                          color: 'var(--Secondary-Mid-Gray, #9B9B9B)',
                        },
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment
                            sx={{ margin: '0px' }}
                            position="start"
                          >
                            <SearchRounded sx={{ color: '#9B9B9B' }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

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
                    onClick={() => setOpenFinanceDialog(true)}
                  >
                    <AddRounded sx={{ color: '#fff' }} />
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        textAlign: 'center',
                        fontStyle: 'normal',
                        fontFamily: 'var(--font-bold)',
                        color: 'var(--Primary-ContrastText, #FFF)',
                      }}
                    >
                      新增
                    </Typography>
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
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
                <Tab
                  disableRipple
                  label="貸款計算機"
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
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <TableContainer
                  sx={{
                    display: 'flex',
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Table
                    sx={{
                      display: 'flex',
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                    }}
                  >
                    <TableHead
                      sx={{
                        display: 'flex',
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <TableRow
                        sx={{
                          display: 'flex',
                          alignSelf: 'stretch',
                          alignItems: 'center',
                          background: '#F4F6F8',
                          borderBottom:
                            '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                        }}
                      >
                        <TableCell
                          sx={{
                            width: '5%',
                            display: 'flex',
                            maxHeight: '68px',
                            minHeight: '68px',
                            alignItems: 'center',
                            background: '#F4F6F8',
                            justifyContent: 'center',
                          }}
                        >
                          <Checkbox
                            sx={{
                              maxHeight: '68px',
                              minHeight: '68px',
                              color: 'default',
                              '&.Mui-checked': {
                                color: '#0000FF',
                              },
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                            // checked={isSelected}
                            // onChange={() => handleSelectRow(row.id)}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            width: '25%',
                            fontWeight: 600,
                            display: 'flex',
                            fontSize: '14px',
                            minHeight: '56px',
                            maxHeight: '56px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            alignItems: 'center',
                            background: '#F4F6F8',
                            fontFamily: 'var(--font-bold)',
                            justifyContent: 'flex-start',
                            padding: '16px 0px 16px 16px',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          姓名
                        </TableCell>
                        <TableCell
                          sx={{
                            width: '10%',
                            fontWeight: 600,
                            display: 'flex',
                            fontSize: '14px',
                            minHeight: '56px',
                            maxHeight: '56px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            alignItems: 'center',
                            background: '#F4F6F8',
                            fontFamily: 'var(--font-bold)',
                            justifyContent: 'flex-start',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          性別
                        </TableCell>
                        <TableCell
                          sx={{
                            width: '30%',
                            fontWeight: 600,
                            display: 'flex',
                            fontSize: '14px',
                            minHeight: '56px',
                            maxHeight: '56px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            alignItems: 'center',
                            background: '#F4F6F8',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          個案描述
                        </TableCell>
                        <TableCell
                          sx={{
                            width: '20%',
                            fontWeight: 600,
                            display: 'flex',
                            fontSize: '14px',
                            minHeight: '56px',
                            maxHeight: '56px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            alignItems: 'center',
                            background: '#F4F6F8',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          風險評分
                        </TableCell>
                        <TableCell
                          sx={{
                            width: '5%',
                            fontWeight: 600,
                            display: 'flex',
                            fontSize: '14px',
                            minHeight: '56px',
                            maxHeight: '56px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            padding: '16px 0px ',
                            alignItems: 'center',
                            background: '#F4F6F8',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          星標
                        </TableCell>
                        <TableCell
                          sx={{
                            width: '5%',
                            fontWeight: 600,
                            fontSize: '14px',
                            minHeight: '56px',
                            maxHeight: '56px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            padding: '16px 0px ',
                            background: '#F4F6F8',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          操作
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        display: 'flex',
                        overflow: 'hidden',
                        flexDirection: 'column',
                      }}
                    >
                      {tableRows.map((row, index) => {
                        const isSelected = selected.includes(row.id);
                        return (
                          <TableRow
                            sx={{
                              display: 'flex',
                              maxHeight: '68px',
                              minHeight: '68px',
                              cursor: 'pointer',
                            }}
                            key={row.id}
                            onClick={() => handleRowClick()}
                            hover
                          >
                            <TableCell
                              sx={{
                                width: '5%',
                                display: 'flex',
                                maxHeight: '68px',
                                minHeight: '68px',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Checkbox
                                sx={{
                                  maxHeight: '68px',
                                  minHeight: '68px',
                                  color: 'default',
                                  '&.Mui-checked': {
                                    color: '#0000FF',
                                  },
                                  '&:hover': {
                                    backgroundColor: 'transparent',
                                  },
                                }}
                                checked={isSelected}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleSelectRow(e, row.id)}
                              />
                            </TableCell>

                            <TableCell
                              sx={{
                                width: '25%',
                                display: 'flex',
                                fontWeight: 400,
                                fontSize: '14px',
                                maxHeight: '68px',
                                minHeight: '68px',
                                lineHeight: '24px',
                                fontStyle: 'normal',
                                alignItems: 'center',
                                fontFamily: 'var(--font-bold)',
                                justifyContent: 'flex-start',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.name}
                            </TableCell>

                            <TableCell
                              sx={{
                                width: '10%',
                                display: 'flex',
                                fontWeight: 400,
                                fontSize: '14px',
                                maxHeight: '68px',
                                minHeight: '68px',
                                lineHeight: '24px',
                                fontStyle: 'normal',
                                alignItems: 'center',
                                fontFamily: 'var(--font-bold)',
                                justifyContent: 'flex-start',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.gender}
                            </TableCell>

                            <TableCell
                              sx={{
                                width: '30%',
                                display: 'flex',
                                fontWeight: 400,
                                fontSize: '14px',
                                maxHeight: '68px',
                                minHeight: '68px',
                                lineHeight: '24px',
                                fontStyle: 'normal',
                                alignItems: 'center',
                                fontFamily: 'var(--font-bold)',
                                justifyContent: 'flex-start',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.description}
                            </TableCell>

                            <TableCell
                              sx={{
                                width: '20%',
                                display: 'flex',
                                fontWeight: 400,
                                fontSize: '14px',
                                maxHeight: '68px',
                                minHeight: '68px',
                                lineHeight: '24px',
                                fontStyle: 'normal',
                                alignItems: 'center',
                                fontFamily: 'var(--font-bold)',
                                justifyContent: 'flex-start',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  color:
                                    row.risk.includes('非常高') ||
                                    row.risk.includes('高')
                                      ? 'var(--Primary-DBS-Red, #C00)'
                                      : row.risk.includes('安全')
                                      ? 'var(--Status-Success, #118D57)'
                                      : 'var(--Status-Warning, #FFAB00)',
                                }}
                              >
                                {row.risk}
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: '5%',
                                border: 'none',
                                display: 'flex',
                                maxHeight: '68px',
                                minHeight: '68px',
                                padding: '16px 0px',
                                fontStyle: 'normal',
                                alignItems: 'center',
                                fontFamily: 'var(--font-bold)',
                                justifyContent: 'flex-start',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggle(index);
                              }}
                            >
                              <IconButton
                                role="button"
                                aria-label="favorite"
                                sx={{
                                  padding: '8px',
                                  borderRadius: '50px',
                                }}
                              >
                                {favoriteChannels[index] ? (
                                  <StarRounded sx={{ color: '#212B36' }} />
                                ) : (
                                  <StarBorderRounded
                                    sx={{ color: '#212B36' }}
                                  />
                                )}
                              </IconButton>
                            </TableCell>

                            <TableCell
                              sx={{
                                width: '5%',
                                display: 'flex',
                                maxHeight: '68px',
                                minHeight: '68px',
                                fontStyle: 'normal',
                                padding: '16px 0px',
                                alignItems: 'center',
                                fontFamily: 'var(--font-bold)',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <IconButton
                                sx={{
                                  padding: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRadius: '50px',
                                  justifyContent: 'center',
                                }}
                                onClick={(e) => handleMenuOpen(e, row.id)}
                              >
                                <MoreVertRounded sx={{ color: '#212B36' }} />
                              </IconButton>
                            </TableCell>

                            {/* <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              sx={{
                                borderRadius: '12px',
                              }}
                            >
                              <MenuItem
                                sx={{
                                  gap: '8px',
                                  display: 'flex',
                                  minHeight: '34px',
                                  padding: '6px 8px',
                                  alignItems: 'center',
                                  alignSelf: 'stretch',
                                  borderRadius: 'var(--Corner-Small, 8px)',
                                }}
                                onClick={handleMenuClose}
                              >
                                <StarRounded sx={{ color: '#212B36' }} />
                                <Typography
                                  sx={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    lineHeight: '24px',
                                    overflow: 'hidden',
                                    fontStyle: 'normal',
                                    textOverflow: 'ellipsis',
                                    fontFamily: 'var(--font-bold)',
                                    color: ' var(--Primary-Black, #212B36)',
                                  }}
                                >
                                  加入最愛
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                sx={{
                                  gap: '8px',
                                  display: 'flex',
                                  minHeight: '34px',
                                  padding: '6px 8px',
                                  alignItems: 'center',
                                  alignSelf: 'stretch',
                                  borderRadius: 'var(--Corner-Small, 8px)',
                                }}
                                onClick={handleMenuClose}
                              >
                                <DeleteRounded sx={{ color: '#CC0000' }} />
                                <Typography
                                  sx={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    lineHeight: '24px',
                                    overflow: 'hidden',
                                    fontStyle: 'normal',
                                    textOverflow: 'ellipsis',
                                    fontFamily: 'var(--font-bold)',
                                    color: 'var(--Primary-DBS-Red, #C00)',
                                  }}
                                >
                                  刪除
                                </Typography>
                              </MenuItem>
                            </Menu> */}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box
                  sx={{
                    gap: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Top Form Row */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'stretch',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        gap: '16px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* Repayment Method */}
                      <FormControl
                        sx={{
                          height: '56px',
                          width: '200px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <InputLabel id="repayment-method-label">
                          請選擇攤還方式
                        </InputLabel>
                        <Select
                          sx={{
                            gap: '8px',
                            flex: '1 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            borderRadius: '8px',
                            border:
                              '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                            '& .MuiOutlinedInput-input': {
                              padding: '16px 14px',
                            },
                          }}
                          labelId="repayment-method-label"
                          id="repayment-method"
                          value={repaymentMethod}
                          label="請選擇試算方式"
                          onChange={handleRepaymentMethodChange}
                        >
                          <MenuItem value="equalPrincipal">等額本金</MenuItem>
                          <MenuItem value="equalPrincipalInterest">
                            等額本息
                          </MenuItem>
                          <MenuItem value="interestOnly">只還利息</MenuItem>
                        </Select>
                      </FormControl>

                      {/* Loan Amount */}
                      <TextField
                        label="貸款金額"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            display: 'flex',
                            width: '200px',
                            height: '56px',
                            padding: '16px 14px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& fieldset': {
                              borderRadius: '8px',
                              border:
                                '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                            },
                            '&:hover fieldset': {
                              borderColor: 'black',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'black',
                            },
                            '& input': {
                              padding: '0px',
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Disabled, #919EAB)',
                              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                                {
                                  WebkitAppearance: 'none',
                                  margin: 0,
                                },
                              '&[type=number]': {
                                MozAppearance: 'textfield',
                              },
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment
                                sx={{
                                  margin: '0px',
                                  width: '40px',
                                  height: '40px',
                                  padding: '8px',
                                }}
                                position="start"
                              >
                                <AttachMoneyRounded
                                  sx={{
                                    minWidth: '24px',
                                    minHeight: '24px',
                                    color: '#9B9B9B',
                                    borderRadius: '50px',
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />

                      {/* Annual Interest */}
                      <TextField
                        label="年利率"
                        type="number"
                        value={annualInterest}
                        onChange={(e) => setAnnualInterest(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            display: 'flex',
                            width: '200px',
                            height: '56px',
                            padding: '16px 14px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& fieldset': {
                              borderRadius: '8px',
                              border:
                                '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                            },
                            '&:hover fieldset': {
                              borderColor: 'black',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'black',
                            },
                            '& input': {
                              padding: '0px',
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Disabled, #919EAB)',
                              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                                {
                                  WebkitAppearance: 'none',
                                  margin: 0,
                                },
                              '&[type=number]': {
                                MozAppearance: 'textfield',
                              },
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment
                                sx={{
                                  margin: '0px',
                                  width: '40px',
                                  height: '40px',
                                  padding: '8px',
                                }}
                                position="start"
                              >
                                <PercentRounded
                                  sx={{
                                    minWidth: '24px',
                                    minHeight: '24px',
                                    color: '#9B9B9B',
                                    borderRadius: '50px',
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />

                      {/* Loan Term */}
                      <TextField
                        label="貸款總期數"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            display: 'flex',
                            width: '200px',
                            height: '56px',
                            padding: '16px 14px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& fieldset': {
                              borderRadius: '8px',
                              border:
                                '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                            },
                            '&:hover fieldset': {
                              borderColor: 'black',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'black',
                            },
                            '& input': {
                              padding: '0px',
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Disabled, #919EAB)',
                              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                                {
                                  WebkitAppearance: 'none',
                                  margin: 0,
                                },
                              '&[type=number]': {
                                MozAppearance: 'textfield',
                              },
                            },
                          },
                        }}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment
                                sx={{
                                  margin: '0px',
                                  width: '40px',
                                  height: '40px',
                                  padding: '8px',
                                }}
                                position="start"
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '22px',
                                    fontStyle: 'normal',
                                    fontFamily: 'var(--font-medium)',
                                    color: 'var(--Text-Secondary, #637381)',
                                  }}
                                >
                                  年
                                </Typography>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        gap: '16px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        variant="contained"
                        // onClick={handleCalculate}
                        sx={{
                          gap: '8px',
                          display: 'flex',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          alignItems: 'center',
                          backgroundColor: '#FFF',
                          justifyContent: 'center',
                          border: '1px solid var(--Primary-Black, #212B36)',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '24px',
                            fontStyle: 'normal',
                            textAlign: 'center',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                        >
                          清除
                        </Typography>
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCalculate}
                        sx={{
                          gap: '8px',
                          display: 'flex',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--Secondary-, #5C443A)',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '24px',
                            fontStyle: 'normal',
                            textAlign: 'center',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Primary-ContrastText, #FFF)',
                          }}
                        >
                          開始試算
                        </Typography>
                      </Button>
                    </Box>
                  </Box>

                  {/* Table */}
                  <TableContainer
                    sx={{
                      maxHeight: '670px',
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
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            期別
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            償還本金
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            償還利息
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            償還本利和
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            貸款餘額
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row) => (
                          <TableRow key={row.period}>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.period}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.principal}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.interest}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.total}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.balance}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
            </Box>
          </ToolbarDrawer>
        </Box>
      )}
      {isMobile && (
        <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              background: 'var(--Primary-White, #FFF)',
            }}
          >
            {/* {Header} */}
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
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Primary, #212B36)',
                  }}
                >
                  財務快篩
                </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                gap: '16px',
                width: '100%',
                display: 'flex',
                padding: '16px',
                background: '#FFF',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flex: tabValue === 0 ? '1 0 0' : 'default',
              }}
            >
              {tabValue === 0 && (
                <Box
                  sx={{
                    gap: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
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
                          fontFamily: 'var(--font-bold)',
                          color: 'var(--Secondary-Mid-Gray, #9B9B9B)',
                        },
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment
                            sx={{ margin: '0px' }}
                            position="start"
                          >
                            <SearchRounded sx={{ color: '#9B9B9B' }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
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
                    onClick={() => setOpenFinanceDialog(true)}
                  >
                    <AddRounded sx={{ color: '#fff' }} />
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        textAlign: 'center',
                        fontStyle: 'normal',
                        fontFamily: 'var(--font-bold)',
                        color: 'var(--Primary-ContrastText, #FFF)',
                      }}
                    >
                      新增
                    </Typography>
                  </IconButton>
                </Box>
              )}

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
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
                <Tab
                  disableRipple
                  label="貸款計算機"
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
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
              </Tabs>

              {tabValue === 0 && (
                <Box
                  sx={{
                    gap: '16px',
                    flex: '1 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    maxHeight: '1570px',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                      height: '64px',
                      opacity: '0.48',
                    },
                    '&::-webkit-scrollbar-track': {
                      borderRadius: '10px',
                      background: '#f1f1f1',
                      opacity: '0.48',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '12px',
                      background: 'var(--Grey-600, #637381)',
                      opacity: '0.48',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#555',
                      opacity: '0.48',
                    },
                  }}
                >
                  {tableRows.map((rowData, index) => (
                    <Card
                      key={rowData.id}
                      sx={{
                        width: '100%',
                        minHeight: '228px',
                        borderRadius: '16px',
                        background: 'var(--Primary-White, #FFF)',
                        boxShadow:
                          '0px 12px 24px -4px rgba(17, 68, 85, 0.12), 0px 0px 2px 0px rgba(17, 68, 85, 0.12)',
                        ' & .MuiCardContent-root': {
                          paddingBottom: '16px',
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          gap: '8px',
                          display: 'flex',
                          minWidth: '100%',
                          minHeight: '228px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 400,
                              color: '#212B36',
                              fontSize: '24px',
                              lineHeight: '36px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-bold)',
                            }}
                          >
                            {rowData.name}
                          </Typography>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, rowData.id)}
                            sx={{
                              padding: '0px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <MoreVertRounded
                              sx={{
                                width: '20px',
                                height: '20px',
                                color: '#212B36',
                              }}
                            />
                          </IconButton>
                        </Box>

                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 400,
                              minWidth: '80px',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-medium)',
                              color: 'var(--Primary-Blue, #06C)',
                            }}
                          >
                            性別
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: '14px',
                              overflow: 'hidden',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {rowData.gender}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: '100%',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 400,
                              minWidth: '80px',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-medium)',
                              color: 'var(--Primary-Blue, #06C)',
                            }}
                          >
                            個案描述
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: '14px',
                              overflow: 'hidden',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            {rowData.description}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 400,
                              minWidth: '80px',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              fontFamily: 'var(--font-medium)',
                              color: 'var(--Primary-Blue, #06C)',
                            }}
                          >
                            風險評分
                          </Typography>
                          <Box
                            component="span"
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              overflow: 'hidden',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              whiteSpace: 'nowrap',
                              alignSelf: 'stretch',
                              textOverflow: 'ellipsis',
                              fontFamily: 'var(--font-bold)',
                              color:
                                rowData.risk.includes('非常高') ||
                                rowData.risk.includes('高')
                                  ? 'var(--Primary-DBS-Red, #C00)'
                                  : rowData.risk.includes('安全')
                                  ? 'var(--Status-Success, #118D57)'
                                  : 'var(--Status-Warning, #FFAB00)',
                            }}
                          >
                            {rowData.risk}
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(index);
                            }}
                            sx={{ p: 0 }}
                          >
                            {favoriteChannels[index] ? (
                              <StarRounded sx={{ color: '#000' }} />
                            ) : (
                              <StarBorderRounded sx={{ color: '#000' }} />
                            )}
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              {tabValue === 1 && (
                <Box
                  sx={{
                    gap: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      gap: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Repayment Method */}
                    <FormControl
                      sx={{
                        width: '100%',
                        height: '56px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <InputLabel id="repayment-method-label">
                        請選擇攤還方式
                      </InputLabel>
                      <Select
                        sx={{
                          gap: '8px',
                          flex: '1 0 0',
                          display: 'flex',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                          borderRadius: '8px',
                          border:
                            '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                          '& .MuiOutlinedInput-input': {
                            padding: '16px 14px',
                          },
                        }}
                        labelId="repayment-method-label"
                        id="repayment-method"
                        value={repaymentMethod}
                        label="請選擇試算方式"
                        onChange={handleRepaymentMethodChange}
                      >
                        <MenuItem value="equalPrincipal">等額本金</MenuItem>
                        <MenuItem value="equalPrincipalInterest">
                          等額本息
                        </MenuItem>
                        <MenuItem value="interestOnly">只還利息</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Loan Amount */}
                    <TextField
                      fullWidth
                      label="貸款金額"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '56px',
                          display: 'flex',
                          padding: '16px 14px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& fieldset': {
                            borderRadius: '8px',
                            border:
                              '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                          },
                          '&:hover fieldset': {
                            borderColor: 'black',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                          '& input': {
                            padding: '0px',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Disabled, #919EAB)',
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                              {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                            '&[type=number]': {
                              MozAppearance: 'textfield',
                            },
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                              sx={{
                                margin: '0px',
                                width: '40px',
                                height: '40px',
                                padding: '8px',
                              }}
                              position="start"
                            >
                              <AttachMoneyRounded
                                sx={{
                                  minWidth: '24px',
                                  minHeight: '24px',
                                  color: '#9B9B9B',
                                  borderRadius: '50px',
                                }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    {/* Annual Interest */}
                    <TextField
                      fullWidth
                      label="年利率"
                      type="number"
                      value={annualInterest}
                      onChange={(e) => setAnnualInterest(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '56px',
                          display: 'flex',
                          padding: '16px 14px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& fieldset': {
                            borderRadius: '8px',
                            border:
                              '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                          },
                          '&:hover fieldset': {
                            borderColor: 'black',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                          '& input': {
                            padding: '0px',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Disabled, #919EAB)',
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                              {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                            '&[type=number]': {
                              MozAppearance: 'textfield',
                            },
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                              sx={{
                                margin: '0px',
                                width: '40px',
                                height: '40px',
                                padding: '8px',
                              }}
                              position="start"
                            >
                              <PercentRounded
                                sx={{
                                  minWidth: '24px',
                                  minHeight: '24px',
                                  color: '#9B9B9B',
                                  borderRadius: '50px',
                                }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    {/* Loan Term */}
                    <TextField
                      fullWidth
                      label="貸款總期數"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '56px',
                          display: 'flex',
                          padding: '16px 14px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& fieldset': {
                            borderRadius: '8px',
                            border:
                              '1px solid var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
                          },
                          '&:hover fieldset': {
                            borderColor: 'black',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                          '& input': {
                            padding: '0px',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            fontFamily: 'var(--font-bold)',
                            color: 'var(--Text-Disabled, #919EAB)',
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                              {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                            '&[type=number]': {
                              MozAppearance: 'textfield',
                            },
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                              sx={{
                                margin: '0px',
                                width: '40px',
                                height: '40px',
                                padding: '8px',
                              }}
                              position="start"
                            >
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '22px',
                                  fontStyle: 'normal',
                                  fontFamily: 'var(--font-medium)',
                                  color: 'var(--Text-Secondary, #637381)',
                                }}
                              >
                                年
                              </Typography>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      gap: '16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="contained"
                      // onClick={handleCalculate}
                      sx={{
                        gap: '8px',
                        display: 'flex',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        justifyContent: 'center',
                        border: '1px solid var(--Primary-Black, #212B36)',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '14px',
                          lineHeight: '24px',
                          fontStyle: 'normal',
                          textAlign: 'center',
                          fontFamily: 'var(--font-bold)',
                          color: 'var(--Primary-Black, #212B36)',
                        }}
                      >
                        清除
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleCalculate}
                      sx={{
                        gap: '8px',
                        display: 'flex',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--Secondary-, #5C443A)',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '14px',
                          lineHeight: '24px',
                          fontStyle: 'normal',
                          textAlign: 'center',
                          fontFamily: 'var(--font-bold)',
                          color: 'var(--Primary-ContrastText, #FFF)',
                        }}
                      >
                        開始試算
                      </Typography>
                    </Button>
                  </Box>
                  {/* Table */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            期別
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            償還本金
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            償還利息
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            償還本利和
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '22px',
                              fontStyle: 'normal',
                              background: '#919EAB33',
                              fontFamily: 'var(--font-bold)',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            貸款餘額
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row) => (
                          <TableRow key={row.period}>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.period}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.principal}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.interest}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.total}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                fontFamily: 'var(--font-bold)',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              {row.balance}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          </Box>
        </ToolbarDrawer>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiMenu-list': {
            width: '200px',
          },
          '& .MuiPaper-root': {
            gap: '4px',
            width: '200px',
            padding: '4px',
            display: 'flex',
            borderRadius: '12px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          },
        }}
      >
        <MenuItem
          sx={{
            gap: '8px',
            width: '100%',
            display: 'flex',
            minHeight: '34px',
            padding: '6px 8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderRadius: 'var(--Corner-Small, 8px)',
          }}
          // onClick={handleEdit}
        >
          <StarRounded sx={{ color: '#212B36' }} />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              overflow: 'hidden',
              fontStyle: 'normal',
              textOverflow: 'ellipsis',
              fontFamily: 'var(--font-bold)',
              color: ' var(--Primary-Black, #212B36)',
            }}
          >
            加入最愛
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{
            gap: '8px',
            display: 'flex',
            minHeight: '34px',
            padding: '6px 8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderRadius: 'var(--Corner-Small, 8px)',
          }}
          // onClick={handleDelete}
        >
          <DeleteRounded sx={{ color: '#CC0000' }} />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              overflow: 'hidden',
              fontStyle: 'normal',
              textOverflow: 'ellipsis',
              fontFamily: 'var(--font-bold)',
              color: 'var(--Primary-DBS-Red, #C00)',
            }}
          >
            刪除
          </Typography>
        </MenuItem>
      </Menu>

      <AddFinanceRecordDialog
        open={openFinanceDialog}
        onClose={handleCloseFinanceDialog}
      />
    </>
  );
};

export default FinanceScreen;
