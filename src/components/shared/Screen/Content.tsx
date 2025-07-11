import { useHeaderHeight } from "@react-navigation/elements";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  headerShown?: boolean;
} & ViewProps;

export const Content = ({ headerShown, style, children }: Props) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        style,
        { flex: 1, paddingTop: headerShown ? headerHeight - insets.top : 0 }
      ]}
    >
      {children}
    </View>
  );
};
