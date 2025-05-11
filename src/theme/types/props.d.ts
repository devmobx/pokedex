import { Spacing } from './theme';

type MarginSpacing = Spacing | 'auto';

export type MarginProps = {
  margin?: MarginSpacing;
  marginTop?: MarginSpacing;
  marginBottom?: MarginSpacing;
  marginLeft?: MarginSpacing;
  marginRight?: MarginSpacing;
  marginHorizontal?: MarginSpacing;
  marginVertical?: MarginSpacing;
};

export type PaddingProps = {
  padding?: Spacing;
  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  paddingHorizontal?: Spacing;
  paddingVertical?: Spacing;
};

export type SpacingProps = MarginProps & PaddingProps;

export type CenteredProp = { centered?: boolean };
