import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToXLSX = (data: any[]): void => {
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook and add the worksheet
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate XLSX file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Save the file using FileSaver.js
  const fileName = "exported_data.xlsx";
  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(file, fileName);
};
