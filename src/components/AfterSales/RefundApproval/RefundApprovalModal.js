import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { submitRefundApporvalData } from 'service/api';
import swal from 'sweetalert';
import RefundApprovalModalTable from './RefundApprovalModalTable';

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

export default function RefundApprovalModal({ setUpdate, rowData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputData, setInputData] = useState({
    approve: false,
    reject: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'approve') {
      setInputData({ approve: checked, reject: false });
    } else {
      setInputData({ approve: false, reject: checked });
    }
  };

  const submitRefund = async () => {
    const body = JSON.stringify({
      id_refund: rowData.id_refund,
      refund: inputData.approve ? inputData.approve : false,
      id_so: rowData.id_so,
    });

    if (!inputData.approve && !inputData.reject) {
      swal('Oops', 'Please check approve or reject before submit !', 'error');
    } else {
      const data = await submitRefundApporvalData(body);
      if (data?.status === 200) {
        swal('Success', 'Payment submitted successfully !', 'success');
        setUpdate((prev) => !prev);
      }
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
            Refund Approval
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
                <label>Total Refund</label>
                <input
                  type="text"
                  defaultValue={rowData.total}
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
                <label>Total QTY</label>
                <input
                  type="number"
                  defaultValue={rowData.totalQty}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                />
              </div>
              <div className="flex justify-start items-center space-x-5">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="approve"
                    onChange={handleChange}
                    checked={inputData.approve}
                    style={{ width: 20, height: 20 }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                  />
                  <label>Approve</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    name="reject"
                    checked={inputData.reject}
                    style={{ width: 20, height: 20 }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                  />
                  <label>Reject</label>
                </div>
              </div>
            </div>
            <div>
              <RefundApprovalModalTable dataProduct={rowData.product} />
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
