import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import React, { Fragment, useState } from "react";

export default function AdjustmenTable({ dataOrder, inputRow, setInputRow }) {
  const [inputMassRow, setInputMassRow] = useState({
    highestPrice: "",
    quantity: "",
    isChecked: false,
  });

  const handleChecked = (e, id) => {
    const { name, checked } = e.target;
    if (id !== undefined) {
      const values = [...inputRow];
      if (values[id].maxQty !== 0) {
        values[id][name] = checked;
      }
      setInputRow(values);
      const checkAll = inputRow.filter((data) => data?.isChecked === false);
      if (checkAll.length > 0) {
        setInputMassRow((prev) => {
          return { ...prev, [name]: false };
        });
      } else {
        setInputMassRow((prev) => {
          return { ...prev, [name]: true };
        });
      }
    } else {
      setInputMassRow((prev) => {
        return { ...prev, [name]: checked };
      });
      setInputRow(
        inputRow.map((prev) => {
          return { ...prev, [name]: prev.maxQty !== 0 && checked };
        })
      );
    }
  };

  const handleInputRow = (e, id) => {
    const { name, value } = e.target;
    if (id !== undefined) {
      const values = [...inputRow];
      if (values[id].maxQty !== 0) {
        values[id][name] = value;
      }
      setInputRow(values);
    } else {
      setInputMassRow((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      setInputRow(
        inputRow.map((input) => {
          return {
            ...input,
            [name]: input.maxQty !== 0 && value,
          };
        })
      );
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400 }}
      className="variant-scroll overflow-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                style={{ width: "20px", height: "20px" }}
                checked={inputMassRow.isChecked}
                name="isChecked"
                className="mt-2"
                onChange={handleChecked}
              />
            </TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Variant</TableCell>
            <TableCell>
              <div className="text-center">
                <p>Update QTY</p>
                <input
                  name="quantity"
                  value={inputMassRow.quantity}
                  onChange={handleInputRow}
                  type="number"
                  className="border border-blue-500 px-1 rounded-md w-20 focus:outline-blue"
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="text-center">
                <p>Update Highest Price</p>
                <input
                  name="highestPrice"
                  value={inputMassRow.highestPrice}
                  onChange={handleInputRow}
                  type="number"
                  className="border border-blue-500 px-1 rounded-md w-20 focus:outline-blue"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder.map((rowData, id) => {
            return (
              <Fragment key={id}>
                <TableRow>
                  <TableCell>
                    <input
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                      checked={inputRow[id].isChecked}
                      name="isChecked"
                      onChange={(e) => handleChecked(e, id)}
                      disabled={rowData.qty === 0}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p
                        className={`font-semibold ${
                          rowData.qty === 0 && "text-gray-400"
                        }`}
                      >
                        {rowData.sku}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-48">
                      <p
                        className={`uppercase line-clamp-2 ${
                          rowData.qty === 0 && "text-gray-400"
                        }`}
                      >
                        {rowData.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p
                        className={`font-semibold ${
                          rowData.qty === 0 && "text-gray-400"
                        }`}
                      >
                        {rowData.variant}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2 text-sm">
                      <span
                        className={`${
                          rowData.qty === 0 && "text-gray-400"
                        } font-semibold`}
                      >
                        Last Qty. {rowData.qty} pcs /
                      </span>
                      <input
                        name="quantity"
                        value={inputRow[id].quantity}
                        onChange={(e) => handleInputRow(e, id)}
                        type="number"
                        className="w-16 rounded-md border border-gray-300 p-1 focus:outline-blue"
                        disabled={rowData.qty === 0}
                      />
                    </div>
                    {inputRow[id].quantity && (
                      <span className="text-xs text-gray-500">
                        Qty will be :{" "}
                        {Number(inputRow[id].quantity) + rowData.qty} pcs
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2 text-sm">
                      <span
                        className={`${
                          rowData.qty === 0 && "text-gray-400"
                        } font-semibold`}
                      >
                        Last Price. RMB {rowData.highestPrice} /
                      </span>
                      <input
                        type="number"
                        value={inputRow[id].highestPrice}
                        name="highestPrice"
                        onChange={(e) => handleInputRow(e, id)}
                        className="w-16 rounded-md border border-gray-300 p-1 focus:outline-blue"
                        disabled={rowData.qty === 0}
                      />
                    </div>
                    {inputRow[id].highestPrice && (
                      <span className="text-xs text-gray-500">
                        Price will be: RMB{" "}
                        {Number(inputRow[id].highestPrice) +
                          rowData.highestPrice}{" "}
                      </span>
                    )}
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
