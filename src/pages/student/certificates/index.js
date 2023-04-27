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
  const [certificateBackup, setCertificateBackup] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [seedCheck, setSeedCheck] = useState(0);
  const [filterUpdate, setFilterUpdate] = useState("");

  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

  const getCertificatesList = useCallback(async () => {
    setSeedCheck(seedCheck + 1);
    const response = await fetchData(getCertificatesAPI);
    console.log(response);
    if (response.status === 200) {
      setCertificates(response.data?.points);
      setCertificateBackup(response.data?.points);
    } else throwError(response?.data?.status);
  }, [fetchData]);

  useEffect(() => {
    if (certificates && certificates.length === 0 && seedCheck < 3)
      getCertificatesList();
  }, [certificates, getCertificatesList]);

  const filterDataByLevel = (theFilter, data) => {
    if (typeof data === "undefined") data = Object.values(data.points).flat();
    const filteredData = {};
    for (const year in data)
      filteredData[year] = data[year].filter(
        (item) =>
          item.isLeadership === theFilter?.isLeadership &&
          (item.level === theFilter?.level ||
            item.leadershipLevel === theFilter?.level)
      );
    console.log(filteredData);
    return filteredData;
  };

  useEffect(() => {
    if (Object.keys(filterUpdate).length !== 0 && filterUpdate !== {})
      setCertificates(filterDataByLevel(filterUpdate, certificateBackup));
    else setCertificates(certificateBackup);
  }, [filterUpdate]);

  return (
    <StudentLayout>
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
