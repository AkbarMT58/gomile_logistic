import MaterialTable, { MTableActions } from 'material-table';
import { CircularProgress, Box } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import Cookies from 'js-cookie';
// import ImageModal from './ImageModal';
import { useState } from 'react';
import moment from 'moment';

const ReportPenjualanTable = ({
  dataTable,
  isLoading,
  setUpdate,
  selectData,
  setSelectData,
}) => {
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const data_Table = [
    {
      no_order: '61763',
      email: 'asdf@asd.com',
      new_member: 'asdf@asd.com',
      link: 'https://asdf.1688.com',
      order_made: moment().format('MMM D, YYYY'),
      order_paid: moment().format('MMM D, YYYY'),
      refund: '',
      amount: 1044780,
      additional_income: 0,
      cogs: 1000000,
      shipping_china: 'China shipping',
      shipping_indo: 'Indo shipping',
      est_shipping_cost: 10000,
      order_complete: false,
      order_cancel: false,
      payment_type: 'manual',
    },
    {
      no_order: '61764',
      email: 'asdfgh@asd.com',
      new_member: 'asdfgh@asd.com',
      link: 'https://asdfgh.1688.com',
      order_made: moment().format('MMM D, YYYY'),
      order_paid: moment().format('MMM D, YYYY'),
      refund: '',
      amount: 1044780,
      additional_income: 0,
      cogs: 1000000,
      shipping_china: 'China shipping',
      shipping_indo: 'Indo shipping',
      est_shipping_cost: 10000,
      order_complete: false,
      order_cancel: false,
      payment_type: 'BCA',
    },
    {
      no_order: '61765',
      email: 'asdfghhj@asd.com',
      new_member: 'asdfghhj@asd.com',
      link: 'https://asdfghhj.1688.com',
      order_made: moment().format('MMM D, YYYY'),
      order_paid: moment().format('MMM D, YYYY'),
      refund: '',
      amount: 1044780,
      additional_income: 0,
      cogs: 1000000,
      shipping_china: 'China shipping',
      shipping_indo: 'Indo shipping',
      est_shipping_cost: 10000,
      order_complete: false,
      order_cancel: false,
      payment_type: 'Mandiri',
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
        title="Preview Data Penjualan"
        columns={[
          {
            title: 'No Order',
            field: 'no_order',
            render: (rowData) => (<p className="text-xs">{rowData?.no_order}</p>),
          },
          {
            title: 'Email',
            field: 'email',
            render: (rowData) => (
              <p className="text-xs">{rowData.email ?? '-'}</p>
            ),
          },
          {
            title: 'New Member',
            field: 'new_member',
            render: (rowData) => (
              <p className="text-xs">{rowData.new_member ?? '-'}</p>
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
                className="text-xs line-clamp-1 w-[200px] hover:text-blue-500">
                {rowData?.link?.length > 0 ? rowData.link : '-'}
              </a>
            ),
          },
          {
            title: 'Tanggal Order Dibuat',
            field: 'order_made',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs capitalize">{rowData.order_made ?? '-'}</p>
            ),
          },
          {
            title: 'Tanggal Order Dibayar',
            field: 'order_paid',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs capitalize">{rowData.order_paid ?? '-'}</p>
            ),
          },
          {
            title: 'Refund',
            field: 'refund',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs">{rowData.refund ? rowData.refund : '-'}</p>
            ),
          },
          {
            title: 'Nilai Order',
            field: 'amount',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.amount ? "IDR " + rowData.amount.toLocaleString('id-ID') : '-'}</p>
            ),
          },
          {
            title: 'Additional Income',
            field: 'additional_income',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.additional_income ? "IDR " + rowData.additional_income.toLocaleString('id-ID') : '-'}</p>
            ),
          },
          {
            title: 'COGS',
            field: 'cogs',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.cogs ? "IDR " + rowData.cogs.toLocaleString('id-ID') : '-'}</p>
            ),
          },
          {
            title: 'Shipping China',
            field: 'shipping_china',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs capitalize">{rowData.shipping_china ?? '-'}</p>
            ),
          },
          {
            title: 'Shipping Indonesia',
            field: 'shipping_indo',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs capitalize">{rowData.shipping_indo ?? '-'}</p>
            ),
          },
          {
            title: 'Estimated Cost Shipping',
            field: 'est_shipping_cost',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.est_shipping_cost ? "IDR " + rowData.est_shipping_cost.toLocaleString('id-ID') : '-'}</p>
            ),
          },
          {
            title: 'Order Complete',
            field: 'order_complete',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.order_complete ? 'Yes' : '-'}</p>
            ),
          },
          {
            title: 'Order Cancel',
            field: 'order_cancel',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.order_cancel ? "Yes" : '-'}</p>
            ),
          },
          {
            title: 'Payment Type',
            field: 'payment_type',
            align: 'center',
            render: (rowData) => (
              <p className="text-xs whitespace-nowrap">{rowData.payment_type ? "IDR " + rowData.payment_type.toLocaleString('id-ID') : '-'}</p>
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

export default ReportPenjualanTable;
