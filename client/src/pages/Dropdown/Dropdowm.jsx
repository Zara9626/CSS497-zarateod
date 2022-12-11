import React from "react";

const Dropdowm = ({
  id,

  name,

  dropDownValue,

  onChange,

  selectionId
}) => (
  <div>
    <h1>Choose property</h1>

    <select id={id} name={name} onChange={onChange} value={selectionId}>
      {dropDownValue && dropDownValue.map(option => (
        <option key={option.selectionId} value={option.selectionId}>
          {option.salectionLabel}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdowm;
