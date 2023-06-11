import DropDown2 from "@/components/DropDown2";
import { levels2, levels3, yearOfStudy } from "@/constants/data";
import { removeArrayDuplicates } from "@/utils/removeArrayDuplicates";
import React, { useEffect, useState } from "react";

export default function Categories({
  categoryData,
  ref1,
  ref2,
  ref3,
  ref4,
  data,
}) {
  const [YOS, setYOS] = useState(
    yearOfStudy[data?.year - 1] || "Select year of study"
  );
  const [activityHead, setActivityHead] = useState([]);
  const [activityHSelected, setActivityHSelected] = useState(
    data?.category.activityHead || "Select category"
  );
  const [activity, setActivity] = useState([]);
  const [activitySelected, setActivitySelected] = useState(
    data?.category.activity || "Select event"
  );
  const [levels, setLevels] = useState([]);
  const [levelsSelected, setLevelsSelected] = useState(
    data === undefined || !data
      ? "Select Level"
      : data?.isLeadership
      ? levels3[data?.leadershipLevel-1]
      : "Level " + data?.level
  );

  useEffect(() => {
    const temp = categoryData.map((item) => item.activityHead);
    const temp2 = removeArrayDuplicates(temp);
    setActivityHead(temp2);
  }, [categoryData]);

  useEffect(() => {
    const temp = categoryData.filter(
      (category) => category.activityHead === activityHSelected
    );
    const temp2 = temp.map((item) => item.activity);
    setActivity(temp2);
  }, [activityHSelected]);

  useEffect(() => {
    const temp = categoryData.filter(
      (category) => category.activity === activitySelected
    );
    const temp2 = temp[0]?.isLeadership;
    !temp2 ? setLevels(levels2) : setLevels(levels3);
  }, [activitySelected]);

  return (
    <>
      <DropDown2
        array={yearOfStudy}
        ulRef={ref1}
        optionSelected={YOS}
        setOptionSelected={setYOS}
      />
      <DropDown2
        array={activityHead}
        ulRef={ref2}
        optionSelected={activityHSelected}
        setOptionSelected={setActivityHSelected}
      />
      <DropDown2
        array={activity}
        ulRef={ref3}
        optionSelected={activitySelected}
        setOptionSelected={setActivitySelected}
      />
      <DropDown2
        array={levels}
        ulRef={ref4}
        optionSelected={levelsSelected}
        setOptionSelected={setLevelsSelected}
      />
    </>
  );
}
