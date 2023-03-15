import React, { Suspense, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fade, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { submitReceivedData } from "service/api";
import swal from "sweetalert";
import CustomizeModal from "components/UI/CustomizeModal";
const ReceivedManualTable = React.lazy(() => import("./ReceivedManualTable"));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

let content = {};

export default function ReceivedManual({ id_so, id_po, dataOrder, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openModal, setOpenModal] = useState(false);
  const [receivedData, setReceivedData] = useState(
    dataOrder.map((data) => {
      return {
        ...data,
        received: data.qty,
        defect: "",
        unsuitable: "",
        isChecked: false,
      };
    })
  );

  const postData = async () => {
    const body = JSON.stringify({
      id_so,
      invoice: id_po,
      product: receivedData.map((data) => {
        return {
          id: data.id_product,
          received: Number(data.received),
          defect: Number(data.defect),
          unsuitable: Number(data.unsuitable),
        };
      }),
    });

    const data = await submitReceivedData(body);
    if (data?.status === 200) {
      swal("Success", "Data submitted successfully", "success");
      setUpdate((prev) => !prev);
    }
    if (data?.status === 400) {
      swal("Oops", "Input not valid !", "error");
    }
    if (data?.status === 500) {
      swal("Oops", "Internal server error !", "error");
    }
  };

  const submitData = async () => {
    const validateHigherQuantity = receivedData.filter(
      (data) =>
        data.qty <
        Number(data.received) + Number(data.defect) + Number(data.unsuitable)
    );
    const validateLowerQuantity = receivedData.filter(
      (data) =>
        data.qty >
        Number(data.received) + Number(data.defect) + Number(data.unsuitable)
    );

    const validateFieldEmpty = receivedData.filter(
      (data) =>
        data.received === "" && data.unsuitable === "" && data.defect === ""
    );

    if (validateFieldEmpty.length !== 0) {
      swal("Oops", "Please input at least 1 field per row !", "error");
      return;
    }

    if (validateHigherQuantity.length !== 0) {
      setOpenModal(true);
      content.title =
        "Quantity inputted is higher than Quantity ordered, are you sure you want to proceed ?";
    } else if (validateLowerQuantity.length !== 0) {
      setOpenModal(true);
      content.title =
        "Quantity inputted is lower than Quantity ordered, are you sure you want to proceed ?";
    } else {
      setOpenModal(true);
      content.title = "Are you sure want to submit ?";
    }
  };
  return (
    <div>
      <CustomizeModal
        content={content}
        openModal={openModal}
        setOpenModal={setOpenModal}
        actions={postData}
        setUpdate={setUpdate}
      />
      <div
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer"
        onClick={() => {
          handleOpen();
        }}
      >
        Received Manual
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex justify-end -mt-5">
              <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Received Manual For : {id_so}
            </Typography>
            <div
              className="flex flex-col justify-between"
              style={{ height: 500 }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <ReceivedManualTable
                  dataOrder={dataOrder}
                  receivedData={receivedData}
                  setReceivedData={setReceivedData}
                />
              </Suspense>
              <div className="my-3 text-center">
                <hr />
                <button
                  className="mt-3 p-2 bg-blue-400 text-white rounded-md"
                  onClick={submitData}
                >
                  Submit
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
