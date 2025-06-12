import * as Poppins from ".";
import { getFontNameMap } from "../utils";

export const PoppinsName = getFontNameMap(Poppins);

export type PoppinsName = (typeof PoppinsName)[keyof typeof PoppinsName];
