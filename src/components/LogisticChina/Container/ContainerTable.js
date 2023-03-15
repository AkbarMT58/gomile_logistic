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
import DetailProductTable from './DetailProductTable';
import { exportPackingList, getAllContainerList, getContainerData } from 'service/api';
import PaginationFilter from '../../General/PaginationFilter';
import UpdateDateModal from './UpdateDateModal';
import EditContainerModal from './EditContainerModal';
import swal from 'sweetalert';
import Cookies from 'js-cookie';

export default function ContainerTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pageInfo, setPageInfo] = useState({});
  const [update, setUpdate] = useState(false);
  const [editContainerModal, setEditContainerModal] = useState(false);
  const [containerList, setContainerList] = useState([])

  useEffect(() => {
    fetchOrderData(limit, page);
  }, [update, limit, page]);

  useEffect(() => {
    if(!containerList || containerList.length === 0) {
      get_allContainerList()
    }
  }, [containerList])

  const fetchOrderData = async (limit, page) => {
    setIsLoading(true);
    const params = new URLSearchParams({ limit, page }).toString();
    const data = await getContainerData(params);
    if (data?.status === 200) {
      setDataOrder(data.data.data);
      setPageInfo({
        dataInPage: data.data.dataInPage,
        totalData: data.data.totalData,
        totalPage: data.data.totalPage,
      });
    }
    setIsLoading(false);
  };
  

  const get_allContainerList = async () => {
    const response = await getAllContainerList()
    if (response?.status === 200) {
      setContainerList(response.data)
    }
  }

  const send_EmailPackingList = async (containerNumber) => {
    setIsLoadingExport(containerNumber);
    const data = await exportPackingList(containerNumber);
    if (data?.status === 200) {
      swal(data?.message ?? "File has been sent, please check your email!");
    } else {
      swal(data?.message ?? "Fail to send file to email")
    }
    setIsLoadingExport(false);
  };
  
  const HandleExportPackingList = async (containerNumber) => {
    const URL_DOWNLOAD = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/export-packing-list-app/${containerNumber}`;
    const tokenCookies = Cookies.get('oms_token');

    setIsLoadingExport(containerNumber);

    // eslint-disable-next-line no-unused-vars
    const response = await fetch(URL_DOWNLOAD, {
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    }).then((response) => {
        if(response.status === 404 && response.statusText === "Not Found") {
          swal('Sorry. data container not found.')
          return false;
        } else {
          return response.blob();
        }
      }).then((data) => {
        if(data) {   
          var a = document.createElement('a');
          a.href = window.URL.createObjectURL(data);
          a.download = 'Container-' + containerNumber;
          a.click();
      }
      }).catch((err) => {
        console.log(err.message)
      });

      setIsLoadingExport(false);
  };
  
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
      <div className='flex space-x-3 items-center w-full bg-blue-100 p-3 rounded-md'>
        <CircularProgress size={20} />
        <p className='text-gray-500 text-sm '>Updating data ...</p>
      </div>
    </Box>
  ) : null;

  const Row = ({ rowData }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow>
          <TableCell align='center'>
            <div className='flex flex-col items-center space-y-3'>
              <p className='font-semibold'>{rowData.container_number}</p>
              <div className='text-center'>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => {
                    setOpen(!open);
                  }}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <span className='text-xs'>Details</span>
              </div>
            </div>
          </TableCell>
          <TableCell align='center'>{(rowData.volume / 1000000).toFixed(2)} M<sup>3</sup></TableCell>
          {/* <TableCell align='center'>
            IDR {rowData.shipping.toLocaleString('id-ID')}
          </TableCell> */}
          <TableCell align='center'>
            <div className='flex flex-col justify-center items-center'>
              <p>{rowData.eta}</p>
              <UpdateDateModal
                title={rowData.eta ? 'Edit' : 'Add'}
                setUpdate={setUpdate}
                container={rowData.container_number}
              />
            </div>
          </TableCell>
          {/* <TableCell align='center'>
            IDR {rowData.cogs.toLocaleString('id-ID')}
          </TableCell> */}
          {/* <TableCell align='center'>
            IDR {rowData.order_value.toLocaleString('id-ID')}
          </TableCell> */}
          <TableCell align='center'>{rowData.status}</TableCell>
          {/* <TableCell align='center'>
            IDR {rowData.profit.toLocaleString('id-ID')}
          </TableCell> */}
          <TableCell align='center'>
            <div className='flex justify-center items-center gap-x-1'>
              <button
                className="bg-green-300 hover:bg-green-400 text-white px-3 py-1 rounded-md"
                onClick={() => setEditContainerModal(rowData.container_number)}
              >
                Edit
              </button>
              <a className={`${isLoadingExport === rowData.container_number ? "bg-gray-300" : "bg-yellow-600 hover:bg-yellow-700"}  text-white px-3 py-1 rounded-md whitespace-nowrap`} 
                href={`${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/export-packing-list-app/${rowData.container_number}`}>
                Export (out)
              </a>
              <button
                className={`${isLoadingExport === rowData.container_number ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"}  text-white px-3 py-1 rounded-md whitespace-nowrap`}
                onClick={() => !isLoadingExport && send_EmailPackingList(rowData.container_number)}
              >
                Export (in)
              </button>
            </div>

            <EditContainerModal
              open={editContainerModal === rowData.container_number}
              close={() => setEditContainerModal(false)}
              containerNumber={rowData.container_number}
              setUpdate={setUpdate}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Detail Container
                </Typography>
                <DetailProductTable
                  dataContainer={rowData.detail}
                  totalVolume={(rowData.volume / 1000000).toFixed(4)}
                  containerNumber={rowData.container_number}
                  setUpdate={setUpdate}
                  containerList={containerList}
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
      {renderLoading}
      <div className='flex items-center justify-between bg-white p-2 px-3 rounded-md my-2'>
        <div className='text-sm font-semibold'>
          {pageInfo?.dataInPage
            ? `Showing ${pageInfo?.dataInPage} data of ${pageInfo?.totalData}`
            : null}
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
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Container Number</TableCell>
              <TableCell align='center'>Total Volume</TableCell>
              {/* <TableCell align='center'>Estimasi Ongkir</TableCell> */}
              <TableCell align='center'>ETA</TableCell>
              {/* <TableCell align='center'>Total COGS Value</TableCell> */}
              {/* <TableCell align='center'>Total Order Value</TableCell> */}
              <TableCell align='center'>Container Status</TableCell>
              {/* <TableCell align='center'>Profit</TableCell> */}
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrder.length > 0 ? (
              <>
                {dataOrder.map((row, id) => (
                  <Row rowData={row} key={id} />
                ))}

                {dataOrder.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align='center'
                      style={{ height: '50vh' }}></TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align='center'
                    style={{ height: '70vh' }}>
                    No data available
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
