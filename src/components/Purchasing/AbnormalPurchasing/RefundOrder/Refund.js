import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { refundAbnormal } from 'service/api';
import RefundOrderTable from './RefundOrderTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const dataReason = [
  'Out of Stock',
  'Price',
  'Customer Cancel',
  'Not Reaching MOQ',
];

export default function Refund({
  id,
  invoice,
  dataOrder,
  email,
  setUpdate,
  setCheckRow,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const [dataInput, setDataInput] = useState({
    reason: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getTotal = () => {
    let initial = 0;
    const total = dataOrder
      .map((data) => data.qty * data.customer_buy)
      .reduce((prev, current) => prev + current, initial);
    return total;
  };

  const submitRefundOrder = async () => {
    setLoading(true);
    const body = JSON.stringify({
      ...dataInput,
      invoice,
      id_so: id,
      email,
      totalRefund: getTotal(),
      product: dataOrder.map((data) => {
        return {
          id_product: data.id_product,
          id_abnormal: data.id_abnormal,
          qty: data.qty,
          value: data.customer_buy,
          status: data.status,
        };
      }),
    });

    const validateStatus =
      dataOrder.filter((data) => data.status === '').length > 0;

    if (validateStatus) {
      swal('Oops', 'Please select status before submit !', 'error');
      setLoading(false);
      return;
    }
    if (dataInput.reason && dataInput.description && !validateStatus) {
      const data = await refundAbnormal(body);
      if (data?.status === 200) {
        swal('Success', 'Refund order submitted successfuly', 'success');
        handleClose();
        setUpdate((prev) => !prev);
        setLoading(false);
      }
    } else {
      swal('Oops', 'Input not valid !', 'error');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="p-2 text-blue-500 bg-white border border-blue-500 rounded-md w-32"
        onClick={() => handleOpen()}
        disabled={dataOrder.length === 0}>
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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Detail Order : {id}
          </Typography>
          <div className="flex">
            <div className="w-1/2 space-y-3 my-5">
              <div className="flex items-center space-x-2">
                <label className="font-semibold w-1/4">Reason</label>
                <select
                  name="reason"
                  value={dataInput.reason}
                  onChange={handleChange}
                  className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4">
                  <option value="" disabled>
                    Select Reason
                  </option>
                  {dataReason.map((data, idx) => (
                    <option key={idx} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-semibold w-1/4">Description</label>
                <input
                  type="text"
                  name="description"
                  value={dataInput.description}
                  onChange={handleChange}
                  className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-semibold w-1/4">Total Refund</label>
                <input
                  disabled
                  defaultValue={getTotal()}
                  className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                />
              </div>
            </div>
          </div>
          <RefundOrderTable
            refundData={dataOrder}
            setRefundData={setCheckRow}
          />
          <hr className="mt-5" />
          <div className="flex justify-center mt-5">
            <button
              className={`text-white p-2 px-4 ${
                loading ? 'bg-gray-500' : 'bg-red-500'
              } rounded-md`}
              disabled={loading}
              onClick={submitRefundOrder}>
              Refund
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
