import {
  ThemeProvider as _ThemeProvider,
  css as _css,
  styled as _styled,
  useTheme as _useTheme
} from "styled-components/native";

import { colorSchemes } from "./color-schemes";
import * as constants from "./constants";
import { ColorScheme } from "./types/theme";

export const ThemeProvider = _ThemeProvider;
export const css = _css;
export const styled = _styled;
export const useTheme = _useTheme;
export * from "./hooks";
export type * from "./types/props";
export type * from "./types/theme";
export const getThemeByColorScheme = (name: ColorScheme) => ({
  color: colorSchemes[name],
  ...constants
});
