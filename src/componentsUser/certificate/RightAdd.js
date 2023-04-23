import React, { useRef } from "react";
import DropDown from "./DropDown";
import styles from "@/styles/student/AddCertificate.module.css";

export default function RightAdd() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const array1 = [
    "National Initiatives Participation",
    "Sports & Games",
    "Cultural Festivals",
    "Workshops & Seminars",
    "Other Events",
  ];
  const array2 = [
    "NCC",
    "NSS",
    "Sports - Participation",
    "Sports - 1st Prize",
    "Sports - 2nd Prize",
  ];
  const array3 = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
  return (
    <div className={styles.RightAdd}>
      <DropDown array={array1} defaultText="Select event type" ulRef={ref1} />
      <DropDown array={array2} defaultText="Select event" ulRef={ref2} />
      <DropDown array={array3} defaultText="Select level" ulRef={ref3} />

      <div className={styles.fileUploader}>
        <label>Certificate File:</label>
        <input
          type="file"
          className={styles.fileUpload}
          accept=".jpg, .jpeg, .png, application/pdf"
        />
      </div>

      <div className={styles.submitBtn}>
        <input type="submit" value="Add Certificate" />
      </div>
    </div>
  );
}