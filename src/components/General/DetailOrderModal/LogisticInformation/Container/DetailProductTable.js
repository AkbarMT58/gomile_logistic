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

export default function DetailProductTable({ dataContainer }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <p className="text-xs">Pic</p>
            </TableCell>
            <TableCell align="center">
              <p className="text-xs">SKU</p>
            </TableCell>
            <TableCell align="center">
              <p className="text-xs">Product</p>
            </TableCell>
            <TableCell align="center">
              <p className="text-xs">Variant</p>
            </TableCell>
            <TableCell align="center">
              <p className="text-xs">Quantity</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataContainer?.map((row, id) => (
            <TableRow key={id}>
              <TableCell align="center">
                <img src={row.image} alt="" />
              </TableCell>
              <TableCell align="center">
                <p className="line-clamp-1 text-xs">{row.sku}</p>
              </TableCell>
              <TableCell align="center">
                <p className="line-clamp-1 text-xs">{row.product}</p>
              </TableCell>
              <TableCell align="center">
                <p className="line-clamp-1 text-xs">{row.product}</p>
              </TableCell>
              <TableCell align="center">
                <p className="line-clamp-1 text-xs">{row.qty}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
