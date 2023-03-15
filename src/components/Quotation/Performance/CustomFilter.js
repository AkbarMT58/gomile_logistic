import React, { useRef } from "react";

const CustomFilter = ({ setFilter }) => {
  const handleFilter = (e) => {
    e.preventDefault();
    setFilter({ start: startRef.current.value, end: endRef.current.value });
  };
  const startRef = useRef("");
  const endRef = useRef("");
  return (
    <form
      onSubmit={handleFilter}
      className="flex bg-white p-3 rounded-md mb-2 space-x-2 items-center   "
    >
      <p>Custom Filter :</p>
      <input
        type="text"
        ref={startRef}
        className="border border-gray-300 rounded-md px-2 py-1 w-32 cursor-pointer"
        placeholder="Start Date"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
      <input
        type="text"
        ref={endRef}
        className="border border-gray-300 rounded-md px-2 py-1 w-32 cursor-pointer"
        placeholder="End Date"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
      <button
        type="submit"
        className="bg-blue-400 text-white px-3 py-1 rounded-md"
      >
        Filter
      </button>
    </form>
  );
};

export default CustomFilter;
