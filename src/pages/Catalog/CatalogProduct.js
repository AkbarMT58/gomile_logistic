import Layout from 'components/Layout';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  deleteProductCatalog,
  editPoolProduct,
  getListCatalogProducts,
} from 'service/api';
import swal from 'sweetalert';
import BannerModal from 'components/Catalog/CatalogProduct/BannerModal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Modal } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { SubRoutesCatalog as SUBROUTES } from 'components/Catalog/SubRoutesCatalog';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const CatalogProduct = () => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowMore, setIsShowMore] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('');
  const [pageInfo, setPageInfo] = useState({});
  const [category, setCategory] = useState('all');
  const [isModal, setIsModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const getListProducts = async (page, limit, category) => {
    setIsLoading(true);

    const params = new URLSearchParams({ page, limit, category }).toString();
    if (page !== '') {
      const data = await getListCatalogProducts(params);
      if (data?.status === 200) {
        if (data?.data?.data?.length === 0) {
          swal('Oops', 'Data not found !', 'error');
        }

        setProducts(data?.data);
        setPageInfo({
          totalPage: data.data.totalPage,
          totalData: data.data.totalData,
          dataInPage: data.data.dataInPage,
        });
      }
    }
    setIsLoading(false);
  };

  const handleShowMore = (index) => {
    if (isShowMore !== index) {
      setIsShowMore(index);
    } else {
      setIsShowMore(null);
    }
  };

  const deleteRow = async () => {
    const rowSelected = products
      .filter((data) => data.isChecked)
      .map((product) => product.data);

    let dataSubmit = [];
    for (let i = 0; i < rowSelected.length; i++) {
      dataSubmit.push(...rowSelected[i]);
    }

    if (dataSubmit.length > 0) {
      const body = JSON.stringify({ product: dataSubmit });
      const response = await deleteProductCatalog(body);
      if (response?.status === 200) {
        swal('Succes', 'Product has been remove !', 'success');
        setUpdate((prev) => !prev);
      }
    } else {
      swal('Oops', 'No row selected !', 'error');
    }
  };

  const handleInputPage = (e) => {
    const { value } = e.target;
    if (
      value !== '0' &&
      value !== '-' &&
      0 <= Number(value) <= pageInfo.totalPage
    ) {
      setPage(value);
    }
  };

  const updateFromCatalog = (data) => {
    setIsModal(true);
    setDataModal(data);
  };

  const deleteFromCatalog = async (data) => {
    const body = JSON.stringify(data);
    const response = await deleteProductCatalog(body);
    if (response?.status === 200) {
      swal('Succes', 'Product has been remove !', 'success');
      setUpdate((prev) => !prev);
    } else {
      swal('Oops', `${response?.message}`, 'warning');
    }
  };

  const handleSubmitUpdate = async () => {
    const body = JSON.stringify(dataModal);

    const response = await editPoolProduct(body);
    if (response?.status === 200) {
      swal('success', 'Update Product Catalog Successfully', 'success');
      setUpdate((prev) => !prev);
      setIsModal(false);
    } else {
      swal('Oops', `${response?.message}`, 'warning');
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setDataModal((prev) => {
      return { ...prev, [name]: checked ? checked : value };
    });
  };

  useEffect(() => {
    getListProducts(page, limit, category);
  }, [category, limit, page, update]);

  return (
    <Layout routes={SUBROUTES()} searchBar={false} title='After Sales'>
      <div className='flex items-center justify-between'>
        <p className='my-4 bg-white  p-2 rounded-md cursor-pointer text-center'>
          Catalog Product
        </p>
        <div className='flex items-center space-x-4 text-white'>
          <BannerModal />
          <button
            onClick={deleteRow}
            className='p-2 text-sm bg-purple-600  px-3 rounded-md hover:bg-purple-500  transition-all duration-300'>
            Delete Row
          </button>
        </div>
      </div>
      <div className='bg-white mb-3 p-3 rounded-md flex items-center justify-between'>
        <div className='font font-semibold'>
          Showing : {pageInfo.dataInPage} of {pageInfo.totalData}
        </div>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center space-x-3 text-gray-800'>
            <label className='font-semibold'>Sort By:</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className='p-1 rounded-md focus:outline-blue border border-gray-300'>
              <option value='all'>All</option>
              <option value='Fashion Pria'>Fashion Pria</option>
              <option value='Fashion wanita'>Fashion wanita</option>
              <option value='Peralatan rumah tangga'>
                Peralatan rumah tangga
              </option>
              <option value='Olahraga'>Olahraga</option>
              <option value='Produk Elektronik'>Produk Elektronik</option>
            </select>
          </div>
          <div className='flex items-center space-x-3 text-gray-800'>
            <label className='font-semibold'>Limit:</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
                setPage(1);
              }}
              className='p-1 rounded-md focus:outline-blue border border-gray-300'>
              <option value='' disabled>
                Select Limit
              </option>
              <option value='12'>12</option>
              <option value='24'>24</option>
            </select>
          </div>
          <div className='flex items-center space-x-3'>
            <div className='space-x-2'>
              <label>Page :</label>
              <input
                type='number'
                value={page}
                onChange={handleInputPage}
                className='w-8 p-1 rounded-md focus:outline-blue border border-gray-300 text-center'
              />{' '}
              / {pageInfo.totalPage}
            </div>
            <button
              disabled={page === 1}
              className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
                page === 1 ? ' bg-gray-200' : 'bg-blue-300'
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
              disabled={page === pageInfo.totalPage}
              className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
                Number(page) === pageInfo.totalPage
                  ? ' bg-gray-200'
                  : 'bg-blue-300'
              } `}
              onClick={() => {
                setPage((prev) => Number(prev) + 1);
              }}>
              <p>Next</p>
              <div>
                <ArrowForwardIosIcon
                  style={{
                    fontSize: '12px',
                    marginLeft: '3px',
                    marginRight: '-3px',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center h-40 w-full text-gray-700 font-semibold text-2xl animate-pulse'>
          Sedang Mengambil Catalog Product
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          {products?.map((produk, index) => (
            <div
              name={index}
              key={index}
              className={`w-full py-2 px-5 bg-white rounded-xl text-center ${
                isShowMore !== index && 'hover:bg-blue-200 cursor-pointer z-0'
              }`}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-5'>
                  <a
                    href={`https://ocistok.com/catalog/${produk?.name}`}
                    target='_blank'
                    rel='noreferrer'
                    className='w-full bg-orange-500 hover:bg-orange-500 rounded-md text-sm text-white font-semibold p-2 hover:scale-110 duration-200'>
                    Open Link Catalog
                  </a>

                  <div className='text-gray-500 font-semibold text-xl whitespace-nowrap'>
                    {produk?.name}
                  </div>
                </div>

                <IconButton onClick={() => handleShowMore(index)}>
                  <DoubleArrowIcon
                    className={`${
                      isShowMore !== index ? 'rotate-90' : '-rotate-90'
                    }`}
                  />
                </IconButton>
              </div>
              <div
                className={`${
                  isShowMore === index ? 'h-[500px]' : 'h-0'
                } duration-300 overflow-y-auto z-50`}>
                <div className='w-full flex flex-col gap-2 overflow-y-auto divide-y-2'>
                  {produk?.Catalog.map((katalog, index) => (
                    <div key={index}>
                      <div className='w-full flex gap-x-4 p-2'>
                        <img
                          src={`${katalog?.image}`}
                          className='w-32 object-contain'
                          alt={`${katalog?.image}`}
                        />
                        <div className='w-full flex justify-between'>
                          <div className='text-left w-3/4'>
                            <p className='font-semibold text-lg line-clamp-2'>
                              {katalog?.product}
                            </p>
                            <p>Category : {katalog?.category}</p>
                            <p>Toko : {katalog?.toko}</p>
                          </div>
                          <div className='flex flex-col justify-around items-center gap-3'>
                            <a
                              href={`https://ocistok.com/product/${katalog?.toko}/${katalog?.link}`}
                              target='_blank'
                              rel='noreferrer'
                              className='w-full bg-yellow-500 hover:bg-yellow-600 rounded-sm text-sm text-white font-semibold p-2 hover:scale-110 duration-200'>
                              Open Link Product
                            </a>

                            <button
                              onClick={(e) => updateFromCatalog(katalog)}
                              className='w-full bg-blue-400 hover:bg-blue-400 rounded-sm text-sm text-white font-semibold p-2 hover:scale-110 duration-75'>
                              UPDATE
                            </button>
                            <button
                              onClick={(e) => deleteFromCatalog(katalog)}
                              className='w-full bg-red-500 hover:bg-red-600 rounded-sm text-sm text-white font-semibold p-2 hover:scale-110 duration-75'>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={isModal} onClose={() => setIsModal(false)}>
        <Box sx={style} className='overflow-y-scroll variant-scroll'>
          <div className='bg-white flex flex-col'>
            <div className='text-gray-500 border-b text-2xl'>Edit Product</div>
            <img
              src={dataModal?.image}
              alt='imageProduct'
              className='w-1/2 mx-auto my-2'
            />
            <hr />
            <div className=''>
              <p className='mt-2'>RMB</p>
              <input
                type='text'
                name='price'
                onChange={handleChange}
                value={dataModal.price}
                className='w-full  border focus:outline-blue rounded-md p-2'
              />
              <p className='mt-2'>Product Category</p>
              <select
                name='category'
                value={dataModal.category}
                onChange={handleChange}
                className='w-full rounded-md focus:outline-blue border border-gray-300 p-2'>
                <option value='' disabled>
                  Select Category
                </option>
                <option value='Fashion Pria'>Fashion Pria</option>
                <option value='Fashion wanita'>Fashion wanita</option>
                <option value='Peralatan rumah tangga'>
                  Peralatan rumah tangga
                </option>
                <option value='Olahraga'>Olahraga</option>
                <option value='Elektronik'>Elektronik</option>
                <option value='Produk musim hujan'>Produk Musim Hujan</option>
                <option value='Produk natal'>Produk Natal</option>
              </select>
              <div className='flex items-center justify-between mt-2 text-lg'>
                <p>Recommendation ?</p>
                <input
                  type='checkbox'
                  name='recomended'
                  style={{ width: '15px', height: '15px' }}
                  checked={dataModal?.recommended}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              onClick={() => handleSubmitUpdate()}
              className='w-full bg-blue-500 hover:bg-blue-600 rounded-sm text-sm text-white font-semibold p-2 mt-10'>
              Submit Update
            </button>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
};

export default CatalogProduct;
