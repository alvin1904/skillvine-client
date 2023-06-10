import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/student/Navbar.module.css";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getScoreAPI } from "@/apis";
import Loadings from "@/components/Loading/Loadings";
import NumberComponent from "./NumberComponent";
import { GrClose } from "react-icons/gr";

export default function Sidebar() {
  const { throwError } = useCustomError();
  const { fetchData } = useAxiosCaller();

  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);

  const [totalPointsRequired, setTotalPointsRequired] = useState(0);
  const [activityPoints, setActivityPoints] = useState(0);
  const [activityPointsNeeded, setActivityPointsNeeded] = useState(0);

  const getScores = async () => {
    setLoading(true);
    const response = await fetchData(getScoreAPI);
    if ([200, 304].includes(response?.status)) {
      setTotalPointsRequired(response?.data?.targetScore);
      setActivityPoints(response?.data?.currentScore);
      setActivityPointsNeeded(
        response?.data?.targetScore - response?.data?.currentScore
      );
    } else if (response?.response?.status === 401)
      console.log("Please login & try again!");
    else throwError(response?.response?.status);
    setLoading(false);
  };

  useEffect(() => {
    if (view) getScores();
  }, [view]);
  if (!view)
    return (
      <aside
        className={styles.sidebar}
        onClick={() => {
          setView(true);
        }}
      >
        <div></div>
        <div className={styles.permission}>
          Click here to view your activity points!
        </div>
        <div></div>
      </aside>
    );
  if (loading)
    return (
      <aside className={styles.sidebar}>
        <br></br>
        <Loadings color="var(--clr-primary-300)"/>
      </aside>
    );
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_section}>
        <p>No of activity points you have now:</p>
        <NumberComponent number={activityPoints} />
      </div>
      <div className={styles.sidebar_section}>
        <p>No of activity points needed: </p>
        <NumberComponent number={activityPointsNeeded} />
      </div>
      <div className={styles.sidebar_section}>
        <p>Total no. of of activity points required:</p>
        <NumberComponent number={totalPointsRequired} />
      </div>
      <div
        className={styles.close}
        onClick={() => {
          setLoading(true)
          setView(false);
        }}
      >
        <GrClose size={20} />
      </div>
    </aside>
  );
}
