/**
 * Font service module for consistent font handling
 * 
 * This module provides functions and utilities to work with fonts in the application,
 * supporting both DynaFont online fonts and local fallback fonts.
 */

/**
 * Font mapping between DynaFont identifiers and local project font files
 * Corrected mapping according to requirements:
 * - DFT_B7 corresponds to DFHeiBold.ttf
 * - DFT_B5 corresponds to DFHeiMedium.ttf
 * - DFT_B3 corresponds to DFHeiLight.ttf
 */
export const FONT_MAPPING = {
  // DynaFont to Local file mapping
  "DFT_B7": "DFHeiBold.ttf",     // Bold
  "DFT_B5": "DFHeiMedium.ttf",   // Medium
  "DFT_B3": "DFHeiLight.ttf",    // Light
  "DFT_BC": "DFHeiUBold.ttf"     // Ultra Bold
};

/**
 * Font style variants for easy usage in components
 */
export enum FontStyle {
  BOLD = "bold",
  MEDIUM = "medium",
  LIGHT = "light",
  ULTRA = "ultra"
}

/**
 * Get the appropriate font-family CSS variable for a given font style
 */
export const getFontFamily = (style: FontStyle): string => {
  switch (style) {
    case FontStyle.BOLD:
      return "var(--font-bold)";
    case FontStyle.MEDIUM:
      return "var(--font-medium)";
    case FontStyle.LIGHT:
      return "var(--font-light)";
    case FontStyle.ULTRA:
      return "var(--font-ultra)";
    default:
      return "var(--font-medium)";
  }
};

/**
 * Configuration for initializing the DynaFont script
 */
export const DYNAFONT_CONFIG = {
  User: "16697",
  DomainID: "D0005795KZB",
  Font: ["DFT_B5", "DFT_B7", "DFT_B3", "DFT_BC"]
};

/**
 * Returns style properties for a text element using the specified font style
 */
export const getTextStyle = (style: FontStyle) => ({
  fontFamily: getFontFamily(style),
  // No need to set font-weight as it's handled by the font itself
});

/**
 * Check if DynaFonts are available in the browser
 */
export const isDynaFontsAvailable = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains("dyna-fonts-loaded");
};

/**
 * Check if we're using local fallback fonts
 */
export const isUsingLocalFonts = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains("local-fonts-loaded") || 
         document.documentElement.classList.contains("use-local-fonts");
};

export default {
  FontStyle,
  getFontFamily,
  getTextStyle,
  isDynaFontsAvailable,
  isUsingLocalFonts,
  DYNAFONT_CONFIG
};