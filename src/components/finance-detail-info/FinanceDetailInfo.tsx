'use client';

import type React from 'react';
import {
  Box,
  Card,
  Button,
  useTheme,
  Typography,
  IconButton,
  CardContent,
  useMediaQuery,
} from '@mui/material';
import { HelpRounded, EditRounded, GppMaybeRounded } from '@mui/icons-material';

interface AssessmentItem {
  question: string;
  answer: string;
  riskLevel: 'high' | 'low' | 'none';
  status?: string;
}

const FinanceDetailInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const assessmentItems: AssessmentItem[] = [
    {
      question: '您的年齡為?',
      answer: '16-18歲',
      riskLevel: 'low',
    },
    {
      question: '您的最高學歷為?',
      answer: '不識字',
      riskLevel: 'high',
    },
    {
      question: '本人是否具有身心障礙?',
      answer: '有',
      riskLevel: 'high',
    },
    {
      question: '本人是否具有身心障礙?',
      answer: '無',
      riskLevel: 'low',
    },
    {
      question: '您目前有繳交哪些社會保險？（可複選）',
      answer: '無',
      riskLevel: 'high',
    },
    {
      question: '您的性別為?',
      answer: '',
      riskLevel: 'none',
    },
  ];

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            gap: '20px',
            flex: '1 0 0',
            display: 'flex',
            overflow: 'auto',
            padding: '16px 32px',
            alignSelf: 'stretch',
            alignItems: 'flex-end',
            flexDirection: 'column',
            height: 'calc(100vh - 130px)',
            minHeight: 'calc(100vh - 130px)',
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
          <Box
            sx={{
              gap: '20px',
              display: 'flex',
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                gap: '20px',
                flex: '1 0 0',
                display: 'flex',
                padding: '16px',
                borderRadius: '8px',
                alignSelf: 'stretch',
                alignItems: 'center',
                flexDirection: 'column',
                background: 'var(--Primary-, #EBE3DD)',
              }}
            >
              <Box
                sx={{
                  gap: '16px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                }}
              >
                <Box
                  sx={{
                    gap: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                  }}
                >
                  <GppMaybeRounded
                    sx={{
                      width: '40px',
                      height: '40px',
                      color: '#212B36',
                      aspectRatio: '1/1',
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      maxHeight: '80px',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '36px',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        fontStyle: 'normal',
                        display: '-webkit-box',
                        textOverflow: 'ellipsis',
                        fontFamily: 'DFPHeiBold-B5',
                        WebkitBoxOrient: 'vertical',
                        color: 'var(--Primary-Black, #212B36)',
                      }}
                    >
                      風險評估
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '24px',
                        fontStyle: 'normal',
                        fontFamily: 'DFPHeiBold-B5',
                        color: 'var(--Primary-DBS-Red, #C00)',
                      }}
                    >
                      建議通報社會安全網
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: '1 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
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
                  >
                    編輯
                  </Button>
                  <Typography
                    sx={{
                      width: '128px',
                      fontWeight: 400,
                      fontSize: '32px',
                      textAlign: 'right',
                      lineHeight: '48px',
                      fontStyle: 'normal',
                      alignSelf: 'stretch',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-DBS-Red, #C00)',
                    }}
                  >
                    高風險
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  gap: '10px',
                  display: 'flex',
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiMedium-B5',
                  }}
                >
                  評分依據：
                </Typography>

                {assessmentItems.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      display: 'flex',
                      padding: '16px',
                      background: '#FFF',
                      borderRadius: '8px',
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      ' & .MuiCardContent-root:last-child': {
                        paddingBottom: '0px',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        gap: '16px',
                        padding: '0px',
                        display: 'flex',
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{
                          gap: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                        }}
                      >
                        <Box
                          sx={{
                            gap: '4px',
                            flex: '1 0 0',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '16px',
                              fontWeight: '400',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              fontFamily: 'DFPHeiMedium-B5',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            * {item.question}
                          </Typography>
                          <IconButton
                            sx={{
                              padding: '5px',
                              display: 'flex',
                              borderRadius: '50px',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <HelpRounded sx={{ color: '#212B36' }} />
                          </IconButton>
                          <IconButton
                            sx={{
                              padding: '5px',
                              display: 'flex',
                              borderRadius: '50px',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <EditRounded sx={{ color: '#0066CC' }} />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Button
                            sx={{
                              gap: '8px',
                              display: 'flex',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor:
                                item.riskLevel === 'high'
                                  ? '#CC0000'
                                  : item.riskLevel === 'low'
                                  ? '#118D57'
                                  : '#919EAB3D',
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '13px',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: '22px',
                                fontFamily: 'DFPHeiMedium-B5',
                                color:
                                  item.riskLevel === 'high'
                                    ? '#FFF'
                                    : item.riskLevel === 'low'
                                    ? '#FFF'
                                    : '#000',
                              }}
                            >
                              {item.riskLevel === 'none'
                                ? '尚未填寫'
                                : '低風險'}
                            </Typography>
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          gap: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '24px',
                            overflow: 'hidden',
                            fontStyle: 'normal',
                            alignSelf: 'stretch',
                            textOverflow: 'ellipsis',
                            fontFamily: 'DFPHeiBold-B5',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                        >
                          {item?.answer}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            gap: '20px',
            flex: '1 0 0',
            display: 'flex',
            padding: '16px',
            overflow: 'auto',
            alignSelf: 'stretch',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: 'calc(100vh - 170px)',
            minHeight: 'calc(100vh - 170px)',
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
          <Box
            sx={{
              gap: '20px',
              display: 'flex',
              alignSelf: 'stretch',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                gap: '20px',
                flex: '1 0 0',
                padding: '16px',
                display: 'flex',
                borderRadius: '8px',
                alignItems: 'center',
                flexDirection: 'column',
                background: 'var(--Primary-, #EBE3DD)',
              }}
            >
              <Box
                sx={{
                  gap: '8px',
                  display: 'flex',
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
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
                      gap: '10px',
                      flex: '1 0 0',
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'stretch',
                    }}
                  >
                    <GppMaybeRounded
                      sx={{
                        width: '32px',
                        height: '32px',
                        color: '#212b36',
                        aspectRatio: '1/1',
                      }}
                    />
                    <Box
                      sx={{
                        width: '125px',
                        display: 'flex',
                        maxHeight: '80px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: '24px',
                          lineHeight: '36px',
                          WebkitLineClamp: 1,
                          overflow: 'hidden',
                          fontStyle: 'normal',
                          display: '-webkit-box',
                          textOverflow: 'ellipsis',
                          fontFamily: 'DFPHeiBold-B5',
                          WebkitBoxOrient: 'vertical',
                          color: 'var(--Primary-Black, #212B36)',
                        }}
                      >
                        風險評估
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '24px',
                          fontStyle: 'normal',
                          fontFamily: 'DFPHeiBold-B5',
                          color: 'var(--Primary-DBS-Red, #C00)',
                        }}
                      >
                        建議通報社會安全網
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '32px',
                      fontWeight: '400',
                      lineHeight: '48px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-DBS-Red, #C00)',
                    }}
                  >
                    高風險
                  </Typography>
                </Box>

                <Box
                  sx={{
                    gap: '128px',
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      gap: '8px',
                      flex: '1 0 0',
                      display: 'flex',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: ' var(--Secondary-, #5C443A)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '700',
                        lineHeight: '24px',
                        fontStyle: 'normal',
                        textAlign: 'center',
                        fontFamily: 'Public Sans',
                        color: 'var(--Primary-ContrastText, #FFF)',
                      }}
                    >
                      個案摘要
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  gap: '10px',
                  display: 'flex',
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiMedium-B5',
                  }}
                >
                  評分依據：
                </Typography>
                {assessmentItems.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      display: 'flex',
                      padding: '16px',
                      background: '#FFF',
                      borderRadius: '8px',
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      ' & .MuiCardContent-root:last-child': {
                        paddingBottom: '0px',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        gap: '16px',
                        padding: '0px',
                        display: 'flex',
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{
                          gap: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                        }}
                      >
                        <Box
                          sx={{
                            gap: '4px',
                            flex: '1 0 0',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '16px',
                              fontWeight: '400',
                              lineHeight: '24px',
                              fontStyle: 'normal',
                              fontFamily: 'DFPHeiMedium-B5',
                              color: 'var(--Primary-Black, #212B36)',
                            }}
                          >
                            * {item.question}
                          </Typography>
                          <IconButton
                            sx={{
                              padding: '5px',
                              display: 'flex',
                              borderRadius: '50px',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <HelpRounded sx={{ color: '#212B36' }} />
                          </IconButton>
                          <IconButton
                            sx={{
                              padding: '5px',
                              display: 'flex',
                              borderRadius: '50px',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <EditRounded sx={{ color: '#0066CC' }} />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Button
                            sx={{
                              gap: '8px',
                              display: 'flex',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor:
                                item.riskLevel === 'high'
                                  ? '#CC0000'
                                  : item.riskLevel === 'low'
                                  ? '#118D57'
                                  : '#919EAB3D',
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '13px',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: '22px',
                                fontFamily: 'DFPHeiMedium-B5',
                                color:
                                  item.riskLevel === 'high'
                                    ? '#FFF'
                                    : item.riskLevel === 'low'
                                    ? '#FFF'
                                    : '#000',
                              }}
                            >
                              {item.riskLevel === 'none'
                                ? '尚未填寫'
                                : '低風險'}
                            </Typography>
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          gap: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '24px',
                            overflow: 'hidden',
                            fontStyle: 'normal',
                            alignSelf: 'stretch',
                            textOverflow: 'ellipsis',
                            fontFamily: 'DFPHeiBold-B5',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                        >
                          {item?.answer}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FinanceDetailInfo;
