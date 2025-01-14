import { EMAIL_RECIPIENTS } from "./constants";

export interface RowData {
  [key: string]: string;
}

export type EmailKey = (typeof EMAIL_RECIPIENTS)[number];
