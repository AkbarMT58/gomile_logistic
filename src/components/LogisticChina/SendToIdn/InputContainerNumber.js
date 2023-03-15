import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { checkContainerId, updateContainerNumber } from 'service/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function InputContainerNumber({ id_so, setUpdate, carton }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [containerNumber, setContainerNumber] = useState('');

  const updateContainer = async () => {
    if (containerNumber) {    
      const response = await checkContainerId(containerNumber);
      if(response?.status === 200) {
        if(response.data.data.length === 0) {
          submitContainer()
        } else {
          if(response.data.data[0].status === '' || 
              response.data.data[0].status === 'repacking' || 
              response.data.data[0].status === 'Shipping to Indonesia') {
              submitContainer()
          } else {
            swal(
              'Oops',
              `Currently container ID ${containerNumber} is being sent to IND!`,
              'warning'
            )
          }
        }
      }
    } else {
      swal('Oops', 'Container number required !', 'error');
    }
  };

  const submitContainer = async () => {
    const body = JSON.stringify({
      id_so,
      container_number: containerNumber,
      carton,
    });
    const data = await updateContainerNumber(body);
    if (data?.status === 200) {
      setUpdate((prev) => !prev);
      swal('Success', 'Container data updated successfully', 'success');
      handleClose();
    }
    if (data?.status === 400) {
      swal('Oops', 'Input not valid !', 'error');
    }
    if (data?.status === 500) {
      swal('Oops', 'Internal server error !', 'error');
    }
  }

  return (
    <>
      <button
        disabled={carton.length === 0}
        className="p-2 border border-blue-500 rounded-md px-3"
        onClick={handleOpen}>
        Input Container
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
            Container Number
          </Typography>
          <div className="flex flex-col space-y-3 my-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Container Number</label>
              <input
                type="text"
                name="containerNumber"
                value={containerNumber}
                onChange={(e) => setContainerNumber(e.target.value)}
                className="p-2 rounded-md border border-gray-300 focus:outline-blue"
              />
            </div>
            <div className="flex flex-col space-y-1 ">
              <label className="text-sm font-semibold">
                List Carton Number
              </label>
              <hr />
              <ul
                type="circle"
                className="max-h-[13rem] overflow-y-auto  space-y-1 ">
                {carton.map((data, id) => (
                  <li key={id}>{data}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center space-y-3">
            <hr />
            <button
              onClick={updateContainer}
              className="bg-blue-500 rounded-md p-2 px-4 text-sm text-white">
              SUBMIT
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
