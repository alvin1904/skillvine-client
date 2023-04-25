import React, { useCallback, useEffect, useRef, useState } from "react";
import LeftAdd from "./LeftAdd";
import RightAdd from "./RightAdd";
import LeftEdit from "./LeftEdit";
import RightEdit from "./RightEdit";
import styles from "@/styles/student/AddCertificate.module.css";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getCategoryAPI, uploadCertificateAPI } from "@/apis";
import useAxiosCaller from "@/utils/useAxiosCaller";
import {
  levelWithLeadership,
  levels2,
  levels3,
  yearOfStudy,
} from "@/constants/data";

export default function AddCertificate({ data = {} }) {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

  // ADDING CERTIFICATES
  if (Object.keys(data) == 0) {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const ref8 = useRef(null);
    const ref9 = useRef(null);

    // FETCHING CATEGORY
    const [categoryData, setCategoryData] = useState([]);
    const [seedCheck, setSeedCheck] = useState(0);

    const fetchCategoryData = useCallback(async () => {
      setSeedCheck(seedCheck + 1);
      const response = await fetchData(getCategoryAPI);
      console.log(response.data);
      if (response.status === 200) setCategoryData(response.data);
      else throwError(response?.data?.status);
    }, [fetchData, getCategoryAPI, throwError]);

    useEffect(() => {
      (categoryData.length === 0 && seedCheck < 3) && fetchCategoryData();
    }, [categoryData.length, fetchCategoryData]);

    // STRUCTURING DATA
    const finalizeData = () => {
      try {
        const category = categoryData.find(
          (category) => category.activity === ref7.current.innerText
        );
        const activityHead = categoryData.find(
          (category) => category.activityHead === ref6.current.innerText
        ).activityHead;
        const isL = activityHead === levelWithLeadership;
        const id = category._id;
        const data = {
          categoryId: id,
          duration: ref3.current.value,
          year: yearOfStudy.indexOf(ref5.current.innerText) + 1 || 0,
          certificateDescription: ref4.current.value,
          certificateName: ref1.current.value,
          participationDate: ref2.current.value,
          level: levels2.indexOf(ref8.current.innerText) + 1 || 0,
          leadershipLevel: levels3.indexOf(ref8.current.innerText) + 1 || 0,
          isLeadership: isL,
        };
        return data;
      } catch (err) {
        throwError("Please fill all the fields");
      }
    };

    // SENDING DATA
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const data = finalizeData();
      formData.append("data", JSON.stringify(data));
      if (ref9.current.files[0])
        formData.append("certificate", ref9.current.files[0]);

      const response = await fetchData(uploadCertificateAPI, formData);
      console.log(response);
      if (response.status == 200)
        throwError("Certificate added successfully", status.SUCCESS);
      else throwError(response.data?.status || response.response.status);
    };

    return (
      <form className={styles.submit_certificate} onSubmit={handleSubmit}>
        <LeftAdd ref1={ref1} ref2={ref2} ref3={ref3} ref4={ref4} />
        <RightAdd
          ref5={ref5}
          ref6={ref6}
          ref7={ref7}
          ref8={ref8}
          ref9={ref9}
          categoryData={categoryData}
          loading={loading}
        />
      </form>
    );
  } else {
    // EDITING CERTIFICATES
    const handleEdit = async () => {};
    return (
      <form className={styles.submit_certificate} onSubmit={handleEdit}>
        <LeftEdit data={data} />
        <RightEdit data={data} />
      </form>
    );
  }
}
