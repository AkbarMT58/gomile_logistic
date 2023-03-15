import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReceivedManualTable from "../ReceivedManual/ReceivedManualTable";
import { sendBarcode, submitReceivedDataScan } from "service/api";
import swal from "sweetalert";
import CustomizeModal from "components/UI/CustomizeModal";

let content = {};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  maxHeight: 650,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function ScanBarcode() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [dataOrder, setDataOrder] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    const body = JSON.stringify({ id: barcode });
    const data = await sendBarcode(body);
    if (data?.status === 200) {
      setDataOrder(data.data);
    }
    setLoading(false);
  };

  const postData = async () => {
    const body = JSON.stringify({
      product: receivedData
        .filter((data) => data.isChecked === true)
        .map((data) => {
          return {
            id_so: data.id_so,
            id: data.id_product,
            invoice: data.id_po,
            received: Number(data.received),
            defect: Number(data.defect),
            unsuitable: Number(data.unsuitable),
          };
        }),
    });

    const data = await submitReceivedDataScan(body);

    if (data?.status === 200) {
      swal("Success", "Data submitted successfully", "success");
    }
    if (data?.status === 400) {
      swal("Oops", "Input not valid !", "error");
    }
    if (data?.status === 500) {
      swal("Oops", "Internal server error !", "error");
    }
  };

  const submitData = async () => {
    const validateQuantity = receivedData.filter(
      (data) =>
        data.qty <
        Number(data.received) + Number(data.defect) + Number(data.unsuitable)
    );
    const validateLowerQuantity = receivedData.filter(
      (data) =>
        data.qty <
        Number(data.received) + Number(data.defect) + Number(data.unsuitable)
    );

    const validateFieldEmpty = receivedData.filter(
      (data) =>
        data.received === "" && data.unsuitable === "" && data.defect === ""
    );

    const selectedData = receivedData.filter((data) => data.isChecked === true);

    if (selectedData.length === 0) {
      swal("Oops", "Please select at least 1 product before submit !", "error");
      return;
    }

    if (validateFieldEmpty.length !== 0) {
      swal("Oops", "Please input at least 1 field per row !", "error");
      return;
    }
    if (validateQuantity.length !== 0) {
      setOpenModal((prev) => !prev);
      content.title =
        "Quantity inputted is higher than Quantity ordered, are you sure you want to proceed ?";
    } else if (validateLowerQuantity.length !== 0) {
      setOpenModal((prev) => !prev);
      content.title =
        "Quantity inputted is lower than Quantity ordered, are you sure you want to proceed ?";
    } else {
      setOpenModal((prev) => !prev);
      content.title = "Are you sure want to submit ?";
    }
  };

  useEffect(() => {
    setReceivedData(
      dataOrder.map((data) => {
        return {
          ...data,
          id_so: data.id_so,
          id: data.idProduk,
          invoice: data.id_po,
          received: data.qty,
          defect: "",
          unsuitable: "",
        };
      })
    );
  }, [dataOrder]);

  return (
    <div>
      <CustomizeModal
        content={content}
        openModal={openModal}
        setOpenModal={setOpenModal}
        actions={postData}
      />
      <button
        className="p-1 px-3 rounded-md cursor-pointer text-white bg-blue-500 text-center"
        onClick={() => {
          handleOpen();
        }}
      >
        Scan Barcode
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
            Scan Barcode
          </Typography>
          <div className="flex items-center mt-3  space-x-3">
            <label>Scan Result</label>
            <input
              autoFocus
              name="barcode"
              onChange={(e) => setBarcode(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getData();
                }
              }}
              type="text"
              className="border rounded-md border-gray-300 flex-grow p-1 focus:outline-blue"
            />
          </div>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <div className="flex flex-col">
                <CircularProgress />
                <p className="text-gray-500 text-sm mt-2">Loading ...</p>
              </div>
            </Box>
          ) : (
            dataOrder.length !== 0 && (
              <>
                <ReceivedManualTable
                  dataOrder={dataOrder}
                  receivedData={receivedData}
                  setReceivedData={setReceivedData}
                />
                <div className="my-3 text-center">
                  <hr />
                  <button
                    className="mt-3 p-2 bg-blue-400 text-white rounded-md"
                    onClick={submitData}
                  >
                    Submit
                  </button>
                </div>
              </>
            )
          )}
        </Box>
      </Modal>
    </div>
  );
}
