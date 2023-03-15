import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

import { useState, useEffect } from "react";

export default function MakeRefundApprovalTableAll({
  dataProduct,
  setDataInput,
}) {
  const [inputFields, setInputFields] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const inputHandlerChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...inputFields];
    if (name === "qty") {
      values[id][name] = value;
      values[id].totalProductPrice = values[id].price * value;
      setInputFields(values);
    } else {
      values[id][name] = value;
      setInputFields(values);
    }
  };

  const handleChecked = (e, id) => {
    const { name, checked } = e.target;
    const values = [...inputFields];
    if (id === undefined) {
      setCheckedAll(checked);
      setInputFields(
        inputFields.map((prev) => {
          return { ...prev, isChecked: checked };
        })
      );
    } else {
      values[id][name] = checked;
      setInputFields(values);
      const isCheckAll = inputFields.filter((data) => data.isChecked === false);
      if (isCheckAll.length === 0) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  };

  useEffect(() => {
    setDataInput((prev) => {
      let init = 0;
      return {
        ...prev,
        totalRefund: prev.product.reduce(
          (prev, curr) => prev + Number(curr.totalProductPrice),
          init
        ),
        product: [...inputFields],
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFields]);

  useEffect(() => {
    setInputFields(
      dataProduct.map((data) => {
        return {
          id_product: data.id_product,
          status: "Tidak masuk gudang",
          product: data.id_product,
          totalProductPrice: data.qty * data.price,
          note: "",
          qty: data.qty,
          maxQty: data.qty,
          price: data.price,
          isChecked: false,
        };
      })
    );
  }, [dataProduct]);
  return (
    <TableContainer
      className="table-scroll overflow-y-scroll variant-scroll"
      sx={{ maxHeight: 500 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                name="checkedAll"
                onChange={handleChecked}
                style={{ width: "16px", height: "16px" }}
                checked={checkedAll}
              />
            </TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex flex-col space-y-8">
                {inputFields?.map((input, id) => (
                  <input
                    type="checkbox"
                    name="isChecked"
                    onChange={(e) => handleChecked(e, id)}
                    style={{ width: "16px", height: "16px" }}
                    checked={input.isChecked}
                  />
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-7">
                {inputFields?.map((input, id) => (
                  <p>{input.product}</p>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-4">
                {inputFields?.map((input, id) => (
                  <div className="flex space-x-3 items-center" key={id}>
                    <p className="w-1/3">Max. {input.maxQty}</p>
                    <input
                      type="number"
                      name="qty"
                      value={input.qty}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className="border border-gray-300 rounded-md p-1 w-16 focus:outline-blue"
                    />
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-4">
                {inputFields?.map((input, id) => (
                  <div className="space-x-6" key={id}>
                    <input
                      name="totalProductPrice"
                      value={input.totalProductPrice}
                      onChange={(e) => inputHandlerChange(e, id)}
                      disabled
                      className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                    />
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-4">
                {inputFields?.map((input, id) => (
                  <div className="space-x-6" key={id}>
                    <input
                      type="text"
                      name="note"
                      value={input.note}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                    />
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
