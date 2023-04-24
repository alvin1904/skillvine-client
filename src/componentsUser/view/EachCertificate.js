import React from "react";
import styles from "@/styles/student/CertificateList.module.css";
import { certificateStatus, levels } from "@/constants/data";
import { useRouter } from "next/router";

export default function EachCertificate({
  id,
  name,
  date,
  activity,
  level,
  isLeadership,
  status,
}) {
  const router = useRouter();
  const goToDetails = () => {
    router.push(`/student/certificates/${id}`);
  };
  return (
    <div
      className={styles.certificate__content}
      onClick={goToDetails}
      style={{
        backgroundColor: certificateStatus[`${status.toUpperCase()}`]?.color,
      }}
    >
      <h1 className={styles.certificate__value}>{name}</h1>
      <h1 className={styles.certificate__value}>{date}</h1>
      <h1 className={styles.certificate__value}>{activity}</h1>
      <h1 className={styles.certificate__value}>
        {levels[isLeadership ? level + 5 : level]}
      </h1>
    </div>
  );
}
