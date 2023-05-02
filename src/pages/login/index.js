// "use client"

import React from "react";
import LoginComponent from "@/components/Auth/LoginComponent";
import styles from "@/styles/auth.module.css";
import Head from "next/head";

export default function login() {
  return (
    <div className={styles.login_bg}>
      <Head>
        <title>Login</title>
      </Head>
      <LoginComponent />
    </div>
  );
}
