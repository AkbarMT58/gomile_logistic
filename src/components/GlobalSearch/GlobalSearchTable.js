import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import NotesModal from "./NotesModal";
import TrackingModal from "./TrackingModal";
import DetailModal from "components/General/DetailOrderModal/DetailModal";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
// import ShowDetailModal from "./ShowDetailModal";
// import ViewModal from "./ViewModal";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function GlobalSearchTable({
  dataTable,
  header,
  setDetailHistory,
  loading,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataTable?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return loading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EEEEEE" }}>
            <TableCell colSpan={8}>
              {header && (
                <div className='flex space-x-2'>
                  <p className='text-md font-semibold'>{header?.title}: </p>
                  <p className='text-md'>
                    {`IDR ${header?.data?.toLocaleString("id-ID")}`}
                  </p>
                </div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ID Order</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Sales</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable?.length > 0 ? (
            (rowsPerPage > 0
              ? dataTable?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataTable
            )?.map((row, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <DetailModal id={row.id_so} />
                </TableCell>
                <TableCell>
                  <div>
                    <p>{row.customer.name}</p>
                    <p>{row.customer.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{row.customer.phone}</p>
                </TableCell>
                <TableCell>
                  <p>{row.status}</p>
                </TableCell>
                <TableCell>
                  <p>{row?.value?.toLocaleString("id-ID")}</p>
                </TableCell>
                <TableCell>
                  <p>{row.sales}</p>
                </TableCell>
                <TableCell>
                  <p>{row.paymentDate}</p>
                </TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Link to={row.path}>
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </Link>
                    <NotesModal email={row.customer.email} id={row.id_so} />
                    <TrackingModal
                      id={row.id_so}
                      setDetail={setDetailHistory}
                    />
                    {/* <ViewModal email={row.customer.email} /> */}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell colSpan={8} align='center'>
                <p>No data available</p>
              </TableCell>
            </TableRow>
          )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                dataTable?.length ? dataTable?.length : 1,
                25,
                30,
                { label: "All", value: -1 },
              ]}
              colSpan={8}
              count={dataTable?.length ? dataTable?.length : 1}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const Loading = () => {
  return (
    <div className='flex space-x-2 justify-center w-full items-center'>
      <CircularProgress size={20} />
      <p>Loading data ...</p>
    </div>
  );
};
