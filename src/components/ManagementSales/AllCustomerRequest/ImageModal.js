import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 650,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function ImageModal({ image }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div onClick={handleOpen}>
        <img
          src={image}
          alt='uploaded'
          className='w-full object-contain rounded-md'
        />
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='h-full flex flex-col justify-center items-center'>
              <img
                src={image}
                alt='attachment'
                className='w-full h-full object-contain mb-5'
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
