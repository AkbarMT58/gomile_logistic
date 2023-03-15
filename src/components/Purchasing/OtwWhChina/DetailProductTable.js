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

export default function DetailProductTable({ dataOrder, data }) {
  const totalQuantity = () => {
    let total = 0;
    for (let i = 0; i < dataOrder.length; i++) {
      total += dataOrder[i].qty;
    }
    return `${total} pcs`;
  };
  const tracking = data.tracking_number.split(" ");

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Tracking Number</TableCell>
            <TableCell align="center">Supplier</TableCell>
            <TableCell align="center">Link</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <div className="flex flex-col items-center text-xs">
                <p className="line-clamp-1">
                  {tracking[0]} {tracking[1]}
                </p>
                <p className="line-clamp-1">
                  {tracking[3]} {tracking[4]}
                </p>
                <p className="line-clamp-1">
                  {tracking[6]} {tracking[7]}
                </p>
              </div>
            </TableCell>
            <TableCell align="center">
              <p className="text-xs line-clamp-1">{data.supplier}</p>
            </TableCell>
            <TableCell align="center">
              <p className="line-clamp-1">{data.link}</p>
            </TableCell>
            <TableCell align="center">RMB {data.total}</TableCell>
            <TableCell align="center">{data.updatedBy}</TableCell>
            <TableCell align="center">{data.updateDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">PIC</TableCell>
            <TableCell align="center">SKU</TableCell>
            <TableCell align="center" colSpan={2}>
              Product
            </TableCell>
            <TableCell align="center">Variant</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
          {dataOrder.map((rowData, id) => {
            return (
              <TableRow key={id}>
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
                <TableCell align="center" colSpan={2}>
                  <p className="line-clamp-1">{rowData.name}</p>
                </TableCell>
                <TableCell align="center">
                  <p className="text-center ">{rowData.variant}</p>
                </TableCell>
                <TableCell align="center">
                  <p className="text-center">{rowData.qty} pcs</p>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell align="center">
              <p>Total</p>
            </TableCell>
            <TableCell colSpan={4} />
            <TableCell align="center">
              <p>{totalQuantity()}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
