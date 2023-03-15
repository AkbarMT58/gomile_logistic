/* eslint-disable array-callback-return */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress, IconButton } from '@mui/material';
import swal from 'sweetalert';
import CloseIcon from '@mui/icons-material/Close';
import { checkLinkAddVariant, postAddVariant } from 'service/api';
import VariantProduct from './VariantProduct';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const AddVariantModal = ({ idOrder }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [response, setResponse] = useState(false);
  const [checkResult, setCheckResult] = useState({});
  const [variant, setVariant] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [payload, setPayload] = useState({
    id_so: '',
    type: 'Add Variant',
    value: 0,
    reason: '',
    proof: '',
    sendEmail: false,
    destination_account: '',
    id_request: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkRequestLink = async (link, id) => {
    setLoading(true);
    const body = JSON.stringify({ url: link, id_so: String(id) });
    const data = await checkLinkAddVariant(body);
    if (data?.status === 200) {
      setPayload({ ...payload, id_request: data?.id_request });
      data.PropSku.map((item, index) => {
        item.children.map((child) => {
          child.is_checked = false;
        });
        item.is_check_all = false;
        if (index === 0) {
          item.is_selected = true;
        } else {
          item.is_selected = false;
        }
      });

      setVariant(data?.PropSku);
      setCheckResult(data);
      setResponse(true);
    } else {
      setResponse(false);
    }
    // if (data?.status === 400) {
    //   swal('Oops', 'Invalid url input !', 'error');
    // }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
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
          setPayload({ ...payload, proof: data.file });
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    let product = [];
    for (let i = 0; i < variant.length; i++) {
      for (let j = 0; j < variant[i].children.length; j++) {
        if (
          variant[i].children[j].is_checked &&
          variant[i].children[j].qty !== 0
        ) {
          product.push({
            id_product: variant[i].children[j].properties,
            addQty: variant[i].children[j].qty,
          });
        }
      }
    }

    if (product.length === 0) {
      swal('Oops', 'Please select minimum 1 variant', 'error');
      setLoadingSubmit(false);
      return false;
    }

    if (payload.value < 0) {
      swal('Oops', 'Please input value', 'error');
      setLoadingSubmit(false);
      return false;
    }

    if (payload.reason.trim().length === 0) {
      swal('Oops', 'Please input reason', 'error');
      setLoadingSubmit(false);
      return false;
    }

    if (payload.destination_account.trim().length === 0) {
      swal('Oops', 'Please select destionation account', 'error');
      setLoadingSubmit(false);
      return false;
    }

    const body = JSON.stringify({ ...payload, product });
    swal({
      title: 'Are you sure?',
      text: 'Please check your request before submit',
      icon: 'warning',
      buttons: true,
    }).then(async (submit) => {
      if (submit) {
        const response = await postAddVariant(body);
        if (response.status === 200) {
          swal('Success', 'Success submit your request', 'success');
          setPayload({
            id_so: idOrder,
            type: 'Add Variant',
            value: 0,
            reason: '',
            proof: '',
            sendEmail: false,
            destination_account: '',
            id_request: '',
          });
          handleClose();
        } else {
          swal('Oops', response.message, 'error');
          setLoadingSubmit(false);
        }
      } else {
        setLoadingSubmit(false);
      }
    });
  };

  return (
    <div>
      <button
        className='w-full rounded-md bg-blue-500 p-2 text-white items-center text-sm'
        onClick={() => {
          handleOpen();
          setPayload({ ...payload, id_so: idOrder });
        }}>
        Add Variant
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
            Add Variant
          </Typography>
          <div className='my-5 text-sm'>
            <div className='flex items-center space-x-3'>
              <label className='text-lg'>Check Link</label>
              <input
                type='text'
                name='link'
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setResponse(false);
                }}
                className='border border-gray-300 focus: outline-blue rounded-md flex-grow p-2'
              />
              <button
                onClick={() => checkRequestLink(link, idOrder)}
                className='text-white bg-blue-500 p-2 rounded-md '>
                Check
              </button>
            </div>
          </div>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <div className='flex flex-col'>
                <CircularProgress />
                <p className='text-gray-500 text-sm mt-2'>Loading ...</p>
              </div>
            </Box>
          )}

          {response && (
            <div className='w-full'>
              <form className='w-full mt-5 items-center'>
                <div className='flex mt-4'>
                  <div className='w-3/12'>
                    <p className='font-semibold'>Adjustment For</p>
                  </div>
                  <div className='w-6/12'>
                    <select className='border w-full p-2 focus:outline-blue'>
                      <option>Add Variant</option>
                    </select>
                  </div>
                </div>
                <div className='flex mt-4'>
                  <div className='w-3/12'>
                    <p className='font-semibold'>Destination Account</p>
                  </div>
                  <div className='w-6/12'>
                    <select
                      className='p-2 w-full border focus:outline-blue'
                      name='destination_account'
                      onChange={handleChange}
                      value={payload.destination_account}>
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
                </div>
                <div className='flex mt-4'>
                  <div className='w-3/12'>
                    <p className='font-semibold'>Value (IDR)</p>
                  </div>
                  <div className='w-6/12'>
                    <input
                      type='number'
                      name='value'
                      onChange={handleChange}
                      className='border w-full p-2'
                      value={payload.value}
                    />
                  </div>
                </div>
                <div className='flex mt-4'>
                  <div className='w-3/12'>
                    <p className='font-semibold'>Choose file</p>
                  </div>
                  <div className='w-6/12'>
                    <input
                      accept='image/*'
                      type='file'
                      className='border w-full p-2'
                      onChange={submitImage}
                    />
                  </div>
                </div>
                <div className='flex mt-4'>
                  <div className='w-3/12'>
                    <p className='font-semibold'>Reason</p>
                  </div>
                  <div className='w-6/12'>
                    <textarea
                      className='w-full p-2 border'
                      name='reason'
                      onChange={handleChange}
                      value={payload.reason}></textarea>
                    <input
                      type='checkbox'
                      checked={payload.sendEmail}
                      onChange={(e) =>
                        setPayload({ ...payload, sendEmail: e.target.checked })
                      }
                    />
                    <span className='ml-3'>Send Invoice to Customer</span>
                  </div>
                </div>
              </form>
              <p className='font-semibold mt-3 text-md'>Pilih Variant :</p>
              <VariantProduct
                variant={variant}
                setVariant={setVariant}
                isAirPlane={checkResult.is_airplane}
              />
              <div className='w-full text-center mt-5'>
                <button
                  type='button'
                  disabled={loadingSubmit}
                  onClick={handleSubmit}
                  className={`${
                    loadingSubmit ? 'bg-gray-300' : 'bg-blue-400'
                  } text-white rounded-md px-10 py-2`}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddVariantModal;
