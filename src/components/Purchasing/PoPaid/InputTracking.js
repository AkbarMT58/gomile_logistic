import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateTrackingData } from "service/api";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 365,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function InputTracking({ id, invoiceNumber, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tracking, setTracking] = useState({
    number: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTracking((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateTracking = async () => {
    if (tracking.number) {
      const body = JSON.stringify({
        id_so: id,
        invoice: invoiceNumber,
        tracking_number: tracking.number,
        remark: tracking.remark,
      });
      const data = await updateTrackingData(body);
      if (data?.status === 200) {
        setUpdate((prev) => !prev);
        swal("Success", "Tracking data updated successfully", "success");
        handleClose();
      }
      if (data?.status === 400) {
        swal("Oops", data?.message, "error");
      }
      if (data?.status === 500) {
        swal("Oops", "Internal server error !", "error");
      }
    } else {
      swal("Oops", "Tracking number required !", "error");
    }
  };

  return (
    <div>
      <div
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer"
        onClick={() => {
          handleOpen();
        }}
      >
        Input Tracking
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Tracking For: {id}
          </Typography>
          <div className="my-2">PO Number : {invoiceNumber}</div>
          <div className="flex flex-col space-y-3 my-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Tracking Number</label>
              <input
                name="number"
                value={tracking.number}
                onChange={handleChange}
                type="text"
                className="p-2 rounded-md border border-gray-300 focus:outline-blue"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Remark</label>
              <input
                name="remark"
                value={tracking.remark}
                onChange={handleChange}
                type="text"
                className="p-2 rounded-md border border-gray-300 focus:outline-blue"
              />
            </div>
          </div>

          <div className="text-center space-y-3">
            <hr />
            <button
              onClick={updateTracking}
              className="bg-blue-500 rounded-md p-2 px-4 text-sm text-white"
            >
              SUBMIT
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
