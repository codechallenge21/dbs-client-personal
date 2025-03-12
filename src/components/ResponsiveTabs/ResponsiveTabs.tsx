import React, { forwardRef, useEffect, useState } from 'react';

import { useTheme, makeStyles } from '@mui/styles';
import {
  Theme,
  useMediaQuery,
  Tooltip,
  TabProps,
  Tab,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Select,
  Tabs,
} from '@mui/material';

import useReduxDrawer from '@/utils/useReduxDrawer';

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    position: 'absolute',
    zIndex: theme.zIndex.appBar - 100,
    '& .MuiBackdrop-root, & .MuiModal-backdrop': {
      zIndex: 'unset',
    },
  },
  menuItem: {
    width: '100%',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 500,
    justifyContent: 'center',
  },
  dropdownItem: {},
  customBadge: {
    borderRadius: '6px',
    fontSize: '12px',
    padding: '2px 6px 2px 6px',
    height: '24px',
    backgroundColor: 'rgba(32, 101, 209, 0.16)',
    color: 'rgba(29, 94, 198, 1)',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  truncate: {
    maxWidth: '120px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));

export interface TabDataItem {
  label: string;
  value: string;
  id?: string;
  testId?: string;
}

export interface ItemCount {
  id: string;
  count: number;
}

export interface ResponsiveTabsProps extends Omit<TabProps, 'onChange'> {
  tabName?: string;
  value?: string;
  tabData?: TabDataItem[];
  onChange?: (value: string) => void;
  usedInDrawer?: boolean;
  itemCounts?: ItemCount[];
  handleCloseDrawer?: () => void;
  id?: string;
}

const ResponsiveTabs = forwardRef<HTMLDivElement, ResponsiveTabsProps>(
  (props, ref) => {
    const {
      tabName = '清單',
      value: valueData = '',
      tabData = [],
      onChange,
      usedInDrawer = false,
      itemCounts,
      handleCloseDrawer,
      id = 'demo-simple-select',
      ...other
    } = props;

    const theme = useTheme();
    const classes = useStyles();
    const isDownSm = useMediaQuery((theme as Theme).breakpoints.down('sm'));
    const { isOpen: isDrawerOpened } = useReduxDrawer();
    const [selectOpen, setSelectOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Handle the opening and closing of the Select dropdown
    const handleSelectOpen = () => setSelectOpen(true);
    const handleSelectClose = () => setSelectOpen(false);

    useEffect(() => {
      return () => {
        document.body.style.overflow = '';
      };
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
      if (onChange) onChange(event.target.value);
      if (usedInDrawer && handleCloseDrawer) {
        handleCloseDrawer();
      }
    };

    useEffect(() => {
      if (usedInDrawer && !isDrawerOpened) {
        setSelectOpen(false);
      }
    }, [usedInDrawer, isDrawerOpened]);

    if (!mounted) {
      return null;
    }

    if (!isDownSm && !usedInDrawer) {
      return (
        <Box ref={ref} sx={other.sx}>
          <Tabs
            value={valueData}
            onChange={(_, v) => {
              if (onChange) onChange(v);
            }}
          >
            {tabData?.map((el) => (
              <Tab
                label={
                  itemCounts ? (
                    <Tooltip title={el.label}>
                      <div className={classes.truncate}>{el.label}</div>
                    </Tooltip>
                  ) : (
                    el.label
                  )
                }
                value={el.value}
                key={el.value}
                className={`tour_target-tab_${el.value}`}
                id={el.id}
                data-tid={el.testId}
                icon={
                  itemCounts ? (
                    <Box className={classes.customBadge}>
                      {itemCounts.filter(
                        (itemCount) => itemCount.id === el.id
                      )[0]?.count ?? 0}
                    </Box>
                  ) : undefined}
                iconPosition="end"
              />
            ))}
          </Tabs>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          marginTop: isDownSm ? '16px' : 0,
          marginBottom: 0,
          minWidth: 120,
          padding: 2,
          ...other.sx,
        }}
        ref={ref}
      >
        <FormControl fullWidth>
          <InputLabel id={`${id}-label`}>{tabName}</InputLabel>
          <Select
            open={selectOpen}
            onClose={handleSelectClose}
            onOpen={handleSelectOpen}
            className={classes.menuItem}
            labelId={`${id}-label`}
            id={id}
            value={valueData}
            label={tabName}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                onClick: (e) => e.stopPropagation(),
                sx: {
                  zIndex: (theme as Theme).zIndex.appBar - 100,
                },
              },
              className: isDownSm ? classes.menu : undefined,
              disableScrollLock: true,
            }}
          >
            {tabData?.map((el) => (
              <MenuItem
                value={el.value}
                key={el.value}
                className={classes.dropdownItem}
                id={usedInDrawer ? `${el.id}-sidebar` : el.id}
                data-tid={el.testId}
              >
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
);

ResponsiveTabs.displayName = 'ResponsiveTabs';

export default ResponsiveTabs;
