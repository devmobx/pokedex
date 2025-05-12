import { Pressable } from "react-native";
import { ToastData, ToastProps } from "react-native-toast-message";

import { Color, styled } from "@/theme";

import { FontText } from "./FontText";

type ToastContainerProps = {
  colorKey: Color;
};

const HEIGHT = 70;

const ToastContainer = styled(Pressable)<ToastContainerProps>`
  width: 90%;
  padding-horizontal: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.border.radius.md}px;
  align-items: flex-start;
  justify-content: center;
  min-height: ${HEIGHT}px;
  shadow-color: ${props => props.theme.color.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  background_color: ${({ colorKey, theme }) => theme.color[colorKey]};
`;

type Props = ToastProps & ToastData;

export const Toast = ({ type, text1, text2, onPress }: Props) => {
  const colorKeys = getColorKeysByType(type);

  return (
    <ToastContainer colorKey={colorKeys.background} onPress={onPress}>
      {text1 && (
        <FontText
          fontFamily="poppins"
          fontSize="sm"
          fontVariant="bold"
          color={colorKeys.text}
        >
          {text1}
        </FontText>
      )}
      {text2 && (
        <FontText
          fontFamily="poppins"
          fontSize="xs"
          fontVariant="regular"
          color={colorKeys.text}
          marginTop="sm"
        >
          {text2}
        </FontText>
      )}
    </ToastContainer>
  );
};

type GetColorKeysByTypeReturn = {
  background: Color;
  text: Color;
};

const getColorKeysByType = (type: Props["type"]): GetColorKeysByTypeReturn => {
  switch (type) {
    case "error": {
      return {
        background: "errorTint",
        text: "error"
      };
    }
    case "warning": {
      return {
        background: "warningTint",
        text: "warning"
      };
    }
    case "success": {
      return {
        background: "successTint",
        text: "success"
      };
    }
    default: {
      return {
        background: "neutralTint",
        text: "neutral"
      };
    }
  }
};
