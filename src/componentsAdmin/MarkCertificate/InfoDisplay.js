import styles from "@/styles/teacher/MarkCertificate.module.css";

export default function InfoDisplay({ label, data }) {
  return (
    <div className={styles.info}>
      <label>{label}:</label>
      <p>{data}</p>
    </div>
  );
}
