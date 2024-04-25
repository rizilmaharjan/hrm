import jsPDF from "jspdf";
import "jspdf-autotable";
import { addFooter } from "./pdfFooter";

export const generatePDF = (data: any) => {
  const empData = data;

  // Extract unique employee codes, names, and descriptions
  const empCodes = [...new Set(empData.map((item: any) => item.employee_cd))];
  const empNames = [...new Set(empData.map((item: any) => item.empname))];
  const des = [...new Set(empData.map((item: any) => item.de))];

  // Filter descriptions to include only indices 0 to 10
  const filteredDes = des.slice(0, 10); // Descriptions from index 0 to 10
  // const remainingDes = des.slice(11, 20); // Descriptions from index

  const doc = new jsPDF({
    orientation: "landscape",
  });
  const tableTop = 20;

  // Calculate column widths
  const numDescriptions = filteredDes.length;
  const columnWidths = [12, 50, ...Array(numDescriptions).fill(20)];

  // Construct the matrix data array
  const matrixData = [];

  // Add header row
  const headerRow = ["SN", "Employee", ...filteredDes]; // Include headers for SN, Employee, and descriptions
  matrixData.push(headerRow);

  // Add data rows
  empCodes.forEach((empCode: any, index: number) => {
    const dataRow = [index + 1, `${empCode} - ${empNames[index]}`]; // SN and combined empCode and empName
    filteredDes.forEach((desc: any) => {
      const matchingEntry = empData.find(
        (item: any) =>
          item.employee_cd === empCode &&
          item.empname === empNames[index] &&
          item.de === desc
      );
      if (matchingEntry) {
        dataRow.push(matchingEntry.amt);
      } else {
        dataRow.push(""); // If no entry found, add an empty cell
      }
    });
    matrixData.push(dataRow);
  });

  // Function to split data into chunks that fit on a single page
  const splitDataIntoPages = (data, numRowsPerPage) => {
    const pages = [];
    for (let i = 0; i < data.length; i += numRowsPerPage) {
      const pageData = data.slice(i, i + numRowsPerPage);
      pages.push(pageData);
    }
    return pages;
  };

  // Check if table fits on a single page
  const numRowsPerPage = Math.floor(doc.internal.pageSize.getHeight() - 20); // Assuming row height is 10
  const numPagesNeeded = Math.ceil(matrixData.length / numRowsPerPage);

  let startY = tableTop;

  // Add title on each page
  doc.text("Matrix Report", 10, 10);

  const pages = splitDataIntoPages(matrixData, numRowsPerPage);

  pages.forEach((pageData, pageIndex) => {
    const dataForPage = pageIndex === 0 ? pageData : pageData.slice(1); // Remove header row for all pages except the first one

    doc.autoTable({
      // head: pageIndex === 0 ? [] : [headerRow], // Add header row only for the first page
      body: dataForPage,
      startY: startY,
      margin: { top: 20 },
      theme: "striped",
      styles: {
        fontSize: 8,
      },
      headStyles: {
        halign: "center",
        valign: "middle",
        fillColor: [220, 220, 220],
      },
      columnStyles: columnWidths.map((width) => ({ cellWidth: width })),
      horizontalPageBreakBehaviour: "auto",
      didDrawPage: (data: any) => {
        addFooter(doc, data.pageNumber, numPagesNeeded);
      },
    });

    // Update startY for the next page
    startY = doc.autoTable.previous.finalY + 10;
  });

  // Generate Blob for the PDF content
  const blob = doc.output("blob");
  const pdfBlobUrl = URL.createObjectURL(blob);

  // Open the PDF in a new tab
  const newTab = window.open(pdfBlobUrl);
  if (!newTab) {
    alert("Please allow pop-ups for this website");
  }
};
