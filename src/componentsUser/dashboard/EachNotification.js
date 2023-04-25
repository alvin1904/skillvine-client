import React from "react";
import styles from "@/styles/student/Dashboard.module.css";

export default function EachNotification({ children }) {
  return <div className={styles.notification}>{children}</div>;
}
