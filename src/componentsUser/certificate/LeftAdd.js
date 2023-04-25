import React from "react";
import styles from "@/styles/student/AddCertificate.module.css";

export default function LeftAdd({ ref1, ref2, ref3, ref4 }) {
  return (
    <div className={styles.LeftAdd}>
      <div className={styles.eventName}>
        <label>Event Name</label>
        <input type="text" className={styles.event_name} ref={ref1} />
      </div>

      <div className={styles.dateStart}>
        <label>Date Issued</label>
        <input type="date" className={styles.date_issued} ref={ref2} />
      </div>

      <div className={styles.duration}>
        <label>Duration</label>
        <input
          type="number"
          className={styles.duration}
          min="1"
          placeholder="Number of days"
          ref={ref3}
        />
      </div>

      <div className={styles.dateEnd}>
        <label>End Date</label>
        <input type="date" className={styles.end_date} />
      </div>

      <div className={styles.eventDescription}>
        <label>Remarks</label>
        <textarea className={styles.event_desc} ref={ref4} />
      </div>
    </div>
  );
}
