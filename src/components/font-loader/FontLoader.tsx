"use client";
import { DYNAFONT_CONFIG } from "@/utils/font-service";
import { useEffect, useState } from "react";

/**
 * Enhanced FontLoader component that:
 * 1. First tries to load fonts via DynaFont's online JS service
 * 2. Falls back to local project fonts if DynaFont fails
 * 3. Sets appropriate CSS classes for font styling
 */
const FontLoader = () => {
  const [, setDynaFontLoaded] = useState(false);

  useEffect(() => {
    // Step 1: Try to load DynaFont's online script
    const loadDynaFont = () => {
      try {
        // Set up the FontJSON configuration using values from font service
        window.FontJSON = DYNAFONT_CONFIG;
        
        // Create and load the DynaFont script
        const script = document.createElement('script');
        script.src = 'https://dfo.dynacw.com.tw/DynaJSFont/DynaFont_FOUT.js';
        script.async = true;
        
        script.onload = () => {
          console.log("DynaFont script loaded successfully");
          setDynaFontLoaded(true);
          checkFontAvailability();
        };
        
        script.onerror = () => {
          console.warn("DynaFont script failed to load, falling back to local fonts");
          document.documentElement.classList.add("use-local-fonts");
        };
        
        document.head.appendChild(script);
        
        return script;
      } catch (error) {
        console.error("Error loading DynaFont:", error);
        document.documentElement.classList.add("use-local-fonts");
        return null;
      }
    };

    const checkFontAvailability = () => {
      const documentElement = document.documentElement;

      // Create a function to check if a font is loaded
      const isFontLoaded = (fontName: string) => {
        const testString = "a";
        const testSize = "72px";
        const testFont = `${testSize} ${fontName}, monospace`;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;

        context.font = `${testSize} monospace`;
        const monoWidth = context.measureText(testString).width;

        context.font = testFont;
        const testWidth = context.measureText(testString).width;

        return testWidth !== monoWidth;
      };

      // Check if DynaFont fonts are available
      const isDynaFontsAvailable =
        isFontLoaded("DFT_B5") && isFontLoaded("DFT_B7") && 
        isFontLoaded("DFT_B3") && isFontLoaded("DFT_BC");

      // Check if local fallback fonts are available
      const isLocalFontsAvailable =
        isFontLoaded("DFHeiBold") && isFontLoaded("DFHeiMedium") &&
        isFontLoaded("DFHeiLight");

      // Apply appropriate class to document root
      if (isDynaFontsAvailable) {
        documentElement.classList.add("dyna-fonts-loaded");
        documentElement.classList.remove("local-fonts-loaded");
        console.log("DynaFont fonts are ready");
      } else if (isLocalFontsAvailable) {
        documentElement.classList.remove("dyna-fonts-loaded");
        documentElement.classList.add("local-fonts-loaded");
        console.log("Local fonts are ready");
      } else {
        documentElement.classList.remove("dyna-fonts-loaded");
        documentElement.classList.remove("local-fonts-loaded");
        console.log("Fallback to system fonts");
      }
    };

    // Start the font loading process
    const script = loadDynaFont();

    // Also check when page is fully loaded
    window.addEventListener("load", checkFontAvailability);

    return () => {
      // Clean up
      window.removeEventListener("load", checkFontAvailability);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default FontLoader;
