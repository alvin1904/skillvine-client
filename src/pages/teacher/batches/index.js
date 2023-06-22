"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/teacher/Selector.module.css";
import Folders from "@/componentsAdmin/BatchSelect/Folders";
import { SelectMode } from "@/constants/data";
import { IoIosArrowDropleftCircle, IoIosExit } from "react-icons/io";
import { useRouter } from "next/router";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { getBatchesAPI, getStudentsAPI, logoutAPI } from "@/apis/teacher";
import { formatArrayToObj } from "@/utils/arrayOperations";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import Head from "next/head";
import TeacherTokenCheck from "@/apis/TeacherTokenCheck";

export default function batchesPage() {
  const router = useRouter();
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [selectMode, setSelectMode] = useState(SelectMode.BATCH);
  const [array, setArray] = useState([]);
  const [batchesBackup, setBatchesBackup] = useState([]);
  const [batchId, setBatchId] = useState(null);

  const getBatches = async () => {
    const response = await fetchData(getBatchesAPI);
    if ([200, 304].includes(response.status) && response.data) {
      const temp = formatArrayToObj(response.data);
      setArray(temp);
      setBatchesBackup(temp);
    } else if (response.status === 401) console.log("Token not present");
    else throwError(response.status);
  };

  const goBack = () => {
    if (selectMode === SelectMode.BATCH) signOut();
    else if (selectMode === SelectMode.STUDENT) {
      setArray(batchesBackup);
      setSelectMode(SelectMode.BATCH);
    }
  };
  const signOut = async () => {
    localStorage.clear();
    const response = await fetchData(logoutAPI);
    router.push("/login");
  };
  const changePage = async (id) => {
    setBatchId(id);
    if (selectMode === SelectMode.BATCH) {
      const response = await fetchData(getStudentsAPI, id);
      if (response.status === 200 && response.data) setArray(response.data);
      else throwError(response.status);
      setSelectMode(SelectMode.STUDENT);
    } else if (selectMode === SelectMode.STUDENT)
      router.push("/teacher/evaluate/" + id);
  };
  const batchWiseReport = async () => {
    if (typeof batchId === "string")
      router.push(`/teacher/reports/b/${batchId}`);
  };
  return (
    <div className={styles.selectorPage}>
      <Head>
        <title>
          {selectMode === SelectMode.BATCH
            ? "Select a batch!"
            : "Select a student!"}
        </title>
      </Head>
      <TeacherTokenCheck />
      <div className={styles.selector}>
        <div className={styles.toolbar}>
          <div className={styles.btn} onClick={goBack}>
            <IoIosArrowDropleftCircle size={30} />
          </div>
          Select a {selectMode}:
          <div className={styles.btn} onClick={signOut}>
            <IoIosExit size={30} /> <span>SIGN OUT</span>
          </div>
        </div>
        {loading ? (
          <Loadings color="var(--clr-primary-200)" />
        ) : array ? (
          array.length === 0 ? (
            <>
              <NothingFound />
              <button className={styles.load_again_btn} onClick={getBatches}>
                Load all batches!
              </button>
            </>
          ) : (
            <Folders array={array} changePage={changePage} />
          )
        ) : (
          <Loadings color="var(--clr-primary-200)" />
        )}
      </div>
      {selectMode === SelectMode.STUDENT && (
        <div className={styles.report_btn} onClick={batchWiseReport}>
          <span>GENERATE BATCH-WISE REPORT</span>
        </div>
      )}
    </div>
  );
}
