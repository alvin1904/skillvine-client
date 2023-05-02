import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/student/Navbar.module.css";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getScoreAPI } from "@/apis";

export default function Sidebar() {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [targetScore, setTargetScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const getScores = async () => {
    const response = await fetchData(getScoreAPI);
    if ([200, 304].includes(response?.status)) {
      setTargetScore(response?.data?.targetScore);
      setCurrentScore(response?.data?.currentScore);
    } else if (response?.response?.status === 401)
      throwError("Please login & try again!");
    else throwError(response?.response?.status);
  };

  useEffect(() => {
    getScores();
  }, []);

  const handleUpdate = async () => {
    if (targetScore !== currentScore || targetScore !== 0) return;
    await getScores();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_section} onClick={handleUpdate}>
        <p>No of activity points:</p>
        <span>{currentScore || 0}</span>
      </div>
      <div className={styles.sidebar_section} onClick={handleUpdate}>
        <p>Total no. of of activity points required:</p>
        <span>{targetScore || 0}</span>
      </div>
      <div className={styles.sidebar_section} onClick={handleUpdate}>
        <p>No of activity points needed: </p>
        <span>{targetScore - currentScore || 0}</span>
      </div>
    </aside>
  );
}
