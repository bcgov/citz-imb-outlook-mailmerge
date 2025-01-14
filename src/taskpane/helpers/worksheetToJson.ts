import * as ExcelJS from "exceljs";
import { RowData } from "./types";

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
