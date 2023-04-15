import React from "react";
import styles from "@/styles/student/Navbar.module.css";
import { useRouter } from "next/router";
import gotopage from "@/utils/goToPage";
import { studentNavbar } from "@/constants/data";

export default function Navbar() {
  const router = useRouter();
  const size = 32;

  return (
    <nav className={styles.nav}>
      {studentNavbar.map((item) => (
        <div
          className={styles.nav_logo}
          onClick={() => {
            gotopage(router, item.page);
          }}
        >
          <item.icon size={size} />
        </div>
      ))}
    </nav>
  );
}
