import styles from "@/styles/teacher/MarkCertificate.module.css";
import Categories from "./Categories";
import useCertificateDealer from "./EditCertificateLogic";
import { GrUpdate } from "react-icons/gr";
import { useRef, useState } from "react";

export default function CertificateMarkForm({data}) {
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
    </div>
  );
}
