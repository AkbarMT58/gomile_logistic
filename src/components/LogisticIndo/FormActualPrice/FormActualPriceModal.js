import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { submitFormActualData } from "service/api";
import swal from "sweetalert";
import FormActualPriceModalTable from "./FormActualPriceModalTable";
import { useSelector } from "react-redux";
import { selectAddData } from "redux/addDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function FormActualPriceModal({
  paymentData,
  dataBox,
  setUpdate,
}) {
  const { category } = useSelector(selectAddData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputData, setInputData] = useState({
    invoice: "",
    totalPayment: "",
    logistic: "",
    volume: paymentData.volume,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setInputData((prev) => {
        return {
          ...prev,
          totalPayment: ((prev.volume / 1000000) * value).toFixed(1),
          [name]: value,
        };
      });
    }

    if (name === "volume") {
      setInputData((prev) => {
        return {
          ...prev,
          totalPayment: ((value / 1000000) * prev.category).toFixed(1),
          [name]: value,
        };
      });
    }

    if (name === "logistic" || name === "invoice") {
      setInputData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  let data = [];
  for (let index = 0; index < dataBox.length; index++) {
    data.push(
      ...dataBox[index].product.map((data) => {
        return { ...data, id_carton: dataBox[index].id_carton };
      })
    );
  }

  const submitPayment = async () => {
    const body = JSON.stringify({
      id_so: paymentData.id_so,
      invoice: inputData.invoice,
      courier: inputData.logistic,
      totalPayment: inputData.totalPayment,
      volume: inputData.volume,
      category: inputData.category,
    });

    if (
      inputData.invoice &&
      inputData.logistic &&
      inputData.totalPayment &&
      inputData.volume &&
      inputData.category
    ) {
      const data = await submitFormActualData(body);
      if (data?.status === 200) {
        swal("Success", "Payment submitted successfully !", "success");
        setUpdate((prev) => !prev);
      }
    } else {
      swal("Oops", "Please complete all input fields", "error");
    }
  };

  return (
    <div>
      <button
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center w-full"
        onClick={() => {
          handleOpen();
        }}
      >
        Pay
      </button>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Payment
          </Typography>
          <div className="mt-3 space-y-3">
            <div className="space-y-3">
              <div>
                <label>Order Number</label>
                <input
                  type="text"
                  defaultValue={paymentData.id_so}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Invoice</label>
                <input
                  type="text"
                  name="invoice"
                  value={inputData.invoice}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Logistic Channel</label>
                <input
                  type="text"
                  name="logistic"
                  value={inputData.logistic}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>Real Volume (CM3)</label>
                <input
                  type="number"
                  name="volume"
                  value={inputData.volume}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label>BL Shipping Fee</label>
                <select
                  name="category"
                  value={inputData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {category?.map((cat) => (
                    <option value={cat.value}>{cat.category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Total Payment (IDR)</label>
                <input
                  type="text"
                  name="totalPayment"
                  defaultValue={inputData.totalPayment}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <FormActualPriceModalTable dataProduct={data} />
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitPayment}
                className="text-white bg-blue-500 px-5 py-1 rounded-md"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
