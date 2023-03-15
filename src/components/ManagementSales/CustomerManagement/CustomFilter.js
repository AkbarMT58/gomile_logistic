import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import PaginationFilter from './PaginationFilter';
import { getLiveSearchResult, getAutoFillDataLiveSearch } from 'service/api';

const CustomFilter = ({
  setFilterData,
  setCustomerData,
  dataCount,
  totalData,
  setIsLoading,
  setSearchData,
  listSales,
  setPage,
  setLimit,
  page,
  limit,
  totalPage,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [fillCustomer, setFillCustomer] = useState([]);
  const [select, setSelect] = useState({
    status: '',
    level: '',
    withSales: '',
    start: '',
    end: '',
  });

  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T')[0];

  const submitFilterHandler = () => {
    const { status, level, withSales, start, end } = select;
    setFilterData({ status, level, withsales: withSales, start, end });
    setIsLoading(true);
    setSearchData('');
    setFillCustomer([]);
    setSearchInput('');
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelect((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getAutoFillData = (input) => {
    setTimeout(async () => {
      if (input.length > 0) {
        const data = await getAutoFillDataLiveSearch(input);
        if (data?.collection.length > 0) {
          setFillCustomer(data?.collection);
        }
      }
    }, 500);
  };

  const submitSearchHandler = async (e, email) => {
    e.preventDefault();
    setIsLoading(true);
    if (email.length > 0) {
      const data = await getLiveSearchResult(email);
      if (data?.status === 200) {
        if (data.data.data.length === 0) {
          swal('Oops', data.data.errorMessage, 'error');
        }
        setSearchData(`/${email}`);
        setCustomerData(data.data);
        setFillCustomer('');
        setSearchInput('');
      }
    } else {
      swal('Oops', 'Search input not valid!', 'error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAutoFillData(searchInput);
  }, [searchInput]);

  return (
    <>
      <div className='flex bg-white p-4 rounded-md mb-2 items-center justify-between text-sm md:overflow-y-hidden overflow-y-scroll'>
        {/* Filter */}
        <div className='space-x-3 flex items-center '>
          <h3 className='mr-1 text-md line-clamp-1'>Custom Filter :</h3>
          <select
            value={select.status}
            onChange={handleSelectChange}
            name='status'
            className='border border-gray-200 p-2 rounded-md focus:outline-blue'>
            <option value='' disabled>
              Status
            </option>
            <option value='active'>Active</option>
            <option value='passive'>Passive</option>
            <option value='inactive'>Inactive</option>
            <option value='all'>All</option>
          </select>
          <select
            value={select.level}
            name='level'
            onChange={handleSelectChange}
            className='border border-gray-200 p-2 rounded-md focus:outline-blue '>
            <option value='' disabled>
              Grade
            </option>
            <option value='DIAMOND'>DIAMOND</option>
            <option value='GOLD'>GOLD</option>
            <option value='SILVER'>SILVER</option>
            <option value='all'>All</option>
          </select>
          <select
            value={select.withSales}
            onChange={handleSelectChange}
            name='withSales'
            className='border border-gray-200 p-2 rounded-md focus:outline-blue variant-scroll'>
            <option value='' disabled>
              With Sales
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
            <option value='all'>All</option>
            {listSales?.length > 1 &&
              listSales.map((sales, id) => (
                <option key={id} value={sales}>
                  {sales.slice(0, 1).toUpperCase() + sales.slice(1)}
                </option>
              ))}
          </select>
          <input
            type='text'
            placeholder='Start date'
            name='start'
            max={maxDate}
            value={select.start}
            onChange={handleSelectChange}
            className='p-2 rounded-md w-28 border border-gray-200 focus:outline-blue cursor-pointer'
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
          <input
            type='text'
            name='end'
            max={maxDate}
            value={select.end}
            onChange={handleSelectChange}
            className='p-2 rounded-md border border-gray-200 w-28 focus:outline-blue cursor-pointer'
            placeholder='End date'
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
          <button
            className='bg-blue-300 rounded-md p-2 text-white hover:bg-blue-200 transition-all uppercase'
            onClick={submitFilterHandler}>
            Filter
          </button>
        </div>
        {totalData && dataCount && (
          <div className='font font-semibold'>
            <p className='line-clamp-1 ml-2 md:ml-0'>
              Showing {dataCount ? dataCount : '100'} of{' '}
              {totalData ? totalData : '10000'} data.{' '}
            </p>
          </div>
        )}
      </div>
      {/* Search */}
      <div className='flex bg-white p-4 rounded-md mb-2 items-center justify-between text-sm space-x-5 relative'>
        <div className='flex space-x-3 items-center'>
          <h3 className='text-md line-clamp-1'>Search Customer :</h3>
          <div className='relative'>
            <input
              type='text'
              className='border border-gray-200 p-2 rounded-md focus:outline-blue'
              placeholder='Search'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            {fillCustomer.length > 0 &&
              searchInput.length < 10 &&
              searchInput.length !== 0 && (
                <div
                  className='bg-white p-5 absolute z-50 space-y-2 border border-gray-200 rounded-md overflow-y-scroll variant-scroll mt-2'
                  style={{ maxHeight: 200 }}>
                  {fillCustomer?.map((customer, id) => (
                    <p
                      key={id}
                      onClick={(e) => submitSearchHandler(e, customer.value)}
                      className='cursor-pointer hover:text-blue-300'>
                      {customer.label}
                    </p>
                  ))}
                </div>
              )}
          </div>
        </div>

        {/* Filter And Pagination */}
        <PaginationFilter
          setPage={setPage}
          page={page}
          setLimit={setLimit}
          limit={limit}
          totalPage={totalPage}
        />
      </div>
    </>
  );
};

export default CustomFilter;
