import MaterialTable from 'material-table';
import { CircularProgress, Box, Tooltip } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import OptionModal from './OptionModal';
import CancelModal from './CancelModal';
import Notes from 'components/General/Notes';
import { formatDateDDMMYY } from 'helpers/ConvertTime';

const CheckVolumeTable = ({ dataTable, isLoading, setUpdate, productCategoryData, materialData }) => {
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
      <div className='flex space-x-3 items-center w-full bg-blue-100 p-4 rounded-md'>
        <CircularProgress size={20} />
        <p className='text-gray-500 text-sm '>Updating data ...</p>
      </div>
    </Box>
  ) : null;

  const rows = dataTable?.map((prev, i) => {
    return { ...prev, id: i + 1 };
  });

  return (
    <>
      {renderLoading}
      <MaterialTable
        localization={{
          toolbar: {
            searchPlaceholder: 'Search Table',
          },
        }}
        isLoading={isLoading}
        icons={tableIcons}
        title='Check Details Table'
        columns={[
          {
            title: 'ID Request',
            field: 'id',
            cellStyle: {
              minWidth: 50,
              maxWidth: 50,
            },
            render: (rowData) => <p className='text-sm'>{rowData.id}</p>,
          },
          {
            title: 'Customer',
            field: 'customer.email' || 'customer.name',
            render: (rowData) => (
              <p className='text-sm relative'>
                {rowData?.customer?.email
                  ? rowData?.customer?.email
                  : rowData?.customer?.name}
                  {rowData?.is_big_order &&
                    <span className="absolute left-0 translate-y-full bottom-0 task-status px-2 py-1 text-xs text-white text-center bg-green-500 rounded-md">Big Order</span>
                  }
              </p>
            ),
          },
          {
            title: 'Link',
            field: 'link',
            cellStyle: {
              cellWidth: '50%',
            },
            render: (rowData) => (
              <Tooltip title={rowData.link} className='cursor-pointer'>
                <a
                  href={rowData.link}
                  target='_blank'
                  className='text-sm w-40 line-clamp-1'
                  rel='noreferrer'>
                  {rowData.link}
                </a>
              </Tooltip>
            ),
          },
          {
            title: 'Product',
            field: 'product',
            render: (rowData) => (
              <Tooltip title={rowData.product}>
                <p className='text-sm line-clamp-2'>
                  {rowData.product ? rowData.product : '-'}
                </p>
              </Tooltip>
            ),
          },
          {
            title: 'Note',
            field: 'note',
            render: (rowData) => (
              <p className='text-sm'>{rowData.note ? rowData.note : '-'}</p>
            ),
          },
          {
            title: 'Sales',
            field: 'sales',
            render: (rowData) => (
              <p className='text-sm'>{rowData.sales ? rowData.sales : '-'}</p>
            ),
          },
          {
            title: 'Option',
            field: 'user',
            render: (rowData) => {
              return (
                <div className='space-y-2'>
                  <OptionModal
                    id={rowData.id_request}
                    link={rowData.link}
                    boxValue={rowData.box}
                    setUpdate={setUpdate}
                    addData={{
                      email: rowData.customer.email
                        ? rowData.customer.email
                        : rowData.customer,
                      type: rowData.type,
                      store: rowData.store,
                    }}
                    imageProduct={rowData?.image}
                    productName={rowData.product}
                    productNameID={rowData.product_indo}
                    category={rowData.category}
                    dataQty={rowData.minQty}
                    rowData={rowData}
                    productCategoryData={productCategoryData}
                    materialData={materialData}
                  />
                  <CancelModal
                    id={rowData.id_request}
                    link={rowData.link}
                    setUpdate={setUpdate}
                  />
                  <Notes
                    id={rowData.id_request}
                    setUpdate={setUpdate}
                    isComment={true}
                    isCheck={true}
                    commentStatus={rowData.comment}
                  />
                </div>
              );
            },
          },
          {
            title: 'Date',
            field: 'date',
            render: (rowData) => (
              <p className='text-sm text-center'>
                {formatDateDDMMYY(rowData.date)}
              </p>
            ),
          },
        ]}
        data={rows}
        options={{
          exportButton: true,
          pageSizeOptions: [20, 50, 100],
          pageSize: 50,
          rowStyle: {
            overflowWrap: 'break-word',
          },
        }}
      />
    </>
  );
};

export default CheckVolumeTable;
