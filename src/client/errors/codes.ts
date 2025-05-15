export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const ErrorCode = {
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  DEFAULT: "DEFAULT"
} as const;
