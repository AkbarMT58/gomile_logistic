import React, { useState } from "react";

const CancelReason = ({ id, reason, setReason, inputArea, setInputArea }) => {
  const [checkboxes, setCheckboxes] = useState([
    { label: "Out of Stock", checked: false },
    { label: "Price", checked: false },
    { label: "Customer Cancel", checked: false },
    { label: "Not Reaching MOQ", checked: false },
    { label: "Other", checked: false },
  ]);

  const handleChange = (e) => {
    const values = [...checkboxes];
    values.forEach((value) =>
      value.label === e.target.value
        ? (value.checked = true)
        : (value.checked = false)
    );
    setCheckboxes(values);
    setReason(e.target.value);
  };

  const isOtherReason = reason === "Other";
  return (
    <div className="flex flex-col mt-3 space-y-2">
      <p className="font-semibold">Reason Of Cancelitation :</p>
      {checkboxes.map((check, id) => (
        <div className="flex items-center space-x-3 ml-5" key={id}>
          <input
            type="checkbox"
            name="option"
            value={check.label}
            checked={check.checked}
            onChange={(e) => handleChange(e)}
            style={{ width: "15px", height: "15px" }}
          />
          <label>{check.label}</label>
        </div>
      ))}
      <textarea
        id="txtArea"
        rows="5"
        cols="70"
        value={inputArea}
        onChange={(e) => setInputArea(e.target.value)}
        disabled={!isOtherReason}
        className="ml-10 border border-gray-300 focus:outline-blue rounded-md"
      />
      <p className="text-xs text-red-500 ml-2 py-5">
        * This action will result in deleting this order number : {id}{" "}
      </p>
    </div>
  );
};

export default CancelReason;
