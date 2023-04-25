import React, { useRef } from "react";
import styles from "@/styles/student/AddCertificate.module.css";
import DropDown from "@/components/DropDown";

export default function RightEdit() {
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const pdfRef = useRef(null);
  const array0 = ["First Year", "Second Year", "Third Year", "Fourth Year"];
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
      <DropDown
        array={array0}
        defaultText="Select academic year"
        ulRef={ref0}
      />
      <DropDown array={array1} defaultText="Select event type" ulRef={ref1} />
      <DropDown array={array2} defaultText="Select event" ulRef={ref2} />
      <DropDown array={array3} defaultText="Select level" ulRef={ref3} />

      <div className={styles.fileUploader}>
        <label
          onClick={() => {
            pdfRef.current.click();
          }}
        >
          Upload certificate file
        </label>
        <input
          type="file"
          className={styles.fileUpload}
          accept=".jpg, .jpeg, .png, application/pdf"
          ref={pdfRef}
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Upload the certificate
      </button>
    </div>
  );
}
