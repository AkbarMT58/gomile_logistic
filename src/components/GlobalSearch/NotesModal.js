import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import {
  IconButton,
  TableContainer,
  Tooltip,
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

export default function NotesModal({ id }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notesData, setNotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const body = JSON.stringify({ note: notes, id_so: id });

    const response = await postOrderNotesData(body);
    if (response?.status === 200) {
      swal('Notes added successfully', {
        icon: 'success',
      });
      // setUpdate((prev) => !prev);
    }
  };

  const addNotes = (id, notes) => {
    swal({
      title: 'Are you sure?',
      text: 'Once add notes, you will not be able to revert this change!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willPosted) => {
      if (willPosted) {
        postNotes(id, notes);
      } else {
        swal('Add notes canceled!');
        handleClose();
      }
    });
  };

  return (
    <div>
      <Tooltip title="Add Notes">
        <IconButton
          onClick={() => {
            handleOpen();
            getNotes(id);
          }}>
          <NoteAltIcon />
        </IconButton>
      </Tooltip>
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
              Notes
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
                      <TableCell>Notes</TableCell>
                      <TableCell>Dates</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notesData.length > 0 ? (
                      notesData.map((note) => (
                        <TableRow>
                          <TableCell>{note.user}</TableCell>
                          <TableCell>{note.note}</TableCell>
                          <TableCell>{note.date}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <div className="flex items-center mt-4 w-full space-x-3">
              <TextField
                id="outlined-basic"
                label="Add Notes"
                variant="outlined"
                onChange={handleChange}
                value={notes}
                className="flex-grow h-1/2"
                size="small"
                color="primary"
              />
              <button
                className="p-2 bg-blue-300 text-white rounded-md cursor-pointer"
                onClick={() => addNotes(id, notes)}>
                Submit
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
