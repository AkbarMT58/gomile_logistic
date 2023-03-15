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
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CancelOrder from './CancelOrder';
import Notes from '../../General/Notes';
import DetailProductTable from './DetailProductTable';
import DetailModal from '../../General/DetailOrderModal/DetailModal';
import Payment from './Payment';
import { getAlreadyPOData, synchronizeData } from 'service/api';
import PaginationFilter from '../../General/PaginationFilter';
import ChangeSupplier from './ChangeSupplier/ChangeSupplier';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useLocation } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { getUser } from 'helpers/parseJWT';
import swal from 'sweetalert';
import Filters from 'components/General/Filters';

export default function AlreadyPOTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [toko, setToko] = useState('all');
  const [auto, setAuto] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [date, setDate] = useState({
    start: '',
    end: '',
  });
  const [pageInfo, setPageInfo] = useState({});
  const { search } = useLocation();

  const fetchOrderData = async (limit, page, id) => {
    setIsLoading(true);

    const tokoParams = `toko=${toko}&`;
    const autoParams = toko === '1688' ? `auto=${auto}&` : '';
    const idParams = id && id !== '' ? `id=${id}&` : '';
    const startParams = date.start !== '' ? `start=${date.start}&` : '';
    const endParams = date.end !== '' ? `end=${date.end}&` : '';

    const params =
      `page=${page}&limit=${limit}&` +
      tokoParams +
      autoParams +
      idParams +
      startParams +
      endParams;

    // let params = null
    // if (toko === '1688') {
    //   params = new URLSearchParams({ limit, page, id, start, end }).toString();
    // } else {
    //   params = new URLSearchParams({ limit, page, toko, id, start, end }).toString();
    // }
    
    const data = await getAlreadyPOData(params);
    if (data) {
      const newFormat = [];
      for (let i = 0; i < data?.data?.data?.customer.collection.length; i++) {
        const customer = data?.data?.data?.customer.collection[i];
        const order = data?.data?.data?.orders.collection[i];
        const idOrder = data?.data?.data?.idOrders.collection[i];
        const finance = data?.data?.data?.finance.collection[i];
        newFormat.push({ customer, order, idOrder, finance });
      }
      setDataOrder(newFormat);
      setPageInfo({
        dataInPage: data?.data?.dataInPage,
        totalData: data?.data?.totalData,
        totalPage: data?.data?.totalPage,
      });
    } else {
        setDataOrder([])
        setPageInfo({})
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    let id = '';
    if (search) {
      const query = new URLSearchParams(search);
      id = query.get('id');
    }
    fetchOrderData(limit, page, id);
  }, [search, update, limit, page]);

  const searchOrderByFilters = () => {
    setLimit(5)
    setPage(1)
    fetchOrderData(5, 1);
  };

  const syncData = async (id) => {
    swal({
      title: 'Syncing data..',
      onBeforeOpen () {
        swal.showLoading()
      },
      onAfterClose () {
        swal.hideLoading()
      },
      closeOnClickOutside: false,
      closeOnEsc: false,
      closeOnEnter: false,
      buttons: false
    })
    const response = await synchronizeData(id)
    if (response.status === 200) {
      setUpdate(prev => !prev)
      if (response.is_changed) {
        swal('Data Synchronize Success', response.message, 'success')
      } else {
        swal('Data Synchronize Success', response.message, 'success')
      }
      // swal.close()
    } else {
      const errorMessage = response.data.errorCode + '\n' + response.data.errorMessage
      swal('Error', errorMessage, 'error')
    }
  }

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
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-bl-lg">{rowData?.idOrder?.toko || "Custom"}</div>
                </div>
                <div>
                  {rowData.idOrder.id_po && (
                    <p
                      className="font-semibold line-clamp-1"
                      title={rowData.idOrder.id_po}>
                      PO : {rowData.idOrder.id_po}
                    </p>
                  )}
                  {rowData.idOrder.paymentDate && (
                    <p>Payment Date : {rowData.idOrder.paymentDate}</p>
                  )}
                  {rowData.idOrder.keterangan && (
                    <p>Note :{rowData.idOrder.keterangan}</p>
                  )}
                </div>
                <div className="flex space-x-2 items-center my-1">
                  {rowData.idOrder.airplane ? (
                    <>
                      <FlightTakeoffIcon />
                      <p className="text-xs font-semibold">Air Freight</p>
                    </>
                  ) : (
                    <>
                      <DirectionsBoatIcon />
                      <p className="text-xs font-semibold">Sea Freight</p>
                    </>
                  )}
                </div>
                {rowData?.idOrder?.auto &&
                  <div className="w-full text-xs text-center mb-2 line-clamp-1" title={rowData?.idOrder?.auto}>{rowData?.idOrder?.auto}</div>
                }
                {rowData?.idOrder?.mytask &&
                  <div className="task-status px-2 py-1 text-xs text-white text-center bg-yellow-500 rounded-md mb-2">{rowData?.idOrder?.mytask}</div>
                }
                {rowData?.finance?.income >= 3000000 &&
                  <div className="task-status px-2 py-1 text-xs text-white text-center bg-green-500 rounded-md">Big Order</div>
                }
                {rowData.idOrder.notes &&
                  rowData.idOrder.notes.slice(0, 3).map((note, id) => (
                    <div
                      className="flex items-center text-xs justify-between"
                      key={id}>
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
            <div className="flex flex-col items-center  space-y-2">
              {rowData.order.slice(0, 3).map((order, id) => {
                return (
                  <div className="text-sm space-y-1" key={id}>
                    <p className="line-clamp-1">{order.name}</p>
                    <div className="flex items-center justify-between font-semibold">
                      <p>{order.variant}</p>
                      <p>{order.qty} pcs</p>
                      <NumberFormat
                        value={order.customerBuy * 2350}
                        displayType={'text'}
                        className="text-sm"
                        thousandSeparator={true}
                        prefix={'IDR '}
                        decimalScale={2}
                      />
                    </div>
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
              
              {rowData?.idOrder?.is_packing_kayu ? 
              <>
                <hr />
                <div className="flex">
                  <span className='px-2 py-1 text-xs text-white bg-red-500 rounded-md'>Wooden Packing</span>
                </div>
              </>
              : null}

              {rowData?.idOrder?.warning && (
              <>
                <hr />
                <span className="py-1 text-red-600 font-semibold">
                  Warning: {rowData?.idOrder?.warning_message}
                </span>
              </>
              )}

              {rowData?.idOrder?.last_update && (
              <>
                <hr />
                <span className="py-1">
                  Last Update: {rowData?.idOrder?.last_update}
                </span>
              </>
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
              {getUser().roles.includes('admin') &&
              <>
                <Payment
                  id={rowData.idOrder.id_so}
                  link={rowData.idOrder.link}
                  totalRMB={rowData.idOrder.total}
                  initValue={rowData.idOrder.initial_value}
                  invoiceNumber={rowData.idOrder.id_po}
                  setUpdate={setUpdate}
                />
                <ChangeSupplier
                  id={rowData.idOrder.id_so}
                  link={rowData.idOrder.link}
                  supplierName={rowData.idOrder.supplier}
                  setUpdate={setUpdate}
                  dataTable={rowData.order}
                  poNumber={rowData.idOrder.id_po}
                />
              </>
              }
              <Notes
                id={rowData?.idOrder?.id_so}
                id_group={rowData?.idOrder?.id_group}
                endpoint="already_po"
                task_status={rowData?.idOrder?.mytask}
                totalNotes={rowData?.idOrder?.total_notes}
                setUpdate={setUpdate}
              />
              {getUser().roles.includes('admin') &&
                <CancelOrder
                  id_so={rowData.idOrder.id_so}
                  invoice={rowData.idOrder.id_po}
                  setUpdate={setUpdate}
                />
              }
              {rowData?.idOrder?.toko === '1688' &&
                <div
                className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer"
                onClick={() => syncData(rowData.idOrder.id_po)}
                >
                  Sync
                </div>
              }
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detail Product
                </Typography>
                <DetailProductTable
                  dataOrder={rowData.order}
                  link={rowData.idOrder.link}
                  id_so={rowData.idOrder.id_so}
                  notesProduct={rowData.idOrder.notes}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      {/* {renderLoading} */}
      <div className="flex items-center justify-between bg-white p-2 px-3 rounded-md my-2">
        <div className="flex items-center gap-x-3 text-sm font-semibold">
          {pageInfo.dataInPage
            ? `Showing ${pageInfo.dataInPage} data of ${pageInfo.totalData}`
            : null}
            
            <Filters 
              filterToko={true}
              toko={toko}
              setToko={setToko}
              auto={auto}
              setAuto={setAuto}
              date={date}
              setDate={setDate}
              setUpdate={setUpdate}
              actionSubmit={searchOrderByFilters}
            />
        </div>
        <PaginationFilter
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPage={pageInfo.totalPage}
        />
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
                Order
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
            {isLoading === true ? (
              <>{renderLoading}</>
            ) : (
              <>
                {dataOrder.length > 0 ? (
                  <>
                    {dataOrder.map((row, id) => (
                      <Row rowData={row} key={id} />
                    ))}

                    {dataOrder.length <= 3 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          style={{ height: '50vh' }}></TableCell>
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
              </>
            )}
            {/* {dataOrder.length > 0 ? (
              <>
                {dataOrder.map((row, id) => (
                  <Row rowData={row} key={id} />
                ))}

                {dataOrder.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align='center'
                      style={{ height: "50vh" }}></TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align='center'
                  style={{ height: "70vh" }}>
                  No data available
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
