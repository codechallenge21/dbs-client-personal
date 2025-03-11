import React from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  EditRounded,
  DeleteRounded,
  MoreVertRounded,
  ArrowDropDownRounded,
} from '@mui/icons-material';

const menuActions = [
  {
    title: (
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: '400',
          overflow: 'hidden',
          fontStyle: 'normal',
          lineHeight: 'normal',
          textOverflow: 'ellipsis',
          fontFamily: 'var(--font-bold)',
          color: 'var(--Primary-Black, #000)',
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
          color: 'red',
          fontSize: '16px',
          fontWeight: '400',
          overflow: 'hidden',
          fontStyle: 'normal',
          lineHeight: 'normal',
          textOverflow: 'ellipsis',
          fontFamily: 'var(--font-bold)',
        }}
      >
        刪除
      </Typography>
    ),
    icon: <DeleteRounded sx={{ color: 'red' }} />,
  },
];

const EditableItem: React.FC<{
  index: number;
  isChannelSummary?: boolean;
  activeIndex: number | null;
  toolsAnchor: HTMLElement | null;
  handleCloseToolsMenu: () => void;
  handleOpenEditChannelDialog?: (event: React.MouseEvent) => void;
  handleDeleteChannelOpenConfirmDialog: (event: React.MouseEvent) => void;
  setToolsAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  anchorOrigin: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}> = ({
  index,
  activeIndex,
  toolsAnchor,
  handleMenuOpen,
  isChannelSummary,
  handleCloseToolsMenu,
  handleOpenEditChannelDialog,
  handleDeleteChannelOpenConfirmDialog,
  anchorOrigin,
  transformOrigin,
}) => {
  return (
    <>
      <IconButton
        disableRipple
        disableFocusRipple
        aria-label="Menu"
        onClick={(event) => {
          event.stopPropagation();
          handleMenuOpen(event, index);
        }}
        sx={{
          padding: '0px',
          '&:focus-visible': {
            backgroundColor: 'rgba(204, 0, 0, 0.08)',
            border: 'rgba(145, 158, 171, 0.4)',
            borderStyle: 'solid',
          },
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
          '&:active': {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        {isChannelSummary ? (
          <ArrowDropDownRounded sx={{ color: 'black' }} />
        ) : (
          <MoreVertRounded sx={{ color: 'black' }} />
        )}
      </IconButton>
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor) && activeIndex === index}
        onClose={handleCloseToolsMenu}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            sx: {
              maxWidth: '199px',
              minHeight: '80px',
              padding: '4px',
              borderRadius: '12px',
              '& .MuiList-root': {
                padding: '0px',
              },
            },
          },
        }}
      >
        {menuActions.map((item, i) => (
          <MenuItem
            key={i}
            sx={{
              width: '175px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '6px 8px',
              '&:hover': {
                backgroundColor: '#F5F5F5',
                borderRadius: '6px',
              },
            }}
            onClick={
              i === 1
                ? handleDeleteChannelOpenConfirmDialog
                : handleOpenEditChannelDialog
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EditableItem;
