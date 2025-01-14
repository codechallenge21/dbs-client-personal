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
          borderRadius: '4px',
          margin: '16px',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        重新命名
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '24px 16px' }}>
        <TextField
          fullWidth
          placeholder="新名字"
          value={newName}
          sx={{
            my: '16px',
          }}
          onChange={(e) => setNewName(e.target.value)}
          variant="outlined"
          size="small"
        />
      </DialogContent>
      <DialogActions sx={{ padding: '8px 16px 16px' }}>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: '#6B584C',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 16px',
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
