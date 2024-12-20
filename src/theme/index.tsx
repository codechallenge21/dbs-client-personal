'use client';

import { useMemo } from 'react';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
// system
import { palette } from './palette';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const baseOption = useMemo(
    () => ({
      palette: isHomePage ? palette('light') : palette('light'),
    }),
    [isHomePage]
  );

  const theme = createTheme(baseOption as ThemeOptions);

  return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </MuiThemeProvider>
  );
}
