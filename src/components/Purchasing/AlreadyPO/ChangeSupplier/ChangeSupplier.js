import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChangeSupplierTable from "./ChangeSupplierTable";
import swal from "sweetalert";
import { changeSupplierData } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 650,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function ChangeSupplier({
  id,
  link,
  setUpdate,
  poNumber,
  supplierName,
  dataTable,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [supplierData, setSupplierData] = useState({
    note: "",
    invoiceNumber: poNumber,
    link: link,
    supplierName: supplierName ?? "",
  });

  const [additionalData, setAdditionalData] = useState({
    shipping: "",
    discount: "",
  });

  const [updateDataTable, setUpdateDataTable] = useState(
    dataTable.map((data) => {
      return {
        maxPrice: data.highestPrice,
        id_product: data.idProduk,
        qty: data.qty,
        maxQTY: data.qty,
        price: data.buyPrice,
      };
    })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getTotal = () => {
    const total =
      updateDataTable
        .map((data) => data.qty * data.price)
        .reduce((prev, current) => prev + current) +
      Number(additionalData.shipping) -
      Number(additionalData.discount);
    return total;
  };

  const changeSupplier = async () => {
    setLoading(true);
    const validatePriceQty = updateDataTable.filter(
      (data) => data.price > data.maxPrice || data.qty > data.maxQTY
    );

    if (Number(additionalData.shipping) < 0) {
      swal("Oops", "Invalid Input Shipping", "error");
      return;
    }
    if (Number(additionalData.discount) < 0) {
      swal("Oops", "Invalid Input Discount", "error");
      return;
    }

    if (validatePriceQty.length > 0) {
      swal("Oops", "Price or quantity can't be over the limit !", "error");
      return;
    }
    if (
      supplierData.invoiceNumber &&
      supplierData.link &&
      supplierData.supplierName
    ) {
      const body = JSON.stringify({
        id_so: id,
        old_invoice: poNumber,
        supplier: supplierData.supplierName,
        new_invoice: supplierData.invoiceNumber,
        link: supplierData.link,
        total: getTotal(),
        note: supplierData.note,
        product: updateDataTable,
      });
      const data = await changeSupplierData(body);
      if (data?.status === 200) {
        swal("Succes", "Payment number updated successfully", "success");
        handleClose();
        setUpdate((prev) => !prev);
      }
      if (data?.status === 400) {
        swal("Success", data.message, "error");
      }
      if (data?.status === 409) {
        swal("Success", "PO Number already exist !", "error");
      }
    } else {
      swal(
        "Oops",
        "Make sure you fill in all the required data before submit !",
        "error"
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className='py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer'
        onClick={() => {
          handleOpen();
        }}>
        Change Supplier
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style} className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-end -mt-5'>
            <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Change Supplier Order: {id}
          </Typography>
          <div className='flex flex-col space-y-3 my-5'>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Invoice Number*</label>
              <input
                type='text'
                name='invoiceNumber'
                onChange={handleChange}
                value={supplierData.invoiceNumber}
                className='p-1 rounded-md border border-gray-300  focus:outline-blue'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Supplier Name*</label>
              <input
                type='text'
                name='supplierName'
                onChange={handleChange}
                value={supplierData.supplierName}
                className='p-1 rounded-md border border-gray-300  focus:outline-blue'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Supplier Link*</label>
              <input
                type='text'
                name='link'
                onChange={handleChange}
                value={supplierData.link}
                className='p-1 rounded-md border border-gray-300  focus:outline-blue'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Notes</label>
              <input
                name='note'
                value={supplierData.note}
                onChange={handleChange}
                type='text'
                className='p-1 rounded-md border border-gray-300 focus:outline-blue'
              />
            </div>
          </div>
          <ChangeSupplierTable
            dataTable={dataTable}
            updateDataTable={updateDataTable}
            setUpdateDataTable={setUpdateDataTable}
            additionalData={additionalData}
            setAdditionalData={setAdditionalData}
            getTotal={getTotal}
          />
          <div className='text-center space-y-3 mt-5'>
            <hr />
            <button
              onClick={changeSupplier}
              disabled={loading}
              className={`${
                loading ? "bg-gray-500" : "bg-red-500"
              } rounded-md p-2 px-4 text-sm text-white`}>
              Change PO
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
