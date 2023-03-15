import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import swal from "sweetalert";
import { updateAccountBank } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const CompletedAccountBankModal = ({ idOrder, idRefund, setUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const Arrform = ["account_name", "account_number", "bank"];

  const [data, setData] = useState({
    id_so: idOrder,
    id_refund: idRefund,
    account_name: "",
    account_number: "",
    bank: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      data.account_name.trim().length === 0 &&
      data.account_number.trim().length === 0 &&
      data.bank.trim().length === 0
    ) {
      swal("Oops", "Please completed the all data", "warning");
      setLoading(false);
      return;
    }

    const response = await updateAccountBank(JSON.stringify(data));
    if (response.status === 200) {
      swal("success", "Account bank is completed", "success");
      setUpdate((prev) => !prev);
      handleClose();
    } else {
      swal("Oops", response.message, "error");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        className='py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center w-full'
        onClick={() => {
          handleOpen();
        }}>
        Completed Account Bank
      </button>
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
          <Typography id='modal-modal-title' variant='h6' component='h3'>
            Completed Account Bank
          </Typography>
          <form
            onSubmit={handleSubmit}
            className='mt-5 flex flex-col space-y-3'>
            {Arrform.map((arr) => {
              return (
                <div key={arr} className='flex flex-col space-y-2'>
                  <label className='capitalize'>
                    <span className='text-red-500'>*</span>
                    {arr.replace("_", " ")} :
                  </label>
                  <input
                    value={data[arr]}
                    onChange={handleChange}
                    type='text'
                    name={arr}
                    className='focus:outline-none border rounded-md px-2 py-1'
                  />
                </div>
              );
            })}
            <button
              disabled={loading}
              type='submit'
              className={`text-white ${
                loading ? "bg-gray-500" : "bg-blue-500"
              } py-2 rounded-md`}>
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CompletedAccountBankModal;
