import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import ReactToPrint from 'react-to-print';
import BarcodeCardList from 'components/General/DetailOrderModal/CustomerDetail/BarcodeCardList';
import swal from 'sweetalert';
import { getDataPrintLabelDetails, getDetailOrderData } from 'service/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 1000,
  height: 600,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function GenerateBarcode({ rowData, id_group }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detailOrder, setDetailOrder] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState();

  let componentRef = useRef();
  const { idOrder } = rowData;

  const getDetailOrder = async () => {
    setLoading(true);
    const data = await getDetailOrderData(idOrder.id_so);
    if (data?.status === 200) {
      setDetailOrder(data.data);
    } else {
      handleClose();
      swal('Oops', data?.message, 'error');
    }
    setLoading(false);
  };
  
  const get_DataPrintLabelDetails = async () => {
    const params = id_group ? id_group : idOrder.id_so;

    const response = await getDataPrintLabelDetails(params);
    if (response?.status === 200) {
      setData(response?.data);
      handleOpen();
    }
  };
  
  return (
    <div>
      <button
        className='py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md w-full'
        onClick={() => {
          getDetailOrder();
          get_DataPrintLabelDetails()
        }}>
        Barcode
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          sx={style}
          className='overflow-y-scroll variant-scroll table-scroll'>
          <div className='flex justify-end -mt-5 w-full'>
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="w-96">
            <div ref={(el) => (componentRef = el)} className='mb-3'>
              <BarcodeCardList data={data} customerData={detailOrder?.customerDetail} isLoading={isLoading} />
            </div>
            
            <ReactToPrint
                trigger={() => (
                  <div className="w-[10rem] text-white text-center bg-blue-500 hover:bg-blue-600 cursor-pointer rounded mx-auto px-5 py-2">
                    Print Barcode
                  </div>
                )}
                content={() => componentRef}
              />
          </div>
          <div className='text-center my-2'>
            <hr className='my-2' />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
