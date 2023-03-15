import React, { useState } from 'react';
import MaterialTable from 'material-table';
import {
  CircularProgress,
  Box,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import tableIcons from 'helpers/materialTableIcons';
import DetailModal from 'components/General/DetailOrderModal/DetailModal';
import ManualPayment from './ManualPayment';
import Notes from 'components/General/Notes';
import PaginationFilter from 'components/General/PaginationFilter';
import TrackingModal from './TrackingModal';
import AdjustmentModal from './Adjustment/AdjustmentModal';
import AddVariantModal from './AddVariant/AddVariantModal';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const AllOrdersTable = ({
  dataTable,
  isLoading,
  setUpdate,
  page,
  limit,
  setPage,
  setLimit,
  totalPage,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [isExportAll, setisExportAll] = useState(false);
  const handleClose = () => {
    setIsModal(false);
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid lightgray',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };

  const handleSubmitModal = (e) => {
    const { name } = e.target;

    if (name === 'cancel') {
      handleClose();
    } else if (name === 'export_transaction') {
      console.log('Export Transaction, Value : ', isExportAll);
    } else if (name === 'export_orders') {
      console.log('Export Orders, Value : ', isExportAll);
    }
  };

  return (
    <>
      {renderLoading}
      <div className="flex justify-end bg-white mb-2 p-2 rounded-md">
        <PaginationFilter
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          totalPage={totalPage}
        />
      </div>
      <MaterialTable
        localization={{
          toolbar: {
            searchPlaceholder: 'Search Table',
          },
        }}
        isLoading={isLoading}
        icons={tableIcons}
        title="All Orders Table"
        columns={[
          {
            title: 'ID Order',
            field: 'id_so',
            render: (rowData) => (
              <>
                <DetailModal id={rowData.id_so} />
                <div className="text-xs w-32 cursor-default overflow-ellipsis hover:overflow-clip overflow-hidden whitespace-nowrap hover:whitespace-normal">
                  {rowData.latestStatus}
                </div>
              </>
            ),
          },
          {
            title: 'ID Group',
            field: 'id_group',
            render: (rowData) => (
              <p className="text-sm capitalize">{rowData.id_group}</p>
            ),
          },
          {
            title: 'Customer Name',
            field: 'customerName',
            render: (rowData) => (
              <>
                <p className="text-sm capitalize">
                  {rowData.customerName ?? '-'}
                </p>
                <span className="text-xs font-semibold">
                  Total Order: {rowData.totalBuy}
                </span>
              </>
            ),
          },
          {
            title: 'Customer Phone',
            field: 'customerPhone',
            render: (rowData) => (
              <p className="text-sm capitalize">
                {rowData.customerPhone ?? '-'}
              </p>
            ),
          },
          {
            title: 'Payment Status',
            field: 'status',
            render: (rowData) => (
              <p
                className={`w-20 text-center ring text-sm capitalize py-1 rounded-xl text-white px-3 ${
                  rowData.status === 'paid'
                    ? 'bg-green-500 ring-green-300'
                    : rowData.status === 'unpaid'
                    ? 'bg-yellow-500 ring-yellow-300'
                    : rowData.status === 'canceled'
                    ? 'bg-gray-500 ring-gray-300'
                    : rowData.status === 'approval'
                    ? 'bg-blue-500 ring-blue-300'
                    : 'bg-red-500 ring-red-300'
                }`}>
                {rowData.status ?? '-'}
              </p>
            ),
          },
          {
            title: 'Total Price',
            field: 'totalPrice',
            render: (rowData) => (
              <p className="text-sm capitalize whitespace-nowrap">
                Rp. {rowData.totalPrice.toLocaleString('id-ID') ?? '-'}
              </p>
            ),
          },
          {
            title: 'Sales',
            field: 'sales',
            render: (rowData) => (
              <p className="text-sm capitalize">{rowData.sales ?? '-'}</p>
            ),
          },
          {
            title: 'Latest status',
            field: 'orderStatus',
            render: (rowData) => (
              <p
                className={`w-20 text-center ring text-xs capitalize py-1 rounded-xl text-white px-2 ${
                  rowData.orderStatus === 'on progress'
                    ? 'bg-yellow-500 ring-yellow-300'
                    : rowData.orderStatus === 'delivered'
                    ? 'bg-green-500 ring-green-300'
                    : 'bg-red-500 ring-red-300'
                }`}>
                {rowData.orderStatus ?? '-'}
              </p>
            ),
          },
          {
            title: 'Delivery Schedule',
            field: 'eta',
            render: (rowData) => (
              <div>
                <p className="text-sm capitalize">{rowData.eta ?? '-'}</p>
              </div>
            ),
          },
          {
            title: 'Created At',
            field: 'createdAt',
            render: (rowData) => (
              <div>
                <p className="text-xs capitalize">{rowData.createdAt ?? '-'}</p>
                {/* <p className="text-xs capitalize">{rowData.daysAgo ?? '-'}</p> */}
              </div>
            ),
          },
          {
            title: 'Payment Date',
            field: 'paymentDate',
            render: (rowData) => (
              <div>
                <p className="text-xs capitalize">
                  {rowData.payment_date ?? '-'}
                </p>
                <p className="text-xs capitalize">{rowData.daysAgo ?? '-'}</p>
              </div>
            ),
          },
          // {
          //   title: 'Last Update',
          //   field: 'createdAt',
          //   render: (rowData) => (
          //     <div>
          //       <p className='text-sm capitalize'>{rowData.createdAt ?? '-'}</p>
          //       <p className='text-sm capitalize'>{rowData.daysAgo ?? '-'}</p>
          //     </div>
          //   ),
          // },
          {
            title: 'Action',
            field: 'action',
            render: (rowData) => (
              <div className="flex flex-col space-y-2">
                <ManualPayment
                  status={rowData.status}
                  id_so={rowData.id_so}
                  totalPrice={rowData.totalPrice}
                  setUpdate={setUpdate}
                />
                <AdjustmentModal
                  status={rowData.status}
                  idOrder={rowData.id_so}
                />
                <Notes
                  id={rowData.id_so}
                  setUpdate={setUpdate}
                  isComment={true}
                  commentStatus={rowData.notes}
                  totalNotes={rowData?.total_notes}
                />
                <TrackingModal id={rowData.id_so} />
                <AddVariantModal idOrder={rowData.id_so} />
              </div>
            ),
          },
        ]}
        data={dataTable}
        options={{
          exportButton: true,
          // exportCsv: () => {
          //   setIsModal(true);
          // },
          paging: false,
          searchFieldPlaceholder: 'Search Table',
        }}
      />

      <Modal
        open={isModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={isModal}>
          <Box sx={style}>
            <div className="flex justify-between items-center -mt-5">
              <div className="text-black font-bold text-2xl">Export Order</div>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="w-full mt-5 mb-4 px-5 py-4 border-t border-b border-gray-300 text-gray-600 font-semibold">
              <div className="text-lg mb-2">Export :</div>
              <RadioGroup
                className="flex gap-2 mx-2 "
                value={isExportAll}
                onChange={(e) => setisExportAll(e.target.value)}>
                <FormControlLabel
                  className="flex gap-2"
                  value={true}
                  control={<Radio />}
                  label="Current Page"
                />
                <FormControlLabel
                  className="flex gap-2"
                  value={false}
                  control={<Radio />}
                  label="All Orders"
                />
              </RadioGroup>
            </div>
            <div className="flex justify-end gap-2">
              <button
                name="cancel"
                onClick={handleSubmitModal}
                className="bg-white border border-gray-300 rounded-md font-semibold text-sm text-gray-800 px-4 py-2 hover:bg-gray-200 ">
                Cancel
              </button>
              <button
                name="export_transaction"
                onClick={handleSubmitModal}
                className="bg-white border border-gray-300 rounded-md font-semibold text-sm text-gray-800 px-4 py-2 hover:bg-gray-200">
                Export Transaction Histories
              </button>
              <button
                name="export_orders"
                onClick={handleSubmitModal}
                className="bg-green-600 text-white border-black rounded-[4px] font-semibold text-sm px-4 py-2 hover:bg-green-400">
                Export Orders
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AllOrdersTable;
