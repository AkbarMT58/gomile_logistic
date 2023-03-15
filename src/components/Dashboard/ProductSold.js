import * as React from "react";

export default function ProductSold({ data, screenWidth }) {
  let number = 0;
  const products = data?.data.map((t) => {
    number++;
    return { number: number, ...t };
  });

  return (
    <div className="flex flex-col w-full bg-white border mt-10 rounded-lg">
      <div className="bg-gray-50 border-b p-5 text-xl font-semibold rounded-t-lg">
        {data?.title}
      </div>
      {/* Table */}
      <div className="w-full h-96 overflow-y-scroll variant-scroll table-scroll">
        <div className="shadow border-b border-gray-200 rounded-b-md text-sm">
          <table className="min-w-full bg-white  rounded-b-md">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  #
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Product
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 rounded-b-md">
              {products?.map((product) => (
                <tr key={product.number} className="border-b border-gray-200">
                  <td className="text-left py-3 px-4">{product.number}</td>
                  <td className="text-left py-3 px-4">
                    {screenWidth < 600
                      ? `${product.produk.slice(0, 20)} ...`
                      : product.produk}
                  </td>
                  <td className="text-left py-3 px-4">{product.total}</td>
                  <td className="text-left py-3 px-4">
                    {product?.harga?.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
