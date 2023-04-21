import React, { useState } from "react";
import styles from "@/styles/teacher/Selector.module.css";
import Folders from "@/componentsAdmin/BatchSelect/Folders";
import { SelectMode } from "@/constants/data";
import { IoIosArrowDropleftCircle, IoIosExit } from "react-icons/io";
import { useRouter } from "next/router";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";

export default function batchesPage() {
  const router = useRouter();
  const [selectMode, setSelectMode] = useState(SelectMode.BATCH);
  const [array, setArray] = useState([]);
  const [batchesBackup, setBatchesBackup] = useState([]);
  const goBack = () => {
    if (selectMode === SelectMode.BATCH) router.push("/login");
    else if (selectMode === SelectMode.STUDENT) {
      setArray(batchesBackup);
      setSelectMode(SelectMode.BATCH);
    }
  };
  const signOut = () => {
    router.push("/login");
  };
  const changePage = (id) => {
    if (selectMode === SelectMode.BATCH) {
      setArray([]);
      setSelectMode(SelectMode.STUDENT);
    } else if (selectMode === SelectMode.STUDENT)
      router.push("/teacher/evaluate/" + id);
  };
  return (
    <div className={styles.selectorPage}>
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
        {array ? (
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
