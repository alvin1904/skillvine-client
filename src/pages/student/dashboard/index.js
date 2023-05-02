"use client";

import StudentLayout from "@/layouts/StudentLayout";
import React from "react";
import styles from "@/styles/student/Dashboard.module.css";
import NotificationCentre from "@/componentsUser/dashboard/NotificationCentre";
import CTAButtons from "@/componentsUser/dashboard/CTAButtons";
import Head from "next/head";

export default function dashboard() {
  return (
    <StudentLayout>
      <Head>
        <title>Dashboard </title>
      </Head>
      <div className="dashboard">
        <div className={styles.notifications}>
          <NotificationCentre />
        </div>
        <div className={styles.cta}>
          <CTAButtons />
        </div>
      </div>
    </StudentLayout>
  );
}
