import styles from "@/styles/teacher/MarkCertificate.module.css";
import Categories from "./Categories";
import useCertificateDealer from "./EditCertificateLogic";
import { GrUpdate } from "react-icons/gr";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { getFromLS, removeFromLS } from "@/utils/LSOperations";

const Buttons = ({ handleBack, handleSubmit }) => (
  <div className={styles.btnHolder}>
    <button className={styles.btn2} onClick={handleBack}>
      Go Back
    </button>
    <button className={styles.btn2} onClick={handleSubmit}>
      Mark Certificate
    </button>
  </div>
);

export default function CertificateMarkForm({ data }) {
  const { handlePointsUpdate, categoryData, ref1, ref2, ref3, ref4 } =
    useCertificateDealer();
  const [load, setLoad] = useState(false);
  const inputRef = useRef(null);
  const handleUpdate = () => {
    setLoad(true);
    const data = handlePointsUpdate();
    setTimeout(() => {
      inputRef.current.value = data;
      setLoad(false);
    }, 1340);
  };

  const router = useRouter();
  const handleSubmit = () => {};
  const handleBack = () => {
    const token = "student_session";
    const session = getFromLS(token);
    if (session && typeof session !== undefined)
      router.push(`/teacher/evaluate/${session}`);
  };
  return (
    <div className={`${styles.markInfo} ${styles.white}`}>
      <h1>Category details</h1>
      <Categories
        categoryData={categoryData}
        ref1={ref1}
        ref2={ref2}
        ref3={ref3}
        ref4={ref4}
        data={data}
      />
      <button className={styles.btn} onClick={handleUpdate}>
        <span className={load && styles.loading}>
          <GrUpdate fill="red" size={18} />
        </span>
        UPDATE
      </button>
      <br></br>
      <h1>Certificate Marking</h1>
      <p>The points based on the categories are:</p>
      <input className={styles.inputBox} type="text" ref={inputRef} />
      <Buttons handleSubmit={handleSubmit} handleBack={handleBack} />
    </div>
  );
}
