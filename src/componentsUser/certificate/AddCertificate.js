import React from "react";
import LeftAdd from "./LeftAdd";
import RightAdd from "./RightAdd";
import styles from "@/styles/student/AddCertificate.module.css";
import useCertificateDealer from "@/utils/useCertificateDealer";
import { useRouter } from "next/router";

export default function AddCertificate() {
  const {
    loading,
    handleCertificateUpload,
    categoryData,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
  } = useCertificateDealer();

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await handleCertificateUpload();
    if (isSuccess) router.push("/student/certificates");
  };
  return (
    <form className={styles.submit_certificate} onSubmit={handleSubmit}>
      <LeftAdd ref1={ref1} ref2={ref2} ref3={ref3} ref4={ref4} />
      <RightAdd
        ref5={ref5}
        ref6={ref6}
        ref7={ref7}
        ref8={ref8}
        ref9={ref9}
        categoryData={categoryData}
        loading={loading}
      />
    </form>
  );
}
