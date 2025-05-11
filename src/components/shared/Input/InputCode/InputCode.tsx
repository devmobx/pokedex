import React, {
  ComponentProps,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps
} from "react-native";

import { useKeyboard } from "@/hooks";
import { styled } from "@/theme";

import { ErrorMessage } from "../ErrorMessage";
import { InputBase } from "../InputBase";
import { TextCell } from "./TextCell";

type Props = Readonly<{
  maxLength?: number;
  showMask?: boolean;
}> &
  Pick<ComponentProps<typeof InputBase>, "error" | "value" | "name" | "rules"> &
  TextInputProps;

const HEIGHT = 50;

const Container = styled.View`
  justify-content: center;
`;

const PressableWrapper = styled.Pressable`
  height: ${HEIGHT}px;
  max-width: 270px;
`;

const TextCellWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const InputCell = styled(TextInput)`
  opacity: 0;
`;

export const InputCode = forwardRef<TextInput, Props>(
  (
    {
      maxLength = 6,
      showMask = false,
      onFocus,
      onBlur,
      onChangeText,
      value,
      error,
      ...props
    }: Props,
    ref
  ) => {
    const [controlledValue, setControlledValue] = useState(value ?? "");
    const [focused, setFocused] = useState(false);
    const { isKeyboardVisible, dismissKeyboard } = useKeyboard();
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    const _onChangeText = useCallback(
      (code: string) => {
        setControlledValue(code);
        onChangeText?.(code);
      },
      [onChangeText]
    );

    const _onFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const _onBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if (!isKeyboardVisible) {
          dismissKeyboard();
        }
        onBlur?.(e);
      },
      [dismissKeyboard, isKeyboardVisible, onBlur]
    );

    const handleOnPress = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const digits = controlledValue.substring(0, maxLength).split("");
    const digitsPadded = [
      ...digits,
      ...Array<undefined>(maxLength - digits.length)
    ];

    return (
      <Container>
        <PressableWrapper onPress={handleOnPress}>
          <TextCellWrapper accessible={false}>
            {digitsPadded.map((digit, idx) => (
              <TextCell
                key={idx}
                char={digit}
                focused={focused && idx === controlledValue.length}
                showMask={showMask}
              />
            ))}
          </TextCellWrapper>
          <InputCell
            ref={inputRef}
            value={value}
            keyboardType="numeric"
            onChangeText={_onChangeText}
            onFocus={_onFocus}
            onBlur={_onBlur}
            maxLength={maxLength}
            {...props}
          />
        </PressableWrapper>
        <ErrorMessage error={error} />
      </Container>
    );
  }
);

InputCode.displayName = "InputCode";
