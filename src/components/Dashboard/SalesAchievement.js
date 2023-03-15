export default function SalesAchievement({ data }) {
  let number = 0;
  const sales = data?.data.map((s) => {
    number++;
    return { number, ...s };
  });

  return (
    <div className="flex flex-col w-full bg-white border mt-10 rounded-lg">
      <div className="bg-gray-50 border-b p-5 text-xl font-semibold rounded-t-lg">
        {data?.title}
      </div>
      <div>
        {/* Table */}
        <div
          className="w-full overflow-y-scroll variant-scroll rounded-md"
          style={{ maxHeight: "500px" }}
        >
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
                    Foto
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 rounded-b-md ">
                {sales?.map((sal) => (
                  <tr key={sal.number} className="border-b border-gray-200">
                    <td className="text-left py-3 px-4">{sal.number}</td>
                    <td className="text-left py-3 px-4">
                      {sal?.name?.slice(0, 1).toUpperCase() + sal?.name.slice(1)}
                    </td>
                    <td className="text-left py-3 px-4">
                      {sal?.total?.toLocaleString("id-ID")}
                    </td>
                    <td className="text-left py-3 px-4">
                      {sal?.image !== null ? (
                        <div>
                          <img
                            src={sal.image}
                            alt="user"
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src="/beard.png"
                            alt="user"
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
