import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
const status = ['Tidak Masuk gudang', 'Masuk Ke Gudang', 'Partial Refund'];

export default function MakeRefundApprovalTable({ dataProduct, setDataInput }) {
  const [inputFields, setInputFields] = useState([
    {
      id_product: '',
      status: '',
      product: '',
      totalProductPrice: '',
      note: '',
      maxQty: '',
      buyprice: '',
      reason: '',
      maxPrice: '',
      qty: '',
    },
  ]);

  const inputHandlerChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...inputFields];
    if (name === 'qty') {
      values[id][name] = value;
      values[id].totalProductPrice = values[id].buyprice * value;
      setInputFields(values);
    } else if (name === 'product') {
      const [id_product, buyprice, maxQty] = value.split(',');
      const checkProduct = inputFields.filter(
        (data) => data.id_product === id_product
      );
      if (checkProduct.length === 0) {
        values[id].id_product = id_product;
        values[id].maxPrice = buyprice;
        values[id].buyprice = buyprice;
        values[id].maxQty = maxQty;
        values[id].totalProductPrice = buyprice * maxQty;
        values[id].qty = maxQty;
        values[id].status = '';
        values[id].reason = '';
        values[id][name] = value;
        setInputFields(values);
      } else {
        swal('Oops', 'Product already selected', 'error');
        removeFieldsHandler();
      }
    } else if (name === 'buyprice') {
      values[id][name] = value;
      values[id].totalProductPrice = values[id].qty * value;
      setInputFields(values);
    } else {
      values[id][name] = value;
      setInputFields(values);
    }
  };

  const addFieldsHandler = () => {
    setInputFields([
      ...inputFields,
      {
        id_product: '',
        status: '',
        product: '',
        totalProductPrice: '',
        note: '',
        maxQty: '',
        buyprice: '',
        reason: '',
        qty: '',
        maxPrice: '',
      },
    ]);
  };

  const removeFieldsHandler = () => {
    const index = inputFields.length - 1;
    if (inputFields.length > 1) {
      inputFields.splice(index, 1);
      setInputFields([...inputFields]);
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
    setInputFields([
      {
        id_product: '',
        status: '',
        product: '',
        totalProductPrice: '',
        note: '',
        maxQty: '',
        buyprice: '',
        reason: '',
        qty: '',
        maxPrice: '',
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  return (
    <TableContainer
      className='table-scroll overflow-y-scroll variant-scroll'
      sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        {console.log('inputFields : ', inputFields)}
        {console.log('dataProduct : ', dataProduct)}
        <TableHead>
          <TableRow>
            <TableCell>Option</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price / pcs</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className='flex flex-col items-center'>
                <IconButton onClick={addFieldsHandler}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={removeFieldsHandler}>
                  <RemoveIcon />
                </IconButton>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-col space-y-3'>
                {inputFields?.map((input, id) => (
                  <div className='space-x-6' key={id}>
                    <select
                      name='product'
                      value={input.product}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className='border border-gray-300 rounded-md p-2 w-44 focus:outline-blue'>
                      <option value='' disabled>
                        Select Product
                      </option>
                      {dataProduct?.map((data) => (
                        <option
                          value={`${data.id_product},${data.buyprice},${data.qty}`}>{`${data.sku}-${data.product}`}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-col space-y-4'>
                {inputFields?.map((input, id) => (
                  <div className='flex  space-x-1 items-center' key={id}>
                    <p>Max. {input.maxQty} /</p>
                    <input
                      type='number'
                      name='qty'
                      value={input.qty}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className='border border-gray-300 rounded-md p-1 w-16 focus:outline-blue'
                    />
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-col space-y-4'>
                {inputFields?.map((input, id) => (
                  <div className='flex items-center space-x-1' key={id}>
                    <p>
                      Max. {Number(input.maxPrice).toLocaleString('id-ID')} /
                    </p>
                    <input
                      name='buyprice'
                      value={input.buyprice}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className='border border-gray-300 rounded-md p-1 w-24 focus:outline-blue'
                    />
                  </div>
                ))}
              </div>
            </TableCell>

            <TableCell>
              <div className='flex flex-col space-y-3'>
                {inputFields?.map((input, id) => (
                  <div className='space-x-6' key={id}>
                    <select
                      name='status'
                      value={input.status}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className='border border-gray-300 rounded-md p-2 w-32 focus:outline-blue'>
                      <option value='' disabled>
                        Status
                      </option>
                      {status.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-col space-y-3'>
                {inputFields?.map((input, id) => (
                  <div className='space-x-6' key={id}>
                    <select
                      name='reason'
                      value={input.reason}
                      onChange={(e) => inputHandlerChange(e, id)}
                      className='border border-gray-300 rounded-md p-2 w-32 focus:outline-blue'>
                      <option value='' disabled>
                        Status
                      </option>
                      {dataProduct
                        .filter(
                          (data) => data.id_product === input.id_product
                        )[0]
                        ?.reason.map((res) => (
                          <option>{res}</option>
                        ))}
                    </select>
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
