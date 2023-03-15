import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { reoderAbnormal } from 'service/api';
import ReorderTable from './ReorderTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 650,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function Reorder({ id, setUpdate, dataTable }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reorderData, setReorderData] = useState({
    note: '',
    invoiceNumber: '',
    link: '',
    supplierName: '',
  });

  const [additionalData, setAdditionalData] = useState({
    shipping: '',
    discount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReorderData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getTotal = () => {
    let initial = 0;
    const total =
      dataTable
        .map((data) => data.highestPrice * data.qty)
        .reduce((prev, current) => prev + current, initial) +
      Number(additionalData.shipping) -
      Number(additionalData.discount);
    return total;
  };

  const reorder = async () => {
    if (
      reorderData.invoiceNumber &&
      reorderData.link &&
      reorderData.supplierName
    ) {
      const body = JSON.stringify({
        id_so: id,
        invoice: reorderData.invoiceNumber,
        link: reorderData.link,
        total: getTotal(),
        note: reorderData.note,
        product: dataTable.map((data) => {
          return {
            id_product: data.id_product,
            id_abnormal: data.id_abnormal,
            qty: data.qty,
            price: data.highestPrice,
            note: '',
          };
        }),
      });

      const data = await reoderAbnormal(body);
      if (data?.status === 200) {
        swal('Succes', 'Reorder successfully', 'success');
        handleClose();
        setUpdate((prev) => !prev);
      }
    } else {
      swal(
        'Oops',
        'Make sure you fill in all the required data before submit !',
        'error'
      );
    }
  };

  return (
    <div>
      <button
        className="p-2 text-blue-500 bg-white border border-blue-500 rounded-md w-32"
        onClick={() => {
          handleOpen();
        }}
        disabled={dataTable.length === 0}>
        Reorder
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
            Reorder : {id}
          </Typography>
          <div className="flex flex-col space-y-3 my-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Invoice Number*</label>
              <input
                type="text"
                name="invoiceNumber"
                onChange={handleChange}
                value={reorderData.invoiceNumber}
                className="p-1 rounded-md border border-gray-300  focus:outline-blue"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Supplier Name*</label>
              <input
                type="text"
                name="supplierName"
                onChange={handleChange}
                value={reorderData.supplierName}
                className="p-1 rounded-md border border-gray-300  focus:outline-blue"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Supplier Link*</label>
              <input
                type="text"
                name="link"
                onChange={handleChange}
                defaultValue={reorderData.link}
                className="p-1 rounded-md border border-gray-300  focus:outline-blue"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Notes</label>
              <input
                name="note"
                value={reorderData.note}
                onChange={handleChange}
                type="text"
                className="p-1 rounded-md border border-gray-300 focus:outline-blue"
              />
            </div>
          </div>
          <ReorderTable
            dataTable={dataTable}
            additionalData={additionalData}
            setAdditionalData={setAdditionalData}
            getTotal={getTotal}
          />
          <div className="text-center space-y-3 mt-5">
            <hr />
            <button
              onClick={reorder}
              className="bg-blue-500 rounded-md p-2 px-4 text-sm text-white">
              Reoder
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
