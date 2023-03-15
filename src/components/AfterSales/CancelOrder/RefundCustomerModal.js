import { useState } from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { submitRefundCustomerData } from 'service/api';
import swal from 'sweetalert';
import RefundCustomerModalTable from './RefundCustomerModalTable';
// import FormActualPriceModalTable from "./FormActualPriceModalTable";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function RefundCustomerModal({ setUpdate, rowData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputData, setInputData] = useState({
    totalPrice: rowData.total,
    totalRefund: '',
    bank: '',
    rekening: '',
    description: '',
    image: '',
    checkeRefund: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
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
          setInputData({ ...inputData, image: data.file });
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitRefund = async () => {
    const body = JSON.stringify({
      id_so: rowData.id_so,
      id_refund: rowData.id_refund,
      proof: inputData.image,
      account_number: inputData.rekening,
      bank: inputData.bank,
      total: inputData.totalRefund,
      description: inputData.description,
    });

    if (
      inputData.image &&
      inputData.rekening &&
      inputData.bank &&
      inputData.totalRefund
    ) {
      const data = await submitRefundCustomerData(body);
      if (data?.status === 200) {
        swal('Success', 'Payment submitted successfully !', 'success');
        setUpdate((prev) => !prev);
      }
    } else {
      swal('Oops', 'Please complete all input fields', 'error');
    }
  };

  return (
    <div>
      <button
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center w-full"
        onClick={() => {
          handleOpen();
        }}>
        Refund
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
            Payment
          </Typography>
          <div className="mt-3 space-y-3">
            <div className="space-y-3">
              <div>
                <label>Order Number</label>
                <input
                  type="text"
                  defaultValue={rowData.id_so}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Total Order</label>
                <input
                  type="text"
                  defaultValue={rowData.totalOrder}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>PO Number</label>
                <input
                  type="text"
                  defaultValue={rowData.id_po}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Total QTY)</label>
                <input
                  type="number"
                  min="0"
                  defaultValue={rowData.totalQty}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Total Price</label>
                <input
                  type="number"
                  min="0"
                  defaultValue={rowData.total}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Total Refund</label>
                <input
                  type="number"
                  min="0"
                  name="totalRefund"
                  value={inputData.totalRefund}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Bank</label>
                <input
                  type="text"
                  name="bank"
                  value={inputData.bank}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Bank Account</label>
                <input
                  type="number"
                  min="0"
                  name="rekening"
                  value={inputData.rekening}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={inputData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div>
                <label>Upload</label>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  onChange={(e) => submitImage(e)}
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
            </div>
            <div>
              <RefundCustomerModalTable dataProduct={rowData.product} />
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitRefund}
                className="text-white bg-blue-500 px-5 py-1 rounded-md focus:outline-blue">
                SUBMIT
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
