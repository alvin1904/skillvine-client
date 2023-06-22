"use client";

import TeacherTokenCheck from "@/apis/TeacherTokenCheck";
import CertificateDetails from "@/components/CertificateDetails/CertificateDetails";
import { users } from "@/constants/data";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className="teacher_view">
      <Head>
        <title>Certificate details</title>
      </Head>
      <TeacherTokenCheck />
      <div className="add_certificates">
        <CertificateDetails use={users.TEACHER} slug={slug} />
      </div>
    </div>
  );
}
