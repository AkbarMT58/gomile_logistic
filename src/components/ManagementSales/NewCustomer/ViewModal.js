import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  CircularProgress,
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  Table,
  Tooltip,
  Typography,
  Fade,
  Modal,
  Box,
  Backdrop,
} from '@mui/material';
import { getDetailsNewCustomerData } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
  width: '80%',
};

export default function ViewModal({ email }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [detailsNewCustomer, setDetailsNewCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailsNewCustomer = async (email) => {
    const data = await getDetailsNewCustomerData(email);

    if (data?.status === 200) {
      setDetailsNewCustomer(data?.data);
    } else {
      swal(`Failed Get Details Customer Error : ${data.message} `, {
        icon: 'warning',
        button: false,
        timer: 2000,
      });
    }

    setIsLoading(false);
  };

  const rows = [detailsNewCustomer];

  return (
    <>
      <Tooltip title='Detail Customer'>
        <IconButton
          onClick={() => {
            handleOpen();
            fetchDetailsNewCustomer(email);
          }}>
          <LaunchIcon />
          {/* <RemoveRedEyeIcon /> */}
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
              Detail New Customer
            </Typography>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <div className='flex flex-col'>
                  <CircularProgress />
                  <p className='text-gray-500 text-sm mt-2'>Loading ...</p>
                </div>
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 440 }}
                className='variant-scroll'>
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nama</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Telepon</TableCell>
                      <TableCell>Alamat</TableCell>
                      <TableCell>Tanggal Register</TableCell>
                      <TableCell>Sales</TableCell>
                      <TableCell>Level</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.nama}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.telepon}</TableCell>
                        <TableCell>
                          {data?.Alamat?.length === 0
                            ? 'Belum Mengisi Alamat'
                            : data?.Alamat?.map((asal) => (
                                <>
                                  <div className='flex flex-col gap-2 border-b pb-2 mb-2 border-black'>
                                    <div className='text-xs'>
                                      <span className='font-bold'>
                                        kecamatan :{' '}
                                      </span>
                                      {asal.kecamatan}
                                    </div>
                                    <div className='text-xs'>
                                      <span className='font-bold'>
                                        kabupaten :{' '}
                                      </span>
                                      {asal.kabupaten}
                                    </div>
                                    <div className='text-xs'>
                                      <span className='font-bold'>
                                        Provinsi :{' '}
                                      </span>
                                      {asal.provinsi}
                                    </div>
                                    <div className='text-xs'>
                                      <span className='font-bold'>
                                        kode_pos :{' '}
                                      </span>
                                      {asal.kode_pos}
                                    </div>
                                    <div className='text-xs'>
                                      <span className='font-bold'>
                                        Catatan :{' '}
                                      </span>
                                      {asal.alamat}
                                    </div>
                                  </div>
                                </>
                              ))}
                        </TableCell>
                        <TableCell>{data.tanggal}</TableCell>
                        <TableCell>
                          {!data?.sales === ''
                            ? data.sales
                            : 'Belum Memiliki Sales'}
                        </TableCell>
                        <TableCell>{data.level}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
