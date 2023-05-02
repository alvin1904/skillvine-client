import { useState, useEffect, useCallback } from "react";
import useAxiosCaller from "./useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getCertificatesAPI } from "@/apis";

const useCertificateFilter = () => {
  const [certificateBackup, setCertificateBackup] = useState({});
  const [certificates, setCertificates] = useState([]);
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

  const filterDataByLevel = (isLeadership, level, data) => {
    console.log("FILTER BY LEVEL");
    let filteredData = {};
    Object.entries(data).forEach(([year, yearData]) => {
      filteredData[year] = yearData.filter(
        (item) =>
          item.isLeadership === isLeadership &&
          (item.level === level || item.leadershipLevel === level)
      );
    });
    return filteredData;
  };

  const filterDataByStatus = (status, data) => {
    console.log("FILTER BY STATUS");
    let filteredData = {};
    Object.entries(data).forEach(([year, yearData]) => {
      filteredData[year] = yearData.filter((item) => item.status === status);
    });
    return filteredData;
  };

  const filterDataByYear = (years, data) => {
    console.log("FILTER BY STATUS");
    let filteredData = {};
    Object.entries(data).forEach(([year, yearData]) => {
      filteredData[year] = yearData.filter((item) => item.year === years);
    });
    return filteredData;
  };

  const filterDataFunction = (theFilter, data) => {
    if (!data) data = certificateBackup;
    let filteredData = data;
    if (theFilter.isLeadership !== undefined && theFilter.level !== undefined)
      filteredData = filterDataByLevel(
        theFilter.isLeadership,
        theFilter.level,
        data
      );
    if (theFilter?.status !== undefined)
      filteredData = filterDataByStatus(theFilter.status, filteredData);
    if (theFilter?.year !== undefined)
      filteredData = filterDataByYear(theFilter.year, filteredData);
    console.log(filteredData);
    return filteredData;
  };

  useEffect(() => {
    if (Object.keys(filterUpdate).length !== 0 && filterUpdate !== {})
      setCertificates(filterDataFunction(filterUpdate, certificateBackup));
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
