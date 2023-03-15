import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelOrderTable from "./CancelOrderTable";
import CancelReason from "./CancelReason";
import swal from "sweetalert";
import { deleteOrderData } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function CancelOrder({ id, dataOrder, email, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reason, setReason] = useState("");
  const [inputArea, setInputArea] = useState("");
  const [massQty, setMassQty] = useState({
    qty: "",
    isChecked: false,
  });
  const [dataRefund, setDataRefund] = useState([]);

  const submitCancelOrder = async () => {
    let total = 0;
    let error = false;
    let emptyQty = false;
    for (let i = 0; i < dataRefund.length; i++) {
      total += Number(dataRefund[i].value);
      if (dataRefund[i].qty > dataOrder[i].qty) error = true;
      if (dataRefund[i].qty === 0) emptyQty = true;
    }

    const selectedData = dataRefund.filter((data) => data.isChecked === true);
    if (selectedData.length === 0) {
      swal("Oops", "Please select at least 1 data before submit !", "error");
      return;
    }
    if (emptyQty) {
      swal("Oops", "Please fill quantity before submit!", "error");
      return;
    }
    if (reason === "") {
      swal("Oops", "Please choose reason before submit!", "error");
      return;
    }
    if (!error) {
      const body = JSON.stringify({
        id_so: id,
        email,
        reason: reason === "Other" ? inputArea : reason,
        total,
        product: selectedData.map((data) => {
          return {
            id_product: data.id_product,
            qty: data.qty,
            value: data.value,
          };
        }),
      });
      const data = await deleteOrderData(body);

      if (data?.status === 200) {
        swal("Success", "Cancel order submitted successfuly", "success");
        handleClose();
        setUpdate((prev) => !prev);
      }
      if (data?.status === 400) {
        swal("Oops", "Input not valid !", "error");
      }
      if (data?.status === 500) {
        swal("Oops", "Internal server error !", "error");
      }
    } else {
      swal("Oops", "Quantity over limit!", "error");
    }
  };

  useEffect(() => {
    setDataRefund(
      dataOrder.map((data) => {
        return {
          id_product: data.idProduk,
          value: data.qty * data.highestPrice,
          qty: data.qty,
          isChecked: false,
        };
      })
    );
  }, [dataOrder]);
  return (
    <div>
      <div
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer"
        onClick={() => {
          handleOpen();
        }}
      >
        Cancel Order
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-y-scroll variant-scroll">
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Detail Order : {id}
          </Typography>
          <CancelOrderTable
            dataOrder={dataOrder}
            dataRefund={dataRefund}
            setDataRefund={setDataRefund}
            massQty={massQty}
            setMassQty={setMassQty}
          />
          <CancelReason
            id={id}
            reason={reason}
            setReason={setReason}
            inputArea={inputArea}
            setInputArea={setInputArea}
          />
          <hr />
          <div className="flex justify-center mt-5">
            <button
              className="text-white p-2 px-4 bg-red-500 rounded-md"
              onClick={submitCancelOrder}
            >
              Cancel Order
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
