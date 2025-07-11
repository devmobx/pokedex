import { ComponentProps } from "react";

import { Box } from "@/components/shared";

type Props = Pick<
  ComponentProps<typeof Box>,
  "flexDirection" | "flexWrap" | "alignItems" | "justifyContent" | "children"
>;

export const SlideContent = ({ children, ...props }: Props) => {
  return (
    <Box {...props} flex={1} paddingHorizontal="md" paddingTop="md">
      {children}
    </Box>
  );
};
