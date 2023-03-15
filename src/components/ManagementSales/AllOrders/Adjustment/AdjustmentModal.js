import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import { getProductAllOrder, postAdjustment } from 'service/api';
import swal from 'sweetalert';
import AdjustmentTable from './AdjustmentTable';

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

const AdjustmentModal = ({ idOrder, status }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sendInvoice, setSendInvoice] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateTotal, setUpdateTotal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adjustment, setAdjustment] = useState({
    type: 'Additional Logistic',
    value: '',
    destination_account: '',
    reason: '',
    asuransi: 0,
    inspeksi: 0,
    packingKayu: 0,
    ongkir_international: 0,
  });

  const GetDataProduct = async () => {
    const response = await getProductAllOrder(idOrder);
    if (response?.status === 200) {
      const data = response?.data?.map((item) => {
        item.is_checked = false;
        item.addQty = 0;
        item.actualQty = item.qty;
        item.addPrice = 0;
        return item;
      });

      setDataProduct(data);
    } else {
      setDataProduct([]);
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
          setImage(data.file);
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        swal('Oops', error, 'error');
      });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setUpdateTotal((prev) => !prev);
    setAdjustment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitAdjustment = async () => {
    const { asuransi, inspeksi, packingKayu, ongkir_international } =
      adjustment;
    const product = dataProduct.filter((item) => item.is_checked);
    const modifyDataProduct = product.map((obj) => {
      return {
        ...obj,
        addPrice: parseFloat(obj.addPrice),
        addQty: Number(obj.addQty),
      };
    });

    const payload = {
      id_so: idOrder,
      type: adjustment.type,
      value: parseInt(adjustment.value),
      reason: adjustment.reason,
      proof: image,
      sendEmail: sendInvoice,
      product: modifyDataProduct,
      destination_account: adjustment.destination_account,
      asuransi: Number(asuransi),
      inspeksi: Number(inspeksi),
      packing_kayu: Number(packingKayu),
      ongkir_international: Number(ongkir_international),
      totalPrice,
    };

    setLoading(true);
    const response = await postAdjustment(JSON.stringify(payload));
    if (response?.status === 200) {
      swal('Success', 'Adjustment submitted successfully', 'success');
      handleClose();
      setLoading(false);
    } else {
      swal('error', response?.message, 'error');
      setLoading(false);
    }
  };

  const handleSumTotalPrice = (dataProduct) => {
    const dataProductPriceNumber = dataProduct.filter((data) => {
      return data?.addPrice !== 0;
    });
    const dataProductSelected = dataProductPriceNumber.filter((data) => {
      return data?.is_checked === true;
    });
    const dataProductNumber = dataProductSelected.map((data) => {
      return {
        ...data,
        addPrice: parseFloat(data.addPrice),
      };
    });
    const sumProductPrice = dataProductNumber.reduce(
      (prev, current) => prev + current?.addPrice,
      0
    );

    return sumProductPrice;
  };

  useEffect(() => {
    if (open) {
      GetDataProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const sumPrice = handleSumTotalPrice(dataProduct);

    setTotalPrice(
      Number(adjustment?.asuransi) +
        Number(adjustment?.inspeksi) +
        Number(adjustment?.packingKayu) +
        Number(adjustment?.ongkir_international) +
        Number(sumPrice)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTotal]);

  return (
    <>
      <button
        className={`py-2 px-5  ${
          status !== 'paid'
            ? 'bg-gray-300 text-white'
            : 'border text-blue-500 border-blue-500'
        } rounded-md text-center cursor-pointer`}
        onClick={() => {
          handleOpen();
        }}
        disabled={status !== 'paid'}>
        Adjustment
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style} className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-end -mt-5'>
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Adjustment
          </Typography>
          <div className='space-y-5 mt-5 mb-10 w-2/3'>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3'>Adjustment For </label>
              <select
                className='p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3'
                name='type'
                value={adjustment.type}
                onChange={handleChange}>
                <option value='Additional Logistic'>Additional Logistic</option>
                <option value='Additional Purchasing'>
                  Additional Purchasing
                </option>
                <option value='Change Variant'>Change Variant</option>
              </select>
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3'>Destination Account </label>
              <select
                className='p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3'
                name='destination_account'
                value={adjustment.destination_account}
                onChange={handleChange}>
                <option value=''>Choose your destination account</option>
                <option value='BCA Ocommerce (277 050 5006)'>
                  BCA Ocommerce (277 050 5006)
                </option>
                <option value='BCA Ocommerce (277 269 8080)'>
                  BCA Ocommerce (277 269 8080)
                </option>
                <option
                  value='BRI Ocommerce (0520 01 000285 30 1)
'>
                  BRI Ocommerce (0520 01 000285 30 1)
                </option>
                <option
                  value='BCA Guntur (647 051 4289)
'>
                  BCA Guntur (647 051 4289)
                </option>
              </select>
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3 capitalize'>biaya asuransi</label>
              <div className='flex flex-col  w-2/3'>
                <input
                  value={adjustment.asuransi}
                  onChange={handleChange}
                  name='asuransi'
                  type='number'
                  className='w-full p-1 border border-gray-400 rounded-md focus:outline-blue'
                />
                <div className='text-xs text-red-600 pl-2'>
                  *Kosongkan apabila tidak menggunakan
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3 capitalize'>biaya inspeksi</label>
              <div className='flex flex-col  w-2/3'>
                <input
                  value={adjustment.inspeksi}
                  onChange={handleChange}
                  name='inspeksi'
                  type='number'
                  className='w-full p-1 border border-gray-400 rounded-md focus:outline-blue'
                />
                <div className='text-xs text-red-600 pl-2'>
                  *Kosongkan apabila tidak menggunakan
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3 capitalize'>biaya packing kayu</label>
              <div className='flex flex-col  w-2/3'>
                <input
                  value={adjustment.packingKayu}
                  onChange={handleChange}
                  name='packingKayu'
                  type='number'
                  className='w-full p-1 border border-gray-400 rounded-md focus:outline-blue'
                />
                <div className='text-xs text-red-600 pl-2'>
                  *Kosongkan apabila tidak menggunakan
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3 capitalize'>Ongkir International</label>
              <div className='flex flex-col  w-2/3'>
                <input
                  value={adjustment.ongkir_international}
                  onChange={handleChange}
                  name='ongkir_international'
                  type='number'
                  className='w-full p-1 border border-gray-400 rounded-md focus:outline-blue'
                />
                <div className='text-xs text-red-600 pl-2'>
                  *Kosongkan apabila tidak menggunakan
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3'>Total Adjustment (IDR)</label>
              <input
                type='text'
                value={totalPrice.toLocaleString('id-ID')}
                disabled
                onChange={handleChange}
                className='p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3'
              />
            </div>
            <div className='flex items-center space-x-4'>
              <label className='w-1/3'>Choose file</label>
              <input
                accept='image/*'
                id='icon-button-file'
                onChange={(e) => submitImage(e)}
                type='file'
                className='p-1 border border-gray-400 rounded-md focus:outline-blue w-2/3'
              />
            </div>
            <div className='flex space-x-4'>
              <label className='w-1/3'>Reason</label>
              <div className='w-2/3'>
                <textarea
                  rows='5'
                  className='p-1 border border-gray-400 rounded-md focus:outline-blue w-full'
                  name='reason'
                  value={adjustment.reason}
                  onChange={handleChange}
                />
                <div className='flex items-center space-x-2 mt-2'>
                  <input
                    type='checkbox'
                    name='sendInvoice'
                    checked={sendInvoice}
                    style={{ width: '16px', height: '16px' }}
                    onChange={() => setSendInvoice(!sendInvoice)}
                  />
                  <label>Send Invoice to customer</label>
                </div>
              </div>
            </div>
          </div>
          <AdjustmentTable
            dataOrder={dataProduct}
            updateTotal={updateTotal}
            setUpdateTotal={setUpdateTotal}
            setDataProduct={setDataProduct}
          />

          <div className='text-center mt-5'>
            <hr />
            <button
              className='bg-blue-400 text-white p-1 rounded-md px-5 mt-5'
              onClick={submitAdjustment}
              disabled={loading}>
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AdjustmentModal;
