import React from "react";
import { useRef } from "react";

const FilterMonth = () => {
  const monthRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const filterHandler = (e) => {
    e.preventDefault();
    const month = monthRef.current.value;
    const startDate = startRef.current.value;
    const endDate = endRef.current.value;

    const validate = month && startDate && endDate;
    if (validate) {
      alert(`month: ${month}, start: ${startDate}, end: ${endDate}`);
    } else {
      alert(`Input valid format`);
    }
    monthRef.current.value = "Select a month";
    startRef.current.value = "";
    endRef.current.value = "";
  };
  return (
    <div className="w-full text-gray-500 bg-gray-200 py-6 px-10 rounded-xl">
      <h3 className="mb-5 -mt-2">Filter</h3>
      <form className="grid grid-cols-2 gap-4 justify-center">
        <select
          className="p-1 px-2 rounded-md w-full focus:outline-blue"
          ref={monthRef}
        >
          <option value="Select a month">Select a month</option>
          <option value="Januari">Januari</option>
          <option value="Februari">Februari</option>
          <option value="Maret">Maret</option>
          <option value="April">April</option>
          <option value="Mei">Mei</option>
          <option value="Juni">Juni</option>
          <option value="Juli">Juli</option>
          <option value="Agustus">Agustus</option>
          <option value="September">September</option>
          <option value="Oktober">Oktober</option>
          <option value="November">November</option>
          <option value="Desember">Desember</option>
        </select>

        <input
          type="text"
          placeholder="Start date"
          name="start"
          ref={startRef}
          className="p-1 px-2 rounded-md focus:outline-blue"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />

        <input
          type="text"
          name="end"
          ref={endRef}
          className="p-1 px-2 rounded-md focus:outline-blue"
          placeholder="End date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />

        <button
          className="bg-blue-300 text-white rounded-md"
          onClick={filterHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FilterMonth;
