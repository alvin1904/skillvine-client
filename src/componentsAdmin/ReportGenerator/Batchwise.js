import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (data) => {
  const doc = new jsPDF();
  const batch = `BATCH-WISE REPORT for ${data[0].student.batch}`;
  let pageNo = 1;
  const spaceFactor = 80;
  let x = doc.internal.pageSize.width / 2;
  let y = doc.internal.pageSize.height - 10;
  const pageWidth = doc.internal.pageSize.getWidth();

  data.forEach((item, index) => {
    let studentID = index % 3;
    // HEADING
    const batchWidth = doc.getTextWidth(batch);
    const middle = (pageWidth - batchWidth) / 2;
    doc.text(batch, middle, 15);
    // DETAILS
    const name = `NAME: ${item.student.name?.toUpperCase()}`;
    const ktuId = `KTU ID: ${item.student.ktuId?.toUpperCase()}`;
    doc.text(name, 14, 45 + spaceFactor * studentID);
    doc.text(ktuId, 14, 53 + spaceFactor * studentID);
    // TABLE
    const points = Object.entries(item.points);
    doc.autoTable({
      head: [["Year", "Points"]],
      body: points,
      startY: 58 + spaceFactor * studentID,
      theme: "grid",
      tableWidth: "wrap",
      margin: { horizontal: "auto" },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40, halign: "center" },
      },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.setTextColor(150);
      },
    });

    if (index !== data.length - 1 && studentID === 2) {
      doc.text(`Page ${pageNo}`, x, y, { align: "center" });
      pageNo++;
      doc.addPage();
    }
  });

  doc.text(`Page ${pageNo}`, x, y, { align: "center" });
  doc.output("dataurlnewwindow");
};
