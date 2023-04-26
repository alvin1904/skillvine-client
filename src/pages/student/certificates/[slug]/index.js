"use client";

import CertificateDetails from "@/components/CertificateDetails/CertificateDetails";
import { users } from "@/constants/data";
import StudentLayout from "@/layouts/StudentLayout";
import { useRouter } from "next/router";
import React from "react";

export default function viewCertificates() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <StudentLayout>
      <div className="add_certificate">
        <CertificateDetails use={users.STUDENT} slug={slug} />
      </div>
    </StudentLayout>
  );
}
