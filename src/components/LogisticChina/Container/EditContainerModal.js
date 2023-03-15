import Button from '@mui/material/Button';
import axios from 'axios';
import swal from 'sweetalert';
import { useState } from 'react';
import { updateContainerAll } from 'service/api';

export default function EditContainerModal({ open, close, containerNumber, setUpdate }) {
  const [containerNum, setContainerNum] = useState(containerNumber);
  
  const handleEdit = async () => {
    const body = { 
      container: containerNum,
      container_before: containerNumber
    };
     
    const data = await updateContainerAll(JSON.stringify(body));
    if (data?.status === 201) {
      swal("Success", `Update container successfully`, "success");
      setUpdate((prev) => !prev);
    }
  };

  return (
    <div
      className={`${
        open ? 'block' : 'hidden'
      } overflow-y-auto overflow-x-hidden pt-6 fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full bg-gray-800 bg-opacity-50`}>
      <div className='mx-auto mt-32 rounded-lg bg-white p-6 shadow-2xl w-96'>
        <div className='flex justify-end'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 cursor-pointer text-gray-500/80'
            onClick={close}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h2 className='text-lg font-bold text-center mt-4'>
          Edit Container Number
        </h2>

        <form
          action=''
          className='mx-auto mt-8 mb-0 max-w-md space-y-4'
          onSubmit={handleEdit}>
          <div>
            <label htmlFor='no_container' className='sr-only'>
              No. Container
            </label>

            <div className='relative'>
              <input
                type='no_container'
                className='w-full rounded-md border-gray-500 p-4 pr-12 text-sm shadow-md'
                placeholder='Enter No. Container'
                value={containerNum}
                onChange={(e) => setContainerNum(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <Button type='button' variant='contained' color='success' onClick={handleEdit}>
              Edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
