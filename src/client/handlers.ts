import { AxiosError, AxiosResponse, isAxiosError } from "axios";

import { languageStore } from "@/_zustand";
import { showToast, styledLog } from "@/utils";

import { ErrorCode, errorMessages } from "./errors";
import { FetchError, RequestPayload } from "./types";

export const getAxiosRequestErrorCode = (
  code: AxiosError["code"]
): ErrorCode => {
  if (ErrorCode?.[code as ErrorCode]) {
    return code as ErrorCode;
  } else {
    return "DEFAULT";
  }
};

export const handleAxiosRequest = async <T>(
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
      const errorCode = ErrorCode[getAxiosRequestErrorCode(error.code)];
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

export const getFetchRequestErrorCode = (error: unknown): ErrorCode => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: string }).code;
    if (code && ErrorCode?.[code as ErrorCode]) {
      return code as ErrorCode;
    }
  }
  return "DEFAULT";
};

export const handleFetchRequest = async <T>(
  request: Promise<T>,
  handlers: Omit<RequestPayload<T, T>, "body">,
  toastSuppressors?: ErrorCode[]
) => {
  const TAG = "FETCH";

  try {
    const response = await request;
    styledLog(TAG, { text: "lightblue", background: "blue" }, response);
    handlers?.onSuccess?.(response);
  } catch (error) {
    const language = languageStore.getState().language;
    const errorCode = ErrorCode[getFetchRequestErrorCode(error)];

    styledLog(TAG, { text: "#FFCCCC", background: "#8B0000" }, error);

    if (!toastSuppressors?.includes(errorCode)) {
      showToast({
        type: "error",
        text1: errorCode,
        text2: errorMessages[language][errorCode]
      });
    }

    handlers?.onFailure?.(error as FetchError);
  }
};
