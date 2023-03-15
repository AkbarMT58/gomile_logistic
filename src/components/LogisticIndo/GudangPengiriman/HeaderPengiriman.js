import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const HeaderPengiriman = ({
  dataTotalPengiriman,
  isLoading,
  handleCariDataTerbanyak,
}) => {
  const [showLainnya, setShowLainnya] = useState(7);

  const handleShowLainnya = () => {
    setShowLainnya(
      showLainnya === dataTotalPengiriman?.length
        ? 7
        : dataTotalPengiriman?.length
    );
  };

  return (
    <div
      style={{ fontFamily: 'Poppins' }}
      className='bg-white w-full rounded-lg mt-2 p-5'>
      <div className='text-base text-gray-600 font-semibold capitalize'>
        Wilayah Pengiriman Terbanyak
      </div>
      <div className='flex mt-5'>
        <button
          onClick={handleShowLainnya}
          className='min-w-[130px] border-l-4 rounded-l-[3px] px-2 hover:bg-gray-50'>
          <p className='text-gray-400 font-medium text-sm'>Lainnya</p>
          <p className='text-gray-900 font-bold text-xl mt-2'>0</p>
          {showLainnya < dataTotalPengiriman?.length ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </button>

        <div className='grid grid-cols-8 gap-4 duration-500'>
          {dataTotalPengiriman?.slice(0, showLainnya).map((i, e) => (
            <div
              onClick={() => handleCariDataTerbanyak(i.wilayah)}
              key={e}
              className='w-full bg-blue-50 border-l-4 rounded-l-[3px] border-blue-500 px-2 hover:bg-blue-50 cursor-pointer mb-2'>
              <p className='text-gray-400 font-medium text-sm capitalize line-clamp-1'>
                {i.lainnya ? i.lainnya : i.wilayah}
              </p>
              <p className='text-gray-900 font-bold text-xl mt-2'>{i.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderPengiriman;
