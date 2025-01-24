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
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '460px',
          minHeight: '80px',
          maxHeight: 'calc(100% - 64px)',
          borderRadius: '16px',
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
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            height: '40px',
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
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'black',
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          id="edit-dialog-name-input"
          data-tid="edit-dialog-name-input"
          variant="standard"
          sx={{ width: '100%', pt: 2 }}
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
