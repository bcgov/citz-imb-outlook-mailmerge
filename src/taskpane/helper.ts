import * as ExcelJS from "exceljs";

export function worksheetToJson(worksheet: ExcelJS.Worksheet) {
  console.info("==> worksheetToJson", { worksheet });
  const json = [];
  const headers = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        headers[colNumber] = cell.text;
      });
    } else {
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber]] = cell.text;
      });
      json.push(rowData);
    }
  });

  return json;
}
