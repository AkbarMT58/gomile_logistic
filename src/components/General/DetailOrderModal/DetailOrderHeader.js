import DirectionsBoat from '@mui/icons-material/DirectionsBoat';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import { FormatDate } from 'helpers/ConvertTime';
import React from 'react';

const DetailOrderHeader = ({ detailOrder, id_group }) => {
  return (
    <div className='grid grid-cols-3 items-center gap-1 mt-2'>
      <div className='flex space-x-3 text-xs items-center'>
        <p className='w-2/6'>Order No</p>
        <p>:</p>
        <p>{detailOrder.id_so}</p>
      </div>
      <div className='flex space-x-3 text-xs items-center'>
        <p className='w-2/6'>Sales</p>
        <p>:</p>
        <p>{detailOrder.sales}</p>
      </div>
      <div className='flex space-x-3 text-xs items-center'>
        <p className='w-2/6'>Status</p>
        <p>:</p>
        <p>{detailOrder.status}</p>
      </div>
      {id_group && (
        <div className='flex space-x-3 text-xs items-center'>
          <p className='w-2/6'>Group No</p>
          <p>:</p>
          <p>{id_group ? id_group : 'N/A'}</p>
        </div>
      )}
      <div className='flex space-x-3 text-xs items-center'>
        <p className='w-2/6'>Estimasi Pengiriman</p>
        <p>:</p>
        <p>{detailOrder?.etd ? FormatDate(detailOrder?.etd) : 'N/A'}</p>
      </div>
      <div className='flex space-x-3 text-xs items-center'>
        <p className='w-2/6'>Payment Time</p>
        <p>:</p>
        <p>{detailOrder.paymentDate}</p>
      </div>
      <div className='flex space-x-3 text-xs items-center'>
        <p className='w-2/6'>Shipment Type</p>
        <p>:</p>
        <div className='text-xs flex space-x-2 items-center'>
          {detailOrder.airplane ? (
            <>
              <FlightTakeoff sx={{ fontSize: '16px' }} />
              <p className='text-xs font-semibold'>Air Freight</p>
            </>
          ) : (
            <>
              <DirectionsBoat sx={{ fontSize: '16px' }} />
              <p className='text-xs font-semibold'>Sea Freight</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailOrderHeader;
