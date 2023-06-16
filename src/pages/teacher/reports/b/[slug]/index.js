import { reportGenBatchAPI } from "@/apis/teacher";
import Loadings from "@/components/Loading/Loadings";
import { generatePDF } from "@/componentsAdmin/ReportGenerator/Batchwise";
import styles from "@/styles/teacher/Reports.module.css";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsDownload } from "react-icons/bs";

function index() {
  const message = {
    PREPARING: "Preparing your report...",
    COLLECTED: "Collected data, Preparing report PDF...",
    SUCCESSFUL: "Report generation successful...",
  };
  const router = useRouter();
  const { slug } = router.query;
  const { fetchData } = useAxiosCaller();
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  // BACK BUTTON TO BATCH SELECT
  const handleBack = () => router.push("/teacher/batches");
  // PREPARE THE DATA FOR REPORT GEN
  const handlePrepare = async () => {
    setStatus(message.PREPARING);
    let res = null;
    console.log(slug);
    if (typeof slug === "string") {
      res = await fetchData(reportGenBatchAPI, slug);
      console.log(res);
      if (res.status === 200 || res.status === 304) {
        setData(res.data);
        setStatus(message.COLLECTED);
        setTimeout(() => {
          setStatus(message.SUCCESSFUL);
        }, 1000);
      } else {
        setStatus(null);
        throwError(res?.response?.status);
      }
    }
  };
  // DOWNLOAD THE PDF REPORT
  const handleDownload = () => {
    generatePDF(data);
  };
  return (
    <div className={styles.body}>
      <div className={styles.reportMaker}>
        <button className={styles.back} onClick={handleBack}>
          GO BACK
        </button>
        <button className={styles.btn} onClick={handlePrepare}>
          PREPARE REPORT FOR {slug}
        </button>
        <div className={styles.report}>
          {status &&
            typeof status === "string" &&
            status !== message.SUCCESSFUL && (
              <span style={{ height: "50px", width: "50px" }}>
                <Loadings color="var(--clr-primary-250" />
              </span>
            )}
          {status}
        </div>
        {status === message.SUCCESSFUL && (
          <button className={styles.downloadBtn} onClick={handleDownload}>
            <BsDownload />
            DOWNLOAD
          </button>
        )}
      </div>
    </div>
  );
}

export default index;
