'use client';

import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { OrganizationChannelData } from '@/interfaces/entities';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  channelName: OrganizationChannelData[] | object[];
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onDelete,
  channelName,
}: DeleteConfirmationModalProps) {
  const singleChannelTitle =
    channelName.length === 1 &&
    channelName?.[0] &&
    'organizationChannelTitle' in channelName[0]
      ? (channelName[0] as OrganizationChannelData).organizationChannelTitle
      : null;
  return (
    <Modal
      role="dialog"
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
          py: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          role="button"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          id="delete-modal-title"
          variant="h6"
          component="h2"
          sx={{
            mb: 3,
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'var(--font-bold)',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          刪除紀錄
        </Typography>

        {/* Content */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: 'var(--Primary-Black, #212B36)',
              fontFamily: 'var(--font-bold)',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            {singleChannelTitle
              ? `即將刪除
 ${singleChannelTitle}`
              : `即將刪除 ${channelName.length} 個頻道`}
          </Typography>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            role="button"
            aria-label="Delete"
            variant="contained"
            onClick={onDelete}
            sx={{
              bgcolor: '#CC0000',
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
