import { EMAIL_RECIPIENTS } from "./constants";
import { EmailKey, RowData } from "./types";

export function mergeBody(template: string, contact: RowData) {
  console.info("==> mergeBody", { template, contact });

  let body = template;
  let emailRecipients: { [key in EmailKey]?: string[] } = {
    To: [],
    Cc: [],
    Bcc: [],
  };

  for (const key in contact) {
    // If the key To, Cc, or Bcc, split the value by semicolons and add it to the emailRecipients object
    if (EMAIL_RECIPIENTS.includes(key as EmailKey)) {
      emailRecipients[key as EmailKey] = contact[key].split(";");
    }
    // Replace all instances of {{key}} in the body with the value from the contact
    body = body.replace(new RegExp(`{{${key}}}`, "g"), contact[key]);
  }

  return { body, emailRecipients };
}
