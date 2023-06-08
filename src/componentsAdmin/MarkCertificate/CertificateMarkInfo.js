import { addTTokenToLink, getFromLS } from "@/utils/LSOperations";
import InfoDisplay from "./InfoDisplay";
import styles from "@/styles/teacher/MarkCertificate.module.css";
import { useRouter } from "next/router";

export default function CertificateMarkInfo({ data }) {
  const openLink = () => window.open(addTTokenToLink(data.certificateUrl));
  const router = useRouter()
  const handleBack = () => {
    const token = "student_session";
    const session = getFromLS(token);
    if (session && typeof session !== undefined)
      router.push(`/teacher/evaluate/${session}`);
  };
  if (data)
    return (
      <div className={styles.markInfo}>
        <h1>Certificate Details</h1>
        <br></br>
        <InfoDisplay label={"Certificate Name"} data={data.certificateName} />
        <InfoDisplay label={"Date of event"} data={data.participationDate} />
        <InfoDisplay label={"Duration of event"} data={data.duration} />
        <InfoDisplay label={"Description"} data={data.certificateDescription} />
        <br></br>
        <h1>Certificate Link</h1>
        <br></br>
        <p>
          Here is the link to the{" "}
          <span className={styles.link} onClick={openLink}>
            Certificate PDF/Image!
          </span>
        </p>
        <button className={styles.btn3} onClick={handleBack}>
          Go Back
        </button>
      </div>
    );
}
