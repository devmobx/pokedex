import { Theme } from "../types/theme";

export const lightScheme: Theme["color"] = {
  primary1: "#4FC1A6",
  primary2: "#FA6555",
  primary3: "#58ABF6",
  primary4: "#FFCE4B",
  primary5: "#A06EB4",
  primary6: "#B1736C",
  contrast: "#303943",
  background: "#FFFFFF",
  grey1: "#F5F5F5",
  male: "#6C79DB",
  female: "#F0729F",
  white: "#FFFFFF",
  black: "#000000",
  success: "#2EBD85",
  successTint: "#D1F3E4",
  warning: "#F39C12",
  warningTint: "#FBE7B9",
  error: "#E74C3C",
  errorTint: "#F8CFC9",
  neutral: "#757897",
  neutralTint: "#F4F4FE",
  shadow: "#00000066"
} as const;
