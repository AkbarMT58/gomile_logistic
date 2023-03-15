import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  Typography,
  Modal,
  Fade,
  Box,
  Backdrop,
} from "@mui/material";
import { changeReportSupplier } from 'service/api';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: "auto",
  bgcolor: '#f8f8f8',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const ChangeSupplierModal = ({ idOrder, status, issue, setUpdate, isProductDevelopment }) => {
  const initialState = {
    find_new_supplier: 'yes',
    id_so: idOrder,
    link: '',
    bukti: {
      url: ''
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDataPayload(initialState)
    setOpen(false);
  }
  const [dataPayload, setDataPayload] = useState(initialState)
  
  const handleUploadImages = async (e) => {
    const imageInput = e.target.files[0];

    let formData = new FormData();
    formData.append('gambar', imageInput);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const resultResponse = await response.json();
    if (resultResponse?.status === 200) {
        setDataPayload((prev) => {return {...prev, bukti: {...prev.bukti, url: resultResponse?.file}}})
    } else {
      swal('Oops', `${resultResponse?.message}`, 'error');
    }
  };

  const handleSubmitChangeSupplier = async () => {
    const response = await changeReportSupplier(JSON.stringify(dataPayload))
    if (response.status === 200) {
      setUpdate((prev) => !prev);
      handleClose()
    }
  }

  const changeFindNewSupplier = (e) => {
    if(e.target.value === 'no') {
      setDataPayload((prev) => {return {...prev, find_new_supplier: e.target.value, link: '', bukti: {url: ''}}})
    } else {
      setDataPayload((prev) => {return {...prev, find_new_supplier: e.target.value}})
    }
  }
  
  return (
    <>
      <button
        className={`${status == 'paid' ? 'bg-gray-300 text-white' : 'border text-blue-500 border-blue-500'} py-2 px-5 border text-blue-500 border-blue-500 rounded-md text-center cursor-pointer whitespace-nowrap`}
        onClick={() => {
          handleOpen();
        }}
        // disabled={status !== 'paid'}
      >
        {isProductDevelopment ? "Solve Issue" : "Change Supplier"}
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
          {isProductDevelopment &&
          <>
            <Typography id='modal-modal-title' variant='h4' component='h2'>
              Solve Issue
            </Typography>

            <div className='space-y-2 bg-white p-3 rounded-lg border mb-3'>
              <div className="flex justify-between gap-x-2 items-center">
                  <div className="w-1/3 shrink-0 flex justify-between">
                      Find New Supplier?
                      <span className='font-bold'>:</span>
                  </div>
                  <div className="w-full px-2 py-1">
                      <select value={dataPayload.find_new_supplier} className='w-24 outline-none border rounded-lg' onChange={(e) => changeFindNewSupplier(e)}>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                      </select>
                  </div>
              </div>
            </div>
          </>
          }
          {dataPayload.find_new_supplier === 'yes' &&
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Change Supplier
            </Typography>
            
            <div className='space-y-2 bg-white p-3 rounded-lg border mb-3'>
              {/* <div className="flex justify-between gap-x-2 items-center">
                  <div className="w-1/3 shrink-0 flex justify-between">
                      Previous Supplier
                      <span className='font-bold'>:</span>
                  </div>
                  <div className="w-full flex justify-between border rounded-md px-2 py-1">
                      <input placeholder='Link Supplier Lama' className='w-full' />
                  </div>
              </div> */}
              <div className="flex justify-between gap-x-2 items-center">
                  <div className="w-1/3 shrink-0 flex justify-between">
                      New Supplier
                      <span className='font-bold'>:</span>
                  </div>
                  <div className="w-full flex justify-between border rounded-md px-2 py-1">
                      <input value={dataPayload.link} placeholder='Masukkan Link Supplier Baru' className='w-full outline-none' onChange={(e) => setDataPayload((prev) => {return {...prev, link: e.target.value}})} />
                  </div>
              </div>
              <div className="flex justify-between gap-x-2 items-center">
                  <div className="w-1/3 shrink-0 flex justify-between">
                      Attachment*
                      <span className='font-bold'>:</span>
                  </div>
                  <div className="w-full flex space-x-3 px-2 py-1">
                      <label htmlFor="attachment" className='text-white px-3 rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer'>Upload</label>
                      <input
                          id='attachment'
                          type='file'
                          onChange={handleUploadImages}
                          className='hidden'
                          placeholder='Masukkan Link Supplier Baru'
                      />
                      <div className="w-64 line-clamp-1 text-sm text-gray-500 italic" title={dataPayload.bukti.url}>
                        {dataPayload.bukti.url ?? ''}
                      </div>
                  </div>
              </div>
            </div>
          </>
          }
          <div className="flex justify-end items-center">
              <div className="bg-blue-500 text-white hover:bg-blue-600 px-3 rounded-md cursor-pointer" onClick={handleSubmitChangeSupplier}>Submit</div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ChangeSupplierModal;
