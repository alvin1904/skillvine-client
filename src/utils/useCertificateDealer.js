import { useEffect, useRef, useState } from "react";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import {
  editCertificateAPI,
  uploadCertificateAPI,
} from "@/apis";
import useAxiosCaller from "@/utils/useAxiosCaller";
import {
  levelWithLeadership,
  levels2,
  levels3,
  yearOfStudy,
} from "@/constants/data";
import { formatArrayToString } from "@/utils/arrayToString";
import { getCategoryAPI } from "@/apis/common";

const useCertificateDealer = () => {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

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

  const fetchCategoryData = async () => {
    const response = await fetchData(getCategoryAPI);
    if (response.status === 200) setCategoryData(response.data);
    else throwError(response?.data?.status);
  };

  useEffect(() => {
    categoryData.length === 0 && fetchCategoryData();
  }, []);

  // VALIDATING DATA
  const validateData = () => {
    if (!ref1.current.value) throwError("Certificate name cannot be empty");
    else if (!ref2.current.value) throwError("Date cannot be empty");
    else if (!ref3.current.value) throwError("Duration cannot be empty");
    else if (!ref4.current.value) throwError("Description cannot be empty");
    else if (ref5.current.innerText === formatArrayToString(yearOfStudy))
      throwError("Year cannot be empty");
    else if (ref6.current.innerText && ref6.current.innerText.length > 35)
      throwError("Category cannot be empty");
    else if (!ref7.current.innerText && ref7.current.innerText.length > 50)
      throwError("Event cannot be empty");
    else if (!ref8.current.innerText && ref8.current.innerText.length > 0)
      throwError("Level cannot be empty");
    else if (!ref9.current.files[0]) throwError("Certificate cannot be empty");
    else return false;
    return true;
  };

  // STRUCTURING DATA
  const finalizeData = () => {
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
  };

  // STRUCTURING DATA
  const finalizeDataE = () => {
    const category = categoryData.find(
      (category) => category.activity === ref7?.current?.innerText
    );
    const activityHead = categoryData.find(
      (category) => category.activityHead === ref6?.current?.innerText
    )?.activityHead;
    const isL = activityHead === levelWithLeadership;
    const id = category?._id;
    const data = {};

    if (id) data.categoryId = id;

    const duration = ref3.current?.value;
    if (duration && duration !== "") data.duration = duration;

    const year = yearOfStudy.indexOf(ref5.current?.innerText) + 1 || 0;
    if (year) data.year = year;

    const certDesc = ref4.current?.value;
    if (certDesc && certDesc !== "") data.certificateDescription = certDesc;

    const certName = ref1.current?.value;
    if (certName && certName !== "") data.certificateName = certName;

    const pDate = ref2.current?.value;
    if (pDate && pDate !== "") data.participationDate = pDate;

    const levelIndex = levels2.indexOf(ref8.current?.innerText) + 1 || 0;
    if (levelIndex) data.level = levelIndex;

    const leadershipIndex = levels3.indexOf(ref8.current?.innerText) + 1 || 0;
    if (leadershipIndex) {
      data.leadershipLevel = leadershipIndex;
      data.isLeadership = isL;
    }
    return data;
  };

  // SENDING DATA
  const handleSubmit = async () => {
    const formData = new FormData();
    if (validateData()) return;
    const data = finalizeData();
    formData.append("data", JSON.stringify(data));
    if (ref9.current.files[0])
      formData.append("certificate", ref9.current.files[0]);

    const response = await fetchData(uploadCertificateAPI, formData);
    console.log(response);
    if (response.status == 200) {
      throwError("Certificate added successfully", status.SUCCESS);
      return true;
    } else throwError(response.data?.status || response.response.status);
    return false;
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    const data = finalizeDataE();
    formData.append("data", JSON.stringify(data));
    if (ref9.current.files[0])
      formData.append("certificate", ref9.current.files[0]);
    const response = await fetchData(editCertificateAPI, formData, id);
    console.log(response);
    if (response.status == 200)
      throwError("Certificate edited successfully", status.SUCCESS);
    else throwError(response.data?.status || response.response.status);
  };

  return {
    loading,
    handleCertificateUpload: handleSubmit,
    handleCertificateEdit: handleEdit,
    categoryData,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
  };
};

export default useCertificateDealer;
