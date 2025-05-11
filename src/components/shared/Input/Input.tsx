import React, { ComponentProps, forwardRef } from 'react';
import { TextInput } from 'react-native';

import { MarginProps, styled } from '@/theme';
import { createSpacingStyles } from '@/theme/utils';

import { InputBase } from './InputBase';
import { InputCode } from './InputCode';
import { InputDate } from './InputDate';
import { InputPassword } from './InputPassword';

export type InputProps =
  | ({ type?: 'text' } & ComponentProps<typeof InputBase>)
  | ({ type: 'password' } & ComponentProps<typeof InputPassword>)
  | ({ type: 'code' } & ComponentProps<typeof InputCode>)
  | ({ type: 'date' } & ComponentProps<typeof InputDate>);

const InputContainer = styled.View.attrs(({ style }) => ({
  style,
}))<Partial<InputProps> & MarginProps>`
  width: 100%;
  ${({ theme, ...props }) => createSpacingStyles(props, theme)};
`;

const InputByType = forwardRef<TextInput, InputProps>((props: InputProps, ref) => {
  switch (props.type) {
    case 'password': {
      return <InputPassword ref={ref} {...props} />;
    }
    case 'code': {
      return <InputCode ref={ref} {...props} />;
    }
    case 'date': {
      return <InputDate ref={ref} {...props} />;
    }
    default: {
      return <InputBase ref={ref} {...props} />;
    }
  }
});

export const Input = forwardRef<TextInput, InputProps & MarginProps>(
  (
    {
      marginVertical,
      marginTop,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      ...props
    }: InputProps & MarginProps,
    ref
  ) => {
    return (
      <InputContainer
        {...{
          marginVertical,
          marginTop,
          marginBottom,
          marginHorizontal,
          marginLeft,
          marginRight,
        }}
      >
        <InputByType ref={ref} {...props} />
      </InputContainer>
    );
  }
);

InputByType.displayName = 'InputByType';
Input.displayName = 'Input';
