import { AxiosError } from "axios";

export type FetchError = {
  name: string;
  message: string;
  stack?: string;
};

export type FailureResponse =
  | AxiosError<unknown, unknown>
  | FetchError
  | string
  | undefined;

export type RequestPayload<Values, SuccessResponse> = {
  body: Values;
  onSuccess?: (params: SuccessResponse) => void | Promise<void>;
  onFailure?: (params: FailureResponse) => void | Promise<void>;
};
