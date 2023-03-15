import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import React from "react";

const Row = ({ rowData }) => {
  return (
    <TableRow>
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
};

export default function DetailProductTable({ dataOrder }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID Order</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder?.map((rowData, id) => (
            <Row rowData={rowData} key={id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
