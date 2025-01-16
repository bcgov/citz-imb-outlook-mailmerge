import { EMAIL_RECIPIENTS } from "./constants";

export interface RowData {
  [key: string]: string;
}

export type EmailKey = (typeof EMAIL_RECIPIENTS)[number];

type Attachment = {
  content: string;
  contentType: string;
  filename: string;
  encoding: string;
};

export type SendMailOptions = {
  subjectLine: string;
  body: string;
  attachments?: Attachment[];
  emailRecipients: { [key in EmailKey]?: string[] };
  userEmail: string;
};
