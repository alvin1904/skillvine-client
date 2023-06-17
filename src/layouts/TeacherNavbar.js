import { deleteStudentAPI } from "@/apis/teacher";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { shortenName } from "@/utils/getRandomNumber";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useRouter } from "next/router";
import React from "react";

function TeacherNavbar({ name = "Student", ktuId = "KTU ID", slug }) {
  const router = useRouter();
  const { throwError } = useCustomError();
  const { fetchData } = useAxiosCaller();
  const handleBack = () => router.push("/teacher/batches");
  const handleReport = () => {
    if (slug) router.push(`/teacher/reports/s/${slug}`);
    else throwError("No id found. Please try again later.");
  };
  const handleDelete = async () => {
    let p1 = "Are you sure you want to delete? (Yes/No)";
    let p2 = "Student deleted successfully!";
    let p3 = "Deletion cancelled!";
    const deleteStudent = async () => {
      const res = await fetchData(deleteStudentAPI, slug);
      if (res.status === 200) {
        throwError(p2, status.SUCCESS);
        router.push("/teacher/batches");
      } else throwError(res.response.status);
    };

    const userInput = window.prompt(p1);
    if (userInput && userInput.trim().toLowerCase() === "yes") {
      if (typeof slug === "string") await deleteStudent();
    } else throwError(p3, status.INFO);
  };
  return (
    <div className="teacher_navbar">
      <p>
        {shortenName(name, 9)} <span>({ktuId})</span>
      </p>
      <div className="tNavbar_buttons">
        <button className="tNavbar_button" onClick={handleDelete}>
          DELETE STUDENT
        </button>
        <button className="tNavbar_button" onClick={handleReport}>
          GENERATE REPORT
        </button>
        <button className="tNavbar_button" onClick={handleBack}>
          GO BACK
        </button>
      </div>
    </div>
  );
}

export default TeacherNavbar;
