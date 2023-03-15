import BlogPagination from 'components/Blog/BlogPost/BlogPagination';
import BlogFilter from 'components/Blog/BlogPost/BlogFilter';
import CardBlog from 'components/Blog/BlogPost/CardBlog';
import React, { useState, useEffect } from 'react';
import { ConvertTime } from 'helpers/ConvertTime';
import { CircularProgress } from '@mui/material';
import { getListBlogPost } from 'service/api';
import Layout from 'components/Layout';
import Box from '@mui/material/Box';

const BlogPosts = () => {
  const SUBROUTES = [{ name: 'Blog Posts', pathname: '/blog/blog-posts' }];
  const [IsLoading, setisLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(1);
  const [dataChange, setDataChange] = useState(false);

  const handlePagenation = (e) => {
    const { name } = e.currentTarget;
    const rumusPages = e.target.textContent * limit - limit;

    if (name === 'next') {
      setOffset((prev) => Number(prev) + limit);
      setCurrentPages(Number(currentPages + 1));
    } else if (name === 'prev') {
      setOffset((prev) => Number(prev) - limit);
      setCurrentPages(Number(currentPages - 1));
    } else {
      setOffset(rumusPages);
      setCurrentPages(Number(e.target.textContent));
    }
  };

  useEffect(() => {
    const fetchDataBlog = async () => {
      setisLoading((prev) => !prev);
      const data = await getListBlogPost(limit, currentPages);
      if (data?.status === 200) {
        const tempDataBlog = data?.data?.articles;
        const dataBlogResult = tempDataBlog?.map((tempDataBlog) => ({
          ...tempDataBlog,
          date: ConvertTime(tempDataBlog?.date),
        }));

        setTotalData(data?.data?.total_pages);
        setTotalPages(Math.ceil(data?.data?.total_pages / limit));
        setBlogData(dataBlogResult?.reverse());
        setisLoading((prev) => !prev);
      }
    };
    fetchDataBlog();
  }, [currentPages, limit, dataChange]);

  return (
    <Layout routes={SUBROUTES} searchBar={false} title='Blog'>
      <div className='flex justify-between items-center py-2 px-5 bg-white mb-5 rounded-md'>
        <div className='text-2xl font-bold'>Blog Posts</div>
        <a
          href='/oms/blog/add-blog-post'
          className='py-2 px-5 bg-green-500 shadow-md font-semibold text-white rounded-md hover:bg-green-300'>
          Add Blog Post
        </a>
      </div>

      <div className='py-5 bg-white rounded-lg relative'>
        <BlogFilter
          blogData={blogData}
          setBlogData={setBlogData}
          filteredResults={filteredResults}
          setFilteredResults={setFilteredResults}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          IsLoading={IsLoading}
          setisLoading={setisLoading}
        />

        {IsLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              padding: '5px',
              borderRadius: 2,
              backgroundColor: 'white',
              marginBottom: 1,
            }}>
            <div
              style={{ height: '679px' }}
              className='flex space-x-3 justify-center items-center w-full p-3 rounded-md'>
              <CircularProgress size={25} />
              <p className='text-gray-500 ml-2 text-lg '>
                Getting Data Blog ...
              </p>
            </div>
          </Box>
        ) : (
          <>
            <div className='grid grid-cols-1 divide-y divide-black'>
              {searchInput.length > 1
                ? filteredResults.map((item, index) => {
                    return (
                      <CardBlog
                        dataChange={dataChange}
                        setDataChange={setDataChange}
                        key={index}
                        item={item}
                        index={index}
                      />
                    );
                  })
                : blogData?.map((item, index) => {
                    return (
                      <CardBlog
                        dataChange={dataChange}
                        setDataChange={setDataChange}
                        key={index}
                        item={item}
                        index={index}
                      />
                    );
                  })}
            </div>
            <hr className='bg-black border-none h-px mt-5' />
            {!searchInput.length >= 1 && (
              <BlogPagination
                totalData={totalData}
                offset={offset}
                totalPages={totalPages}
                currentPages={currentPages}
                handlePagenation={handlePagenation}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlogPosts;
