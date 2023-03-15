import {
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Notes from "../../General/Notes";
import DetailListBoxTable from "./DetailListBoxTable";
import DetailModal from "../../General/DetailOrderModal/DetailModal";
import PaginationFilter from "../../General/PaginationFilter";
import RefundCustomerModal from "./RefundCustomerModal";

export default function RefundCustomerTable({
  isLoading,
  page,
  pageInfo,
  setPage,
  limit,
  setLimit,
  dataOrder,
  setUpdate,
  select,
  setSelect,
  fetchOrderData
}) {
  const [idSo, setIdSo] = useState('');
  
  const searchOrderById = (e) => {
    if (e.key === 'Enter') {
      fetchOrderData(limit, page, select, idSo);
    }
  };

  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        padding: "10px",
        borderRadius: 2,
        backgroundColor: "white",
        marginBottom: 1,
      }}
    >
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-3 rounded-md">
        <CircularProgress size={20} />
        <p className="text-gray-500 text-sm ">Updating data ...</p>
      </div>
    </Box>
  ) : null;

  const Row = ({ rowData }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow style={{ display: "flex" }}>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "20%",
            }}
          >
            <div className="text-sm flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <DetailModal id={rowData.id_so} />
                </div>
                <div>
                  {rowData.reason && (
                    <p className="font-semibold">Reason : {rowData.reason}</p>
                  )}
                  {rowData.paymentDate && (
                    <p>Payment Date : {rowData.paymentDate}</p>
                  )}
                  {rowData.status && <p>Status :{rowData.status}</p>}
                </div>
                {rowData.notes &&
                  rowData.notes.slice(0, 3).map((note, index) => (
                    <div
                      className="flex items-center text-xs justify-between"
                      key={index}
                    >
                      <em className="line-clamp-1 w-14">{note.date}</em>
                      <p className="line-clamp-1">{note.note}</p>
                      <p>{note.sales}</p>
                    </div>
                  ))}
              </div>
              <div className="text-center">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <span className="text-xs">Details</span>
              </div>
            </div>
          </TableCell>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "20%",
            }}
          >
            <div className="text-sm">
              <p>{rowData.customer.name}</p>
              <p className="break-words line-clamp-1">
                {rowData.customer.email}
              </p>
              <p>{rowData.customer.phone}</p>
              <p className="line-clamp-3">{rowData.customer.address}</p>
              <em className="line-clamp-1">{rowData.customer.courier}</em>
            </div>
          </TableCell>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "20%",
            }}
          ></TableCell>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "10%",
            }}
          >
            {rowData.user}
          </TableCell>

          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "10%",
            }}
          ></TableCell>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "20%",
            }}
          >
            <div className="space-y-2 mx-3">
              <RefundCustomerModal rowData={rowData} setUpdate={setUpdate} />
              <Notes id={rowData.id_so} setUpdate={setUpdate} />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detail List Box
                </Typography>
                <DetailListBoxTable dataOrder={rowData.product} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
console.log(idSo)
  return (
    <>
      {renderLoading}
      <div className="flex items-center justify-between bg-white p-2 px-3 rounded-md my-2">
        <div className="flex items-center gap-x-3  text-sm font-semibold">
          {pageInfo?.dataInPage
            ? `Showing ${pageInfo?.dataInPage} data of ${pageInfo?.totalData}`
            : null}

          <div className="filter-idso">
            Search:
            <input
              type="text"
              placeholder="search by id order"
              className="border rounded-md px-2 py-1 ml-1"
              onChange={(e) => setIdSo(e.target.value)}
              onKeyDown={searchOrderById}
            />
          </div>
        </div>
        <div className="flex items-center text-sm space-x-3">
          <div className="flex items-center space-x-3">
            <p>Group By:</p>
            <select
              name="select"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              className="border border-gray-300 p-1 rounded-md focus-within:outline-blue"
            >
              <option value="" disabled>
                Select Group
              </option>
              <option value="invoice">PO Number</option>
              <option value="id-order">ID Order</option>
            </select>
          </div>
          <PaginationFilter
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalPage={pageInfo.totalPage}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ display: "flex" }}>
              <TableCell
                style={{
                  width: "20%",
                }}
              >
                ID Orders
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                }}
              >
                Customer
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                }}
              >
                Photo
              </TableCell>
              <TableCell
                style={{
                  width: "10%",
                }}
              >
                User
              </TableCell>
              <TableCell
                style={{
                  width: "10%",
                }}
              >
                Container
              </TableCell>

              <TableCell
                style={{
                  width: "20%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrder.length > 0 ? (
              <>
                {dataOrder.map((row, index) => (
                  <Row rowData={row} key={index} id={index} />
                ))}

                {dataOrder.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      style={{ height: "50vh" }}
                    />
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  style={{ height: "70vh" }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
