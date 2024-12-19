import { useCallback, useState } from "react";
// import getDeviceInfo from "@eGroupAI/utils/getDeviceInfo";
// import { useSelector } from "react-redux";
import { AxiosError } from "axios";
// import { LogApiPayload } from "interfaces/payloads";
import useAxiosApi, { AxiosApi } from "@/hooks/apis/useAxiosApi";
// import { SnackbarProps } from "@eGroupAI/material/Snackbar";
// import { getWordLibrary } from "redux/wordLibrary/selectors";
// import apis from "./apis";
// import { Snackbar, Alert } from "@mui/material";

// const SNACKBAR = "globalSnackbar";

// Add type definition for statusToMessageKey if not already defined
interface StatusMessageMap {
  [key: number]: string;
}

const statusToMessageKey: StatusMessageMap = {
  422: "incomplete data input, please double-check",
  403: "you do not have access permission",
  400: "system error, please contact the administrator",
  404: "no data found",
  500: "server error, we will fix it as soon as possible",
  502: "bad gateway, retrying ...",
};

type MessageType =
  | "Create"
  | "Read"
  | "Update"
  | "Delete"
  | "None"
  | "Download";
type StatusErrorMsgType = {
  statusCode: number;
  errorMsg: string;
};
export default function useAxiosApiWrapper<
  Data = unknown,
  P = unknown,
  ErrorData = unknown
>(
  api: AxiosApi<Data, P>,
  messageType?: MessageType,
  successMsg?: string,
  errorMsg?: string,
  statusErrorMsg?: StatusErrorMsgType[]
) {
  // const wordLibrary = useSelector(getWordLibrary);
  // const store = useSelector((state) => state);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  // const { openSnackbar } = useReduxSnackbar<SnackbarProps>(SNACKBAR);

  const onfulfilled = useCallback(() => {
    let message = "操作完成";
    switch (messageType) {
      case "None":
        return;
      case "Create":
        message = "新增成功";
        break;
      case "Read":
        message = "讀取成功";
        break;
      case "Update":
        message = "更新成功";
        break;
      case "Delete":
        message = "刪除成功";
        break;
      case "Download":
        message = "下載成功";
        break;
      default:
        break;
    }
    // openSnackbar({
    //   message: successMsg ?? message,
    //   severity: "success",
    //   action: null,
    // });
    // Show success snackbar
    setSnackbarMessage(successMsg ?? message);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }, [messageType, successMsg]);

  const getLocalizedMessage = useCallback(
    (status: number, defaultMessage: string): string => {
      const key: string | undefined = statusToMessageKey[status];
      return key ?? defaultMessage;
    },
    []
  );

  const onrejected = useCallback(
    (error: AxiosError<ErrorData>) => {
      let defaultMsg = getLocalizedMessage(0, "操作失敗");
      if (error.response?.status) {
        switch (error.response.status) {
          case 422:
            defaultMsg = getLocalizedMessage(422, "輸入資料不完整，請再次確認");
            break;
          case 403:
            defaultMsg = getLocalizedMessage(403, "您沒有存取權限");
            break;
          case 400:
            defaultMsg = getLocalizedMessage(400, "系統異常，請稍後再試。");
            break;
          case 404:
            defaultMsg = getLocalizedMessage(404, "找不到資料");
            break;
          case 500:
            defaultMsg = getLocalizedMessage(
              500,
              "伺服器出現問題，技術團隊正在處理中。"
            );
            break;
          case 502:
            defaultMsg = getLocalizedMessage(
              502,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              `重新嘗試中... ${(error.config as any).__retryCount}`
            );
            break;
          default:
            defaultMsg = "發生未知錯誤，請稍後再試。";
            break;
        }
        if (statusErrorMsg) {
          defaultMsg = statusErrorMsg.find(
            (e) => e.statusCode === error.response?.status
          )?.errorMsg || "";
        }
      }
      // show error msg
      // openSnackbar({
      //   message: errorMsg ?? defaultMsg,
      //   severity: "error",
      //   action: null,
      // });
       // Show error snackbar
       setSnackbarMessage(errorMsg ?? defaultMsg);
       setSnackbarSeverity("error");
       setSnackbarOpen(true);

      // send error log
      // let logPayload: LogApiPayload = {
      //   function: "useAxiosApi",
      //   browserDescription: window.navigator.userAgent,
      //   jsonData: {
      //     action: api.name,
      //     store,
      //     deviceInfo: getDeviceInfo(),
      //     data: error.response,
      //   },
      //   level: "ERROR",
      // };
      // if (!error.response) {
      //   logPayload = {
      //     ...logPayload,
      //     message: error.message,
      //   };
      // }
      // if (
      //   error &&
      //   error.response?.status !== 404 &&
      //   error.response?.status !== 403 &&
      //   error.response?.status !== 422 &&
      //   error.response?.status !== 401
      // ) {
      //   apis.tools.createLog(logPayload);
      //   // throw new Error(String(error.response?.status));
      // }
    },
    [
      errorMsg,
      statusErrorMsg,
      getLocalizedMessage,
      // openSnackbar,
    ]
  );

  const parameters = useAxiosApi<Data, P, ErrorData>(
    api,
    onfulfilled,
    onrejected
  );
  // return parameters;
  return {
    ...parameters,
    snackbarData: {
      open: snackbarOpen,
      message: snackbarMessage,
      severity: snackbarSeverity,
    },
  };
}
