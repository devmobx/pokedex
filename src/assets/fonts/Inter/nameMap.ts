import * as Inter from ".";
import { getFontNameMap } from "../utils";

export const InterName = getFontNameMap(Inter);

export type InterName = (typeof InterName)[keyof typeof InterName];
