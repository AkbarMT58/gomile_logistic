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
// import DetailModal from 'components/General/DetailOrderModal/DetailModal';
// import ManualPayment from './ManualPayment';
// import Notes from 'components/General/Notes';
import PaginationFilter from 'components/General/PaginationFilter';
// import TrackingModal from './TrackingModal';
import AdjustmentModal from './Adjustment/AdjustmentModal';
import IssueDetailModal from './IssueDetail/IssueDetailModal';
// import AddVariantModal from './AddVariant/AddVariantModal';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReduceQuantityModal from './ReduceQuantity/ReduceQuantityModal';
import ChangeSupplierModal from './ChangeSupplier/ChangeSupplierModal';
import SolveIssueModal from './SolveIssue.js/SolveIssueModal';
import { getUser } from 'helpers/parseJWT';

const AfterSalesTable = ({
  dataTable,
  isLoading,
  setUpdate,
  page,
  limit,
  setPage,
  setLimit,
  totalPage,
}) => {
  // const [isModal, setIsModal] = useState(false);
  const [isExportAll, setisExportAll] = useState(false);
  // const handleClose = () => {
  //   setIsModal(false);
  // };

  // const dataTable = [
  //   {
  //     id_so: '12345',
  //     id_group: '12345-12345',
  //     status: 'submitted',
  //     type: 'No Stock',
  //     actual_total: '1000000',
  //     actual_shipping: '200000',
  //     is_payed: true,
  //     status_task: 'Need Action',
  //     action: 'Full Refund',
  //     date: '11-12-2022, 10:03:00',
  //     user: 'wahyu'
  //   },
  //   {
  //     id_so: '12345g',
  //     id_group: '12345g-12345',
  //     status: 'New Order',
  //     type: 'Loss Money (Different Price)',
  //     actual_total: '1500000',
  //     actual_shipping: '280000',
  //     is_payed: false,
  //     status_task: 'Completed',
  //     action: 'Full Refund',
  //     date: '12-12-2022, 10:03:00',
  //     user: 'wahyu'
  //   },
  // ]

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

  // const handleSubmitModal = (e) => {
  //   const { name } = e.target;

  //   if (name === 'cancel') {
  //     handleClose();
  //   } else if (name === 'export_transaction') {
  //     console.log('Export Transaction, Value : ', isExportAll);
  //   } else if (name === 'export_orders') {
  //     console.log('Export Orders, Value : ', isExportAll);
  //   }
  // };

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
        title="After Sales Table"
        columns={[
          {
            title: 'ID Order',
            field: 'id_so',
            render: (rowData) => (
              <>
                {/* <DetailModal id={rowData.id_so} /> */}
              <p className="text-sm font-bold capitalize">{rowData.id_so}</p>
              </>
            ),
          },
          {
            title: 'ID Group',
            field: 'id_group',
            render: (rowData) => (
              <p className="text-sm font-bold capitalize">{rowData.id_group ?? "-"}</p>
            ),
          },
          {
            title: 'Endpoint',
            field: 'endpoint',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-sm">{rowData.endpoint ?? '-'}</p>
            ),
          },
          {
            title: 'Issue',
            field: 'type',
            render: (rowData) => (
              <p className="text-sm capitalize">{rowData.type ?? '-'}</p>
            ),
          },
          {
            title: 'Reported Date',
            field: 'date',
            align: 'center',
            render: (rowData) => (
              <div>
                <p className="text-xs capitalize">{rowData.date ?? '-'}</p>
              </div>
            ),
          },
          {
            title: 'Actual Total',
            field: 'actual_total',
            align: 'center',
            render: (rowData) => (
              <p className="text-sm capitalize whitespace-nowrap">
                Rp. {rowData.actual_total.toLocaleString('id-ID') ?? '-'}
              </p>
            ),
          },
          {
            title: 'Action',
            field: 'action',
            align: 'center',
            sorting: false,
            render: (rowData) => (
                <p className="text-sm capitalize whitespace-nowrap">
                  {rowData.action ?? '-'}
                </p>
            ),
          },
          {
            title: 'Status Task',
            field: 'status',
            align: 'center',
            render: (rowData) => (
            <p className="text-sm capitalize">{rowData.status ?? '-'}</p>
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
    </>
  );
};

export default AfterSalesTable;
