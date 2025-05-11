import { StateCreator, StoreMutatorIdentifier } from "zustand";

import { Env } from "@/env";
import { styledLog } from "@/utils";

// storeLogger must be wrapped by zustand devtools to get the third action argument on set
// which allows the logger to log the given action name along with the store

type LoggedStore = <
  T extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  storeName: string,
  f: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

export const storeLogger: LoggedStore =
  (storeName, config) => (set, get, api) => {
    if (Env.ENVIRONMENT === "production") return config(set, get, api);

    const wrappedSet = (
      partial: object,
      replace: false | undefined,
      action: string | undefined
    ) => {
      set(partial, replace, action);
      styledLog(
        [`ZUSTAND`, `${storeName} ${action ?? "unknown"}`],
        { text: "#D7CCC8", background: "#4E342E" },
        get()
      );
    };

    return config(wrappedSet as unknown as typeof set, get, {
      ...api,
      setState: wrappedSet
    });
  };
