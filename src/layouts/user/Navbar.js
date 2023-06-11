import React from "react";
import styles from "@/styles/student/Navbar.module.css";
import { useRouter } from "next/router";
import goToPage from "@/utils/goToPage";
import { studentNavbar } from "@/constants/data";
import { logoutAPI } from "@/apis";

export default function Navbar() {
  const router = useRouter();
  const size = 32;

  const signOut = async () => {
    localStorage.clear();
    const response = await logoutAPI();
    router.push("/login");
  };

  return (
    <nav className={styles.nav}>
      {studentNavbar.map((item, index) => (
        <div
          key={index}
          className={styles.nav_logo}
          onClick={async () => {
            if (item.page === studentNavbar[4].page) await signOut();
            goToPage(router, item.page);
          }}
        >
          <item.icon size={size} />
          <span>{item.name}</span>
        </div>
      ))}
    </nav>
  );
}
