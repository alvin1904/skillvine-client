import React from "react";
import styles from "@/styles/outsiders.module.css";
import Head from "next/head";
import Outsider from "@/components/Outsider";
import { teacherGradient } from "../../../constants/gradients";

export default function student() {
  return (
    <div
      className={styles.bg}
      style={{ backgroundImage: `${teacherGradient}` }}
    >
      <Head>
        <title>Oops! Outsider Alert</title>
      </Head>
      <Outsider />
    </div>
  );
}
