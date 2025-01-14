import { extractContacts, extractTemplate, mergeBody } from "./helpers";
import { sendEmail } from "./office/sendEmail";

export async function runMailMerge({
  subject,
  contactsFile,
  templateFile,
  attachmentFiles,
}: {
  subject: string;
  contactsFile: File;
  templateFile: File;
  attachmentFiles?: FileList;
}) {
  console.info("==> runMailMerge", { subject, contactsFile, templateFile, attachmentFiles });
  const contacts = await extractContacts(contactsFile);
  const template = await extractTemplate(templateFile);

  for (const contact of contacts) {
    console.log("contact", contact);
    const { body, emailRecipients } = mergeBody(template, contact);
    console.log("body", body);
    console.log("emailDetails", emailRecipients);
    sendEmail({ subject: "test subject", body, attachmentFiles, emailRecipients });
  }
}
