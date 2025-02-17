'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  useTheme,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

interface EditDialogProps {
  open: boolean;
  onClose: (event: React.MouseEvent) => void;
  editableName?: string;
  onConfirm: (newTitle: string) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  onConfirm,
  editableName,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [inputValue, setInputValue] = useState<string>();

  useEffect(() => {
    setInputValue(editableName || '');
  }, [editableName]);

  return (
    <Dialog
      role="dialog"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '460px',
            minHeight: '80px',
            maxHeight: 'calc(100% - 64px)',
            borderRadius: '16px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          paddingTop: '8px',
          paddingLeft: '24px',
          paddingRight: '11px',
          paddingBottom: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontSize: '24px',
            fontWeight: '400',
            fontStyle: 'normal',
            lineHeight: 'normal',
            fontFamily: 'DFPHeiBold-B5',
          }}
        >
          重新命名
        </Typography>
        <IconButton
          role="button"
          aria-label="close"
          onClick={(e) => {
            if (onClose) onClose(e);
            setInputValue(editableName || '');
          }}
          sx={{
            color: 'black',
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <TextField
          aria-label="Edit Name"
          id="edit-dialog-name-input"
          data-tid="edit-dialog-name-input"
          sx={{
            pt: 2,
            gap: '8px',
            width: '100%',
            padding: '0px',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            alignSelf: 'stretch',
            '& .MuiInputBase-root': {
              width: '85%',
              padding: '16px 14px',
              '& input': {
                padding: '0px',
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
              '&:hover fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
              '&.Mui-focused fieldset': {
                borderColor:
                  'var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))',
              },
            },
          }}
          placeholder="請輸入名稱以刪除"
          value={inputValue}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setInputValue(value);
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          mt: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: '0px !important',
          paddingLeft: '32px !important',
          paddingRight: '24px !important',
          paddingBottom: '16px !important',
        }}
      >
        <Button
          role="button"
          aria-label="Confirm"
          variant="contained"
          onClick={() => {
            if (inputValue?.trim()) {
              onConfirm(inputValue);
            }
          }}
          disabled={!inputValue}
          sx={{
            borderRadius: '8px',
            backgroundColor: 'red',
            padding: isMobile ? '8px 16px' : '6px 12px',
            border: '1px solid var(--Secondary-, #5C443A)',
            background: 'var(--Secondary-, #5C443A)',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              textAlign: 'center',
              fontStyle: 'normal',
              lineHeight: 'normal',
              fontFamily: 'Open Sans',
              color: 'var(--Error-ContrastText, #FFF)',
            }}
          >
            確認
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
