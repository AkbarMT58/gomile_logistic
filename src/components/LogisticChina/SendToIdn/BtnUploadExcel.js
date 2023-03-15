import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const BtnUploadExcel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadExcel = useRef(null);

  const handleUploadExcel = (event) => {
    setIsLoading(true);

    const tokenCookies = Cookies.get('oms_token');
    const expToken = Cookies.get('exp_token');
    const miliseconds = new Date().getTime() / 1000;
    if (miliseconds > expToken) {
      setTimeout(() => {
        swal('Oops', '', 'error', { button: false });
      }, 2000);
      Cookies.remove('oms_token');
      Cookies.remove('exp_token');
      window.location.href = '/login';
    }
    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    fetch(
      'https://gateway2.ocistok.co.id/oms/logistic-china/repacking/import-excel',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${tokenCookies}`,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        swal('Success', 'Success Upload Files', 'Success');
      } else {
        swal('warning', 'Failed Upload Files', 'warning');
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <input
        ref={uploadExcel}
        className='hidden'
        type='file'
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        onChange={handleUploadExcel}
      />
      <button
        disabled={isLoading === true ? true : false}
        className='mb-2 bg-blue-500 text-white p-2 rounded-md cursor-pointer text-center'
        onClick={() => uploadExcel.current.click()}>
        {isLoading ? (
          <div className='w-28 items-center'>
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </div>
        ) : (
          'Upload Excel'
        )}
      </button>
    </>
  );
};

export default BtnUploadExcel;
