import styles from "@/styles/teacher/MarkCertificate.module.css";
import CertificateMarkInfo from "./CertificateMarkInfo";
import CertificateMarkForm from "./CertificateMarkForm";
import useAxiosCaller from "@/utils/useAxiosCaller";
import Loadings from "@/components/Loading/Loadings";
import { useEffect, useState } from "react";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getCertificateAPI2 } from "@/apis/teacher";
import { takeFirstNCharacters } from "@/utils/getRandomNumber";

export default function MarkCertificate({ slug }) {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

  const [details, setDetails] = useState({});
  const fetchCertificateDetails = async () => {
    const response = await fetchData(getCertificateAPI2, slug);
    if ([200, 304].includes(response.status)) {
      setDetails(response.data);
      console.log(response.data);
    } else throwError(response?.response?.status);
  };

  useEffect(() => {
    if (slug) fetchCertificateDetails();
  }, []);
  if (loading)
    return (
      <div className="add_certificate h-100">
        <Loadings />
      </div>
    );
  else if (details._id) {
    const data1 = {
      certificateName: details.certificateName,
      certificateDescription: details.certificateDescription,
      participationDate: takeFirstNCharacters(details.participationDate, 10),
      duration: details.duration,
      certificateDescription: details.certificateDescription,
      certificateUrl: details.certificateUrl,
    };
    const data2 = {
      year: details.year,
      category: details.category,
      isLeadership: details.isLeadership,
      level: details.level,
      leadershipLevel: details.leadershipLevel,
    };
    return (
      <div className="add_certificate h-100">
        <div className={styles.add_certificate_form}>
          <CertificateMarkInfo data={data1} />
          <CertificateMarkForm data={data2} certId={slug}/>
        </div>
      </div>
    );
  }
}
