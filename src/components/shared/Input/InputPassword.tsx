import { Eye, EyeSlash } from "phosphor-react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps
} from "react";
import {
  Platform,
  type NativeSyntheticEvent,
  type TextInput,
  type TextInputFocusEventData,
  type TextInputProps
} from "react-native";
import { useToggleButton } from "react-native-aria";
import { useToggleState } from "react-stately";

import { styled } from "@/theme";

import { InputBase } from "./InputBase";

type InputPasswordProps = {
  labelType?: "password" | "confirm";
} & Pick<
  ComponentProps<typeof InputBase>,
  "error" | "value" | "name" | "rules" | "lang"
> &
  Omit<TextInputProps, "autoComplete"> & {
    autoComplete?: "current-password" | "new-password";
  };

type PasswordFieldProps = {
  hidePassword: boolean;
  isFocused: boolean;
} & Omit<InputPasswordProps, "lang">;

type EyeIconProps = Pick<PasswordFieldProps, "isFocused" | "error">;

const messages = {
  fr: {
    password: "Mot de passe",
    confirm: "Confirmation",
    toggleOn: "Rendre visible le champ mot de passe",
    toggleOff: "Rendre invisible le champ mot de passe"
  },
  en: {
    password: "Password",
    confirm: "Confirmation",
    toggleOn: "Make password visible",
    toggleOff: "Make password invisible"
  }
};

const InputIconButton = styled.Pressable`
  height: 100%;
  justify-content: center;
`;

const EyeIcon = styled(Eye).attrs<EyeIconProps>(props => ({
  color: (() => {
    if (props.error) {
      return props.isFocused
        ? props.theme.color.error
        : props.theme.color.contrast;
    } else {
      return props.isFocused
        ? props.theme.color.primary1
        : props.theme.color.neutral;
    }
  })(),
  size: props.theme.size.icon.md
}))``;

const EyeSlashIcon = styled(EyeSlash).attrs<EyeIconProps>(props => ({
  color: (() => {
    if (props.error) {
      return props.isFocused
        ? props.theme.color.error
        : props.theme.color.contrast;
    } else {
      return props.isFocused
        ? props.theme.color.primary1
        : props.theme.color.neutral;
    }
  })(),
  size: props.theme.size.icon.md
}))``;

export const InputPassword = forwardRef<TextInput, InputPasswordProps>(
  (
    {
      lang,
      labelType = "password",
      value,
      onFocus,
      onBlur,
      ...props
    }: InputPasswordProps,
    ref
  ) => {
    const accessibilityLanguage = lang === "fr" ? "fr-FR" : "en-US";
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const passwordVisibilityState = useToggleState();
    const { buttonProps } = useToggleButton(
      {
        isDisabled: false,
        accessibilityLanguage,
        accessibilityLabel:
          messages[lang][
            passwordVisibilityState.isSelected ? "toggleOff" : "toggleOn"
          ],
        onPress: useCallback(() => {
          if (!inputRef.current?.isFocused()) {
            inputRef.current?.focus();
          }
        }, [])
      },
      passwordVisibilityState
    );

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

    return (
      <InputBase
        {...props}
        lang={lang}
        accessibilityLanguage={accessibilityLanguage}
        autoComplete="password"
        value={value}
        onFocus={_onFocus}
        onBlur={_onBlur}
        label={messages[lang][labelType]}
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        secureTextEntry={!passwordVisibilityState.isSelected}
        keyboardType={
          Platform.OS === "android" && passwordVisibilityState.isSelected
            ? "visible-password"
            : "default"
        }
        icon={
          <InputIconButton {...buttonProps}>
            {!passwordVisibilityState.isSelected ? (
              <EyeSlashIcon isFocused={isFocused} error={props.error} />
            ) : (
              <EyeIcon isFocused={isFocused} error={props.error} />
            )}
          </InputIconButton>
        }
      />
    );
  }
);

InputPassword.displayName = "InputPassword";
