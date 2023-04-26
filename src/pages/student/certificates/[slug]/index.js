"use client";

import CertificateDetails from "@/components/CertificateDetails/CertificateDetails";
import { users } from "@/constants/data";
import StudentLayout from "@/layouts/StudentLayout";
import React from "react";

export default function viewCertificates() {
  return (
    <StudentLayout>
      <div className="add_certificate">
        <CertificateDetails use={users.STUDENT}/>
      </div>
    </StudentLayout>
  );
}
