"use client";

import React, { useState } from "react";
import StudentLayout from "@/layouts/StudentLayout";
import Certificates from "@/componentsUser/view/Certificates";
import Filters from "@/componentsUser/view/Filters";
import Indicators from "@/componentsUser/view/Indicators";
import SearchBar from "@/componentsUser/view/SearchBar";
import EachCertificate from "@/componentsUser/view/EachCertificate";
import styles from "@/styles/student/CertificateList.module.css";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";

export default function certificates() {
  const [certificates, setCertificates] = useState({});
  const loading = false;
  return (
    <StudentLayout>
      <div className="add_certificate">
        <SearchBar />
        <Filters />
        <Indicators />
        <Certificates>
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
                        date={certificate.createdAt}
                        activity={certificate.category.activity}
                        level={
                          certificate.isLeadership
                            ? certificate.leadershipLevel
                            : certificate.level
                        }
                        isLeadership={certificate.isLeadership}
                        status={certificate.status}
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
