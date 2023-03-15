import React from "react";
import { Modal, Fade, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ modalOpen, setModalOpen, handleModal, title, children }) => {
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

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={setModalOpen}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <Box sx={style}>
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleModal} className="text-right">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="flex flex-col gap-5">
            <div className="text-lg">{title}</div>
            {children}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
