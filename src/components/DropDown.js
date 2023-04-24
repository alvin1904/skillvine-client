import React, { useEffect, useState } from "react";

export default function DropDown({
  array,
  defaultText,
  ulRef,
  clearSelection,
}) {
  const [optionSelected, setOptionSelected] = useState(defaultText);
  const [selected, setSelected] = useState(false);
  const handleSelect = () => setSelected(!selected);
  const handleOptionSelect = (op) => {
    setOptionSelected(op);
    setSelected(false);
  };
  const clear = () => {
    setOptionSelected(defaultText);
    setSelected(false);
  };

  useEffect(() => {
    clear();
  }, [clearSelection]);

  return (
    <div className="dropdown 1904">
      <div
        className={`select ${selected ? "select-clicked" : ""}`}
        onClick={handleSelect}
      >
        <span className="selected">{optionSelected}</span>
        <div className={`caret ${selected ? "caret-rotate" : ""}`}></div>
      </div>
      <ul className={`menu ${selected ? "menu-open" : ""}`} ref={ulRef}>
        {array &&
          array.map((option, id) => {
            return (
              <li
                key={id}
                onClick={() => handleOptionSelect(option)}
                className={option == optionSelected ? "active" : ""}
                ref={option == optionSelected ? ulRef : null}
              >
                {option}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
