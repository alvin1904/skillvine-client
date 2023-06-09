"use client";

import React, { useEffect, useState } from "react";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";
import Certificates from "@/components/viewCertificates/Certificates";
import EachCertificate from "@/components/viewCertificates/EachCertificate";
import Filters from "@/components/viewCertificates/Filters";
import Indicators from "@/components/viewCertificates/Indicators";
import SearchBar from "@/components/viewCertificates/SearchBar";
import styles from "@/styles/student/CertificateList.module.css";
import { certCompStatus } from "@/constants/data";
import { useRouter } from "next/router";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { getStudentsCertificatesAPI } from "@/apis/teacher";
import Head from "next/head";
import TeacherNavbar from "@/layouts/TeacherNavbar";
import searchCertificates from "@/utils/search";
import { addToLS } from "@/utils/LSOperations";

export default function index() {
  const router = useRouter();
  const { slug } = router.query;
  addToLS("student_session", slug)
  const { throwError } = useCustomError();
  const { loading, fetchData } = useAxiosCaller();
  const [certificates, setCertificates] = useState([]);
  const [certificateBackup, setCertificatesBackup] = useState([]);

  const getBatches = async () => {
    console.log(slug);
    const response = await fetchData(getStudentsCertificatesAPI, slug);
    if (response.status === 200) {
      let temp = response.data;
      setCertificates(temp);
      setCertificatesBackup(temp);
    } else throwError(response?.data?.status);
    console.log(response.data);
  };

  useEffect(() => {
    getBatches();
  }, []);

  const onSearch = (searchValue) => {
    console.log(certificateBackup);
    if (searchValue !== "") {
      let temp = searchCertificates(certificateBackup.points, searchValue);
      const filteredCertificates = {
        ...certificateBackup,
        points: temp,
      };
      // THE SEARCH MODULE
      setCertificates(filteredCertificates);
    } else setCertificates(certificateBackup);
  };

  return (
    <>
      <TeacherNavbar
        name={certificates?.name}
        ktuId={certificates?.ktuId}
        slug={slug}
      />
      <div className="teacher_view">
        <Head>
          <title>
            {certificates && certificates.name
              ? `${certificates.name}'s certificates`
              : `Certificates`}
          </title>
        </Head>
        <div className="add_certificate">
          <SearchBar onSearch={onSearch} />
          <Filters />
          <Indicators>
            <button className="refreshBtn" onClick={getBatches}>
              REFRESH
            </button>
          </Indicators>
          <Certificates use={certCompStatus.MARK}>
            {loading ? (
              <>
                <br></br>
                <Loadings />
              </>
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
                          activity={certificate?.category?.activity || ""}
                          level={
                            certificate.isLeadership
                              ? certificate.leadershipLevel
                              : certificate.level
                          }
                          isLeadership={certificate.isLeadership}
                          statuse={certificate.status}
                          use={certCompStatus.MARK}
                          statusOfCertificate={"pending"}
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
    </>
  );
}
