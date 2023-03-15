import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  IconButton,
  Tooltip,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Typography,
  Fade,
  Box,
  Backdrop,
  Modal,
} from '@mui/material';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@material-ui/core';
import ImageModal from './ImageModal';
import { addSalesActivity } from 'service/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const Input = styled('input')({
  display: 'none',
});

export default function NotesModal({
  notesData,
  changeData,
  email,
  setSearchData,
  customer,
  dataFromSearch,
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [activity, setActivity] = useState('');
  const handleActivity = (e) => setActivity(e.target.value);
  const handleChange = (e) => setNotes(e.target.value);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [loading, setLoading] = useState(false);

  const submitActivity = async (image, activity, notes) => {
    setLoading(true);

    const body = JSON.stringify({
      notes: notes,
      customer: email,
      imgLink: image.trim() !== '' ? image : 'null',
      activity: activity,
    });

    const data = await addSalesActivity(body);
    if (dataFromSearch) {
      setSearchData(`/${email}`);
    }

    if (data?.status === 200) {
      swal('Activity added successfully', {
        icon: 'success',
        button: false,
        timer: 2000,
      });
      setActivity('');
      setImage('');
      setNotes('');
      changeData((prev) => !prev);
    }
    setLoading(false);
  };

  const addNotes = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once add activity, you will not be able to revert this change!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (activity === '') {
          swal(
            'Oops',
            'Please select activity before submit your activity',
            'error'
          );
          return;
        }
        if (notes.trim() === '') {
          swal('Oops', "Notes can't be empty", 'error');
          return;
        }
        submitActivity(image, activity, notes);
      } else {
        swal('Add notes canceled!');
        handleClose();
      }
    });
  };

  const submitImage = (e) => {
    let formData = new FormData();
    formData.append('gambar', e.target.files[0]);
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
  };

  return (
    <>
      <Tooltip title='Sales Activity'>
        <IconButton onClick={handleOpen}>
          <NoteAltIcon />
        </IconButton>
      </Tooltip>
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
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Sales Activity
            </Typography>

            <p className='mb-2'>{customer}</p>
            <TableContainer
              sx={{ maxHeight: 440 }}
              component={Paper}
              className='variant-scroll'>
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Attachment</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Dates</TableCell>
                  </TableRow>
                </TableHead>
                {loading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} align='center'>
                        <div className='flex flex-col items-center'>
                          <CircularProgress />
                          <p className='text-gray-500 text-sm mt-2'>
                            Loading ...
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {notesData?.map(
                      (row, id) =>
                        row !== null && (
                          <TableRow key={id}>
                            <TableCell>{id + 1}</TableCell>
                            <TableCell>{row.sales}</TableCell>
                            <TableCell>{row.notes}</TableCell>
                            <TableCell>
                              {row.image && <ImageModal image={row.image} />}
                            </TableCell>
                            <TableCell>{row.source}</TableCell>
                            <TableCell>{row.date}</TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <div className='flex items-center mt-4 w-full space-x-3 '>
              <p>Source:</p>
              <select
                onChange={handleActivity}
                className='focus:outline-blue border border-gray-300 rounded-md p-1'>
                <option value=''>Select activity</option>
                <option value='Telephone'>Phone</option>
                <option value='Multichannel Whatsapp'>
                  Multichannel Whatsapp
                </option>
                <option value='Whatsapp Personal'>Whatsapp Personal</option>
              </select>
              <div className='flex items-center'>
                <p>Upload Image:</p>
                <label htmlFor='icon-button-file'>
                  <Input
                    // accept="image/*"
                    id='icon-button-file'
                    onChange={(e) => submitImage(e)}
                    type='file'
                  />
                  <Tooltip title='Add image'>
                    <IconButton aria-label='upload picture' component='span'>
                      <CameraAltIcon />
                    </IconButton>
                  </Tooltip>
                </label>
                {image && <p className='text-sm'>{image} uploaded</p>}
              </div>
            </div>
            <div className='flex items-center mt-4 w-full space-x-3'>
              <input
                type='text'
                onChange={handleChange}
                value={notes}
                placeholder='Add Notes'
                className='flex-grow border p-2 border-gray-300 rounded-md focus:outline-blue'
              />
              <button
                className='p-2 bg-blue-300 text-white rounded-md cursor-pointer'
                onClick={() => addNotes(image, activity, notes)}>
                Submit
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
