import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchApprovalWhIndo = ({
  isInputs,
  setData,
  handleChangeInputs,
  handleSearchTable,
}) => {
  return (
    <>
      <div className='inline-flex justify-center items-center border  border-blue-300 bg-white px-2 py-1'>
        <SearchIcon />
        <input
          name='searchInput'
          value={isInputs?.searchInput}
          onChange={(e) => handleChangeInputs(e)}
          onClick={() => setData(isInputs?.dumbTable)}
          type='text'
          className='focus:outline-none'
          placeholder='Cari Data Pada Table'
        />
      </div>

      <button
        onClick={(e) => handleSearchTable(e)}
        className='bg-blue-500  text-white rounded-md px-3 hover:bg-blue-600'>
        Submit Pencarian
      </button>
    </>
  );
};

export default SearchApprovalWhIndo;
