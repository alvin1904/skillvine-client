"use client";

import EditCertificate from "@/componentsUser/certificate/EditCertificate";
import StudentLayout from "@/layouts/StudentLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function editCertificates() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <StudentLayout>
      <Head>
        <title>Edit Certificate</title>
      </Head>
      <div className="add_certificate">
        <EditCertificate id={slug} />
      </div>
    </StudentLayout>
  );
}
