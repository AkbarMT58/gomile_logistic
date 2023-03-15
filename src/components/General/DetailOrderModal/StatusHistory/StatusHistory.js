import React from "react";
import StatusHistoryTable from "./StatusHistoryTable";

const StatusHistory = ({ historyData }) => {
  return (
    <div className="py-2 space-y-3">
      <div className="w-2/3 space-y-2">
        <div className="grid grid-cols-3 text-sm">
          <p>Email</p>
          <p>: {historyData.email}</p>
        </div>
        <div className="grid grid-cols-3 text-sm">
          <p>Order Number</p>
          <p>: {historyData.id_so}</p>
        </div>
        <div className="grid grid-cols-3 text-sm">
          <p>Payment Status</p>
          <p>: {historyData.status}</p>
        </div>
      </div>
      <StatusHistoryTable history={historyData.statusHistory} />
    </div>
  );
};

export default StatusHistory;
