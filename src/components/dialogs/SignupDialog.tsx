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
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { useContext, useState } from "react";
import GoogleIcon from "../../assets/google.png";
import { customScrollbarStyle } from "../toolbar-drawer-new/ToolbarDrawer";

interface SignupDialogProps {
  open: boolean;
  onClose: () => void;
  setIsLoginOpen: (open: boolean) => void;
}

const SignupDialog: React.FC<SignupDialogProps> = ({
  open,
  onClose,
  setIsLoginOpen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { showSnackbar } = useContext(SnackbarContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    if (onClose) onClose();
  };

  const handleLoginClick = () => {
    handleClose();
    setIsLoginOpen(true);
  };

  const { excute: registerUser } = useAxiosApi(apis.registerUser);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showSnackbar("請填寫所有必填欄位。", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar("請輸入有效的電子郵件地址。", "error");
      return;
    }

    if (password !== confirmPassword) {
      showSnackbar("密碼不一致。", "error");
      return;
    }

    try {
      const response = await registerUser({
        organizationId: "yMJHyi6R1CB9whpdNvtA",
        organizationUserNameZh: name,
        organizationUserEmail: email,
        organizationUserPassword: password,
      });

      if (response.status === 200) {
        showSnackbar("請透過您的電子郵件驗證帳戶。", "success");
      } else if (response.status === 409) {
        showSnackbar("此帳號已經註冊。", "error");
      } else {
        showSnackbar("發生錯誤。請再試一次。", "error");
      }
      handleClose();
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        showSnackbar("此帳號已經註冊。", "error");
      } else {
        showSnackbar("發生錯誤。請再試一次。", "error");
      }
    }
  };

  return (
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
            height: isMobile ? "652px" : "696px",
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
          }}
        >
          註冊
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
          建立帳戶
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
          已經擁有帳戶?{" "}
          <button
            type="button"
            onClick={handleLoginClick}
            style={{
              color: "#C00",
              border: "none",
              cursor: "pointer",
              background: "transparent",
              fontFamily: "var(--font-bold)",
            }}
          >
            登入
          </button>
        </Typography>
      </Box>
      <Box
        sx={{
          gap: "16px",
          width: "341px",
          minHeight: "388px",
          display: "flex",
          margin: "0px auto",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          id="signup-dialog-name-input"
          data-tid="signup-dialog-name-input"
          sx={{
            gap: "8px",
            minHeight: "54px",
            padding: "0px",
            display: "flex",
            borderRadius: "8px ",
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
          placeholder="使用者名稱*"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setName(value);
          }}
        />
        <TextField
          id="signup-dialog-email-input"
          data-tid="signup-dialog-email-input"
          sx={{
            gap: "8px",
            minHeight: "54px",
            padding: "0px",
            display: "flex",
            borderRadius: "8px ",
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
            const { value } = e.target;
            setEmail(value);
          }}
        />
        <TextField
          id="signup-dialog-password-input"
          data-tid="signup-dialog-password-input"
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
            borderRadius: "8px ",
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
            const { value } = e.target;
            setPassword(value);
          }}
        />
        <TextField
          id="signup-dialog-confirm-password-input"
          data-tid="signup-dialog-confirm-password-input"
          type={showPassword2 ? "text" : "password"}
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
                      showPassword2 ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword2(!showPassword2)}
                    sx={{
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Image
                      src={showPassword2 ? EyeOpenIcon : EyeCloseIcon}
                      alt={showPassword2 ? "Hide password" : "Show password"}
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
            borderRadius: "8px ",
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
          placeholder="確認密碼*"
          value={confirmPassword}
          onChange={(e) => {
            e.preventDefault();
            const { value } = e.target;
            setConfirmPassword(value);
          }}
        />
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{
            gap: "8px",
            width: isMobile ? "276px" : "341px",
            minHeight: "46px",
            borderRadius: "8px",
            background: "var(--Secondary-, #5C443A)",
            padding: isMobile ? "8px 16px" : "11px 12px",
            border: "1px solid var(--Secondary-, #5C443A)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              textAlign: "center",
              fontStyle: "normal",
              lineHeight: "normal",
              fontFamily: "var(--font-bold)",
              color: "var(--Error-ContrastText, #FFF)",
            }}
          >
            註冊
          </Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {}}
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

            "& .MuiButton-startIcon": {
              margin: "0px !important",
            },
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
  );
};

export default SignupDialog;
