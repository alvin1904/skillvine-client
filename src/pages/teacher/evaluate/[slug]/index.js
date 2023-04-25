"use client";

import React, { useState } from "react";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";
import Certificates from "@/components/viewCertificates/Certificates";
import EachCertificate from "@/components/viewCertificates/EachCertificate";
import Filters from "@/components/viewCertificates/Filters";
import Indicators from "@/components/viewCertificates/Indicators";
import SearchBar from "@/components/viewCertificates/SearchBar";
import styles from "@/styles/student/CertificateList.module.css";
import { certCompStatus } from "@/constants/data";

export default function index() {
  const [certificates, setCertificates] = useState();
  const loading = false;
  return (
    <div className="teacher_view">
      <div className="add_certificate">
        <SearchBar />
        <Filters />
        <Indicators />
        <Certificates use={certCompStatus.MARK}>
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
                        statuse={certificate.status}
                        use={certCompStatus.MARK}
                      />
                    ))}
                  </div>
                )
              )
            ))
          )}
        </Certificates>
      </div>
    </div>
  );
}
