"use client";

import AddCertificate from "@/componentsUser/certificate/AddCertificate";
import StudentLayout from "@/layouts/StudentLayout";
import Head from "next/head";
import React from "react";

export default function editCertificates() {
  return (
    <StudentLayout>
      <Head>
        <title>Edit Certificate</title>
      </Head>
      <div className="add_certificate">
        <AddCertificate data={{ a: "asd" }} />
      </div>
    </StudentLayout>
  );
}
