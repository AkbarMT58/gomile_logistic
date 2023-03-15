import React from "react";

const SalesOfTheMonth = ({ data }) => {
  return (
    <div className="flex flex-col w-full bg-white border mt-10 rounded-lg">
      <div className="bg-gray-50 border-b p-5 text-xl font-semibold rounded-t-lg">
        {data?.title}
      </div>
      <div className="flex flex-col items-center justify-center p-3 border-b ">
        {data?.data?.image && (
          <img
            src={data?.data?.image}
            alt="Foto salesOfTheMonth?"
            className="w-1/2 rounded-full p-3"
          />
        )}
        <p className="text-md m-2">{data?.data?.name}</p>
        <p className="text-md m-2">
          Total Penjualan : IDR {data?.data?.total?.toLocaleString("id-ID")}
        </p>
      </div>
      <div className="flex justify-center items-center space-x-4 my-6">
        <img src="/facebook.png" alt="facebook" className="w-6" />
        <img src="/twitter.png" alt="twitter" className="w-6" />
        <img src="/linkedin.png" alt="linkedin" className="w-6" />
        <img src="/pinterest.png" alt="pinterest" className="w-6" />
      </div>
    </div>
  );
};

export default SalesOfTheMonth;
