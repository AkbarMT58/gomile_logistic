import React from "react";

const SalesCard = ({ data }) => {
  return (
    <div className="bg-white p-6 flex items-center rounded-md">
      <img src="/dollar.png" alt="dollar" className="w-10 mr-5" />
      <div className="flex flex-col">
        <p className="text-xs text-gray-400">{data?.title}</p>
        <p className="text-xs">
          {data?.title === "Gap Value" ? (data?.data > 0 ? "- " : "+ ") : null}
          {!data?.title.toLowerCase().includes("percentage") && "IDR "}
          {data?.data?.toLocaleString("id-ID")}
          {data?.title.toLowerCase().includes("percentage") && " %"}
        </p>
      </div>
    </div>
  );
};

export default SalesCard;
