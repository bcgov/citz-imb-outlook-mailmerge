import { getContacts, getTemplate } from "./helper";

export async function runMailMerge(contactsFile: File, templateFile: File, attachmentFiles?: FileList) {
  console.info("==> runMailMerge", { contactsFile, templateFile, attachmentFiles });
  const contacts = await getContacts(contactsFile);
  console.log("contacts", contacts);
  const template = await getTemplate(templateFile);
  console.log("template", template);
}
