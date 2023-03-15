import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Search = () => {
  const history = useHistory();
  const searchInputRef = useRef();
  const selectSearchContentRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    const searchInput = searchInputRef.current.value;
    const selectSearchContent = selectSearchContentRef.current.value;
    const option = selectSearchContent.split(",");

    if (option[0].trim().length === 0 || searchInput.trim().length === 0) {
      swal("Oops", "please complete the fields search", "error");
    } else {
      history.push(`/search?type=${option[0]}&value=${searchInput}`);
    }
  };
  return (
    <div className='w-full text-gray-500 bg-gray-200 py-6 px-10 rounded-xl'>
      <h3 className='mb-5 -mt-2'>Search</h3>
      <form onSubmit={searchHandler} className='grid md:grid-cols-3  gap-5 '>
        <div className='w-full bg-blue-300 flex rounded-md'>
          <input
            type='text'
            className='w-full h-full rounded-md px-2 focus:outline-blue'
            placeholder='Search'
            ref={searchInputRef}
          />
        </div>
        <select
          className='cols-span-2 w-full p-2 text-sm rounded-md focus:outline-blue'
          ref={selectSearchContentRef}>
          <option value=''>Search Content(Second Parameter, Optional)</option>
          <option value='customer,email'>Email</option>
          <option value='po,id'>PO</option>
          <option value='order,id'>Order</option>
          <option value='container,id'>Container</option>
          <option value='sales,name'>Sales</option>
        </select>
        <button
          type='submit'
          className='flex justify-center items-center bg-blue-300 text-white w-full rounded-md'>
          Search
        </button>
      </form>

      {/* <div className='grid md:grid-cols-2 gap-5'>
        <div className='grid grid-cols-2 gap-5'>
          <input
            type='text'
            className='p-1 px-2 h-full w-full rounded-md focus:outline-blue'
            placeholder='Start date'
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            ref={startDateRef}
          />
          <input
            type='text'
            className='p-1 px-2 h-full w-full rounded-md focus:outline-blue'
            placeholder='End date'
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            ref={endDateRef}
          />
        </div>
        <select
          className='w-full p-2 text-sm rounded-md focus:outline-blue'
          ref={selectStoreRef}>
          <option value='ocistok'>Ocistok</option>
        </select>
      </div> */}
    </div>
  );
};

export default Search;
