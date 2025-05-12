import { css } from "styled-components/native";

import { MarginSpacing, SpacingProps } from "../types/props";
import { Spacing, Theme } from "../types/theme";

const getMarginValue = (theme: Theme, val?: MarginSpacing) => {
  if (!val) return undefined;
  if (val === "auto") {
    return "auto";
  }
  return theme.spacing[val] + "px";
};

const getPaddingValue = (theme: Theme, val?: Spacing) => {
  if (!val) return undefined;
  return theme.spacing[val] + "px";
};

export const createSpacingStyles = (
  props: Record<string, unknown> & SpacingProps,
  theme: Theme
) => {
  const {
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,

    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical
  } = props;

  // ----- MARGIN -----
  const mTop = getMarginValue(theme, marginTop ?? marginVertical ?? margin);
  const mBottom = getMarginValue(
    theme,
    marginBottom ?? marginVertical ?? margin
  );
  const mLeft = getMarginValue(theme, marginLeft ?? marginHorizontal ?? margin);
  const mRight = getMarginValue(
    theme,
    marginRight ?? marginHorizontal ?? margin
  );

  // ----- PADDING -----
  const pTop = getPaddingValue(theme, paddingTop ?? paddingVertical ?? padding);
  const pBottom = getPaddingValue(
    theme,
    paddingBottom ?? paddingVertical ?? padding
  );
  const pLeft = getPaddingValue(
    theme,
    paddingLeft ?? paddingHorizontal ?? padding
  );
  const pRight = getPaddingValue(
    theme,
    paddingRight ?? paddingHorizontal ?? padding
  );

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return css`
    ${mTop && `margin-top: ${mTop};`}
    ${mBottom && `margin-bottom: ${mBottom};`}
    ${mLeft && `margin-left: ${mLeft};`}
    ${mRight && `margin-right: ${mRight};`}

    ${pTop && `padding-top: ${pTop};`}
    ${pBottom && `padding-bottom: ${pBottom};`}
    ${pLeft && `padding-left: ${pLeft};`}
    ${pRight && `padding-right: ${pRight};`}
  `.join("");
};
