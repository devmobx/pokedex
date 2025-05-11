import React, { ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { useTheme, styled } from '@/theme';

type Props = {
  children: ReactNode;
};

const FlexOneKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const KeyboardAvoidingContainer = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <FlexOneKeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={theme.spacing.xxl + theme.spacing.sm}
    >
      {children}
    </FlexOneKeyboardAvoidingView>
  );
};
