import React from "react";

export default function DataPo({ data }) {
  return (
    <>
      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-md text-xs mt-3">
        <tbody>
          <tr className="w-full">
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">ID So</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.id_so}</p>
              </div>
            </td>
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">User</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.user}</p>
              </div>
            </td>
          </tr>
          <tr className="w-full">
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Supplier</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.supplier}</p>
              </div>
            </td>
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Payment Number</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.paymentNumber}</p>
              </div>
            </td>
          </tr>
          <tr className="w-full">
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Total</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.qty} Pcs</p>
              </div>
            </td>
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Status PO</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.status}</p>
              </div>
            </td>
          </tr>
          <tr className="w-full">
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Link</p>
                <p>:</p>
                <a
                  href={data.link}
                  target="_blank"
                  className="px-2 w-4/6 line-clamp-2"
                  rel="noreferrer"
                >
                  {data.link}
                </a>
              </div>
            </td>
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Tracking Number</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.trackingNumber}</p>
              </div>
              <div className="flex p-2">
                <p className="w-2/6">Logistic Number</p>
                <p>:</p>
                <p className="px-2 w-4/6"></p>
              </div>
              <div className="flex p-2">
                <p className="w-2/6">Logistic Name</p>
                <p>:</p>
                <p className="px-2 w-4/6"></p>
              </div>
            </td>
          </tr>
          <tr className="w-full">
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Buy Date</p>
                <p>:</p>
                <p className="px-2 w-4/6">{data.date}</p>
              </div>
            </td>
            <td className="border border-gray-200 w-1/2">
              <div className="flex p-2">
                <p className="w-2/6">Total</p>
                <p>:</p>
                <p className="px-2 w-4/6">
                  RMB {data.total.toLocaleString("id-ID")}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
