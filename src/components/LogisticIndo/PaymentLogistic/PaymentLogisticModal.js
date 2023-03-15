import { useState } from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PaymentLogisticModalTable from './PaymentLogisticModalTable';
import { submitPaymentLogisticData } from 'service/api';
import swal from 'sweetalert';
// import {
//   getCity,
//   getListCourier,
//   getProvince,
//   getSubdistrict,
//   sendProductToCustomer,
// } from "service/api";
// import swal from "sweetalert";

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

export default function PaymentLogisticModal({
  paymentData,
  dataBox,
  setUpdate,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputData, setInputData] = useState({
    totalPayment: paymentData.totalPayment,
    resi: '',
    image: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  let data = [];
  for (let index = 0; index < dataBox.length; index++) {
    data.push(
      ...dataBox[index].product.map((data) => {
        return { ...data, id_carton: dataBox[index].id_carton };
      })
    );
  }

  const submitPayment = async () => {
    const body = JSON.stringify({
      id_so: paymentData.id_so,
      id_sj: paymentData.id_sj,
      image: inputData.image,
      resi: inputData.resi,
      totalPayment: inputData.totalPayment,
      weight: paymentData.weight,
      box: dataBox.map((data) => data.id_carton),
    });

    if (inputData.image && inputData.resi && inputData.totalPayment) {
      const data = await submitPaymentLogisticData(body);
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
          if (paymentData.status === 'Unpaid') {
            handleOpen();
          } else {
            swal('Oops', 'Logistics already paid !', 'error');
          }
        }}>
        Pay
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
                <label>Letter Number</label>
                <input
                  type="text"
                  defaultValue={paymentData.id_sj}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Order Number</label>
                <input
                  type="text"
                  defaultValue={paymentData.id_so}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Logistic Channel</label>
                <input
                  type="text"
                  defaultValue={paymentData.courier.toUpperCase()}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Service</label>
                <input
                  type="text"
                  defaultValue={paymentData.service}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Weight (GRAM)</label>
                <input
                  type="text"
                  defaultValue={paymentData.weight}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Total Payment</label>
                <input
                  type="text"
                  name="totalPayment"
                  value={inputData.totalPayment}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Courier Invoice</label>
                <input
                  type="text"
                  name="resi"
                  value={inputData.resi}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Upload Payment Receipt</label>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  onChange={(e) => submitImage(e)}
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <PaymentLogisticModalTable dataProduct={data} />
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitPayment}
                className="text-white bg-blue-500 px-5 py-1 rounded-md">
                SUBMIT
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
