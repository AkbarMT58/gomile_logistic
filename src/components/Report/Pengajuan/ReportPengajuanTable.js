import MaterialTable, { MTableActions } from 'material-table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress, Box } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import Cookies from 'js-cookie';
// import ImageModal from './ImageModal';
import { useState } from 'react';
import moment from 'moment';

const ReportPengajuanTable = ({
  dataTable,
  isLoading,
  setUpdate,
  selectData,
  setSelectData,
}) => {
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const data_Table = [
    {
      id: '001',
      id_page: '1001',
      nama: 'Listyuo Nur Widyantoro',
      email: 'asdf@asd.com',
      handphone: '081808080123',
      inquiry_date: moment().format('MMM D, YYYY'),
      image: '-',
      product: 'product name',
      category: 'Electronik',
      qty: 10,
      status: 'Open',
      keterangan: '-',
      link: 'https://deetail.1688.com',
      supplier: '-',
      sales: 'Yunanda',
      updated_by: 'Jiahao',
      updated_date: moment().format('MMM DD, YYYY')
    },
    {
      id: '001',
      id_page: '1001',
      nama: 'Nufrizal Ali',
      email: 'qwert@qwer.com',
      handphone: '081808080456',
      inquiry_date: moment().format('MMM D, YYYY'),
      image: '-',
      product: 'product name',
      category: 'Electronik',
      qty: 10,
      status: 'Closed',
      keterangan: '-',
      link: 'https://deetail.1688.com',
      supplier: '-',
      sales: 'Yunanda',
      updated_by: 'Jiahao',
      updated_date: moment().format('MMM DD, YYYY')
    },
    {
      id: '001',
      id_page: '1001',
      nama: 'Eka Ariyanto',
      email: 'zxcvv@zxc.com',
      handphone: '081808080789',
      inquiry_date: moment().format('MMM D, YYYY'),
      image: '-',
      product: 'product name',
      category: 'Electronik',
      qty: 10,
      status: 'Open',
      keterangan: '-',
      link: 'https://deetail.1688.com',
      supplier: '-',
      sales: 'Yunanda',
      updated_by: 'Jiahao',
      updated_date: moment().format('MMM DD, YYYY')
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
        title="Preview Data Pengajuan"
        columns={[
          {
            title: 'ID',
            field: 'id',
            align: 'center',
            sorting: false,
            render: (rowData) => (<p className="text-xs">{rowData?.id}</p>),
          },
          {
            title: 'ID Page',
            field: 'id_page',
            align: 'center',
            sorting: false,
            render: (rowData) => (<p className="text-xs">{rowData?.id_page}</p>),
          },
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
            title: 'Tanggal Pengajuan',
            field: 'inquiry_date',
            render: (rowData) => (
              <p className="text-xs">{rowData.inquiry_date ?? '-'}</p>
            ),
          },
          {
            title: 'Gambar',
            field: 'image',
            render: (rowData) => (
              <image src={rowData.image} alt={rowData.id} className="" />
            ),
          },
          {
            title: 'Produk',
            field: 'product',
            render: (rowData) => (
              <p className="text-xs">{rowData.product ?? '-'}</p>
            ),
          },
          {
            title: 'Kategori',
            field: 'category',
            render: (rowData) => (
              <p className="text-xs">{rowData.category ?? '-'}</p>
            ),
          },
          {
            title: 'Jumlah',
            field: 'qty',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-xs">{rowData.qty ?? '-'}</p>
            ),
          },
          {
            title: 'Status',
            field: 'status',
            align: 'center',
            sorting: false,
            render: (rowData) => (
                <p className="text-xs">{rowData.status ?? '-'}</p>
            ),
          },
          {
            title: 'Keterangan',
            field: 'keterangan',
            render: (rowData) => (
                <p className="text-xs">{rowData.keterangan ?? '-'}</p>
            ),
          },
          {
            title: 'Link',
            field: 'link',
            render: (rowData) => (
                <p className="text-xs line-clamp-1">{rowData.link ?? '-'}</p>
            ),
          },
          {
            title: 'Supplier',
            field: 'supplier',
            render: (rowData) => (
                <p className="text-xs line-clamp-1">{rowData.supplier ?? '-'}</p>
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
            title: 'Update By',
            field: 'updated_by',
            align: 'center',
            sorting: false,
            render: (rowData) => (
                <p className="text-xs">{rowData.updated_by ?? '-'}</p>
            ),
          },
          {
            title: 'Tanggal Update',
            field: 'updated_date',
            render: (rowData) => (
                <p className="text-xs">{rowData.updated_date ?? '-'}</p>
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

export default ReportPengajuanTable;
