import React from "react";
import LeftAdd from "./LeftAdd";
import RightAdd from "./RightAdd";
import LeftEdit from "./LeftEdit";
import RightEdit from "./RigthEdit";
import styles from "@/styles/student/AddCertificate.module.css";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function AddCertificate({ data = {} }) {
  const { throwError } = useCustomError();
  const handleSubmit = async (e) => {
    e.preventDefault();
    throwError("Certificate added successfully", status.SUCCESS);
  };
  if (Object.keys(data) == 0)
    return (
      <form className={styles.submit_certificate} onSubmit={handleSubmit}>
        <LeftAdd />
        <RightAdd />
      </form>
    );
  else
    return (
      <form className={styles.submit_certificate} onSubmit={handleSubmit}>
        <LeftEdit data={data}/>
        <RightEdit data={data}/>
      </form>
    );
}
