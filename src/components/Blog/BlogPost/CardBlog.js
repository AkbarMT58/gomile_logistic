import React from 'react';
import { Link } from 'react-router-dom';
import { deleteBlogPost } from 'service/api';
import swal from 'sweetalert';

const CardBlog = ({ item, dataChange, setDataChange }) => {
  // const BaseUrl = 'https://ocistok.co.id/control-panel/foto/';

  const handleDeletePost = async () => {
    const id = item.id;
    const data = await deleteBlogPost(id);
    if (data?.status === 200) {
      setDataChange((prev) => !prev);
      swal(`${item.title} blog deleted successfully`, {
        icon: 'success',
      });
    } else {
      swal(`${item.title} blog deleted successfully`, {
        icon: 'failed',
      });
    }
  };

  return (
    <div key={item.id} className='flex p-5'>
      <img
        className='object-cover w-44 h-44'
        src={`${item?.image?.src ? item?.image?.src : '/default_image.png'}`}
        alt={`${item?.image?.alt ? item?.image?.alt : 'Gambar Card Blog'}`}
      />
      <div className='pl-6 w-full relative'>
        <div className='w-8/12 flex flex-col gap-1'>
          <div className='text-lg font-bold line-clamp-1 uppercase'>
            {item.title}
          </div>
          <div className='text-lg text-gray-400 font-bold line-clamp-1 capitalize '>
            {item.author}
          </div>
          <div className='text-lg text-gray-400 line-clamp-1'>
            <span className='text-black font-semibold'>Meta Title : </span>
            {item.meta_title}
          </div>
          <div className='text-lg text-gray-400 line-clamp-1'>
            <span className='text-black font-semibold'>Meta Desc : </span>
            {item.meta_description}
          </div>
          <div className='text-lg text-gray-400 line-clamp-1'>
            <span className='text-black font-semibold'>Created : </span>
            {item.date}
          </div>
          <div
            className='text-lg text-gray-400 line-clamp-1'
            dangerouslySetInnerHTML={{ __html: item.body_html }}
          />
        </div>

        {/* Button Update & Delete */}
        <div className='absolute top-0 right-0 flex flex-col gap-5'>
          <Link
            to={{
              pathname: `/blog/update-blog-post`,
              id_Post: item.id,
            }}>
            <div className='bg-blue-500 hover:bg-blue-400 py-2 px-5 text-white rounded-md font-semibold text-center'>
              Update
            </div>
          </Link>
          <button
            onClick={handleDeletePost}
            className='bg-red-500 hover:bg-red-400 py-2 px-5 text-white rounded-md font-semibold'>
            Delete
          </button>
          <a
            className='bg-yellow-500 hover:bg-yellow-400 text-white rounded-md font-semibold py-2 px-5'
            href={`https://ocistok.com/blogs/news/${item.handle}`}>
            View Artikel
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
