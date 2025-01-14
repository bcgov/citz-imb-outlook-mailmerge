import { EMAIL_RECIPIENTS } from "./constants";

export interface RowData {
  [key: string]: string;
}

export type EmailKey = (typeof EMAIL_RECIPIENTS)[number];

export type SendMailOptions = {
  subjectLine: string;
  body: string;
  attachmentFiles?: FileList;
  emailRecipients: { [key in EmailKey]?: string };
};
