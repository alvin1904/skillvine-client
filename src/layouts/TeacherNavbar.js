import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { useRouter } from "next/router";
import React from "react";

function TeacherNavbar({ name = "Student", ktuId = "KTU ID", slug }) {
  const router = useRouter();
  const { throwError } = useCustomError();
  const handleBack = () => router.push("/teacher/batches");
  const handleReport = () => {
    if (slug) router.push(`/teacher/reports/s/${slug}`);
    else throwError("No id found. Please try again later.");
  };
  return (
    <div className="teacher_navbar">
      <p>
        {name} ({ktuId})
      </p>
      <div className="tNavbar_buttons">
        <button className="tNavbar_button" onClick={handleReport}>
          Generate report
        </button>
        <button className="tNavbar_button" onClick={handleBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default TeacherNavbar;
