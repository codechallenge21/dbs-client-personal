'use client';

import { useMemo } from 'react';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from '@mui/material/styles';
// system
import { palette } from './palette';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const theme = useMemo(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const isHomePage = pathname === '/';

      const baseOption = {
        palette: isHomePage ? palette('light') : palette('light'),
      };

      return createTheme(baseOption as ThemeOptions);
    }
    return createTheme();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
