import { BreakpointsOptions } from '@mui/system';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true; // adds the `mobile` breakpoint
  }
}

export const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1440,
    xxl: 1920, // Custom breakpoint
  },
};
