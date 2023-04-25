import React from "react";
import styles from "@/styles/student/CertificateList.module.css";
import { certCompStatus, certificateStatus, levels } from "@/constants/data";
import { useRouter } from "next/router";
import { MdEditDocument, MdDelete, MdAssessment } from "react-icons/md";

export default function EachCertificate({
  id,
  name,
  date,
  activity,
  level,
  isLeadership,
  status,
  use,
}) {
  const router = useRouter();
  const Icon = use === certCompStatus.MARK ? MdAssessment : MdEditDocument;
  const baseLink =
    use === certCompStatus.MARK
      ? "/teacher/mark/"
      : "/student/certificates/edit/";
  const goToDetails = () => router.push(`/student/certificates/${id}`);
  const handleEdit = () => router.push(baseLink + id);
  const handleDelete = () => router.push("/student/certificates/delete/" + id);
  return (
    <div
      className={styles.certificate__content}
      style={{
        backgroundColor: certificateStatus[`${status.toUpperCase()}`]?.color,
      }}
    >
      <h1 className={styles.certificate__value} onClick={goToDetails}>
        {name}
      </h1>
      <h1 className={styles.certificate__value} onClick={goToDetails}>
        {date}
      </h1>
      <h1 className={styles.certificate__value} onClick={goToDetails}>
        {activity}
      </h1>
      <h1 className={styles.certificate__value} onClick={goToDetails}>
        {levels[isLeadership ? level + 5 : level]}
      </h1>
      <div className={styles.certificate__icons}>
        <Icon
          size={25}
          className={styles.certificate__icon}
          onClick={handleEdit}
        />
        <MdDelete
          size={25}
          className={styles.certificate__icon}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}