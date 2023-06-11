import React from "react";
import styles from "@/styles/outsiders.module.css";
import Head from "next/head";
import Outsider from "@/components/Outsider";
import { studentGradient } from "../../../constants/gradients";

export default function student() {
  return (
    <div
      className={styles.bg}
      style={{ backgroundImage: `${studentGradient}` }}
    >
      <Head>
        <title>Oops! Outsider Alert</title>
      </Head>
      <Outsider />
    </div>
  );
}
