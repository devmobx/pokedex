const baseColors = {
  white: "#FFFFFF",
  black: "#000000",
  success: "#2EBD85",
  warning: "#F39C12",
  error: "#E74C3C"
} as const;

const lightSchemeColors = {
  lightSchemePrimary1: "#4FC1A6",
  lightSchemePrimary2: "#FA6555",
  lightSchemePrimary3: "#58ABF6",
  lightSchemePrimary4: "#FFCE4B",
  lightSchemePrimary5: "#A06EB4",
  lightSchemePrimary6: "#B1736C",
  lightSchemeContrast: "#303943",
  lightSchemeBackground: "#FFFFFF",
  lightSchemeGrey1: "#F5F5F5",
  lightSchemeMale: "#6C79DB",
  lightSchemeFemale: "#F0729F"
} as const;

const darkSchemeColors = {
  darkSchemePrimary1: "#4FC1A6",
  darkSchemePrimary2: "#FA6555",
  darkSchemePrimary3: "#58ABF6",
  darkSchemePrimary4: "#FFCE4B",
  darkSchemePrimary5: "#A06EB4",
  darkSchemePrimary6: "#B1736C",
  darkSchemeContrast: "#FFFFFF",
  darkSchemeBackground: "#121212",
  darkSchemeGrey1: "#1E1E1E",
  darkSchemeMale: "#6C79DB",
  darkSchemeFemale: "#F0729F"
} as const;

export const color = {
  ...baseColors,
  ...lightSchemeColors,
  ...darkSchemeColors
} as const;
