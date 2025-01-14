import * as ExcelJS from "exceljs";
import { worksheetToJson } from "./worksheetToJson";

export async function extractContacts(contactsFile: File) {
  console.info("==> getContacts", { contactsFile });
  const reader = new FileReader();

  const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = function (e) {
      resolve(e.target?.result as ArrayBuffer);
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
