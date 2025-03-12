'use client';

import type React from 'react';
import { useCallback, useState, useContext } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import { useSearchParams } from 'next/navigation';
import { SnackbarContext } from '@/context/SnackbarContext';

interface NegativeFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  userChatMessage: any;
  setUserFeedback: React.Dispatch<React.SetStateAction<string>>;
}

export default function NegativeFeedbackModal({
  open,
  onClose,
  userChatMessage,
  setUserFeedback,
}: NegativeFeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const searchParams = useSearchParams();
  const { showSnackbar } = useContext(SnackbarContext);
  const organizationChannelId = searchParams.get('organizationChannelId') ?? '';
  const { excute: submitUserInputs } = useAxiosApi(apis.addUserFeedback);
  const { excute: getUserFeedback } = useAxiosApi(apis.getUserFeedback);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setFeedbackType(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackText(event.target.value);
  };

  const fetchUserFeedback = useCallback(
    async (organizationChannelId: string) => {
      try {
        const res = await getUserFeedback({
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
          organizationChannelId,
          messageId: userChatMessage.organizationChannelMessageId,
        });
        console.log('res for nagative feedback', res.data);
        setUserFeedback(
          // res.data.organizationChannelFeedbackType
          'NEGATIVE'
        );
      } catch (error) {
        console.error('Failed to fetch channel details:', error);
      }
    },
    [userChatMessage, getUserFeedback, setUserFeedback]
  );

  const handleSubmit = async () => {
    try {
      await submitUserInputs({
        organizationChannelFeedbackTarget: 'AI_RESPONSE',
        organizationChannelFeedbackTargetId:
          userChatMessage.organizationChannelMessageId,
        organizationChannelFeedbackType: 'NEGATIVE',
        organizationId: 'yMJHyi6R1CB9whpdNvtA',
        organizationChannelFeedbackComment: feedbackText,
        organizationChannelFeedbackNegativeCategory: feedbackType,
      });
      await fetchUserFeedback(organizationChannelId);
      onClose();
    } catch (error) {
      showSnackbar('出了點問題', 'error');
      console.error('Error submitting feedback:', error);
    } finally {
      setFeedbackType('');
      setFeedbackText('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          fontWeight: 'bold',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          回饋
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'black',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ mb: 1, fontSize: '0.9rem' }}>
              您希望報告問題的類型？（選填）
            </Typography>
            <FormControl fullWidth>
              <Select
                value={feedbackType}
                onChange={handleTypeChange}
                displayEmpty
                sx={{
                  borderRadius: '4px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography sx={{ color: 'text.secondary' }}>
                        請選擇選項
                      </Typography>
                    );
                  }
                  return selected;
                }}
              >
                <MenuItem value="FACTUAL_INACCURACY">
                  FACTUAL_INACCURACY
                </MenuItem>
                <MenuItem value="INCOMPLETE_ANSWER">INCOMPLETE_ANSWER</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontSize: '0.9rem' }}>
              請詳細說明：（選填）
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="有什麼可以改進的地方嗎？請提供您的建議"
              value={feedbackText}
              onChange={handleTextChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              p: 1.5,
              borderRadius: '4px',
            }}
          >
            <InfoIcon
              sx={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '1.2rem', mt: 0.2 }}
            />
            <Typography
              sx={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.7)' }}
            >
              提交此報告將把您的回饋發送給eGroup，以便未來改進我們的模型。
              <Typography
                component="span"
                sx={{
                  color: '#1976d2',
                  ml: 0.5,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                了解更多
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#6d4c41',
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#5d4037',
              },
              px: 3,
              py: 1,
              borderRadius: '4px',
            }}
          >
            傳送
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
