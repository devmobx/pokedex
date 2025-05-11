import React, {
  FunctionComponentElement,
  ReactElement,
  useCallback
} from "react";
import { ActivityIndicator, PressableProps, ViewStyle } from "react-native";

import { css, SpacingProps, styled, useTheme } from "@/theme";

import { AnimatedPressable } from "../AnimatedPressable";
import { ButtonLabel } from "./ButtonLabel";
import { ButtonKind } from "./types";

type ButtonBodyProps = {
  kind: ButtonKind;
  disabled: ButtonProps["disabled"];
};

const HEIGHT = 50;

const ButtonBody = styled(AnimatedPressable)<ButtonBodyProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.md}px;
  height: ${HEIGHT}px;
  width: 100%;
  ${props => getButtonStyle(props.kind, !!props.disabled)};
`;

type ButtonContentProps = {
  isLoading: boolean;
};
const ButtonContent = styled.View<ButtonContentProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: ${props => (props.isLoading ? 0 : 1)};
`;

const LoaderWrapper = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
`;

const Label = styled(ButtonLabel)`
  margin-horizontal: ${props => props.theme.spacing.sm}px;
`;
export type ButtonProps = {
  kind?: ButtonKind;
  loading?: boolean;
  children?: string;
  style?: ViewStyle;
  icon?: ReactElement;
  submitter?: boolean;
  onPress?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
} & Omit<PressableProps, "onPress"> &
  Pick<
    SpacingProps,
    | "margin"
    | "marginHorizontal"
    | "marginVertical"
    | "marginLeft"
    | "marginRight"
    | "marginBottom"
    | "marginTop"
  >;

export type Button = FunctionComponentElement<ButtonProps>;
export const Button = ({
  accessibilityLabel = "not accessible",
  accessible = false,
  kind = "primary",
  disabled = false,
  onPress = () => null,
  loading = false,
  children,
  icon,
  style,
  ...props
}: ButtonProps): Button => {
  const theme = useTheme();

  const activityColor =
    kind === "primary" ? theme.color.background : theme.color.contrast;

  const accessibilityState = {
    disabled: !!disabled && !loading,
    busy: loading
  };

  const handlePress = useCallback(() => {
    if (loading || disabled) {
      return;
    }
    onPress?.();
  }, [disabled, loading, onPress]);

  return (
    <ButtonBody
      {...props}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={handlePress}
      disabled={disabled}
      kind={kind}
    >
      {loading && (
        <LoaderWrapper>
          <ActivityIndicator color={activityColor} size="small" />
        </LoaderWrapper>
      )}
      <ButtonContent isLoading={loading}>
        {icon && icon}
        <Label kind={kind} disabled={disabled}>
          {children}
        </Label>
      </ButtonContent>
    </ButtonBody>
  );
};

const getButtonStyle = (kind: ButtonKind, disabled: boolean) => {
  switch (kind) {
    case "primary":
      return css`
        background-color: ${props =>
          disabled ? props.theme.color.neutral : props.theme.color.primary1};
      `;
    case "secondary":
      return css`
        background-color: ${props =>
          disabled ? props.theme.color.neutral : props.theme.color.warningTint};
        border-color: ${props =>
          disabled ? props.theme.color.neutral : props.theme.color.errorTint};
      `;
  }
};
