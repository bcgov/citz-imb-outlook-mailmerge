import { EMAIL_RECIPIENTS } from "./constants";
import { EmailKey, RowData } from "./types";

export function mergeBody(template: string, contact: RowData) {
  console.info("==> mergeBody", { template, contact });

  let body = template;
  let emailRecipients: { [key in EmailKey]?: string } = {};

  for (const key in contact) {
    if (EMAIL_RECIPIENTS.includes(key as EmailKey)) {
      emailRecipients[key as EmailKey] = contact[key];
    }
    body = body.replace(new RegExp(`{{${key}}}`, "g"), contact[key]);
  }

  return { body, emailRecipients };
}
