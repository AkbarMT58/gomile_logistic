import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PaginationFilter = ({
  setPage,
  page,
  setLimit,
  limit,
  totalPage,
  listSales,
  select,
  setSelect,
}) => {
  const limitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  const disabledPrev = page === 1;
  const disabledNext = page === totalPage || page === totalPage + 1;
  return (
    <div className='flex items-center space-x-3'>
      <div className='flex space-x-3  items-center text-sm'>
        <p>Filter:</p>
        <select
          value={select}
          onChange={handleSelectChange}
          name='withSales'
          className='border border-gray-200 p-1 rounded-md focus:outline-blue variant-scroll'>
          <option value='' disabled>
            With Sales
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
          <option value='all'>All</option>
          {listSales?.length > 1 &&
            listSales?.map((sales, id) => (
              <option key={id} value={sales}>
                {sales.slice(0, 1).toUpperCase() + sales.slice(1)}
              </option>
            ))}
        </select>
      </div>
      <div className='flex space-x-3  items-center text-sm'>
        <p className='line-clamp-1'>Page : {page ?? '1'}</p>
        <p className='line-clamp-1'>Data limit : </p>
        <select
          className='border border-gray-300 p-1 rounded-md focus:outline-blue '
          value={limit}
          onChange={limitChange}>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </select>
      </div>
      <button
        disabled={disabledPrev}
        className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
          disabledPrev ? ' bg-gray-200' : 'bg-blue-300'
        } `}
        onClick={() => {
          if (page > 1) {
            setPage((prev) => prev - 1);
          }
        }}>
        <div>
          <ArrowBackIosIcon style={{ fontSize: '12px' }} />
        </div>
        <p>Prev</p>
      </button>
      <button
        disabled={disabledNext}
        className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
          disabledNext ? ' bg-gray-200' : 'bg-blue-300'
        } `}
        onClick={() => {
          setPage((prev) => prev + 1);
        }}>
        <p>Next</p>
        <div>
          <ArrowForwardIosIcon
            style={{ fontSize: '12px', marginLeft: '3px', marginRight: '-3px' }}
          />
        </div>
      </button>
    </div>
  );
};

export default PaginationFilter;
