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
import { getReportDetailProduct, reduceQty, deleteMyTaskReport } from 'service/api';
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

const ReduceQuantityModal = ({ data, idOrder, status, issue, setUpdate }) => {
  const [detailProduct, setDetailProduct] = useState([])
  const [errorMoq, setErrorMoq] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState({
    price: '1000',
    shipCost: '2000',
    total: '3000'
  })
  const [isLoading, setIsLoading] = useState(false)

  const get_ReportDetailProduct = async () => {
    setIsLoading(true)
    const response = await getReportDetailProduct(idOrder)
    if (response?.status === 200) {
      setDetailProduct(response.data)
    }
    setIsLoading(false)
  }
  
const handleChangeValue = (e, name) => {
  setValue(prev => {return {...prev, [name]: e.target.value}})
}

const changeReducedQty = (e, data, index) => {
  const newDetailProduct = [...detailProduct]
  if(!e.target.value) {
    newDetailProduct[index].reduced_qty = 0
  } else {
    if(parseInt(e.target.value) <= data.qty) {
      if(data.moq !== undefined) {
        if(data.qty - parseInt(e.target.value) >= data.moq) {
          setErrorMoq(prevErrors => prevErrors.filter((err) => err !== data.idvariant))
        } else {
          setErrorMoq([...new Set([...errorMoq, data.idvariant])])
        }
        newDetailProduct[index].reduced_qty = parseInt(e.target.value)
      } else {
        newDetailProduct[index].reduced_qty = ''
      }
    }
  }
  setDetailProduct(newDetailProduct)
}

const getTotalPrice = detailProduct.reduce((total, curr) => {
  const currentQtyFinal = curr.reduced_qty ? curr.reduced_qty : 0;
  return total + (currentQtyFinal * curr.price)
}, 0)

const handleSubmitReduceQty = async () => {
  const finalDetailProducts = [...detailProduct]
  const reducedDetailProducts = finalDetailProducts.filter((item) => item.reduced_qty && item.reduced_qty > 0)

  const finalQtyProduct = []
  reducedDetailProducts.map((product) => {
    const newFinalQtyProduct = {
      id_product: product.idvariant,
      qty: product.reduced_qty,
      price: product.price
    }
    finalQtyProduct.push(newFinalQtyProduct)
  })
  const payload = {
    id_so: idOrder,
    product: finalQtyProduct
  }

  const response = await reduceQty(JSON.stringify(payload))
  if (response.status === 200) {
    setUpdate((prev) => !prev);
    handleClose()
  }
}

const delete_MyTaskReport = async () => {
  swal({
    title: "Report Task",
    text: "Are you sure want to report this task and move it to Product Development?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((yes) => {
    if (yes) {
      reportMyTask()
    }
  });
}

const reportMyTask = async () => {  
  const response = await deleteMyTaskReport(idOrder)
  if (response.status === 200) {
    setUpdate((prev) => !prev);
    handleClose()
  }
}

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
        Reduce Quantity
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
            Reduce Quantity
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
                      <TableCell align='center'>MoQ</TableCell>
                      <TableCell align='center'>QTY to Reduce</TableCell>
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
                          <TableCell align='center'>{row?.price?.toLocaleString("id-ID")}</TableCell>
                          <TableCell align='center'>{row.qty}</TableCell>
                          <TableCell align='center'>{row.moq}</TableCell>
                          <TableCell align='center'>
                            <input 
                              type="number" 
                              value={row.reduced_qty} 
                              max={row.qty} 
                              className={`${errorMoq.includes(row.idvariant) && "text-red-500"} text-center w-12 border rounded-md`} 
                              disabled={row.moq === undefined}
                              onChange={(e) => changeReducedQty(e, row, index)} />
                          </TableCell>
                        </TableRow>
                    ))} 
                    <TableRow>
                      <TableCell colSpan={6} className='space-y-2'>
                        <div className="flex justify-between items-center">
                            <div className="w-3/6">
                              <div className="flex">
                                <div>
                                  Total Price <span className='text-xs'>(Reduced, minimal {data?.additional_payment?.toLocaleString("id-ID")})</span>
                                </div>
                                <span className='font-bold'>:</span>
                              </div>
                              <div className="flex flex-col">
                                {getTotalPrice && getTotalPrice <= data.additional_payment ?
                                  <div className="text-red-600 text-xs italic">*Total Reduced Price does not reach Minimum Reduced Price</div>
                                  : null
                                }
                                {errorMoq?.length !== 0 ?
                                  <div className="text-red-600 text-xs italic">*Variant id {errorMoq.join(", ")} does not reach MOQ</div>
                                  : null
                                }
                              </div>
                            </div>
                            <div className="w-2/6 flex justify-between border rounded-md px-2 py-1">
                              Rp. <NumberFormat
                                value={getTotalPrice}
                                className='text-right focus:outline-none'
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                decimalScale={2}
                                // prefix={'Rp. '}
                                readOnly
                                onChange={(e) => handleChangeValue(e, 'price')}
                              />
                            </div>
                        </div>
                        {/* <div className="flex justify-between items-center">
                            <div className="w-1/3 flex justify-between">
                              Shipping Cost (Reduced)
                              <span className='font-bold'>:</span>
                            </div>
                            <div className="w-1/3 flex justify-between border rounded-md px-2 py-1">
                              Rp. <NumberFormat
                                value={value.shipCost}
                                className='text-right focus:outline-none'
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                decimalScale={2}
                                // prefix={'Rp. '}
                                onChange={(e) => handleChangeValue(e, 'shipCost')}
                              />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="w-1/3 flex justify-between">
                              Total
                              <span className='font-bold'>:</span>
                            </div>
                            <div className="w-1/3 flex justify-between border rounded-md px-2 py-1">
                              Rp. <NumberFormat
                                value={value.total}
                                className='text-right focus:outline-none'
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                decimalScale={2}
                                // prefix={'Rp. '}
                                onChange={(e) => handleChangeValue(e, 'total')}
                              />
                            </div>
                        </div> */}
                        <div className="flex flex-col items-end gap-y-2">
                          <div className={`${getTotalPrice > data.additional_payment && errorMoq.length === 0 ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300"} text-white px-5 py-1 rounded`} 
                          onClick={() => getTotalPrice > data.additional_payment && errorMoq.length === 0 ? handleSubmitReduceQty() : null}>
                            Submit
                          </div>
                          <div className={`bg-sky-500 hover:bg-sky-600 cursor-pointer text-white px-5 py-1 rounded`}
                          onClick={delete_MyTaskReport}>
                            Report
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Box>
      </Modal>
    </>
  );
};

export default ReduceQuantityModal;
