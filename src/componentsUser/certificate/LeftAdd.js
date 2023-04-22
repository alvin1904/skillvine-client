import React from "react";
import styles from "@/styles/student/AddCertificate.module.css";

export default function LeftAdd() {
  return (
    <div className={styles.LeftAdd}>
      <div className={styles.eventName}>
        <label>Event Name:</label>
        <input type="text" className={styles.event_name} />
      </div>

      <div className={styles.dateStart}>
        <label>Date Issued:</label>
        <input type="date" className={styles.date_issued} />
      </div>

      <div className={styles.duration}>
        <label>Duration:</label>
        <input type="number" className={styles.duration} min="1" />
        days
      </div>

      <div className={styles.dateEnd}>
        <label>End Date:</label>
        <input type="date" className={styles.end_date} />
      </div>

      <div className={styles.eventDescription}>
        <label>Event Description:</label>
        <textarea className={styles.event_desc} />
      </div>
    </div>
  );
}
