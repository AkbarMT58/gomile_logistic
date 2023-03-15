import React, { useState } from 'react';
import { addSalesData } from 'service/api';
import swal from 'sweetalert';
import LayoutCard from './LayoutCard';
import { getUser } from 'helpers/parseJWT';

const CardAddNewSales = ({ listSales, email, initialSales, setDataUpdate }) => {
  const [sales, setSales] = useState('');

  const addSales = async (e) => {
    e.preventDefault();
    if (sales !== '' && !initialSales || 
        sales !== '' && getUser().user === 'hendro' || 
        sales !== '' && getUser().user === 'damai') {
      const body = JSON.stringify({ email: email, sales: sales });
      const data = await addSalesData(body);
      if (data?.status === 200) {
        swal('Sales added successfully', {
          icon: 'success',
        });
        setDataUpdate((prev) => !prev);
      } else {
        swal('Oops', `${data?.message}`, 'error');
      }
    }
  };

  return (
    <LayoutCard>
      <div className='text-start text-sm font-bold text-black capitalize px-5 my-2'>
        Add Sales New Customer
      </div>

      <form
        onSubmit={addSales}
        className='flex flex-col items-center space-y-2 px-5'>
        <select
          value={sales}
          onChange={(e) => {
            setSales(e.target.value);
          }}
          className='p-2 border border-gray-300 outline-none rounded-md w-full'>
          <option value={''} disabled>
            {initialSales ? initialSales : 'Select Sales'}
          </option>

          {listSales?.map((sales) => (
            <option value={sales?.user} key={sales?.id}>
              {sales?.user}
            </option>
          ))}
        </select>
        <button
          type='submit'
          disabled={!sales || initialSales && getUser().user !== 'hendro' && getUser().user !== 'damai'}
          className={`${!sales || initialSales && getUser().user !== 'hendro' && getUser().user !== 'damai' ? 'bg-gray-300' : 'bg-blue-400 hover:bg-blue-500'} text-white py-2 w-full rounded-full`}>
          Submit
        </button>
      </form>
    </LayoutCard>
  );
};

export default CardAddNewSales;
