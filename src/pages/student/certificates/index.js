"use client";

import React from "react";
import StudentLayout from "@/layouts/StudentLayout";
import styles from "@/styles/student/CertificateList.module.css";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";
import Certificates from "@/components/viewCertificates/Certificates";
import SearchBar from "@/components/viewCertificates/SearchBar";
import Filters from "@/components/viewCertificates/Filters";
import Indicators from "@/components/viewCertificates/Indicators";
import EachCertificate from "@/components/viewCertificates/EachCertificate";
import { certCompStatus } from "@/constants/data";
// import useAxiosCaller from "@/utils/useAxiosCaller";
// import { getCertificatesAPI } from "@/apis";
// import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import useCertificateFilter from "@/utils/useCertificatesProvider";
import Head from "next/head";

export default function certificates() {
  const {
    certificateBackup,
    certificates,
    setCertificates,
    filterUpdate,
    setFilterUpdate,
    loading,
  } = useCertificateFilter();
  // entire login in the custom hook

  return (
    <StudentLayout>
      <Head>
        <title>All Certificates</title>
      </Head>
      <div className="add_certificate">
        <SearchBar />
        <Filters setFilterUpdate={setFilterUpdate} />
        <Indicators />
        <Certificates use={certCompStatus.VIEW}>
          {loading ? (
            <Loadings />
          ) : (
            certificates &&
            (certificates.length === 0 ? (
              <NothingFound />
            ) : (
              Object.entries(certificates).map(([year, certificates]) => (
                <div key={year}>
                  <h2 className={styles.year__key}>{year}</h2>
                  {certificates.map((certificate) => (
                    <EachCertificate
                      key={certificate._id}
                      id={certificate._id}
                      name={certificate.certificateName}
                      date={certificate.participationDate}
                      activity={certificate?.category?.activity || ""}
                      level={
                        certificate.isLeadership
                          ? certificate.leadershipLevel
                          : certificate.level
                      }
                      isLeadership={certificate.isLeadership}
                      statuse={certificate.status}
                      use={certCompStatus.VIEW}
                    />
                  ))}
                </div>
              ))
            ))
          )}
        </Certificates>
      </div>
    </StudentLayout>
  );
}
