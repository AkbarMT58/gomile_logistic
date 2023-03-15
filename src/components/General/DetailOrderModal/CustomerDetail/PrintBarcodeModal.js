import { useRef } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import ReactToPrint from 'react-to-print';
import BarcodeCardList from './BarcodeCardList';

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

export default function PrintBarcodeModal({
  customerData,
  //   id_group,
  //   id_so,
  open,
  handleClose,
  data,
}) {
  let componentRef = useRef();
  
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          className="overflow-y-scroll variant-scroll table-scroll">
          <div className="flex justify-end -mt-5 w-full">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="w-96">
            <div ref={(el) => (componentRef = el)} className='mb-3'>
              <BarcodeCardList data={data} customerData={customerData} />
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

          <div className="text-center my-2">
            <hr className="my-2" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
