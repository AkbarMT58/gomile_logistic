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

export default function SubDetailProduct({ dataOrder }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">PO Number</TableCell>
            <TableCell align="center">Box Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder?.map((rowData, id) => {
            return (
              <TableRow key={id}>
                <TableCell align="center">{rowData.id}</TableCell>
                <TableCell align="center">
                  <div>
                    {rowData.box.map((data) => (
                      <p>{data}</p>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
