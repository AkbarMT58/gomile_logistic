import MaterialTable from 'material-table';
import { CircularProgress, Box, Tooltip } from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import DetailRequestModal from './DetailRequestModal';
import Notes from 'components/General/Notes';

const SalesRequestTable = ({
  dataTable,
  isLoading,
  setUpdate,
  setIsLoading,
}) => {
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

  const data = dataTable.map((d, i) => {
    return { ...d, number: i + 1 };
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
        title='Sales Request'
        columns={[
          {
            title: 'ID.',
            field: 'number',
            width: '4%',

            render: (rowData) => <p className='text-sm'>{rowData.number}</p>,
          },
          {
            title: 'Customer',
            field: 'customer',
            render: (rowData) => (
              <div className='text-sm'>
                <p>{rowData.customer}</p>
              </div>
            ),
          },
          {
            title: 'Link',
            field: 'link',
            width: '50%',
            render: (rowData) => (
              <Tooltip
                title={rowData.link ? rowData.link : ' no link'}
                className='cursor-pointer'>
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
            title: 'Assign To',
            field: 'updateDate',
            render: (rowData) => (
              <>
                {rowData.updateDate !== null ? (
                  <div className='text-sm'>
                    <p>{rowData.updatedBy}</p>
                    <p>{rowData.updateDate}</p>
                  </div>
                ) : (
                  <p>-</p>
                )}
              </>
            ),
          },
          {
            title: 'Status',
            field: 'status',
            render: (rowData) => (
              <p
                className={`rounded-xl w-28 px-3 py-1 text-center ring text-sm text-white
                          ${
                            rowData?.status === 'In Progress'
                              ? 'bg-yellow-500 ring-yellow-300'
                              : 'bg-green-500 ring-green-300'
                          }`}>
                {rowData?.status}
              </p>
            ),
          },
          {
            title: 'Category',
            field: 'category',
            render: (rowData) => (
              <p className='text-xs'>
                {rowData.category
                  ? `IDR ${rowData?.category?.toLocaleString('ID-id')}`
                  : '-'}
              </p>
            ),
          },
          {
            title: 'Minimum Qty',
            field: 'minQty',
            render: (rowData) => (
              <p className='text-xs'>{rowData.minQty ?? '-'}</p>
            ),
          },
          {
            title: 'Action',
            field: 'action',
            render: (rowData) => (
              <div className='space-y-2'>
                <DetailRequestModal
                  link={rowData.link}
                  id_request={rowData.id}
                  setIsLoading={setIsLoading}
                  setUpdate={setUpdate}
                  isLoading={isLoading}
                />
                <Notes
                  id={rowData.id}
                  setUpdate={setUpdate}
                  isComment={true}
                  commentStatus={rowData.comment}
                />
              </div>
            ),
          },
        ]}
        data={data}
        options={{
          exportButton: true,
          pageSizeOptions: [10, 20, 50],
          pageSize: 10,
          searchFieldPlaceholder: 'Search Table',
          rowStyle: {
            overflowWrap: 'break-word',
          },
        }}
      />
    </>
  );
};

export default SalesRequestTable;
