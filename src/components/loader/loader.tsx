'use client';

import { keyframes } from '@emotion/react';
import { Box, styled, Typography } from '@mui/material';

// Define the keyframe for rotation
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define the keyframe for dots animation
const dotsAnimation = keyframes`
  0% { content: ""; }
  25% { content: "."; }
  50% { content: ".."; }
  75% { content: "..."; }
  100% { content: ""; }
`;

// Create a styled SVG component that applies the rotation animation
const LoaderSvg = styled('svg')({
  animation: `${rotateAnimation} 1s linear infinite`,
  transformOrigin: 'center', // Ensure the rotation occurs around the center
});

// Create a styled span for animated dots
const AnimatedDots = styled('span')({
  '&::after': {
    content: '""',
    animation: `${dotsAnimation} 1.5s infinite steps(5)`,
  },
});

// Create a styled typography component with the correct font family
const StyledTypography = styled(Typography)({
  fontFamily: 'var(--font-medium)',
  fontSize: '14px',
  color: '#212B36',
});

export default function CustomLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '8px 12px',
        borderRadius: '8px',
        backgroundColor: 'rgba(245, 245, 245, 0.7)',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <LoaderSvg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          clipPath="url(#paint0_angular_351_18898_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(0 0.012 -0.012 0 12 12)">
            <foreignObject
              x="-1083.33"
              y="-1083.33"
              width="2166.67"
              height="2166.67"
            >
              <div
                style={{
                  background:
                    'conic-gradient(from 90deg,rgba(254, 254, 254, 0.9971) 0deg,rgba(255, 255, 255, 1) 0.257783deg,rgba(119, 187, 255, 1) 89.6679deg,rgba(0, 86, 173, 1) 184.883deg,rgba(0, 40, 80, 0) 270.195deg,rgba(254, 254, 254, 0.9971) 360deg)',
                  height: '100%',
                  width: '100%',
                  opacity: 1,
                }}
              />
            </foreignObject>
          </g>
        </g>
        <path
          d="M12 24C9.62662 24 7.30655 23.2962 5.33316 21.9776C3.35977 20.6591 1.8217 18.7849 0.913445 16.5922C0.0051938 14.3995 -0.232446 11.9867 0.230577 9.65891C0.6936 7.33114 1.83649 5.19295 3.51472 3.51472C5.19295 1.83649 7.33115 0.693599 9.65892 0.230576C11.9867 -0.232446 14.3995 0.00519433 16.5922 0.913446C18.7849 1.8217 20.6591 3.35977 21.9776 5.33316C23.2962 7.30655 24 9.62663 24 12H21.6C21.6 10.1013 21.037 8.24524 19.9821 6.66653C18.9272 5.08781 17.4279 3.85736 15.6738 3.13076C13.9196 2.40416 11.9894 2.21404 10.1271 2.58446C8.26492 2.95488 6.55436 3.86919 5.21178 5.21177C3.86919 6.55436 2.95488 8.26491 2.58446 10.1271C2.21404 11.9893 2.40415 13.9196 3.13076 15.6738C3.85736 17.4279 5.08781 18.9272 6.66652 19.9821C8.24524 21.037 10.1013 21.6 12 21.6L12 24Z"
          data-figma-gradient-fill='{"type":"GRADIENT_ANGULAR","stops":[{"color":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"position":0.00071606453275308013},{"color":{"r":0.46666666865348816,"g":0.73333370685577393,"b":1.0,"a":1.0},"position":0.24907758831977844},{"color":{"r":0.0,"g":0.33958333730697632,"b":0.67916667461395264,"a":1.0},"position":0.51356458663940430},{"color":{"r":0.0,"g":0.15833333134651184,"b":0.31666666269302368,"a":0.0},"position":0.75054049491882324}],"stopsVar":[{"color":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"position":0.00071606453275308013},{"color":{"r":0.46666666865348816,"g":0.73333370685577393,"b":1.0,"a":1.0},"position":0.24907758831977844},{"color":{"r":0.0,"g":0.33958333730697632,"b":0.67916667461395264,"a":1.0},"position":0.51356458663940430},{"color":{"r":0.0,"g":0.15833333134651184,"b":0.31666666269302368,"a":0.0},"position":0.75054049491882324}],"transform":{"m00":1.4695762231022014e-15,"m01":-24.0,"m02":24.0,"m10":24.0,"m11":1.4695762231022014e-15,"m12":-1.4695762231022014e-15},"opacity":1.0,"blendMode":"NORMAL","visible":true}'
        />
        <defs>
          <clipPath id="paint0_angular_351_18898_clip_path">
            <path d="M12 24C9.62662 24 7.30655 23.2962 5.33316 21.9776C3.35977 20.6591 1.8217 18.7849 0.913445 16.5922C0.0051938 14.3995 -0.232446 11.9867 0.230577 9.65891C0.6936 7.33114 1.83649 5.19295 3.51472 3.51472C5.19295 1.83649 7.33115 0.693599 9.65892 0.230576C11.9867 -0.232446 14.3995 0.00519433 16.5922 0.913446C18.7849 1.8217 20.6591 3.35977 21.9776 5.33316C23.2962 7.30655 24 9.62663 24 12H21.6C21.6 10.1013 21.037 8.24524 19.9821 6.66653C18.9272 5.08781 17.4279 3.85736 15.6738 3.13076C13.9196 2.40416 11.9894 2.21404 10.1271 2.58446C8.26492 2.95488 6.55436 3.86919 5.21178 5.21177C3.86919 6.55436 2.95488 8.26491 2.58446 10.1271C2.21404 11.9893 2.40415 13.9196 3.13076 15.6738C3.85736 17.4279 5.08781 18.9272 6.66652 19.9821C8.24524 21.037 10.1013 21.6 12 21.6L12 24Z" />
          </clipPath>
        </defs>
      </LoaderSvg>
      <StyledTypography>
        AI思考中<AnimatedDots />
      </StyledTypography>
    </Box>
  );
}
