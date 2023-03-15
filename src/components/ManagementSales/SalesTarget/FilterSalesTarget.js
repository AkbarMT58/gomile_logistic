import React, { useState } from 'react';
import { filterSalesTarget } from 'service/api';
import swal from 'sweetalert';

const FilterSalesTarget = ({
  setIsLoading,
  setIsFiltered,
  setsalesDataNew,
}) => {
  const [selectData, setSelectData] = useState({
    start: '',
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setSelectData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitFilterHandler = async () => {
    const { start } = selectData;

    setIsLoading(true);

    const startDate = start !== '' ? `start=${start}` : '';

    if (start === '') {
      swal('warning', `Please Fill Input Filter`, 'warning');
    } else {
      let params = startDate;
      const data = await filterSalesTarget(params);
      if (data?.status === 200) {
        setsalesDataNew(data?.data);
        setIsFiltered((prev) => !prev);
      } else {
        swal('error', `Failed Filter Data, Error : ${data?.message}`, 'error');
      }
    }

    setIsLoading(false);
  };

  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );

  return (
    <>
      <div className='flex bg-white gap-5 p-5 rounded-md mb-2 items-center text-sm md:overflow-y-hidden overflow-y-scroll'>
        <label>Filter By Date : </label>
        <input
          type='text'
          placeholder='Start date'
          name='start'
          max={maxDate}
          value={selectData.start}
          onChange={handleSelectChange}
          className='p-2 rounded-md w-40 border border-gray-200 focus:outline-blue cursor-pointer'
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
        />
        <button
          className='bg-blue-500 disabled:bg-gray-500 rounded-md p-2 text-white hover:bg-blue-400 transition-all uppercase'
          onClick={submitFilterHandler}>
          Filter
        </button>
      </div>
    </>
  );
};

export default FilterSalesTarget;
