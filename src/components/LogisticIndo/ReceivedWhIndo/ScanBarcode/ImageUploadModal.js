import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Tooltip } from '@mui/material';
import CameraAlt from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};
export default function ImageUploadModal({ setImageUrl, imageUrl }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Input = styled('input')({
    display: 'none',
  });

  const submitImage = (e) => {
    if (imageUrl.length < 5) {
      let formData = new FormData();
      formData.append('gambar', e.target.files[0]);
      fetch(`${process.env.REACT_APP_URL_API_IMAGE_UPLOAD}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setImageUrl([...imageUrl, data.file]);
          } else {
            swal('Oops', data.message, 'error');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      swal('Oops', 'Maksimum image uploaded !', 'error');
    }
  };

  return (
    <div>
      <button
        className="p-2 px-5 border border-blue-400 text-blue-400  rounded-md"
        onClick={handleOpen}>
        Upload Image
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Image
          </Typography>

          <div className="flex  flex-col ]min-h-32 border rounded-md my-2 p-3">
            <p className="m-2 text-sm">Preview Image</p>
            <div className="flex">
              {imageUrl.map((image) =>
                !image ? (
                  <div>Upload Image</div>
                ) : (
                  <div>
                    <img
                      src={`https://ocistok.co.id/control-panel/foto/${image}`}
                      alt=""
                      className="w-32 object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex items-center justify-end text-sm">
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                onChange={(e) => submitImage(e)}
                type="file"
              />
              <Tooltip title="Add image">
                <Button
                  aria-label="upload picture"
                  component="span"
                  variant="contained"
                  size="small"
                  endIcon={<CameraAlt />}>
                  Upload
                </Button>
              </Tooltip>
            </label>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
