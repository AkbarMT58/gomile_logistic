import React, { useState } from 'react';
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
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { CircularProgress } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { getActivitySales } from 'service/api';
import ImageModal from '../OBE/ImageModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: 'full',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
  overflow: 'auto',
};

const ModalDetailActivity = ({ sales }) => {
  const [open, setOpen] = useState(false);
  const [dataDetailActivity, setdataDetailActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDAta, setFilterDAta] = useState({
    start: '',
    end: '',
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilterDAta({ ...filterDAta, [name]: value });
  };

  const fetchActivitySales = async () => {
    setLoading(true);

    const startParams =
      filterDAta.start !== '' ? `start=${filterDAta.start}&` : '';
    const endParams = filterDAta.end !== '' ? `end=${filterDAta.end}` : '';

    const params = sales + `?` + startParams + endParams;

    const response = await getActivitySales(params);
    if (response?.status === 200) {
      setdataDetailActivity(response?.data);
      setLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    fetchActivitySales();
    setOpen(true);
  };

  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );

  return (
    <div>
      <Tooltip title='Detail Activity Sales'>
        <IconButton onClick={handleOpen}>
          <NoteAltIcon />
        </IconButton>
      </Tooltip>
      <Modal
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
            <div className='flex items-center gap-[200px]'>
              <div className='text-gray-600 text-xl capitalize'>{sales}</div>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='Start date'
                  name='start'
                  max={maxDate}
                  value={filterDAta.start}
                  onChange={handleSelectChange}
                  className='px-2 rounded-md w-40 border border-gray-200 focus:outline-blue cursor-pointer'
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
                <input
                  type='text'
                  placeholder='End date'
                  name='end'
                  max={maxDate}
                  value={filterDAta.end}
                  onChange={handleSelectChange}
                  className='px-2 rounded-md w-40 border border-gray-200 focus:outline-blue cursor-pointer'
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
                <button
                  className='bg-blue-500 disabled:bg-gray-500 rounded-md p-2 text-white hover:bg-blue-400 transition-all uppercase'
                  onClick={fetchActivitySales}>
                  Filter
                </button>
              </div>
            </div>
            <div className='p-5'>
              <TableContainer
                sx={{ maxHeight: 440 }}
                component={Paper}
                className='variant-scroll'>
                <Table stickyHeader sx={{ minWidth: 650 }}>
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
                      {dataDetailActivity.map((row, id) => (
                        <TableRow key={id}>
                          <TableCell>{id + 1}</TableCell>
                          <TableCell>{row.customer}</TableCell>
                          <TableCell>{row.keterangan}</TableCell>
                          <TableCell>
                            {row.gambar && <ImageModal image={row.gambar} />}
                          </TableCell>
                          <TableCell>{row.jenis}</TableCell>
                          <TableCell>{row.tanggal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalDetailActivity;
