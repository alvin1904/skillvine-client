import React from "react";
import styles from "@/styles/student/CertificateList.module.css";

export default function Certificates({ children }) {
  return (
    <div className={styles.certificateList}>
      <div className={styles.certificateList__header}>
        <h1 className={styles.certificateList__title}>Name</h1>
        <h1 className={styles.certificateList__title}>Date</h1>
        <h1 className={styles.certificateList__title}>Activity</h1>
        <h1 className={styles.certificateList__title}>Level</h1>
        <h1 className={styles.certificateList__title}>Edit/Delete</h1>
      </div>
      <div className={styles.certificateList__body}>{children}</div>
    </div>
  );
}
