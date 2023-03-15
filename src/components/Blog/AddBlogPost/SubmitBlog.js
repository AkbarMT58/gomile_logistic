import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubmitBlog = ({ handleSubmitBlog }) => {
  return (
    <div className='flex justify-between items-center py-2 px-5 bg-white mb-5 rounded-md'>
      <a href='/oms/blog/blog-posts' className='font-bold text-base uppercase'>
        <ArrowBackIcon className='mr-3  bg-white shadow-md border border-black' />
        Add Blog Posts
      </a>
      <button
        onClick={handleSubmitBlog}
        className='py-2 px-5 bg-green-500  font-semibold text-white rounded-md hover:bg-green-300'>
        Upload
      </button>
    </div>
  );
};

export default SubmitBlog;
