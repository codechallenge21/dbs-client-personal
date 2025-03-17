/**
 * 專業的字體檢測工具
 * 
 * 這個模組提供可靠的字體檢測功能，使用多種檢測方法，
 * 以確保能正確判斷字體是否已經在瀏覽器中載入完成。
 */

// 檢測字體狀態時使用的字串，包含中文字符提高準確性
const TEST_STRING = "測試字體abc123";

/**
 * 使用多種方法檢測字體是否已載入並可用
 * @param fontName 要檢測的字體名稱
 * @returns 字體是否可用的布林值
 */
export const isFontLoaded = (fontName: string): boolean => {
  // 結合三種檢測方法的結果
  const results = [
    checkUsingCSS(fontName),
    checkUsingCanvas(fontName),
    checkUsingFontFaceAPI(fontName)
  ];
  
  // 如果至少有兩種方法檢測到字體，我們認為它確實存在
  return results.filter(Boolean).length >= 2;
};

/**
 * 使用Canvas API檢測字體
 * @param fontName 要檢測的字體名稱
 * @returns 字體是否可用的布林值
 */
function checkUsingCanvas(fontName: string): boolean {
  try {
    // 建立一個臨時canvas元素進行測量
    const testSize = "24px";
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    if (!context) return false;
    
    // 使用參考字體(monospace)測量寬度
    context.font = `${testSize} monospace`;
    const monoWidth = context.measureText(TEST_STRING).width;
    
    // 使用目標字體測量寬度
    context.font = `${testSize} "${fontName}", monospace`;
    const testWidth = context.measureText(TEST_STRING).width;
    
    // 如果寬度不同，則字體已載入
    return Math.abs(testWidth - monoWidth) > 1; // 允許1像素的誤差
  } catch (e) {
    console.error("使用Canvas檢測字體時發生錯誤:", e);
    return false;
  }
}

/**
 * 使用DOM和CSS檢測字體
 * @param fontName 要檢測的字體名稱
 * @returns 字體是否可用的布林值
 */
function checkUsingCSS(fontName: string): boolean {
  try {
    // 建立兩個測試元素
    const testDiv = document.createElement('div');
    const refDiv = document.createElement('div');
    
    // 設定共用樣式
    const commonStyles = {
      position: 'absolute',
      left: '-9999px',
      visibility: 'hidden',
      fontSize: '24px',
      width: 'auto',
      height: 'auto',
      lineHeight: 'normal',
      margin: '0',
      padding: '0',
      whiteSpace: 'nowrap'
    };
    
    // 應用樣式到測試元素
    Object.assign(testDiv.style, commonStyles, {
      fontFamily: `"${fontName}", monospace`
    });
    
    // 應用樣式到參考元素
    Object.assign(refDiv.style, commonStyles, {
      fontFamily: 'monospace'
    });
    
    // 設定相同的文字內容
    testDiv.textContent = TEST_STRING;
    refDiv.textContent = TEST_STRING;
    
    // 添加到DOM以獲取實際尺寸
    document.body.appendChild(testDiv);
    document.body.appendChild(refDiv);
    
    // 測量尺寸差異
    const isDifferent = testDiv.offsetWidth !== refDiv.offsetWidth || 
                        testDiv.offsetHeight !== refDiv.offsetHeight;
    
    // 清理DOM
    document.body.removeChild(testDiv);
    document.body.removeChild(refDiv);
    
    return isDifferent;
  } catch (e) {
    console.error("使用CSS檢測字體時發生錯誤:", e);
    return false;
  }
}

/**
 * 使用現代瀏覽器的FontFace API檢測字體
 * @param fontName 要檢測的字體名稱
 * @returns 字體是否可用的布林值
 */
function checkUsingFontFaceAPI(fontName: string): boolean {
  try {
    // 檢查瀏覽器是否支援FontFace API
    if (typeof document === 'undefined' || !('fonts' in document)) {
      return false;
    }
    
    // 檢查字體是否在document.fonts集合中
    return Array.from(document.fonts).some(font => 
      font.family.replace(/["']/g, '') === fontName && font.status === 'loaded'
    );
  } catch (e) {
    console.error("使用FontFace API檢測字體時發生錯誤:", e);
    return false;
  }
}

/**
 * 嘗試預載入字體以確保它們在DOM渲染前可用（僅適用於支援FontFace API的瀏覽器）
 * @param fontFamilies 要載入的字體家族名稱陣列
 * @returns 承諾，在所有字體載入後解決
 */
export async function preloadFonts(fontFamilies: string[]): Promise<void> {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return Promise.resolve();
  }
  
  try {
    // 創建所有字體的載入承諾
    const loadPromises = fontFamilies.map(fontFamily => {
      // 創建測試文字，使用FontFace.load API
      const testText = TEST_STRING;
      return document.fonts.load(`16px "${fontFamily}"`, testText);
    });
    
    // 等待所有字體載入
    await Promise.all(loadPromises);
    console.log("所有字體預載入完成:", fontFamilies);
  } catch (e) {
    console.error("預載入字體時發生錯誤:", e);
  }
}

/**
 * 完整的字體檢測服務
 */
export default {
  isFontLoaded,
  preloadFonts
};