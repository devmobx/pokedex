import * as Inter from ".";
import { getFontNameMap } from "../utils";

export const InterName = getFontNameMap(Inter);
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type InterName = (typeof InterName)[keyof typeof InterName];
