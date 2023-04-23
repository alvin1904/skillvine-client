"use client";

import React from "react";
import RegisterComponent from "@/components/Auth/RegisterComponent";
import styles from "@/styles/auth.module.css";

export default function details() {
  return (
    <div className={styles.login_bg}>
      <RegisterComponent />
    </div>
  );
}
