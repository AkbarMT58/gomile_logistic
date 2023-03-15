import MaterialTable, { MTableActions } from 'material-table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress, Box } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import Cookies from 'js-cookie';
// import ImageModal from './ImageModal';
import { useState } from 'react';
import moment from 'moment';

const ReportRegisterTable = ({
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
      register_date: moment().format('MMM D, YYYY'),
      verified: true,
      sales: 'Yunanda'
    },
    {
      nama: 'Nufrizal Ali',
      email: 'werwer@qwer.com',
      handphone: '081808084566',
      register_date: moment().format('MMM D, YYYY'),
      verified: false,
      sales: 'Novia'
    },
    {
      nama: 'Agus Suprianto',
      email: 'zcxvb@zxcd.com',
      handphone: '081808080789',
      register_date: moment().format('MMM D, YYYY'),
      verified: true,
      sales: 'Eka'
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
        title="Register"
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
            title: 'No HP',
            field: 'handphone',
            render: (rowData) => (
              <p className="text-xs">{rowData.handphone ?? '-'}</p>
            ),
          },
          {
            title: 'Tanggal Daftar',
            field: 'register_date',
            align: 'center',
            sorting: true,
            render: (rowData) => (
              <p className="text-xs">{rowData.register_date ?? '-'}</p>
            ),
          },
          {
            title: 'Verified',
            field: 'verified',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-xs">{rowData.verified ? <CheckCircleIcon className='text-green-600' /> : <CancelIcon className='text-red-600' />}</p>
            ),
          },
          {
            title: 'Sales',
            field: 'sales',
            render: (rowData) => (
              <p className="text-xs">{rowData.sales ?? '-'}</p>
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

export default ReportRegisterTable;
