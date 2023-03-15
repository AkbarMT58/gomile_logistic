import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputSalesRequest from './InputSalesRequest';
import { assignRequestToList, checkLinkRequest } from 'service/api';
import DetailRequestResult from './DetailRequestResult';
import swal from 'sweetalert';
import SelectVariant from './SelectVariant';
import InputSalesRequestAutoDev from './InputSalesRequestAutoDev';
import SelectVariantAutoDev from './SelectVariantAutoDev';
import SelectDraftOrder from './SelectDraftOrder';
import { ModuleCustomVariant } from './ModuleCustomVariant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function InitRequest({ setUpdate }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [link, setLink] = useState('');
  const [response, setResponse] = useState(false);
  const [checkResult, setCheckResult] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkRequestLink = async (link) => {
    setLoading(true);
    const body = JSON.stringify({ link });
    const data = await checkLinkRequest(body);
    if (data?.status === 200) {
      setCheckResult(data.data);
      setResponse(true);
      if (data.data.type === 'auto') {
        setCustom(true);
      } else {
        setCustom(false);
      }
    }
    if (data?.status === 400) {
      swal('Oops', 'Invalid url input !', 'error');
    }
    setLoading(false);
  };

  const assignToMyList = async (link) => {
    const body = JSON.stringify({ link });
    const data = await assignRequestToList(body);
    if (data?.status === 200) {
      swal('Succes', 'Data added to list successfully', 'success');
      handleClose();
      setUpdate((prev) => !prev);
      setResponse(false);
      setLink('');
    }
  };

  return (
    <div>
      <button
        className='rounded-md bg-blue-500 p-2 text-white flex items-center space-x-1 text-sm'
        onClick={() => {
          handleOpen();
        }}>
        <AddCircleIcon style={{ fontSize: 18 }} /> <span>Add Request</span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style} className='overflow-y-scroll variant-scroll'>
          <>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Input Sales Request
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
                  onClick={() => checkRequestLink(link)}
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

            {response && checkResult?.detail?.length !== 0
              ? !loading && (
                  <div className='w-full'>
                    <div className='text-sm w-full'>
                      <span>Requested by </span>
                      <span>: {checkResult.requestedBy}</span>
                    </div>
                    <div className='text-sm w-96'>
                      <span>Last updated </span>
                      <span>
                        : {checkResult.updateDate} - {checkResult.updatedBy}
                      </span>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                      <p className='text-xs text-yellow-600'>
                        *Your link has been requested by another sales, you can
                        check the existing variant or add a new variant if the
                        variant you want is not available.
                      </p>
                      <div className='flex md:items-center md:justify-start space-x-2'>
                        <button
                          onClick={() => assignToMyList(link)}
                          className='text-sm text-white bg-gray-700 p-1 px-2 rounded-sm'>
                          Add to my list
                        </button>

                        {custom ? (
                          <>
                            <SelectVariantAutoDev
                              link={link}
                              email={checkResult.email}
                              setUpdate={setUpdate}
                              checkRequestLink={checkRequestLink}
                            />
                          </>
                        ) : (
                          <SelectVariant
                            link={link}
                            email={checkResult.email}
                            setUpdate={setUpdate}
                            checkRequestLink={checkRequestLink}
                          />
                        )}
                        <SelectDraftOrder
                          link={link}
                          email={checkResult.email}
                          setUpdate={setUpdate}
                          checkRequestLink={checkRequestLink}
                        />
                      </div>
                    </div>
                    <DetailRequestResult
                      detailData={checkResult.detail}
                      loading={loading}
                      setLoading={setLoading}
                      setUpdate={setUpdate}
                      id_request={checkResult.id}
                      link={link}
                      checkRequestLink={checkRequestLink}
                    />
                  </div>
                )
              : response && (
                  <div>
                    <div className='flex justify-between items-center my-2'>
                      <p className='text-xs text-green-600 my-2'>
                        *Your link has never been requested, please fill out the
                        form below.
                      </p>
                      <div className='space-x-5'>
                        <SelectDraftOrder
                          link={link}
                          email={checkResult.email}
                          setUpdate={setUpdate}
                          checkRequestLink={checkRequestLink}
                        />
                        <ModuleCustomVariant link={link} />
                      </div>
                    </div>
                    <div className='border px-2 rounded-md'>
                      {custom ? (
                        <InputSalesRequestAutoDev
                          setUpdate={setUpdate}
                          link={link}
                          loading={loading}
                          setLoading={setLoading}
                          checkRequestLink={checkRequestLink}
                        />
                      ) : (
                        <InputSalesRequest
                          setUpdate={setUpdate}
                          checkRequestLink={checkRequestLink}
                          link={link}
                        />
                      )}
                    </div>
                  </div>
                )}
          </>
        </Box>
      </Modal>
    </div>
  );
}
