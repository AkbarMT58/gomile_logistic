import MaterialTable, { MTableActions } from 'material-table';
import { CircularProgress, Box } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import DetailCustomerRequest from './DetailCustomerRequest';
import Notes from 'components/General/Notes';
import Cookies from 'js-cookie';
import ImageModal from './ImageModal';
import { useState } from 'react';

const AllCustomerRequestTable = ({
  dataTable,
  isLoading,
  setUpdate,
  selectData,
  setSelectData,
}) => {
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const HandleExportCustomerRequestData = async () => {
    const { start, end, status, sales } = selectData;
    const salesPayload = sales !== '' ? `sales=${sales}&` : '';
    const statusPayload = status !== '' ? `status=${status}&` : '';
    const startDate = start !== '' ? `start=${start}&` : '';
    const endDate = end !== '' ? `end=${end}` : '';

    let params = salesPayload + statusPayload + startDate + endDate;
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
        title="All Customer Request"
        columns={[
          {
            title: 'ID',
            field: 'id',
            render: (rowData) => <p className="text-sm">{rowData?.id}</p>,
          },
          {
            title: 'Customer Name',
            field: 'customer',
            render: (rowData) => (
              <p className="text-sm">{rowData.customer ?? '-'}</p>
            ),
          },
          {
            title: 'Customer Phone',
            field: 'customerPhone',
            render: (rowData) => (
              <p className="text-sm">{rowData.customerPhone ?? '-'}</p>
            ),
          },
          {
            title: 'Status',
            field: 'status',
            render: (rowData) => (
              <p
                className={`w-24 text-center ring text-sm capitalize py-1 rounded-xl text-white px-3 ${
                  rowData.status === 'Completed'
                    ? 'bg-green-500 ring-green-300'
                    : 'bg-yellow-500 ring-yellow-300'
                }`}>
                {rowData.status ?? '-'}
              </p>
            ),
          },
          {
            title: 'Atachment',
            field: 'image',
            render: (rowData) => (
              <div className="flex items-center justify-center">
                {rowData.image && <ImageModal image={rowData.image} />}
              </div>
            ),
          },
          {
            title: 'Link',
            field: 'link',
            render: (rowData) => (
              <a
                href={rowData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm line-clamp-1 w-[300px] hover:text-blue-500">
                {rowData?.link?.length > 0 ? rowData.link : '-'}
              </a>
            ),
          },
          {
            title: 'Sales',
            field: 'sales',
            render: (rowData) => (
              <p className="text-sm capitalize">
                {rowData.sales ? rowData.sales : 'Tidak Memiliki Sales'}
              </p>
            ),
          },
          {
            title: 'Date',
            field: 'date',
            render: (rowData) => (
              <p className="text-sm capitalize">{rowData.updatedDate ?? '-'}</p>
            ),
          },
          {
            title: 'Action',
            field: 'action',
            render: (rowData) => (
              <div className="flex flex-col space-y-2">
                <DetailCustomerRequest
                  id={rowData.id}
                  updatedBy={rowData.updatedBy}
                />
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={encodeURI(
                    `https://api.whatsapp.com/send?phone=62${rowData?.customerPhone.slice(
                      rowData?.customerPhone.indexOf('8')
                    )}&text=Halo Kak ${
                      rowData?.customer
                    }, Harga produk yang Kakak ajukan telah selesai dihitungkan. Silahkan cek menu dashboard "pengajuan saya" dan lakukan check out serta pembayaran di kolom "tunggu pembayaran". Terima kasih.`
                  )}
                  // href={`https://wa.me/+62${
                  //   rowData?.customerPhone
                  // }?text=Halo%20Kak%20${rowData?.customer?.replace(
                  //   ' ',
                  //   '%20'
                  // )}%2C%20Harga%20produk%20yang%20Kakak%20ajukan%20telah%20selesai%20dihitungkan.%0A%0ASilahkan%20cek%20menu%20dashboard%20%22pengajuan%20saya%22%20dan%20lakukan%20check%20out%20serta%20pembayaran%20di%20kolom%20%22tunggu%20pembayaran%22%20`}
                  className="border border-blue-500 rounded-md py-2 text-center text-blue-500 text-sm">
                  Send Whatsapp
                </a>
                <Notes
                  id={rowData.id + '-auto'}
                  setUpdate={setUpdate}
                  isComment={true}
                  commentStatus={rowData.notes}
                />
              </div>
            ),
          },
        ]}
        data={dataTable}
        options={{
          exportButton: !isLoadingDownload,
          exportCsv: HandleExportCustomerRequestData,
          pageSizeOptions: [50, 100, 200],
          pageSize: 100,
          searchFieldPlaceholder: 'Search Table',
        }}
      />
    </>
  );
};

export default AllCustomerRequestTable;
