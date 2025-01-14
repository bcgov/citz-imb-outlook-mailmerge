/* global Office */

import { SendMailOptions } from "../helpers";

export async function sendEmail({ subject, body, attachmentFiles, emailRecipients }: SendMailOptions) {
  Office.context.mailbox.displayNewMessageForm({
    toRecipients: emailRecipients.To,
    ccRecipients: emailRecipients.Cc,
    bccRecipients: emailRecipients.Bcc,
    subject,
    body,
    attachments: attachmentFiles ? attachmentFiles : null,
  });
}
