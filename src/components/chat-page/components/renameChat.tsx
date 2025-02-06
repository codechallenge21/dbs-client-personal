'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';

interface RenameDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  initialName?: string;
}

export default function RenameDialog({
  open,
  onClose,
  onSave,
  initialName = '',
}: RenameDialogProps) {
  const [newName, setNewName] = useState(initialName);

  const handleSave = () => {
    onSave(newName);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '8px',
          margin: '16px',
          width: '460px',
          height: '179px',
          minWidth: '300px',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 11px 8px 24px',
          color: 'var(--Primary-Black, #212B36)',
          fontFamily: 'DFPHeiBold-B5',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        重新命名
        <IconButton
          role="button"
          aria-label="Close"
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary', padding: '8px' }}
        >
          <Close sx={{ color: '#212B36' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '0 24px' }}>
        <TextField
          fullWidth
          placeholder="新名字"
          value={newName}
          sx={{
            mt: '16px',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
          }}
          onChange={(e) => setNewName(e.target.value)}
          variant="outlined"
          size="small"
          slotProps={{
            htmlInput: {
              sx: {
                padding: '16px 14px',
                color: 'var(--Text-Primary, #212B36)',
                fontFamily: 'DFPHeiMedium-B5',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '22px',
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '4px 24px 16px 24px' }}>
        <button
          role="button"
          aria-label="Save"
          onClick={handleSave}
          style={{
            backgroundColor: '#6B584C',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          確認
        </button>
      </DialogActions>
    </Dialog>
  );
}
