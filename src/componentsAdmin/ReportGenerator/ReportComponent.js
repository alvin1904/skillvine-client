import Loadings from "@/components/Loading/Loadings";
import styles from "@/styles/teacher/Reports.module.css";
import useReport from "@/utils/useReport";
import { BsDownload } from "react-icons/bs";

function ReportComponent({
  target,
  status,
  handleBack,
  handlePrepare,
  handleDownload,
}) {
  const { message, targets } = useReport();
  return (
    <div className={styles.body}>
      <div
        className={styles.reportMaker}
        style={{
          "--clr-border":
            target === targets.BATCH
              ? "var(--clr-primary-250)"
              : "var(--clr-primary-400)",
        }}
      >
        <button className={styles.back} onClick={handleBack}>
          GO BACK
        </button>
        <button className={styles.btn} onClick={handlePrepare}>
          PREPARE REPORT
        </button>
        <div className={styles.report}>
          {status &&
            typeof status === "string" &&
            status !== message.SUCCESSFUL && (
              <span style={{ height: "50px", width: "50px" }}>
                <Loadings
                  color={
                    target === targets.BATCH
                      ? "var(--clr-primary-250)"
                      : "var(--clr-primary-300)"
                  }
                />
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

export default ReportComponent;
