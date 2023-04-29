import { useState, useEffect, useCallback } from "react";
import useAxiosCaller from "./useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getCertificatesAPI } from "@/apis";

const useCertificateFilter = () => {
  const [certificateBackup, setCertificateBackup] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [seedCheck, setSeedCheck] = useState(0);
  const [filterUpdate, setFilterUpdate] = useState("");

  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

  const getCertificatesList = async () => {
    const response = await fetchData(getCertificatesAPI);
    console.log(response);
    if (response.status === 200) {
      setCertificates(response.data?.points);
      setCertificateBackup(response.data?.points);
    } else throwError(response?.response?.status);
  };

  useEffect(() => {
    getCertificatesList();
  }, []);

  const filterDataByLevel = useCallback(
    (theFilter, data) => {
      console.log(theFilter);
      console.log(data);
      if (!data) data = certificateBackup;
      const filteredData = {};
      Object.entries(data).forEach(([year, yearData]) => {
        filteredData[year] = yearData.filter(
          (item) =>
            item.isLeadership === theFilter?.isLeadership &&
            (item.level === theFilter?.level ||
              item.status == theFilter?.status?.toLowerCase() ||
              item.leadershipLevel === theFilter?.level)
        );
      });
      return filteredData;
    },
    [certificateBackup]
  );

  useEffect(() => {
    if (Object.keys(filterUpdate).length !== 0 && filterUpdate !== {})
      setCertificates(filterDataByLevel(filterUpdate, certificateBackup));
    else setCertificates(certificateBackup);
  }, [filterUpdate]);

  return {
    certificateBackup,
    certificates,
    setCertificates,
    filterUpdate,
    setFilterUpdate,
    loading,
  };
};

export default useCertificateFilter;
