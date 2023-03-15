import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
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

const options = {
  width: 2,
  height: 80,
  format: 'CODE128',
  displayValue: true,
  fontOptions: '',
  font: 'monospace',
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 1,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
};

export default function GenerateBarcode({ rowData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let componentRef = useRef();
  const { customer, order } = rowData;

  return (
    <div>
      <button
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md w-full"
        onClick={handleOpen}>
        Barcode
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={style}
          className="overflow-y-scroll variant-scroll table-scroll">
          <div className="flex justify-end -mt-5 w-full">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Barcode
          </Typography>
          <ReactToPrint
            trigger={() => (
              <button className="text-white bg-blue-500 rounded-md p-2">
                Print Barcode
              </button>
            )}
            content={() => componentRef}
          />

          <div ref={(el) => (componentRef = el)} className="grid grid-cols-1">
            {order.map((data, id) => (
              <div
                style={{ minHeight: '550px' }}
                className="w-72 p-3 rounded-md border-gray-100"
                key={id}>
                <div className="flex justify-between">
                  <img src="/logoOCIpng.png" alt="Ocistok" className="w-32" />
                  <p className="font-bold">{data.id_so}</p>
                </div>
                <Barcode value={`${data.id_carton}`} {...options} />
                <div className="text-xs space-y-1">
                  <p>
                    Total Karton:{' '}
                    <span className="font-semibold">{order.length}</span>
                  </p>
                  <p>
                    Jasa Kirim:{' '}
                    <span className="font-semibold">{customer.courier}</span>
                  </p>
                  <p>
                    Nama: <span className="font-semibold">{customer.name}</span>
                  </p>
                  <p>
                    Telp:{' '}
                    <span className="font-semibold">{customer.phone}</span>
                  </p>
                  <p>
                    Alamat:{' '}
                    <span className="font-semibold">{customer.address}</span>
                  </p>
                  <p>
                    Kota: <span className="font-semibold">{customer.city}</span>
                  </p>
                  <p>
                    Sales:{' '}
                    <span className="font-semibold">{customer.sales}</span>{' '}
                  </p>
                </div>
                <hr className="my-2" />
                <div className="text-xs">
                  <p>
                    Pengirim: <span>OCIstok.com Kota</span>
                  </p>
                  <p>
                    Kota : <span>CENGKARENG</span>
                  </p>
                  <p>
                    Tlp : <span>02122302662</span>
                  </p>
                  <p className="font-semibold">
                    Terima kasih sudah berbelanja di OCISTOK.COM
                  </p>
                  <p>Kontak Customer Service</p>
                  <p className="font-semibold">WhatsApp 0812-1000-1808</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center my-2">
            <hr className="my-2" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
