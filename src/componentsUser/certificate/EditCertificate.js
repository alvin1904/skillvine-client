import React, { useEffect, useState } from "react";
import LeftEdit from "./LeftEdit";
import RightEdit from "./RightEdit";
import styles from "@/styles/student/AddCertificate.module.css";
import Loadings from "@/components/Loading/Loadings";
import useCertificateDealer from "@/utils/useCertificateDealer";
import { useRouter } from "next/router";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { getCertificateAPI } from "@/apis";

export default function EditCertificate({ id }) {
  const {
    handleCertificateEdit,
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
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    setFirstTime(false);
    firstTime && !loading &&
      throwError(
        "Original certificate information are displayed below!",
        status.INFO
      );
  }, [firstTime, loading]);

  const [cData, setCData] = useState({});
  const fetchCertificateDetails = async () => {
    const response = await fetchData(getCertificateAPI, id);
    if ([200, 304].includes(response.status)) {
      setCData(response.data);
    } else throwError(response?.response?.status);
  };
  useEffect(() => {
    fetchCertificateDetails();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    await handleCertificateEdit(id);
    router.push("/student/certificates");
  };

  if (!id || loading)
    return (
      <form className={styles.submit_certificate_loading}>
        <Loadings />
      </form>
    );
  else
    return (
      <form className={styles.submit_certificate} onSubmit={handleEdit}>
        <LeftEdit
          ref1={ref1}
          ref2={ref2}
          ref3={ref3}
          ref4={ref4}
          cData={cData}
        />
        <RightEdit
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
