import { useEffect, useRef, useState } from "react";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { getCategoryAPI } from "@/apis";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { levels2, yearOfStudy } from "@/constants/data";
import { formatArrayToString } from "@/utils/arrayToString";

const useCertificateDealer = () => {
  const { loading, fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  // FETCHING CATEGORY
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategoryData = async () => {
    const response = await fetchData(getCategoryAPI);
    console.log(response.data);
    if (response.status === 200) setCategoryData(response.data);
    else throwError(response?.data?.status);
  };

  useEffect(() => {
    categoryData.length === 0 && fetchCategoryData();
  }, []);

  // VALIDATING DATA
  const validateData = () => {
    if (ref1.current.innerText === formatArrayToString(yearOfStudy))
      throwError("Year cannot be empty");
    else if (ref2.current.innerText && ref2.current.innerText.length > 35)
      throwError("Category cannot be empty");
    else if (!ref3.current.innerText && ref3.current.innerText.length > 50)
      throwError("Event cannot be empty");
    else if (!ref4.current.innerText && ref4.current.innerText.length > 0)
      throwError("Level cannot be empty");
    else return false;
    return true;
  };

  const camelCaseConvert = (title) => {
    const values = {
      "core-coordinator": "coreCoordinator",
      "sub-coordinator": "subCoordinator",
      volunteer: "volunteer",
      1: "coreCoordinator",
      2: "subCoordinator",
      3: "volunteer",
    };
    if (typeof title === "string") return values[title.toLowerCase()];
    else if (typeof title === "number") return values[title];
  };

  // RETURNING POINTS
  const updatePoints = () => {
    if (validateData && ref3?.current?.innerText !== "") {
      const category = categoryData.find(
        (category) => category.activity === ref3?.current?.innerText
      );
      if (category) {
        const levelIndex = levels2.indexOf(ref4.current?.innerText) + 1 || 0;
        const leadershipValue = ref4.current?.innerText;
        const data = category.isLeadership
          ? category.leadershipPoints[camelCaseConvert(leadershipValue)]
          : category.activityPoints[`level${levelIndex}`];
        return data;
      } else throwError("Invalid selection of category. Chose again!");
    }
  };

  const findPoints = (activity, leadershipLevel, level) => {
    const category = categoryData.find(
      (category) => category.activity === activity
    );
    if (category) {
      const levelIndex = level;
      const leadershipIndex = leadershipLevel;
      const val = category.isLeadership
        ? category.leadershipPoints[camelCaseConvert(leadershipIndex)]
        : category.activityPoints[`level${levelIndex}`];

      return val;
    } else throwError("Invalid selection of category. Chose again!");
    return "";
  };

  const getDataForSubmission = (
    points,
    remarks,
    activity,
    leadershipLevel,
    level,
    isLeadership,
    defaultYear
  ) => {
    const category = categoryData.find(
      (category) => category.activity === ref3?.current?.innerText
    );
    if (!category || typeof category === "undefined") {
      return {
        categoryId: activity,
        level: level,
        leadershipLevel: leadershipLevel,
        isLeadership: isLeadership,
        points: points,
        status: "approved",
        year: defaultYear,
        remarks: remarks,
      }; // CODE FOR FIRST TIME
    } else
      return {
        categoryId: category._id,
        level: levels2.indexOf(ref4.current?.innerText) + 1 || 0,
        leadershipLevel: ref4.current?.innerText,
        isLeadership: category.isLeadership,
        points: points,
        status: "approved",
        year: yearOfStudy.indexOf(ref1.current?.innerText) + 1 || 0,
        remarks: remarks,
      }; // CODE IF DROPDOWN VALUE HAS BEEN CHANGED ANYTIME
  };
  return {
    loading,
    getDataForSubmission,
    handlePointsUpdate: updatePoints,
    findPoints,
    categoryData,
    ref1,
    ref2,
    ref3,
    ref4,
  };
};

export default useCertificateDealer;
