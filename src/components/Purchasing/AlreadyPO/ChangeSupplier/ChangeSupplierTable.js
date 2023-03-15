import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function ChangeSupplierTable({
  dataTable,
  updateDataTable,
  setUpdateDataTable,
  additionalData,
  setAdditionalData,
  getTotal,
}) {
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    console.log(id);
    if (id !== undefined) {
      const values = [...updateDataTable];
      values[id][name] = value;
      setUpdateDataTable(values);
    } else {
      if (name === "shipping" || name === "discount")
        setAdditionalData((prev) => {
          return { ...prev, [name]: value };
        });
      setMassUpdate((prev) => {
        return { ...prev, [name]: value };
      });
      setUpdateDataTable(
        updateDataTable.map((data) => {
          return { ...data, [name]: value };
        })
      );
    }
  };
  const [massUpdate, setMassUpdate] = useState({
    price: "",
    qty: "",
  });

  console.log(updateDataTable);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 300 }}
      className='variant-scroll tabele-scroll'>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>PIC</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Variant</TableCell>
            <TableCell>
              <div className='text-center'>
                <p>Quantity</p>
                <input
                  type='text'
                  name='qty'
                  onChange={handleChange}
                  value={massUpdate.qty}
                  className='rounded-md w-16 border border-gray-300 focus:outline-blue p-1'
                />
              </div>
            </TableCell>
            <TableCell>
              <div className='text-center'>
                <p>Price/pcs</p>
                <input
                  type='text'
                  name='price'
                  onChange={handleChange}
                  value={massUpdate.price}
                  className='rounded-md w-16 border border-gray-300 focus:outline-blue p-1'
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row, id) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell className='w-24'>
                <img src={row.image} alt='product' />
              </TableCell>
              <TableCell>
                <p className='font-semibold'>{row.sku}</p>
              </TableCell>
              <TableCell>
                <p title={row.name} className='line-clamp-1 w-24'>
                  {row.name}
                </p>
              </TableCell>
              <TableCell>
                <p className='font-semibold'>{row.variant}</p>
              </TableCell>
              <TableCell>
                <div className='flex items-center space-x-1'>
                  <p>{row.qty} pcs /</p>
                  <input
                    type='text'
                    name='qty'
                    onChange={(e) => {
                      handleChange(e, id);
                    }}
                    value={updateDataTable[id].qty}
                    className='p-1  rounded-md w-12 border border-gray-300 focus:outline-blue'
                  />
                </div>
                <p className='text-red-500 text-xs'>
                  {updateDataTable[id].qty > row.qty && "Over the limit !"}
                </p>
              </TableCell>
              <TableCell>
                <div className='flex items-center space-x-1'>
                  <p>RMB {row.buyPrice} /</p>
                  <input
                    type='text'
                    name='price'
                    onChange={(e) => {
                      handleChange(e, id);
                    }}
                    value={updateDataTable[id].price}
                    className='p-1  rounded-md w-12 border border-gray-300 focus:outline-blue'
                  />
                </div>
                <p className='text-red-500 text-xs'>
                  {updateDataTable[id].price > row.highestPrice &&
                    "Over the limit !"}
                </p>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <div className='space-y-4'>
                <p>Shipping Cost</p>
                <p>Discount</p>
                <p>Total</p>
              </div>
            </TableCell>
            <TableCell colSpan={2} />
            <TableCell colSpan={1} align='right'>
              <div className='flex flex-col space-y-2 items-end'>
                <input
                  type='text'
                  name='shipping'
                  value={additionalData.shipping}
                  onChange={handleChange}
                  className='p-1 rounded-md w-24  border border-gray-300 focus:outline-blue'
                />
                <input
                  type='text'
                  name='discount'
                  value={additionalData.discount}
                  onChange={handleChange}
                  className='p-1 rounded-md w-24  border border-gray-300 focus:outline-blue'
                />
                <p>{getTotal()}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
