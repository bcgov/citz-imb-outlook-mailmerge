import { extractAttachment, extractContacts, extractTemplate, mergeBody } from "./helpers";
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
  let attachments = [];

  if (attachmentFiles) {
    for (let i = 0; i < attachmentFiles.length; i++) {
      const attachment = await extractAttachment(attachmentFiles[i]);
      attachments.push({
        content: attachment,
        contentType: attachmentFiles[i].type,
        filename: attachmentFiles[i].name,
        encoding: "base64",
      });
    }
  }

  for (const contact of contacts) {
    const { body, emailRecipients } = mergeBody(template, contact);
    sendEmail({ subjectLine, body, attachments, emailRecipients });
  }
}
