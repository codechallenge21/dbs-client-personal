'use client';
import { Box, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface TextScanningEffectProps {
  text: string;
  isScanning: boolean;
}

const TextScanningEffect: React.FC<TextScanningEffectProps> = ({ text, isScanning }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scanPosition, setScanPosition] = useState(0);
  const [scanDirection, setScanDirection] = useState(1); // 1 for down, -1 for up
  const scanSpeed = 2; // Speed of the scanner in pixels per animation frame

  useEffect(() => {
    if (!isScanning || !containerRef.current) return;

    const containerHeight = containerRef.current.clientHeight;
    let animationFrameId: number;

    const animate = () => {
      setScanPosition((prevPos) => {
        const newPos = prevPos + scanDirection * scanSpeed;

        // Change direction when hitting the bottom or top
        if (newPos >= containerHeight) {
          setScanDirection(-1);
          return containerHeight;
        } else if (newPos <= 0) {
          setScanDirection(1);
          return 0;
        }

        return newPos;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isScanning, scanDirection]);

  // If not scanning, don't render any special effects
  if (!isScanning) {
    return (
      <Box sx={{ 
        width: '100%', 
        position: 'relative',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'monospace',
        backgroundColor: 'background.paper',
        padding: 2,
        borderRadius: 1
      }}>
        {text}
      </Box>
    );
  }

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        width: '100%', 
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'monospace',
        backgroundColor: 'background.paper',
        padding: 2,
        borderRadius: 1
      }}
    >
      {/* Text content */}
      {text}
      
      {/* Scanning line */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: scanPosition,
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, 
            rgba(0,0,0,0) 0%, 
            ${theme.palette.primary.main} 20%, 
            ${theme.palette.primary.main} 80%, 
            rgba(0,0,0,0) 100%)`,
          boxShadow: `0 0 8px 2px ${theme.palette.primary.main}`,
          opacity: 0.8,
          zIndex: 2
        }}
      />

      {/* Highlight effect for currently scanned area */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: Math.max(0, scanPosition - 20),
          width: '100%',
          height: '40px',
          background: `linear-gradient(180deg, 
            rgba(25,118,210,0) 0%, 
            rgba(25,118,210,0.1) 30%, 
            rgba(25,118,210,0.1) 70%, 
            rgba(25,118,210,0) 100%)`,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default TextScanningEffect;