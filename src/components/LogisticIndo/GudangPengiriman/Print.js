import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const Print = ({ inputs }) => {
  const componentToPrint = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (
            <button className="bg-[#D61C4E] rounded-t-lg duration-300 text-white text-sm px-5 pt-1 pb-px absolute bottom-0 left-px hover:pb-5">
              Print
            </button>
          );
        }}
        content={() => componentToPrint.current}
      />

      <div
        ref={componentToPrint}
        className="bg-white screen:hidden print:w-full">
        <div className="flex justify-center items-center py-2 border-b-4 border-gray-200">
          <div className="text-lg text-center w-[20%]">ID Karton</div>
          <div className="text-lg text-center w-[20%]">Wilayah</div>
          <div className="text-lg text-center w-[20%]">Kurir</div>
          <div className="text-lg text-center w-[20%]">No Kontainer</div>
          <div className="text-lg text-center w-[20%]">Jadwal</div>
        </div>
        {inputs?.resultPencarian?.map((items, index) => (
          <div key={index} className="flex justify-center items-center py-2">
            <div className="text-lg text-center w-[20%]">
              {items?.id_karton}
            </div>
            <div className="text-lg text-center w-[20%]">{items?.wilayah}</div>
            <div className="text-lg text-center line-clamp-3 w-[20%]">
              {items?.kurir}
            </div>
            <div className="text-lg text-center w-[20%]">
              {items?.container}
            </div>
            <div className="text-lg border-b border-black text-center w-[20%] h-full min-h-[40px]">
              {items?.jadwal}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Print;
