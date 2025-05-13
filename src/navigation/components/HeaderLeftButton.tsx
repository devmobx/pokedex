import BackArrow from "@/assets/svg/back_arrow.svg";
import { AnimatedPressable, Graphic } from "@/components/shared";
import { useTheme } from "@/theme";

type Props = {
  onPress: () => void;
};

export const HeaderLeftButton = ({ onPress }: Props) => {
  const theme = useTheme();

  return (
    <AnimatedPressable onPress={onPress}>
      <Graphic as={BackArrow} color={theme.color.contrast} />
    </AnimatedPressable>
  );
};
