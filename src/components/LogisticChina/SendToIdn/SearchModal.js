import { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { getSendToIdnData } from "service/api";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function SearchModal({
  setIsLoading,
  setDataOrder,
  setPageInfo,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchInput, setSearchInput] = useState({
    type: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const fetchOrderData = async () => {
    const { type, value } = searchInput;

    setIsLoading(true);
    let params = new URLSearchParams({
      key: value,
      filter: type,
    }).toString();

    const data = await getSendToIdnData(params);
    if (data?.status === 200) {
      if (data.data.totalData !== 0) {
        const newFormat = [];
        for (let i = 0; i < data.data.data.customer.collection.length; i++) {
          const customer = data.data.data.customer.collection[i];
          const order = data.data.data.orders.collection[i];
          const idOrder = data.data.data.idOrders.collection[i];
          const finance = data.data.data.finance.collection[i];
          newFormat.push({ customer, order, idOrder, finance });
        }
        setDataOrder(newFormat);
      } else {
        swal("Oops", "Data not found !", "error");
      }
      setPageInfo({
        dataInPage: data.data.dataInPage,
        totalData: data.data.totalData,
        totalPage: data.data.totalPage,
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 p-1 px-5 text-white rounded-md"
        onClick={handleOpen}
      >
        Search
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
            Search Input
          </Typography>
          <div className="space-y-2 mt-3">
            <div className="space-x-3 font-semibold">
              <label>Search :</label>
              <select
                name="type"
                value={searchInput.type}
                onChange={handleChange}
                className="border border-gray-300 p-1 rounded-md  text-sm focus:outline-blue"
              >
                <option value="" disabled>
                  Search By
                </option>
                <option value="invoice">PO Number</option>
                <option value="id-order">ID Order</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <input
                type="text"
                name="value"
                onChange={handleChange}
                value={searchInput.value}
                className="border border-gray-300 w-full rounded-md p-1 focus:outline-blue"
              />
              <button
                onClick={fetchOrderData}
                className="bg-blue-500 p-1 px-2 rounded-md text-white"
              >
                Search
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
