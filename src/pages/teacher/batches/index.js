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

export default function batchesPage() {
  const router = useRouter();
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [selectMode, setSelectMode] = useState(SelectMode.BATCH);
  const [array, setArray] = useState([]);
  const [batchesBackup, setBatchesBackup] = useState([]);

  useEffect(() => {
    const getBatches = async () => {
      const response = await fetchData(getBatchesAPI);
      if ([200, 304].includes(response.status) && response.data) {
        const temp = formatArrayToObj(response.data);
        setArray(temp);
        setBatchesBackup(temp);
      } else if (response.status === 401) console.log("Token not present");
      else throwError(response.status);
    };
    getBatches();
  }, []);

  const goBack = () => {
    if (selectMode === SelectMode.BATCH) router.push("/login");
    else if (selectMode === SelectMode.STUDENT) {
      setArray(batchesBackup);
      setSelectMode(SelectMode.BATCH);
    }
  };
  const signOut = async () => {
    const response = await fetchData(logoutAPI);
    router.push("/login");
  };
  const changePage = async (id) => {
    if (selectMode === SelectMode.BATCH) {
      const response = await fetchData(getStudentsAPI, id);
      if (response.status === 200 && response.data) setArray(response.data);
      else throwError(response.status);
      setSelectMode(SelectMode.STUDENT);
    } else if (selectMode === SelectMode.STUDENT)
      router.push("/teacher/evaluate/" + id);
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
      <div className={styles.selector}>
        <div className={styles.toolbar}>
          <div className={styles.btn} onClick={goBack}>
            <IoIosArrowDropleftCircle size={30} />
          </div>
          Select a {selectMode}:
          <div className={styles.btn} onClick={signOut}>
            <IoIosExit size={30} />
          </div>
        </div>
        {loading ? (
          <Loadings />
        ) : array ? (
          array.length === 0 ? (
            <NothingFound />
          ) : (
            <Folders array={array} changePage={changePage} />
          )
        ) : (
          <Loadings />
        )}
      </div>
    </div>
  );
}
