import * as ExcelJS from "exceljs";
import mammoth from "mammoth";

interface RowData {
  [key: string]: string;
}

export function worksheetToJson(worksheet: ExcelJS.Worksheet): RowData[] {
  console.info("==> worksheetToJson", { worksheet });
  const json: RowData[] = [];
  const headers: string[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        headers[colNumber - 1] = cell.text;
      });
    } else {
      const rowData: RowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber - 1]] = cell.text;
      });
      json.push(rowData);
    }
  });

  return json;
}

export async function getTemplate(templateFile: File) {
  console.info("==> getTemplate", { templateFile });
  if (!templateFile) {
    return {};
  }

  const reader = new FileReader();

  const text = await new Promise<string>((resolve, reject) => {
    reader.onload = async function (e) {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const result = await mammoth.extractRawText({ arrayBuffer });
      resolve(result.value);
    };
    reader.onerror = function (e) {
      console.error("Failed to read file", e);
      reject(new Error("Failed to read file"));
    };
    reader.readAsArrayBuffer(templateFile);
  });

  return text;
}

export async function getContacts(contactsFile: File) {
  console.info("==> getContacts", { contactsFile });
  if (!contactsFile) {
    return {};
  }

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
