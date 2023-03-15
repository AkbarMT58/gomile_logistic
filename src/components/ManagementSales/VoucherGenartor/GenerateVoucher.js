import React, { useRef } from 'react';
import swal from 'sweetalert';
import { generateVoucher } from 'service/api';

const GenerateVoucher = ({ setUpdate }) => {
  const discount = [
    1, 4, 5, 10, 17, 19, 20, 21, 23, 25, 50000, 100000, 150000, 200000, 1000000,
  ];
  const qtyRef = useRef(null);
  const discRef = useRef(null);

  const generteHandler = async (e) => {
    e.preventDefault();
    const limit = Number(qtyRef.current.value);
    const value = Number(discRef.current.value);

    if (limit > 50) {
      swal('Oops', 'Over quantity voucher !', 'error');
      return;
    }

    if (!limit && !value) {
      swal('Oops', 'Input not valid !', 'error');
      return;
    }

    const body = JSON.stringify({ limit, value });
    const data = await generateVoucher(body);

    if (data?.status === 200) {
      swal('Generated!', 'Discount voucher generated successfully', 'success', {
        buttons: false,
        timer: 1000,
      });
      setUpdate((prev) => !prev);
    } else {
      swal('Oops', data.message, 'error');
    }
  };

  return (
    <div className='bg-white p-4 mb-2 rounded-md flex overflow-x-scroll md:overflow-x-hidden'>
      <form className='flex  space-x-4' onSubmit={generteHandler}>
        <div className='flex space-x-3 items-center'>
          <label htmlFor='Quantity'>Quantity</label>
          <input
            type='number'
            className='border border-gray-200 p-1 rounded-md focus:outline-blue'
            placeholder='Discount Quantity'
            ref={qtyRef}
          />
        </div>
        <div className='flex space-x-3 items-center'>
          <label htmlFor=''>Discount</label>
          <select
            className='border border-gray-200 p-1 rounded-md focus:outline-blue'
            ref={discRef}>
            <option value=''>Choose Discount </option>
            {discount.map((val) => (
              <option key={val} value={val}>
                {val < 100 ? `${val}%` : `IDR ${val.toLocaleString('id-ID')}`}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          className='rounded bg-blue-300 hover:bg-blue-200 text-white p-1 uppercase px-3'>
          Generate
        </button>
      </form>
    </div>
  );
};

export default GenerateVoucher;
