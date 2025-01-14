import { extractContacts, extractTemplate, mergeBody } from "./helpers";
import { sendEmail } from "./ches/sendmail";

export async function runMailMerge({
  subjectLine,
  contactsFile,
  templateFile,
  attachmentFiles,
}: {
  subjectLine: string;
  contactsFile: File;
  templateFile: File;
  attachmentFiles?: FileList;
}) {
  console.info("==> runMailMerge", { subjectLine, contactsFile, templateFile, attachmentFiles });
  const contacts = await extractContacts(contactsFile);
  const template = await extractTemplate(templateFile);

  for (const contact of contacts) {
    const { body, emailRecipients } = mergeBody(template, contact);
    sendEmail({ subjectLine, body, attachmentFiles, emailRecipients });
  }
}
