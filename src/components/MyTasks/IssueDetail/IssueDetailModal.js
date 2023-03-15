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
import { getReportDetailProduct } from 'service/api';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: "auto",
  bgcolor: '#f8f8f8',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const IssueDetailModal = ({ data, idOrder, status, issue }) => {
  const [detailProduct, setDetailProduct] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false)

  const get_ReportDetailProduct = async () => {
    setIsLoading(true)
    const response = await getReportDetailProduct(idOrder)
    if (response.status === 200) {
      setDetailProduct(response.data)
    }
    setIsLoading(false)
  }

  const getTotalPrice = detailProduct.reduce((total, curr) => {
    const currentQtyFinal = curr.qty_final ? curr.qty_final : 0;
    return total + (currentQtyFinal * curr.price)
  }, 0)

  return (
    <>
      <button
        className={`${status == 'paid' ? 'bg-gray-300 text-white' : 'border text-blue-500 border-blue-500'} py-2 px-5 border text-blue-500 border-blue-500 rounded-md text-center cursor-pointer whitespace-nowrap`}
        onClick={() => {
          get_ReportDetailProduct()
          handleOpen();
        }}
        // disabled={status !== 'paid'}
      >
        Issue Details
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
            Issue Details
          </Typography>
          <Typography>
            {issue}
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
                      <TableCell>Product</TableCell>
                      <TableCell align='center'>Varian</TableCell>
                      <TableCell align='center'>Harga</TableCell>
                      <TableCell align='center'>QTY Ordered</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailProduct?.length === 0 && (
                      <TableRow>
                        <TableCell
                          align='center'
                          className='text-center'
                          colSpan={5}>
                          Data Not Found
                        </TableCell>
                      </TableRow>
                    )}
                    {detailProduct?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className=''>{row.product}</TableCell>
                          <TableCell align='center'>{row.idvariant}</TableCell>
                          <TableCell align='center'>{row.price.toLocaleString("id-ID")}</TableCell>
                          <TableCell align='center'>{row.qty}</TableCell>
                        </TableRow>
                    ))} 
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Box>
      </Modal>
    </>
  );
};

export default IssueDetailModal;
