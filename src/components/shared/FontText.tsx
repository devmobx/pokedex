import { TextProps } from 'react-native';

import { CenteredProp, Color, FontFamily, FontSize, SpacingProps, styled } from '@/theme';
import { InterVariantKey, PoppinsVariantKey } from '@/theme/constants/font';
import { createSpacingStyles } from '@/theme/utils';

type FontFamilyProps =
  | {
      fontFamily?: Extract<FontFamily, 'inter'>;
      fontVariant?: InterVariantKey;
    }
  | {
      fontFamily?: Extract<FontFamily, 'poppins'>;
      fontVariant?: PoppinsVariantKey;
    };

type Props = TextProps & {
  fontSize?: FontSize;
  lineHeight?: number;
  color?: Color;
} & FontFamilyProps &
  CenteredProp &
  SpacingProps;

export const FontText = styled.Text<Props>`
  color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.contrast)};
  font-size: ${({ theme, fontSize }) =>
    fontSize ? theme.size.font[fontSize] : theme.size.font.sm}px;
  font-family: ${({ theme, fontFamily, fontVariant }) =>
    theme.font[fontFamily ?? 'poppins'][fontVariant ?? 'regular']};
  ${({ centered }) => (centered ? 'text-align: center;' : '')}
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}px;` : '')}
  ${({ theme, ...props }) => createSpacingStyles(props, theme)}
`;
