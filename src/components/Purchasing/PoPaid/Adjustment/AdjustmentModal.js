import { useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import { sendAdjustmentPo } from 'service/api';
import swal from 'sweetalert';
import AdjustmenTable from './AdjustmentTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};
export default function AdjustmentModal({ dataOrder, id_so, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState('');
  const [sendInvoice, setSendInvoice] = useState(false);
  const [inputRow, setInputRow] = useState(
    dataOrder.map((data) => {
      return {
        id_product: data.idProduk,
        maxQty: data.qty,
        maxPrice: data.highestPrice,
        highestPrice: '',
        quantity: '',
        note: '',
        isChecked: false,
      };
    })
  );
  const [adjustment, setAdjustment] = useState({
    type: 'Additional Logistic',
    value: '',
    reason: '',
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
          setImage(data.file);
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitAdjustment = async () => {
    const productData = inputRow
      .filter((data) => data.isChecked === true)
      .map((input) => {
        return {
          id_product: input.id_product,
          addQty: Number(input.quantity),
          addPrice: Number(input.highestPrice),
        };
      });

    const validateChecklist = productData.length > 0;
    const validateInputCheckedProduct =
      productData.filter((data) => data.addQty || data.addPrice).length > 0;

    if (!validateChecklist) {
      swal('Oops', 'Please select at least 1 product !', 'error');
      return;
    }

    if (!validateInputCheckedProduct) {
      swal('Oops', 'Please fill updated data !', 'error');
      return;
    }
    const { type, value, reason } = adjustment;

    if (type && value && reason && image) {
      const body = JSON.stringify({
        id_so,
        type,
        value: Number(value),
        reason,
        currency: 'RMB',
        proof: image,
        sendEmail: `${sendInvoice}`,
        product: productData,
      });

      const data = await sendAdjustmentPo(body);
      if (data?.status === 200) {
        swal('Success', 'Adjustment submitted successfully', 'success');
        handleClose();
        setAdjustment({
          type: 'Additional Logistic',
          value: '',
          reason: '',
        });
        setImage('');
        setSendInvoice(false);
        setUpdate((prev) => !prev);
      }
    } else {
      swal('Oops', 'Please fill all adjustment input before submit!', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdjustment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div
        className="py-2 px-5 border text-blue-500  border-blue-500 rounded-md text-center cursor-pointer"
        onClick={() => {
          handleOpen();
        }}>
        Adjustment
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
            Adjustment
          </Typography>
          <div className="space-y-5 mt-5 mb-10 w-2/3">
            <div className="flex items-center space-x-4">
              <label className="w-1/3">Adjustment For </label>
              <select
                className="p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3"
                name="type"
                value={adjustment.type}
                onChange={handleChange}>
                <option value="Additional Logistic">Additional Logistic</option>
                <option value="Additional Purchasing">
                  Additional Purchasing
                </option>
                <option value="Change Variant">Change Variant</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3">Value (RMB)</label>
              <input
                type="number"
                name="value"
                value={adjustment.value}
                onChange={handleChange}
                className="p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/3">Choose file</label>
              <input
                accept="image/*"
                id="icon-button-file"
                onChange={(e) => submitImage(e)}
                type="file"
                className="p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3"
              />
            </div>
            <div className="flex space-x-4">
              <label className="w-1/3">Reason</label>
              <div className="w-2/3">
                <textarea
                  rows="5"
                  className="p-1 border border-gray-400 rounded-md focus:outline-blue w-full"
                  name="reason"
                  value={adjustment.reason}
                  onChange={handleChange}
                />
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    name="sendInvoice"
                    checked={sendInvoice}
                    style={{ width: '16px', height: '16px' }}
                    onChange={() => setSendInvoice(!sendInvoice)}
                  />
                  <label>Send Invoice to customer</label>
                </div>
              </div>
            </div>
          </div>
          <AdjustmenTable
            dataOrder={dataOrder}
            inputRow={inputRow}
            setInputRow={setInputRow}
          />

          <div className="text-center mt-5">
            <hr />
            <button
              className="bg-blue-400 text-white p-1 rounded-md px-5 mt-5"
              onClick={submitAdjustment}>
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
