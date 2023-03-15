import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import React, { Fragment } from "react";

export default function CancelPoTable({ dataOrder }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID Product</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder?.map((rowData, id) => {
            return (
              <Fragment key={id}>
                <TableRow>
                  <TableCell align="center">
                    <p className="line-clamp-1">{rowData.idProduk}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-center line-clamp-1">{rowData.name}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-center">{rowData.qty} pcs</p>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
