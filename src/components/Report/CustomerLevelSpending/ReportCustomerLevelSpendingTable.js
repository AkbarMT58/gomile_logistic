import MaterialTable, { MTableActions } from 'material-table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress, Box } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import Cookies from 'js-cookie';
// import ImageModal from './ImageModal';
import { useState } from 'react';
import moment from 'moment';

const ReportCustomerLevelSpendingTable = ({
  dataTable,
  isLoading,
  setUpdate,
  selectData,
  setSelectData,
}) => {
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const data_Table = [
    {
      nama: 'Listyuo Nur Widyantoro',
      email: 'asdf@asd.com',
      handphone: '081808080123',
      last_transaction: moment().format('MMM D, YYYY'),
      total_spend: 1000000,
      total_transaction: 10,
      last_transaction_interval: "2 days",
      sales: 'Yunanda',
      status: 'inactive',
      level: 'Silver'
    },
    {
      nama: 'Nufrizal Ali',
      email: 'qwert@qwer.com',
      handphone: '081808080456',
      last_transaction: moment().format('MMM D, YYYY'),
      total_spend: 2000000,
      total_transaction: 5,
      last_transaction_interval: "7 days",
      sales: 'Novia',
      status: 'active',
      level: 'Diamond'
    },
    {
      nama: 'Eka Ariyanto',
      email: 'zxcvv@zxc.com',
      handphone: '081808080789',
      last_transaction: moment().format('MMM D, YYYY'),
      total_spend: 1200000,
      total_transaction: 8,
      last_transaction_interval: "20 days",
      sales: 'Putri',
      status: 'Passive',
      level: 'Gold'
    },
  ]

  const HandleExportCustomerRequestData = async () => {
    const { start, end, select_by } = selectData;

    const select_byPayload = select_by !== '' ? `select_by=${select_by}&` : '';
    const startDate = start !== '' ? `start=${start}&` : '';
    const endDate = end !== '' ? `end=${end}` : '';

    let params = select_byPayload + startDate + endDate;
    const URL_DOWNLOAD = `https://gateway2.ocistok.co.id/oms/pre-sales/all-customer-request/download?${params}`;
    const tokenCookies = Cookies.get('oms_token');

    setIsLoadingDownload(true);

    // eslint-disable-next-line no-unused-vars
    const response = await fetch(URL_DOWNLOAD, {
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = 'Customer_Request';
        a.click();
      });

    setIsLoadingDownload(false);
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
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-4 rounded-md">
        <CircularProgress size={20} />
        <p className="text-gray-500 text-sm ">Updating data ...</p>
      </div>
    </Box>
  ) : null;

  return (
    <>
      {renderLoading}

      <MaterialTable
        components={{
          Actions: (props) => (
            <>
              <MTableActions {...props} />
              {isLoadingDownload && (
                <div className="flex items-center gap-2 mx-5 text-blue-500">
                  <CircularProgress size={20} />
                </div>
              )}
            </>
          ),
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Search Table',
          },
        }}
        isLoading={isLoading}
        icons={tableIcons}
        title="Preview Data Status"
        columns={[
          {
            title: 'Nama',
            field: 'nama',
            render: (rowData) => (<p className="text-xs">{rowData?.nama}</p>),
          },
          {
            title: 'Email',
            field: 'email',
            render: (rowData) => (
              <p className="text-xs">{rowData.email ?? '-'}</p>
            ),
          },
          {
            title: 'Telephone',
            field: 'handphone',
            render: (rowData) => (
              <p className="text-xs">{rowData.handphone ?? '-'}</p>
            ),
          },
          {
            title: 'Last Transaction',
            field: 'last_transaction',
            render: (rowData) => (
              <p className="text-xs">{rowData.last_transaction ?? '-'}</p>
            ),
          },
          {
            title: 'Total Spend',
            field: 'total_spend',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-xs">{rowData.total_spend ? "IDR " + rowData.total_spend.toLocaleString("id-ID") : '-' }</p>
            ),
          },
          {
            title: 'Jumlah Transaksi',
            field: 'total_transaction',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-xs">{rowData.total_transaction ?? '-'}</p>
            ),
          },
          {
            title: 'Jarak Transaksi Terakhir',
            field: 'last_transaction_interval',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-xs">{rowData.last_transaction_interval ?? '-'}</p>
            ),
          },
          {
            title: 'Sales',
            field: 'sales',
            render: (rowData) => (
              <p className="text-xs">{rowData.sales ?? '-'}</p>
            ),
          },
          {
            title: 'Status',
            field: 'status',
            render: (rowData) => (
              <div className={`${rowData.status === 'active' ? "bg-green-600" : rowData.status === 'inactive' ? "bg-red-600" : "bg-gray-400"} w-fit text-center text-white px-2 py-1 rounded-xl text-xs`}>{rowData.status ?? '-'}</div>
            ),
          },
          {
            title: 'Level',
            field: 'level',
            render: (rowData) => (
              <div className={`${rowData.level === 'Diamond' ? "bg-blue-600" : rowData.level === 'Gold' ? "bg-orange-600" : "bg-gray-400"} w-fit text-center text-white px-2 py-1 rounded-xl text-xs`}>{rowData.level ?? '-'}</div>
            ),
          },
        ]}
        data={data_Table}
        options={{
          exportButton: !isLoadingDownload,
          exportCsv: HandleExportCustomerRequestData,
          pageSizeOptions: [10, 50, 100, 200],
          // pageSize: 5,
          searchFieldPlaceholder: 'Search Table',
        }}
      />
    </>
  );
};

export default ReportCustomerLevelSpendingTable;
