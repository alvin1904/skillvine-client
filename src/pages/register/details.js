"use client";

import React from "react";
import RegisterComponent from "@/components/Auth/RegisterComponent";
import styles from "@/styles/auth.module.css";
import Head from "next/head";

export default function details() {
  return (
    <div className={styles.login_bg}>
      <Head>
        <title>Complete registration! </title>
      </Head>
      <RegisterComponent />
    </div>
  );
}
