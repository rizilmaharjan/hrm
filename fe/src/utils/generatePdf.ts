import jsPDF from "jspdf";
import "jspdf-autotable";
import { TPayroll } from "../interfaces/types/payroll.types";
import { addFooter } from "../utils/pdfFooter";

export const generatePDF = (payrollData: TPayroll[]) => {
  if (!payrollData) return;

  const uniqueEmployeePairs = [
    ...new Set(
      payrollData.map((item) => `${item.employee_cd} - ${item.empname}`)
    ),
  ];

  const filterEmp = uniqueEmployeePairs;

  const doc = new jsPDF({
    orientation: "landscape",
  });

  const descriptions = [...new Set(payrollData.map((item) => item.de))];

  const numRowsPerPage = 25;

  const numEmployees = filterEmp.length;
  const numPages = Math.ceil(numEmployees / numRowsPerPage);

  // Calculate the number of chunks based on column width
  const chunks: string[][] = [];
  let chunk: string[] = [];
  descriptions.forEach((desc) => {
    chunk.push(desc);
    if (chunk.length === 10) {
      chunks.push(chunk);
      chunk = [];
    }
  });
  if (chunk.length > 0) {
    chunks.push(chunk);
  }

  const generateTableData = (descriptions: string[], empPairs: string[]) => {
    const tableData = [];
    tableData.push(["SN", "Employee", ...descriptions]);
    empPairs.forEach((empPair, index) => {
      const empCode = empPair.split(" - ")[0];
      const empName = empPair.split(" - ")[1];

      const rowData = [index + 1, empPair];
      descriptions.forEach((desc) => {
        const matchingEntry = payrollData.find(
          (item) =>
            item.employee_cd === empCode &&
            item.empname === empName &&
            item.de === desc
        );
        rowData.push(matchingEntry ? matchingEntry.amt : "");
      });
      tableData.push(rowData);
    });
    return tableData;
  };

  for (let pageNum = 0; pageNum < numPages; pageNum++) {
    const startIndex = pageNum * numRowsPerPage;
    const endIndex = Math.min(startIndex + numRowsPerPage, numEmployees);
    const pageEmployees = filterEmp.slice(startIndex, endIndex);

    chunks.forEach((chunk, index) => {
      const tableData = generateTableData(chunk, pageEmployees);
      if (tableData.length > 1) {
        if (index > 0 || pageNum > 0) {
          doc.addPage();
        }
        (doc as any).autoTable({
          head: [tableData[0]],
          body: tableData.slice(1),
          startY: 10,
          margin: { top: 10 },
          theme: "grid",
          styles: {
            fontSize: 6,
          },
          // Remove columnStyles option
          didDrawPage: (data: any) => {
            addFooter(doc, pageNum + 1, numPages);
          },
        });
      }
    });
  }

  const blob = doc.output("blob");
  const pdfBlobUrl = URL.createObjectURL(blob);

  const newTab = window.open(pdfBlobUrl);
  if (!newTab) {
    alert("Please allow pop-ups for this website");
  }
};
