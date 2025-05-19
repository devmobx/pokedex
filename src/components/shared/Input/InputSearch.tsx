import { MagnifyingGlass, SlidersHorizontal } from "phosphor-react-native";
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

import { AnimatedPressable } from "../AnimatedPressable";
import { InputBase } from "./InputBase";

type InputSearchProps = Pick<
  ComponentProps<typeof InputBase>,
  "error" | "value" | "name" | "rules" | "label" | "lang"
> & {
  onFilterIconPress?: () => void;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
} & TextInputProps;

type DateFieldProps = {
  isFocused: boolean;
};

type SearchIconProps = Pick<DateFieldProps, "isFocused">;

const SearchIconButton = styled.Pressable`
  height: 100%;
  justify-content: center;
`;

const FilterIconButton = styled(AnimatedPressable)`
  height: 100%;
  justify-content: center;
`;

const SearchIcon = styled(MagnifyingGlass).attrs<SearchIconProps>(props => ({
  color: props.isFocused
    ? props.theme.color.contrast
    : props.theme.color.neutral,
  size: props.theme.icon.size.md
}))``;

const FilterIcon = styled(SlidersHorizontal).attrs<SearchIconProps>(props => ({
  color: props.isFocused
    ? props.theme.color.contrast
    : props.theme.color.neutral,
  size: props.theme.icon.size.md
}))``;

export const InputSearch = forwardRef<TextInput, InputSearchProps>(
  (
    {
      label,
      value = "",
      onFocus,
      onBlur,
      onFilterIconPress,
      showLeftIcon = true,
      showRightIcon = true,
      ...props
    }: InputSearchProps,
    ref
  ) => {
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

    const onSearchIconPress = useCallback(() => {
      if (!inputRef.current?.isFocused()) {
        inputRef.current?.focus();
      }
    }, []);

    const _onFilterIconPress = useCallback(() => {
      if (!inputRef.current?.isFocused()) {
        inputRef.current?.focus();
      }
      onFilterIconPress?.();
    }, [onFilterIconPress]);

    return (
      <InputBase
        {...props}
        value={value}
        onFocus={_onFocus}
        onBlur={_onBlur}
        label={label}
        ref={inputRef}
        {...(showLeftIcon
          ? {
              leftIcon: (
                <SearchIconButton onPress={onSearchIconPress}>
                  <SearchIcon isFocused={isFocused} />
                </SearchIconButton>
              )
            }
          : {})}
        {...(showRightIcon
          ? {
              rightIcon: (
                <FilterIconButton onPress={_onFilterIconPress}>
                  <FilterIcon isFocused={isFocused} />
                </FilterIconButton>
              )
            }
          : {})}
      />
    );
  }
);

InputSearch.displayName = "InputSearch";
