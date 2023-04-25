import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/student/Navbar.module.css";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getScoreAPI } from "@/apis";

export default function Sidebar() {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [seedCheck, setSeedCheck] = useState(0);

  const [targetScore, setTargetScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const getScores = useCallback(async () => {
    setSeedCheck(seedCheck + 1);
    const response = await fetchData(getScoreAPI);
    if (response.status === 200) {
      setTargetScore(response?.data?.targetScore);
      setCurrentScore(response?.data?.currentScore);
    } else throwError(response?.data?.status);
  }, [fetchData]);

  useEffect(() => {
    if (targetScore === 0 && seedCheck < 3) getScores();
  }, [currentScore, getScores]);
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
