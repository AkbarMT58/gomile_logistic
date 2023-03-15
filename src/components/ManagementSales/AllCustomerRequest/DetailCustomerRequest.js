import * as React from 'react';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { getUser } from 'helpers/parseJWT';
import Modal from '@mui/material/Modal';
import swal from 'sweetalert';
import { getDetailCustomerRequest } from 'service/api';
import NumberFormat from 'react-number-format';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '70%',
  boxShadow: 24,
  p: 4,
};

const DetailCustomerRequest = ({ id, updatedBy }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [updatedActor, setUpdatedActor] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openDetail = async () => {
    setIsLoading(true);
    setUpdatedActor(updatedBy);
    const response = await getDetailCustomerRequest(id);
    if (response.status === 200) {
      setData(response.data);
      handleOpen();
    } else {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button
        onClick={openDetail}
        className="w-full flex items-center justify-center border border-blue-500 py-1 text-blue-500 rounded-md focus:outline-none">
        {isLoading ? <CircularProgress size={20} /> : 'Detail'}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Variant</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Price /pcs</TableCell>
                  <TableCell>Price /box</TableCell>
                  <TableCell>Silver</TableCell>
                  <TableCell>Gold</TableCell>
                  <TableCell>Diamond</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Updated By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                )}
                {data.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell title={item?.variant}>
                        <p className="line-clamp-2">{item?.variant}</p>
                      </TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>{item?.category ?? '-'}</TableCell>
                      <TableCell>{item?.reason ?? '-'}</TableCell>
                      <TableCell>
                        <div className="max-w-xl min-w-max">
                          <p className="text-xs">Ship</p>
                          <p className="text-xs">Airplane</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-xl min-w-max">
                          <NumberFormat
                            value={item?.seaPrice?.perPcs}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                          <NumberFormat
                            value={item?.airPrice?.perPcs}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-xl min-w-max">
                          <NumberFormat
                            value={item?.seaPrice?.perBox}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                          <NumberFormat
                            value={item?.airPrice?.perBox}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-xl min-w-max">
                          <NumberFormat
                            value={
                              item?.seaPrice?.simulation +
                              Number(
                                item.price *
                                  1.15 *
                                  getUser().tokenData.data.exchange
                              )
                            }
                            fixedDecimalScale={true}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                          <NumberFormat
                            value={
                              item?.airPrice?.simulation +
                              Number(
                                item.price *
                                  1.15 *
                                  getUser().tokenData.data.exchange
                              )
                            }
                            fixedDecimalScale={true}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-xl min-w-max">
                          <NumberFormat
                            value={
                              item?.seaPrice?.simulation +
                              Number(
                                item.price *
                                  1.12 *
                                  getUser().tokenData.data.exchange
                              )
                            }
                            fixedDecimalScale={true}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                          <NumberFormat
                            value={
                              item?.airPrice?.simulation +
                              Number(
                                item.price *
                                  1.12 *
                                  getUser().tokenData.data.exchange
                              )
                            }
                            fixedDecimalScale={true}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col max-w-xl min-w-max">
                          <NumberFormat
                            value={
                              item?.seaPrice?.simulation +
                              Number(
                                item.price *
                                  1.07 *
                                  getUser().tokenData.data.exchange
                              )
                            }
                            fixedDecimalScale={true}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                          <NumberFormat
                            value={
                              item?.airPrice?.simulation +
                              Number(
                                item.price *
                                  1.07 *
                                  getUser().tokenData.data.exchange
                              )
                            }
                            fixedDecimalScale={true}
                            displayType={'text'}
                            className="text-xs"
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={item?.totalPrice}
                          displayType={'text'}
                          className="text-xs"
                          thousandSeparator={true}
                          prefix={'IDR '}
                          decimalScale={2}
                        />
                      </TableCell>
                      <TableCell>
                        <p>{updatedActor ?? '-'}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailCustomerRequest;
