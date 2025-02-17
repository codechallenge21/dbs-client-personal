'use client';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';

interface EditDeleteModalProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const menuActions = [
  {
    title: (
      <Typography
        sx={{
          overflow: 'hidden',
          color: 'var(--Primary-Black, #000)',
          textOverflow: 'ellipsis',
          fontFamily: 'DFPHeiBold-B5',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        重新命名
      </Typography>
    ),
    icon: <EditRounded sx={{ color: 'black' }} />,
  },
  {
    title: (
      <Typography
        sx={{
          overflow: 'hidden',
          color: 'red',
          textOverflow: 'ellipsis',
          fontFamily: 'DFPHeiBold-B5',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        刪除
      </Typography>
    ),
    icon: <DeleteRounded sx={{ color: 'red' }} />,
  },
];

export default function EditDeleteModal({
  anchorEl,
  onClose,
  onEdit,
  onDelete,
}: EditDeleteModalProps) {
  return (
    <Menu
      role="dialog"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          minWidth: '160px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          ml: '-36px',
        },
      }}
      anchorOrigin={{
        vertical: 'bottom', // Align vertically to the center
        horizontal: 'right', // Align to the right side of the anchor element
      }}
      transformOrigin={{
        vertical: 'top', // Transform origin to match the vertical alignment
        horizontal: 'left', // Ensure the menu starts from the left edge of its anchor
      }}
    >
      {menuActions.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            if (index === 0) {
              onEdit();
            } else {
              onDelete();
            }
            onClose();
          }}
          sx={{
            gap: 1,
            py: 1,
            color: index === 0 ? 'inherit' : 'error.main',
            '&:hover': {
              backgroundColor: index === 0 ? 'action.hover' : 'error.lighter',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>{item.icon}</ListItemIcon>
          {item.title}
        </MenuItem>
      ))}
    </Menu>
  );
}
