import React, { useState } from 'react';
import { getAllCustomerRequest } from 'service/api';
import { getUser } from 'helpers/parseJWT';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';

const FilterAllCustomerRequest = ({
  filterWithSales,
  setDataFiltered,
  setIsFiltered,
  setIsLoading,
  selectData,
  setSelectData,
}) => {
  const { obe: userOBE } = useSelector(selectAddData);
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
    const { start, end, status, sales } = selectData;

    setIsLoading(true);

    const salesPayload = sales !== '' ? `sales=${sales}&` : '';
    const statusPayload = status !== '' ? `status=${status}&` : '';
    const startDate = start !== '' ? `start=${start}&` : '';
    const endDate = end !== '' ? `end=${end}` : '';

    let params = salesPayload + statusPayload + startDate + endDate;
    const data = await getAllCustomerRequest(params);
    if (data?.status === 200) {
      setDataFiltered(data?.data);
      // setIsFiltered((prev) => !prev);
    } else {
      swal('error', `Failed Filter Data, Error : ${data?.message}`, 'error');
    }

    setIsLoading(false);
  };

  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );

  return (
    <div className="flex justify-between bg-white gap-5 p-4 rounded-md mb-2 items-center text-sm md:overflow-y-hidden overflow-y-scroll">
      <div className="flex items-center gap-2">
        <div className="">Filter Data : </div>
        <select
          onChange={handleSelectChange}
          name="sales"
          value={selectData?.sales}
          className="w-40 border border-gray-300 p-1 rounded-md focus:outline-blue">
          <option value="">Select With sales</option>
          <option value="true">Yes</option>
          {!userOBE?.includes(getUser().user) || getUser().role === 'admin' ? (
            <option value="false">No</option>
          ) : null}
          {filterWithSales?.map((sales) => (
            <option value={sales}>{sales}</option>
          ))}
        </select>
        <select
          onChange={handleSelectChange}
          name="status"
          value={selectData?.status}
          className="w-40 border border-gray-300 p-1 rounded-md focus:outline-blue">
          <option value="">Select Status</option>
          <option value="open">In Progress</option>
          <option value="closed">Completed</option>
          <option value="forbiden">Forbidden</option>
          <option value="cancel">Cancel</option>
        </select>
        <div className="w-60 flex items-center gap-2">
          <input
            type="text"
            placeholder="Start date"
            name="start"
            max={maxDate}
            value={selectData?.start}
            onChange={handleSelectChange}
            className="p-2 rounded-md w-28 border border-gray-200 focus:outline-blue cursor-pointer"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
          <input
            type="text"
            name="end"
            min={selectData?.start}
            max={maxDate}
            value={selectData?.end}
            onChange={handleSelectChange}
            className="p-2 rounded-md border border-gray-200 w-28 focus:outline-blue cursor-pointer"
            placeholder="End date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
        </div>
        <button
          className="bg-blue-500 disabled:bg-gray-500 rounded-md p-2 text-white hover:bg-blue-400 transition-all uppercase"
          onClick={submitFilterHandler}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterAllCustomerRequest;
