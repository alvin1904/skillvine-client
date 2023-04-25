import React from "react";
import styles from "@/styles/student/CertificateList.module.css";
import { certCompStatus, certificateStatus, levels } from "@/constants/data";
import { useRouter } from "next/router";
import { MdEditDocument, MdDelete, MdAssessment } from "react-icons/md";
import { takeFirstNCharacters } from "@/utils/getRandomNumber";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { deleteCertificatesAPI } from "@/apis";
import { status, useCustomError } from "../ErrorHandler/ErrorContext";

export default function EachCertificate({
  id,
  name,
  date,
  activity,
  level,
  isLeadership,
  statuse,
  use,
}) {
  const router = useRouter();
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const Icon = use === certCompStatus.MARK ? MdAssessment : MdEditDocument;
  const baseLink =
    use === certCompStatus.MARK
      ? "/teacher/mark/"
      : "/student/certificates/edit/";
  const baseLink2 =
    use === certCompStatus.MARK
      ? "/teacher/certificates/"
      : "/student/certificates/";
  const goToDetails = () => router.push(baseLink2 + id);
  const handleEdit = () => router.push(baseLink + id);
  const handleDelete = async () => {
    const response = await fetchData(deleteCertificatesAPI, id);
    if (response && response.status === 200)
      throwError("Certificate deleted successfully!", status.SUCCESS);
    else throwError(response?.response?.status);
  };
  return (
    <div
      className={styles.certificate__content}
      style={{
        backgroundColor: certificateStatus[`${statuse.toUpperCase()}`]?.color,
      }}
    >
      <h1 className={styles.certificate__value} onClick={goToDetails}>
        {name}
      </h1>
      <h1 className={styles.certificate__value} onClick={goToDetails}>
        {takeFirstNCharacters(date, 10)}
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
        {use === certCompStatus.VIEW && (
          <MdDelete
            size={25}
            className={styles.certificate__icon}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
