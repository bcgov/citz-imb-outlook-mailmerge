/* global Office */

import { extractContacts, extractTemplate } from "./helper";

export async function runMailMerge(contactsFile: File, templateFile: File, attachmentFiles?: FileList) {
  console.info("==> runMailMerge", { contactsFile, templateFile, attachmentFiles });
  const contacts = await extractContacts(contactsFile);
  console.log("contacts", contacts);
  const template = await extractTemplate(templateFile);
  console.log("template", template);
  console.log("office", Office.context.mailbox.item);

  //sendEmail(templateFile);
}

async function sendEmail(templateFile: File) {
  const template = await extractTemplate(templateFile);
  console.log("template", template);
  console.log("office", Office.context.mailbox.item);

  Office.context.mailbox.displayNewMessageForm({
    toRecipients: ["scott.toews@gov.bc.ca"],
    subject: "Test Mail Merge",
    body: template, // Use the extracted template as the body
    // attachments: attachmentFiles ? Array.from(attachmentFiles) : []
  });
}
