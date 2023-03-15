import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const SearchBox = ({ inputs, setinputs, handleChange, handleRefreshTable }) => {
  const handleCleanSearch = () => {
    setinputs((prev) => {
      return { ...prev, pencarian: '' };
    });
  };

  return (
    <div className='flex justify-center items-center gap-2 mt-5'>
      <div className='border-2 border-gray-400 px-2 rounded-md w-2/4 flex items-center gap-px'>
        <SearchIcon className='text-gray-400' fontSize='large' />
        <input
          name='pencarian'
          value={inputs.pencarian}
          onFocus={() => handleCleanSearch()}
          onChange={(e) => handleChange(e)}
          className='w-full focus:outline-none text-gray-600 py-1 text-lg'
          type='text'
          placeholder='Tuliskan Pencarian untuk tabel . . .'
        />
      </div>

      <Tooltip title={'Hapus Filter'}>
        <IconButton
          className='hover:animate-spin duration-500'
          onClick={handleRefreshTable}>
          <RefreshIcon fontSize='large' color='primary' />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default React.memo(SearchBox);
