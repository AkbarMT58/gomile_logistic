import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";

export default function RefundApprovalModalTable({ dataProduct }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID Product</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataProduct?.map((rowData, id) => {
            return (
              <TableRow key={id}>
                <TableCell align="center">{rowData.id_product}</TableCell>
                <TableCell align="center">
                  <p className="line-clamp-1">{rowData.name}</p>
                </TableCell>
                <TableCell align="center">{rowData.qty}</TableCell>
                <TableCell align="center">
                  {rowData.value.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
