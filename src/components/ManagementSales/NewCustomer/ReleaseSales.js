import React from 'react';
import { releaseSalesOBE } from 'service/api';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';

const ReleaseSales = ({ setLoading, changeData, sales, id }) => {
  const releaseSales = async (id) => {
    setLoading(true);

    const data = await releaseSalesOBE(id);
    if (data?.status === 200) {
      swal('Sales released successfully', {
        icon: 'success',
      });
      changeData((prev) => !prev);
    }

    setLoading(false);
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
    <Tooltip title='Release Sales'>
      <IconButton aria-label='delete' onClick={() => handleRelease()}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ReleaseSales;
