"use client";
import fontDetector from "@/utils/font-detector";
import { useEffect } from "react";

/**
 * 增強版 FontLoader 元件:
 * 1. 先嘗試透過 DynaFont 線上 JS 服務載入字體
 * 2. 如果失敗，使用本地專案字體作為備選
 * 3. 使用專業多重檢測機制確保字體正確載入
 */
const FontLoader = () => {
  useEffect(() => {
    // 使用專業字體檢測工具檢查字體可用性
    const checkFontAvailability = async () => {
      try {
        const documentElement = document.documentElement;

        // 預載入字體，增加檢測成功率
        await fontDetector.preloadFonts([
          'DFHeiBold', 'DFHeiMedium', 'DFHeiLight', 'DFHeiUBold'
        ]);

        // 檢測每個字體的可用性
        const fontResults = {
          "DFHeiBold": fontDetector.isFontLoaded("DFHeiBold"),
          "DFHeiMedium": fontDetector.isFontLoaded("DFHeiMedium"),
          "DFHeiLight": fontDetector.isFontLoaded("DFHeiLight"),
          "DFHeiUBold": fontDetector.isFontLoaded("DFHeiUBold")
        };

        console.log("字體檢測結果:", fontResults);

        // 檢查本地備選字體是否可用
        const isLocalFontsAvailable =
          fontResults.DFHeiBold && fontResults.DFHeiMedium &&
          fontResults.DFHeiLight && fontResults.DFHeiUBold;

        // 應用適當的 CSS class 到根元素
        if (isLocalFontsAvailable) {
          documentElement.classList.add("local-fonts-loaded");
          console.log("本地字體已成功載入並可用");
        } else {
          documentElement.classList.remove("local-fonts-loaded");
          console.log("無法載入字體，使用備選系統字體");
        }
      } catch (e) {
        console.error("檢測字體可用性時發生錯誤:", e);
      }
    };

    // 確保在頁面完全載入後再次檢查
    window.addEventListener("load", () => {
      setTimeout(checkFontAvailability, 1500);
    });

    // 清理函數
    return () => {
      window.removeEventListener("load", checkFontAvailability);
    };
  }, []); // 僅在元件掛載時執行一次

  return null; // 此元件不渲染任何視覺內容
};

export default FontLoader;
