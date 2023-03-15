import React, { useEffect, useRef, useState } from 'react';
import Layout from 'components/Layout';
import { useLocation, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { getDetailsBlogPost, updateBlogPost } from 'service/api';
import UpdateBlog from 'components/Blog/UpdateblogPost/UpdateBlog';
import RichEditor from 'components/Blog/RichEditor';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';

const UpdateBlogPost = () => {
  const { id_Post } = useLocation();
  const history = useHistory();
  const imageUpload = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isLoading, setIsLoading] = useState({
    image: false,
  });
  const [ListTags, setListTags] = useState([]);
  const [detailsPost, setDetailsPost] = useState({
    id: 0,
    title: '',
    body_html: '',
    image: {
      src: '',
      alt: '',
    },
    meta_title: '',
    meta_description: '',
    handle: '',
    visibility: 'true',
    tag: [],
    author: '',
  });

  const handleUpdateBlog = async () => {
    const {
      title,
      body_html,
      meta_title,
      meta_description,
      handle,
      author,
      tag,
    } = detailsPost;

    let emptyValue = [
      title === '' ? 'Title' : null,
      body_html === '' ? 'Content' : null,
      meta_title === '' ? 'Meta Title' : null,
      meta_description === '' ? 'Meta Description' : null,
      handle === '' ? 'Handle' : null,
      author === '' ? 'Author' : null,
      tag === '' ? 'tag' : null,
    ];
    let emptyValueFiltered = emptyValue.filter((i) => i !== null).join(', ');
    if (emptyValueFiltered.length !== 0) {
      swal('Oops!', `${emptyValueFiltered} Cannot Be Empty`, 'info');
      return;
    }

    const body = JSON.stringify(detailsPost);
    const response = await updateBlogPost(body);
    if (response?.status === 200) {
      swal('Success', 'Article Blog has been Uploaded', 'success').then(() => {
        swal('', `View article ${title} on page ?`, ``, {
          buttons: {
            cancel: true,
            Check: {
              text: 'View',
              value: 'View',
            },
          },
        }).then((value) => {
          switch (value) {
            case 'View':
              window.location.assign(
                `https://ocistok.com/blogs/news/${handle}`
              );
              break;

            default:
              history.push('/blog/blog-posts');
              return;
          }
        });
      });
    } else {
      swal(
        'Error',
        `Blog Post has not been added : ${response.message} `,
        'error'
      );
    }
  };

  const handleUploadImages = async (image) => {
    setIsLoading({
      ...isLoading,
      image: true,
    });
    let formData = new FormData();
    formData.append('gambar', image);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    if (data?.status === 200) {
      setImagePreview(data?.file);
      setIsLoading({
        ...isLoading,
        image: false,
      });
      setDetailsPost((prev) => {
        return {
          ...prev,
          image: {
            src: data?.file,
            alt: data?.file,
          },
        };
      });
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
      setIsLoading({
        ...isLoading,
        image: false,
      });
    }
  };

  const handleChangeImages = (e) => {
    const { name } = e.target;
    e.preventDefault();

    if (name === 'input') {
      const imageInput = e.target.files[0];
      handleUploadImages(imageInput);
    } else {
      const imageDraged = e.dataTransfer.files[0];
      handleUploadImages(imageDraged);
    }
  };

  const handleChanges = (e) => {
    if (e.target.name === 'handle') {
      var replaceValue = e.target.value
        .replace(/[^-.a-zA-Z\d]/gi, '')
        .replaceAll(' ', '-');
      e.target.value = replaceValue;
    }

    setDetailsPost((detailsPost) => {
      return {
        ...detailsPost,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeTag = (e, newInputValue) => {
    setDetailsPost({
      ...detailsPost,
      tag: newInputValue,
    });
  };

  const handleDeleteImage = (e) => {
    setImagePreview(null);
    setDetailsPost((detailsPost) => {
      return {
        ...detailsPost,
        image: {
          src: '',
          alt: '',
        },
      };
    });
  };

  useEffect(() => {
    if (!id_Post) {
      history.push('/blog/blog-posts');
      return;
    }

    const fetchDataBlog = async () => {
      setIsLoadData(true);
      const data = await getDetailsBlogPost(id_Post);
      if (data?.status === 200) {
        setListTags(data?.tag);
        setImagePreview(data?.data?.image?.src);
        setDetailsPost({
          id: data?.data?.id,
          title: data?.data?.title,
          body_html: data?.data?.body_html,
          image: {
            src: data?.data?.image?.src,
            alt: data?.data?.image?.alt,
          },
          meta_title: data?.data?.meta_title,
          meta_description: data?.data?.meta_description,
          handle: data?.data?.handle,
          tag: data?.data?.tag,
          author: data?.data?.author,
          visibility: data?.data?.visibility,
        });
      }
      setIsLoadData(false);
    };
    fetchDataBlog();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_Post]);

  return (
    <Layout searchBar={false} title='Add Blog Post'>
      <UpdateBlog handleUpdateBlog={handleUpdateBlog} />
      {isLoadData ? (
        <div className='flex gap-2 items-center justify-center w-full mt-20'>
          <CircularProgress size={30} />
          <div className='font-bold text-lg'> Loading...</div>
        </div>
      ) : (
        <div
          className='flex gap-2 justify-center px-10'
          style={{ fontFamily: 'Poppins' }}>
          <div className='w-full max-w-[885px] space-y-2'>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='mb-5'>
                <div className='text-xl font-semibold'>Title</div>
                <input
                  onChange={handleChanges}
                  value={detailsPost?.title}
                  type='text'
                  name='title'
                  className='drop-shadow-xl p-2 w-full border border-gray-300 shadow-lg rounded-md focus:outline-none'
                />
              </div>

              <div className='text-xl font-semibold'>Content</div>
              <RichEditor
                initialValue={detailsPost?.body_html}
                onChange={(evt, editor) =>
                  setDetailsPost({
                    ...detailsPost,
                    body_html: editor.getContent(),
                  })
                }
              />
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='text-xl font-semibold mb-2'>
                Search Engine Listing Preview
              </div>
              <div className='space-y-px w-3/4'>
                <div className='text-xl font-semibold text-blue-400 capitalize'>
                  {detailsPost?.meta_title
                    ? detailsPost?.meta_title
                    : 'Title Search Engine Listing Preview'}
                </div>
                <div className='text-base font-normal text-green-500 lowercase'>
                  https://ocistok.com/news/blogs/
                  {detailsPost?.handle
                    ? detailsPost?.handle
                    : 'handle-Search-Engine-Listing-Preview'}
                </div>
                <div className='text-sm line-clamp-5 text-justify'>
                  {detailsPost?.meta_description
                    ? detailsPost?.meta_description
                    : ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit maiores omnis ea minima ab, rerum alias temporibus voluptate consequatur dicta pariatur corporis? Est, impedit velit dolores iste iure fugit suscipit magnam odit beatae minus labore eligendi blanditiis distinctio assumenda perspiciatis dolorem. Doloribus vero labore delectus distinctio, rerum ipsum laudantium mollitia!'}
                </div>
              </div>
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='flex flex-col my-2'>
                <div className='text-xl font-semibold'>Page Title</div>
                <input
                  onChange={handleChanges}
                  value={detailsPost?.meta_title}
                  maxLength='70'
                  type='text'
                  name='meta_title'
                  className='drop-shadow-xl p-2 w-full border border-gray-300 shadow-lg rounded-md focus:outline-none'
                />

                <div className='text-base text-gray-300 font-semibold ml-2 mt-2'>
                  {detailsPost?.meta_title?.length} of 70 characters used
                </div>
              </div>
              <div className='flex flex-col my-2'>
                <div className='text-xl font-semibold'>Description</div>
                <textarea
                  onChange={handleChanges}
                  value={detailsPost?.meta_description}
                  maxLength='370'
                  type='text'
                  name='meta_description'
                  className='drop-shadow-xl p-2 w-full min-h-[150px] border border-gray-300 shadow-lg rounded-md focus:outline-none'
                />
                <div className='text-base text-gray-300 font-semibold ml-2 mt-2'>
                  {detailsPost?.meta_description?.length} of 370 characters used
                </div>
              </div>
              <div className='flex flex-col my-2'>
                <div className='text-xl font-semibold'>URL and Handle</div>
                <input
                  onChange={handleChanges}
                  value={detailsPost?.handle}
                  type='text'
                  name='handle'
                  className='drop-shadow-xl p-2 w-full border border-gray-300 shadow-lg rounded-md focus:outline-none'
                />
                <div className='text-base text-gray-300 font-semibold ml-2 mt-2'>
                  {0} of 370 characters used
                </div>
              </div>
            </div>
          </div>

          <div className='w-[300px] space-y-2'>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <FormControl>
                <div className='text-xl font-semibold'>Visibility</div>
                <RadioGroup
                  name='visibility'
                  defaultValue='true'
                  onChange={handleChanges}
                  value={detailsPost?.visible}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label='visible'
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label='hidden'
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='text-xl font-semibold'>Featured Image</div>
              {imagePreview ? (
                <>
                  <img
                    className='w-full h-52'
                    src={imagePreview}
                    alt='Featured_Image_Post'
                  />
                </>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleChangeImages}
                  onClick={() => imageUpload.current.click()}
                  name='dropzone'
                  className='w-full h-52 bg-gray-100 rounded-md mt-2 border-2 border-dashed border-gray-300 flex items-center justify-center font-semibold cursor-pointer hover:bg-gray-200'>
                  {!isLoading?.image ? (
                    <>
                      <span className='animate-bounce'>Drag Images Here</span>
                    </>
                  ) : (
                    <span className=''>
                      <CircularProgress size={30} />
                    </span>
                  )}
                </div>
              )}
              <div className='flex justify-between'>
                <button
                  onClick={() => imageUpload.current.click()}
                  className='text-blue-400 capitalize text-lg font-semibold mt-px'>
                  Update
                </button>
                <button
                  onClick={handleDeleteImage}
                  className='hover:text-red-400 capitalize text-lg font-semibold mt-px'>
                  Remove
                </button>
              </div>
              <input
                name='input'
                onChange={handleChangeImages}
                className='hidden'
                type='file'
                ref={imageUpload}
              />
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='text-xl font-semibold'>Organization</div>
              <div className='text-base font-semibold mt-3 '>Author</div>
              <input
                type='text'
                name='author'
                value={detailsPost?.author}
                onChange={(e) => handleChanges(e)}
                className='p-2 w-full border border-gray-300 focus:outline-none'
              />
            </div>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='text-xl font-semibold'>Tags</div>
              <Autocomplete
                multiple={true}
                freeSolo={true}
                filterSelectedOptions={true}
                options={ListTags}
                value={detailsPost?.tag}
                onChange={handleChangeTag}
                renderInput={(params) => <TextField name='tag' {...params} />}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UpdateBlogPost;
