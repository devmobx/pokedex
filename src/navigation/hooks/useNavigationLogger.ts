import { usePathname, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";

import { styledLog } from "@/utils";

export const useNavigationLogger = () => {
  const pathname = usePathname();
  const navigationState = useRootNavigationState() as {
    routes?: { name: string }[];
    key?: string;
  } | null;
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    if (!navigationState?.key) return;
    if (__DEV__ && pathname !== previousPath) {
      styledLog(
        ["NAVIGATION", pathname],
        { text: "#BAD7E6", background: "#2E5564" },
        navigationState
      );
      setPreviousPath(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, navigationState?.key]);
};
