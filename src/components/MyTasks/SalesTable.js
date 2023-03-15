import React, { useEffect, useState } from 'react';
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
import swal from 'sweetalert';
import { submitFullRefund } from 'service/api';

const SalesTable = ({
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
  //     date: '12-12-2022, 10:03:00',
  //     user: 'wahyu'
  //   },
  // ]
  
  useEffect(() => {},[dataTable])

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

  const confirmFullRefund = (data) => {
    swal({
      title: "Full Refund?",
      text: "Are you sure want to submit Request Full Refund?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        handleFullRefund(data)
      }
    });
  }

  const handleFullRefund = async(data) => {
    const payload = {
      id_so: data.id_so,
      status: 'FullRefund'
    }
    const response = await submitFullRefund(JSON.stringify(payload))
    if (response.status === 200) {
      setUpdate((prev) => !prev);
    }
  }

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
        title="Sales Table"
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
                Rp. {rowData?.actual_total?.toLocaleString('id-ID') ?? '-'}
              </p>
            ),
          },
          {
            title: 'Actual Shipping',
            field: 'actual_shipping',
            align: 'center',
            render: (rowData) => (
              <p className="text-sm capitalize whitespace-nowrap">
                Rp. {rowData?.actual_shipping_cost?.toLocaleString('id-ID') ?? '-'}
              </p>
            ),
          },
          {
            title: 'Need Adjustment',
            field: 'is_payed',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <p className="text-xs">{rowData.is_payed ? <CheckCircleIcon className='text-green-600' /> : <CancelIcon className='text-red-600' />}</p>
            ),
          },
        //   {
        //     title: 'Status Task',
        //     field: 'status_task',
        //     align: 'center',
        //     render: (rowData) => (
        //       <p className="text-sm capitalize">{rowData.status_task ?? '-'}</p>
        //     ),
        //   },
          {
            title: 'Action',
            field: 'action',
            align: 'center',
            sorting: false,
            render: (rowData) => (
              <div className="flex flex-col space-y-2">
                <IssueDetailModal
                  data={rowData}
                  status={rowData.status}
                  issue={rowData.type}
                  idOrder={rowData.id_so}
                />
                <ReduceQuantityModal
                  data={rowData}
                  status={rowData.status}
                  issue={rowData.type}
                  idOrder={rowData.id_so}
                  setUpdate={setUpdate}
                />
                <ChangeSupplierModal
                  status={rowData.status}
                  issue={rowData.type}
                  idOrder={rowData.id_so}
                  setUpdate={setUpdate}
                />
                {/* {getUser().user === 'ricky' && rowData.status === "submitted" &&
                  <SolveIssueModal
                  status={rowData.status}
                  issue={rowData.type}
                  idOrder={rowData.id_so}
                  />
                } */}
                <AdjustmentModal
                  status={rowData.status}
                  idOrder={rowData.id_so}
                />
                <button
                  className={`py-2 px-5 border text-blue-500 border-blue-500 rounded-md text-center cursor-pointer`}
                  onClick={() => {
                    confirmFullRefund(rowData);
                  }}
                  >
                  Full Refund
                </button>
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

      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default SalesTable;
