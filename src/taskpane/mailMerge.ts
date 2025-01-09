import { extractContacts, extractTemplate } from "./helper";

export async function runMailMerge(contactsFile: File, templateFile: File, attachmentFiles?: FileList) {
  console.info("==> runMailMerge", { contactsFile, templateFile, attachmentFiles });
  const contacts = await extractContacts(contactsFile);
  console.log("contacts", contacts);
  const template = await extractTemplate(templateFile);
  console.log("template", template);
}
