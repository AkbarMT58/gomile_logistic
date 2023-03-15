import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { updatePhoneNumberOBE } from "service/api";
import swal from "sweetalert";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function EditPhoneNumber({ setChangeData, setLoading, id }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePhone = async () => {
    setLoading(true);
    const validatePhone =
      /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{7,9}$/.test(input);
    if (validatePhone) {
      const body = JSON.stringify({ id, phoneNumber: input });
      const data = await updatePhoneNumberOBE(body);
      if (data?.status === 200) {
        swal("Updated!", "Phone number updated succesfully", "success");
        setChangeData((prev) => !prev);
      }
    } else {
      swal("Oops", "Not valid phone number format", "error");
    }
    setLoading(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>Edit</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex justify-end -mt-5">
              <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="flex flex-col space-y-5">
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Update Phone Number
              </Typography>
              <input
                type="number"
                value={input}
                className="p-2 border border-gray-300 rounded-md focus:outline-blue"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="text-white p-2 bg-blue-300 rounded-md"
                onClick={updatePhone}
              >
                Update
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
