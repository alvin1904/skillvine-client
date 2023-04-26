import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/CertificateDetails.module.css";
import { levels2, levels3, yearOfStudy } from "@/constants/data";
import { addSTokenToLink, addTTokenToLink } from "@/utils/LSOperations";
import Loadings from "../Loading/Loadings";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useCustomError } from "../ErrorHandler/ErrorContext";
import { getCertificateAPI } from "@/apis";
import { takeFirstNCharacters } from "@/utils/getRandomNumber";

export default function CertificateDetails({ use }) {
  const [certificate, setCertificate] = useState({});
  const router = useRouter();
  const { slug } = router.query;
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const fetchCertificateDetails = async () => {
    const response = await fetchData(getCertificateAPI, slug);
    console.log(response);
    if (response && response.status === 200) setCertificate(response?.data[0]);
    else throwError(response?.response?.status);
  };
  useEffect(() => {
    if (slug) fetchCertificateDetails();
  }, []);
  return (
    <div className={styles.details__body}>
      <div className={styles.details__header}>
        <h1>
          {certificate.certificateName || (
            <div className={styles.loader}>
              <span>Certificate</span>
              <Loadings />
            </div>
          )}
        </h1>
        <p>Description: {certificate.certificateDescription}</p>
      </div>
      <div className={styles.details__container}>
        <div className={styles.details__box}>
          <>
            <h1>Certificate Classification</h1>
            <p>Activity Category: {certificate?.category?.activityHead}</p>
            <p>Activity: {certificate?.category?.activity}</p>
            {certificate?.isLeadership ? (
              <p>Leadership: {levels3[certificate.leadershipLevel]}</p>
            ) : (
              <p>Level: Activity {levels2[certificate.level - 1]}</p>
            )}
          </>
          <>
            <h1>Date of Event/Activity</h1>
            <p>Date: {takeFirstNCharacters(certificate?.participationDate, 10)}</p>
            <p>Duration: {certificate?.duration} days</p>
            <p>Year of study: {yearOfStudy[certificate?.year - 1]}</p>
          </>
          <>
            <h1>Certificate Evaluation Status</h1>
            <p>Status: {certificate?.status?.toUpperCase()}</p>
            <p>Points(if marked): {certificate?.points}</p>
            <p>Last verified by(if marked): {certificate?.lastVerifiedBy}</p>
          </>
        </div>
        <div className={styles.details__box}>
          <object
            data={addSTokenToLink(certificate.certificateUrl)}
            type="application/pdf"
            width="100%"
            height="97%"
          ></object>
          <p>
            Here is the link to the{" "}
            <span
              onClick={() => {
                window.open(addSTokenToLink(certificate.certificateUrl));
              }}
            >
              Certificate PDF/Image!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
