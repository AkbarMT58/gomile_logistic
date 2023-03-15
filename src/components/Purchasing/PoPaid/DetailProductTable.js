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

export default function DetailProductTable({ dataOrder, link }) {
  const totalQuantity = () => {
    let total = 0;
    for (let i = 0; i < dataOrder.length; i++) {
      total += dataOrder[i].qty;
    }
    return `${total} pcs`;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">PIC</TableCell>
            <TableCell align="center">SKU</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Variant</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder.map((rowData, id) => {
            return (
              <Fragment key={id}>
                <TableRow>
                  <TableCell align="center">
                    {rowData.image && (
                      <img
                        src={rowData.image}
                        alt="product"
                        className="w-20 rounded-md"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-center">{rowData.sku}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="line-clamp-1">{rowData.name}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-center ">{rowData.variant}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-center">{rowData.qty} pcs</p>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
          <TableRow>
            <TableCell align="center">
              <p>Total</p>
            </TableCell>
            <TableCell colSpan={3} />
            <TableCell colSpan={1} align="center">
              <p>{totalQuantity()}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
