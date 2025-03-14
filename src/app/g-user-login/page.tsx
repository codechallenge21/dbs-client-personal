"use client";

import { SnackbarContext } from "@/context/SnackbarContext";
import apis from "@/utils/hooks/apis/apis";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";

function GUserLoginPageContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const { showSnackbar } = useContext(SnackbarContext);
  const { excute: googleLogin, isLoading } = useAxiosApi(apis.googleLogin);

  useEffect(() => {
    if (!code) {
      showSnackbar("無法取得Google授權碼。", "error");
      router.push("/");
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        const response = await googleLogin({ code });
        if (response.status === 200) {
          showSnackbar("登入成功。", "success");
          router.push("/");
        } else {
          showSnackbar("Google驗證失敗。請重新嘗試。", "error");
          router.push("/");
        }
      } catch (error) {
        showSnackbar("Google驗證失敗。請重新嘗試。", "error");
        router.push("/");
      }
    };

    completeGoogleLogin();
  }, [code, googleLogin, router, showSnackbar]);

  return (
    <Container sx={{ textAlign: "center", marginTop: "2rem" }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h5">正在進行Google身份驗證...</Typography>
      )}
    </Container>
  );
}

export default function GUserLoginPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <GUserLoginPageContent />
    </Suspense>
  );
}
