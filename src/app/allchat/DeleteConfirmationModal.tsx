'use client';

import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Channel } from './ViewAllHistory';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  ChannelName: Channel[];
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onDelete,
  ChannelName,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          p: 3,
          mx: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          aria-label="關閉"
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          id="delete-modal-title"
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: 500,
          }}
        >
          刪除紀錄
        </Typography>

        {/* Content */}
        <Typography sx={{ mb: 3 }}>
          {ChannelName.map((channel, index) => (
            <div key={index}>{channel.title}</div>
          ))}
        </Typography>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            onClick={onDelete}
            sx={{
              bgcolor: 'error.main',
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            刪除
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
