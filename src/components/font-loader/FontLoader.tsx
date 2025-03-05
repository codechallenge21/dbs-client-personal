'use client';
import { useEffect } from 'react';

const FontLoader = () => {
  useEffect(() => {
    const checkFontAvailability = async () => {
      const documentElement = document.documentElement;

      // Create a function to check if a font is loaded
      const isFontLoaded = (fontName: string) => {
        const testString = 'a';
        const testSize = '72px';
        const testFont = `${testSize} ${fontName}, monospace`;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;

        context.font = `${testSize} monospace`;
        const monoWidth = context.measureText(testString).width;

        context.font = testFont;
        const testWidth = context.measureText(testString).width;

        return testWidth !== monoWidth;
      };

      // Check if primary fonts are available
      const isPrimaryFontsAvailable =
        isFontLoaded('DFT_B5') && isFontLoaded('DFT_B7');

      // Check if fallback fonts are available
      const isFallbackFontsAvailable =
        isFontLoaded('DFPHeiBold-B5') && isFontLoaded('DFPHeiMedium-B5');

      // Apply appropriate class to document root
      if (isPrimaryFontsAvailable) {
        documentElement.classList.add('primary-fonts-loaded');
      } else if (isFallbackFontsAvailable) {
        documentElement.classList.add('fallback-fonts-loaded');
      }
    };

    // Check font availability when component mounts
    checkFontAvailability();

    // Also check when fonts might finish loading
    window.addEventListener('load', checkFontAvailability);

    return () => {
      window.removeEventListener('load', checkFontAvailability);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default FontLoader;
