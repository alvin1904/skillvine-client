import React, { useRef } from "react";
import styles from "@/styles/auth.module.css";
import { status, useCustomError } from "../ErrorHandler/ErrorContext";
import RegisterFormComps from "./RegisterFormComps";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { updateUserAPI } from "@/apis";
import Loadings from "../Loading/Loadings";
import { useRouter } from "next/router";

export default function RegisterComponent() {
  const ktuIdRef = useRef(null);
  const admissionNoRef = useRef(null);
  const batchStart = useRef(null);
  const batchEnd = useRef(null);
  const college = "Rajiv Gandhi Institute of Technology, Kottayam";

  const { throwError } = useCustomError();
  const { loading, fetchData } = useAxiosCaller();
  const router = useRouter();

  const validateData = () => {
    if (![10, 11].includes(ktuIdRef.current.value.length)) {
      throwError("KTU ID must be 10 or 11 characters long", status.WARNING);
      return false;
    }
    if (admissionNoRef.current.value.length !== 9) {
      throwError("Admission Number must be 9 characters long", status.WARNING);
      return false;
    }
    if (batchStart.current.value.length !== 4) {
      throwError("Batch must be 4 digits long", status.WARNING);
      return false;
    }
    return true;
  };

  const finalizeData = () => {
    let temp = {};
    temp.ktuId = ktuIdRef.current.value;
    temp.college = college;
    temp.admissionNumber = admissionNoRef.current.value;
    temp.batch = `${batchStart.current.value}-${batchEnd.current.value}`;
    console.log(temp);
    return temp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateData()) return;
    let temp = finalizeData();
    const data = await fetchData(updateUserAPI, temp);
    console.log(data);
    if (data && data.status === 200) {
      throwError("Details Updated Successfully", status.SUCCESS);
      router.push("/student/dashboard");
    } else throwError();
  };
  return (
    <form
      className={`${styles.login_card} ${styles.register_card}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.login_card_header}>Fill IN THE DETAILS:</div>
      <RegisterFormComps
        ktuIdRef={ktuIdRef}
        admissionNoRef={admissionNoRef}
        batchStart={batchStart}
        batchEnd={batchEnd}
      />
      <div className={styles.login_detail_collect}>
        <button type="submit" className={styles.login_btn}>
          {loading ? <Loadings color="var(--clr-primary-300)"/> : " Submit Details"}
        </button>
      </div>
    </form>
  );
}
