import React from "react";

const DataPoTable = ({ data }) => {
  return (
    <div className="mt-3">
      <p className=" font-semibold">Detail Product</p>
      <div className="h-64 border border-gray-100 overflow-y-scroll variant-scroll ">
        {/* Table */}
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="border-b border-gray-200 ">
            <tr>
              <th className="text-left py-3 px-4 font-normal text-xs">PIC</th>
              <th className="text-left py-3 px-4 font-normal text-xs">SKU</th>
              <th className="text-left py-3 px-4 font-normal text-xs">Product</th>
              <th className="text-left py-3 px-4 font-normal text-xs">Variant</th>
              <th className="text-left py-3 px-4 font-normal text-xs">Quantity</th>
              <th className="min-w-[5rem] text-center py-3 px-4 font-normal text-xs">Price</th>
              <th className="min-w-[5rem] text-center py-3 px-4 font-normal text-xs">Total Price</th>
            </tr>
          </thead>
          <tbody
            style={{ height: "100px" }}
            className="text-gray-700 rounded-b-md"
          >
            {data.product?.map((product, id) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="text-left py-3 px-4">
                  <img src={product.image} alt="" />
                </td>
                <td className="text-left py-3 px-4 text-xs">
                  <p>{product.sku}</p>
                </td>
                <td className="text-left py-3 px-4 text-xs">
                  <p className="line-clamp-2 uppercase">{product.product}</p>
                </td>
                <td className="text-left py-3 px-4 text-xs">
                  <p>{product?.variant}</p>
                </td>
                <td className="text-left py-3 px-4 text-xs">
                  <p>{product.qty} pcs</p>
                </td>
                <td className="text-left py-3 px-4 text-xs">
                  <p className="whitespace-nowrap">RMB {product.price.toLocaleString("id-ID")}</p>
                </td>
                <td className="text-left py-3 px-4 text-xs">
                  <p className="whitespace-nowrap">RMB {product.total.toLocaleString("id-ID")}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPoTable;
