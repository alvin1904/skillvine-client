import React from "react";
import styles from "@/styles/student/CertificateList.module.css";
import { levels } from "@/constants/data";

export default function EachCertificate({
  id,
  name,
  date,
  activity,
  level,
  isLeadership,
}) {
  console.log(id);
  return (
    <div className={styles.certificate__content}>
      <h1 className={styles.certificate__value}>{name}</h1>
      <h1 className={styles.certificate__value}>{date}</h1>
      <h1 className={styles.certificate__value}>{activity}</h1>
      <h1 className={styles.certificate__value}>
        {levels[isLeadership ? level + 5 : level]}
      </h1>
    </div>
  );
}
