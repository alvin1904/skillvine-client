import styles from "@/styles/teacher/MarkCertificate.module.css";
import { GrUpdate } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { markCertificateAPI, rejectCertificateAPI } from "@/apis/teacher";
import useAxiosCaller from "@/utils/useAxiosCaller";
import Loadings from "@/components/Loading/Loadings";
import { levels2, levels3, yearOfStudy } from "@/constants/data";
import {
  getActivityAPI,
  getActivityHeadAPI,
  getIsLeadershipAPI,
  getPointsAPI,
} from "@/apis/common";
import CustomDropDown from "@/components/CategoryDropDowns/CustomDropDown";

export default function CertificateMarkForm({ data, certId }) {
  const PresentDetails = () => (
    <>
      <div
        style={{
          fontWeight: "600",
          textDecoration: "underline",
        }}
      >
        Currently Selected:{" "}
      </div>
      <div>YEAR: {yearOfStudy[data.year - 1]}</div>
      <div>CATEGORY: {data.category.activityHead}</div>
      <div>
        ACTIVITY: {data.category.activity} @ LEVEL:{" "}
        {data.isLeadership
          ? levels3[data.leadershipLevel - 1]
          : levels2[data.level - 1]}
      </div>
    </>
  );
  // IMPORTS
  const { throwError } = useCustomError();
  const { fetchData } = useAxiosCaller();
  // LOADING STATES
  const [load, setLoad] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingR, setLoadingR] = useState(false);
  // REFS
  const inputRef = useRef(null);
  const remarkRef = useRef(null);

  // CATEGORY LOGIC
  let finalTempData = {
    activity: data?.category?.activity,
    level: data?.level,
    leadershipLevel: data?.leadershipLevel,
    isLeadership: data?.isLeadership,
    year: data?.year,
    categoryId: data?.category?._id,
  };
  const [finalData, setFinalData] = useState(finalTempData);
  const [activityHead, setActivityHead] = useState(null);
  const [activity, setActivity] = useState(null);
  const [level, setLevel] = useState(null);
  // ON POINTS UPDATE
  const onUpdate = async () => {
    await getPoints(finalData);
  };
  const getPoints = async (data) => {
    console.log(data);
    inputRef.current.value = "";
    setLoad(true);
    const { activity, level, leadershipLevel, isLeadership, year } = data;
    if (
      activity === undefined ||
      level === undefined ||
      leadershipLevel === undefined ||
      isLeadership === undefined ||
      year === undefined
    ) {
      throwError("Select all the fields!", status.WARNING);
      setLoad(false);
      return;
    }
    try {
      const res = await getPointsAPI(
        activity,
        level,
        leadershipLevel,
        isLeadership,
        year
      );
      if (res.status === 200) {
        setTimeout(() => {
          inputRef.current.value = res.data?.point;
          throwError("Points updated!", status.SUCCESS);
          setLoad(false);
        }, 1000);
      } else throwError("Error in updating points");
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  // LOADING ACTIVITY HEADS
  useEffect(() => {
    const getActivityHeads = async () => {
      const res = await fetchData(getActivityHeadAPI);
      if (res.status === 200) setActivityHead(res.data);
      else throwError();
    };
    if (!activityHead) getActivityHeads();
  }, [activityHead]);
  // WHEN activityHead CHANGES
  const onActivityHeadChange = async (changedData) => {
    if (!changedData || typeof changedData !== "string")
      return throwError("Select a category!", status.WARNING);
    setLevel(null);
    setActivity(null);
    const res = await fetchData(getActivityAPI, changedData);
    if (res.status === 200) setActivity(res.data);
    else throwError();
  };
  // WHEN activity CHANGES
  const onActivityChange = async (changedData) => {
    if (!changedData || typeof changedData !== "string")
      return throwError("Select an activity!", status.WARNING);
    setLevel(null);
    const res = await fetchData(getIsLeadershipAPI, changedData);
    if (res.status === 200) {
      setLevel(res.data?.isLeadership ? levels3 : levels2);
      setFinalData({
        year: finalData?.year,
        activity: changedData,
        categoryId: res.data?.categoryId,
        isLeadership: res.data?.isLeadership,
      });
    } else throwError();
  };
  // WHEN level CHANGES
  const onLevelChange = async (changedData) => {
    if (!changedData || typeof changedData !== "string")
      return throwError("Select a level!", status.WARNING);
    const isL = finalData?.isLeadership;
    let temp = {
      year: finalData?.year,
      activity: finalData?.activity,
      categoryId: finalData?.categoryId,
      isLeadership: isL,
      leadershipLevel: isL ? levels3.indexOf(changedData) + 1 : 0,
      level: !isL ? levels2.indexOf(changedData) + 1 : 0,
    };
    setFinalData(temp);
    await getPoints(temp);
  };
  // WHEN year CHANGES
  const onYearChange = async (changedData) => {
    if (!changedData || typeof changedData !== "string")
      return throwError("Select a year!", status.WARNING);
    setFinalData({ ...finalData, year: yearOfStudy.indexOf(changedData) + 1 });
  };

  // ON ACCEPT CERTIFICATE
  const handleSubmit = async () => {
    if (!remarkRef.current.value || remarkRef.current.value === "")
      return throwError(
        "Enter a remark while accepting the certificate.",
        status.WARNING
      );
    if (!inputRef.current.value) {
      setLoadingA(false);
      return throwError("Please click on UPDATE button!", status.WARNING);
    }
    setLoadingA(true);
    const temp = {
      categoryId: finalData?.categoryId,
      level: finalData?.level,
      leadershipLevel: finalData?.leadershipLevel,
      isLeadership: finalData?.isLeadership,
      points: inputRef.current.value,
      status: "approved",
      year: finalData?.year,
      remarks: remarkRef.current.value || "",
    };
    const response = await fetchData(markCertificateAPI, temp, certId);
    if (response.status === 200)
      throwError("Certificate marked!", status.SUCCESS);
    else
      throwError(
        response?.response?.data?.error || "Error while marking certificate!"
      );
    setLoadingA(false);
  };
  // ON REJECT CERTIFICATE
  const handleReject = async () => {
    if (!remarkRef.current.value || remarkRef.current.value === "")
      return throwError(
        "Enter a remark while rejecting the certificate.",
        status.WARNING
      );
    setLoadingR(true);
    const response = await fetchData(
      rejectCertificateAPI,
      { remarks: remarkRef.current.value || "" },
      certId
    );
    if (response.status === 200)
      throwError("Certificate rejected successfully!", status.SUCCESS);
    else
      throwError(
        response?.response?.data?.error || "Error while rejecting certificate!"
      );
    setLoadingR(false);
  };
  return (
    <div className={`${styles.markInfo} ${styles.white}`}>
      <h1>Category details</h1>
      <PresentDetails />

      <span className="category_dropdowns">
        <CustomDropDown
          onChange={onYearChange}
          array={yearOfStudy}
          defaultText={"Change year"}
        />
        {activityHead && activityHead.length > 0 && (
          <CustomDropDown
            onChange={onActivityHeadChange}
            array={activityHead}
            defaultText={"Change category"}
          />
        )}
      </span>
      <span className="category_dropdowns">
        {activity && activity.length > 0 && (
          <CustomDropDown
            onChange={onActivityChange}
            array={activity}
            defaultText={"Change activity"}
          />
        )}
        {level && level.length > 0 && (
          <CustomDropDown
            onChange={onLevelChange}
            array={level}
            defaultText={"Change level"}
          />
        )}
      </span>

      <button className={styles.btn} onClick={onUpdate}>
        <span className={load ? styles.loading : ""}>
          <GrUpdate fill="red" size={18} />
        </span>
        CALCULATE
      </button>
      <br></br>
      <h1>Certificate Marking</h1>
      <p>The points based on the categories are:</p>
      <input className={styles.inputBox} type="text" ref={inputRef} />
      <div className={styles.btnHolder}>
        <input
          type="text"
          placeholder="Enter remark"
          className={styles.remark}
          ref={remarkRef}
        />
      </div>
      <div className={styles.btnHolder}>
        <button className={styles.btn2} onClick={handleReject}>
          {loadingR ? (
            <span>
              <Loadings color="var(--clr-primary-200)" />
            </span>
          ) : (
            "Reject Certificate"
          )}
        </button>
        <button className={styles.btn2} onClick={handleSubmit}>
          {loadingA ? (
            <span>
              <Loadings color="var(--clr-primary-200)" />
            </span>
          ) : (
            "Accept Certificate"
          )}
        </button>
      </div>
    </div>
  );
}
