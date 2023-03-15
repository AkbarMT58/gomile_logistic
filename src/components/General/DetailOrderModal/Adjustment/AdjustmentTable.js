import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
} from "@mui/material";
import ImageModal from "components/ManagementSales/CustomerManagement/ImageModal";

export default function AdjustmentTable({ history }) {
  const Row = ({ rowData }) => {
    return (
      <TableRow className="mt-5">
        <TableCell align="center">
          <p className="text-xs">{rowData.type}</p>
        </TableCell>
        <TableCell align="center">
          <p className="text-xs line-clamp-1">{rowData.reason}</p>
        </TableCell>
        <TableCell align="center">
          <p className="text-xs">
            {rowData.currency} {rowData.value.toLocaleString("id-ID")}
          </p>
        </TableCell>
        <TableCell align="center">
          <p className="text-xs">{rowData.payment}</p>
        </TableCell>
        <TableCell align="center">
          <ImageModal className="flex justify-center" image={rowData.proof} />
        </TableCell>
        <TableCell align="center">
          <p className="text-xs">{rowData.date}</p>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        className="overflow-x-scroll h-96 variant-scroll"
      >
        <Table stickyHeader sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <p className="text-xs">Type</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Reason</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Value</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Payment</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Attachment</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Date</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history?.length > 0 ? (
              <>
                {history.map((row, id) => (
                  <Row rowData={row} key={id} />
                ))}

                {history.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      style={{ height: "50vh" }}
                    ></TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    style={{ height: "70vh" }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
