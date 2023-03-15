export default function ProfitlLoss({ data }) {
  let number = 0;

  const allSales = data?.data.map((sales) => {
    number++;
    return { number, ...sales };
  });
  return (
    <div className="flex flex-col w-full bg-white border mt-10 rounded-lg">
      <div className="bg-gray-50 border-b p-5 text-xl font-semibold rounded-t-lg">
        {data?.title}
      </div>
      {/* Table */}
      <div className="w-full overflow-y-scroll variant-scroll overflow-x-scroll table-scroll">
        <div className="shadow border-b border-gray-200 rounded-b-md text-sm">
          <table className="min-w-full bg-white  rounded-b-md">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  #
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Sales
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Income
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  COGS
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Profit/Loss
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  %
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 rounded-b-md">
              {allSales?.map((sales) => (
                <tr key={sales.number} className="border-b border-gray-200">
                  <td className="text-left py-3 px-4">{sales.number}</td>
                  <td className="text-left py-3 px-4">
                    {sales.name.slice(0, 1).toUpperCase() + sales.name.slice(1)}
                  </td>
                  <td className="text-left py-3 px-4">
                    {sales?.income?.toLocaleString("id-ID")}
                  </td>
                  <td className="text-left py-3 px-4">
                    {sales?.cogs?.toLocaleString("id-ID")}
                  </td>
                  <td className="text-left py-3 px-4">
                    {sales?.pl?.toLocaleString("id-ID")}
                  </td>
                  <td className="text-left py-3 px-4">{sales.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
