import React from "react";
import styles from "@/styles/student/Navbar.module.css";
import { useRouter } from "next/router";
import goToPage from "@/utils/goToPage";
import { studentNavbar } from "@/constants/data";

export default function Navbar() {
  const router = useRouter();
  const size = 32;

  return (
    <nav className={styles.nav}>
      {studentNavbar.map((item, index) => (
        <div
        key={index}
          className={styles.nav_logo}
          onClick={() => {
            goToPage(router, item.page);
          }}
        >
          <item.icon size={size} />
        </div>
      ))}
    </nav>
  );
}
