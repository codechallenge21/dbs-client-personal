'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import fontService, { FontStyle } from '@/utils/font-service';

/**
 * Example component showing how to use the modular font system
 */
const FontExample = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Font System Examples
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Bold font example */}
        <Typography 
          sx={{ 
            fontFamily: fontService.getFontFamily(FontStyle.BOLD),
            fontSize: '24px'
          }}
        >
          Bold Text (using DFT_B7 / DFHeiBold): 粗體文字
        </Typography>
        
        {/* Medium font example */}
        <Typography 
          sx={{ 
            fontFamily: fontService.getFontFamily(FontStyle.MEDIUM),
            fontSize: '24px'
          }}
        >
          Medium Text (using DFT_B5 / DFHeiMedium): 中等文字
        </Typography>
        
        {/* Light font example */}
        <Typography 
          sx={{ 
            fontFamily: fontService.getFontFamily(FontStyle.LIGHT),
            fontSize: '24px'
          }}
        >
          Light Text (using DFT_B3 / DFHeiLight): 輕量文字
        </Typography>
        
        {/* Ultra font example */}
        <Typography 
          sx={{ 
            fontFamily: fontService.getFontFamily(FontStyle.ULTRA),
            fontSize: '24px'
          }}
        >
          Ultra Bold Text (using DFT_BC / DFHeiUBold): 超粗體文字
        </Typography>
      </Box>
      
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Font Loading Status:
        </Typography>
        
        <Typography sx={{ fontFamily: 'monospace', fontSize: '14px' }}>
          {`DynaFonts Loaded: ${typeof window !== 'undefined' ? fontService.isDynaFontsAvailable() : 'checking...'}`}
        </Typography>
        
        <Typography sx={{ fontFamily: 'monospace', fontSize: '14px' }}>
          {`Using Local Fonts: ${typeof window !== 'undefined' ? fontService.isUsingLocalFonts() : 'checking...'}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default FontExample;