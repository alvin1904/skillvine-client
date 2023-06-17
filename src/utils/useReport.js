import { reportGenBatchAPI, reportGenStudentAPI } from "@/apis/teacher";
import useAxiosCaller from "./useAxiosCaller";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { generateBatchPDF } from "@/componentsAdmin/ReportGenerator/Batchwise";
import { useState } from "react";
import { generateStudentPDF } from "@/componentsAdmin/ReportGenerator/Studentwise";

function useReport() {
  const message = {
    PREPARING: "Fetching data. Almost there…👌",
    COLLECTED: "Data ready! Making PDF…📄",
    SUCCESSFUL: "Done! Your report is awesome…🎉",
  };
  const targets = {
    BATCH: "batch-wise",
    STUDENT: "student-wise",
  };
  const backLinkBatchWise = "/teacher/batches";
  const backLinkStudentWise = "/teacher/evaluate/";

  const { fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  const getData = async (target, slug) => {
    setStatus(message.PREPARING);
    let res = null;
    if (typeof slug === "string") {
      if (target === targets.BATCH)
        res = await fetchData(reportGenBatchAPI, slug);
      if (target === targets.STUDENT)
        res = await fetchData(reportGenStudentAPI, slug);
      console.log(res);
      if (res.status === 200 || res.status === 304) {
        setData(res.data);
        setStatus(message.COLLECTED);
        setTimeout(() => {
          setStatus(message.SUCCESSFUL);
        }, 1000);
      } else {
        setStatus(null);
        throwError(res?.response?.status);
      }
    }
  };

  const generate = (target) => {
    if (!data) return throwError("Incorrect Data");
    if (target === targets.BATCH) generateBatchPDF(data);
    if (target === targets.STUDENT) generateStudentPDF(data);
  };
  return {
    backLinkBatchWise,
    backLinkStudentWise,
    status,
    targets,
    getData,
    generate,
    message,
  };
}

export default useReport;
