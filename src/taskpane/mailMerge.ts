import ExcelJS from "exceljs";
import { worksheetToJson } from "./helper";

async function runMailMerge(contactsFile: File, templateFile: File, attachmentFiles?: FileList) {
  console.info("==> runMailMerge", { contactsFile, templateFile, attachmentFiles });
  const contacts = await getContacts(contactsFile);
  console.log("contacts", contacts);
}

async function getContacts(contactsFile: File) {
  console.info("==> getContacts", { contactsFile });
  if (!contactsFile) {
    return {};
  }

  const reader = new FileReader();

  const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = function (e) {
      resolve(e.target.result as ArrayBuffer);
    };
    reader.onerror = function (e) {
      console.error("Failed to read file", e);
      reject(new Error("Failed to read file"));
    };
    reader.readAsArrayBuffer(contactsFile);
  });

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.worksheets[0];
  const json = worksheetToJson(worksheet);

  return json;
}

export default runMailMerge;
