"use client";

import React, { useState } from "react";
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

export default function certificates() {
  const [certificates, setCertificates] = useState({
    name: "sreerag m",
    admissionNumber: "20br13698",
    ktuId: "kte20cs017",
    points: {
      "First Year": [
        {
          _id: "6445f6fd86d6asda9e9ba5d6206",
          certificateName: "Advanced Mathematics",
          level: 1,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 0,
          isLeadership: false,
          createdAt: "2023-04-24T03:26:53.828Z",
          updatedAt: "2023-04-24T03:26:53.828Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
        {
          _id: "6445f6fd86d6a9e9ba5d6206",
          certificateName: "Advanced Mathematics",
          level: 1,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 0,
          isLeadership: false,
          createdAt: "2023-04-24T03:26:53.828Z",
          updatedAt: "2023-04-24T03:26:53.828Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
        {
          _id: "6445f64a0e1e5c6c314b9fc9",
          certificateName: "Advanced Mathematics",
          level: 0,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 1,
          isLeadership: true,
          createdAt: "2023-04-24T03:23:54.061Z",
          updatedAt: "2023-04-24T03:23:54.061Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
      ],
      "Second Year": [
        {
          _id: "6445f6fd86d6a9e9ba5d6206",
          certificateName: "Advanced Mathematics",
          level: 1,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 0,
          isLeadership: false,
          createdAt: "2023-04-24T03:26:53.828Z",
          updatedAt: "2023-04-24T03:26:53.828Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
        {
          _id: "6445f64a0e1e5c6c314b9fc9",
          certificateName: "Advanced Mathematics",
          level: 0,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 1,
          isLeadership: true,
          createdAt: "2023-04-24T03:23:54.061Z",
          updatedAt: "2023-04-24T03:23:54.061Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
      ],
      "Third Year": [
        {
          _id: "6445f64a0e1e5c6c314b9fc9",
          certificateName: "Advanced Mathematics",
          level: 0,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 1,
          isLeadership: true,
          createdAt: "2023-04-24T03:23:54.061Z",
          updatedAt: "2023-04-24T03:23:54.061Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
      ],
      "Fourth Year": [
        {
          _id: "6445f6fd86d6asda9e9ba5d6206",
          certificateName: "Advanced Mathematics",
          level: 1,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 0,
          isLeadership: false,
          createdAt: "2023-04-24T03:26:53.828Z",
          updatedAt: "2023-04-24T03:26:53.828Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
        {
          _id: "6445f6fd86d6a9e9ba5d6206",
          certificateName: "Advanced Mathematics",
          level: 1,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 0,
          isLeadership: false,
          createdAt: "2023-04-24T03:26:53.828Z",
          updatedAt: "2023-04-24T03:26:53.828Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
        {
          _id: "6445f64a0e1e5c6c314b9fc9",
          certificateName: "Advanced Mathematics",
          level: 0,
          duration: 2,
          year: 2,
          status: "pending",
          leadershipLevel: 1,
          isLeadership: true,
          createdAt: "2023-04-24T03:23:54.061Z",
          updatedAt: "2023-04-24T03:23:54.061Z",
          category: {
            _id: "6444bf98348e9446c4a3d615",
            activityHead: "National Initiatives Participation",
            activity: "NCC",
          },
        },
      ],
    },
  });
  const loading = false;
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
                        date={certificate.createdAt}
                        activity={certificate.category.activity}
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
