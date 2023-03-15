import { useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import {
  getDetailPoRefund,
  getDetailProductData,
  submitRefundApprovalData,
} from 'service/api';
import MakeRefundApprovalTable from './MakeRefundApprovalTable';
import swal from 'sweetalert';
import MakeRefundApprovalTableAll from './MakeRefundApprovalTableAll';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  maxHeight: 650,
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

export default function MakeRefund({ setUpdate }) {
  const [open, setOpen] = useState(false);
  const [dataPo, setDataPo] = useState({});
  const [dataInput, setDataInput] = useState({
    id_so: '',
    invoice: '',
    bank: '',
    reason: '',
    description: '',
    account_number: '',
    account_name: '',
    totalRefund: '',
    product: [],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detailProduct, setDetailProduct] = useState([]);

  const getDetailPo = async (inputId) => {
    const data = await getDetailPoRefund(inputId);

    if (data.status === 200) {
      if (data.data.status === 'new_order') {
        setDataPo({ email: data.data.email, status: data.data.status });
        setDetailProduct(data.data.product);
      } else {
        setDataPo({
          email: data.data.email,
          status: data.data.status,
          data: data.data.data,
        });
      }
    } else {
      swal('Oops', data.message, 'error');
    }
  };

  const getDetailProduct = async (id_so, id_po) => {
    const data = await getDetailProductData(id_so, id_po);
    if (data?.status === 200) {
      setDetailProduct(data.data.product);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id_so') {
      setDataPo((prev) => {
        return { ...prev, status: false };
      });
      setDataInput(() => {
        return {
          invoice: '',
          bank: '',
          reason: '',
          rekening: '',
          // totalRefund: "",
          product: [],
          [name]: value,
        };
      });
      setDetailProduct([]);
    } else if (name === 'invoice') {
      setDataInput((prev) => {
        return {
          ...prev,
          bank: '',
          reason: '',
          rekening: '',
          totalRefund: '',
          product: [],
          [name]: value,
        };
      });
      getDetailProduct(dataInput.id_so, value);
    } else {
      setDataInput((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const submitRefund = async () => {
    const validateQty = dataInput.product.filter(
      (data) => parseInt(data.qty) > parseInt(data.maxQty)
    );
    const validatePrice = dataInput.product.filter(
      (data) => parseInt(data.price) > parseInt(data.maxPrice)
    );

    const productNewOrder = dataInput.product
      .filter((data) => data.isChecked)
      .map((data) => {
        return {
          id_product: data.id_product,
          qty: data.qty,
          price: data.buyprice,
          status: data.status,
          reason: data.reason,
        };
      });

    const productPo = dataInput.product.map((data) => {
      return {
        id_product: data.id_product,
        qty: data.qty,
        price: data.buyprice,
        status: data.status,
        reason: data.reason,
      };
    });

    const dataSubmit = {
      id_so: dataInput.id_so,
      email: dataPo.email,
      invoice: dataInput.invoice,
      bank: dataInput.bank,
      reason: dataInput.reason,
      account_number: dataInput.account_number,
      account_name: dataInput.account_name,
      totalRefund: dataInput.totalRefund,
      description: dataInput.description,
      product: dataPo.status === 'new_order' ? productNewOrder : productPo,
    };

    const validateProduct = dataSubmit.product.filter(
      (data) =>
        data.qty === '' ||
        data.price === '' ||
        data.status === '' ||
        data.id_product === '' ||
        data.reason === ''
    );

    if (validateProduct.length !== 0) {
      swal('Oops', 'Product input not valid !', 'error');
      return;
    }
    if (validateQty.length !== 0) {
      swal('Oops', 'Quantity over the limit !', 'error');
      return;
    }

    if (validatePrice.length !== 0) {
      swal('Oops', 'Price over the limit !', 'error');
      return;
    }

    const body = JSON.stringify(dataSubmit);
    if (dataPo.status === 'new_order') {
      if (dataInput.reason && dataInput.bank && dataInput.account_number) {
        const data = await submitRefundApprovalData(body);
        if (data?.status === 200) {
          swal('Success', 'Refund submitted successfully', 'success');
          setUpdate((prev) => !prev);
          handleClose();
        }
        if (data?.status === 409) {
          swal('Success', 'PO number already refund !', 'error');
        }
      } else {
        swal('Oops', 'Input not valid !', 'error');
      }
    } else {
      if (dataInput.invoice && dataInput.bank && dataInput.account_number) {
        const data = await submitRefundApprovalData(body);
        if (data?.status === 200) {
          swal('Success', 'Refund submitted successfully', 'success');
          setUpdate((prev) => !prev);
          handleClose();
        }
        if (data?.status === 409) {
          swal('Success', 'PO number already refund !', 'error');
        }
      } else {
        swal('Oops', 'Input not valid !', 'error');
      }
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md"
        onClick={handleOpen}>
        Make Refund
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
            Refund
          </Typography>
          <div className="flex flex-col my-5">
            <div className="w-1/2">
              <div className="flex items-center justify-between">
                <label className="font-semibold w-1/4">Order Number</label>
                <input
                  type="text"
                  name="id_so"
                  value={dataInput.id_so}
                  onChange={handleChange}
                  className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                />
                <div>
                  <button
                    onClick={() => getDetailPo(dataInput.id_so)}
                    className="p-1 px-2 bg-blue-500 text-white rounded-md ">
                    Add Refund
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {dataPo.status && (
            <div className="flex">
              <div className="w-1/2 space-y-3 my-5">
                {dataPo.status === 'new_order' && (
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
                      {dataReason.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </select>
                  </div>
                )}

                {dataPo.status === 'refund_po' && (
                  <div className="flex items-center space-x-2">
                    <label className="font-semibold w-1/4">Choose PO</label>
                    <select
                      name="invoice"
                      value={dataInput.invoice}
                      onChange={handleChange}
                      className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4">
                      <option value="" disabled>
                        Select PO
                      </option>
                      {dataPo?.data?.map((data) => (
                        <option value={data.id_po} disabled={!data.canRefund}>
                          {data.id_po}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                    onChange={handleChange}
                    name="totalRefund"
                    type="number"
                    value={dataInput.totalRefund}
                    className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                  />
                </div>
              </div>

              <div className="w-1/2 space-y-3 my-5">
                <div className="flex items-center space-x-2">
                  <label className="font-semibold w-1/4">Bank</label>
                  <input
                    type="text"
                    name="bank"
                    value={dataInput.bank}
                    onChange={handleChange}
                    className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="font-semibold w-1/4">Account Name</label>
                  <input
                    type="text"
                    name="account_name"
                    value={dataInput.account_name}
                    onChange={handleChange}
                    className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="font-semibold w-1/4">Account Number</label>
                  <input
                    type="number"
                    name="account_number"
                    value={dataInput.account_number}
                    onChange={handleChange}
                    className="p-1 rounded-md border border-gray-300 focus:outline-blue w-2/4"
                  />
                </div>
              </div>
            </div>
          )}

          {dataInput.invoice && (
            <>
              <hr />
              <MakeRefundApprovalTable
                dataProduct={detailProduct}
                id_so={dataInput.id_so}
                setDataInput={setDataInput}
              />
              <hr />
              <div className="flex justify-end mt-3">
                <button
                  className="bg-blue-500 text-white py-2 px-3 rounded-md"
                  onClick={submitRefund}>
                  Submit
                </button>
              </div>
            </>
          )}

          {dataPo.status === 'new_order' && (
            <>
              <MakeRefundApprovalTableAll
                dataProduct={detailProduct}
                id_so={dataInput.id_so}
                setDataInput={setDataInput}
              />
              <hr />
              <div className="flex justify-end mt-3">
                <button
                  className="bg-blue-500 text-white py-2 px-3 rounded-md"
                  onClick={submitRefund}>
                  Submit
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
