import React, {
  ComponentProps,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { FieldError, UseControllerProps, UseFormReturn } from "react-hook-form";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  ViewProps
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import { SupportedLanguages } from "@/i18n";
import { Spacing, styled, useTheme } from "@/theme";

import { FontText } from "../FontText";

export type InputBaseProps = {
  lang: SupportedLanguages;
  label: string;
  error?: FieldError;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  value?: string;
  inputStyle?: StyleProp<TextStyle>;
  name: string;
  register?: UseFormReturn["register"];
  rules?: UseControllerProps["rules"];
  formatter?: (val: string) => string;
} & TextInputProps;

type InputState = "focused" | "blurred" | "inactive";

type InputFieldProps = {
  inputState: InputState;
} & TextInputProps;

type InputWrapperProps = ViewProps & {
  hasError: boolean;
  inputState: InputState;
};

const HEIGHT = 60;
const FOCUSSED_LABEL_TOP = 5;
const ICON_SIZE: Spacing = "md";

const AnimatedBackgroundLayer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.neutralTint};
  border-radius: ${props => props.theme.border.radius.md}px;
`;

type AnimatedLabelProps = ViewProps &
  ComponentProps<typeof Animated.Text> &
  Pick<InputFieldProps, "inputState"> & {
    hasError: boolean;
  };

const AnimatedLabel = styled(Animated.Text)<
  AnimatedLabelProps & Pick<InputBaseProps, "leftIcon">
>`
  position: absolute;
  ${props =>
    props.leftIcon
      ? `left: ${props.theme.spacing.lg + props.theme.spacing.lg}px;`
      : ""}
  font-family: ${props =>
    ["focused", "inactive"].includes(props.inputState)
      ? props.theme.font.family.poppins.medium
      : props.theme.font.family.poppins["semi-bold"]};
  font-size: ${props => props.theme.font.size.sm}px;
  padding-left: ${props => props.theme.spacing.lg}px;
  color: ${props => {
    if (props.hasError) {
      return props.inputState === "focused"
        ? props.theme.color.error
        : props.theme.color.contrast;
    } else {
      return ["focused"].includes(props.inputState)
        ? props.theme.color.contrast
        : props.theme.color.neutral;
    }
  }};
`;

const InputField = styled(TextInput)<InputFieldProps>`
  flex: 1;
  height: 100%;
  padding: ${props => props.theme.font.size.sm}px 30px 0px
    ${props => props.theme.spacing.lg}px;
  border-radius: ${props => props.theme.border.radius.md}px;
  font-family: ${({ theme }) => theme.font.family.poppins.regular};
  font-size: ${props => props.theme.font.size.sm}px;
  color: ${({ theme, inputState }) =>
    inputState === "focused" ? theme.color.contrast : theme.color.neutral};
`;

const RightInputIconSlot = styled.View`
  width: ${props =>
    props.theme.icon.size[ICON_SIZE] + props.theme.spacing.lg}px;
  height: 100%;
  justify-content: center;
  border-radius: 0 ${props => props.theme.border.radius.md}px
    ${props => props.theme.border.radius.md}px 0;
`;

const LeftInputIconSlot = styled.View`
  width: ${props => props.theme.icon.size[ICON_SIZE]}px;
  height: 100%;
  justify-content: center;
  padding-horizontal: ${props => props.theme.spacing.lg}px;
`;

const InputWrapper = styled.View<InputWrapperProps>`
  position: relative;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  height: ${HEIGHT}px;
  overflow-x: visible;
  border: solid ${props => props.theme.border.size.xs}px;
  border-color: ${props =>
    props.hasError
      ? props.theme.color.error
      : ["focused"].includes(props.inputState)
      ? props.theme.color.contrast
      : props.theme.color.neutral};
  border-radius: ${props => props.theme.border.radius.md}px;
  background-color: ${props => props.theme.color.background};
`;

const Container = styled.View`
  flex-direction: row;
`;

export const InputBase = forwardRef<TextInput, InputBaseProps>(
  (
    {
      lang,
      label,
      leftIcon,
      rightIcon,
      error,
      inputStyle,
      onFocus,
      onBlur,
      onChangeText,
      formatter,
      value,
      ...props
    }: InputBaseProps,
    ref
  ) => {
    const [controlledValue, setControlledValue] = useState(value ?? "");
    const [inputState, setInputState] = useState<InputState>("blurred");
    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(ref, () => inputRef.current!, []);
    const theme = useTheme();

    const _onFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setInputState("focused");
        onFocus?.(e);
      },
      [onFocus]
    );

    const _onBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setInputState(controlledValue.length > 0 ? "inactive" : "blurred");
        onBlur?.(e);
      },
      [controlledValue.length, onBlur]
    );

    const _onChangeText = useCallback(
      (text: string) => {
        const val = formatter ? formatter(text) : text;
        setControlledValue(val);
        onChangeText?.(val);
      },
      [onChangeText, formatter]
    );

    const getLabelStyle = useCallback(
      () => ({
        top:
          inputState === "blurred" && !props.placeholder
            ? theme.font.size.md
            : FOCUSSED_LABEL_TOP,
        fontSize:
          inputState === "blurred" && !props.placeholder
            ? theme.font.size.sm
            : theme.font.size.xs
      }),
      [
        inputState,
        props.placeholder,
        theme.font.size.md,
        theme.font.size.sm,
        theme.font.size.xs
      ]
    );

    const getBackgroundOpacity = useCallback(
      () => (inputState === "focused" ? 0 : 1),
      [inputState]
    );

    const backgroundOpacity = useSharedValue(getBackgroundOpacity());
    const labelProps = useSharedValue(getLabelStyle());

    useEffect(() => {
      backgroundOpacity.value = withTiming(getBackgroundOpacity(), {
        duration: 200
      });
      labelProps.value = getLabelStyle();
    }, [
      inputState,
      props.placeholder,
      backgroundOpacity,
      labelProps,
      theme.font.size.sm,
      theme.font.size.xs,
      getLabelStyle,
      getBackgroundOpacity
    ]);

    const animatedBackgroundLayerStyle = useAnimatedStyle(() => ({
      opacity: backgroundOpacity.value
    }));

    const animatedLabelStyle = useAnimatedStyle(() => ({
      top: withTiming(labelProps.value.top, { duration: 200 }),
      fontSize: withTiming(labelProps.value.fontSize, { duration: 200 })
    }));

    return (
      <>
        <Container>
          <InputWrapper inputState={inputState} hasError={error !== undefined}>
            <AnimatedBackgroundLayer style={animatedBackgroundLayerStyle} />
            <AnimatedLabel
              accessible={false}
              style={animatedLabelStyle}
              inputState={inputState}
              hasError={error !== undefined}
              pointerEvents="none"
              leftIcon={leftIcon}
            >
              {label}
            </AnimatedLabel>
            {leftIcon && <LeftInputIconSlot>{leftIcon}</LeftInputIconSlot>}
            <InputField
              {...props}
              accessibilityLabel={label}
              value={value}
              ref={inputRef}
              style={inputStyle}
              inputState={inputState}
              onFocus={_onFocus}
              onBlur={_onBlur}
              onChangeText={_onChangeText}
            />
            {rightIcon && <RightInputIconSlot>{rightIcon}</RightInputIconSlot>}
          </InputWrapper>
        </Container>
        {error?.message && (
          <FontText color="error" marginTop="xs" marginLeft="xxs" fontSize="xs">
            {error.message}
          </FontText>
        )}
      </>
    );
  }
);

InputBase.displayName = "InputBase";
