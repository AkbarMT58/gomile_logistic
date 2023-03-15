import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import NumberFormat from 'react-number-format';

export default function AdjustmentTable({
  dataOrder,
  setUpdateTotal,
  setDataProduct,
}) {
  const [inputMassRow, setInputMassRow] = useState({
    quantity: 0,
    isChecked: false,
    price: 0,
  });

  const handleChecked = (e, id) => {
    const { checked } = e.target;
    if (id !== undefined) {
      const values = [...dataOrder];

      values[id]['is_checked'] = checked;
      setDataProduct(values);
      setUpdateTotal((prev) => !prev);
    } else {
      const items = dataOrder.map((item) => {
        if (item.qty > 0) {
          item.is_checked = checked;
        }
        return item;
      });
      setDataProduct(items);
      setInputMassRow({ ...inputMassRow, isChecked: checked });
      setUpdateTotal((prev) => !prev);
    }
  };

  const handleInputRow = (e, id) => {
    const { name, value } = e.target;

    if (name === 'price' || name === 'addPrice') {
      if (id !== undefined) {
        const values = [...dataOrder];
        values[id][name] = value;
        setDataProduct(values);
        setUpdateTotal((prev) => !prev);
      } else {
        const items = dataOrder.map((item) => {
          if (item.qty > 0) {
            item.addPrice = value;
          }
          return item;
        });
        setDataProduct(items);
        setInputMassRow({ ...inputMassRow, price: value });
        setUpdateTotal((prev) => !prev);
      }
    } else if (name === 'quantity' || name === 'addQty') {
      if (id !== undefined) {
        const values = [...dataOrder];
        values[id][name] = value;
        setDataProduct(values);
        setUpdateTotal((prev) => !prev);
      } else {
        const items = dataOrder.map((item) => {
          if (item.qty > 0) {
            item.addQty = value;
          }
          return item;
        });
        setDataProduct(items);
        setInputMassRow({ ...inputMassRow, quantity: value });
        setUpdateTotal((prev) => !prev);
      }
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400 }}
      className='variant-scroll overflow-scroll'>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type='checkbox'
                style={{ width: '20px', height: '20px' }}
                checked={inputMassRow.isChecked}
                name='isChecked'
                className='mt-2'
                onChange={handleChecked}
              />
            </TableCell>
            <TableCell>Image</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>
              <div className='text-center'>
                <p>Update QTY</p>
                <input
                  name='quantity'
                  value={inputMassRow.quantity}
                  onChange={handleInputRow}
                  type='number'
                  className='text-center border border-blue-500 px-1 rounded-md w-20 focus:outline-blue'
                />
              </div>
            </TableCell>
            <TableCell>
              <div className='text-center'>
                <p>Update Price</p>
                <input
                  name='price'
                  value={inputMassRow.price}
                  onChange={handleInputRow}
                  type='number'
                  className='text-center border border-blue-500 px-1 rounded-md w-20 focus:outline-blue'
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
                      type='checkbox'
                      style={{ width: '20px', height: '20px' }}
                      checked={rowData.is_checked}
                      name='isChecked'
                      onChange={(e) => handleChecked(e, id)}
                      disabled={rowData.qty === 0}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      {rowData.image.trim().length === 0 ? (
                        <p> - </p>
                      ) : (
                        <img
                          src={rowData.image}
                          alt='product'
                          className='h-20 w-20 object-contain'
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p
                        className={`font-semibold ${
                          rowData.qty === 0 && 'text-gray-400'
                        }`}>
                        {rowData.sku}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p
                        title={rowData.product}
                        className={`uppercase line-clamp-3 ${
                          rowData.qty === 0 && 'text-gray-400'
                        }`}>
                        {rowData.product}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className='w-40'>
                    <div className='flex flex-col items-center space-x-2 text-sm'>
                      <span
                        className={`${
                          rowData.qty === 0 && 'text-gray-400'
                        } font-semibold text-xs`}>
                        Last Qty
                      </span>
                      <span
                        className={`${
                          rowData.qty === 0 && 'text-gray-400'
                        } font-semibold text-xs`}>
                        {rowData.qty} pcs
                      </span>
                      <input
                        name='addQty'
                        value={rowData.addQty}
                        onChange={(e) => handleInputRow(e, id)}
                        type='number'
                        className='text-center w-16 rounded-md border border-gray-300 p-1 focus:outline-blue'
                        disabled={rowData.qty === 0}
                      />
                      {rowData.addQty !== 0 && (
                        <>
                          <span className='text-xs'>Qty will be:</span>
                          <span className='text-xs'>
                            {isNaN(
                              parseFloat(rowData.addQty) +
                                parseFloat(rowData.actualQty)
                            )
                              ? 0
                              : parseFloat(rowData.addQty) +
                                parseFloat(rowData.actualQty)}
                            pcs
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='w-40'>
                    <div className='flex flex-col items-center space-x-2 text-sm'>
                      <span
                        className={`${
                          rowData.qty === 0 && 'text-gray-400'
                        } font-semibold text-xs`}>
                        Last price
                      </span>
                      <NumberFormat
                        prefix={'IDR '}
                        value={rowData.price}
                        thousandSeparator={true}
                        displayType={'text'}
                        className={`${
                          rowData.qty === 0 && 'text-gray-400'
                        } font-semibold text-xs`}
                      />
                      <input
                        name='addPrice'
                        value={rowData.addPrice}
                        onChange={(e) => handleInputRow(e, id)}
                        type='number'
                        min={0}
                        className='text-center w-16 rounded-md border border-gray-300 p-1 focus:outline-blue'
                        disabled={rowData.qty === 0}
                      />
                      {rowData.addPrice !== 0 && (
                        <>
                          <span className='text-xs text-center'>
                            Price will be:
                          </span>
                          <NumberFormat
                            value={
                              parseFloat(rowData.price) +
                              parseFloat(rowData.addPrice)
                            }
                            thousandSeparator={true}
                            className='text-center text-xs'
                            prefix='IDR '
                          />
                        </>
                      )}
                    </div>
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
