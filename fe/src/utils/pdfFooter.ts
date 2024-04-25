import jsPDF from "jspdf";

export const addFooter = (
  doc: jsPDF,
  pageNumber: number,
  totalPages: number
) => {
  doc.setFontSize(10);
  doc.text(
    `Page ${pageNumber} of ${totalPages}`,
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 10,
    { align: "center" }
  );
  doc.text(
    new Date().toLocaleDateString(),
    10,
    doc.internal.pageSize.height - 10
  );
};
