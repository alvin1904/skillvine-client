import styles from "@/styles/teacher/MarkCertificate.module.css";
import Categories from "./Categories";
import useCertificateDealer from "./EditCertificateLogic";
import { GrUpdate } from "react-icons/gr";
import { useRef, useState } from "react";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { markCertificateAPI } from "@/apis/teacher";
import useAxiosCaller from "@/utils/useAxiosCaller";

const Buttons = ({ handleSubmit, handleReject, remarkRef }) => (
  <>
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
        Reject Certificate
      </button>
      <button className={styles.btn2} onClick={handleSubmit}>
        Accept Certificate
      </button>
    </div>
  </>
);

export default function CertificateMarkForm({ data, certId }) {
  const {
    getDataForSubmission,
    handlePointsUpdate,
    findPoints,
    categoryData,
    ref1,
    ref2,
    ref3,
    ref4,
  } = useCertificateDealer();
  const { throwError } = useCustomError();
  const { fetchData } = useAxiosCaller();
  const [load, setLoad] = useState(false);
  const inputRef = useRef(null);
  const handleUpdate = () => {
    if (!data || !data.category) return throwError(400);
    setLoad(true);
    let temp = 0;
    if (inputRef.current.value == "")
      temp = findPoints(
        data.category.activity,
        data.leadershipLevel,
        data.level
      );
    // FIRST TIME POINTS LOAD
    else temp = handlePointsUpdate(); // EACH TIME POINTS UPDATING
    setTimeout(() => {
      if (typeof temp !== "undefined") {
        inputRef.current.value = temp;
        throwError("Points updated!", status.SUCCESS);
      } else console.error("Error in updating points");
      setLoad(false);
    }, 1340);
  };

  const remarkRef = useRef(null);

  const handleSubmit = async () => {
    if (!inputRef.current.value)
      return throwError("Please click on UPDATE button!", status.WARNING);
    const temp = getDataForSubmission(
      parseInt(inputRef.current.value),
      remarkRef.current.value || "",
      data.category._id,
      data.leadershipLevel,
      data.level,
      data.isLeadership,
      data.year
    );
    if (Object.values(temp).includes(undefined))
      return throwError("Invalid data!");
    const response = await fetchData(markCertificateAPI, temp, certId);
    console.log(response);
    if (response.status === 200)
      throwError("Certificate marked!", status.SUCCESS);
    else throwError("Error while marking certificate!");
  };
  const handleReject = () => {};
  return (
    <div className={`${styles.markInfo} ${styles.white}`}>
      <h1>Category details</h1>
      <Categories
        categoryData={categoryData}
        ref1={ref1}
        ref2={ref2}
        ref3={ref3}
        ref4={ref4}
        data={data}
      />
      <button className={styles.btn} onClick={handleUpdate}>
        <span className={load ? styles.loading : ""}>
          <GrUpdate fill="red" size={18} />
        </span>
        UPDATE
      </button>
      <br></br>
      <h1>Certificate Marking</h1>
      <p>The points based on the categories are:</p>
      <input className={styles.inputBox} type="text" ref={inputRef} />
      <Buttons
        handleSubmit={handleSubmit}
        handleReject={handleReject}
        remarkRef={remarkRef}
      />
    </div>
  );
}
