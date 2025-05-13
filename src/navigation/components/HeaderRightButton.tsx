import MenuBurger from "@/assets/svg/menu_burger.svg";
import { AnimatedPressable, Graphic } from "@/components/shared";

type Props = {
  onPress: () => void;
};

export const HeaderRightButton = ({ onPress }: Props) => {
  return (
    <AnimatedPressable onPress={onPress}>
      <Graphic as={MenuBurger} />
    </AnimatedPressable>
  );
};
