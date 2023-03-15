import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { cancelAbnormal } from 'service/api';
import CancelOrderTable from './CancelOrderTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: 650,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function CancelOrder({ id, setUpdate, dataTable }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const reorder = async () => {
    const body = JSON.stringify({
      id_so: id,
      id_abnormal: dataTable.map((data) => data.id_abnormal),
    });

    const data = await cancelAbnormal(body);
    if (data?.status === 200) {
      swal('Success', 'Order Canceled successfully', 'success');
      handleClose();
      setUpdate((prev) => !prev);
    }
  };

  return (
    <div>
      <button
        className="p-2 text-blue-500 bg-white border border-blue-500 rounded-md w-32"
        onClick={() => {
          handleOpen();
        }}
        disabled={dataTable.length === 0}>
        Cancel
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="overflow-y-scroll variant-scroll">
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cancel Order : {id}
          </Typography>
          <CancelOrderTable dataTable={dataTable} />
          <div className="text-center space-y-3 mt-5">
            <hr />
            <button
              onClick={reorder}
              className="bg-blue-500 rounded-md p-2 px-4 text-sm text-white">
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
