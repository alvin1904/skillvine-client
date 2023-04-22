import EditCertificateForm from "@/componentsUser/EditCertificateForm";
import StudentLayout from "@/layouts/StudentLayout";
import React from "react";

export default function editCertificates() {
  return (
    <StudentLayout>
      <div className="certificate_change_container">
        <EditCertificateForm />
      </div>
    </StudentLayout>
  );
}
