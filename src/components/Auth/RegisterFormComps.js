import styles from "@/styles/auth.module.css";

export default function RegisterFormComps({
  ktuIdRef,
  admissionNoRef,
  batchStart,
  batchEnd,
}) {
  const handleChange = () => {
    if (batchStart.current.value.length === 4) {
      const ans = (parseInt(batchStart.current.value) + 4) % 100;
      batchEnd.current.value = ans < 10 ? `0${ans}` : ans;
    } else batchEnd.current.value = ``;
  };
  return (
    <>
      <div className={styles.login_detail_collect}>
        <label>KTU ID:</label>
        <input type="text" className={styles.login_input} ref={ktuIdRef} />
      </div>
      <div className={styles.login_detail_collect}>
        <label>Admission Number:</label>
        <input
          type="text"
          className={styles.login_input}
          ref={admissionNoRef}
        />
      </div>
      <div className={styles.login_detail_collect}>
        <label>College:</label>
        <input
          type="text"
          className={styles.login_input}
          value={"Rajiv Gandhi Institute of Technology, Kottayam"}
          readOnly
        />
        <div className={styles.login_detail_collect}>
          <label>Batch:</label>
          <div>
            <input
              type="number"
              min="0"
              className={styles.login_input_batch}
              ref={batchStart}
              onChange={handleChange}
            />
            {" -  "}
            <input
              type="text"
              className={styles.login_input_batch}
              ref={batchEnd}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
}
