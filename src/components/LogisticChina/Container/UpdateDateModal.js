import { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { updateETA } from "service/api";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function UpdateDateModal({ title, container, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [eta, setEta] = useState("");

  const submitDate = async () => {
    const body = JSON.stringify({ container, eta });
    const data = await updateETA(body);
    if (data?.status === 200) {
      swal("Success", `ETA ${title}ed successfully`, "success");
      setUpdate((prev) => !prev);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-300 hover:bg-blue-400 text-white px-3 py-1 rounded-md"
        onClick={handleOpen}
      >
        {title}
      </button>
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
            {title} Date
          </Typography>
          <div className="flex space-x-3 mt-3">
            <input
              type="date"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              className="flex-grow border border-gray-300 p-1 rounded-md focus:outline-blue"
            />
            <button
              onClick={submitDate}
              className="bg-blue-400 text-white px-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
