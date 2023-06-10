import React from "react";
import styles from "@/styles/student/CertificateList.module.css";
import { certCompStatus, certificateStatus, levels } from "@/constants/data";
import { useRouter } from "next/router";
import { MdEditDocument, MdDelete, MdAssessment } from "react-icons/md";
import { takeFirstNCharacters } from "@/utils/getRandomNumber";
import { useCustomError } from "../ErrorHandler/ErrorContext";
import useCertificateFilter from "@/utils/useCertificatesProvider";

export default function EachCertificate({
  id,
  name,
  date,
  activity,
  level,
  isLeadership,
  statuse,
  statusOfCertificate,
  use,
}) {
  const router = useRouter();
  const { throwError } = useCustomError();
  const { handleDeleteCertificate, loading } = useCertificateFilter();
  const Icon = use === certCompStatus.MARK ? MdAssessment : MdEditDocument;
  const baseLink =
    use === certCompStatus.MARK
      ? "/teacher/mark/"
      : "/student/certificates/edit/";
  const baseLink2 =
    use === certCompStatus.MARK
      ? "/teacher/certificates/"
      : "/student/certificates/";

  // WHETHER TO SHOW EDIT AND DELETE ICONS
  let show = false;
  if (statusOfCertificate && statusOfCertificate === "pending") show = true;

  const goToDetails = () => router.push(baseLink2 + id);
  const handleEdit = () =>
    show || use === certCompStatus.MARK
      ? router.push(baseLink + id)
      : console.log("Err");

  const handleDelete = async () => {
    show ?? (await handleDeleteCertificate(id));
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
        {levels[isLeadership ? level + 4 : level - 1]}
      </h1>

      <div
        className={styles.certificate__icons}
        style={{ opacity: show ? 1 : 0 }}
      >
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
