import React, { useEffect, useRef, useState } from 'react';
import { filterNewCustomerGolang } from 'service/api';
import swal from 'sweetalert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FilterNewCustomer = ({
  setDataFiltered,
  setIsFiltered,
  setIsLoading,
  isLoading,
}) => {
  const [selectData, setSelectData] = useState({
    selected: 'email',
    email: '',
    phone: '',
    start: '',
    end: '',
    limit: 50,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [isPage, setIsPage] = useState(1);
  const isFirstRun = useRef(true);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    name === 'start' && setIsPage(1);

    name === 'selected' && setIsPage(1);
    name === 'selected' &&
      setSelectData({
        ...selectData,
        email: '',
        phone: '',
        start: '',
        end: '',
        limit: 50,
      });

    setSelectData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitFilterHandler = async () => {
    const { start, end, email, limit, phone, selected } = selectData;

    setIsLoading(true);

    const emailFilter = email !== '' ? `email=${email}` : '';
    const phoneFilter = phone !== '' ? `&phone=${phone}` : '';
    const startDate = start !== '' ? `start=${start}` : '';
    const endDate = end !== '' ? `&end=${end}` : '';
    const limitFilter = limit > 0 ? `&page=${isPage}&limit=${limit}` : ``;

    if (email !== '' || phone !== '' || start !== '' || end !== '') {
      if (selected === 'tanggal' && limit === 0) {
        swal('info', `Masukan Limit Data yang di inginkan`, 'info');
      } else {
        let params =
          startDate + endDate + emailFilter + limitFilter + phoneFilter;
        const data = await filterNewCustomerGolang(params);
        if (data?.status === 200) {
          setDataFiltered(data?.data);
          data?.total >= 1 && setTotalPages(Math.ceil(data?.total / limit));
          setIsFiltered((prev) => !prev);
        } else {
          swal(
            'error',
            `Failed Filter Data, Error : ${data?.message}`,
            'error'
          );
        }
      }
    } else {
      swal('warning', `Please Fill Input Filter`, 'warning');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    submitFilterHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPage]);

  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );

  const disabledPrev = isPage === 1 || isLoading === true;
  const disabledNext =
    isPage === totalPages || isPage === totalPages + 1 || isLoading === true;

  return (
    <>
      <div className='flex justify-between bg-white gap-5 p-4 rounded-md mb-2 items-center text-sm md:overflow-y-hidden overflow-y-scroll'>
        <div className='flex items-center gap-2'>
          <div className=''>Filter By : </div>
          <select
            value={selectData.selected}
            onChange={handleSelectChange}
            name='selected'
            className='border border-gray-200 p-2 rounded-md focus:outline-blue variant-scroll'>
            <option value='email'>Email</option>
            <option value='phone'>Phone Number</option>
            <option value='tanggal'>Tanggal</option>
          </select>

          {selectData?.selected === 'email' && (
            <>
              <input
                type='text'
                placeholder='Email Keyword'
                name='email'
                value={selectData.email}
                onChange={handleSelectChange}
                className='p-2 rounded-md w-60 border border-gray-200 focus:outline-blue cursor-pointer'></input>

              <button
                className='bg-blue-500 disabled:bg-gray-500 rounded-md p-2 text-white hover:bg-blue-400 transition-all uppercase'
                onClick={submitFilterHandler}>
                Filter
              </button>
            </>
          )}

          {selectData?.selected === 'phone' && (
            <>
              <input
                type='text'
                placeholder='Masukan Nomor phone'
                name='phone'
                value={selectData.phone}
                onChange={handleSelectChange}
                className='p-2 rounded-md w-60 border border-gray-200 focus:outline-blue cursor-pointer'></input>

              <button
                className='bg-blue-500 disabled:bg-gray-500 rounded-md p-2 text-white hover:bg-blue-400 transition-all uppercase'
                onClick={submitFilterHandler}>
                Filter
              </button>
            </>
          )}

          {selectData?.selected === 'tanggal' && (
            <>
              <div className='w-60 flex items-center gap-2'>
                <input
                  type='text'
                  placeholder='Start date'
                  name='start'
                  max={maxDate}
                  value={selectData.start}
                  onChange={handleSelectChange}
                  className='p-2 rounded-md w-28 border border-gray-200 focus:outline-blue cursor-pointer'
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
                <input
                  type='text'
                  name='end'
                  max={maxDate}
                  value={selectData.end}
                  onChange={handleSelectChange}
                  className='p-2 rounded-md border border-gray-200 w-28 focus:outline-blue cursor-pointer'
                  placeholder='End date'
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
              </div>
              <button
                className='bg-blue-500 disabled:bg-gray-500 rounded-md p-2 text-white hover:bg-blue-400 transition-all uppercase'
                onClick={submitFilterHandler}>
                Filter
              </button>
            </>
          )}
        </div>

        {selectData?.selected === 'tanggal' && (
          <div className='flex items-center  justify-end '>
            <div className='flex space-x-3  md:items-center text-sm'>
              <p className='line-clamp-1'>
                Page : {isPage} of {totalPages}
              </p>
              <select
                className='border border-gray-300 p-1 rounded-md focus:outline-blue '
                value={selectData?.limit}
                onChange={handleSelectChange}
                name='limit'
                selected='0'>
                <option disabled value='0'>
                  Data Limit
                </option>
                <option value='50'>50</option>
                <option value='100'>100</option>
                <option value='200'>200</option>
                <option value='300'>300</option>
              </select>
              <button
                disabled={disabledPrev}
                className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
                  disabledPrev ? ' bg-gray-200' : 'bg-blue-300'
                } `}
                onClick={() => {
                  if (isPage > 1) {
                    setIsPage((prev) => prev - 1);
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
                  setIsPage((prev) => prev + 1);
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
        )}
      </div>
    </>
  );
};

export default FilterNewCustomer;
