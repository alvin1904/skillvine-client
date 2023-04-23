// "use client"

import React from "react";
import LoginComponent from "@/components/Auth/LoginComponent";
import styles from "@/styles/auth.module.css";

export default function login() {
  return (
    <div className={styles.login_bg}>
      <LoginComponent />
    </div>
  );
}
