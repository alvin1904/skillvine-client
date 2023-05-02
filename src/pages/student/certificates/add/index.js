"use client";

import AddCertificate from "@/componentsUser/certificate/AddCertificate";
import StudentLayout from "@/layouts/StudentLayout";
import Head from "next/head";
import React from "react";

export default function addCertificates() {
  return (
    <StudentLayout>
      <Head>
        <title>Add a certificate</title>
      </Head>
      <div className="add_certificate">
        <AddCertificate />
      </div>
    </StudentLayout>
  );
}
