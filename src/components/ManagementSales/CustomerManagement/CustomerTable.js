import MaterialTable from 'material-table';
import {
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import swal from 'sweetalert';
import AddSalesModal from './AddSalesModal';
import NotesModal from './NotesModal';
import ViewModal from './ViewModal';
import DeleteIcon from '@mui/icons-material/Delete';
import tableIcons from 'helpers/materialTableIcons';
import { useState, useEffect } from 'react';
import { releaseSalesData } from 'service/api';
import WhatsAppDetail from './WhatsAppDetail';
import SetFlag from './SetFlag';
import FlagIcon from '@mui/icons-material/Flag';
import moment from 'moment';

const CustomerTable = ({
  customerData,
  setChangeData,
  isLoading,
  setSearchData,
}) => {
  const [loading, setLoading] = useState(false);
  const { data, listSales } = customerData;
  const dataFromSearch = data?.length === 1;

  const newData = data?.map((customer) => {
    return {
      ...customer,
      listSales,
    };
  });

  const releaseSales = async (email, sales) => {
    setLoading(true);
    const body = JSON.stringify({ email: email, sales: sales });
    const data = await releaseSalesData(body);
    if (dataFromSearch) {
      setSearchData(`/${email}`);
    }
    if (data.status === 200) {
      swal('Sales released successfully', {
        icon: 'success',
      });
      setChangeData((prev) => !prev);
    }
  };

  const handleRelease = (email, sales) => {
    sales === null
      ? swal(
          'Oops',
          "Customer has no sales, you can't do this action!",
          'error'
        )
      : swal({
          title: 'Are you sure?',
          text: 'Once release sales, you will not be able to revert this change!',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            releaseSales(email, sales);
          } else {
            swal('You revert this change!');
          }
        });
  };

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isLoading]);

  const renderLoading = loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: '10px',
        borderRadius: 2,
        backgroundColor: 'white',
        marginBottom: 1,
      }}>
      <div className='flex space-x-3 items-center w-full bg-blue-100 p-4 rounded-md'>
        <CircularProgress size={20} />
        <p className='text-gray-500 text-sm '>Updating data ...</p>
      </div>
    </Box>
  ) : null;
  return (
    <>
      {renderLoading}
      <MaterialTable
        isLoading={loading}
        localization={{
          toolbar: {
            searchPlaceholder: 'Search Table',
          },
        }}
        icons={tableIcons}
        title='Customer Table'
        columns={[
          {
            title: 'Flag',
            field: 'flag',
            render: (rowData) => (
              <FlagIcon
                fontSize='medium'
                className={`${
                  rowData.level === 1
                    ? 'text-red-500'
                    : rowData.level === 2
                    ? 'text-blue-500'
                    : rowData.level === 3
                    ? 'text-green-500'
                    : 'text-gray-400'
                }`}
              />
            ),
          },
          {
            title: 'Customer',
            field: 'name',
            render: (rowData) => (
              <div>
                <p>{rowData.name}</p>
                <p className='text-xs'>{rowData.email}</p>
              </div>
            ),
          },
          {
            title: 'Sales',
            field: 'sales',
            render: (rowData) => (
              <p className='text-sm'>
                {rowData?.sales !== null
                  ? rowData?.sales?.slice(0, 1).toUpperCase() +
                    rowData?.sales?.slice(1)
                  : 'No Sales'}
              </p>
            ),
          },
          {
            title: 'Total Spend',
            field: 'totalSale',
            render: (rowData) => (
              <p className='text-sm'>
                {`IDR ${rowData.totalSale.toLocaleString('id-ID')}`}
              </p>
            ),
          },
          {
            title: 'Refund',
            field: 'refund',
            render: (rowData) => (
              <p className='text-sm'>
                {!rowData.refund
                  ? 'No Data'
                  : 'IDR ' + rowData.refund.toLocaleString('id-ID')}
              </p>
            ),
          },
          {
            title: 'Last Transaction',
            field: 'lastTransactionDate',
            render: (rowData) => (
              <div className='text-sm'>
                <p>{rowData?.lastTransactionDate}</p>
                <p>{`IDR ${rowData?.lastTransactionValue?.toLocaleString(
                  'id-ID'
                )}`}</p>
              </div>
            ),
          },
          {
            title: 'Status',
            field: 'status',
            render: (rowData) =>
              rowData.status === 'Active' ? (
                <Chip label={rowData.status} color='success' />
              ) : rowData.status === 'Passive' ? (
                <Chip
                  label={rowData.status}
                  color='primary'
                  sx={{ backgroundColor: 'gray' }}
                />
              ) : (
                <Chip
                  label={rowData.status}
                  color='primary'
                  sx={{ backgroundColor: 'red' }}
                />
              ),
          },
          {
            title: 'Grade',
            field: 'levelCust',
            render: (rowData) => (
              <p
                className={`text-sm text-white p-1 w-24 border text-center rounded-lg  ${
                  rowData.levelCust === 'DIAMOND'
                    ? 'border-blue-500 bg-blue-200'
                    : rowData.levelCust === 'GOLD'
                    ? 'bg-yellow-300 border-yellow-500'
                    : 'border-gray-600 bg-gray-400'
                }`}>
                {rowData.levelCust}
              </p>
            ),
          },
          {
            title: 'Last Contact',
            field: 'lastContact',
            render: (rowData) =>
              rowData.lastContact ? (
                <div className='space-y-2 text-sm '>
                  <p>{rowData.lastContact}</p>
                </div>
              ) : (
                <p className='text-sm'>No Activity</p>
              ),
          },
          {
            title: 'Time Elapse',
            field: 'daysAgo',
            render: (rowData) =>
              rowData.daysAgo ? (
                <div className='space-y-2 text-sm '>
                  <p>
                    {moment(
                      rowData.lastContact,
                      'DD/MM/YYYY hh.mm.ss'
                    ).fromNow()}
                  </p>
                </div>
              ) : (
                <p className='text-sm'>No Activity</p>
              ),
          },
          {
            title: 'Action',
            field: 'action',
            render: (rowData) => {
              return (
                <div className='flex items-center text-lg'>
                  <AddSalesModal
                    listData={rowData.listSales}
                    email={rowData.email}
                    setLoading={setLoading}
                    changeData={setChangeData}
                    dataFromSearch={dataFromSearch}
                    setSearchData={setSearchData}
                  />
                  <Tooltip title='Release Sales'>
                    <IconButton
                      aria-label='delete'
                      onClick={() =>
                        handleRelease(rowData.email, rowData.sales)
                      }>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <NotesModal
                    changeData={setChangeData}
                    notesData={rowData.notes}
                    email={rowData.email}
                    customer={rowData.name}
                    setSearchData={setSearchData}
                    dataFromSearch={dataFromSearch}
                  />
                  <ViewModal email={rowData.email} />
                  <SetFlag
                    email={rowData.email}
                    setChangeData={setChangeData}
                    dataFromSearch={dataFromSearch}
                    setSearchData={setSearchData}
                    setLoading={setLoading}
                  />
                  <WhatsAppDetail
                    phoneNumber={rowData.customerPhone}
                    email={rowData.email}
                    changeData={setChangeData}
                    dataFromSearch={dataFromSearch}
                    setSearchData={setSearchData}
                    setLoading={setLoading}
                  />
                </div>
              );
            },
          },
        ]}
        data={newData}
        options={{
          exportButton: true,
          pageSizeOptions: [],
          pageSize: 50,
          searchFieldPlaceholder: 'Search Table',
          isLoading: true,
        }}
      />
    </>
  );
};

export default CustomerTable;
