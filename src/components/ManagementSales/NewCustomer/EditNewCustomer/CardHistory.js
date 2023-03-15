import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { FormatDate } from 'helpers/ConvertTime';
import LayoutCard from './LayoutCard';
import { Skeleton } from '@mui/material';

const CardHistory = ({ history, isLoading }) => {
  return (
    <LayoutCard>
      <div className='text-start text-lg font-bold text-black uppercase px-5 my-2'>
        History
      </div>
      <hr className='border-black border-px' />

      {/* Table Head */}
      <div className='grid grid-cols-5 px-5 my-2 gap-2'>
        <div className='font-bold text-lg text-black capitalize flex items-center'>
          Last Order
        </div>
        <div className='font-bold text-lg text-black capitalize flex items-center'>
          <ReceiptIcon /> Invoice Number
        </div>
        <div className='font-bold text-lg text-black capitalize flex items-center'>
          <DateRangeIcon />
          Order Date
        </div>
        <div className='font-bold text-lg text-black capitalize flex items-center'>
          Total spent to date
        </div>
        <div className='font-bold text-lg text-black capitalize flex items-center'>
          Average Order Value
        </div>
      </div>

      {/* Table Content */}
      <div className='grid grid-cols-5 px-5 my-2 gap-2'>
        {isLoading ? (
          <>
            <Skeleton variant='text' height='100%' />
            <Skeleton variant='text' height='100%' />
            <Skeleton variant='text' height='100%' />
            <Skeleton variant='text' height='100%' />
            <Skeleton variant='text' height='100%' />
          </>
        ) : (
          <>
            <div className='text-base text-blue-500 capitalize'>
              {history?.from ? history?.from : 'Belum Berbelanja'}
            </div>
            <div className='text-base text-blue-500 capitalize'>
              {history?.invoice_number
                ? history?.invoice_number
                : 'Belum Berbelanja'}
            </div>
            <div className='text-base text-blue-500 capitalize'>
              {history?.order_date
                ? FormatDate(history?.order_date)
                : 'Belum Berbelanja'}
            </div>
            <div className='text-base text-blue-500 capitalize'>
              {history?.total_spent
                ? `IDR ${history?.total_spent?.toLocaleString('id-ID')}`
                : 'Belum Berbelanja'}
            </div>
            <div className='text-base text-blue-500 capitalize'>
              {history?.avarage_order
                ? `IDR ${history?.avarage_order?.toLocaleString('id-ID')}`
                : 'Belum Berbelanja'}
              {}
            </div>
          </>
        )}
      </div>
    </LayoutCard>
  );
};

export default CardHistory;
