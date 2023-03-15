import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { cancelVolumeRequest, getVariants } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function CancelModal({ id, link, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectReason, setSelectReason] = useState([]);
  const [selectReasonAll, setSelectReasonAll] = useState('');
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [variantData, setVariantData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectReason(
      variantData
        ?.filter((data) => data.status === 'open')
        ?.map((data) => {
          return {
            variant: data.variant,
            id: data.id_product,
            reason: '',
            isChecked: false,
          };
        })
    );
  }, [variantData]);

  const getVariantData = async (id) => {
    setLoading(true);
    const response = await getVariants(id);
    if (response?.status === 200) {
      setVariantData(response.data.data);
      setIsCheckedAll(false)
      setSelectReasonAll('')
      handleOpen();
    }
    setLoading(false);
  };

  const cancelRequestHandler = async () => {
    const validateChecked = selectReason.filter(
      (data) => data.isChecked === true
    );

    const validateReason = validateChecked.filter((data) => data.reason === '');

    if (validateReason.length > 0) {
      swal('Oops', 'Please choose reason before submit !', 'error');
      return;
    }

    const body = JSON.stringify({
      requestId: id,
      link,
      product:
        variantData.filter((data) => data.status === 'open').length === 0
          ? [
              {
                id: 'x',
                reason:
                  'Product Not Avalaibe In The Market and No Longer In Production',
              },
            ]
          : validateChecked.map((data) => {
              return { id: data.id, reason: data.reason };
            }),
    });

    const data = await cancelVolumeRequest(body);
    if (data?.status === 200) {
      setSelectReason(
        variantData.map((data) => {
          return { id: data.id_product, reason: '', isChecked: false };
        })
      );
      handleClose();
      swal('Submitted', 'Cancel request submitted succesfully', 'success');
      setUpdate((prev) => !prev);
    }
  };

  const handleSelect = (e, id) => {
    const { name, value, checked } = e.target;
    const values = [...selectReason];
    values[id][name] = checked !== undefined ? checked : value;
    setSelectReason(values);
  };

  const set_IsCheckedAll = (checked) => {
    setIsCheckedAll(checked)
    const newSelectReason = [...selectReason]
    for(let i = 0 ; i < newSelectReason.length ; i++) {
      newSelectReason[i].isChecked = checked;
    }
    setSelectReason(newSelectReason)
  }

  const set_SelectReasonAll = (value) => {
    setSelectReasonAll(value)
    const newSelectReason = [...selectReason]
    for(let i = 0 ; i < newSelectReason.length ; i++) {
      newSelectReason[i].reason = value;
    }
    setSelectReason(newSelectReason)
  }
  
  return (
    <>
      <button
        onClick={() => {
          getVariantData(id);
        }}
        disabled={loading}
        className={`w-full space-x-2 cursor-pointer text-xs text-center text-white uppercase ${
          loading ? 'bg-gray-300' : 'bg-blue-300'
        }  p-2 rounded-md`}>
        {loading ? <CircularProgress size={15} /> : 'Cancel Request'}
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style} className='overflow-y-scroll variant-scroll'>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='flex flex-col space-y-3'>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'>
                Cancel Reason
              </Typography>

              {variantData?.filter((data) => data.status === 'open').length === 0 ? (
                <p>
                  This request does not have any variant, you can directly
                  cancel this request
                </p>
              ) : (
                <>
                <div
                  className={`flex items-center space-x-3 justify-between pb-3 border-b-2 border-gray-200`}>
                  <input
                    type='checkbox'
                    name='isCheckedAll'
                    checked={isCheckedAll}
                    onChange={(e) => set_IsCheckedAll(e.target.checked)}
                    style={{ width: 18, height: 18 }}
                  />
                  <Tooltip title="Select All Variant">
                    <label className='line-clamp-1 text-sm w-26'>
                      Update All
                    </label>
                  </Tooltip>
                  <select
                    name='selectReasonAll'
                    value={selectReasonAll}
                    onChange={(e) => set_SelectReasonAll(e.target.value)}
                    className='border border-gray-300 p-1 rounded-md focus:outline-blue text-sm'>
                    <option value=''>Select cancel reason</option>
                    <option
                      title='Product Not Avalaibe In The Market and No Longer In Production'
                      value='Product Not Avalaibe In The Market and No Longer In Production'>
                      Product Not Avalaibe In...
                    </option>
                    <option value='Out Of Stock'>Out Of Stock</option>
                    <option value='forbiden'>Forbidden item</option>
                  </select>
                </div>
                {selectReason.map((variant, id) => (
                  <div
                    key={id}
                    className={`${variant.id} flex items-center space-x-3 justify-between`}>
                    <input
                      type='checkbox'
                      name='isChecked'
                      checked={selectReason[id]?.isChecked}
                      onChange={(e) => handleSelect(e, id)}
                      style={{ width: 18, height: 18 }}
                    />
                    <Tooltip title={variant.variant ?? 'variant-'}>
                      <label className='line-clamp-1 text-sm w-26'>
                        {variant?.variant?.slice(0, 10)}...
                      </label>
                    </Tooltip>
                    <select
                      name='reason'
                      value={variant.reason}
                      onChange={(e) => handleSelect(e, id)}
                      className='border border-gray-300 p-1 rounded-md focus:outline-blue text-sm'>
                      <option value=''>Select cancel reason</option>
                      <option
                        title='Product Not Avalaibe In The Market and No Longer In Production'
                        value='Product Not Avalaibe In The Market and No Longer In Production'>
                        Product Not Avalaibe In...
                      </option>
                      <option value='Out Of Stock'>Out Of Stock</option>
                      <option value='forbiden'>Forbidden item</option>
                    </select>
                  </div>
                ))}
                </>
              )}
              <button
                className={`text-white p-2 rounded-md ${'bg-blue-300'}`}
                onClick={cancelRequestHandler}>
                Submit
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
