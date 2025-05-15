import { css, FontProps, Theme } from "@/theme";

export const createFontStyles = (
  props: Record<string, unknown> & FontProps,
  theme: Theme
) => {
  const {
    color,
    fontSize,
    fontFamily = "poppins",
    fontVariant = "regular",
    textAlign,
    lineHeight
  } = props;

  const resolvedColor = theme.color[color ?? "contrast"];
  const resolvedFontSize = theme.font.size[fontSize ?? "sm"];
  const resolvedFontFamily = theme.font.family[fontFamily][fontVariant];

  return css`
    color: ${resolvedColor};
    font-size: ${resolvedFontSize}px;
    font-family: ${resolvedFontFamily};
    text-align: ${textAlign};
    ${lineHeight ? `line-height: ${lineHeight}px;` : ""}
  `;
};
