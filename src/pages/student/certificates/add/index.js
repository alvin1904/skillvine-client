
import AddCertificate from "@/componentsUser/certificate/AddCertificate";
import StudentLayout from "@/layouts/StudentLayout";
import React from "react";

export default function addCertificates() {
  return (
    <StudentLayout>
      <div className="add_certificate">
       <AddCertificate />
      </div>
    </StudentLayout>
  );
}
