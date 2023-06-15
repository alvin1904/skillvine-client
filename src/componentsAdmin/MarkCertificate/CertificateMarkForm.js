import styles from "@/styles/teacher/MarkCertificate.module.css";
import Categories from "./Categories";
import { GrUpdate } from "react-icons/gr";
import { useRef, useState } from "react";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { markCertificateAPI, rejectCertificateAPI } from "@/apis/teacher";
import useAxiosCaller from "@/utils/useAxiosCaller";
import Loadings from "@/components/Loading/Loadings";
import { levels2, levels3, yearOfStudy } from "@/constants/data";

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
  // ON POINTS UPDATE
  const handleUpdate = () => {
    setLoad(true);
    let temp = 50;
    setTimeout(() => {
      if (typeof temp !== "undefined") {
        inputRef.current.value = temp;
        throwError("Points updated!", status.SUCCESS);
      } else console.error("Error in updating points");
      setLoad(false);
    }, 1340);
  };
  // ON ACCEPT CERTIFICATE
  const handleSubmit = async () => {
    if (!remarkRef.current.value || remarkRef.current.value === "")
      return throwError("Enter a remark while accepting the certificate.");
    if (!inputRef.current.value) {
      setLoadingA(false);
      return throwError("Please click on UPDATE button!", status.WARNING);
    }
    setLoadingA(true);

    // FIND DATA
    // const response = await fetchData(markCertificateAPI, temp, certId);
    // if (response.status === 200)
    //   throwError("Certificate marked!", status.SUCCESS);
    // else
    //   throwError(
    //     response?.response?.data?.error || "Error while marking certificate!"
    //   );
    // setLoadingA(false);
  };
  // ON REJECT CERTIFICATE
  const handleReject = async () => {
    if (!remarkRef.current.value || remarkRef.current.value === "")
      return throwError("Enter a remark while rejecting the certificate.");
    setLoadingR(true);
    const response = await fetchData(
      rejectCertificateAPI,
      { remarks: remarkRef.current.value || "" },
      certId
    );
    console.log(response);
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
      <Categories />
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
