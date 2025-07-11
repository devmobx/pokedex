import { NativeStackHeaderLeftProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";

import BackArrow from "@/assets/svg/back_arrow.svg";
import { AnimatedPressable, Graphic } from "@/components/shared";

export const HeaderLeftButton = (props: NativeStackHeaderLeftProps) => {
  const router = useRouter();

  return (
    <AnimatedPressable
      onPress={() => props.canGoBack && router.back()}
      width={30}
      height={30}
      justifyContent="center"
      alignItems="center"
      borderRadius="full"
    >
      <Graphic as={BackArrow} color={props.tintColor} />
    </AnimatedPressable>
  );
};
