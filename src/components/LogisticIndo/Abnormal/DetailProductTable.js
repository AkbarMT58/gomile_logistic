import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import Refund from "./RefundOrder/Refund";
import CancelOrder from "./CancelOrder/CancelOrder";

export default function DetailProductTable({
  dataOrder,
  id_so,
  setUpdate,
  email,
  invoice,
}) {
  const [checkAll, setCheckAll] = useState(false);

  const [checkRow, setCheckRow] = useState(
    dataOrder.map((data) => {
      return {
        ...data,
        isChecked: false,
        status: "",
      };
    })
  );

  const handleChecked = (e, id) => {
    const { checked } = e.target;
    const values = [...checkRow];
    if (id !== undefined) {
      values[id].isChecked = checked;
      setCheckRow(values);
      const checkAllRow = checkRow.filter((data) => data?.isChecked === false);
      if (checkAllRow.length > 0) {
        setCheckAll(false);
      } else {
        setCheckAll(true);
      }
    } else {
      setCheckAll(checked);
      setCheckRow(
        checkRow.map((prev) => {
          return { ...prev, isChecked: checked };
        })
      );
    }
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
            <TableCell style={{ width: "10%" }}>
              <input
                type="checkbox"
                style={{ width: "20px", height: "20px" }}
                checked={checkAll}
                onChange={handleChecked}
              />
            </TableCell>
            <TableCell align="center">PIC</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">QTY</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkRow.map((rowData, id) => {
            return (
              <TableRow key={id}>
                <TableCell style={{ width: "10%" }}>
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    checked={checkRow[id].isChecked}
                    onChange={(e) => handleChecked(e, id)}
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }} align="center">
                  {rowData.image && (
                    <img
                      src={rowData.image}
                      alt="product"
                      className="w-16 rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell style={{ width: "50%" }}>
                  <p className="line-clamp-2">{rowData.name}</p>
                </TableCell>
                <TableCell style={{ width: "10%" }} align="center">
                  <p>{rowData.qty} pcs</p>
                </TableCell>
                <TableCell style={{ width: "10%" }} align="center">
                  <p>RMB {rowData.highestPrice}</p>
                </TableCell>
                <TableCell style={{ width: "10%" }} align="center">
                  <p>{rowData.status}</p>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex items-center space-x-3 justify-end">
                <Refund
                  email={email}
                  setUpdate={setUpdate}
                  dataOrder={checkRow.filter((row) => row.isChecked === true)}
                  id={id_so}
                  invoice={invoice}
                  setCheckRow={setCheckRow}
                />
                <CancelOrder
                  id={id_so}
                  setUpdate={setUpdate}
                  dataTable={checkRow.filter((row) => row.isChecked === true)}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
