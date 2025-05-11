import { CalendarBlank } from "phosphor-react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps
} from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps
} from "react-native";

import { styled } from "@/theme";
import { formatStringToEuDateString } from "@/utils";

import { InputBase } from "./InputBase";

type InputDateProps = Pick<
  ComponentProps<typeof InputBase>,
  "error" | "value" | "name" | "rules" | "label" | "lang"
> &
  TextInputProps;

type DateFieldProps = {
  isFocused: boolean;
};

type CalendarIconProps = Pick<DateFieldProps, "isFocused">;

const InputIconButton = styled.Pressable`
  height: 100%;
  justify-content: center;
`;

const CalendarIcon = styled(CalendarBlank).attrs<CalendarIconProps>(props => ({
  color: props.isFocused
    ? props.theme.color.primary1
    : props.theme.color.neutralTint,
  size: props.theme.size.icon.md
}))``;

export const InputDate = forwardRef<TextInput, InputDateProps>(
  ({ label, value = "", onFocus, onBlur, ...props }: InputDateProps, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    useImperativeHandle(ref, () => inputRef.current!, []);

    const _onFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const _onBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const onIconPress = useCallback(() => {
      if (!inputRef.current?.isFocused()) {
        inputRef.current?.focus();
      }
    }, []);

    return (
      <InputBase
        {...props}
        value={value}
        onFocus={_onFocus}
        onBlur={_onBlur}
        formatter={formatStringToEuDateString}
        label={label}
        ref={inputRef}
        keyboardType="number-pad"
        icon={
          <InputIconButton onPress={onIconPress}>
            <CalendarIcon isFocused={isFocused} />
          </InputIconButton>
        }
      />
    );
  }
);

InputDate.displayName = "InputDate";
