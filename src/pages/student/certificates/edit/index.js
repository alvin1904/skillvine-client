"use client"

import EditCertificate from "@/componentsUser/certificate/EditCertificate";
import StudentLayout from "@/layouts/StudentLayout";
import React from "react";

export default function editCertificates() {
  return (
    <StudentLayout>
      <div className="add_certificate">
        <EditCertificate />
      </div>
    </StudentLayout>
  );
}
