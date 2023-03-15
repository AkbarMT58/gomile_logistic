import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxwidth: 800,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 3,
};

const Input = styled('input')({
  display: 'none',
});

export default function BannerModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState('');
  const randomId = Math.round(Math.random(5) + 1);
  const submitImage = (e) => {
    const ext = e.target.files[0].name.split('.');

    let formData = new FormData();
    if (ext[1] !== 'jpg') {
      swal('Oops', 'Image type must be .jpg format', 'error');
    } else {
      if (e.target.files[0].size > 3000000) {
        swal('Oops', 'Banner size over 3MB', 'error');
        return;
      }
      const newName = `banner-catalog.jpg`;
      formData.append('gambar', e.target.files[0], newName);
      fetch(`${process.env.REACT_APP_URL_API_IMAGE_UPLOAD}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setImage(data.file);
          } else {
            swal('Oops', data.message, 'error');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className='p-2 bg-orange-500 text-sm px-3 rounded-md hover:bg-orange-300  transition-all duration-300'>
        Banner
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flex justify-end -mt-5'>
            <IconButton
              onClick={() => {
                handleClose();
              }}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Change Banner
          </Typography>
          <div className='mb-2'>
            <img
              src={`https://ocistok.co.id/control-panel/foto/banner-catalog.jpg?id=${randomId}`}
              alt='Banner'
            />
          </div>
          <label htmlFor='contained-button-file'>
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
              onChange={submitImage}
            />
            <Button variant='contained' component='span'>
              Upload
            </Button>
          </label>
        </Box>
      </Modal>
    </div>
  );
}
