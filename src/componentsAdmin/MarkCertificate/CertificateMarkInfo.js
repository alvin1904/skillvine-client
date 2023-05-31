import { addTTokenToLink } from "@/utils/LSOperations";
import InfoDisplay from "./InfoDisplay";
import styles from "@/styles/teacher/MarkCertificate.module.css";

export default function CertificateMarkInfo({ data }) {
  const openLink = () => window.open(addTTokenToLink(data.certificateUrl));
  if (data)
    return (
      <div className={styles.markInfo}>
        <h1>Certificate Details</h1>
        <br></br>
        <InfoDisplay label={"Certificate Name"} data={data.certificateName} />
        <InfoDisplay label={"Date of event"} data={data.participationDate} />
        <InfoDisplay label={"Duration of event"} data={data.duration} />
        <InfoDisplay label={"Year of study"} data={data.year} />
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
      </div>
    );
}
