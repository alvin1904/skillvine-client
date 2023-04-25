"use client";

import AddCertificate from "@/componentsUser/certificate/AddCertificate";
import StudentLayout from "@/layouts/StudentLayout";
import React from "react";

export default function editCertificates() {
  return (
    <StudentLayout>
      <div className="add_certificate">
        <AddCertificate data={{ a: "asd" }} />
      </div>
    </StudentLayout>
  );
}
