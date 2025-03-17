"use client";
import fontDetector from "@/utils/font-detector";
import { DYNAFONT_CONFIG } from "@/utils/font-service";
import { useEffect, useState } from "react";

/**
 * 增強版 FontLoader 元件:
 * 1. 先嘗試透過 DynaFont 線上 JS 服務載入字體
 * 2. 如果失敗，使用本地專案字體作為備選
 * 3. 使用專業多重檢測機制確保字體正確載入
 */
const FontLoader = () => {
  const [, setDynaFontScriptLoaded] = useState(false);
  
  useEffect(() => {
    // 步驟 1: 嘗試載入 DynaFont 線上腳本
    const loadDynaFont = () => {
      try {
        // 先確保 FontJSON 配置在 window 對象上
        window.FontJSON = DYNAFONT_CONFIG;
        
        // 創建並載入 DynaFont 腳本
        const script = document.createElement('script');
        script.src = 'https://dfo.dynacw.com.tw/DynaJSFont/DynaFont_FOUT.js';
        script.async = true;
        
        script.onload = () => {
          console.log("DynaFont 腳本載入成功");
          setDynaFontScriptLoaded(true);
          
          // 腳本載入後，分階段檢查字體可用性
          // 首次檢查 - 給予足夠時間讓字體初始化
          setTimeout(() => {
            checkFontAvailability();
            
            // 再次檢查 - 處理較慢的網絡加載情況
            setTimeout(checkFontAvailability, 2000);
          }, 1000);
        };
        
        script.onerror = () => {
          console.warn("DynaFont 腳本載入失敗，切換到本地字體");
          document.documentElement.classList.add("use-local-fonts");
          checkFontAvailability(); // 仍然檢查本地字體是否可用
        };
        
        document.head.appendChild(script);
        return script;
      } catch (error) {
        console.error("載入 DynaFont 時發生錯誤:", error);
        document.documentElement.classList.add("use-local-fonts");
        return null;
      }
    };

    // 使用專業字體檢測工具檢查字體可用性
    const checkFontAvailability = async () => {
      try {
        const documentElement = document.documentElement;
        
        // 預載入字體，增加檢測成功率
        await fontDetector.preloadFonts([
          'DFT_B5', 'DFT_B7', 'DFT_B3', 'DFT_BC',
          'DFHeiBold', 'DFHeiMedium', 'DFHeiLight', 'DFHeiUBold'
        ]);
        
        // 檢測每個字體的可用性
        const fontResults = {
          "DFT_B5": fontDetector.isFontLoaded("DFT_B5"),
          "DFT_B7": fontDetector.isFontLoaded("DFT_B7"),
          "DFT_B3": fontDetector.isFontLoaded("DFT_B3"),
          "DFT_BC": fontDetector.isFontLoaded("DFT_BC"),
          "DFHeiBold": fontDetector.isFontLoaded("DFHeiBold"),
          "DFHeiMedium": fontDetector.isFontLoaded("DFHeiMedium"),
          "DFHeiLight": fontDetector.isFontLoaded("DFHeiLight")
        };
        
        console.log("字體檢測結果:", fontResults);
        
        // 如果任何一個 DynaFont 被檢測到，記錄下來幫助調試
        const anyDynaFontLoaded = Object.entries(fontResults)
          .filter(([key]) => key.startsWith('DFT_'))
          .some(([_, loaded]) => loaded);
        
        if (anyDynaFontLoaded) {
          console.log("🎉 檢測到至少一個 DynaFont 字體已載入!");
        }

        // 檢查 DynaFont 字體是否全部可用
        const isDynaFontsAvailable =
          fontResults.DFT_B5 && fontResults.DFT_B7 && 
          fontResults.DFT_B3 && fontResults.DFT_BC;

        // 檢查本地備選字體是否可用
        const isLocalFontsAvailable =
          fontResults.DFHeiBold && fontResults.DFHeiMedium &&
          fontResults.DFHeiLight;

        // 應用適當的 CSS class 到根元素
        if (isDynaFontsAvailable) {
          documentElement.classList.add("dyna-fonts-loaded");
          documentElement.classList.remove("local-fonts-loaded");
          console.log("DynaFont 字體已成功載入並可用");
        } else if (isLocalFontsAvailable) {
          documentElement.classList.remove("dyna-fonts-loaded");
          documentElement.classList.add("local-fonts-loaded");
          console.log("本地字體已成功載入並可用");
        } else {
          documentElement.classList.remove("dyna-fonts-loaded");
          documentElement.classList.remove("local-fonts-loaded");
          console.log("無法載入字體，使用備選系統字體");
        }
      } catch (e) {
        console.error("檢測字體可用性時發生錯誤:", e);
      }
    };

    // 啟動字體載入流程
    const script = loadDynaFont();

    // 確保在頁面完全載入後再次檢查
    window.addEventListener("load", () => {
      setTimeout(checkFontAvailability, 1500);
    });
    
    // 清理函數
    return () => {
      window.removeEventListener("load", checkFontAvailability);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []); // 僅在元件掛載時執行一次

  return null; // 此元件不渲染任何視覺內容
};

export default FontLoader;
