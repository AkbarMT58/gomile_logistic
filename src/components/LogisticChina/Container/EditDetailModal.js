import Button from '@mui/material/Button';
// import axios from 'axios';
import swal from 'sweetalert';
import { useEffect, useRef, useState } from 'react';
import { updateContainerSingle } from 'service/api';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function EditDetailModal({ open, close, containerNumber, idCarton, setUpdate, containerList }) {
  const [containerNum, setContainerNum] = useState(containerNumber);
  const [showContainerList, setShowContainerList] = useState(false)
  const [search, setSearch] = useState('')

  const containerListRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (containerListRef.current && !containerListRef.current.contains(e.target)) {
      setShowContainerList(false);
    }
  };
  
  const handleEdit = async () => {
    const body = { 
      container: containerNum,
      id_karton: idCarton
    };
    
    const data = await updateContainerSingle(JSON.stringify(body));
    if (data?.status === 201) {
      swal("Success", `Update container successfully`, "success");
      setUpdate((prev) => !prev);
    }
  };

  if (!containerList || containerList.length === 0) {
    return null
  }
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
          className='mx-auto mt-4 mb-0 max-w-md space-y-4'
          onSubmit={handleEdit}>
          <div>
            <label for='no_container' className='sr-only'>
              No. Container
            </label>

            {/* <input
              type='no_container'
              className='w-full rounded-md border-gray-500 p-4 pr-12 text-sm shadow-md'
              placeholder='Enter No. Container'
              value={containerNum}
              onChange={(e) => setContainerNum(e.target.value)}
            /> */}
            <div className='w-full rounded-md border-gray-500 p-2 text-sm shadow-md text-center'>{containerNumber} <ArrowRightAltIcon /> {containerNum === containerNumber || containerNum === '' ? '_______' : containerNum}</div>
            <div className="container-list-wrapper mt-2 text-left">
              <div className="relative mb-2">
                <input 
                  type="text" 
                  name='search' 
                  value={search}
                  placeholder='Search container number' 
                  className='w-full border rounded-md px-2 py-1 focus:outline-none' 
                  onChange={(e) => {
                    setShowContainerList(true)
                    setSearch(e.target.value)
                  }} 
                  onFocus={() => setShowContainerList(true)}
                  autoComplete="off"
                />
                {search &&
                  <div className="absolute right-2 bottom-[2px] text-gray-400 font-semibold hover:text-gray-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSearch('')
                    }}
                  >x</div>
                }
              </div>
              {showContainerList &&
                <div ref={containerListRef} className="container-list max-h-60 overflow-auto divide-y border shadow">
                  {containerList?.filter((conNumber) => conNumber.container.toLowerCase().includes(search.toLowerCase())).map((container, index) => (
                    <div 
                      key={container.container} 
                      className="container-number px-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setContainerNum(container.container)
                        setShowContainerList(false)
                        setSearch('')
                      }}
                    >
                      {container.container}
                    </div>
                    ))}
                </div>
              }
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <Button
              type='button'
              variant='contained'
              color='success'
              disabled={containerNum === containerNumber || containerNum === ''}
              onClick={() => containerNum !== containerNumber && containerNum !== '' && handleEdit()}
            >
              Edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
