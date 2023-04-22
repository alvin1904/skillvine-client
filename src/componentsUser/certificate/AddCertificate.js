import React from "react";
import LeftAdd from "./LeftAdd";
import RightAdd from "./RightAdd";
import styles from "@/styles/student/AddCertificate.module.css";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function AddCertificate() {
  const { throwError } = useCustomError();
  const handleSubmit = async (e) => {
    e.preventDefault();
    throwError("Certificate added successfully", status.SUCCESS);
  };
  return (
    <form className={styles.submit_certificate} onSubmit={handleSubmit}>
      <LeftAdd />
      <RightAdd />
    </form>
  );
}
