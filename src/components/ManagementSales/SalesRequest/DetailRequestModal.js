import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import {
  cancelVolumeData,
  cancelVolumeDataAll,
  getDetailRequest,
  inputSalesProduct,
  inputsalesVolumePIC,
} from 'service/api';
import { getUser } from 'helpers/parseJWT';
import RestoreIcon from '@mui/icons-material/Restore';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';
import pic from 'helpers/pic';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function DetailRequestModal({
  id_request,
  isLoading,
  setIsLoading,
  link,
  setUpdate,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [payloadSalesProduct, setPayloadSalesProduct] = useState({
    id: id_request,
    email: '',
  });
  const [simulationInput, setSimulationInput] = useState([]);
  const [selectedPic, setSelectedPic] = useState('');

  const rollBack = (id_request, id_product) => {
    swal({
      title: 'Are you sure?',
      text: 'You will rollback the data !',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willRollback) => {
      if (willRollback) {
        handleCancelVolume(id_request, id_product);
      } else {
        swal('You revert this change!');
      }
    });
  };

  const handleCancelVolume = async (id_request, id_product) => {
    setIsLoading(true);
    const body = JSON.stringify({ id_request, id_product });
    const data = await cancelVolumeData(body);
    if (data?.status === 200) {
      swal('Success', 'Rollback data success', 'success');
      getDetailData(id_request);
    }
    if (data?.status === 403) {
      swal('Oops', data?.message, 'error');
    }
    setIsLoading(false);
  };

  const handleInput = (e, id) => {
    const { value } = e.target;
    const values = [...simulationInput];
    values[id].value = value;
    setSimulationInput(values);
  };

  const getDetailData = async (id) => {
    setIsLoading(true);
    const data = await getDetailRequest(id);
    if (data?.status === 200) {
      setSimulationInput(
        data.data.map((detail) => {
          return { ...detail, value: detail.price };
        })
      );
    }
    setIsLoading(false);
  };

  const SalesInputProduct = async () => {
    const { id, email } = payloadSalesProduct;
    const body = JSON.stringify({
      id,
      email,
    });
    const data = await inputSalesProduct(body);
    if (data?.status === 200) {
      swal('success', 'Input Product From Sales', 'success');
      setPayloadSalesProduct({
        ...payloadSalesProduct,
        email: '',
      });
    } else {
      swal('Failed', `Error Message : ${data?.message}`, 'error');
    }
  };

  const handleSubmitPIC = async () => {
    const body = JSON.stringify({ pic: selectedPic, link: link });

    if (selectedPic === '') {
      swal('warning', 'Selected Volume PIC Cannot be empty', 'warning');
      return;
    }

    const response = await inputsalesVolumePIC(body);
    if (response?.status === 201) {
      setOpen((prev) => !prev);
      swal('Success', 'PIC Submitted successfully', 'success');
      setUpdate((prev) => !prev);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } else {
      swal('Failed', `Error : ${response?.message}`, 'error');
    }
  };

  const handleRollbackAll = () => {
    const body = { id_request: id_request };

    swal({
      title: 'Are you sure?',
      text: 'You will rollback the All data !',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willRollback) => {
      if (willRollback) {
        const response = await cancelVolumeDataAll(JSON.stringify(body));
        if (response?.status === 201) {
          swal('Success', 'Rollback All Data Success', 'success');
          setUpdate((prev) => !prev);
        } else {
          swal('Oops', response?.message, 'error');
        }
      } else {
        swal('You revert this change!');
      }
    });
  };

  return (
    <>
      <div
        className='py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer'
        onClick={() => {
          handleOpen();
          getDetailData(id_request);
        }}>
        Details
      </div>
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
            Detail Request
          </Typography>
          <div className='font-semibold my-3'>
            Link Product :{' '}
            <Tooltip title={link}>
              <a
                href={link}
                target='_blank'
                className='font-normal hover:text-blue-500'
                rel='noreferrer'>
                {' '}
                {link.slice(0, 100)}
                {link.length > 100 && ' ....'}
              </a>
            </Tooltip>
          </div>
          {isLoading ? (
            <div className='flex items-center justify-center w-full h-full p-4 rounded-md'>
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className='flex items-center gap-5 w-full mb-5'>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Draft Order
                </Typography>
                <input
                  name='email'
                  className='border-gray-400 focus:outline-blue rounded-md border p-2 w-64'
                  placeholder='Masukan Email User'
                  value={payloadSalesProduct.email}
                  onChange={(e) => {
                    setPayloadSalesProduct({
                      ...payloadSalesProduct,
                      email: e.target.value,
                    });
                  }}
                />
                <button
                  onClick={SalesInputProduct}
                  className='py-2 px-5 bg-blue-500 rounded-md text-white'>
                  Submit
                </button>
                <div className='flex items-center space-x-3'>
                  <p>Check Details PIC : </p>
                  <select
                    name='select'
                    value={selectedPic}
                    onChange={(e) => setSelectedPic(e.target.value)}
                    className='border border-gray-300 p-1 rounded-md focus-within:outline-blue capitalize'>
                    <option value='' disabled>
                      Select Volume PIC
                    </option>
                    {pic?.map((p) => (
                      <option key={p.id} value={p.value}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleSubmitPIC}
                    className='px-3 py-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-gray-700 rounded-md'>
                    Submit PIC
                  </button>
                </div>
              </div>

              <TableContainer
                component={Paper}
                className='table-scroll variant-scroll'
                sx={{ maxHeight: 450 }}>
                <Table
                  stickyHeader
                  sx={{ minWidth: 500 }}
                  aria-label='custom pagination table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Variant</TableCell>
                      <TableCell align='center'>Qty/Box</TableCell>
                      <TableCell align='center'>Weight(Gram)</TableCell>
                      <TableCell align='center'>Volume(CM/CM3)</TableCell>
                      <TableCell align='center'>Length(CM)</TableCell>
                      <TableCell align='center'>Width(CM)</TableCell>
                      <TableCell align='center'>Height(CM)</TableCell>
                      <TableCell align='center'>Category</TableCell>
                      <TableCell align='center'>
                        {' '}
                        <div className='space-y-px'>
                          <p>status</p>
                          <div
                            className='p-1 space-x-1 bg-blue-300 w-24 text-white flex items-center rounded-md text-xs justify-center font-semibold cursor-pointer mt-1'
                            onClick={handleRollbackAll}>
                            <RestoreIcon style={{ fontSize: 20 }} />
                            <p className='text-center'>Rollback</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align='center'>Type</TableCell>
                      <TableCell align='center'>Price/box</TableCell>
                      <TableCell align='center'>Price/pcs</TableCell>
                      <TableCell align='center'>Silver</TableCell>
                      <TableCell align='center'>Gold</TableCell>
                      <TableCell align='center'>Diamond</TableCell>
                      <TableCell align='center'>Simulation(RMB)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulationInput.map((row, id) => (
                      <TableRow key={id}>
                        <TableCell align='center'>
                          {row.variant !== null ? (
                            <Tooltip title={row.variant}>
                              <p className='text-xs line-clamp-2 cursor-pointer'>
                                {row.variant}
                              </p>
                            </Tooltip>
                          ) : (
                            <p>-</p>
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          {row.qty === 0 ? (
                            <p>-</p>
                          ) : (
                            <p className='text-xs'>{row.qty}</p>
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          <p className='text-xs'>
                            {row?.weight !== 0 ? row.weight : '-'}
                          </p>
                        </TableCell>
                        <TableCell align='center'>
                          <p className='text-xs'>
                            {row?.volume !== 0 ? row.volume : '-'}
                          </p>
                        </TableCell>
                        <TableCell align='center'>
                          <p className='text-xs'>
                            {row?.length !== 0 ? row.length : '-'}
                          </p>
                        </TableCell>
                        <TableCell align='center'>
                          <p className='text-xs'>
                            {row?.width !== 0 ? row.width : '-'}
                          </p>
                        </TableCell>
                        <TableCell align='center'>
                          <p className='text-xs'>
                            {row?.height !== 0 ? row.height : '-'}
                          </p>
                        </TableCell>
                        <TableCell align='center'>
                          <NumberFormat
                            value={row?.category}
                            displayType={'text'}
                            className='text-xs'
                            thousandSeparator={true}
                            prefix={'IDR '}
                            decimalScale={2}
                          />
                        </TableCell>
                        <TableCell align='center'>
                          <div className='text-xs'>
                            <p
                              className={`
                          ${
                            row?.status === 'In Progress'
                              ? 'text-yellow-400'
                              : row.status === 'Completed'
                              ? 'text-green-600'
                              : 'text-red-500'
                          } rounded-md font-semibold `}>
                              {row?.status}
                            </p>
                            {row.reason && (
                              <p
                                className='text-xs text-black mt-2 line-clamp-1'
                                title={row.reason}>
                                Reason :
                                {row.reason === 'Not Response'
                                  ? ' No Response'
                                  : ' ' + row.reason}
                              </p>
                            )}
                            <div
                              className='p-1  space-x-1 bg-blue-300 w-24 text-white flex items-center rounded-md text-xs justify-center font-semibold cursor-pointer mt-1'
                              onClick={() => rollBack(id_request, row.id)}>
                              <RestoreIcon style={{ fontSize: 20 }} />
                              <p>Rollback</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div className='max-w-xl min-w-max'>
                            <p className='text-xs'>Ship</p>
                            <p className='text-xs'>Airplane</p>
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div className='flex flex-col max-w-xl min-w-max'>
                            <NumberFormat
                              value={
                                row?.detailPrice?.sea?.pricePerBox !== 0
                                  ? row?.detailPrice?.sea?.pricePerBox
                                  : '0'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                            <NumberFormat
                              value={
                                row?.detailPrice?.air?.pricePerBox !== 0
                                  ? row?.detailPrice?.air?.pricePerBox
                                  : '0'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div className='flex flex-col max-w-xl min-w-max'>
                            <NumberFormat
                              value={
                                row?.detailPrice?.sea?.pricePerPcs !== 0
                                  ? row?.detailPrice?.sea?.pricePerPcs
                                  : '0'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                            <NumberFormat
                              value={
                                row?.detailPrice?.air?.pricePerPcs !== 0
                                  ? row?.detailPrice?.air?.pricePerPcs
                                  : '0'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div className='flex flex-col max-w-xl min-w-max'>
                            <NumberFormat
                              value={
                                row?.detailPrice?.sea?.simulation +
                                Number(
                                  simulationInput[id]?.value *
                                    1.15 *
                                    getUser().tokenData.data.exchange
                                )
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                            <NumberFormat
                              value={
                                row?.detailPrice?.air?.pricePerBox > 0
                                  ? row?.detailPrice?.air?.simulation +
                                    Number(
                                      simulationInput[id]?.value *
                                        1.15 *
                                        getUser().tokenData.data.exchange
                                    )
                                  : '-'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div className='flex flex-col max-w-xl min-w-max'>
                            <NumberFormat
                              value={
                                row?.detailPrice?.sea?.simulation +
                                Number(
                                  simulationInput[id]?.value *
                                    1.12 *
                                    getUser().tokenData.data.exchange
                                )
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                            <NumberFormat
                              value={
                                row?.detailPrice?.air?.pricePerBox > 0
                                  ? row?.detailPrice?.air?.simulation +
                                    Number(
                                      simulationInput[id]?.value *
                                        1.12 *
                                        getUser().tokenData.data.exchange
                                    )
                                  : '-'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div className='flex flex-col max-w-xl min-w-max'>
                            <NumberFormat
                              value={
                                row?.detailPrice?.sea?.simulation +
                                Number(
                                  simulationInput[id]?.value *
                                    1.07 *
                                    getUser().tokenData.data.exchange
                                )
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                            <NumberFormat
                              value={
                                row?.detailPrice?.air?.pricePerBox > 0
                                  ? row?.detailPrice?.air?.simulation +
                                    Number(
                                      simulationInput[id]?.value *
                                        1.07 *
                                        getUser().tokenData.data.exchange
                                    )
                                  : '-'
                              }
                              displayType={'text'}
                              className='text-xs'
                              thousandSeparator={true}
                              prefix={'IDR '}
                              decimalScale={2}
                            />
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <input
                            type='number'
                            disabled={!row.beginPrice}
                            className='border text-xs border-gray-300 focus:outline-blue w-20 p-1 rounded-sm'
                            value={simulationInput[id]?.value}
                            onChange={(e) => handleInput(e, id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {simulationInput.length === 0 && (
                      <TableRow style={{ height: '30vh' }}>
                        {isLoading ? (
                          <TableCell colSpan={13} align='center'>
                            <CircularProgress />
                          </TableCell>
                        ) : (
                          <TableCell colSpan={13} align='center'>
                            No data available
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
