import React, { FunctionComponentElement } from "react";
import { Text } from "react-native";

import { styled } from "@/theme";

import { FontText } from "../FontText";
import { ButtonKind } from "./types";

type LabelBodyProps = {
  kind: ButtonKind;
  disabled: boolean;
};

const LabelBody = styled(FontText)<LabelBodyProps>`
  text-align: center;
  align-self: center;
  margin-horizontal: ${props => props.theme.spacing.xs}px;
  color: ${props =>
    props.theme.color[
      props.kind === "primary" && !props.disabled ? "neutralTint" : "neutral"
    ]};
`;
type Props = Text["props"] & {
  kind?: ButtonKind;
};

export type ButtonLabel = ReturnType<typeof ButtonLabel>;
export const ButtonLabel = ({
  style,
  kind = "primary",
  disabled = false,
  ...props
}: Props): FunctionComponentElement<Props> => (
  <LabelBody
    {...props}
    fontFamily="poppins"
    fontVariant="semi-bold"
    kind={kind}
    style={style}
    disabled={disabled}
  />
);
