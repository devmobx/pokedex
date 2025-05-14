import { FontProps, PositionProps, SpacingProps, styled } from "@/theme";
import {
  createFontStyles,
  createPositionStyles,
  createSpacingStyles
} from "@/theme/utils";

type Props = FontProps & SpacingProps & PositionProps;

export const FontText = styled.Text<Props>`
  ${({ theme, ...props }) => createFontStyles(props, theme)}
  ${({ theme, ...props }) => createSpacingStyles(props, theme)}
  ${({ theme, ...props }) => createPositionStyles(props)}
`;
