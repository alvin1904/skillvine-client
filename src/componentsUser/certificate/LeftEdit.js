import React from "react";
import styles from "@/styles/student/AddCertificate.module.css";
import { takeFirstNCharacters } from "@/utils/getRandomNumber";

export default function LeftEdit({ ref1, ref2, ref3, ref4, cData }) {
  return (
    <div className={styles.LeftAdd}>
      <div className={styles.eventName}>
        <label>Event Name</label>
        <input
          type="text"
          className={styles.event_name}
          placeholder={cData.certificateName}
          ref={ref1}
        />
      </div>

      <div className={styles.dateStart}>
        <label>Date Issued</label>
        <input
          type="date"
          className={styles.date_issued}
          defaultValue={takeFirstNCharacters(cData.participationDate, 10)}
          ref={ref2}
        />
      </div>

      <div className={styles.duration}>
        <label>Duration</label>
        <input
          type="number"
          className={styles.duration}
          min="1"
          placeholder={cData.duration}
          ref={ref3}
        />
      </div>

      <div className={styles.eventDescription}>
        <label>Remarks</label>
        <textarea
          className={styles.event_desc}
          placeholder={cData.certificateDescription}
          ref={ref4}
        />
      </div>
    </div>
  );
}
