import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import DetailListBoxTable from "./DetailListBoxTable";
import { getDetailContainerData } from "service/api";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function DetailContainerModal({ container_number }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [detailContainer, setDetailContainer] = useState([]);
  const handleClose = () => setOpen(false);
  const getDetailData = async () => {
    const data = await getDetailContainerData(container_number);
    if (data?.status === 200) {
      setDetailContainer(data.data);
    }
  };

  return (
    <div>
      <button
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center  w-full"
        onClick={() => {
          handleOpen();
          getDetailData(container_number);
        }}
      >
        Detail
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
            Detail Container
          </Typography>
          <DetailListBoxTable dataContainer={detailContainer} />
        </Box>
      </Modal>
    </div>
  );
}
