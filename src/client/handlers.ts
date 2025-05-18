import { AxiosError, AxiosResponse, isAxiosError } from "axios";

import { languageStore } from "@/_zustand";
import { showToast, styledLog } from "@/utils";

import { ErrorCode, errorMessages } from "./errors";
import { RequestPayload } from "./types";

const getRequestErrorCode = (code: AxiosError["code"]): ErrorCode => {
  if (ErrorCode?.[code as ErrorCode]) {
    return code as ErrorCode;
  } else {
    return "DEFAULT";
  }
};

export const handleApiCall = async <T>(
  request: Promise<AxiosResponse<T>>,
  handlers: Omit<RequestPayload<T, AxiosResponse<T, unknown>>, "body">,
  toastSuppressors?: ErrorCode[]
) => {
  const TAG = "AXIOS";
  try {
    const response = await request;
    styledLog(TAG, { text: "lightblue", background: "blue" }, response);
    handlers?.onSuccess?.(response);
  } catch (error) {
    if (isAxiosError(error)) {
      const errorCode = ErrorCode[getRequestErrorCode(error.code)];
      const language = languageStore.getState().language;

      styledLog(
        TAG,
        { text: "#FFCCCC", background: "#8B0000" },
        error.toJSON()
      );
      if (!toastSuppressors?.includes(errorCode)) {
        showToast({
          type: "error",
          text1: errorCode,
          text2: errorMessages[language][errorCode]
        });
      }
      handlers?.onFailure?.(error);
    } else {
      console.error("handleApiCall UNKNOWN_ERROR:", error);
      handlers?.onFailure?.(error as string);
    }
  }
};
