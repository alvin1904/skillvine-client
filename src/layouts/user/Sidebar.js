import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/student/Navbar.module.css";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getScoreAPI } from "@/apis";

export default function Sidebar() {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [seedCheck, setSeedCheck] = useState(true);

  const [targetScore, setTargetScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    setSeedCheck(true);
  }, []);
  useEffect(() => {
    const getScores = async () => {
      setSeedCheck(false);
      const response = await fetchData(getScoreAPI);
      if ([200, 304].includes(response?.status)) {
        setTargetScore(response?.data?.targetScore);
        setCurrentScore(response?.data?.currentScore);
      } else if (response?.response?.status === 401) console.log("Token not present");
      else throwError(response?.response?.status);
    };

    seedCheck && getScores();
  }, [seedCheck]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_section}>
        <p>No of activity points:</p>
        <span>{currentScore || 0}</span>
      </div>
      <div className={styles.sidebar_section}>
        <p>Total no. of of activity points required:</p>
        <span>{targetScore || 0}</span>
      </div>
      <div className={styles.sidebar_section}>
        <p>No of activity points needed: </p>
        <span>{targetScore - currentScore || 0}</span>
      </div>
    </aside>
  );
}
