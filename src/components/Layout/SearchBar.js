import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const SearchBar = () => {
  const history = useHistory();
  const searchInputRef = useRef(null);
  // const searchContenRef = useRef(null);
  const optionRef = useRef(null);
  // const startRef = useRef(null);
  // const endRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const searchInput = searchInputRef.current.value;
    const option = optionRef.current.value.split(',');

    if (option[0].trim().length === 0 || searchInput.trim().length === 0) {
      swal('Oops', 'please complete the fields search', 'error');
    } else {
      history.push(`/search?type=${option[0]}&value=${searchInput}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center space-x-5 md:overflow-y-hidden overflow-y-scroll pb-2">
      <div className="bg-blue-300 flex rounded-md">
        <input
          type="text"
          className="p-3 h-8 rounded-md md:w-full text-xs focus:outline-blue"
          placeholder="Input Search"
          ref={searchInputRef}
        />
      </div>
      <select
        className="w-52 p-2 text-xs rounded-md focus:outline-blue"
        ref={optionRef}>
        <option value="">Search Content</option>
        <option value="customer,email">Email</option>
        <option value="po,id">PO</option>
        <option value="order,id">Order</option>
        <option value="container,id">Container</option>
        <option value="sales,name">Sales</option>
        <option value="tracking_number">Tracking Number</option>
      </select>
      <button
        type="submit"
        className="flex justify-center items-center bg-blue-300 text-white w-52 py-1 rounded-md">
        Search
      </button>
      {/* <select
        className='w-52 p-2 text-xs rounded-md focus:outline-blue'
        ref={searchContenRef}>
        <option value=''>Ocistok</option>
      </select>
      <div className='flex space-x-5 text-xs py-1'>
        <input
          type='text'
          className='p-2 rounded-md focus:outline-blue'
          placeholder='From'
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          ref={startRef}
        />
        <input
          type='text'
          className='p-2 rounded-md focus:outline-blue'
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          placeholder='To'
          ref={endRef}
        /> */}
      {/* </div> */}
    </form>
  );
};

export default SearchBar;
