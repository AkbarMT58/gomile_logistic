import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Tooltip,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import swal from 'sweetalert';
import { makePoToSupplier } from 'service/api';
import { getUser } from 'helpers/parseJWT';

export default function DetailProductTable({
  dataOrder,
  link,
  id_so,
  notesProduct,
  setUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [additonalData, setAdditonalData] = useState({
    discount: '',
    shipping: '',
    link: '',
    supplier: '',
    po: '',
  });

  const [inputMassRow, setInputMassRow] = useState({
    highestPrice: '',
    quantity: '',
    isChecked: false,
  });

  const [inputRow, setInputRow] = useState(
    dataOrder.map((data) => {
      return {
        id_product: data.idProduk,
        maxQty: data.qty,
        maxPrice: data.highestPrice,
        highestPrice: data.highestPrice,
        quantity: data.qty,
        note: '',
        isChecked: false,
      };
    })
  );

  const handleAddedDataChange = (e) => {
    const { name, value } = e.target;
    setAdditonalData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

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

  const totalAllPrice = () => {
    let total = 0;
    for (let i = 0; i < inputRow.length; i++) {
      if (inputRow[i].isChecked) {
        total += inputRow[i].quantity * inputRow[i].highestPrice;
      }
    }
    return `RMB ${total.toFixed(2)}`;
  };

  const totalQuantity = () => {
    let total = 0;
    for (let i = 0; i < inputRow.length; i++) {
      if (inputRow[i].isChecked) {
        total += Number(inputRow[i].quantity);
      }
    }
    return `${total} pcs`;
  };

  const finalTotalPrice = (shipping, discount) => {
    let totalAllPrice = 0;
    for (let i = 0; i < inputRow.length; i++) {
      if (inputRow[i].isChecked) {
        totalAllPrice += inputRow[i].quantity * inputRow[i].highestPrice;
      }
    }
    return `RMB ${(totalAllPrice + Number(shipping) - Number(discount)).toFixed(
      2
    )}`;
  };

  const updateData = (e) => {
    setLoading(true);
    let totalAllPrice = 0;

    for (let i = 0; i < inputRow.length; i++) {
      if (inputRow[i].isChecked) {
        totalAllPrice += inputRow[i].quantity * inputRow[i].highestPrice;
      }
    }

    const validateMaxPrice = inputRow.filter(
      (data) => data.highestPrice > data.maxPrice
    );
    const validateMaxQty = inputRow.filter(
      (data) => data.quantity > data.maxQty
    );

    const productData = inputRow
      .filter((data) => data.isChecked === true)
      .map((input) => {
        return {
          id_product: input.id_product,
          note: input.note,
          qty: Number(input.quantity),
          price: Number(input.highestPrice),
        };
      });

    const invoice = additonalData.po;
    const linkProduct = additonalData.link;
    const shipping = additonalData.shipping;
    const discount = additonalData.discount;
    const validateChecklist = productData.length >= 1;
    const validateInvoice = invoice.trim() !== '';
    const validateShipping = shipping.trim() !== '';
    const validateSupplierInput = additonalData.supplier.trim() !== '';

    if (!validateInvoice) {
      swal('Oops', "PO number can't be empty !", 'error');
      setLoading(false);
      return;
    }
    if (!validateChecklist) {
      swal('Oops', 'No Product selected !', 'error');
      setLoading(false);
      return;
    }
    if (!validateShipping) {
      swal('Oops', "Shipping can't be empty", 'error');
      setLoading(false);
      return;
    }
    if (validateMaxPrice.length > 0) {
      swal('Oops', 'Update price over the limit !', 'error');
      setLoading(false);
      return;
    }
    if (validateMaxQty.length > 0) {
      swal('Oops', 'Update quantity over the limit !', 'error');
      setLoading(false);
      return;
    }
    if (Number(shipping) < 0) {
      swal('Oops', 'Shipping input not valid !', 'error');
      setLoading(false);
      return;
    }

    const makePo = async () => {
      const body = JSON.stringify({
        id_so,
        invoice,
        supplier: additonalData.supplier,
        link: linkProduct ? linkProduct : link,
        total: (totalAllPrice + Number(shipping) - Number(discount)).toFixed(1),
        id_product: productData.map((data) => data.id_product),
        note: productData.map((data) => data.note),
        qty: productData.map((data) => data.qty),
        price: productData.map((data) => data.price),
      });

      const data = await makePoToSupplier(body);
      if (data?.status === 200) {
        swal('Updated!', 'Data product updated successfully', 'success');
        setInputMassRow({
          highestPrice: '',
          quantity: '',
          isChecked: false,
        });

        setInputRow(
          dataOrder.map((data) => {
            return {
              id_product: data.idProduk,
              highestPrice: '',
              quantity: '',
              note: '',
              isChecked: false,
              totalPrice: 0,
            };
          })
        );

        setAdditonalData({
          discount: '',
          shipping: '',
          link: '',
          po: '',
        });

        setUpdate((prev) => !prev);
      }
      if (data?.status === 400) {
        swal('Oops', 'Input not valid !', 'error');
      }
      if (data?.status === 500) {
        swal('Oops', 'Internal server error !', 'error');
      }
      if (data?.status === 409) {
        swal('Oops', 'PO number already exist !', 'error');
      }
    };

    if (
      validateInvoice &&
      validateChecklist &&
      validateShipping &&
      validateSupplierInput &&
      Number(shipping) >= 0 &&
      Number(discount) >= 0
    ) {
      makePo();
    } else {
      swal('Oops', 'Input not valid !', 'error');
    }
    setLoading(false);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className='variant-scroll'>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>PIC</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Variant</TableCell>
            <TableCell>QTY</TableCell>
            <TableCell>Highest Price</TableCell>
            <TableCell>PO Number</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <input
                type='checkbox'
                style={{ width: '20px', height: '20px' }}
                checked={inputMassRow.isChecked}
                name='isChecked'
                onChange={handleChecked}
                disabled={!getUser().roles.includes('admin')}
              />
            </TableCell>
            <TableCell colSpan={3} align='center'></TableCell>
            <TableCell />
            <TableCell>
              <div className='text-blue-500'>
                <p>Mass Update</p>
                <input
                  name='quantity'
                  value={inputMassRow.quantity}
                  onChange={handleInputRow}
                  type='number'
                  className='border border-blue-500 p-1 rounded-md w-20 focus:outline-blue'
                  disabled={!getUser().roles.includes('admin')}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className='text-blue-500'>
                <p>Mass Update</p>
                <input
                  name='highestPrice'
                  value={inputMassRow.highestPrice}
                  onChange={handleInputRow}
                  type='number'
                  className='border border-blue-500 p-1 rounded-md w-20 focus:outline-blue'
                  disabled={!getUser().roles.includes('admin')}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className='text-blue-500'>
                <p>Mass Update</p>
                <input
                  name='po'
                  value={additonalData.po}
                  onChange={handleAddedDataChange}
                  type='text'
                  className='border border-blue-500 p-1 rounded-md w-20 focus:outline-blue'
                  disabled={!getUser().roles.includes('admin')}
                />
              </div>
            </TableCell>
            <TableCell />
          </TableRow>
          {dataOrder.map((rowData, id) => {
            return (
              <Fragment key={id}>
                <TableRow>
                  <TableCell>
                    <input
                      type='checkbox'
                      style={{ width: '20px', height: '20px' }}
                      checked={inputRow[id].isChecked}
                      name='isChecked'
                      onChange={(e) => handleChecked(e, id)}
                      disabled={rowData.qty === 0 || !getUser().roles.includes('admin')}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      {rowData.image && (
                        <img
                          src={rowData.image}
                          alt='product'
                          className='w-16 rounded-md'
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Tooltip title={rowData.link}>
                        <a
                          href={rowData.link}
                          target='_blank'
                          className={`line-clamp-1 w-40 font-semibold hover:text-blue-400  transition-all duration-300 ${
                            rowData.qty === 0 && 'text-gray-400'
                          }`}
                          rel='noreferrer'>
                          {rowData.link}
                        </a>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='w-48'>
                      <p
                        className={`uppercase line-clamp-2 ${
                          rowData.qty === 0 && 'text-gray-400'
                        }`}>
                        {rowData.name}
                      </p>
                      <div className='flex items-center space-x-1'>
                        <input
                          type='text'
                          name='note'
                          value={inputRow[id].note}
                          onChange={(e) => handleInputRow(e, id)}
                          className='border border-blue-300 p-1 rounded-md  focus:outline-blue'
                          placeholder='Notes'
                          disabled={!getUser().roles.includes('admin')}
                        />
                      </div>
                      {notesProduct !== null &&
                        notesProduct?.slice(0, 1).map((note, id) => (
                          <div className='flex text-xs space-x-1' key={id}>
                            <p>{note.sales}:</p>
                            <p className='line-clamp-1'>{note.note}</p>
                            <p className='line-clamp-1'>{note.date}</p>
                          </div>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p
                        className={`font-semibold ${
                          rowData.qty === 0 && 'text-gray-400'
                        }`}>
                        {rowData.variant}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='space-x-2'>
                      <span
                        className={`${rowData.qty === 0 && 'text-gray-400'}`}>
                        Max. {rowData.qty} pcs /
                      </span>
                      <input
                        name='quantity'
                        value={inputRow[id].quantity}
                        onChange={(e) => handleInputRow(e, id)}
                        type='number'
                        className='w-16 rounded-md border border-gray-300 p-1 focus:outline-blue'
                        disabled={rowData.qty === 0 || !getUser().roles.includes('admin')}
                      />
                    </div>
                    {inputRow[id].quantity > rowData.qty &&
                      rowData.qty !== 0 && (
                        <span className='text-xs text-red-600'>
                          Warning: update over limit
                        </span>
                      )}
                  </TableCell>
                  <TableCell>
                    <div className='space-x-2'>
                      <span
                        className={`${rowData.qty === 0 && 'text-gray-400'}`}>
                        Max. RMB {rowData.highestPrice} /
                      </span>
                      <input
                        type='number'
                        value={inputRow[id].highestPrice}
                        name='highestPrice'
                        onChange={(e) => handleInputRow(e, id)}
                        className='w-16 rounded-md border border-gray-300 p-1 focus:outline-blue'
                        disabled={rowData.qty === 0 || !getUser().roles.includes('admin')}
                      />
                    </div>
                    {inputRow[id].highestPrice > rowData.highestPrice &&
                      rowData.qty !== 0 && (
                        <span className='text-xs text-red-600'>
                          Warning: update over limit
                        </span>
                      )}
                  </TableCell>
                  <TableCell>
                    <p>{rowData.poNumber && rowData.poNumber}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      RMB{' '}
                      {(
                        inputRow[id].quantity * inputRow[id].highestPrice
                      ).toFixed(2)}
                    </p>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
          <TableRow>
            <TableCell>
              <p>Total</p>
            </TableCell>
            <TableCell colSpan={4} />
            <TableCell>
              <p>{totalQuantity()}</p>
            </TableCell>
            <TableCell colSpan={2} />
            <TableCell>
              <p>{totalAllPrice()}</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className='space-y-6'>
                <p>Shipping Cost</p>
                <p>Discount</p>
                <p>Total Price</p>
                <p>Link</p>
                <p>Supplier Name</p>
              </div>
            </TableCell>
            <TableCell colSpan={4} />
            <TableCell colSpan={4}>
              <div className='flex flex-col space-y-4 items-center'>
                <input
                  name='shipping'
                  type='number'
                  value={additonalData.shipping}
                  onChange={handleAddedDataChange}
                  className='rounded-md border border-gray-300 p-1 self-end focus:outline-blue'
                />
                <input
                  name='discount'
                  value={additonalData.discount}
                  onChange={handleAddedDataChange}
                  type='number'
                  className='rounded-md border border-gray-300 p-1 self-end focus:outline-blue'
                />
                <div className='self-end text-left'>
                  <p>
                    {finalTotalPrice(
                      additonalData.shipping,
                      additonalData.discount
                    )}
                  </p>
                </div>
                <input
                  name='link'
                  value={additonalData.link}
                  onChange={handleAddedDataChange}
                  type='text'
                  className='rounded-md border border-gray-300 p-1 w-full focus:outline-blue'
                />
                <input
                  name='supplier'
                  value={additonalData.supplier}
                  onChange={handleAddedDataChange}
                  type='text'
                  className='rounded-md border border-gray-300 p-1 w-full focus:outline-blue'
                />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={8} />
            <TableCell>
              <button
                disabled={loading}
                className={`text-white py-2 px-5 ${
                  loading || !getUser().roles.includes('admin') ? 'bg-gray-300 cursor-default' : 'bg-blue-500 cursor-pointer'
                } text-center rounded-md`}
                onClick={() => getUser().roles.includes('admin') && updateData()}>
                Update
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
