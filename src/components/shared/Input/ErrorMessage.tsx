import React from "react";
import { FieldError } from "react-hook-form";

import { FontText } from "../FontText";

type Props = {
  error?: FieldError;
};

export const ErrorMessage = ({ error }: Props) => {
  return (
    error?.message?.length && (
      <FontText
        fontFamily="inter"
        fontVariant="regular"
        fontSize="md"
        color="error"
      >
        {error?.message}
      </FontText>
    )
  );
};
