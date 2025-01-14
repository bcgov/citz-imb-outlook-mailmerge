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
    console.log("contact", contact);
    const { body, emailRecipients } = mergeBody(template, contact);
    console.log("body", body);
    console.log("emailDetails", emailRecipients);
    sendEmail({ subjectLine, body, attachmentFiles, emailRecipients });
  }
}
