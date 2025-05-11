import { Circle } from "phosphor-react-native";
import React from "react";

import { styled } from "@/theme";

import { FontText } from "../../FontText";

type ContainerProps = {
  empty: boolean;
  focused: boolean;
};

const Container = styled.View<ContainerProps>`
  width: 40px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props => props.theme.color.neutral};
  ${props =>
    props.focused
      ? `
        border-color: ${props.theme.color.primary1};
        border-width: 2px;
      `
      : ""}
  ${props =>
    !props.empty
      ? `
        border-color: ${props.theme.color.neutral};
        border-width: 1px;
      `
      : ""}
});
`;

const Underline = styled.View`
  border-color: ${props => props.theme.color.primary1};
  border-width: 0.6px;
  width: 32px;
  position: absolute;
  bottom: 4px;
`;

const MaskCharacter = styled(Circle).attrs(props => ({
  weight: "fill",
  size: 16,
  color: props.theme.color.primary1
}))``;

type Props = {
  char: string | undefined;
  focused: boolean;
  showMask?: boolean;
};

export const TextCell = ({ char, showMask, focused }: Props) => {
  const cellText = showMask && char ? <MaskCharacter /> : char;

  return (
    <Container focused={focused} empty={char === undefined}>
      <>
        <FontText
          fontFamily="inter"
          fontSize="md"
          fontVariant="regular"
          color="primary1"
        >
          {cellText}
        </FontText>
        {focused && <Underline />}
      </>
    </Container>
  );
};
