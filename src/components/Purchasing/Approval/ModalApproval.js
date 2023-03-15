import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { approvalPayment } from "service/api";
import swal from "sweetalert";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const submitApproval = async (payload) => {
  const response = await approvalPayment(payload);
  if (response.status === 200) {
    return {
      success: true,
      message: "",
    };
  } else {
    return {
      success: false,
      message: response.message,
    };
  }
};

const ModalApproval = ({ type, id_so, id, image, setUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);

  const handleApproval = (type, id, id_so) => {
    swal({
      title: "Are you sure?",
      text: "Once approve payment, you will not be able to revert this change!",
      icon: "warning",
      buttons: true,
    }).then(async (willApprove) => {
      if (willApprove) {
        setLoading(true);
        const payload = {
          type,
          id,
          id_so,
          approve: true,
          reason: "",
        };
        const response = await submitApproval(JSON.stringify(payload));
        if (response.success) {
          swal("Success", "Payment Approved", "success");
          handleClose();
          setUpdate((prev) => !prev);
        } else {
          swal("Oops", response.message, "error");
        }
        setLoading(false);
      }
    });
  };

  return (
    <div>
      <button
        className={`w-full text-center text-sm  py-2 text-white  rounded-md cursor-pointer bg-blue-400`}
        onClick={handleOpen}>
        Approval
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flex justify-end -mt-5'>
            <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Proof of payment
          </Typography>
          <img
            src={image}
            alt='bukti pembayaran'
            className='max-w-60 max-h-60 mx-auto object-contain'
          />

          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Once approve payment, you will not be able to revert this change!
          </Typography>
          <div className='mt-3 flex space-x-3 justify-center'>
            <RejectModal
              id={id}
              id_so={id_so}
              type={type}
              setUpdate={setUpdate}
              close={handleClose}
            />
            <button
              onClick={() => handleApproval(type, id, id_so)}
              disabled={loading}
              className={`${
                loading ? "bg-gray-500" : "bg-green-500"
              } rounded-md text-white px-5 py-1`}>
              Approve
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalApproval;

const RejectModal = ({ type, id, id_so, setUpdate, close }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reason, setReason] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleReject = async (e, type, id, id_so) => {
    e.preventDefault();
    setLoading(true);

    if (reason.trim().length === 0) {
      swal("Oops", "Please input the reason for rejected payment", "warning");
      setLoading(false);
      return false;
    }

    const payload = {
      type,
      id,
      id_so,
      reason,
      approve: false,
    };
    const response = await submitApproval(JSON.stringify(payload));
    if (response.success) {
      swal("Success", "Payment Rejected", "success");
      setUpdate((prev) => !prev);
      close();
      handleClose();
    } else {
      swal("Oops", response.message, "error");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className='bg-red-500 rounded-md text-white px-5 py-1'>
        Reject
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <form onSubmit={(e) => handleReject(e, type, id, id_so)}>
            <p className='text-left mb-1'>Please Input Reason :</p>
            <textarea
              onChange={(e) => setReason(e.target.value)}
              className='w-full border border-gray-500 rounded-md p-2'
              rows={4}
              placeholder='please input reason'></textarea>
            <div className='flex justify-end space-x-2'>
              <button
                onClick={handleClose}
                className='bg-red-500 text-white px-4 py-1 rounded-md'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className={`${
                  loading ? "bg-gray-500" : "bg-blue-500"
                } text-white px-4 py-1 rounded-md`}>
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
