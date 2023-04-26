import CertificateDetails from "@/components/CertificateDetails/CertificateDetails";
import { users } from "@/constants/data";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className="teacher_view">
      <div className="add_certificates">
        <CertificateDetails use={users.TEACHER} slug={slug} />
      </div>
    </div>
  );
}
