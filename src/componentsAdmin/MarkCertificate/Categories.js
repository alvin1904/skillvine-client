import {
  getActivityAPI,
  getActivityHeadAPI,
  getIsLeadershipAPI,
} from "@/apis/common";
import CustomDropDown from "@/components/CategoryDropDowns/CustomDropDown";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { levels2, levels3, yearOfStudy } from "@/constants/data";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { useEffect, useState } from "react";

export default function Categories() {
  const { fetchData } = useAxiosCaller();
  const { throwError } = useCustomError();
  const [year, setYear] = useState(yearOfStudy);
  const [activityHead, setActivityHead] = useState(null);
  const [activity, setActivity] = useState(null);
  const [level, setLevel] = useState(null);
  const [finalData, setFinalData] = useState({});

  const verifyString = (str) => {
    str.replace("&", "%26");
    return str;
  };
  useEffect(() => {
    const getActivityHeads = async () => {
      const res = await fetchData(getActivityHeadAPI);
      if (res.status === 200) setActivityHead(res.data);
      else throwError();
    };

    if (!activityHead) getActivityHeads();
  }, [activityHead]);

  const onActivityHeadChange = async (changedData) => {
    setLevel(null);
    setActivity(null);
    const res = await fetchData(getActivityAPI, verifyString(changedData));
    if (res.status === 200) setActivity(res.data);
    else throwError();
  };
  const onActivityChange = async (changedData) => {
    setLevel(null);
    const res = await fetchData(getIsLeadershipAPI, verifyString(changedData));
    if (res.status === 200)
      setLevel(res.data?.isLeadership ? levels3 : levels2);
    else throwError();
  };
  const onLevelChange = async (changedData) => {
    console.log(changedData);
  };
  const onYearChange = async (changedData) => {
    console.log(changedData);
  };
  return (
    <>
      <span className="category_dropdowns">
        <CustomDropDown
          onChange={onYearChange}
          array={yearOfStudy}
          defaultText={"Change year"}
        />
        {activityHead && activityHead.length > 0 && (
          <CustomDropDown
            onChange={onActivityHeadChange}
            array={activityHead}
            defaultText={"Change category"}
          />
        )}
      </span>
      <span className="category_dropdowns">
        {activity && activity.length > 0 && (
          <CustomDropDown
            onChange={onActivityChange}
            array={activity}
            defaultText={"Change activity"}
          />
        )}
        {level && level.length > 0 && (
          <CustomDropDown
            onChange={onLevelChange}
            array={level}
            defaultText={"Change level"}
          />
        )}
      </span>
    </>
  );
}
