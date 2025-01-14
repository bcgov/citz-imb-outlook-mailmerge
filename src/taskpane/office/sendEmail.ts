/* global Office */

import { EmailKey } from "../helpers/types";

export async function sendEmail({
  subject,
  body,
  attachmentFiles,
  emailRecipients,
}: {
  subject: string;
  body: string;
  attachmentFiles?: FileList;
  emailRecipients: { [key in EmailKey]?: string };
}) {
  Office.context.mailbox.displayNewMessageForm({
    toRecipients: emailRecipients.To,
    ccRecipients: emailRecipients.Cc,
    bccRecipients: emailRecipients.Bcc,
    subject,
    body,
    attachments: attachmentFiles ? attachmentFiles : null,
  });
}
