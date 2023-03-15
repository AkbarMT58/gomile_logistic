import AddProductModal from 'components/Catalog/PoolProduct/AddProductModal';
import PoolProducts from 'components/Catalog/PoolProduct/PoolProducts';
import Layout from 'components/Layout';
import { useState, useEffect } from 'react';
import { getListPoolProducts } from 'service/api';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SubRoutesCatalog as SUBROUTES } from 'components/Catalog/SubRoutesCatalog';

const PoolProduct = () => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('all');
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getListProducts = async (page, limit, category) => {
    setIsLoading(true);
    const params = new URLSearchParams({ page, limit, category }).toString();
    if (page !== '') {
      const data = await getListPoolProducts(params);
      if (data?.status === 200) {
        setProducts(
          data.data.data.map((product) => {
            return { ...product, isChecked: false };
          })
        );
        setPageInfo({
          totalPage: data.data.totalPage,
          totalData: data.data.totalData,
          dataInPage: data.data.dataInPage,
        });
      }
      setIsLoading(false);
    }
  };

  const handleInputPage = (e) => {
    const { value } = e.target;
    if (value !== '0' && Number(value) <= pageInfo.totalPage) {
      setPage(value);
    }
  };

  useEffect(() => {
    getListProducts(page, limit, category);
  }, [update, page, limit, category]);

  return (
    <Layout routes={SUBROUTES()} title='After Sales'>
      <div className='flex items-center justify-between'>
        <p className='my-4 bg-white  p-2 rounded-md cursor-pointer text-center'>
          Pool Product
        </p>
        <AddProductModal setUpdate={setUpdate} />
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
              <option value='Produk Elektronik'>Produk Musim Hujan</option>
              <option value='Produk natal'>Produk Natal</option>
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
              disabled={Number(page) <= 1}
              className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
                Number(page) <= 1 ? ' bg-gray-200' : 'bg-blue-300'
              } `}
              onClick={() => {
                if (Number(page) > 1) {
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
      {products.length > 0 ? (
        <PoolProducts products={products} setUpdate={setUpdate} />
      ) : isLoading === true ? (
        <div className='text-gray-700 font-semibold animate-pulse duration-300 text-center text-2xl mt-10'>
          Sedang Mengambil Data Pool Product
        </div>
      ) : (
        <div className='text-gray-700 font-semibold animate-pulse duration-300 text-center text-2xl mt-10'>
          Data Pool Product Data Tidak Ditemukan
        </div>
      )}
    </Layout>
  );
};

export default PoolProduct;
