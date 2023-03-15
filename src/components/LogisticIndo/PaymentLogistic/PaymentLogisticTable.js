import {
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  IconButton,
  Collapse,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Notes from '../../General/Notes';
import DetailListBoxTable from './DetailListBoxTable';
import DetailModal from '../../General/DetailOrderModal/DetailModal';
import PaginationFilter from '../../General/PaginationFilter';
import PaymentLogisticModal from './PaymentLogisticModal';
import { receivedManual } from 'service/api';
import swal from 'sweetalert';

export default function PaymentLogisticTable({
  isLoading,
  page,
  pageInfo,
  setPage,
  limit,
  setLimit,
  dataOrder,
  setUpdate,
  select,
  setSelect,
}) {
  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: '10px',
        borderRadius: 2,
        backgroundColor: 'white',
        marginBottom: 1,
      }}>
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-3 rounded-md">
        <CircularProgress size={20} />
        <p className="text-gray-500 text-sm ">Updating data ...</p>
      </div>
    </Box>
  ) : null;

  const received = async (id_so, id_sj, box, status) => {
    const body = JSON.stringify({ id_so, id_sj, box });
    if (status === 'Paid') {
      const data = await receivedManual(body);
      if (data?.status === 200) {
        swal('Success', 'Manual Received is successful !', 'success');
        setUpdate((prev) => !prev);
      }
    } else {
      swal('Oops', 'Logistics unpaid !', 'error');
    }
  };

  const Row = ({ rowData }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow style={{ display: 'flex' }}>
          <TableCell
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '15%',
            }}>
            <div className="text-sm flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <DetailModal id={rowData.idOrder.id_so} />
                  {rowData.idOrder.warning && (
                    <span className="text-red-600 font-semibold">
                      Warning: Overdue
                    </span>
                  )}
                </div>
                <div>
                  {rowData.idOrder.id_sj && (
                    <p className="font-semibold">
                      SJ : {rowData.idOrder.id_sj}
                    </p>
                  )}
                  {rowData.idOrder.resi && (
                    <p className="font-semibold">
                      Resi : {rowData.idOrder.resi}
                    </p>
                  )}
                  {rowData.idOrder.status && (
                    <p className={'font-semibold'}>
                      Status :{' '}
                      <span
                        className={
                          rowData.idOrder.status === 'Paid'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }>
                        {rowData.idOrder.status}
                      </span>
                    </p>
                  )}
                  {rowData.idOrder.paymentDate && (
                    <p>Payment Date : {rowData.idOrder.paymentDate}</p>
                  )}
                  {rowData.idOrder.keterangan && (
                    <p>Note :{rowData.idOrder.keterangan}</p>
                  )}
                </div>
                {rowData.idOrder.notes &&
                  rowData.idOrder.notes.slice(0, 3).map((note, index) => (
                    <div
                      className="flex items-center text-xs justify-between"
                      key={index}>
                      <em className="line-clamp-1 w-14">{note.date}</em>
                      <p className="line-clamp-1">{note.note}</p>
                      <p>{note.sales}</p>
                    </div>
                  ))}
              </div>
              <div className="text-center">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                    setOpen(!open);
                  }}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <span className="text-xs">Details</span>
              </div>
            </div>
          </TableCell>
          <TableCell
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '17%',
            }}>
            <div className="text-sm">
              <p>{rowData.customer.name}</p>
              <p className="break-words line-clamp-1">
                {rowData.customer.email}
              </p>
              <p>{rowData.customer.phone}</p>
              <p className="line-clamp-3">{rowData.customer.address}</p>
              <em className="line-clamp-1">{rowData.customer.courier}</em>
            </div>
          </TableCell>
          <TableCell
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '28%',
            }}>
            <div className="flex flex-col items-center space-y-3">
              {rowData.order.slice(0, 3).map((order, id) => {
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between font-semibold w-full">
                    <p className="line-clamp-1">
                      ID Carton : {order.id_carton}
                    </p>
                    <p className="line-clamp-1">ID Order: {order.id_so}</p>
                    <p className="line-clamp-1">Qty: {order.qty} pcs</p>
                  </div>
                );
              })}
            </div>
          </TableCell>
          <TableCell
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '20%',
            }}>
            <div className="text-sm space-y-2">
              {rowData.finance.income ? (
                <div className="flex justify-between">
                  <span>Total Income:</span>
                  <span>{rowData.finance.income.toLocaleString('id-ID')}</span>
                </div>
              ) : null}
              {rowData.finance.expense && (
                <div className="flex justify-between">
                  <span>Total Expense:</span>
                  <span>
                    {rowData.finance?.expense?.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
              <hr />
              {rowData.finance.percentage && (
                <div className="flex justify-between">
                  <span>Percentage:</span>
                  <span>{rowData.finance.percentage} %</span>
                </div>
              )}
              {rowData.finance.profit && (
                <div className="flex justify-between">
                  <span>Profit:</span>
                  <span
                    className={`${
                      rowData.finance.income >= rowData.finance.expense
                        ? 'text-green-500'
                        : 'text-red-500'
                    } font-semibold`}>
                    {rowData.finance.profit.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
            </div>
          </TableCell>
          <TableCell
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '20%',
            }}>
            <div className="space-y-2 mx-3">
              <PaymentLogisticModal
                paymentData={rowData.idOrder}
                dataBox={rowData.order}
                setUpdate={setUpdate}
              />
              <Notes id={rowData.idOrder.id_so} setUpdate={setUpdate} />
              <button
                onClick={() =>
                  received(
                    rowData.idOrder.id_so,
                    rowData.idOrder.id_sj,
                    rowData.order.map((data) => data.id_carton),
                    rowData.idOrder.status
                  )
                }
                className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center w-full">
                Manual Received
              </button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detail List Box
                </Typography>
                <DetailListBoxTable dataOrder={rowData.order} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      {renderLoading}
      <div className="flex items-center justify-between bg-white p-2 px-3 rounded-md my-2">
        <div className="text-sm font-semibold">
          {pageInfo?.dataInPage
            ? `Showing ${pageInfo?.dataInPage} data of ${pageInfo?.totalData}`
            : null}
        </div>
        <div className="flex items-center text-sm space-x-3">
          <div className="flex items-center space-x-3">
            <p>Group By:</p>
            <select
              name="select"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              className="border border-gray-300 p-1 rounded-md focus-within:outline-blue">
              <option value="" disabled>
                Select Group
              </option>
              <option value="invoice">PO Number</option>
              <option value="id-order">ID Order</option>
            </select>
          </div>
          <PaginationFilter
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalPage={pageInfo.totalPage}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ display: 'flex' }}>
              <TableCell
                style={{
                  width: '15%',
                }}>
                ID Orders
              </TableCell>
              <TableCell
                style={{
                  width: '17%',
                }}>
                Customer
              </TableCell>
              <TableCell
                style={{
                  width: '28%',
                }}>
                Box
              </TableCell>
              <TableCell
                style={{
                  width: '20%',
                }}>
                Finance
              </TableCell>
              <TableCell
                style={{
                  width: '20%',
                }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrder.length > 0 ? (
              <>
                {dataOrder.map((row, index) => (
                  <Row rowData={row} key={index} id={index} />
                ))}

                {dataOrder.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      style={{ height: '50vh' }}
                    />
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  style={{ height: '70vh' }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
