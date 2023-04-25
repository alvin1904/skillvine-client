import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/student/AddCertificate.module.css";
import { levels2, yearOfStudy } from "@/constants/data";
import DropDown2 from "@/components/DropDown2";
import { removeArrayDuplicates } from "@/utils/removeArrayDuplicates";
import { levels3 } from "@/constants/data";
import Loadings from "@/components/Loading/Loadings";

export default function RightAdd({
  ref5,
  ref6,
  ref7,
  ref8,
  ref9,
  categoryData,
  loading,
}) {
  const [YOS, setYOS] = useState("Select year of study");

  const [activityHead, setActivityHead] = useState([]);
  const [activityHSelected, setActivityHSelected] = useState("Select category");
  const [activity, setActivity] = useState([]);
  const [activitySelected, setActivitySelected] = useState("Select event");
  const [levels, setLevels] = useState([]);
  const [levelsSelected, setLevelsSelected] = useState("Select level");

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
    <div className={styles.RightAdd}>
      <DropDown2
        array={yearOfStudy}
        ulRef={ref5}
        optionSelected={YOS}
        setOptionSelected={setYOS}
      />
      <DropDown2
        array={activityHead}
        ulRef={ref6}
        optionSelected={activityHSelected}
        setOptionSelected={setActivityHSelected}
      />
      <DropDown2
        array={activity}
        ulRef={ref7}
        optionSelected={activitySelected}
        setOptionSelected={setActivitySelected}
      />
      <DropDown2
        array={levels}
        ulRef={ref8}
        optionSelected={levelsSelected}
        setOptionSelected={setLevelsSelected}
      />

      <div className={styles.fileUploader}>
        <label
          onClick={() => {
            ref9.current.click();
          }}
        >
          Upload certificate file
        </label>
        <input
          type="file"
          className={styles.fileUpload}
          accept=".jpg, .jpeg, .png, application/pdf"
          ref={ref9}
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        {loading ? <Loadings /> : `Upload the certificate`}
      </button>
    </div>
  );
}
