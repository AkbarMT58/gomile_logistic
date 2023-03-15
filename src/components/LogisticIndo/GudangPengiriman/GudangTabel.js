import { Tooltip } from '@mui/material';
import React from 'react';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';

const TooltipComp = ({ value }) => {
  return <div className="text-white text-base px-2 py-2">{value}</div>;
};

const GudangTabel = React.memo(({ dataToMap, handleChangeDate, name }) => {
  return (
    <>
      {dataToMap?.map((items, index) => (
        <div
          key={index}
          className={`flex justify-center items-center py-2 px-2 relative ${
            index % 2 ? 'bg-gray-50' : 'bg-gray-100'
          }`}>
          {items?.isAweek === true && (
            <Tooltip
              className="p-0 m-0 cursor-help absolute left-3"
              title={<TooltipComp value={'1 Minggu Di Gudang'} />}>
              <RunningWithErrorsIcon
                fontSize="large"
                className=" text-red-600"
              />
            </Tooltip>
          )}
          <div className="text-sm text-center w-[20%]">{items?.id_karton}</div>
          <div className="text-sm text-center w-[20%]">{items?.wilayah}</div>
          <div className="text-sm text-center w-[20%] line-clamp-2" title={items?.alamat}>{items?.alamat}</div>
          <Tooltip
            className="p-0 m-0 cursor-help"
            title={<TooltipComp value={items?.kurir} />}>
            <div className="text-sm text-center line-clamp-2 w-[20%]">
              {items?.kurir}
            </div>
          </Tooltip>
          <div className="text-sm text-center w-[20%]">{items?.customer}</div>
          <div className="text-sm text-center w-[20%]">{items?.container}</div>
          <div className="text-sm text-center w-[20%]">{items?.palet}</div>
          <input
            type="text"
            name={name}
            value={items?.jadwal}
            min={new Date().toLocaleDateString('en-ca')}
            onChange={(e) => handleChangeDate(e, index)}
            className="p-2 rounded-md text-center border border-gray-200 focus:outline-blue cursor-pointer w-[20%] hover:outline-blue"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
        </div>
      ))}
    </>
  );
});

export default GudangTabel;
