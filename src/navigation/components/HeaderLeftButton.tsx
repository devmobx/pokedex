import { NativeStackHeaderLeftProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";

import BackArrow from "@/assets/svg/back_arrow.svg";
import { AnimatedPressable, Graphic } from "@/components/shared";
import { useTheme } from "@/theme";

export const HeaderLeftButton = (props: NativeStackHeaderLeftProps) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <AnimatedPressable
      onPress={() => props.canGoBack && router.back()}
      backgroundColor="transparentGrey1"
      width={30}
      height={30}
      justifyContent="center"
      alignItems="center"
      borderRadius="full"
    >
      <Graphic as={BackArrow} color={theme.color.contrast} />
    </AnimatedPressable>
  );
};
