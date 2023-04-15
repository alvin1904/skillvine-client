import React from "react";
import styles from "@/styles/student/Navbar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_section}>
        <p>No of activity points:</p>
        <span>60</span>
      </div>
      <div className={styles.sidebar_section}>
        <p>Total no. of of activity points required:</p>
        <span>100</span>
      </div>
      <div className={styles.sidebar_section}>
        <p>No of activity points needed: </p>
        <span>40</span>
      </div>
    </aside>
  );
}
