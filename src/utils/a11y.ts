import { AccessibilityInfo, Platform } from "react-native";

export const osSafeA11yAnnounce = (message?: string) => {
  if (!message) return null;

  const announce = () => {
    AccessibilityInfo.announceForAccessibility(message);
    return null;
  };

  return Platform.OS === "ios" ? setTimeout(announce, 100) : announce();
};
