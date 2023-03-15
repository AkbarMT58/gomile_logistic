import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { resendAbnormal } from 'service/api';
import ResendTable from './ResendTable';

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

export default function Resend({ id, setUpdate, dataTable, invoice }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reorderData, setReorderData] = useState({
    trackingNumber: '',
    remark: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReorderData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const reorder = async () => {
    if (reorderData.trackingNumber && reorderData.remark) {
      const body = JSON.stringify({
        id_so: id,
        tracking_number: reorderData.trackingNumber,
        invoice,
        remark: reorderData.remark,
        product: dataTable.map((data) => {
          return {
            id_product: data.id_product,
            id_abnormal: data.id_abnormal,
            qty: data.qty,
          };
        }),
      });

      const data = await resendAbnormal(body);
      if (data?.status === 200) {
        swal('Succes', 'Resend order successfully', 'success');
        handleClose();
        setUpdate((prev) => !prev);
      }
    } else {
      swal(
        'Oops',
        'Make sure you fill in all the required data before submit !',
        'error'
      );
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
        Resend
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
            Resend : {id}
          </Typography>
          <div className="flex flex-col space-y-3 my-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Tracking Number*</label>
              <input
                type="text"
                name="trackingNumber"
                onChange={handleChange}
                value={reorderData.trackingNumber}
                className="p-1 rounded-md border border-gray-300  focus:outline-blue"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Remark</label>
              <input
                type="text"
                name="remark"
                onChange={handleChange}
                value={reorderData.remark}
                className="p-1 rounded-md border border-gray-300  focus:outline-blue"
              />
            </div>
          </div>
          <ResendTable dataTable={dataTable} />
          <div className="text-center space-y-3 mt-5">
            <hr />
            <button
              onClick={reorder}
              className="bg-blue-500 rounded-md p-2 px-4 text-sm text-white">
              Resend
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
