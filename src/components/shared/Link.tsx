import { Href, useRouter } from 'expo-router';

import { Color } from '@/theme';

import { AnimatedPressable, AnimatedPressableProps } from './AnimatedPressable';
import { FontText } from './FontText';

type Props = {
  route: Href;
  children: string;
  color?: Color;
  centered?: boolean;
} & Omit<AnimatedPressableProps, 'onPress'>;

export const Link = ({ route, color, centered, children, ...props }: Props) => {
  const router = useRouter();
  return (
    <AnimatedPressable {...props} onPress={() => router.push(route)}>
      <FontText centered={centered} color={color}>
        {children}
      </FontText>
    </AnimatedPressable>
  );
};
