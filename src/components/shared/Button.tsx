import React, {
  ComponentProps,
  ReactElement,
  ReactNode,
  useCallback
} from "react";
import { ActivityIndicator, PressableProps, ViewStyle } from "react-native";

import { Color, FontSize, SpacingProps, styled, useTheme } from "@/theme";

import { AnimatedPressable } from "./AnimatedPressable";
import { FontText } from "./FontText";

type ButtonContentProps = {
  isLoading: boolean;
};

export type ButtonProps = {
  loading?: boolean;
  children: string | ReactNode;
  style?: ViewStyle;
  icon?: ReactElement;
  submitter?: boolean;
  onPress?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
  backgroundColor: Color;
  labelColor: Color;
  fontSize?: FontSize;
  fontVariant?: ComponentProps<typeof FontText>["fontVariant"];
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

const HEIGHT = 50;

const ButtonBody = styled(AnimatedPressable)<Omit<ButtonProps, "labelColor">>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.border.radius.md}px;
  height: ${HEIGHT}px;
  width: 100%;
  background-color: ${props => props.theme.color[props.backgroundColor]};
`;

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

const Label = styled(FontText)`
  text-align: center;
  align-self: center;
  margin-horizontal: ${props => props.theme.spacing.sm}px;
`;

export const Button = ({
  accessibilityLabel,
  accessible = false,
  backgroundColor = "contrast",
  labelColor = "white",
  disabled = false,
  onPress = () => null,
  loading = false,
  fontVariant,
  children,
  fontSize,
  icon,
  style,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

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
      {...(accessibilityLabel ? { accessibilityLabel } : {})}
      accessibilityState={accessibilityState}
      backgroundColor={backgroundColor}
      accessibilityRole="button"
      accessible={accessible}
      onPress={handlePress}
      disabled={disabled}
    >
      {loading && (
        <LoaderWrapper>
          <ActivityIndicator color={theme.color[labelColor]} size="small" />
        </LoaderWrapper>
      )}
      <ButtonContent isLoading={loading}>
        {icon && icon}
        {typeof children === "string" ? (
          <Label
            color={labelColor}
            fontSize={fontSize}
            fontVariant={fontVariant}
          >
            {children}
          </Label>
        ) : (
          children
        )}
      </ButtonContent>
    </ButtonBody>
  );
};
