"use client";

import CertificateDetails from "@/components/CertificateDetails/CertificateDetails";
import { users } from "@/constants/data";
import StudentLayout from "@/layouts/StudentLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function viewCertificates() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <StudentLayout>
      <Head>
        <title>Certificate</title>
      </Head>
      <div className="add_certificate">
        <CertificateDetails use={users.STUDENT} slug={slug} />
      </div>
    </StudentLayout>
  );
}
