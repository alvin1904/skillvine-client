import React, { useEffect, useState } from "react";

export default function CustomDropDown({ array, defaultText, onChange }) {
  const [optionSelected, setOptionSelected] = useState("");
  const [selected, setSelected] = useState(false);
  const handleSelect = () => setSelected(!selected);
  const handleOptionSelect = (op) => {
    setOptionSelected(op);
    setSelected(false);
  };
  useEffect(() => {
    if (optionSelected !== "" && typeof optionSelected === "string")
      onChange(optionSelected);
  }, [optionSelected]);
  return (
    <div className="dropdown 1904">
      <div
        className={`select ${selected ? "select-clicked" : ""}`}
        onClick={handleSelect}
      >
        <span className="selected">{optionSelected || defaultText}</span>
        <div className={`caret ${selected ? "caret-rotate" : ""}`}></div>
      </div>
      <ul className={`menu ${selected ? "menu-open" : ""}`}>
        {array &&
          array.map((option, id) => {
            return (
              <li
                key={id}
                onClick={() => handleOptionSelect(option)}
                className={option == optionSelected ? "active" : ""}
              >
                {option}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
