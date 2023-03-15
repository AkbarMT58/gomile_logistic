import MaterialTable from 'material-table';
import { CircularProgress, Box } from '@mui/material';
import WhatsAppDetail from './WhatsAppDetail';
import AddSalesModal from './AddSalesModal';
import NotesModal from './NotesModal';
import ReleaseSales from './ReleaseSales';
import EditEmail from './EditEmail';
import FlagIcon from '@mui/icons-material/Flag';
import SetFlag from './SetFlag';
import tableIcons from 'helpers/materialTableIcons';
import { formatDateLong } from 'helpers/ConvertTime';

const CustomerTable = ({
  customerData,
  isLoading,
  setChangeData,
  setLoading,
}) => {
  const listSales = customerData?.listSales;
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
  return (
    <div>
      {renderLoading}
      <MaterialTable
        localization={{
          toolbar: {
            searchPlaceholder: 'Search Table',
          },
        }}
        isLoading={isLoading}
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
            title: 'Email',
            field: 'email',
            render: (rowData) => (
              <div className='flex'>
                {rowData.status === 'new' ? (
                  rowData.email ? (
                    <div className='space-y-2'>
                      <p className='text-sm'>{rowData.email}</p>
                      <EditEmail
                        title='Edit'
                        setChangeData={setChangeData}
                        setLoading={setLoading}
                        id={rowData.id}
                      />
                    </div>
                  ) : (
                    <EditEmail
                      title='Add'
                      setChangeData={setChangeData}
                      setLoading={setLoading}
                      id={rowData.id}
                    />
                  )
                ) : (
                  <p className='text-sm'>{rowData.email}</p>
                )}
              </div>
            ),
          },
          {
            title: 'Name',
            field: 'name',
            cellStyle: {
              cellWidth: '100%',
            },
            render: (rowData) => <p className='text-sm'>{rowData.name}</p>,
          },
          {
            title: 'Phone',
            field: 'phone',
            render: (rowData) => <p className='text-sm'>{rowData.phone}</p>,
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
            title: 'Date',
            field: 'date',
            render: (rowData) => (
              <p className='min-w-[150px] w-full text-sm'>
                {rowData.date}
              </p>
            ),
          },
          {
            title: 'Last Contact',
            field: 'lastContact',
            render: (rowData) =>
              rowData.lastContact !== null ? (
                <p className='min-w-[150px] w-full text-sm'>
                  {formatDateLong(rowData.lastContact)}
                </p>
              ) : (
                <p className='min-w-[150px] w-full text-sm'>No Activity</p>
              ),
          },
          {
            title: 'Actions',
            field: 'actions',
            render: (rowData) => (
              <div className='flex'>
                <AddSalesModal
                  listData={listSales}
                  email={rowData.email}
                  setChangeData={setChangeData}
                  setLoading={setLoading}
                  id={rowData.id}
                />
                <ReleaseSales
                  email={rowData.email}
                  sales={rowData.sales}
                  setChangeData={setChangeData}
                  setLoading={setLoading}
                  id={rowData.id}
                />
                <NotesModal
                  email={rowData.email}
                  customer={rowData.name}
                  phone={rowData.rawPhone}
                  setChangeData={setChangeData}
                  notesData={rowData.note}
                />
                <SetFlag
                  phoneNumber={rowData.phone}
                  email={rowData.email}
                  setChangeData={setChangeData}
                  setLoading={setLoading}
                  id={rowData.id}
                />
                <WhatsAppDetail
                  phoneNumber={rowData.phone}
                  email={rowData.email}
                  setChangeData={setChangeData}
                  setLoading={setLoading}
                  id={rowData.id}
                />
              </div>
            ),
          },
        ]}
        data={customerData.data}
        options={{
          exportButton: true,
          pageSizeOptions: [],
          pageSize: 50,
          searchFieldPlaceholder: 'Search Table',
          tableLayout: 'auto',
          rowStyle: {
            overflowWrap: 'break-word',
          },
        }}
      />
    </div>
  );
};

export default CustomerTable;
