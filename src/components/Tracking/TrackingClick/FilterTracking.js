import React, { useState } from "react";

const FilterTracking = ({ setFilterData }) => {
  const [filter, setFilter] = useState({
    start: "",
    end: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const submitFilter = () => {
    setFilterData({ start: filter.start, end: filter.end });
    setFilter({ start: "", end: "" });
  };

  return (
    <div className="bg-white p-4 rounded-md my-2">
      <div className="flex items-center space-x-3">
        <p>Filter Customer</p>
        <input
          type="text"
          name="start"
          value={filter.start}
          onChange={handleFilterChange}
          placeholder="Start date"
          className="p-2 rounded-md w-32 border border-gray-200 focus:outline-blue cursor-pointer"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <input
          type="text"
          placeholder="End date"
          name="end"
          value={filter.end}
          onChange={handleFilterChange}
          className="p-2 rounded-md border w-32 border-gray-200  focus:outline-blue cursor-pointer"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <button
          onClick={submitFilter}
          className="bg-blue-300 rounded-md p-2 text-white hover:bg-blue-200 transition-all uppercase"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FilterTracking;
