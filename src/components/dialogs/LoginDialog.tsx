"use client";

import EyeCloseIcon from "@/assets/Images/EyeClose Icon.svg";
import EyeOpenIcon from "@/assets/Images/EyeOpen Icon.svg";
import { SnackbarContext } from "@/context/SnackbarContext";
import apis from "@/utils/hooks/apis/apis";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import GoogleIcon from "../../assets/google.png";
import { customScrollbarStyle } from "../toolbar-drawer-new/ToolbarDrawer";

const LoginDialog = ({
  open,
  onClose,
  setIsSignupOpen,
  onOpenForgetPassword,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  // Hook for calling the login API
  const { excute: login, isLoading: isLogging } = useAxiosApi(apis.login);
  const { excute: getGoogleLoginUrl } = useAxiosApi(apis.googleLoginUrl);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    if (onClose) onClose();
  };

  const handleRegisterClick = () => {
    handleClose();
    setIsSignupOpen(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showSnackbar("請填寫電子郵件及密碼。", "error");
      return;
    }
    try {
      const response = await login({
        organizationUserAccount: email,
        organizationUserPassword: password,
      });
      if (response.status === 200) {
        showSnackbar("登入成功。", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showSnackbar("登入失敗。請檢查您的帳號密碼。", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await getGoogleLoginUrl();
      window.location.href = response.data;
    } catch (error) {
      showSnackbar("無法取得 Google 登入網址。請再試一次。", "error");
    }
  };

  const handleForgetPasswordClick = () => {
    onOpenForgetPassword();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              top: "50%",
              gap: isMobile ? "16px" : "32px",
              left: "50%",
              margin: "0px",
              width: isMobile ? "324px" : "600px",
              height: isMobile ? "580px" : "580px",
              borderRadius: "8px",
              position: "absolute",
              paddingBottom: "24px",
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
              "@media (orientation: landscape)": {
                overflow: "auto",
              },
              ...customScrollbarStyle,
            },
          },
        }}
      >
        <Box
          sx={{
            minHeight: "64px",
            display: "flex",
            paddingTop: "8px",
            overflow: "hidden",
            paddingLeft: isMobile ? "16px" : "32px",
            paddingRight: isMobile ? "8px" : "16px",
            paddingBottom: "8px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              color: "#212B36",
              fontSize: "32px",
              lineHeight: "32px",
              letterSpacing: "0%",
              fontFamily: "var(--font-bold)",
              alignItems: "center",
            }}
          >
            登入
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              width: "48px",
              height: "48px",
              padding: "8px",
              borderRadius: "50px",
            }}
          >
            <CloseRounded
              sx={{
                width: "32px",
                height: "32px",
                color: "#212B36",
              }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{
            gap: "24px",
            minHeight: isMobile ? "84px" : "78px",
            display: "flex",
            margin: "0px auto",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              minHeight: isMobile ? "36px" : "32px",
              fontWeight: 400,
              fontSize: isMobile ? "24px" : "32px",
              color: "#212B36",
              lineHeight: "32px",
              letterSpacing: "0%",
              fontFamily: "var(--font-bold)",
            }}
          >
            歡迎回來
          </Typography>
          <Typography
            sx={{
              minHeight: "22px",
              fontWeight: 400,
              fontSize: "14px",
              color: "#212B36",
              lineHeight: "22px",
              letterSpacing: "0%",
              fontFamily: "var(--font-medium)",
            }}
          >
            還沒有帳戶嗎?{" "}
            <button
              type="button"
              onClick={handleRegisterClick}
              style={{
                color: "#C00",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                fontFamily: "var(--font-bold)",
              }}
            >
              註冊
            </button>
          </Typography>
        </Box>
        <Box
          sx={{
            gap: "16px",
            width: "341px",
            minHeight: "276px",
            display: "flex",
            margin: "0px auto",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            ...customScrollbarStyle,
          }}
        >
          <TextField
            id="login-dialog-email-input"
            data-tid="login-dialog-email-input"
            sx={{
              gap: "8px",
              minHeight: "54px",
              padding: "0px",
              display: "flex",
              borderRadius: "8px",
              alignItems: "center",
              alignSelf: "stretch",
              "& .MuiInputBase-root": {
                width: isMobile ? "276px" : "341px",
                padding: "16px 14px",
                borderRadius: "8px",
                "& .MuiOutlinedInput-input": {
                  padding: "0px",
                  borderRadius: "8px",
                  fontSize: "14px !important",
                  "&::placeholder": {
                    color: "#919EAB",
                    opacity: 1,
                  },
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    "var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))",
                },
                "&:hover fieldset": {
                  borderColor:
                    "var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    "var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))",
                },
              },
            }}
            placeholder="電子郵件地址*"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="login-dialog-password-input"
            data-tid="login-dialog-password-input"
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Image
                        src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                        alt={showPassword ? "Hide password" : "Show password"}
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              gap: "8px",
              minHeight: "54px",
              padding: "0px",
              display: "flex",
              borderRadius: "8px",
              alignItems: "center",
              alignSelf: "stretch",
              "& .MuiInputBase-root": {
                width: isMobile ? "276px" : "341px",
                padding: "16px 14px",
                borderRadius: "8px",
                "& .MuiOutlinedInput-input": {
                  padding: "0px",
                  borderRadius: "8px",
                  fontSize: "14px !important",
                  "&::placeholder": {
                    color: "#919EAB",
                    opacity: 1,
                  },
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    "var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))",
                },
                "&:hover fieldset": {
                  borderColor:
                    "var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    "var(--Components-Input-Outlined, rgba(145, 158, 171, 0.20))",
                },
              },
            }}
            placeholder="密碼*"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
          <Typography
            type="button"
            component={"button"}
            onClick={handleForgetPasswordClick}
            sx={{
              color: "var(--Primary-DBS-Red, #C00)",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: 0,
              fontFamily: "var(--font-bold)",
              fontStyle: "normal",
              fontWeight: 400,
              cursor: "pointer",
              width: isMobile ? "80%" : "100%",
              minHeight: "24px",
              textAlign: "right",
              marginTop: "-12px",
              border: "none",
              background: "transparent",
            }}
          >
            忘記密碼?
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              gap: "8px",
              width: isMobile ? "276px" : "341px",
              minHeight: "46px",
              borderRadius: "8px",
              background: "var(--Secondary-, #5C443A)",
              padding: isMobile ? "8px 16px" : "11px 12px",
              border: "1px solid var(--Secondary-, #5C443A)",
              justifyContent: "center",
              position: "relative",
            }}
            disabled={isLogging}
          >
            {isLogging ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                }}
              />
            ) : (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  textAlign: "center",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily: "var(--font-bold)",
                  color: "var(--Error-ContrastText, #FFF)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                登入
              </Typography>
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={
              <Image src={GoogleIcon} alt="Google" width={24} height={24} />
            }
            sx={{
              gap: "8px",
              width: isMobile ? "276px" : "341px",
              minHeight: "46px",
              borderRadius: "8px",
              padding: isMobile ? "8px 16px" : "11px 12px",
              border: "1px solid #212B36",
              justifyContent: "center",
              alignItems: "center",
              "& .MuiButton-startIcon": { margin: "0px !important" },
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                color: "#212B36",
                lineHeight: "24px",
                letterSpacing: "0%",
                textTransform: "none",
                fontFamily: "var(--font-medium)",
              }}
            >
              使用 Google 帳號繼續
            </Typography>
          </Button>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "var(--font-medium)",
            fontSize: "14px",
            justifyContent: "center",
            textAlign: "center",
            mt: "16px",
          }}
        >
          <Typography
            component="button"
            color="#06C"
            sx={{
              fontFamily: "var(--font-medium)",
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
            onClick={() => {
              window.open("/policies?tab=termsOfUse", "_blank");
            }}
          >
            《服務條款》{" "}
          </Typography>
          |
          <Typography
            component="button"
            color="#06C"
            sx={{
              border: "none",
              fontFamily: "var(--font-medium)",
              fontSize: "14px",
              cursor: "pointer",
              background: "transparent",
            }}
            onClick={() => {
              window.open("/policies?tab=privacyPolicy", "_blank");
            }}
          >
            《隱私政策》
          </Typography>
          |
          <Typography
            component="button"
            color="#06C"
            sx={{
              fontFamily: "var(--font-medium)",
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
            onClick={() => {
              window.open("/policies?tab=cookiePolicy", "_blank");
            }}
          >
            《Cookie 政策》
          </Typography>
        </Typography>
      </Dialog>
    </>
  );
};

export default LoginDialog;
