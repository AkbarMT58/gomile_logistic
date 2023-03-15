import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  Typography,
  Modal,
  Fade,
  Box,
  Backdrop,
} from "@mui/material";
import SolveIssueForm from './SolveIssueForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 650,
  height: "auto",
  bgcolor: '#f8f8f8',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const SolveIssueModal = ({ data, idOrder, status, issue, setUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className={`${status == 'paid' ? 'bg-gray-300 text-white' : 'border text-blue-500 border-blue-500'} py-2 px-5 border text-blue-500 border-blue-500 rounded-md text-center cursor-pointer whitespace-nowrap`}
        onClick={() => {
          handleOpen();
        }}
        // disabled={status !== 'paid'}
      >
        Solve Issue
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style} className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-end -mt-5'>
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Solve Issue
          </Typography>
          
          <SolveIssueForm data={data} id={idOrder} handleClose={handleClose} setUpdate={setUpdate} />
        </Box>
      </Modal>
    </>
  );
};

export default SolveIssueModal;
