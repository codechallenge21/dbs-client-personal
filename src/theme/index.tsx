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
  readonly children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  // Create the theme once with the palette options directly
  const theme = createTheme({
    palette: palette('light'),
  } as ThemeOptions);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
