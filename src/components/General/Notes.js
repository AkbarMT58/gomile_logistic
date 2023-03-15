import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { useState } from 'react';
import { getOrderNotesData, postOrderNotesData } from 'service/api';
import { styled } from '@material-ui/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageModal from 'components/ManagementSales/CustomerManagement/ImageModal';
// import AnnouncementIcon from '@mui/icons-material/Announcement';
// import ReportIssueForm from './ReportIssueForm';
// import { getUser } from 'helpers/parseJWT';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const Input = styled('input')({
  display: 'none',
});

export default function Notes({
  id,
  id_group,
  endpoint,
  task_status,
  setUpdate,
  isComment,
  isCheck,
  commentStatus,
  totalNotes,
  dataOrder,
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notesData, setNotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const getNotes = async (id) => {
    setIsLoading(true);
    const data = await getOrderNotesData(id);
    if (data) {
      setNotesData(data.data);
    }
    setIsLoading(false);
  };

  const postNotes = async (id, notes) => {
    if (notes.trim() !== '') {
      const body = JSON.stringify({ note: notes, id_so: id, image });
      const response = await postOrderNotesData(body);
      if (response?.status === 200) {
        swal('Notes added successfully', {
          icon: 'success',
        });
        getNotes(id);
        setNotes('');
        setImage('');
        setUpdate((prev) => !prev);
      } else if (response?.status === 400) {
        swal('Oops', response?.message, 'error');
      }
    } else {
      swal('Oops', 'Please add notes before submit!', 'error');
    }
  };

  const addNotes = (e, id, notes) => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: `Once add ${
        isComment ? 'comment' : 'notes'
      }, you will not be able to revert this change!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willPosted) => {
      if (willPosted) {
        postNotes(id, notes);
      } else {
        swal(`Add  ${isComment ? 'comment' : 'notes'} canceled !`);
        handleClose();
      }
    });
  };

  const submitImage = (e) => {
    if (e.target.files[0].size > 3000000) {
      swal('Oops', 'Image size over 3MB', 'error');
      return;
    }
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
    <div>
      <div
        className={`${
          isComment && commentStatus
            ? 'ring ring-yellow-300 border-yellow-500 text-yellow-600'
            : 'text-blue-500 border-blue-500'
        } py-2 px-3 border  text-sm  rounded-md text-center cursor-pointer space-x-2 flex items-center justify-center`}
        onClick={() => {
          handleOpen();
          getNotes(id);
        }}>
        <p className={isCheck && 'uppercase text-xs'}>
          {isComment ? 'Comment ' : 'Notes '}
          {!totalNotes || totalNotes <= 0 ? null : (
            <span
              className={`text-white font-semibold bg-red-600 rounded-xl px-[7px]`}>
              {totalNotes}
            </span>
          )}
        </p>
        {/* {isComment && commentStatus && <AnnouncementIcon fontSize="small" />} */}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex justify-end -mt-5">
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {isComment ? 'Comment' : 'Notes'}
            </Typography>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <div className="flex flex-col">
                  <CircularProgress />
                  <p className="text-gray-500 text-sm mt-2">Loading ...</p>
                </div>
              </Box>
            ) : (
              <TableContainer
                sx={{ maxHeight: 440 }}
                component={Paper}
                className="variant-scroll">
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>{isComment ? 'Comment' : 'Notes'}</TableCell>
                      <TableCell>Dates</TableCell>
                      {isComment && <TableCell>Image</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notesData?.length > 0 ? (
                      notesData?.map((note, id) => (
                        <TableRow key={id}>
                          <TableCell>{note.user}</TableCell>
                          <TableCell>{note.note}</TableCell>
                          <TableCell>{note.date}</TableCell>
                          {isComment && (
                            <TableCell>
                              {note.image ? (
                                <ImageModal image={note.image} />
                              ) : (
                                <div>-</div>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={isComment ? 4 : 3} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {isComment && (
              <div className="flex mt-2 mb-1 items-center space-x-1">
                <label
                  htmlFor="icon-button-file"
                  className="flex items-center text-sm text-white bg-blue-500 p-2 rounded-md space-x-2">
                  <p>Upload Image</p>
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    onChange={(e) => submitImage(e)}
                    type="file"
                  />
                  <CameraAltIcon fontSize="small" />
                </label>
                {image && <em>{image} uploaded</em>}
              </div>
            )}
            <form
              onSubmit={(e) => addNotes(e, id, notes)}
              className="notes flex items-center  w-full space-x-3 mt-1">
              <TextField
                id="outlined-basic"
                label={isComment ? 'Add Comment' : 'Add Notes'}
                variant="outlined"
                onChange={handleChange}
                value={notes}
                className="flex-grow px-5"
                size="small"
                color="primary"
              />
              <button
                type="submit"
                className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md cursor-pointer">
                Submit
              </button>
            </form>

            {/* {task_status === null && endpoint === 'new_orders' && getUser().roles.includes('admin') &&
              <div className="form-report-isu border border-gray-300 rounded-md mt-2 p-3">
                <Typography variant="h6" component="h3">
                  Report Issue
                </Typography>
                <ReportIssueForm 
                  id={id} 
                  id_group={id_group} 
                  endpoint={endpoint} 
                  handleClose={handleClose} 
                  setUpdate={setUpdate} 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading}
                  dataOrder={dataOrder}
                />
              </div>
            } */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
