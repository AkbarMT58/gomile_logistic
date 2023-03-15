import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Pagination } from '@mui/material';

const BlogPagination = ({
  currentPages,
  totalData,
  offset,
  totalPages,
  handlePagenation,
}) => {
  return (
    <div className='flex flex-row items-center px-5 mt-5'>
      <div className='text-lg font-semibold line-clamp-1'>
        Total Postingan Blog : {totalData}{' '}
      </div>
      <div className='flex items-center gap-4 ml-auto'>
        <button
          disabled={currentPages === 1}
          name='prev'
          className={`flex text-base p-2 px-4 shadow-md text-white rounded-md cursor-pointer ${
            currentPages === 1 ? 'bg-gray-200' : 'bg-blue-500 hover:bg-blue-400'
          } `}
          onClick={handlePagenation}>
          <ArrowBackIosIcon />
          Prev
        </button>

        <Pagination
          count={totalPages}
          color='primary'
          onClick={handlePagenation}
          page={currentPages}
          variant='outlined'
          shape='rounded'
          size='large'
          hideNextButton
          hidePrevButton
        />

        <button
          disabled={currentPages === totalPages}
          name='next'
          className={`flex text-base p-2 px-4 shadow-md text-white rounded-md cursor-pointer ${
            currentPages === totalPages
              ? 'bg-gray-200'
              : 'bg-blue-500 hover:bg-blue-400'
          } `}
          onClick={handlePagenation}>
          Next
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default BlogPagination;
