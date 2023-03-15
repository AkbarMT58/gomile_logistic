import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NumberFormat from "react-number-format";

export default function CancelOrderTable({
  dataOrder,
  dataRefund,
  setDataRefund,
  massQty,
  setMassQty,
}) {
  const handleInputRow = (e, id) => {
    const { name, value } = e.target;
    if (id !== undefined) {
      const values = [...dataRefund];
      values[id].qty = value;
      values[id].value = dataOrder[id].highestPrice * e.target.value;
      if (values[id].maxQty !== 0) {
        values[id][name] = value;
      }
      setDataRefund(values);
    } else {
      setMassQty((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      setDataRefund(
        dataRefund.map((input, index) => {
          return {
            ...input,
            value: dataOrder[index].highestPrice * value,
            [name]: value,
          };
        })
      );
    }
  };

  const handleChecked = (e, id) => {
    const { name, checked } = e.target;
    if (id !== undefined) {
      const values = [...dataRefund];
      values[id][name] = checked;
      setDataRefund(values);
      const checkAll = dataRefund.filter((data) => data?.isChecked === false);
      if (checkAll.length > 0) {
        setMassQty((prev) => {
          return { ...prev, [name]: false };
        });
      } else {
        setMassQty((prev) => {
          return { ...prev, [name]: true };
        });
      }
    } else {
      setMassQty((prev) => {
        return { ...prev, [name]: checked };
      });
      setDataRefund(
        dataRefund.map((prev) => {
          return { ...prev, [name]: checked };
        })
      );
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 400 }}
      className='overflow-y-scroll variant-scroll'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type='checkbox'
                style={{ width: "16px", height: "16px" }}
                checked={massQty.isChecked}
                name='isChecked'
                className='mt-2'
                onChange={handleChecked}
              />
            </TableCell>
            <TableCell>PIC</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Variant</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>
              <div className='text-center'>
                <p>Qty Refund</p>
                <p className='text-blue-500'>Mass update</p>
                <input
                  type='text'
                  name='qty'
                  className='w-20 border border-blue-500'
                  onChange={handleInputRow}
                  value={massQty.qty}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder.map((row, id) => (
            <TableRow key={id}>
              <TableCell>
                <input
                  type='checkbox'
                  style={{ width: "16px", height: "16px" }}
                  checked={dataRefund[id].isChecked}
                  name='isChecked'
                  onChange={(e) => handleChecked(e, id)}
                />
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <img src={row.image} alt='' />
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <p>{row.sku}</p>
              </TableCell>
              <TableCell style={{ width: "25%" }}>
                <p className='line-clamp-1 break-words'>{row.name}</p>
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <p>{row.variant}</p>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <NumberFormat
                  value={row.customerPrice}
                  displayType={"text"}
                  className='text-sm'
                  thousandSeparator={true}
                  prefix={"IDR "}
                  decimalScale={2}
                />
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <p>{row.qty} pcs</p>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <div className='flex flex-col space-y-1 items-center'>
                  <input
                    type='text'
                    name='qty'
                    disabled={row.qty === 0}
                    value={dataRefund[id].qty}
                    onChange={(e) => handleInputRow(e, id)}
                    className='w-24 border p-1 rounded-md border-gray-300 focus:outline-blue'
                  />
                  {dataRefund[id].qty > row.qty && (
                    <span className='text-xs text-red-500'>
                      Warning: Qty over limit
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
