import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { updateEmailOBE } from "service/api";
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

export default function EditPhoneNumber({
  setChangeData,
  setLoading,
  id,
  title,
}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editEmail = async () => {
    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        input
      );
    setLoading(true);
    if (validateEmail) {
      const body = JSON.stringify({ id, email: input });
      const data = await updateEmailOBE(body);
      if (data?.status === 200) {
        swal("Updated!", "Email updated succesfully", "success");
        setChangeData((prev) => !prev);
        handleClose();
      }
    } else {
      swal("Oops", "Not valid email format", "error");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        className="cursor-pointer text-sm text-white bg-blue-300 p-1 text-center rounded-md w-12"
      >
        {title}
      </div>
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
                Update Email Customer
              </Typography>
              <input
                type="email"
                value={input}
                className="p-2 border border-gray-300 rounded-md focus:outline-blue"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="text-white p-2 bg-blue-300 rounded-md"
                onClick={editEmail}
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
