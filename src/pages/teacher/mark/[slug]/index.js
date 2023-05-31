"use client";

import MarkCertificate from "@/componentsAdmin/MarkCertificate/MarkCertificate";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function mark() {
  const router = useRouter()
  const { slug } = router.query
  return (
    <>
      <Head>
        <title>Mark certificate</title>
      </Head>
      <MarkCertificate slug={slug}/>
    </>
  );
}
