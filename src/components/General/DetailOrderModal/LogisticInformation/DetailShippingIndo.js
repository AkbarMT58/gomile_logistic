import React from "react";

const DetailShippingIndo = ({ data }) => {
  return (
    <div className="p-1 text-xs ">
      <div className="space-y-3">
        <div className="grid grid-cols-2">
          <p>EXPEDITION </p>
          <p>: {data.kurir.toUpperCase()}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>SERVICE</p>
          <p>: {data.service}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>RECEIPT</p>
          <p>: {data.receipt}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>WEIGHT (G) </p>
          <p>: {data.weight}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>DATE SEND</p>
          <p>: {data.date}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>STATUS</p>
          <p>: {data.status}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>COST (IDR)</p>
          <p>: {data.cost.toLocaleString("id-ID")}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailShippingIndo;
