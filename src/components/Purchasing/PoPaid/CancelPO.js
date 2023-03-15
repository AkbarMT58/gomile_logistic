import { useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { cancelPoPaid } from 'service/api';
import swal from 'sweetalert';
import CancelPoTable from './CancelPoTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function CancelPO({
  id_so,
  invoice,
  setUpdate,
  dataOrder,
  totalRefund,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const [dataInput, setDataInput] = useState({
    total: totalRefund,
    // bank: '',
    // account_number: '',
    description: '',
    image: '',
  });

  const cancel = async () => {
    setLoading(true);
    if (dataInput.image.trim().length === 0) {
      swal('Oops', 'Please upload receipt before submit!', 'error');
      setLoading(false);
      return;
    }

    if (!dataInput.total) {
      swal('Oops', 'Input not valid !', 'error');
      setLoading(false);
      return;
    }

    // if (dataInput.bank.trim().length === 0) {
    //   swal('Oops', 'Please Input Bank Name', 'error');
    //   setLoading(false);
    //   return;
    // }

    // if (dataInput.account_number.trim().length === 0) {
    //   swal('Oops', 'Please Input Account Number', 'error');
    //   setLoading(false);
    //   return;
    // }

    const body = JSON.stringify({ id_so, invoice, ...dataInput });

    const data = await cancelPoPaid(body);
    if (data?.status === 200) {
      swal('Success', 'PO Canceled successfully', 'success');
      setUpdate((prev) => !prev);
    }
    if (data?.status === 400) {
      swal('Oops', 'Input not valid !', 'error');
      setLoading(false);
    }
    if (data?.status === 500) {
      swal('Oops', 'Internal server error !', 'error');
      setLoading(false);
    }
  };

  const submitImage = (e) => {
    let formData = new FormData();
    formData.append('gambar', e.target.files[0]);
    fetch(`${process.env.REACT_APP_URL_API_IMAGE_UPLOAD}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setDataInput({ ...dataInput, image: data.file });
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div>
      <div
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer"
        onClick={() => handleOpen()}>
        Cancel
      </div>
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
            Cancel PO
          </Typography>
          <div className="flex space-x-4 text-xs">
            <p>Note:</p>
            <p>
              If you want to cancel PO, please ask for a refund from supplier
              and put the transfer receipt down below.
            </p>
          </div>
          <div className="flex flex-col my-3">
            <label className="">Order Number</label>
            <input
              defaultValue={id_so}
              disabled
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="">PO Number</label>
            <input
              defaultValue={invoice}
              disabled
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="">Total Refund (RMB)</label>
            <input
              name="total"
              onChange={handleChange}
              value={dataInput.total}
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div>
          {/* <div className="flex flex-col my-3">
            <label className="">Bank</label>
            <input
              name="bank"
              onChange={handleChange}
              value={dataInput.bank}
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="">Account Number</label>
            <input
              name="account_number"
              onChange={handleChange}
              value={dataInput.account_number}
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div> */}
          <div className="flex flex-col my-3">
            <label className="">Description</label>
            <input
              name="description"
              onChange={handleChange}
              value={dataInput.description}
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="">Upload</label>
            <input
              accept="image/*"
              id="icon-button-file"
              onChange={(e) => submitImage(e)}
              type="file"
              className="p-2 border border-gray-400 rounded-md focus:outline-blue"
            />
          </div>
          <CancelPoTable dataOrder={dataOrder} />
          <hr />
          <div className="text-center mt-3">
            <button
              className="bg-blue-400 text-white p-1 rounded-md px-5 "
              disabled={loading}
              onClick={cancel}>
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
