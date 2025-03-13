"use client";

import apis from "@/utils/hooks/apis/apis";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * TokenValidator 元件
 * 用於每個頁面載入和路由變化時檢查和設置 XSRF-TOKEN
 * 目的是避免使用者遺失 XSRF-TOKEN 導致第一次請求 403 錯誤
 */
const TokenValidator = () => {
  const { excute: getUserInfo } = useAxiosApi(apis.getUserInfo);

  // 監聽路由變化
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const validateToken = async () => {
      try {
        // 調用 API 以設置 XSRF-TOKEN cookie
        await getUserInfo();
      } catch (error) {
        // 即使請求失敗也不做任何處理，因為主要目的是要讓後端設置 XSRF-TOKEN
        console.debug("Token validation request completed with error");
      }
    };

    validateToken();
  }, [getUserInfo, pathname, searchParams]); // 添加 pathname 和 searchParams 到依賴數組，使其在路由變化時重新執行

  // 這個元件不需要渲染任何內容
  return null;
};

export default TokenValidator;
