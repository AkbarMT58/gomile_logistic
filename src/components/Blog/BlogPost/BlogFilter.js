import { ConvertTime } from 'helpers/ConvertTime';
import React from 'react';
import { getListBlogPost } from 'service/api';

const BlogFilter = ({
  blogData,
  searchInput,
  setSearchInput,
  setFilteredResults,
  Children,
  IsLoading,
  setisLoading,
}) => {
  const searchItems = async (searchValue) => {
    setSearchInput(searchValue);

    if (!searchInput !== '') {
      setFilteredResults(blogData);
    }
  };

  const handleSearchButton = async () => {
    setisLoading(true);

    const limitSearch = 0;
    const offsetSearch = 0;
    const data = await getListBlogPost(limitSearch, offsetSearch);
    if (data?.status === 200) {
      const tempDataBlog = data?.data?.articles;
      const dataBlogResult = tempDataBlog?.map((tempDataBlog) => ({
        ...tempDataBlog,
        date: ConvertTime(tempDataBlog?.date),
      }));

      const filteredData = dataBlogResult.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    }

    setisLoading(false);
  };

  return (
    <>
      <div className='flex items-center px-5'>
        <div className='relative mr-5'>
          <div className='absolute inset-y-0 pl-2 left-0 flex items-center'>
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              className='w-6 h-6'>
              <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </div>
          <input
            type='search'
            className='pl-10 border-2 border-gray-500 h-10 pr-2 w-60 focus:outline-blue focus:border-opacity-0'
            placeholder='Filter Blog Posts'
            onChange={(e) => searchItems(e.target.value)}
          />
          <button
            onClick={handleSearchButton}
            className='w-[150px] bg-blue-500 hover:bg-blue-400 py-2 px-3 text-white font-semibold rounded-md ml-10'>
            Cari Data
          </button>
        </div>
        {Children}
      </div>

      <hr className='bg-black border-none h-px mt-5' />
    </>
  );
};

export default BlogFilter;
