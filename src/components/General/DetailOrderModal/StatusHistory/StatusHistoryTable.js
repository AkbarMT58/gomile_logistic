import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
} from "@mui/material";

export default function StatusHistoryTable({ history }) {
  const Row = ({ rowData }) => {
    return (
      <TableRow>
        <TableCell align="center">
          <p className="text-xs">{rowData.status}</p>
        </TableCell>
        <TableCell align="center">
          <p className="text-xs line-clamp-1" title={rowData.desc}>{rowData.desc}</p>
        </TableCell>
        <TableCell align="center">
          <p className="text-xs">{rowData.date}</p>
        </TableCell>
        <TableCell align="center">
          <p className="text-xs">{rowData.user}</p>
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
                <p className="text-xs">Last Status</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Description</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Date</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">User</p>
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
