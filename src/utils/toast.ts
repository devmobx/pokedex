import Toast, { ToastData } from "react-native-toast-message";

type Props = ToastData & { type: "warning" | "info" | "success" | "error" };

export const showToast = ({ type, text1, text2 }: Props) => {
  Toast.show({
    type,
    position: "bottom",
    ...(text1 ? { text1 } : {}),
    ...(text2 ? { text2 } : {})
  });
};
