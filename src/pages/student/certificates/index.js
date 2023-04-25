"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import useAxiosCaller from "@/utils/useAxiosCaller";
import { getCertificatesAPI } from "@/apis";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function certificates() {
  const [certificates, setCertificates] = useState({});
  const [seedCheck, setSeedCheck] = useState(0);

  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

  const getCertificatesList = useCallback(async () => {
    setSeedCheck(seedCheck + 1);
    const response = await fetchData(getCertificatesAPI);
    console.log(response);
    if (response.status === 200) setCertificates(response.data);
    else throwError(response?.data?.status);
  }, [fetchData]);

  useEffect(() => {
    if (Object.keys(certificates).length === 0 && seedCheck < 3)
      getCertificatesList();
  }, [certificates, getCertificatesList]);

  return (
    <StudentLayout>
      <div className="add_certificate">
        <SearchBar />
        <Filters />
        <Indicators />
        <Certificates use={certCompStatus.VIEW}>
          {loading ? (
            <Loadings />
          ) : (
            certificates &&
            certificates.points &&
            (certificates.length === 0 ||
            Object.entries(certificates.points) < 0 ? (
              <NothingFound />
            ) : (
              Object.entries(certificates.points).map(
                ([year, certificates]) => (
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
                        status={certificate.status}
                        use={certCompStatus.VIEW}
                      />
                    ))}
                  </div>
                )
              )
            ))
          )}
        </Certificates>
      </div>
    </StudentLayout>
  );
}
