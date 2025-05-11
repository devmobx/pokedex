import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboard = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    const didShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const didHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );
    return () => {
      didShowListener?.remove();
      didHideListener?.remove();
    };
  }, []);

  return { isKeyboardVisible, dismissKeyboard };
};
