import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
import { trackingModal } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function TrackingModal({ id }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [trackingData, setTrackingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const trackingHandler = async (id) => {
    const data = await trackingModal(id);
    if (data) {
      setTrackingData(data.data);
    }
    setIsLoading(false);
  };

  const rows = [trackingData];

  return (
    <>
      <Tooltip title='Tracking Order'>
        <button
          onClick={() => {
            handleOpen();
            trackingHandler(id);
          }}
          className='bg-blue-500 py-2 rounded-md text-white shadow
          hover:bg-blue-700'>
          Tracking
        </button>
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
              <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Tracking Order
            </Typography>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                      <TableCell>Order ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Detail</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>User</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trackingData.length === 0 && (
                      <TableRow>
                        <TableCell
                          align='center'
                          className='text-center'
                          colSpan={5}>
                          Data Not Found
                        </TableCell>
                      </TableRow>
                    )}
                    {rows.map((rowData) =>
                      rowData.map((row, id) => (
                        <TableRow key={id}>
                          <TableCell>{row.id_so}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.keterangan}</TableCell>
                          <TableCell>{row.tanggal}</TableCell>
                          <TableCell>
                            {row.user.slice(0, 1).toUpperCase() +
                              row.user.slice(1)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
