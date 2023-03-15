import { useState, useEffect } from 'react';
import { getApproval } from 'service/api';
import swal from 'sweetalert';
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
} from '@mui/material';
import PaginationFilter from 'components/General/PaginationFilter';
import NumberFormat from 'react-number-format';
import DetailModal from 'components/General/DetailOrderModal/DetailModal';
import ModalApproval from './ModalApproval';

const TypePayment = {
  approval_payment: 'Manual Payment',
  adjustment_payment: 'Adjustment',
};

const ApprovalTable = () => {
  const [dataApproval, setDataApproval] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pageInfo, setPageInfo] = useState({});

  const GetApproval = async () => {
    setIsLoading(true);

    const params = `limit=${limit}&page=${page}`;
    const response = await getApproval(params);
    if (response?.status === 200) {
      console.log(response);
      setPageInfo({
        dataInPage: response?.data?.dataInPage,
        totalData: response?.data?.totalData,
        totalPage: response?.data?.totalPage,
      });

      setDataApproval(response?.data?.data);
    } else {
      swal('Oops', response?.message, 'error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    GetApproval();
  }, [update, page]);

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

  return (
    <>
      {renderLoading}
      <div className='flex items-center justify-between bg-white p-2 px-3 rounded-md my-2'>
        <div className='text-sm font-semibold'>
          <p className='line-clamp-1'>
            Showing {pageInfo.dataInPage} data of {pageInfo.totalData ?? '100'}
          </p>
        </div>
        <PaginationFilter
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPage={pageInfo.totalPage}
          setUpdate={setUpdate}
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID Orders</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Destination Account</TableCell>
              <TableCell>Request By</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataApproval.length > 0 ? (
              <>
                {dataApproval.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell>
                      <DetailModal id={row.id_so} />
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <span className='text-gray-700 font-bold'>
                        {TypePayment[row.type]}
                      </span>
                    </TableCell>
                    <TableCell>{row.destination_account ?? '-'}</TableCell>
                    <TableCell>{row.requested_by}</TableCell>
                    <TableCell>
                      <NumberFormat
                        value={row.total_price}
                        displayType={'text'}
                        className='text-xs'
                        thousandSeparator={true}
                        decimalScale={2}
                        prefix={'IDR '}
                      />
                    </TableCell>
                    <TableCell>
                      <ModalApproval
                        id={row.id}
                        id_so={row.id_so}
                        type={row.type}
                        image={row.proof}
                        setUpdate={setUpdate}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align='center'
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
};

export default ApprovalTable;
