import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  IconButton,
  Tooltip,
  Typography,
  Fade,
  Modal,
  Backdrop,
  Box,
} from "@mui/material";
import swal from "sweetalert";
import CloseIcon from "@mui/icons-material/Close";
// import Cookies from "js-cookie";
import { addSalesOBE } from "service/api";

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

export default function AddSalesModal({
  listData,
  email,
  setChangeData,
  setLoading,
  id,
}) {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState("");
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (event) => {
    setSales(event.target.value);
  };

  const postSalesData = async () => {
    setLoading(true);

    const body = JSON.stringify({ id, sales: sales });

    const data = await addSalesOBE(body);

    if (data?.status === 200) {
      swal("Sales added successfully", {
        icon: "success",
      });
      setChangeData((prev) => !prev);
    }
    setLoading(false);
  };

  const addSales = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once add sales, you will not be able to revert this change!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        postSalesData();
        handleClose();
      } else {
        swal("Your canceled to add sales");
        handleClose();
      }
    });
  };

  return (
    <>
      <Tooltip title="Add Sales">
        <IconButton onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
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
              Add Sales
            </Typography>
            <form
              onSubmit={addSales}
              className="flex flex-col items-center space-y-2"
            >
              <select
                value={sales}
                onChange={handleChange}
                className="p-2 border border-gray-300 outline-none rounded-md w-full"
              >
                <option value="" disabled>
                  Select Sales
                </option>
                {listData?.map((sales, id) => (
                  <option value={sales} key={id}>
                    {sales.slice(0, 1).toUpperCase() + sales.slice(1)}
                  </option>
                ))}
              </select>
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
