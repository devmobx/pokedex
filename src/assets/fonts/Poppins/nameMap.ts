import * as Poppins from ".";
import { getFontNameMap } from "../utils";

export const PoppinsName = getFontNameMap(Poppins);
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PoppinsName = (typeof PoppinsName)[keyof typeof PoppinsName];
