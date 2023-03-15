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
      className='variant-scroll'>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>PIC</TableCell>
            <TableCell align='center'>SKU</TableCell>
            <TableCell align='center'>Product</TableCell>
            <TableCell align='center'>Variant</TableCell>
            <TableCell align='center'>QTY</TableCell>
            <TableCell align='center'>Buy Price</TableCell>
            <TableCell align='center'>PO Number</TableCell>
            <TableCell align='center'>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} align='center'>
              <div className='border border-blue-500 p-1 rounded-md text-blue-500'>
                <a href={link} target='_blank' rel='noreferrer'>
                  {link}
                </a>
              </div>
            </TableCell>
            <TableCell />
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
          {dataOrder.map((rowData, id) => {
            return (
              <Fragment key={id}>
                <TableRow>
                  <TableCell style={{ width: "10%" }} align='center'>
                    {rowData.image && (
                      <img
                        src={rowData.image}
                        alt='product'
                        className='w-16 rounded-md'
                      />
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <p>{rowData.sku}</p>
                  </TableCell>
                  <TableCell style={{ width: "40%" }}>
                    <p className='line-clamp-2'>{rowData.name}</p>
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align='center'>
                    <p>{rowData.variant}</p>
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align='center'>
                    <p>{rowData.qty} pcs</p>
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align='center'>
                    <p>RMB {rowData.buyPrice}</p>
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align='center'>
                    <p>{rowData.poNumber}</p>
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align='center'>
                    <p>{rowData?.totalPrice}</p>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
          <TableRow>
            <TableCell colSpan={4}>
              <p>Total</p>
            </TableCell>
            <TableCell align='center'>
              <p>{totalQuantity()}</p>
            </TableCell>
            <TableCell align='center' colSpan={3} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
