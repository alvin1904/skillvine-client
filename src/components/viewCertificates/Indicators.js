import React from "react";
import styles from "@/styles/student/ViewCertificates.module.css";
import { certificateStatus } from "@/constants/data";

export default function Indicators() {
  console.log(Object.keys(certificateStatus));
  return (
    <>
      <div className={styles.indicators}>
        {Object.keys(certificateStatus).map((status, index) => (
          <div className={styles.indicator} key={index}>
            <div
              className={styles.color_indicator}
              style={{
                backgroundColor: `${certificateStatus[status].color}`,
                border: `1px solid ${certificateStatus[status].border}`,
              }}
            ></div>
            {status}
          </div>
        ))}
      </div>
      <br></br>
    </>
  );
}
