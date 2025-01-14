/* global Office */

import { SendMailOptions } from "../helpers";

export async function sendEmail({ subjectLine, body, attachmentFiles, emailRecipients }: SendMailOptions) {
  Office.context.mailbox.displayNewMessageForm({
    toRecipients: emailRecipients.To,
    ccRecipients: emailRecipients.Cc,
    bccRecipients: emailRecipients.Bcc,
    subject: subjectLine,
    body,
    attachments: attachmentFiles ? attachmentFiles : null,
  });
}
