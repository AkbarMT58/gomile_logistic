import React from 'react';
import LayoutCard from './LayoutCard';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import { releaseSalesOBE } from 'service/api';
import { IconButton } from '@mui/material';
import { getUser } from 'helpers/parseJWT';

const ReleaseSales = ({ id, sales, setDataUpdate }) => {
  const releaseSales = async (id) => {
    const data = await releaseSalesOBE(id);
    if (data?.status === 200) {
      swal('Sales released successfully', {
        icon: 'success',
      });
      setDataUpdate((prev) => !prev);
    } else {
      swal('Sales released Failed', {
        icon: 'error',
      });
    }
  };

  const handleRelease = () => {
    sales === ''
      ? swal(
          'Oops',
          "Customer has no sales, you can't do this action!",
          'error'
        )
      : swal({
          title: 'Are you sure?',
          text: 'Once release sales, you will not be able to revert this change!',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            releaseSales(id);
          } else {
            swal('You revert this change!');
          }
        });
  };

  return (
    <LayoutCard classNames={'h-full relative'}>
      <div className='text-start text-small font-bold text-black capitalize px-5 my-2'>
        Realease Sales
      </div>
      <div className='text-center uppercase text-xl font-bold text-blue-400'>
        {sales ? sales : 'Belum Meliki Sales'}
      </div>
      {!sales || sales && getUser().user !== 'hendro' && getUser().user !== 'damai' ? null :
        <div className='absolute bottom-0 right-0 pb-2 pr-2'>
          <IconButton aria-label='delete' onClick={() => handleRelease()}>
            <DeleteIcon />
          </IconButton>
        </div>
      }
    </LayoutCard>
  );
};

export default ReleaseSales;
