import { levels2, levels3 } from "@/constants/data";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateStudentPDF = (data) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  const batch = `STUDENT-WISE REPORT for ${data.student.name}`;
  let pageNo = 1;
  const spaceFactor = 80;
  let x = doc.internal.pageSize.width / 2;
  let y = doc.internal.pageSize.height - 10;
  const pageWidth = doc.internal.pageSize.getWidth();

  // HEADING
  const batchWidth = doc.getTextWidth(batch);
  const middle = (pageWidth - batchWidth) / 2;
  doc.text(batch, middle, 15);

  // DETAILS
  const name = `NAME: ${data.student.name?.toUpperCase()}`;
  const batchData = `BATCH: ${data.student.batch}`;
  const ktuId = `KTU ID: ${data.student.ktuId?.toUpperCase()}`;
  const admNo = `ADM NO: ${data.student.admissionNumber?.toUpperCase()}`;
  const target = `TARGET SCORE: ${data.student.targetScore}`;
  const current = `CURRENT SCORE: ${data.student.currentScore}`;
  doc.text(name, 14, 45);
  doc.text(batchData, 14, 55);
  doc.text(ktuId, 14, 70);
  doc.text(admNo, 14, 80);
  doc.text(current, 14, 95);
  doc.text(target, 14, 105);
  doc.addPage();

  const years = Object.keys(data).filter((key) => key !== "student");
  years.forEach((year, index) => {
    const yearData = data[year];

    // YEAR
    const totalScore = yearData["Total Score"];
    const approvedActivities = yearData.Approved;
    doc.text(`${year} - Total Score: ${totalScore}`, 14, 20);

    // TABLE
    const tableData = approvedActivities.map((activity) => [
      activity.certificateName,
      activity.participationDate,
      activity.categoryId.activityHead,
      activity.categoryId.activity,
      activity.isLeadership
        ? levels3[activity.leadershipLevel - 1]
        : levels2[activity.level - 1],
      activity.points,
    ]);

    doc.autoTable({
      head: [
        ["Certificate Name", "Date", "Category", "Activity", "Level", "Points"],
      ],
      body: tableData,
      startY: 35,
      theme: "grid",
      tableWidth: "wrap",
      margin: { horizontal: "auto" },
      columnStyles: {
        0: { cellWidth: 65, halign: "center" },
        1: { cellWidth: 30, halign: "center" },
        2: { cellWidth: 55, halign: "center" },
        3: { cellWidth: 75, halign: "center" },
        4: { cellWidth: 30, halign: "center" },
        5: { cellWidth: 15, halign: "center" },
      },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.setTextColor(150);
      },
    });

    if (index !== years.length - 1) {
      doc.text(`Page ${pageNo}`, x, y, { align: "center" });
      pageNo++;
      doc.addPage();
    }
  });

  doc.text(`Page ${pageNo}`, x, y, { align: "center" });
  doc.output("dataurlnewwindow");
};
