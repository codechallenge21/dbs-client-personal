'use client';

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

import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState(createTheme());

  useEffect(() => {
    const baseOption = {
      palette: palette('light'),
    };

    setTheme(createTheme(baseOption as ThemeOptions));
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
