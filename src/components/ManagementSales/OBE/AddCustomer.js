import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  IconButton,
  Typography,
  Fade,
  Modal,
  Backdrop,
  Box,
} from "@mui/material";
import swal from "sweetalert";
import CloseIcon from "@mui/icons-material/Close";
// import Cookies from "js-cookie";
import { addCustomerOBE } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function AddCustomer({ setChangeData, setLoading }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addCustomerData = async (name, email, phone) => {
    setLoading(true);
    const body = JSON.stringify({ name, email, phone });
    const data = await addCustomerOBE(body);
    if (data?.status === 200) {
      swal("Succes", "Add customer suscessfully", "success");
      setChangeData((prev) => !prev);
    }
    if (data?.status === 409) {
      swal("Oops", "Phone number already exist !", "error");
    }
    if (data?.status === 400) {
      swal("Oops", data.message, "error");
    }
    setLoading(false);
  };

  const addCustomer = (e) => {
    e.preventDefault();
    if (customer.phone.trim() !== "" && customer.name.trim() !== "") {
      swal({
        title: "Are you sure?",
        text: "Once add customer, you will not be able to revert this change!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          addCustomerData(customer.name, customer.email, customer.phone);
          handleClose();
        } else {
          swal("Your canceled to add sales");
          handleClose();
        }
      });
    } else {
      swal("Oops", "Input not valid !", "error");
    }
  };

  return (
    <>
      <div
        className="flex items-center md:text-sm text-xs md:p-2 p-1 space-x-2 justify-between text-white bg-blue-500 rounded-md cursor-pointer"
        onClick={handleOpen}
      >
        <AddCircleIcon style={{ fontSize: 20 }} />
        <span className="line-clamp-1">Add Customer</span>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Customer
            </Typography>
            <form
              onSubmit={addCustomer}
              className="flex flex-col items-center space-y-5 mt-4"
            >
              <div className="w-full flex items-center space-x-3 justify-between ">
                <label htmlFor="name" className="text-md">
                  Name :
                </label>
                <input
                  type="text"
                  value={customer.name}
                  name="name"
                  onChange={handleChange}
                  className="border border-gray-200  p-1 rounded-md focus:outline-blue w-64 "
                />
              </div>
              <div className="w-full flex items-center space-x-3 justify-between">
                <label htmlFor="name" className="text-md">
                  Email :
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={customer.email}
                  className="border border-gray-200 p-1 rounded-md focus:outline-blue w-64 "
                />
              </div>
              <div className="w-full flex items-center space-x-3 justify-between">
                <label htmlFor="name" className="text-md">
                  Phone :
                </label>
                <input
                  type="number"
                  value={customer.phone}
                  onChange={handleChange}
                  name="phone"
                  className="border border-gray-200 p-1 rounded-md focus:outline-blue w-64 "
                />
              </div>
              <button
                className="p-2 bg-blue-300 text-white rounded-md  w-full hover:bg-blue-200 transition-alll"
                type="submit"
              >
                Submit
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
